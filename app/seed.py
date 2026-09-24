from .database import SessionLocal
from .models import Category, Product, Recipe, RecipeProduct


def seed_data():
    db = SessionLocal()

    # =========================
    # CATEGORÍAS
    # =========================

    categories = [
        {
            "name": "Dulce",
            "description": "Ingredientes y productos para elaboraciones dulces."
        },
        {
            "name": "Salado",
            "description": "Ingredientes y productos para elaboraciones saladas."
        }
    ]

    for category_data in categories:
        existing_category = (
            db.query(Category)
            .filter(Category.name == category_data["name"])
            .first()
        )

        if not existing_category:
            db.add(Category(**category_data))

    db.commit()

    dulce = (
        db.query(Category)
        .filter(Category.name == "Dulce")
        .first()
    )

    salado = (
        db.query(Category)
        .filter(Category.name == "Salado")
        .first()
    )

    # =========================
    # PRODUCTOS
    # =========================

    products = [
        {
            "name": "Chocolate negro",
            "description": "Chocolate negro para repostería.",
            "price": 3.50,
            "stock": 25,
            "unit": "tableta 200 g",
            "image": "https://images.unsplash.com/photo-1575377222312-dd1a10f1a0f5",
            "category_id": dulce.id
        },
        {
            "name": "Harina de trigo",
            "description": "Harina de trigo para todo tipo de elaboraciones.",
            "price": 1.80,
            "stock": 40,
            "unit": "kg",
            "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff",
            "category_id": dulce.id
        },
        {
            "name": "Azúcar",
            "description": "Azúcar blanco para repostería y cocina.",
            "price": 1.50,
            "stock": 35,
            "unit": "kg",
            "image": "https://images.unsplash.com/photo-1581441363689-1f3c3c414635",
            "category_id": dulce.id
        },
        {
            "name": "Huevos",
            "description": "Huevos frescos de gallina.",
            "price": 2.90,
            "stock": 30,
            "unit": "docena",
            "image": "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f",
            "category_id": salado.id
        },
        {
            "name": "Tomate",
            "description": "Tomates frescos para ensaladas y cocina.",
            "price": 2.40,
            "stock": 20,
            "unit": "kg",
            "image": "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
            "category_id": salado.id
        },
        {
            "name": "Aceite de oliva",
            "description": "Aceite de oliva virgen extra.",
            "price": 8.90,
            "stock": 18,
            "unit": "botella 1 L",
            "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
            "category_id": salado.id
        }
    ]

    for product_data in products:
        existing_product = (
            db.query(Product)
            .filter(Product.name == product_data["name"])
            .first()
        )

        if not existing_product:
            db.add(Product(**product_data))

    db.commit()

    # =========================
    # RECETAS
    # =========================

    recipes = [
        {
            "name": "Brownie de chocolate",
            "description": "Brownie casero de chocolate negro, intenso y jugoso.",
            "instructions": (
                "Derretir el chocolate. Batir los huevos con el azúcar. "
                "Añadir la harina y mezclar. Incorporar el chocolate derretido. "
                "Hornear hasta que el centro quede jugoso."
            ),
            "preparation_time": 40,
            "difficulty": "Fácil",
            "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c"
        },
        {
            "name": "Tomates al horno",
            "description": "Tomates asados con aceite de oliva.",
            "instructions": (
                "Lavar y cortar los tomates. Colocarlos en una bandeja. "
                "Añadir aceite de oliva y hornear hasta que estén tiernos."
            ),
            "preparation_time": 30,
            "difficulty": "Fácil",
            "image": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea"
        },
        {
            "name": "Tortitas caseras",
            "description": "Tortitas sencillas y esponjosas para el desayuno.",
            "instructions": (
                "Batir los huevos con el azúcar. Añadir la harina y mezclar "
                "hasta conseguir una masa homogénea. Cocinar pequeñas porciones "
                "en una sartén hasta que estén doradas por ambos lados."
            ),
            "preparation_time": 20,
            "difficulty": "Fácil",
            "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93"
        }
    ]

    for recipe_data in recipes:
        existing_recipe = (
            db.query(Recipe)
            .filter(Recipe.name == recipe_data["name"])
            .first()
        )

        if not existing_recipe:
            db.add(Recipe(**recipe_data))

    db.commit()

    # =========================
    # RELACIONES RECETA-PRODUCTO
    # =========================

    chocolate = (
        db.query(Product)
        .filter(Product.name == "Chocolate negro")
        .first()
    )

    harina = (
        db.query(Product)
        .filter(Product.name == "Harina de trigo")
        .first()
    )

    azucar = (
        db.query(Product)
        .filter(Product.name == "Azúcar")
        .first()
    )

    huevos = (
        db.query(Product)
        .filter(Product.name == "Huevos")
        .first()
    )

    tomate = (
        db.query(Product)
        .filter(Product.name == "Tomate")
        .first()
    )

    aceite = (
        db.query(Product)
        .filter(Product.name == "Aceite de oliva")
        .first()
    )

    brownie = (
        db.query(Recipe)
        .filter(Recipe.name == "Brownie de chocolate")
        .first()
    )

    tomates_horno = (
        db.query(Recipe)
        .filter(Recipe.name == "Tomates al horno")
        .first()
    )

    tortitas = (
        db.query(Recipe)
        .filter(Recipe.name == "Tortitas caseras")
        .first()
    )

    relations = [
        # Brownie
        {
            "recipe_id": brownie.id,
            "product_id": chocolate.id,
            "quantity": "200 g"
        },
        {
            "recipe_id": brownie.id,
            "product_id": harina.id,
            "quantity": "150 g"
        },
        {
            "recipe_id": brownie.id,
            "product_id": azucar.id,
            "quantity": "120 g"
        },
        {
            "recipe_id": brownie.id,
            "product_id": huevos.id,
            "quantity": "2 unidades"
        },

        # Tomates al horno
        {
            "recipe_id": tomates_horno.id,
            "product_id": tomate.id,
            "quantity": "500 g"
        },
        {
            "recipe_id": tomates_horno.id,
            "product_id": aceite.id,
            "quantity": "30 ml"
        },

        # Tortitas
        {
            "recipe_id": tortitas.id,
            "product_id": harina.id,
            "quantity": "200 g"
        },
        {
            "recipe_id": tortitas.id,
            "product_id": azucar.id,
            "quantity": "30 g"
        },
        {
            "recipe_id": tortitas.id,
            "product_id": huevos.id,
            "quantity": "2 unidades"
        }
    ]

    for relation_data in relations:
        existing_relation = (
            db.query(RecipeProduct)
            .filter(
                RecipeProduct.recipe_id == relation_data["recipe_id"],
                RecipeProduct.product_id == relation_data["product_id"]
            )
            .first()
        )

        if not existing_relation:
            db.add(RecipeProduct(**relation_data))

    db.commit()
    db.close()

    print("Datos iniciales creados correctamente.")


if __name__ == "__main__":
    seed_data()