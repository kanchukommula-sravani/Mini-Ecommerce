let cart =JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer =document.getElementById("cartContainer");
const totalPrice =document.getElementById("totalPrice");
const buyButton =document.getElementById("buyButton");
const cartSummary =document.getElementById("cartSummary");
function saveCart() {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}
function calculateTotal() {
    return cart.reduce(function (total, item) {
        return total + (item.price * item.quantity);
    }, 0);
}
function displayCart() {
    cartContainer.innerHTML = "";
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    🛒
                </div>
                <h2>Your cart is empty</h2>
                <p>
                    Looks like you haven't added anything yet.
                </p>
                <a
                    href="./product.html"
                    class="btn btn-primary"
                >
                    Start Shopping
                </a>
            </div>
        `;
        totalPrice.textContent = "₹0";
        cartSummary.style.display = "none";
        return;
    }
    cartSummary.style.display = "flex";
    cart.forEach(function (item) {
        const itemTotal =item.price * item.quantity;
        const cartItem =document.createElement("article");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <div class="cart-product">
                <div class="cart-image">
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >
                </div>
                <div>
                    <h3>${item.name}</h3>
                    <p>
                        ₹${item.price.toLocaleString("en-IN")}
                    </p>
                </div>
            </div>
            <div class="quantity-controls">
                <button
                    class="quantity-btn decrease"
                    data-id="${item.id}"
                >
                    −
                </button>
                <span>
                    ${item.quantity}
                </span>
                <button
                    class="quantity-btn increase"
                    data-id="${item.id}"
                >
                    +
                </button>
            </div>
            <strong class="item-total">
                ₹${itemTotal.toLocaleString("en-IN")}
            </strong>
            <button
                class="remove-btn"
                data-id="${item.id}"
            >
                Remove
            </button>
        `;
        cartContainer.appendChild(cartItem);
    });
    totalPrice.textContent = `₹${calculateTotal().toLocaleString("en-IN")}`;
    addCartEvents();
}
function addCartEvents() {
    const increaseButtons =document.querySelectorAll(".increase");
    const decreaseButtons =document.querySelectorAll(".decrease");
    const removeButtons =document.querySelectorAll(".remove-btn");
    increaseButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const id =Number(button.dataset.id);
            const item =cart.find(function (product) {
                    return product.id === id;
                });
            if (item) {
                item.quantity++;
                saveCart();
                displayCart();
            }
        });
    });
    decreaseButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const id =Number(button.dataset.id);
            const item =
                cart.find(function (product) {
                    return product.id === id;

                });
            if (item) {
                item.quantity--;
                if (item.quantity <= 0) {
                    cart =
                        cart.filter(function (product) {
                            return product.id !== id;
                        });
                }
                saveCart();
                displayCart();
            }
        });
    });
    removeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const id =
                Number(button.dataset.id);
            cart =
                cart.filter(function (product) {
                    return product.id !== id;
                });
            saveCart();
            displayCart();
        });
    });
}
buyButton.addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    const confirmPurchase =
        confirm(
            "Are you sure you want to place this order?"
        );
    if (confirmPurchase) {
        localStorage.removeItem("cart");
        window.location.href =
            "./thankyou.html";
    }
});
displayCart();