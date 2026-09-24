from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from . import models
from .routers import categories, products, recipes


app = FastAPI(
    title="MESA MARKET API",
    description="API REST para un supermercado online de ingredientes y recetas.",
    version="1.0.0",
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# CREAR BASE DE DATOS
# =========================

Base.metadata.create_all(bind=engine)


# =========================
# ROUTERS
# =========================

app.include_router(categories.router)
app.include_router(products.router)
app.include_router(recipes.router)


# =========================
# RUTA PRINCIPAL
# =========================

@app.get("/")
def root():
    return {
        "message": "Bienvenido a MESA MARKET API",
        "status": "online"
    }