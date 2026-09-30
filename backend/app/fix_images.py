from .database import SessionLocal
from .models import Product


IMAGES = {
    "Vainilla": "assets/products/vainilla.jpg",
    "Azúcar": "assets/products/azucar.jpg",
    "Levadura": "assets/products/levadura.jpg",
}


db = SessionLocal()

try:
    for product_name, image_path in IMAGES.items():

        product = (
            db.query(Product)
            .filter(Product.name == product_name)
            .first()
        )

        if product:
            product.image = image_path
            print(
                f"Imagen actualizada: "
                f"{product_name} -> {image_path}"
            )
        else:
            print(
                f"No encontrado: {product_name}"
            )

    db.commit()

    print()
    print(
        "Imágenes locales actualizadas correctamente."
    )

finally:
    db.close()