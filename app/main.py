from fastapi import FastAPI

from .database import engine, Base
from . import models
from .routers import categories, products, recipes


app = FastAPI(
    title="MESA MARKET API",
    description="API REST para un supermercado online de ingredientes y recetas.",
    version="1.0.0",
)


Base.metadata.create_all(bind=engine)


app.include_router(categories.router)
app.include_router(products.router)
app.include_router(recipes.router)

@app.get("/")
def root():
    return {
        "message": "Bienvenido a MESA MARKET API",
        "status": "online"
    }
