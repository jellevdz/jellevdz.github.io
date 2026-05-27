cart = getCart();

const cartCheckoutProducts = cart.map(id =>
    products.find(p => p.id === id)
);

const totalCheckout = cartCheckoutProducts.reduce(
    (sum, p) => sum + p.price,
    0
);

// LEFT
document.getElementById("order-items").innerHTML =
    cartCheckoutProducts.map(p => `
    <div class="d-flex justify-content-between border-bottom py-2">
        <span>${p.name}</span>
        <span>${p.price} pp</span>
    </div>
`).join("");

// RIGHT
document.getElementById("summary").innerHTML =
    `Aantal items: ${cart.length}`;

document.getElementById("total").innerHTML =
    `Totaal: ${totalCheckout} Pap punten`;


//const isDad = document.getElementById("isDad").checked;

//if (!isDad) {
//    document.getElementById("budget-warning").innerHTML = `
//            <div class="alert alert-danger">
//                Niet echt besteld
//            </div>`;
//    return;
//}

//function confirmOrder()
//{

//    if (totalCheckout  > budget)
//    {
//        //alert("Helaas zijn er geen oneindig pap punten:( \nZoveel mooie dingen om uit te kiezen :)");
//        document.getElementById("budget-warning").innerHTML = `
//        <div class="alert alert-danger">
//            Je zit ${totalCheckout - budget} pap punten over budget!
//        </div>`;
//        return;
//    }





//    const cart = JSON.parse(localStorage.getItem("cart")) || [];

//    const orderId = "ORD-" + Date.now();

//    const ok = confirm(`Bestelling plaatsen?\n\nOrder ID: ${orderId}`);

//    if (!ok) return;

//    const orderItems = cart.map(id => {
//        const product = products.find(p => p.id === id);
//        return `- ${product.name} (${product.price})`;
//    }).join("\n");

//    const total = cart.reduce((sum, id) => {
//        const product = products.find(p => p.id === id);
//        return sum + product.price;
//    }, 0);

//    fetch("https://formspree.io/f/mgoqplar", {
//        method: "POST",
//        headers: { "Content-Type": "application/json" },
//        body: JSON.stringify({
//            subject: "Nieuwe bestelling",
//            message: `
//Order ID: ${orderId}

//Bestelling:
//${orderItems}

//Totaal: ${total}
//            `
//        })
//    }).finally(() => {

//        localStorage.removeItem("cart");

//        window.location.href =
//            "confirmation.html?order=" + orderId;
//    });
//}

async function confirmOrder() {
    console.log("FUNCTION CALLED");
    const isDad = document.getElementById("isDad").checked;
    console.log("isdad status: " + isDad);

    if (totalCheckout > budget) {

        document.getElementById("budget-warning").innerHTML = `
        <div class="alert alert-danger">
            Je zit ${totalCheckout - budget} pap punten over budget!
        </div>`;
        return;
    }
    console.log("voorbij budget check");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const orderId = "ORD-" + Date.now();

    const ok = confirm(`Bestelling plaatsen?\n\nOrder ID: ${orderId}`);

    if (!ok) return;
    console.log("voorbij data consolidatie");
    const orderItems = cart.map(id => {
        const product = products.find(p => p.id === id);
        return `- ${product.name} (${product.price})`;
    }).join("\n");

    const total = cart.reduce((sum, id) => {
        const product = products.find(p => p.id === id);
        return sum + product.price;
    }, 0);
    console.log("voorbij data consolidatie 2");
    // 🚀 EMAIL ALLEEN ALS CHECKBOX AAN STAAT
    if (isDad) {
        console.log("email verstuurd")
        await fetch("https://formspree.io/f/mgoqplar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                subject: "Nieuwe bestelling",
                message: `
Order ID: ${orderId}

Bestelling:
${orderItems}

Totaal: ${total}
                `
            })
        });
    }
    console.log("einde functie");
    localStorage.removeItem("cart");

    window.location.href =
        "confirmation.html?order=" + orderId;
}