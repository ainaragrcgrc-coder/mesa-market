const API_URL = "http://127.0.0.1:8000/api/v1";

let products = [];
let recipes = [];
let categories = [];
let cart = [];

let selectedIngredientIds = [];


// =========================
// IMÁGENES DE PRODUCTOS
// =========================

const productImages = {
    "Aceite de oliva": "assets/products/aceite-oliva.jpg",
    "Ajo": "assets/products/ajo.jpg",
    "Arroz": "assets/products/arroz.jpg",
    "Atún": "assets/products/atun.jpg",
    "Azúcar glas": "assets/products/azucar-glas.jpg",
    "Azúcar": "assets/products/azucar.jpg",
    "Cacao en polvo": "assets/products/cacao-polvo.jpg",
    "Calabacín": "assets/products/calabacin.jpg",
    "Cebolla": "assets/products/cebolla.jpg",
    "Chocolate con leche": "assets/products/chocolate-con-leche.jpg",
    "Chocolate negro": "assets/products/chocolate-negro.jpg",
    "Harina de almendra": "assets/products/harina-almendra.jpg",
    "Harina de trigo": "assets/products/harina-trigo.jpg",
    "Huevos": "assets/products/huevos.jpg",
    "Levadura": "assets/products/levadura.jpg",
    "Mantequilla": "assets/products/mantequilla.jpg",
    "Nata para montar": "assets/products/nata-montar.jpg",
    "Pasta": "assets/products/pasta.jpg",
    "Patata": "assets/products/patata.jpg",
    "Pechuga de pollo": "assets/products/pechuga-pollo.jpg",
    "Pimiento rojo": "assets/products/pimiento-rojo.jpg",
    "Pimiento verde": "assets/products/pimiento-verde.jpg",
    "Queso": "assets/products/queso.jpg",
    "Tomate": "assets/products/tomate.jpg",
    "Vainilla": "assets/products/vainilla.jpg",
    "Zanahoria": "assets/products/zanahoria.jpg"
};


// =========================
// IMÁGENES DE RECETAS
// =========================

const recipeImages = {
    "Brownie de chocolate": "assets/recipes/brownie-chocolate.jpg",
    "Tortitas caseras": "assets/recipes/tortitas.jpg",
    "Bizcocho de vainilla": "assets/recipes/bizcocho-vainilla.jpg",
    "Galletas de chocolate": "assets/recipes/galletas-chocolate.jpg",
    "Tomates al horno": "assets/recipes/tomates-horno.jpg",
    "Pasta con tomate": "assets/recipes/pasta-tomate.jpg",
    "Arroz con verduras": "assets/recipes/arroz-verduras.jpg",
    "Ensalada mediterránea": "assets/recipes/ensalada-mediterranea.jpg",
    "Pollo con verduras": "assets/recipes/pollo-verduras.jpg",
    "Patatas al horno": "assets/recipes/patatas-horno.jpg"
};


// =========================
// IMÁGENES DE CATEGORÍAS
// =========================

const categoryImages = {
    "Dulce": "assets/recipes/brownie-chocolate.jpg",
    "Salado": "assets/recipes/pollo-verduras.jpg"
};


// =========================
// INICIO
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadData();

        setupButtons();

    }
);


// =========================
// CARGAR DATOS
// =========================

async function loadData() {

    try {

        const categoriesResponse =
            await fetch(
                `${API_URL}/categories/`
            );


        const productsResponse =
            await fetch(
                `${API_URL}/products/?limit=100`
            );


        const recipesResponse =
            await fetch(
                `${API_URL}/recipes/`
            );


        if (!categoriesResponse.ok) {
            throw new Error(
                "Error cargando categorías"
            );
        }


        if (!productsResponse.ok) {
            throw new Error(
                "Error cargando productos"
            );
        }


        if (!recipesResponse.ok) {
            throw new Error(
                "Error cargando recetas"
            );
        }


        categories =
            await categoriesResponse.json();


        products =
            await productsResponse.json();


        recipes =
            await recipesResponse.json();


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

        renderProducts(products);

        renderRecipes();

        renderIngredientSelector();


    } catch (error) {

        console.error(
            "Error cargando los datos:",
            error
        );

    }
}


// =========================
// CONFIGURAR BOTONES
// =========================

function setupButtons() {

    const cartButton =
        document.getElementById(
            "cartButton"
        );


    if (cartButton) {

        cartButton.addEventListener(
            "click",
            function () {

                openCartModal();

            }
        );

    }


    const wishlistButton =
        document.getElementById(
            "wishlistButton"
        );


    if (wishlistButton) {

        wishlistButton.addEventListener(
            "click",
            function () {

                alert(
                    "La sección de favoritos estará disponible próximamente."
                );

            }
        );

    }


    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function (event) {

                searchProducts(
                    event.target.value
                );

            }
        );

    }


    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            function (event) {

                filterProducts(
                    event.target.value
                );

            }
        );

    }


    const sortFilter =
        document.getElementById(
            "sortFilter"
        );


    if (sortFilter) {

        sortFilter.addEventListener(
            "change",
            function (event) {

                sortProducts(
                    event.target.value
                );

            }
        );

    }


    // =========================
    // BUSCADOR DE INGREDIENTES
    // =========================

    const ingredientSearch =
        document.getElementById(
            "ingredientSearch"
        );


    if (ingredientSearch) {

        ingredientSearch.addEventListener(
            "input",
            function (event) {

                renderIngredientSelector(
                    event.target.value
                );

            }
        );

    }


    // =========================
    // BUSCAR RECETAS
    // =========================

    const findRecipesButton =
        document.getElementById(
            "findRecipesButton"
        );


    if (findRecipesButton) {

        findRecipesButton.addEventListener(
            "click",
            function () {

                findRecipesByIngredients();

            }
        );

    }


    // =========================
    // LIMPIAR INGREDIENTES
    // =========================

    const clearIngredientsButton =
        document.getElementById(
            "clearIngredientsButton"
        );


    if (clearIngredientsButton) {

        clearIngredientsButton.addEventListener(
            "click",
            function () {

                clearIngredientSelection();

            }
        );

    }


    // =========================
    // SELECCIONAR TODOS
    // =========================

    const selectAllButton =
        document.getElementById(
            "selectAllIngredients"
        );


    if (selectAllButton) {

        selectAllButton.addEventListener(
            "click",
            function () {

                selectAllIngredients();

            }
        );

    }

}


// =========================
// CATEGORÍAS
// =========================

function renderCategories() {

    const container =
        document.getElementById(
            "categoriesContainer"
        );


    if (!container) return;


    container.innerHTML = "";


    categories.forEach(
        function (category) {

            const card =
                document.createElement(
                    "button"
                );


            card.className =
                "category-card";


            const image =
                categoryImages[
                    category.name
                ] || "";


            card.innerHTML = `

                <div class="category-image">

                    <img
                        src="${image}"
                        alt="${category.name}"
                    >

                </div>


                <div class="category-card-content">

                    <h3>
                        ${category.name}
                    </h3>

                    <p>
                        ${category.description ||
                        "Descubre nuestros ingredientes"}
                    </p>

                </div>

            `;


            card.addEventListener(
                "click",
                function () {

                    const filtered =
                        products.filter(
                            function (product) {

                                return (
                                    product.category_id ===
                                    category.id
                                );

                            }
                        );


                    renderProducts(
                        filtered
                    );


                    document
                        .getElementById(
                            "catalog"
                        )
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                }
            );


            container.appendChild(card);

        }
    );
}


// =========================
// PRODUCTOS
// =========================

function renderProducts(
    productsToRender
) {

    const container =
        document.getElementById(
            "productsContainer"
        );


    if (!container) return;


    container.innerHTML = "";


    const productCount =
        document.getElementById(
            "productCount"
        );


    if (productCount) {

        productCount.textContent =
            `${productsToRender.length} productos`;

    }


    if (
        productsToRender.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-message">

                No hemos encontrado productos.

            </div>

        `;

        return;
    }


    productsToRender.forEach(
        function (product) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "product-card";


            const image =
                productImages[
                    product.name
                ] ||
                product.image ||
                "";


            const category =
                getCategoryName(
                    product.category_id
                );


            card.innerHTML = `

                <div class="product-image">

                    <img
                        src="${image}"
                        alt="${product.name}"
                    >

                </div>


                <div class="product-card-content">

                    <span class="product-category">
                        ${category}
                    </span>


                    <h3>
                        ${product.name}
                    </h3>


                    <p class="product-description">

                        ${
                            product.description ||
                            "Producto de calidad para tu cocina."
                        }

                    </p>


                    <div class="product-footer">

                        <strong>
                            ${Number(
                                product.price || 0
                            ).toFixed(2)} €
                        </strong>


                        <button
                            class="primary-btn add-cart-btn"
                            type="button"
                        >
                            Añadir
                        </button>

                    </div>

                </div>

            `;


            const addButton =
                card.querySelector(
                    ".add-cart-btn"
                );


            addButton.addEventListener(
                "click",
                function () {

                    addToCart(product);

                }
            );


            container.appendChild(card);

        }
    );
}


// =========================
// NOMBRE DE CATEGORÍA
// =========================

function getCategoryName(
    categoryId
) {

    const category =
        categories.find(
            function (category) {

                return (
                    category.id ===
                    categoryId
                );

            }
        );


    if (category) {

        return category.name;

    }


    return "Alimentación";
}


// =========================
// RECETAS
// =========================

function renderRecipes() {

    const container =
        document.getElementById(
            "recipesContainer"
        );


    if (!container) return;


    container.innerHTML = "";


    recipes.forEach(
        function (recipe) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "recipe-card";


            const image =
                recipeImages[
                    recipe.name
                ] ||
                recipe.image ||
                "";


            card.innerHTML = `

                <div class="recipe-image">

                    <img
                        src="${image}"
                        alt="${recipe.name}"
                    >

                </div>


                <div class="recipe-card-content">

                    <span class="eyebrow">
                        RECETA
                    </span>


                    <h3>
                        ${recipe.name}
                    </h3>


                    <p>
                        ${recipe.description || ""}
                    </p>


                    <div class="recipe-info">

                        <span>
                            ⏱️
                            ${recipe.preparation_time}
                            min
                        </span>


                        <span>
                            ⭐
                            ${recipe.difficulty}
                        </span>

                    </div>


                    <button
                        class="primary-btn recipe-button"
                        type="button"
                    >
                        Ver receta
                    </button>

                </div>

            `;


            const button =
                card.querySelector(
                    ".recipe-button"
                );


            button.addEventListener(
                "click",
                function () {

                    openRecipeModal(
                        recipe
                    );

                }
            );


            container.appendChild(card);

        }
    );
}


// =========================
// MODAL RECETA
// =========================

function openRecipeModal(
    recipe
) {

    const modal =
        document.getElementById(
            "recipeModal"
        );


    const content =
        document.getElementById(
            "recipeModalContent"
        );


    if (!modal || !content) {

        console.error(
            "No se encuentra el modal de receta"
        );

        return;
    }


    const ingredients =
        recipe.ingredients || [];


    const steps =
        recipe.instructions
            ? recipe.instructions
                .split(".")
                .map(
                    function (step) {

                        return step.trim();

                    }
                )
                .filter(Boolean)
            : [];


    const image =
        recipeImages[
            recipe.name
        ] ||
        recipe.image ||
        "";


    content.innerHTML = `

        <article class="recipe-detail">


            <div
                class="recipe-detail-image-wrapper"
            >

                <img
                    src="${image}"
                    alt="${recipe.name}"
                    class="recipe-detail-image"
                >


                <div class="recipe-detail-badge">
                    MESA MARKET
                </div>

            </div>


            <div class="recipe-detail-info">


                <span class="recipe-detail-label">
                    RECETA
                </span>


                <h2>
                    ${recipe.name}
                </h2>


                <p class="recipe-detail-description">
                    ${recipe.description || ""}
                </p>


                <div class="recipe-detail-meta">


                    <div class="recipe-meta-item">

                        <span class="recipe-meta-icon">
                            ⏱️
                        </span>


                        <div>

                            <small>
                                TIEMPO
                            </small>


                            <strong>
                                ${recipe.preparation_time}
                                min
                            </strong>

                        </div>

                    </div>


                    <div class="recipe-meta-item">

                        <span class="recipe-meta-icon">
                            ⭐
                        </span>


                        <div>

                            <small>
                                DIFICULTAD
                            </small>


                            <strong>
                                ${recipe.difficulty}
                            </strong>

                        </div>

                    </div>

                </div>


                <!-- INGREDIENTES -->

                <section
                    class="recipe-detail-section"
                >

                    <div
                        class="recipe-section-title"
                    >

                        <span>
                            🥕
                        </span>


                        <div>

                            <small>
                                PARA PREPARAR
                            </small>


                            <h3>
                                Ingredientes
                            </h3>

                        </div>

                    </div>


                    <ul class="ingredients-list">

                        ${
                            ingredients.length

                            ? ingredients
                                .map(
                                    function (
                                        ingredient
                                    ) {

                                        return `

                                            <li>

                                                <span
                                                    class="ingredient-check"
                                                >
                                                    ✓
                                                </span>


                                                <span>

                                                    <strong>
                                                        ${ingredient.name}
                                                    </strong>


                                                    <small>
                                                        ${ingredient.quantity}
                                                    </small>

                                                </span>

                                            </li>

                                        `;

                                    }
                                )
                                .join("")

                            : `

                                <li>
                                    No hay ingredientes
                                    disponibles.
                                </li>

                            `
                        }

                    </ul>

                </section>


                <!-- PREPARACIÓN -->

                <section
                    class="recipe-detail-section"
                >

                    <div
                        class="recipe-section-title"
                    >

                        <span>
                            👩‍🍳
                        </span>


                        <div>

                            <small>
                                PASO A PASO
                            </small>


                            <h3>
                                Preparación
                            </h3>

                        </div>

                    </div>


                    <ol class="steps-list">

                        ${
                            steps.length

                            ? steps
                                .map(
                                    function (
                                        step,
                                        index
                                    ) {

                                        return `

                                            <li>

                                                <span
                                                    class="step-number"
                                                >
                                                    ${index + 1}
                                                </span>


                                                <div
                                                    class="step-text"
                                                >
                                                    ${step}.
                                                </div>

                                            </li>

                                        `;

                                    }
                                )
                                .join("")

                            : `

                                <li>
                                    No hay instrucciones
                                    disponibles.
                                </li>

                            `
                        }

                    </ol>

                </section>


                <div
                    class="recipe-detail-footer"
                >

                    <span>
                        🍴
                        Disfruta de tu receta
                    </span>


                    <span>
                        MESA MARKET
                    </span>

                </div>


            </div>

        </article>

    `;


    modal.classList.add(
        "active"
    );
}


// =====================================================
// SELECTOR DE INGREDIENTES
// =====================================================

function renderIngredientSelector(
    searchText = ""
) {

    const container =
        document.getElementById(
            "ingredientSelector"
        );


    if (!container) return;


    const search =
        searchText
            .toLowerCase()
            .trim();


    const filteredProducts =
        products.filter(
            function (product) {

                return product.name
                    .toLowerCase()
                    .includes(search);

            }
        );


    container.innerHTML = "";


    if (
        filteredProducts.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-message">
                No hemos encontrado ese ingrediente.
            </div>

        `;

        return;
    }


    filteredProducts.forEach(
        function (product) {

            const isSelected =
                selectedIngredientIds.includes(
                    product.id
                );


            const item =
                document.createElement(
                    "label"
                );


            item.className =
                "ingredient-option";


            if (isSelected) {

                item.classList.add(
                    "selected"
                );

            }


            const image =
                productImages[
                    product.name
                ] ||
                product.image ||
                "";


            item.innerHTML = `

                <input
                    type="checkbox"
                    value="${product.id}"
                    ${isSelected ? "checked" : ""}
                >


                <div class="ingredient-option-image">

                    <img
                        src="${image}"
                        alt="${product.name}"
                    >

                </div>


                <div class="ingredient-option-info">

                    <strong>
                        ${product.name}
                    </strong>


                    <span>
                        ${getCategoryName(
                            product.category_id
                        )}
                    </span>

                </div>


                <span class="ingredient-option-check">
                    ✓
                </span>

            `;


            const checkbox =
                item.querySelector(
                    "input"
                );


            checkbox.addEventListener(
                "change",
                function () {

                    toggleIngredient(
                        product.id
                    );

                }
            );


            container.appendChild(
                item
            );

        }
    );


    renderSelectedIngredients();
}


// =========================
// SELECCIONAR / DESELECCIONAR
// =========================

function toggleIngredient(
    productId
) {

    if (
        selectedIngredientIds.includes(
            productId
        )
    ) {

        selectedIngredientIds =
            selectedIngredientIds.filter(
                function (id) {

                    return id !== productId;

                }
            );

    } else {

        selectedIngredientIds.push(
            productId
        );

    }


    const searchInput =
        document.getElementById(
            "ingredientSearch"
        );


    renderIngredientSelector(
        searchInput
            ? searchInput.value
            : ""
    );
}


// =========================
// INGREDIENTES SELECCIONADOS
// =========================

function renderSelectedIngredients() {

    const container =
        document.getElementById(
            "selectedIngredients"
        );


    if (!container) return;


    if (
        selectedIngredientIds.length === 0
    ) {

        container.innerHTML = `

            <span class="selected-empty">
                Todavía no has seleccionado ingredientes.
            </span>

        `;

        return;
    }


    const selectedProducts =
        products.filter(
            function (product) {

                return selectedIngredientIds.includes(
                    product.id
                );

            }
        );


    container.innerHTML = `

        <div class="selected-title">
            Ingredientes seleccionados:
        </div>


        <div class="selected-tags">

            ${
                selectedProducts
                    .map(
                        function (product) {

                            return `

                                <button
                                    type="button"
                                    class="selected-tag"
                                    data-id="${product.id}"
                                >

                                    ${product.name}

                                    <span>
                                        ×
                                    </span>

                                </button>

                            `;

                        }
                    )
                    .join("")
            }

        </div>

    `;


    container
        .querySelectorAll(
            ".selected-tag"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        toggleIngredient(
                            Number(
                                button.dataset.id
                            )
                        );

                    }
                );

            }
        );
}


// =====================================================
// BUSCAR RECETAS SEGÚN INGREDIENTES
// =====================================================

function findRecipesByIngredients() {

    const results =
        document.getElementById(
            "recipeFinderResults"
        );


    if (!results) return;


    if (
        selectedIngredientIds.length === 0
    ) {

        results.innerHTML = `

            <div class="finder-message">

                <span>
                    🥕
                </span>

                <h3>
                    Selecciona algunos ingredientes
                </h3>

                <p>
                    Elige los productos que tienes
                    disponibles para buscar recetas.
                </p>

            </div>

        `;

        return;
    }


    const selectedIds =
        new Set(
            selectedIngredientIds
        );


    const exactRecipes = [];


    const possibleRecipes = [];


    recipes.forEach(
        function (recipe) {

            const recipeIngredients =
                recipe.ingredients || [];


            const recipeIds =
                recipeIngredients.map(
                    function (ingredient) {

                        return ingredient.product_id;

                    }
                );


            if (
                recipeIds.length === 0
            ) {

                return;

            }


            const missing =
                recipeIds.filter(
                    function (id) {

                        return !selectedIds.has(
                            id
                        );

                    }
                );


            if (
                missing.length === 0
            ) {

                exactRecipes.push(
                    recipe
                );

            } else {

                possibleRecipes.push({
                    recipe: recipe,
                    missing: missing
                });

            }

        }
    );


    /*
     * Ordenamos las recetas incompletas
     * colocando primero las que necesitan
     * menos ingredientes adicionales.
     */

    possibleRecipes.sort(
        function (a, b) {

            return (
                a.missing.length -
                b.missing.length
            );

        }
    );


    results.innerHTML = `

        <div class="finder-results-header">

            <span class="eyebrow">
                RESULTADOS
            </span>


            <h3>
                Recetas que puedes preparar
            </h3>

        </div>

    `;


    // =========================
    // RECETAS COMPLETAS
    // =========================

    if (
        exactRecipes.length > 0
    ) {

        const completeTitle =
            document.createElement(
                "div"
            );


        completeTitle.className =
            "finder-subtitle";


        completeTitle.innerHTML = `
            <span>✓</span>
            Puedes hacer estas recetas
        `;


        results.appendChild(
            completeTitle
        );


        exactRecipes.forEach(
            function (recipe) {

                results.appendChild(
                    createFinderRecipeCard(
                        recipe
                    )
                );

            }
        );

    } else {

        const noExact =
            document.createElement(
                "div"
            );


        noExact.className =
            "finder-message finder-message-small";


        noExact.innerHTML = `

            <span>
                👩‍🍳
            </span>

            <div>

                <strong>
                    Todavía no tienes todos los ingredientes
                </strong>

                <p>
                    Mira las recetas que puedes completar
                    añadiendo algún ingrediente más.
                </p>

            </div>

        `;


        results.appendChild(
            noExact
        );

    }


    // =========================
    // RECETAS CASI COMPLETAS
    // =========================

    const nearRecipes =
        possibleRecipes.slice(
            0,
            6
        );


    if (
        nearRecipes.length > 0
    ) {

        const nearTitle =
            document.createElement(
                "div"
            );


        nearTitle.className =
            "finder-subtitle";


        nearTitle.innerHTML = `
            <span>＋</span>
            Te falta algún ingrediente
        `;


        results.appendChild(
            nearTitle
        );


        nearRecipes.forEach(
            function (item) {

                results.appendChild(
                    createFinderRecipeCard(
                        item.recipe,
                        item.missing
                    )
                );

            }
        );

    }

}


// =====================================================
// CREAR TARJETA DE RESULTADO
// =====================================================

function createFinderRecipeCard(
    recipe,
    missingIds = []
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "finder-recipe-card";


    const image =
        recipeImages[
            recipe.name
        ] ||
        recipe.image ||
        "";


    const missingProducts =
        products.filter(
            function (product) {

                return missingIds.includes(
                    product.id
                );

            }
        );


    let missingHTML = "";


    if (
        missingProducts.length > 0
    ) {

        missingHTML = `

            <div class="finder-missing">

                <strong>
                    Te falta:
                </strong>


                <span>
                    ${
                        missingProducts
                            .map(
                                function (product) {

                                    return product.name;

                                }
                            )
                            .join(", ")
                    }
                </span>

            </div>

        `;

    } else {

        missingHTML = `

            <div class="finder-ready">

                ✓ Tienes todos los ingredientes

            </div>

        `;

    }


    card.innerHTML = `

        <div class="finder-recipe-image">

            <img
                src="${image}"
                alt="${recipe.name}"
            >

        </div>


        <div class="finder-recipe-content">

            <span class="eyebrow">
                RECETA
            </span>


            <h3>
                ${recipe.name}
            </h3>


            <p>
                ${recipe.description || ""}
            </p>


            <div class="recipe-info">

                <span>
                    ⏱️
                    ${recipe.preparation_time}
                    min
                </span>


                <span>
                    ⭐
                    ${recipe.difficulty}
                </span>

            </div>


            ${missingHTML}


            <button
                class="primary-btn finder-view-recipe"
                type="button"
            >
                Ver receta
            </button>

        </div>

    `;


    const button =
        card.querySelector(
            ".finder-view-recipe"
        );


    button.addEventListener(
        "click",
        function () {

            openRecipeModal(
                recipe
            );

        }
    );


    return card;
}


// =========================
// SELECCIONAR TODOS
// =========================

function selectAllIngredients() {

    selectedIngredientIds =
        products.map(
            function (product) {

                return product.id;

            }
        );


    const searchInput =
        document.getElementById(
            "ingredientSearch"
        );


    renderIngredientSelector(
        searchInput
            ? searchInput.value
            : ""
    );

}


// =========================
// LIMPIAR SELECCIÓN
// =========================

function clearIngredientSelection() {

    selectedIngredientIds = [];


    const searchInput =
        document.getElementById(
            "ingredientSearch"
        );


    if (searchInput) {

        searchInput.value = "";

    }


    renderIngredientSelector();


    const results =
        document.getElementById(
            "recipeFinderResults"
        );


    if (results) {

        results.innerHTML = "";

    }

}


// =========================
// CESTA
// =========================

function addToCart(
    product
) {

    const existing =
        cart.find(
            function (item) {

                return (
                    item.id ===
                    product.id
                );

            }
        );


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    updateCartCount();


    alert(
        product.name +
        " añadido a la cesta"
    );
}


// =========================
// CONTADOR CESTA
// =========================

function updateCartCount() {

    const counter =
        document.getElementById(
            "cartCount"
        );


    if (!counter) return;


    const total =
        cart.reduce(
            function (
                sum,
                item
            ) {

                return (
                    sum +
                    item.quantity
                );

            },
            0
        );


    counter.textContent =
        total;
}


// =========================
// ABRIR CESTA
// =========================

function openCartModal() {

    const modal =
        document.getElementById(
            "cartModal"
        );


    const content =
        document.getElementById(
            "cartModalContent"
        );


    if (!modal || !content) {

        console.error(
            "No se encuentra cartModal o cartModalContent"
        );

        return;
    }


    renderCart();


    modal.classList.add(
        "active"
    );
}


// =========================
// MOSTRAR CESTA
// =========================

function renderCart() {

    const content =
        document.getElementById(
            "cartModalContent"
        );


    if (!content) return;


    if (
        cart.length === 0
    ) {

        content.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>


                <span class="empty-cart-label">
                    MESA MARKET
                </span>


                <h3>
                    Tu cesta está vacía
                </h3>


                <p>
                    Añade tus ingredientes favoritos
                    para comenzar tu compra.
                </p>

            </div>

        `;

        return;
    }


    const total =
        cart.reduce(
            function (
                sum,
                item
            ) {

                return (
                    sum +
                    Number(
                        item.price || 0
                    ) *
                    item.quantity
                );

            },
            0
        );


    content.innerHTML = `

        <div class="cart-header">

            <div>

                <span class="cart-label">
                    MESA MARKET
                </span>


                <h2>
                    Tu cesta
                </h2>


                <p>

                    ${cart.length}

                    ${
                        cart.length === 1
                            ? "producto"
                            : "productos"
                    }

                </p>

            </div>


            <div class="cart-header-icon">
                🛒
            </div>

        </div>


        <div class="cart-items">

            ${
                cart
                    .map(
                        function (
                            item
                        ) {

                            const image =
                                productImages[
                                    item.name
                                ] ||
                                item.image ||
                                "";


                            const itemTotal =
                                Number(
                                    item.price || 0
                                ) *
                                item.quantity;


                            return `

                                <div
                                    class="cart-item"
                                >

                                    <img
                                        src="${image}"
                                        alt="${item.name}"
                                    >


                                    <div
                                        class="cart-item-info"
                                    >

                                        <span
                                            class="cart-item-category"
                                        >
                                            ${getCategoryName(
                                                item.category_id
                                            )}
                                        </span>


                                        <h3>
                                            ${item.name}
                                        </h3>


                                        <p>
                                            ${Number(
                                                item.price || 0
                                            ).toFixed(2)}
                                            € / unidad
                                        </p>

                                    </div>


                                    <div
                                        class="cart-item-controls"
                                    >

                                        <button
                                            class="quantity-button decrease"
                                            data-id="${item.id}"
                                            type="button"
                                        >
                                            −
                                        </button>


                                        <span
                                            class="quantity-value"
                                        >
                                            ${item.quantity}
                                        </span>


                                        <button
                                            class="quantity-button increase"
                                            data-id="${item.id}"
                                            type="button"
                                        >
                                            +
                                        </button>

                                    </div>


                                    <div
                                        class="cart-item-total"
                                    >

                                        <strong>
                                            ${itemTotal.toFixed(2)}
                                            €
                                        </strong>


                                        <button
                                            class="remove-cart-button"
                                            data-id="${item.id}"
                                            type="button"
                                        >
                                            ×
                                        </button>

                                    </div>

                                </div>

                            `;

                        }
                    )
                    .join("")
            }

        </div>


        <div class="cart-summary">

            <div class="cart-summary-line">

                <span>
                    Subtotal
                </span>


                <span>
                    ${total.toFixed(2)} €
                </span>

            </div>


            <div class="cart-summary-line">

                <span>
                    Envío
                </span>


                <span class="free-shipping">
                    Gratis
                </span>

            </div>


            <div class="cart-summary-total">

                <span>
                    Total
                </span>


                <strong>
                    ${total.toFixed(2)} €
                </strong>

            </div>

        </div>


        <button
            class="checkout-button"
            type="button"
        >
            Finalizar compra
        </button>

    `;


    content
        .querySelectorAll(
            ".increase"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        changeQuantity(
                            Number(
                                button.dataset.id
                            ),
                            1
                        );

                    }
                );

            }
        );


    content
        .querySelectorAll(
            ".decrease"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        changeQuantity(
                            Number(
                                button.dataset.id
                            ),
                            -1
                        );

                    }
                );

            }
        );


    content
        .querySelectorAll(
            ".remove-cart-button"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        removeFromCart(
                            Number(
                                button.dataset.id
                            )
                        );

                    }
                );

            }
        );


    const checkoutButton =
        content.querySelector(
            ".checkout-button"
        );


    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            function () {

                alert(
                    "La función de compra estará disponible próximamente."
                );

            }
        );

    }

}


// =========================
// CAMBIAR CANTIDAD
// =========================

function changeQuantity(
    productId,
    amount
) {

    const item =
        cart.find(
            function (item) {

                return (
                    item.id ===
                    productId
                );

            }
        );


    if (!item) return;


    item.quantity += amount;


    if (
        item.quantity <= 0
    ) {

        removeFromCart(
            productId
        );

        return;

    }


    updateCartCount();

    renderCart();
}


// =========================
// ELIMINAR DEL CARRITO
// =========================

function removeFromCart(
    productId
) {

    cart =
        cart.filter(
            function (item) {

                return (
                    item.id !==
                    productId
                );

            }
        );


    updateCartCount();

    renderCart();
}


// =========================
// BUSCAR PRODUCTOS
// =========================

function searchProducts(
    text
) {

    const search =
        text
            .toLowerCase()
            .trim();


    if (!search) {

        renderProducts(
            products
        );

        return;

    }


    const filtered =
        products.filter(
            function (product) {

                return product.name
                    .toLowerCase()
                    .includes(search);

            }
        );


    renderProducts(
        filtered
    );
}


// =========================
// FILTRAR PRODUCTOS
// =========================

function filterProducts(
    value
) {

    if (
        !value ||
        value === "all"
    ) {

        renderProducts(
            products
        );

        return;

    }


    const filtered =
        products.filter(
            function (product) {

                return (
                    product.category_id ===
                    Number(value)
                );

            }
        );


    renderProducts(
        filtered
    );
}


// =========================
// ORDENAR PRODUCTOS
// =========================

function sortProducts(
    value
) {

    const sorted =
        [...products];


    if (
        value === "name"
    ) {

        sorted.sort(
            function (
                a,
                b
            ) {

                return a.name.localeCompare(
                    b.name,
                    "es"
                );

            }
        );

    }


    if (
        value === "price-asc"
    ) {

        sorted.sort(
            function (
                a,
                b
            ) {

                return (
                    Number(
                        a.price || 0
                    ) -
                    Number(
                        b.price || 0
                    )
                );

            }
        );

    }


    if (
        value === "price-desc"
    ) {

        sorted.sort(
            function (
                a,
                b
            ) {

                return (
                    Number(
                        b.price || 0
                    ) -
                    Number(
                        a.price || 0
                    )
                );

            }
        );

    }


    renderProducts(
        sorted
    );
}


// =========================
// CERRAR MODALES
// =========================

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.classList.contains(
                "modal-close"
            )
        ) {

            const modal =
                event.target.closest(
                    ".modal"
                );


            if (modal) {

                modal.classList.remove(
                    "active"
                );

            }

        }


        if (
            event.target.classList.contains(
                "modal"
            )
        ) {

            event.target.classList.remove(
                "active"
            );

        }

    }
);


// =========================
// ESC PARA CERRAR
// =========================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            document
                .querySelectorAll(
                    ".modal.active"
                )
                .forEach(
                    function (modal) {

                        modal.classList.remove(
                            "active"
                        );

                    }
                );

        }

    }
);