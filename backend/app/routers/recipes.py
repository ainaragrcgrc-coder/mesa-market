from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Recipe, Product, RecipeProduct
from ..schemas import (
    RecipeCreate,
    RecipeResponse,
    RecipeSuggestionRequest
)


router = APIRouter(
    prefix="/api/v1/recipes",
    tags=["Recipes"]
)


# =========================
# CONVERTIR RECETA A RESPUESTA
# =========================

def recipe_to_response(recipe, db):
    ingredients = []

    relations = (
        db.query(RecipeProduct)
        .filter(
            RecipeProduct.recipe_id == recipe.id
        )
        .all()
    )

    product_map = {
        product.id: product
        for product in recipe.products
    }

    for relation in relations:
        product = product_map.get(relation.product_id)

        if product:
            ingredients.append({
                "product_id": product.id,
                "name": product.name,
                "quantity": relation.quantity
            })

    return {
        "id": recipe.id,
        "name": recipe.name,
        "description": recipe.description,
        "instructions": recipe.instructions,
        "preparation_time": recipe.preparation_time,
        "difficulty": recipe.difficulty,
        "image": recipe.image,
        "product_ids": [
            product.id
            for product in recipe.products
        ],
        "ingredients": ingredients
    }


# =========================
# OBTENER TODAS LAS RECETAS
# =========================

@router.get(
    "/",
    response_model=list[RecipeResponse]
)
def get_recipes(
    db: Session = Depends(get_db)
):
    recipes = db.query(Recipe).all()

    return [
        recipe_to_response(recipe, db)
        for recipe in recipes
    ]


# =========================
# CREAR RECETA
# =========================

@router.post(
    "/",
    response_model=RecipeResponse,
    status_code=status.HTTP_201_CREATED
)
def create_recipe(
    recipe_data: RecipeCreate,
    db: Session = Depends(get_db)
):
    products = []

    for product_id in recipe_data.product_ids:

        product = (
            db.query(Product)
            .filter(Product.id == product_id)
            .first()
        )

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"El producto {product_id} no existe"
            )

        products.append(product)

    recipe = Recipe(
        name=recipe_data.name,
        description=recipe_data.description,
        instructions=recipe_data.instructions,
        preparation_time=recipe_data.preparation_time,
        difficulty=recipe_data.difficulty,
        image=recipe_data.image
    )

    db.add(recipe)
    db.flush()

    for product in products:

        relation = RecipeProduct(
            recipe_id=recipe.id,
            product_id=product.id,
            quantity="Según receta"
        )

        db.add(relation)

    db.commit()
    db.refresh(recipe)

    return recipe_to_response(recipe, db)


# =========================
# RECETAS POR PRODUCTO
# =========================

@router.get(
    "/product/{product_id}",
    response_model=list[RecipeResponse]
)
def get_recipes_by_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Producto no encontrado"
        )

    return [
        recipe_to_response(recipe, db)
        for recipe in product.recipes
    ]


# =========================
# OBTENER RECETA POR ID
# =========================

@router.get(
    "/{recipe_id}",
    response_model=RecipeResponse
)
def get_recipe(
    recipe_id: int,
    db: Session = Depends(get_db)
):
    recipe = (
        db.query(Recipe)
        .filter(Recipe.id == recipe_id)
        .first()
    )

    if not recipe:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Receta no encontrada"
        )

    return recipe_to_response(recipe, db)


# =========================
# ACTUALIZAR RECETA
# =========================

@router.put(
    "/{recipe_id}",
    response_model=RecipeResponse
)
def update_recipe(
    recipe_id: int,
    recipe_data: RecipeCreate,
    db: Session = Depends(get_db)
):
    recipe = (
        db.query(Recipe)
        .filter(Recipe.id == recipe_id)
        .first()
    )

    if not recipe:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Receta no encontrada"
        )

    products = []

    for product_id in recipe_data.product_ids:

        product = (
            db.query(Product)
            .filter(Product.id == product_id)
            .first()
        )

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"El producto {product_id} no existe"
            )

        products.append(product)

    recipe.name = recipe_data.name
    recipe.description = recipe_data.description
    recipe.instructions = recipe_data.instructions
    recipe.preparation_time = recipe_data.preparation_time
    recipe.difficulty = recipe_data.difficulty
    recipe.image = recipe_data.image

    db.query(RecipeProduct).filter(
        RecipeProduct.recipe_id == recipe.id
    ).delete()

    for product in products:

        relation = RecipeProduct(
            recipe_id=recipe.id,
            product_id=product.id,
            quantity="Según receta"
        )

        db.add(relation)

    db.commit()
    db.refresh(recipe)

    return recipe_to_response(recipe, db)


# =========================
# ELIMINAR RECETA
# =========================

@router.delete(
    "/{recipe_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_recipe(
    recipe_id: int,
    db: Session = Depends(get_db)
):
    recipe = (
        db.query(Recipe)
        .filter(Recipe.id == recipe_id)
        .first()
    )

    if not recipe:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Receta no encontrada"
        )

    db.query(RecipeProduct).filter(
        RecipeProduct.recipe_id == recipe.id
    ).delete()

    db.delete(recipe)
    db.commit()

    return None


# =========================
# SUGERENCIAS DE RECETAS
# =========================

@router.post(
    "/suggestions",
    response_model=list[RecipeResponse]
)
def suggest_recipes(
    data: RecipeSuggestionRequest,
    db: Session = Depends(get_db)
):
    selected_products = set(data.product_ids)

    existing_product_ids = {
        product.id
        for product in db.query(Product).filter(
            Product.id.in_(selected_products)
        ).all()
    }

    missing_product_ids = selected_products - existing_product_ids

    if missing_product_ids:
        missing_id = sorted(missing_product_ids)[0]

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"El producto {missing_id} no existe"
        )

    recipes = db.query(Recipe).all()

    suggestions = []

    for recipe in recipes:

        recipe_products = {
            product.id
            for product in recipe.products
        }

        if recipe_products.issubset(selected_products):
            suggestions.append(
                recipe_to_response(recipe, db)
            )

    return suggestions