let cart = getCart();


function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

window.addToCart = function (id, btn = null) {
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    console.table(cart);

    if (btn) {
        btn.innerHTML = '<i class="bi bi-check-circle-fill text-success me-1"></i> Toegevoegd';
        btn.classList.remove("btn-outline-dark");
        btn.classList.add("btn-success");

        setTimeout(() => {
            btn.innerText = "Toevoegen aan winkelwagen";
            btn.classList.remove("btn-success");
            btn.classList.add("btn-outline-dark");
        }, 1200);
    }
};
const cartCount = document.getElementById("cart-count");

if (cartCount) {
    cartCount.innerText = cart.length;
}


function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = cart.length;
    }
}





const cartContainer = document.getElementById("cart-container");
var cartbudgetcontent = cart.map(id => products.find(product => product.id === id)).filter(product => product);;

if (cartContainer) {

    const cartProducts = cart.map(id =>products.find(product => product.id === id)).filter(product => product);
    cartbudgetcontent = cartProducts;
    cartContainer.innerHTML = cartProducts.map(product => `
        <div class="col mb-5">
            <div class="card h-100">

                <img class="card-img-top"
                     src="${product.image}"
                     style="width:100%; height:250px; object-fit:contain;">

                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${product.name}</h5>
                        ${product.price} Pap punten
                    </div>
                </div>

                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <a class="btn btn-outline-dark mt-auto"
                           href="${product.page}">
                           Meer informatie
                        </a>
                    </div>

                    <div class="text-center mt-2">
                        <button class="btn btn-outline-danger"
                                onclick="removeFromCart(${product.id})">
                            Verwijderen
                        </button>
                    </div>

                </div>

            </div>
        </div>
    `).join("");
}


window.clearCart = function () {
    cart = [];

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    location.reload();
    console.log("Cart cleared");
};

window.removeFromCart = function (id) {

    const index = cart.indexOf(id);

    if (index !== -1) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();
    Console.log("following ID removed: " + id);
};

if (window.location.pathname.endsWith("index.html")) {

    window.addEventListener("beforeunload", function () {
        localStorage.setItem("scrollPosition", window.scrollY);
    });

    window.addEventListener("load", function () {

        const scrollPosition = localStorage.getItem("scrollPosition");

        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
        }

    });
}


const budget = 810;

const totalCost = cartbudgetcontent.reduce((sum, product) => sum + product.price, 0);

const remainingBudget = budget - totalCost;

const budgetDisplay = document.getElementById("budget-display");

if (budgetDisplay) {

    budgetDisplay.innerHTML = `
    <span class="btn btn-outline-dark me-2">
         Budget: ${remainingBudget} / ${budget} Pap punten
    </span>
`;
}

function addToCart(id, btn) {
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    btn.innerHTML = '<i class="bi bi-check-circle-fill text-success me-1"></i> Toegevoegd';
    btn.classList.remove("btn-outline-dark");
    btn.classList.add("btn-success");

    setTimeout(() => {
        btn.innerText = "Toevoegen aan winkelwagen";
        btn.classList.remove("btn-success");
        btn.classList.add("btn-outline-dark");
    }, 1200);
}