// ============================================================
// MESA MARKET - APP.JS
// ============================================================

const API_URL = "http://127.0.0.1:8000/api/v1";

let products = [];
let categories = [];
let recipes = [];

let cart = JSON.parse(
    localStorage.getItem("mesaMarketCart") || "[]"
);

let selectedIngredientNames = [];
let editingProductId = null;


// ============================================================
// ELEMENTOS DEL DOM
// ============================================================

const $ = id => document.getElementById(id);

const categoriesContainer =
    $("categoriesContainer");

const productsContainer =
    $("productsContainer");

const recipesContainer =
    $("recipesContainer");

const searchInput =
    $("searchInput");

const categoryFilter =
    $("categoryFilter");

const sortFilter =
    $("sortFilter");

const productCount =
    $("productCount");

const ingredientSearch =
    $("ingredientSearch");

const selectAllIngredients =
    $("selectAllIngredients");

const ingredientSelector =
    $("ingredientSelector");

const selectedIngredients =
    $("selectedIngredients");

const findRecipesButton =
    $("findRecipesButton");

const clearIngredientsButton =
    $("clearIngredientsButton");

const recipeFinderResults =
    $("recipeFinderResults");

const cartButton =
    $("cartButton");

const cartCount =
    $("cartCount");

const wishlistButton =
    $("wishlistButton");

const newProductButton =
    $("newProductButton");

const productModal =
    $("productModal");

const productForm =
    $("productForm");

const cancelProductButton =
    $("cancelProductButton");

const saveProductButton =
    $("saveProductButton");

const productFormMessage =
    $("productFormMessage");

const recipeModal =
    $("recipeModal");

const recipeModalContent =
    $("recipeModalContent");

const cartModal =
    $("cartModal");

const cartModalContent =
    $("cartModalContent");


// ============================================================
// IMÁGENES DE PRODUCTOS
// ============================================================

const productImages = {

    "aceite de oliva":
        "assets/products/aceite-oliva.jpg",

    "ajo":
        "assets/products/ajo.jpg",

    "arroz":
        "assets/products/arroz.jpg",

    "atun":
        "assets/products/atun.jpg",

    "azucar":
        "assets/products/azucar.jpg",

    "azucar glas":
        "assets/products/azucar-glas.jpg",

    "cacao en polvo":
        "assets/products/cacao-polvo.jpg",

    "calabacin":
        "assets/products/calabacin.jpg",

    "cebolla":
        "assets/products/cebolla.jpg",

    "chocolate con leche":
        "assets/products/chocolate-con-leche.jpg",

    "chocolate negro":
        "assets/products/chocolate-negro.jpg",

    "harina de almendra":
        "assets/products/harina-almendra.jpg",

    "harina trigo":
        "assets/products/harina-trigo.jpg",

    "harina de trigo":
        "assets/products/harina-trigo.jpg",

    "huevos":
        "assets/products/huevos.jpg",

    "huevo":
        "assets/products/huevos.jpg",

    "levadura":
        "assets/products/levadura.jpg",

    "mantequilla":
        "assets/products/mantequilla.jpg",

    "nata para montar":
        "assets/products/nata-montar.jpg",

    "nata montar":
        "assets/products/nata-montar.jpg",

    "pasta":
        "assets/products/pasta.jpg",

    "patata":
        "assets/products/patata.jpg",

    "patatas":
        "assets/products/patata.jpg",

    "pechuga de pollo":
        "assets/products/pechuga-pollo.jpg",

    "pollo":
        "assets/products/pechuga-pollo.jpg",

    "pimiento rojo":
        "assets/products/pimiento-rojo.jpg",

    "pimiento verde":
        "assets/products/pimiento-verde.jpg",

    "queso":
        "assets/products/queso.jpg",

    "tomate":
        "assets/products/tomate.jpg",

    "tomate rama":
        "assets/products/tomate.jpg",

    "vainilla":
        "assets/products/vainilla.jpg",

    "zanahoria":
        "assets/products/zanahoria.jpg"
};


// ============================================================
// IMÁGENES DE RECETAS
// ============================================================

const recipeImages = {

    "arroz con verduras":
        "assets/recipes/arroz-verduras.jpg",

    "bizcocho de vainilla":
        "assets/recipes/bizcocho-vainilla.jpg",

    "brownie de chocolate":
        "assets/recipes/brownie-chocolate.jpg",

    "ensalada mediterranea":
        "assets/recipes/ensalada-mediterranea.jpg",

    "galletas de chocolate":
        "assets/recipes/galletas-chocolate.jpg",

    "pasta con tomate":
        "assets/recipes/pasta-tomate.jpg",

    "patatas al horno":
        "assets/recipes/patatas-horno.jpg",

    "pollo con verduras":
        "assets/recipes/pollo-verduras.jpg",

    "tomates al horno":
        "assets/recipes/tomates-horno.jpg",

    "tortitas":
        "assets/recipes/tortitas.jpg",

    "tortitas caseras":
        "assets/recipes/tortitas.jpg"
};


// ============================================================
// IMÁGENES DE CATEGORÍAS
// ============================================================

const categoryImages = {

    "dulce":
        "assets/products/chocolate-negro.jpg",

    "salado":
        "assets/products/tomate.jpg"
};


// ============================================================
// UTILIDADES
// ============================================================

function normalizeText(value) {

    return String(value ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}


function escapeHtml(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;
}


function formatPrice(value) {

    const number =
        Number(value);

    if (!Number.isFinite(number)) {
        return "0,00 €";
    }

    return number
        .toFixed(2)
        .replace(".", ",") + " €";
}


function getName(item, fallback) {

    return (
        item?.name ||
        item?.title ||
        item?.nombre ||
        fallback
    );
}


function getProductName(product) {

    return getName(
        product,
        "Producto"
    );
}


function getRecipeName(recipe) {

    return getName(
        recipe,
        "Receta"
    );
}


function getImagePath(
    image,
    fallback
) {

    if (!image) {
        return fallback;
    }

    if (
        /^(https?:|data:)/i.test(image)
    ) {
        return image;
    }

    return String(image)
        .replace(/^\/+/, "");
}


// ============================================================
// IMAGEN PRODUCTO
// ============================================================

function getProductImage(product) {

    const key =
        normalizeText(
            getProductName(product)
        );

    return (
        productImages[key] ||
        getImagePath(
            product.image ||
            product.imagen,
            "assets/products/aceite-oliva.jpg"
        )
    );
}


// ============================================================
// IMAGEN RECETA
// ============================================================

function getRecipeImage(recipe) {

    const key =
        normalizeText(
            getRecipeName(recipe)
        );

    return (
        recipeImages[key] ||
        getImagePath(
            recipe.image ||
            recipe.imagen,
            "assets/recipes/ensalada-mediterranea.jpg"
        )
    );
}


// ============================================================
// IMAGEN CATEGORÍA
// ============================================================

function getCategoryImage(category) {

    const key =
        normalizeText(
            category?.name ||
            category?.title ||
            category?.nombre ||
            ""
        );

    return (
        categoryImages[key] ||
        getImagePath(
            category?.image ||
            category?.imagen,
            "assets/products/aceite-oliva.jpg"
        )
    );
}


// ============================================================
// MODALES
// ============================================================

function setModalOpen(modal) {

    if (!modal) {
        return;
    }

    modal.classList.add("active");
    modal.classList.add("open");

    modal.classList.remove("oculto");

    modal.style.display =
        "flex";

    document.body.classList.add(
        "modal-open"
    );
}


function setModalClosed(modal) {

    if (!modal) {
        return;
    }

    modal.classList.remove(
        "active",
        "open"
    );

    modal.classList.add(
        "oculto"
    );

    modal.style.display =
        "none";

    const anyOpen =
        [recipeModal, productModal, cartModal]
            .some(
                item =>
                    item &&
                    (
                        item.classList.contains("active") ||
                        item.classList.contains("open")
                    )
            );

    if (!anyOpen) {

        document.body.classList.remove(
            "modal-open"
        );
    }
}


// ============================================================
// CARGAR DATOS
// ============================================================

async function loadData() {

    try {

        console.log(
            "Cargando datos desde:",
            API_URL
        );

        const [
            categoriesResponse,
            productsResponse,
            recipesResponse
        ] = await Promise.all([

            axios.get(
                `${API_URL}/categories/`
            ),

            axios.get(
                `${API_URL}/products/`,
                {
                    params: {
                        page: 1,
                        limit: 100
                    }
                }
            ),

            axios.get(
                `${API_URL}/recipes/`
            )
        ]);


        categories =
            Array.isArray(
                categoriesResponse.data
            )
                ? categoriesResponse.data
                : (
                    categoriesResponse.data.items ||
                    []
                );


        products =
            Array.isArray(
                productsResponse.data
            )
                ? productsResponse.data
                : (
                    productsResponse.data.items ||
                    []
                );


        recipes =
            Array.isArray(
                recipesResponse.data
            )
                ? recipesResponse.data
                : (
                    recipesResponse.data.items ||
                    []
                );


        console.log(
            "Categorías:",
            categories
        );

        console.log(
            "Productos:",
            products
        );

        console.log(
            "Recetas:",
            recipes
        );


        renderCategories();

        renderCategoryFilter();

        renderProducts();

        renderRecipes();

        renderIngredientSelector();

        updateCartCount();


    } catch (error) {

        console.error(
            "Error cargando datos:",
            error
        );


        if (productsContainer) {

            productsContainer.innerHTML = `
                <div class="empty-state">
                    <p>
                        No se han podido cargar los productos.
                    </p>
                </div>
            `;
        }


        if (recipesContainer) {

            recipesContainer.innerHTML = `
                <div class="empty-state">
                    <p>
                        No se han podido cargar las recetas.
                    </p>
                </div>
            `;
        }
    }
}


// ============================================================
// CATEGORÍAS
// ============================================================

function renderCategories() {

    if (!categoriesContainer) {
        return;
    }


    categoriesContainer.innerHTML =
        categories
            .map(category => {

                const name =
                    category.name ||
                    category.title ||
                    category.nombre ||
                    "Categoría";


                const image =
                    getCategoryImage(category);


                return `
                    <article class="category-card">

                        <div class="category-image">

                            <img
                                src="${image}"
                                alt="${escapeHtml(name)}"
                                onerror="
                                    this.style.display='none'
                                "
                            >

                        </div>

                        <div class="category-content">

                            <h3>
                                ${escapeHtml(name)}
                            </h3>

                        </div>

                    </article>
                `;

            })
            .join("");
}


// ============================================================
// FILTRO DE CATEGORÍAS
// ============================================================

function renderCategoryFilter() {

    if (!categoryFilter) {
        return;
    }


    categoryFilter.innerHTML = `
        <option value="">
            Todas las categorías
        </option>
    `;


    categories.forEach(category => {

        const id =
            category.id ??
            category.category_id ??
            "";

        const name =
            category.name ||
            category.title ||
            category.nombre ||
            "";


        categoryFilter.innerHTML += `
            <option value="${escapeHtml(String(id))}">
                ${escapeHtml(name)}
            </option>
        `;
    });
}


// ============================================================
// PRODUCTOS
// ============================================================

function renderProducts() {

    if (!productsContainer) {
        return;
    }


    let list =
        [...products];


    const search =
        normalizeText(
            searchInput?.value || ""
        );


    const category =
        categoryFilter?.value || "";


    const sort =
        sortFilter?.value || "";


    if (search) {

        list =
            list.filter(product => {

                const name =
                    normalizeText(
                        getProductName(product)
                    );

                const description =
                    normalizeText(
                        product.description ||
                        product.descripcion ||
                        ""
                    );

                return (
                    name.includes(search) ||
                    description.includes(search)
                );
            });
    }


    if (category) {

        list =
            list.filter(product => {

                const productCategory =
                    product.category_id ??
                    product.category?.id ??
                    product.category ??
                    "";

                return (
                    String(productCategory) ===
                    String(category)
                );
            });
    }


    if (sort === "price-asc") {

        list.sort(
            (a, b) =>
                Number(
                    a.price ??
                    a.precio ??
                    0
                ) -
                Number(
                    b.price ??
                    b.precio ??
                    0
                )
        );
    }


    if (sort === "price-desc") {

        list.sort(
            (a, b) =>
                Number(
                    b.price ??
                    b.precio ??
                    0
                ) -
                Number(
                    a.price ??
                    a.precio ??
                    0
                )
        );
    }


    if (sort === "name-asc") {

        list.sort(
            (a, b) =>
                getProductName(a)
                    .localeCompare(
                        getProductName(b),
                        "es"
                    )
        );
    }


    if (sort === "name-desc") {

        list.sort(
            (a, b) =>
                getProductName(b)
                    .localeCompare(
                        getProductName(a),
                        "es"
                    )
        );
    }


    if (productCount) {

        productCount.textContent =
            String(list.length);
    }


    if (!list.length) {

        productsContainer.innerHTML = `
            <div class="empty-state">

                <p>
                    No hay productos que coincidan.
                </p>

            </div>
        `;

        return;
    }


    productsContainer.innerHTML =
        list
            .map(createProductCard)
            .join("");
}


// ============================================================
// TARJETA PRODUCTO
// ============================================================

function createProductCard(product) {

    const id =
        product.id;

    const name =
        getProductName(product);

    const description =
        product.description ||
        product.descripcion ||
        "";

    const price =
        product.price ??
        product.precio ??
        0;

    const unit =
        product.unit ||
        product.unidad ||
        "unidad";


    return `
        <article class="product-card">

            <div class="product-image">

                <img
                    src="${getProductImage(product)}"
                    alt="${escapeHtml(name)}"
                    onerror="
                        this.src='assets/products/aceite-oliva.jpg'
                    "
                >

            </div>


            <div class="product-content">

                <h3>
                    ${escapeHtml(name)}
                </h3>


                <p class="product-description">
                    ${escapeHtml(description)}
                </p>


                <div class="product-bottom">

                    <strong class="product-price">
                        ${formatPrice(price)}
                    </strong>

                    <span class="product-unit">
                        / ${escapeHtml(unit)}
                    </span>

                </div>


                <div class="product-actions">

                    <button
                        type="button"
                        class="primary-btn add-cart-button"
                        data-id="${id}"
                    >
                        Añadir al carrito
                    </button>


                    <button
                        type="button"
                        class="edit-product-button"
                        data-id="${id}"
                    >
                        Editar
                    </button>


                    <button
                        type="button"
                        class="delete-product-button"
                        data-id="${id}"
                    >
                        Eliminar
                    </button>

                </div>

            </div>

        </article>
    `;
}


// ============================================================
// RECETAS
// ============================================================

function renderRecipes() {

    if (!recipesContainer) {
        return;
    }


    if (!recipes.length) {

        recipesContainer.innerHTML = `
            <div class="empty-state">
                <p>
                    No hay recetas disponibles.
                </p>
            </div>
        `;

        return;
    }


    recipesContainer.innerHTML =
        recipes
            .map(createRecipeCard)
            .join("");
}


// ============================================================
// TARJETA RECETA
// ============================================================

function createRecipeCard(recipe) {

    const name =
        getRecipeName(recipe);

    const description =
        recipe.description ||
        recipe.descripcion ||
        "";


    return `
        <article class="recipe-card">

            <div class="recipe-image">

                <img
                    src="${getRecipeImage(recipe)}"
                    alt="${escapeHtml(name)}"
                    onerror="
                        this.src='assets/recipes/ensalada-mediterranea.jpg'
                    "
                >

            </div>


            <div class="recipe-content">

                <h3>
                    ${escapeHtml(name)}
                </h3>

                <p>
                    ${escapeHtml(description)}
                </p>


                <button
                    type="button"
                    class="primary-btn view-recipe-button"
                    data-id="${recipe.id}"
                >
                    Ver receta
                </button>

            </div>

        </article>
    `;
}


// ============================================================
// INGREDIENTES
// ============================================================

function getRecipeIngredients(recipe) {

    const value =
        recipe.ingredients ||
        recipe.ingredientes ||
        [];


    if (Array.isArray(value)) {

        return value
            .map(item => {

                if (
                    typeof item ===
                    "string"
                ) {
                    return item;
                }

                return (
                    item.name ||
                    item.nombre ||
                    item.ingredient ||
                    ""
                );
            })
            .filter(Boolean);
    }


    if (typeof value === "string") {

        return value
            .split(",")
            .map(item => item.trim())
            .filter(Boolean);
    }


    return [];
}


// ============================================================
// SELECTOR INGREDIENTES
// ============================================================

function renderIngredientSelector() {

    if (!ingredientSelector) {
        return;
    }


    const map =
        new Map();


    recipes.forEach(recipe => {

        getRecipeIngredients(recipe)
            .forEach(ingredient => {

                const key =
                    normalizeText(ingredient);


                if (
                    key &&
                    !map.has(key)
                ) {

                    map.set(
                        key,
                        ingredient
                    );
                }
            });
    });


    const search =
        normalizeText(
            ingredientSearch?.value ||
            ""
        );


    const ingredients =
        [...map.values()]
            .filter(
                ingredient =>
                    normalizeText(
                        ingredient
                    ).includes(search)
            )
            .sort(
                (a, b) =>
                    normalizeText(a)
                        .localeCompare(
                            normalizeText(b),
                            "es"
                        )
            );


    ingredientSelector.innerHTML =
        ingredients
            .map(ingredient => {

                const checked =
                    selectedIngredientNames
                        .some(
                            item =>
                                normalizeText(item) ===
                                normalizeText(ingredient)
                        );


                const image =
                    productImages[
                        normalizeText(ingredient)
                    ] ||
                    "assets/products/aceite-oliva.jpg";


                return `
                    <label class="ingredient-option">

                        <input
                            type="checkbox"
                            value="${escapeHtml(ingredient)}"
                            ${checked ? "checked" : ""}
                        >

                        <img
                            src="${image}"
                            alt="${escapeHtml(ingredient)}"
                            onerror="
                                this.src='assets/products/aceite-oliva.jpg'
                            "
                        >

                        <span>
                            ${escapeHtml(ingredient)}
                        </span>

                    </label>
                `;

            })
            .join("");


    updateSelectedIngredients();
}


// ============================================================
// INGREDIENTES SELECCIONADOS
// ============================================================

function updateSelectedIngredients() {

    if (!selectedIngredients) {
        return;
    }


    if (!selectedIngredientNames.length) {

        selectedIngredients.innerHTML = `
            <span class="no-selection">
                Ningún ingrediente seleccionado
            </span>
        `;

        return;
    }


    selectedIngredients.innerHTML =
        selectedIngredientNames
            .map(
                ingredient => `
                    <span class="selected-ingredient">
                        ${escapeHtml(ingredient)}
                    </span>
                `
            )
            .join("");
}


// ============================================================
// BUSCAR RECETAS
// ============================================================

function findRecipesByIngredients() {

    if (!recipeFinderResults) {
        return;
    }


    if (!selectedIngredientNames.length) {

        recipeFinderResults.innerHTML = `
            <div class="empty-state">

                <p>
                    Selecciona al menos un ingrediente.
                </p>

            </div>
        `;

        return;
    }


    const selected =
        selectedIngredientNames
            .map(normalizeText);


    const matches =
        recipes.filter(recipe => {

            const ingredients =
                getRecipeIngredients(recipe)
                    .map(normalizeText);


            return selected.every(
                selectedIngredient =>
                    ingredients.some(
                        ingredient =>
                            ingredient.includes(
                                selectedIngredient
                            )
                    )
            );
        });


    recipeFinderResults.innerHTML =
        matches.length
            ? matches
                .map(createFinderRecipeCard)
                .join("")
            : `
                <div class="empty-state">
                    <p>
                        Aún no encontramos recetas con esos ingredientes.
                    </p>
                </div>
            `;
}


// ============================================================
// TARJETA RESULTADO RECETA
// ============================================================

function createFinderRecipeCard(recipe) {

    const name =
        getRecipeName(recipe);


    return `
        <article class="finder-recipe-card">

            <div class="finder-recipe-image">

                <img
                    src="${getRecipeImage(recipe)}"
                    alt="${escapeHtml(name)}"
                    onerror="
                        this.src='assets/recipes/ensalada-mediterranea.jpg'
                    "
                >

            </div>


            <div class="finder-recipe-content">

                <h3>
                    ${escapeHtml(name)}
                </h3>


                <button
                    type="button"
                    class="primary-btn view-recipe-button"
                    data-id="${recipe.id}"
                >
                    Ver receta
                </button>

            </div>

        </article>
    `;
}


// ============================================================
// MODAL RECETA
// ============================================================

function openRecipeModal(recipeOrId) {

    if (
        !recipeModal ||
        !recipeModalContent
    ) {
        return;
    }


    const recipe =
        typeof recipeOrId === "object"
            ? recipeOrId
            : recipes.find(
                item =>
                    String(item.id) ===
                    String(recipeOrId)
            );


    if (!recipe) {
        return;
    }


    const name =
        getRecipeName(recipe);

    const description =
        recipe.description ||
        recipe.descripcion ||
        "";

    const instructions =
        recipe.instructions ||
        recipe.instrucciones ||
        recipe.steps ||
        recipe.pasos ||
        "";

    const ingredients =
        getRecipeIngredients(recipe);


    recipeModalContent.innerHTML = `

        <div class="recipe-detail">

            <img
                class="recipe-detail-image"
                src="${getRecipeImage(recipe)}"
                alt="${escapeHtml(name)}"
                onerror="
                    this.src='assets/recipes/ensalada-mediterranea.jpg'
                "
            >


            <h2>
                ${escapeHtml(name)}
            </h2>


            ${
                description
                    ? `
                        <p>
                            ${escapeHtml(description)}
                        </p>
                    `
                    : ""
            }


            ${
                ingredients.length
                    ? `
                        <h3>
                            Ingredientes
                        </h3>

                        <ul>
                            ${
                                ingredients
                                    .map(
                                        item =>
                                            `<li>
                                                ${escapeHtml(item)}
                                            </li>`
                                    )
                                    .join("")
                            }
                        </ul>
                    `
                    : ""
            }


            ${
                instructions
                    ? `
                        <h3>
                            Preparación
                        </h3>

                        <p>
                            ${escapeHtml(instructions)}
                        </p>
                    `
                    : ""
            }

        </div>
    `;


    setModalOpen(recipeModal);
}


function closeRecipeModal() {

    setModalClosed(
        recipeModal
    );
}


// ============================================================
// CARRITO
// ============================================================

function saveCart() {

    localStorage.setItem(
        "mesaMarketCart",
        JSON.stringify(cart)
    );
}


function updateCartCount() {

    if (!cartCount) {
        return;
    }


    const count =
        cart.reduce(
            (total, item) =>
                total +
                Number(
                    item.quantity || 1
                ),
            0
        );


    cartCount.textContent =
        String(count);
}


function addToCart(productId) {

    const product =
        products.find(
            item =>
                String(item.id) ===
                String(productId)
        );


    if (!product) {
        return;
    }


    const existing =
        cart.find(
            item =>
                String(item.id) ===
                String(productId)
        );


    if (existing) {

        existing.quantity =
            Number(
                existing.quantity || 1
            ) + 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }


    saveCart();

    updateCartCount();
}


function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                String(item.id) !==
                String(productId)
        );


    saveCart();

    updateCartCount();

    renderCart();
}


function changeCartQuantity(
    productId,
    delta
) {

    const item =
        cart.find(
            product =>
                String(product.id) ===
                String(productId)
        );


    if (!item) {
        return;
    }


    item.quantity =
        Number(
            item.quantity || 1
        ) + delta;


    if (item.quantity <= 0) {

        removeFromCart(
            productId
        );

        return;
    }


    saveCart();

    updateCartCount();

    renderCart();
}


function renderCart() {

    if (!cartModalContent) {
        return;
    }


    if (!cart.length) {

        cartModalContent.innerHTML = `

            <div class="empty-state">

                <h3>
                    Tu cesta está vacía
                </h3>

                <p>
                    Añade productos para empezar.
                </p>

            </div>
        `;

        return;
    }


    let total = 0;


    const items =
        cart
            .map(item => {

                const price =
                    Number(
                        item.price ??
                        item.precio ??
                        0
                    );

                const quantity =
                    Number(
                        item.quantity || 1
                    );


                total +=
                    price * quantity;


                return `
                    <div class="cart-item">

                        <img
                            src="${getProductImage(item)}"
                            alt="${escapeHtml(
                                getProductName(item)
                            )}"
                        >

                        <div class="cart-item-info">

                            <h3>
                                ${escapeHtml(
                                    getProductName(item)
                                )}
                            </h3>

                            <strong>
                                ${formatPrice(price)}
                            </strong>


                            <div class="cart-quantity">

                                <button
                                    type="button"
                                    data-cart-minus="${item.id}"
                                >
                                    −
                                </button>

                                <span>
                                    ${quantity}
                                </span>

                                <button
                                    type="button"
                                    data-cart-plus="${item.id}"
                                >
                                    +
                                </button>

                            </div>

                        </div>


                        <button
                            type="button"
                            class="cart-remove-button"
                            data-cart-remove="${item.id}"
                        >
                            Eliminar
                        </button>

                    </div>
                `;

            })
            .join("");


    cartModalContent.innerHTML = `

        <div class="cart-list">

            ${items}

        </div>


        <div class="cart-total">

            <strong>
                Total
            </strong>

            <strong>
                ${formatPrice(total)}
            </strong>

        </div>


        <button
            type="button"
            class="primary-btn cart-checkout-btn"
            id="checkoutButton"
        >
            Finalizar compra
        </button>
    `;
}


// ============================================================
// MODAL PRODUCTO
// ============================================================

function field(id) {

    return $(id);
}


function openProductModal(
    product = null
) {

    if (
        !productModal ||
        !productForm
    ) {
        return;
    }


    editingProductId =
        product?.id ?? null;


    productForm.reset();


    if (product) {

        if (field("productName")) {

            field(
                "productName"
            ).value =
                getProductName(product);
        }


        if (field("productDescription")) {

            field(
                "productDescription"
            ).value =
                product.description ||
                product.descripcion ||
                "";
        }


        if (field("productPrice")) {

            field(
                "productPrice"
            ).value =
                product.price ??
                product.precio ??
                "";
        }


        if (field("productStock")) {

            field(
                "productStock"
            ).value =
                product.stock ??
                "";
        }


        if (field("productUnit")) {

            field(
                "productUnit"
            ).value =
                product.unit ||
                product.unidad ||
                "";
        }


        if (field("productCategory")) {

            field(
                "productCategory"
            ).value =
                product.category_id ??
                product.category?.id ??
                product.category ??
                "";
        }


        if (field("productImage")) {

            field(
                "productImage"
            ).value =
                product.image ||
                product.imagen ||
                "";
        }
    }


    if (productFormMessage) {

        productFormMessage.textContent =
            "";
    }


    setModalOpen(
        productModal
    );
}


function closeProductModal() {

    setModalClosed(
        productModal
    );

    editingProductId =
        null;
}


// ============================================================
// GUARDAR PRODUCTO
// ============================================================

async function saveProduct(event) {

    event.preventDefault();


    const name =
        field(
            "productName"
        )?.value.trim() ||
        "";


    const description =
        field(
            "productDescription"
        )?.value.trim() ||
        "";


    const price =
        Number(
            field(
                "productPrice"
            )?.value || 0
        );


    const stock =
        Number(
            field(
                "productStock"
            )?.value || 0
        );


    const unit =
        field(
            "productUnit"
        )?.value.trim() ||
        "unidad";


    const category =
        field(
            "productCategory"
        )?.value ||
        "";


    const image =
        field(
            "productImage"
        )?.value.trim() ||
        null;


    if (!name) {

        if (productFormMessage) {

            productFormMessage.textContent =
                "El nombre es obligatorio.";
        }

        return;
    }


    const data = {

        name,

        description,

        price,

        stock,

        unit,

        category_id:
            category
                ? Number(category)
                : null,

        image
    };


    try {

        if (editingProductId) {

            await axios.put(
                `${API_URL}/products/${editingProductId}`,
                data
            );

        } else {

            await axios.post(
                `${API_URL}/products/`,
                data
            );
        }


        closeProductModal();

        await loadData();


    } catch (error) {

        console.error(
            "Error guardando producto:",
            error
        );


        if (productFormMessage) {

            productFormMessage.textContent =
                error.response?.data?.detail ||
                "No se ha podido guardar el producto.";
        }
    }
}


// ============================================================
// ELIMINAR PRODUCTO
// ============================================================

async function deleteProduct(
    productId
) {

    const product =
        products.find(
            item =>
                String(item.id) ===
                String(productId)
        );


    if (!product) {
        return;
    }


    const confirmed =
        confirm(
            `¿Quieres eliminar "${getProductName(
                product
            )}"?`
        );


    if (!confirmed) {
        return;
    }


    try {

        await axios.delete(
            `${API_URL}/products/${productId}`
        );


        await loadData();


    } catch (error) {

        console.error(
            "Error eliminando producto:",
            error
        );


        alert(
            "No se ha podido eliminar el producto."
        );
    }
}


// ============================================================
// MODAL CARRITO
// ============================================================

function openCartModal() {

    renderCart();

    setModalOpen(
        cartModal
    );
}


function closeCartModal() {

    setModalClosed(
        cartModal
    );
}


// ============================================================
// CAPA VISUAL DE SEGURIDAD
// ============================================================

function injectUiFixes() {

    if (
        document.getElementById(
            "mesaMarketUiFixes"
        )
    ) {
        return;
    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "mesaMarketUiFixes";


    style.textContent = `

        .category-image {
            overflow: hidden;
            border-radius: 18px;
        }

        .category-image img {
            width: 100%;
            height: 100%;
            min-height: 170px;
            object-fit: cover;
            display: block;
        }

        .product-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 18px;
        }

        .product-actions button {
            border: 0;
            border-radius: 12px;
            padding: 12px 14px;
            font: 600 14px/1.2 system-ui, sans-serif;
            cursor: pointer;
            transition: .2s ease;
        }

        .product-actions
        .add-cart-button {
            grid-column: 1 / -1;
            background: #144228;
            color: #ffffff;
        }

        .product-actions
        .edit-product-button {
            background: #eef3ef;
            color: #144228;
            border: 1px solid #cbd7ce;
        }

        .product-actions
        .delete-product-button {
            background: #fff1ed;
            color: #8e3410;
            border: 1px solid #edc8bb;
        }

        .product-actions button:hover {
            transform: translateY(-1px);
        }

        .view-recipe-button {
            margin-top: 14px;
            border: 0;
            border-radius: 12px;
            padding: 12px 18px;
            background: #144228;
            color: #ffffff;
            font-weight: 700;
            cursor: pointer;
        }

        .recipe-detail-image {
            width: 100%;
            max-height: 300px;
            object-fit: cover;
            border-radius: 18px;
            display: block;
            margin-bottom: 20px;
        }

        .modal-content {
            max-height: 90vh;
            overflow-y: auto;
            border-radius: 24px;
        }

        body.modal-open {
            overflow: hidden;
        }

        .modal.oculto {
            display: none !important;
        }

        .modal.active,
        .modal.open,
        .modal-overlay.active,
        .modal-overlay.open {
            display: flex !important;
        }

        @media (max-width: 600px) {

            .product-actions {
                grid-template-columns: 1fr;
            }

            .product-actions
            .add-cart-button {
                grid-column: auto;
            }
        }
    `;


    document.head.appendChild(
        style
    );
}


// ============================================================
// EVENTOS
// ============================================================

searchInput?.addEventListener(
    "input",
    renderProducts
);


categoryFilter?.addEventListener(
    "change",
    renderProducts
);


sortFilter?.addEventListener(
    "change",
    renderProducts
);


ingredientSearch?.addEventListener(
    "input",
    renderIngredientSelector
);


ingredientSelector?.addEventListener(
    "change",
    event => {

        if (
            event.target.type !==
            "checkbox"
        ) {
            return;
        }


        const value =
            event.target.value;


        if (
            event.target.checked
        ) {

            if (
                !selectedIngredientNames.some(
                    item =>
                        normalizeText(item) ===
                        normalizeText(value)
                )
            ) {

                selectedIngredientNames.push(
                    value
                );
            }

        } else {

            selectedIngredientNames =
                selectedIngredientNames.filter(
                    item =>
                        normalizeText(item) !==
                        normalizeText(value)
                );
        }


        updateSelectedIngredients();
    }
);


selectAllIngredients?.addEventListener(
    "change",
    event => {

        const boxes =
            ingredientSelector
                ?.querySelectorAll(
                    'input[type="checkbox"]'
                ) || [];


        boxes.forEach(
            box =>
                box.checked =
                    event.target.checked
        );


        selectedIngredientNames =
            event.target.checked
                ? [...boxes].map(
                    box =>
                        box.value
                )
                : [];


        updateSelectedIngredients();
    }
);


findRecipesButton?.addEventListener(
    "click",
    findRecipesByIngredients
);


clearIngredientsButton?.addEventListener(
    "click",
    () => {

        selectedIngredientNames =
            [];


        if (ingredientSearch) {

            ingredientSearch.value =
                "";
        }


        if (selectAllIngredients) {

            selectAllIngredients.checked =
                false;
        }


        renderIngredientSelector();


        if (recipeFinderResults) {

            recipeFinderResults.innerHTML =
                "";
        }
    }
);


cartButton?.addEventListener(
    "click",
    openCartModal
);


wishlistButton?.addEventListener(
    "click",
    () => {

        alert(
            "La función de favoritos estará disponible próximamente."
        );
    }
);


newProductButton?.addEventListener(
    "click",
    () => {

        openProductModal();
    }
);


cancelProductButton?.addEventListener(
    "click",
    closeProductModal
);


productForm?.addEventListener(
    "submit",
    saveProduct
);


// ============================================================
// BOTONES DINÁMICOS DE PRODUCTOS
// ============================================================

productsContainer?.addEventListener(
    "click",
    event => {

        const add =
            event.target.closest(
                ".add-cart-button"
            );


        if (add) {

            addToCart(
                add.dataset.id
            );

            return;
        }


        const edit =
            event.target.closest(
                ".edit-product-button"
            );


        if (edit) {

            const product =
                products.find(
                    item =>
                        String(item.id) ===
                        String(
                            edit.dataset.id
                        )
                );


            if (product) {

                openProductModal(
                    product
                );
            }

            return;
        }


        const remove =
            event.target.closest(
                ".delete-product-button"
            );


        if (remove) {

            deleteProduct(
                remove.dataset.id
            );
        }
    }
);


// ============================================================
// BOTONES DINÁMICOS DE RECETAS
// ============================================================

recipesContainer?.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".view-recipe-button"
            );


        if (button) {

            openRecipeModal(
                button.dataset.id
            );
        }
    }
);


recipeFinderResults?.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".view-recipe-button"
            );


        if (button) {

            openRecipeModal(
                button.dataset.id
            );
        }
    }
);


// ============================================================
// BOTONES DEL CARRITO
// ============================================================

cartModalContent?.addEventListener(
    "click",
    event => {

        const remove =
            event.target.closest(
                "[data-cart-remove]"
            );


        if (remove) {

            removeFromCart(
                remove.dataset.cartRemove
            );

            return;
        }


        const plus =
            event.target.closest(
                "[data-cart-plus]"
            );


        if (plus) {

            changeCartQuantity(
                plus.dataset.cartPlus,
                1
            );

            return;
        }


        const minus =
            event.target.closest(
                "[data-cart-minus]"
            );


        if (minus) {

            changeCartQuantity(
                minus.dataset.cartMinus,
                -1
            );

            return;
        }


        const checkout =
            event.target.closest(
                "#checkoutButton"
            );


        if (checkout) {

            alert(
                "La función de compra estará disponible próximamente."
            );
        }
    }
);


// ============================================================
// CERRAR MODALES
// ============================================================

document.addEventListener(
    "click",
    event => {

        const closeButton =
            event.target.closest(
                ".modal-close, .close-modal, [data-close-modal]"
            );


        if (closeButton) {

            const modal =
                closeButton.closest(
                    ".modal, .modal-overlay"
                );


            if (modal) {

                setModalClosed(
                    modal
                );
            }

            return;
        }


        if (
            event.target.matches(
                ".modal, .modal-overlay"
            )
        ) {

            setModalClosed(
                event.target
            );
        }
    }
);


// ============================================================
// CERRAR CON ESC
// ============================================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeRecipeModal();

            closeProductModal();

            closeCartModal();
        }
    }
);


// ============================================================
// INICIO
// ============================================================

async function init() {

    console.log(
        "MESA MARKET iniciando..."
    );


    injectUiFixes();


    updateCartCount();


    await loadData();


    console.log(
        "MESA MARKET cargado correctamente."
    );
}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        init
    );

} else {

    init();
}