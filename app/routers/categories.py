from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Category
from ..schemas import CategoryCreate, CategoryResponse


router = APIRouter(
    prefix="/api/v1/categories",
    tags=["Categories"]
)


@router.get("/", response_model=list[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()


@router.get("/{category_id}", response_model=CategoryResponse)
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Categoría no encontrada"
        )

    return category


@router.post(
    "/",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED
)
def create_category(
    category_data: CategoryCreate,
    db: Session = Depends(get_db)
):
    existing_category = (
        db.query(Category)
        .filter(Category.name == category_data.name)
        .first()
    )

    if existing_category:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="La categoría ya existe"
        )

    category = Category(
        name=category_data.name,
        description=category_data.description
    )

    db.add(category)
    db.commit()
    db.refresh(category)

    return category


@router.put("/{category_id}", response_model=CategoryResponse)
def update_category(
    category_id: int,
    category_data: CategoryCreate,
    db: Session = Depends(get_db)
):
    category = db.query(Category).filter(Category.id == category_id).first()

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Categoría no encontrada"
        )

    existing_category = (
        db.query(Category)
        .filter(
            Category.name == category_data.name,
            Category.id != category_id
        )
        .first()
    )

    if existing_category:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Ya existe otra categoría con ese nombre"
        )

    category.name = category_data.name
    category.description = category_data.description

    db.commit()
    db.refresh(category)

    return category


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(
    category_id: int,
    db: Session = Depends(get_db)
):
    category = db.query(Category).filter(Category.id == category_id).first()

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Categoría no encontrada"
        )

    db.delete(category)
    db.commit()

    return None