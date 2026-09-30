# 🛒 MESA MARKET

> Aplicación web de supermercado online especializada en ingredientes, productos y recetas.

MESA MARKET es una aplicación **Full Stack** desarrollada como proyecto de aprendizaje en **Factoría F5**.

La aplicación permite consultar un catálogo de productos alimentarios, filtrarlos por categorías, buscar ingredientes, añadir productos a una cesta de compra y descubrir recetas relacionadas con los productos disponibles.

El proyecto está compuesto por una **API REST desarrollada con FastAPI**, una base de datos relacional **SQLite** y un frontend desarrollado con **HTML5, CSS3 y JavaScript**.

---

## 📋 Índice

* [Características principales](#-características-principales)
* [Tecnologías utilizadas](#-tecnologías-utilizadas)
* [Estructura del proyecto](#-estructura-del-proyecto)
* [Base de datos](#-base-de-datos)
* [API REST](#-api-rest)
* [Documentación de la API](#-documentación-de-la-api)
* [Instalación](#-instalación)
* [Ejecución](#-ejecución)
* [Frontend](#-frontend)
* [Cesta de compra](#-cesta-de-compra)
* [Recetas y sugerencias](#-recetas-y-sugerencias)
* [Validación de datos](#-validación-de-datos)
* [Diseño responsive](#-diseño-responsive)
* [Autora](#-autora)
* [Repositorio](#-repositorio)

---

## 📋 Características principales

### 🛍️ Catálogo de productos

MESA MARKET dispone de un catálogo de productos alimentarios que permite:

* Consultar los productos disponibles.
* Visualizar el nombre del producto.
* Consultar su descripción.
* Consultar el precio.
* Consultar el stock disponible.
* Consultar la unidad de venta.
* Visualizar imágenes.
* Buscar productos.
* Filtrar productos por categoría.

Actualmente el catálogo contiene **26 productos**.

### 📂 Categorías

Los productos están organizados en diferentes categorías.

Actualmente se utilizan:

* **Dulce**
* **Salado**

La aplicación cuenta actualmente con **2 categorías**.

### 🥗 Recetas

La aplicación incorpora un sistema de recetas relacionadas con los productos del supermercado.

Cada receta puede incluir:

* Nombre.
* Descripción.
* Ingredientes.
* Instrucciones.
* Tiempo de preparación.
* Dificultad.
* Imagen.

Actualmente existen **10 recetas**.

### 🛒 Cesta de compra

El usuario puede:

* Añadir productos.
* Aumentar la cantidad de un producto.
* Disminuir la cantidad.
* Eliminar productos.
* Consultar el total de la compra.

La cesta se mantiene en el navegador utilizando `localStorage`.

---

## 🛠️ Tecnologías utilizadas

### Backend

* **Python**
* **FastAPI**
* **SQLAlchemy**
* **Pydantic**
* **SQLite**
* **Uvicorn**

### Frontend

* **HTML5**
* **CSS3**
* **JavaScript**
* **Axios**
* **LocalStorage**

### Herramientas

* **Visual Studio Code**
* **Git**
* **GitHub**
* **Swagger / OpenAPI**

---

## 📁 Estructura del proyecto

```text
mesa-market/
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── categories.py
│   │   │   ├── products.py
│   │   │   └── recipes.py
│   │   │
│   │   ├── __init__.py
│   │   ├── database.py
│   │   ├── fix_images.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── seed.py
│   │
│   ├── mesa_market.db
│   └── requirements.txt
│
├── docs/
│
├── frontend/
│   ├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── index.html
│
├── .gitignore
└── README.md
```

---

## 🗄️ Base de datos

MESA MARKET utiliza **SQLite** como sistema de base de datos y **SQLAlchemy** como ORM.

La aplicación trabaja con tres entidades principales:

* **Categorías**
* **Productos**
* **Recetas**

### Datos actuales

| Elemento                   | Cantidad |
| -------------------------- | -------: |
| Categorías                 |        2 |
| Productos                  |       26 |
| Recetas                    |       10 |
| Relaciones receta-producto |       46 |

### Relaciones entre entidades

#### Categorías y productos

Una categoría puede contener varios productos.

```text
Categoría
    │
    └── Productos
```

#### Productos y recetas

Una receta puede utilizar varios productos y un mismo producto puede utilizarse en diferentes recetas.

```text
Producto
    ↕
Receta
```

Estas relaciones permiten conectar el catálogo del supermercado con el sistema de recetas.

---

## 🌐 API REST

La API está desarrollada utilizando **FastAPI**.

La versión actual de la API es:

```text
1.0.0
```

### Endpoint principal

```http
GET /
```

Devuelve información sobre el estado de la API.

### Categorías

| Método | Endpoint                           | Descripción                  |
| ------ | ---------------------------------- | ---------------------------- |
| GET    | `/api/v1/categories/`              | Obtener todas las categorías |
| POST   | `/api/v1/categories/`              | Crear una categoría          |
| GET    | `/api/v1/categories/{category_id}` | Obtener una categoría        |
| PUT    | `/api/v1/categories/{category_id}` | Actualizar una categoría     |
| DELETE | `/api/v1/categories/{category_id}` | Eliminar una categoría       |

### Productos

| Método | Endpoint                        | Descripción            |
| ------ | ------------------------------- | ---------------------- |
| GET    | `/api/v1/products/`             | Obtener productos      |
| POST   | `/api/v1/products/`             | Crear un producto      |
| GET    | `/api/v1/products/{product_id}` | Obtener un producto    |
| PUT    | `/api/v1/products/{product_id}` | Actualizar un producto |
| DELETE | `/api/v1/products/{product_id}` | Eliminar un producto   |

El listado de productos permite utilizar parámetros de consulta para:

* Paginación.
* Búsqueda.
* Filtrado por categoría.

Ejemplo:

```text
/api/v1/products/?page=1&limit=100
```

### Recetas

| Método | Endpoint                      | Descripción           |
| ------ | ----------------------------- | --------------------- |
| GET    | `/api/v1/recipes/`            | Obtener recetas       |
| POST   | `/api/v1/recipes/`            | Crear una receta      |
| GET    | `/api/v1/recipes/{recipe_id}` | Obtener una receta    |
| PUT    | `/api/v1/recipes/{recipe_id}` | Actualizar una receta |
| DELETE | `/api/v1/recipes/{recipe_id}` | Eliminar una receta   |

### Recetas relacionadas con un producto

```http
GET /api/v1/recipes/product/{product_id}
```

Este endpoint permite obtener las recetas relacionadas con un producto concreto.

### Sugerencias de recetas

```http
POST /api/v1/recipes/suggestions
```

Este endpoint permite obtener sugerencias de recetas a partir de una selección de productos.

---

## 📖 Documentación de la API

FastAPI genera automáticamente documentación interactiva mediante **Swagger UI**.

Una vez iniciado el servidor, se puede acceder a:

```text
http://127.0.0.1:8000/docs
```

También está disponible la especificación OpenAPI:

```text
http://127.0.0.1:8000/openapi.json
```

La documentación permite consultar y probar directamente los diferentes endpoints de la API.

---

## 💻 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/ainaragrcgrc-coder/mesa-market.git
```

Entrar en el proyecto:

```bash
cd mesa-market
```

### 2. Crear el entorno virtual

Entrar en la carpeta `backend`:

```powershell
cd backend
```

Crear el entorno virtual:

```powershell
python -m venv .venv
```

### 3. Activar el entorno virtual

En Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

### 4. Instalar las dependencias

```powershell
pip install -r requirements.txt
```

---

## ▶️ Ejecución

### 1. Cargar los datos iniciales

Desde la carpeta raíz del proyecto:

```powershell
python -m backend.app.seed
```

Este comando crea y carga los datos iniciales de MESA MARKET.

### 2. Iniciar el servidor FastAPI

Desde la carpeta `backend`:

```powershell
python -m uvicorn app.main:app --reload
```

La API estará disponible en:

```text
http://127.0.0.1:8000
```

La documentación interactiva estará disponible en:

```text
http://127.0.0.1:8000/docs
```

---

## 🖥️ Frontend

El frontend se encuentra dentro de la carpeta:

```text
frontend/
```

Está desarrollado utilizando:

* HTML5.
* CSS3.
* JavaScript.
* Axios.

El frontend realiza peticiones a la API de FastAPI para obtener los datos.

La aplicación obtiene y muestra dinámicamente:

* Categorías.
* Productos.
* Recetas.

---

## 🛒 Cesta de compra

La cesta de compra se gestiona mediante JavaScript.

Las principales funcionalidades son:

* Añadir productos.
* Aumentar cantidades.
* Disminuir cantidades.
* Eliminar productos.
* Calcular automáticamente el total.

La información de la cesta se almacena en el navegador mediante:

```text
localStorage
```

La clave utilizada por la aplicación es:

```text
mesaMarketCart
```

---

## 🔎 Recetas y sugerencias

MESA MARKET incorpora un sistema de recetas relacionado con los productos del catálogo.

El usuario puede seleccionar diferentes ingredientes y consultar las recetas relacionadas con ellos.

El sistema utiliza las relaciones existentes entre productos y recetas para generar las sugerencias.

---

## 🔐 Validación de datos

La API utiliza **Pydantic** para validar los datos recibidos.

Entre las validaciones implementadas se encuentran:

* Los nombres tienen una longitud mínima y máxima.
* El precio debe ser mayor que cero.
* El stock no puede ser negativo.
* El identificador de categoría debe ser válido.
* El tiempo de preparación debe ser mayor que cero.
* Las recetas deben tener al menos un producto.
* No se permiten productos repetidos dentro de una misma receta.

---

## 📱 Diseño responsive

La interfaz está adaptada a diferentes tamaños de pantalla mediante CSS responsive.

El diseño contempla:

* 💻 Ordenadores.
* 📱 Tablets.
* 📱 Dispositivos móviles.

Se utilizan diferentes puntos de ruptura (`breakpoints`) para adaptar la distribución de los elementos a cada tamaño de pantalla.

---

## 🎨 Diseño visual

El diseño de MESA MARKET está inspirado en la estética de un supermercado mediterráneo.

La interfaz utiliza principalmente:

* Tonos verdes.
* Tonos terracota.
* Tonos crema.
* Imágenes de alimentos.
* Tarjetas de productos.
* Tarjetas de recetas.
* Elementos visuales relacionados con alimentación.

---

## 📚 Documentación del proyecto

La carpeta `docs/` está destinada a contener documentación y recursos complementarios del proyecto.

La API cuenta además con documentación automática mediante Swagger UI.

---

## 👩‍💻 Autora

**Ainara**

---

## 🔗 Repositorio

El código fuente del proyecto está disponible en GitHub:

[GitHub - MESA MARKET](https://github.com/ainaragrcgrc-coder/mesa-market)

---
