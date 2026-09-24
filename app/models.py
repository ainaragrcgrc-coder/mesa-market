from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


# =========================
# CATEGORÍAS
# =========================

class Category(Base):
    __tablename__ = "categories"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        unique=True,
        nullable=False
    )

    description = Column(
        String,
        nullable=True
    )


# =========================
# PRODUCTOS
# =========================

class Product(Base):
    __tablename__ = "products"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    description = Column(
        String,
        nullable=True
    )

    price = Column(
        Float,
        nullable=False
    )

    stock = Column(
        Integer,
        nullable=False
    )

    unit = Column(
        String,
        nullable=False
    )

    image = Column(
        String,
        nullable=True
    )

    category_id = Column(
        Integer,
        ForeignKey("categories.id"),
        nullable=False
    )

    recipes = relationship(
        "Recipe",
        secondary="recipe_products",
        back_populates="products"
    )


# =========================
# RECETAS
# =========================

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    description = Column(
        String,
        nullable=True
    )

    instructions = Column(
        String,
        nullable=False
    )

    preparation_time = Column(
        Integer,
        nullable=False
    )

    difficulty = Column(
        String,
        nullable=False
    )

    image = Column(
        String,
        nullable=True
    )

    products = relationship(
        "Product",
        secondary="recipe_products",
        back_populates="recipes"
    )

    @property
    def product_ids(self):
        return [product.id for product in self.products]


# =========================
# RELACIÓN RECETA - PRODUCTO
# =========================

class RecipeProduct(Base):
    __tablename__ = "recipe_products"

    recipe_id = Column(
        Integer,
        ForeignKey("recipes.id"),
        primary_key=True
    )

    product_id = Column(
        Integer,
        ForeignKey("products.id"),
        primary_key=True
    )

    quantity = Column(
        String,
        nullable=False
    )