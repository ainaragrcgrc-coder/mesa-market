from pydantic import BaseModel, Field, field_validator


# =========================
# CATEGORÍAS
# =========================

class CategoryBase(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=50
    )

    description: str | None = None


class CategoryCreate(CategoryBase):
    pass


class CategoryResponse(CategoryBase):
    id: int

    class Config:
        from_attributes = True


# =========================
# PRODUCTOS
# =========================

class ProductBase(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=100
    )

    description: str | None = None

    price: float = Field(
        gt=0
    )

    stock: int = Field(
        ge=0
    )

    unit: str = Field(
        min_length=1,
        max_length=30
    )

    image: str | None = None

    category_id: int = Field(
        gt=0
    )


class ProductCreate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: int

    class Config:
        from_attributes = True


# =========================
# INGREDIENTES DE RECETA
# =========================

class RecipeIngredient(BaseModel):
    product_id: int
    name: str
    quantity: str


# =========================
# RECETAS
# =========================

class RecipeBase(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=100
    )

    description: str | None = None

    instructions: str = Field(
        min_length=10
    )

    preparation_time: int = Field(
        gt=0
    )

    difficulty: str = Field(
        min_length=3,
        max_length=30
    )

    image: str | None = None


class RecipeCreate(RecipeBase):
    product_ids: list[int] = Field(
        min_length=1
    )

    @field_validator("product_ids")
    @classmethod
    def validate_product_ids(cls, value):
        if len(value) != len(set(value)):
            raise ValueError(
                "No se pueden repetir productos en una receta"
            )

        return value


class RecipeResponse(RecipeBase):
    id: int

    product_ids: list[int] = Field(
        default_factory=list
    )

    ingredients: list[RecipeIngredient] = Field(
        default_factory=list
    )

    class Config:
        from_attributes = True


# =========================
# SUGERENCIAS DE RECETAS
# =========================

class RecipeSuggestionRequest(BaseModel):
    product_ids: list[int] = Field(
        min_length=1
    )