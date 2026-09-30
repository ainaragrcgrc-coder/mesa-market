from .database import SessionLocal
from .models import Category, Product, Recipe, RecipeProduct


def seed_data():

    db = SessionLocal()

    # =====================================================
    # CATEGORIES
    # =====================================================

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
            .filter(
                Category.name == category_data["name"]
            )
            .first()
        )

        if not existing_category:
            db.add(
                Category(**category_data)
            )

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

    # =====================================================
    # PRODUCTS
    # =====================================================

    products = [

        # -------------------------
        # DULCE
        # -------------------------

        {
            "name": "Chocolate negro",
            "description": "Chocolate negro para repostería.",
            "price": 3.50,
            "stock": 25,
            "unit": "tableta 200 g",
            "image": "https://images.unsplash.com/photo-1575377222312-dd1a17d0e8d1?auto=format&fit=crop&w=900&q=80",
            "category_id": dulce.id
        },

        {
            "name": "Chocolate con leche",
            "description": "Chocolate con leche para postres y repostería.",
            "price": 3.20,
            "stock": 22,
            "unit": "tableta 200 g",
            "image": "https://images.unsplash.com/photo-1548907040-4d42d42f9e0c?auto=format&fit=crop&w=900&q=80",
            "category_id": dulce.id
        },

        {
            "name": "Harina de trigo",
            "description": "Harina de trigo para todo tipo de elaboraciones.",
            "price": 1.80,
            "stock": 40,
            "unit": "kg",
            "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
            "category_id": dulce.id
        },

        {
            "name": "Harina de almendra",
            "description": "Harina de almendra para repostería.",
            "price": 5.90,
            "stock": 18,
            "unit": "500 g",
            "image": "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=900&q=80",
            "category_id": dulce.id
        },

        {
            "name": "Azúcar",
            "description": "Azúcar blanco para repostería y cocina.",
            "price": 1.50,
            "stock": 35,
            "unit": "kg",
            "image": "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=900&q=80",
            "category_id": dulce.id
        },

        {
            "name": "Azúcar glas",
            "description": "Azúcar glas para decorar y preparar postres.",
            "price": 2.20,
            "stock": 20,
            "unit": "500 g",
            "image": "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=900&q=80",
            "category_id": dulce.id
        },

        {
            "name": "Cacao en polvo",
            "description": "Cacao puro en polvo para postres y bebidas.",
            "price": 4.50,
            "stock": 17,
            "unit": "250 g",
            "image": "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=900&q=80",
            "category_id": dulce.id
        },

        {
            "name": "Levadura",
            "description": "Levadura química para bizcochos y repostería.",
            "price": 1.25,
            "stock": 30,
            "unit": "sobre 16 g",
            "image": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",
            "category_id": dulce.id
        },

        {
            "name": "Huevos",
            "description": "Huevos frescos de gallina.",
            "price": 2.90,
            "stock": 30,
            "unit": "docena",
            "image": "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=900&q=80",
            "category_id": dulce.id
        },

        {
            "name": "Mantequilla",
            "description": "Mantequilla para cocinar y preparar postres.",
            "price": 3.80,
            "stock": 24,
            "unit": "250 g",
            "image": "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=900&q=80",
            "category_id": dulce.id
        },

        {
            "name": "Nata para montar",
            "description": "Nata para montar y preparar postres.",
            "price": 2.70,
            "stock": 16,
            "unit": "200 ml",
            "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",
            "category_id": dulce.id
        },

        {
            "name": "Vainilla",
            "description": "Extracto de vainilla para aromatizar postres.",
            "price": 3.90,
            "stock": 12,
            "unit": "100 ml",
            "image": "https://images.unsplash.com/photo-1605196560541-1d4a3c5f0a0d?auto=format&fit=crop&w=900&q=80",
            "category_id": dulce.id
        },

        # -------------------------
        # SALADO
        # -------------------------

        {
            "name": "Tomate",
            "description": "Tomates frescos para ensaladas y cocina.",
            "price": 2.40,
            "stock": 20,
            "unit": "kg",
            "image": "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=80",
            "category_id": salado.id
        },

        {
            "name": "Aceite de oliva",
            "description": "Aceite de oliva virgen extra.",
            "price": 8.90,
            "stock": 18,
            "unit": "botella 1 L",
            "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80",
            "category_id": salado.id
        },

        {
            "name": "Patata",
            "description": "Patatas frescas para todo tipo de recetas.",
            "price": 2.10,
            "stock": 35,
            "unit": "kg",
            "image": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80",
            "category_id": salado.id
        },

        {
            "name": "Cebolla",
            "description": "Cebolla fresca para sofritos y guisos.",
            "price": 1.90,
            "stock": 30,
            "unit": "kg",
            "image": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=900&q=80",
            "category_id": salado.id
        },

        {
            "name": "Ajo",
            "description": "Ajo fresco para cocinar y condimentar.",
            "price": 2.50,
            "stock": 25,
            "unit": "cabeza",
            "image": "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=900&q=80",
            "category_id": salado.id
        },

        {
            "name": "Pimiento rojo",
            "description": "Pimiento rojo fresco para ensaladas y guisos.",
            "price": 3.20,
            "stock": 20,
            "unit": "kg",
            "image": "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=900&q=80",
            "category_id": salado.id
        },

        {
            "name": "Pimiento verde",
            "description": "Pimiento verde fresco para cocinar.",
            "price": 2.90,
            "stock": 22,
            "unit": "kg",
            "image": "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=900&q=80",
            "category_id": salado.id
        },

        {
            "name": "Calabacín",
            "description": "Calabacín fresco para platos ligeros y guarniciones.",
            "price": 2.60,
            "stock": 20,
            "unit": "kg",
            "image": "https://images.unsplash.com/photo-1563252722-6434563a985d?auto=format&fit=crop&w=900&q=80",
            "category_id": salado.id
        },

        {
            "name": "Zanahoria",
            "description": "Zanahorias frescas para ensaladas y cocina.",
            "price": 1.70,
            "stock": 28,
            "unit": "kg",
            "image": "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=900&q=80",
            "category_id": salado.id
        },

        {
            "name": "Arroz",
            "description": "Arroz de grano largo para guarniciones y platos principales.",
            "price": 2.20,
            "stock": 35,
            "unit": "kg",
            "image": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=900&q=80",
            "category_id": salado.id
        },

        {
            "name": "Pasta",
            "description": "Pasta de trigo para platos rápidos y caseros.",
            "price": 1.60,
            "stock": 40,
            "unit": "500 g",
            "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
            "category_id": salado.id
        },

        {
            "name": "Queso",
            "description": "Queso semicurado para cocinar y acompañar platos.",
            "price": 5.50,
            "stock": 15,
            "unit": "250 g",
            "image": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=900&q=80",
            "category_id": salado.id
        },

        {
            "name": "Atún",
            "description": "Atún en conserva para ensaladas y platos rápidos.",
            "price": 3.80,
            "stock": 25,
            "unit": "pack 3 latas",
            "image": "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=900&q=80",
            "category_id": salado.id
        },

        {
            "name": "Pechuga de pollo",
            "description": "Pechuga de pollo fresca para platos principales.",
            "price": 6.90,
            "stock": 18,
            "unit": "500 g",
            "image": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=900&q=80",
            "category_id": salado.id
        }
    ]

    # =====================================================
    # SAVE PRODUCTS
    # =====================================================

    for product_data in products:

        existing_product = (
            db.query(Product)
            .filter(
                Product.name == product_data["name"]
            )
            .first()
        )

        if not existing_product:

            db.add(
                Product(**product_data)
            )

        else:

            existing_product.description = product_data["description"]
            existing_product.price = product_data["price"]
            existing_product.stock = product_data["stock"]
            existing_product.unit = product_data["unit"]
            existing_product.image = product_data["image"]
            existing_product.category_id = product_data["category_id"]

    db.commit()

    # =====================================================
    # RECIPES
    # =====================================================

    recipes = [

        {
            "name": "Brownie de chocolate",
            "description": "Brownie casero de chocolate negro, intenso y jugoso.",
            "instructions": (
                "Derretir el chocolate y la mantequilla. "
                "Batir los huevos con el azúcar. "
                "Añadir la harina y el cacao. "
                "Incorporar el chocolate derretido. "
                "Hornear hasta que el centro quede jugoso."
            ),
            "preparation_time": 40,
            "difficulty": "Fácil",
            "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80"
        },

        {
            "name": "Tortitas caseras",
            "description": "Tortitas esponjosas perfectas para el desayuno.",
            "instructions": (
                "Batir los huevos con el azúcar. "
                "Añadir la harina y la vainilla. "
                "Mezclar hasta conseguir una masa homogénea. "
                "Cocinar pequeñas porciones en una sartén "
                "hasta que estén doradas por ambos lados."
            ),
            "preparation_time": 20,
            "difficulty": "Fácil",
            "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80"
        },

        {
            "name": "Bizcocho de vainilla",
            "description": "Bizcocho casero suave y aromático.",
            "instructions": (
                "Batir los huevos con el azúcar. "
                "Añadir la mantequilla y la vainilla. "
                "Incorporar la harina y la levadura. "
                "Mezclar bien y hornear hasta que esté dorado."
            ),
            "preparation_time": 45,
            "difficulty": "Fácil",
            "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80"
        },

        {
            "name": "Galletas de chocolate",
            "description": "Galletas caseras crujientes por fuera y tiernas por dentro.",
            "instructions": (
                "Mezclar la mantequilla con el azúcar. "
                "Añadir el huevo y la harina. "
                "Incorporar el chocolate troceado. "
                "Formar pequeñas bolas y hornear."
            ),
            "preparation_time": 30,
            "difficulty": "Fácil",
            "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80"
        },

        {
            "name": "Tomates al horno",
            "description": "Tomates asados con aceite de oliva y ajo.",
            "instructions": (
                "Lavar y cortar los tomates. "
                "Colocarlos en una bandeja. "
                "Añadir aceite de oliva y ajo. "
                "Hornear hasta que estén tiernos."
            ),
            "preparation_time": 30,
            "difficulty": "Fácil",
            "image": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=80"
        },

        {
            "name": "Pasta con tomate",
            "description": "Pasta sencilla con tomate, ajo y aceite de oliva.",
            "instructions": (
                "Cocer la pasta. "
                "Preparar una salsa con tomate, ajo y aceite de oliva. "
                "Mezclar la pasta con la salsa y servir caliente."
            ),
            "preparation_time": 25,
            "difficulty": "Fácil",
            "image": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=900&q=80"
        },

        {
            "name": "Arroz con verduras",
            "description": "Arroz acompañado de verduras frescas.",
            "instructions": (
                "Cortar la cebolla, el pimiento, la zanahoria "
                "y el calabacín. Sofreír las verduras. "
                "Añadir el arroz y cocinar con agua "
                "hasta que quede en su punto."
            ),
            "preparation_time": 35,
            "difficulty": "Media",
            "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80"
        },

        {
            "name": "Ensalada mediterránea",
            "description": "Ensalada fresca de tomate, pimiento, queso y aceite de oliva.",
            "instructions": (
                "Lavar y cortar el tomate y los pimientos. "
                "Añadir el queso. "
                "Aliñar con aceite de oliva y servir fría."
            ),
            "preparation_time": 15,
            "difficulty": "Fácil",
            "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80"
        },

        {
            "name": "Pollo con verduras",
            "description": "Pechuga de pollo acompañada de verduras salteadas.",
            "instructions": (
                "Cortar el pollo y las verduras. "
                "Calentar aceite de oliva en una sartén. "
                "Cocinar el pollo y añadir las verduras. "
                "Saltear hasta que todo esté bien cocinado."
            ),
            "preparation_time": 35,
            "difficulty": "Media",
            "image": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80"
        },

        {
            "name": "Patatas al horno",
            "description": "Patatas asadas con aceite de oliva y ajo.",
            "instructions": (
                "Lavar y cortar las patatas. "
                "Colocarlas en una bandeja. "
                "Añadir aceite de oliva y ajo. "
                "Hornear hasta que estén doradas."
            ),
            "preparation_time": 45,
            "difficulty": "Fácil",
            "image": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80"
        }
    ]

    # =====================================================
    # SAVE RECIPES
    # =====================================================

    for recipe_data in recipes:

        existing_recipe = (
            db.query(Recipe)
            .filter(
                Recipe.name == recipe_data["name"]
            )
            .first()
        )

        if not existing_recipe:

            db.add(
                Recipe(**recipe_data)
            )

        else:

            existing_recipe.description = recipe_data["description"]
            existing_recipe.instructions = recipe_data["instructions"]
            existing_recipe.preparation_time = recipe_data["preparation_time"]
            existing_recipe.difficulty = recipe_data["difficulty"]
            existing_recipe.image = recipe_data["image"]

    db.commit()

    # =====================================================
    # GET PRODUCTS
    # =====================================================

    product_map = {}

    all_products = db.query(Product).all()

    for product in all_products:
        product_map[product.name] = product

    # =====================================================
    # GET RECIPES
    # =====================================================

    recipe_map = {}

    all_recipes = db.query(Recipe).all()

    for recipe in all_recipes:
        recipe_map[recipe.name] = recipe

    # =====================================================
    # RECIPE - PRODUCT RELATIONS
    # =====================================================

    relations = [

        # Brownie
        ("Brownie de chocolate", "Chocolate negro", "200 g"),
        ("Brownie de chocolate", "Mantequilla", "100 g"),
        ("Brownie de chocolate", "Huevos", "2 unidades"),
        ("Brownie de chocolate", "Azúcar", "120 g"),
        ("Brownie de chocolate", "Harina de trigo", "100 g"),
        ("Brownie de chocolate", "Cacao en polvo", "30 g"),

        # Tortitas
        ("Tortitas caseras", "Huevos", "2 unidades"),
        ("Tortitas caseras", "Harina de trigo", "200 g"),
        ("Tortitas caseras", "Azúcar", "30 g"),
        ("Tortitas caseras", "Vainilla", "5 ml"),

        # Bizcocho
        ("Bizcocho de vainilla", "Huevos", "3 unidades"),
        ("Bizcocho de vainilla", "Harina de trigo", "250 g"),
        ("Bizcocho de vainilla", "Azúcar", "150 g"),
        ("Bizcocho de vainilla", "Mantequilla", "100 g"),
        ("Bizcocho de vainilla", "Levadura", "1 sobre"),
        ("Bizcocho de vainilla", "Vainilla", "5 ml"),

        # Galletas
        ("Galletas de chocolate", "Chocolate negro", "100 g"),
        ("Galletas de chocolate", "Mantequilla", "100 g"),
        ("Galletas de chocolate", "Harina de trigo", "200 g"),
        ("Galletas de chocolate", "Azúcar glas", "80 g"),
        ("Galletas de chocolate", "Huevos", "1 unidad"),

        # Tomates
        ("Tomates al horno", "Tomate", "500 g"),
        ("Tomates al horno", "Aceite de oliva", "30 ml"),
        ("Tomates al horno", "Ajo", "1 cabeza"),

        # Pasta
        ("Pasta con tomate", "Pasta", "250 g"),
        ("Pasta con tomate", "Tomate", "400 g"),
        ("Pasta con tomate", "Aceite de oliva", "30 ml"),
        ("Pasta con tomate", "Ajo", "1 cabeza"),

        # Arroz
        ("Arroz con verduras", "Arroz", "250 g"),
        ("Arroz con verduras", "Cebolla", "1 unidad"),
        ("Arroz con verduras", "Pimiento rojo", "1 unidad"),
        ("Arroz con verduras", "Zanahoria", "1 unidad"),
        ("Arroz con verduras", "Calabacín", "1 unidad"),
        ("Arroz con verduras", "Aceite de oliva", "30 ml"),

        # Ensalada
        ("Ensalada mediterránea", "Tomate", "300 g"),
        ("Ensalada mediterránea", "Pimiento verde", "1 unidad"),
        ("Ensalada mediterránea", "Queso", "100 g"),
        ("Ensalada mediterránea", "Aceite de oliva", "20 ml"),

        # Pollo
        ("Pollo con verduras", "Pechuga de pollo", "500 g"),
        ("Pollo con verduras", "Pimiento rojo", "1 unidad"),
        ("Pollo con verduras", "Calabacín", "1 unidad"),
        ("Pollo con verduras", "Zanahoria", "1 unidad"),
        ("Pollo con verduras", "Aceite de oliva", "30 ml"),

        # Patatas
        ("Patatas al horno", "Patata", "500 g"),
        ("Patatas al horno", "Aceite de oliva", "30 ml"),
        ("Patatas al horno", "Ajo", "1 cabeza")
    ]

    for recipe_name, product_name, quantity in relations:

        recipe = recipe_map.get(recipe_name)
        product = product_map.get(product_name)

        if recipe and product:

            existing_relation = (
                db.query(RecipeProduct)
                .filter(
                    RecipeProduct.recipe_id == recipe.id,
                    RecipeProduct.product_id == product.id
                )
                .first()
            )

            if not existing_relation:

                db.add(
                    RecipeProduct(
                        recipe_id=recipe.id,
                        product_id=product.id,
                        quantity=quantity
                    )
                )

    db.commit()
    db.close()

    print("Datos de MESA MARKET creados correctamente.")


if __name__ == "__main__":
    seed_data()