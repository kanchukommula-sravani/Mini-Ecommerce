const products = [
    {
        id: 1,
        name: "Mobile",
        price: 20000,
        image: "./images/mobile.jpg"
    },
    {
        id: 2,
        name: "Laptop",
        price: 50000,
        image: "./images/laptop.jpg"
    },
    {
        id: 3,
        name: "Headphones",
        price: 2000,
        image: "./images/headphones.jpg"
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 3000,
        image: "./images/watch.jpg"
    },
    {
        id: 5,
        name: "Keyboard",
        price: 1500,
        image: "./images/keyboard.jpg"
    },
    {
        id: 6,
        name: "Mouse",
        price: 800,
        image: "./images/mouse.jpg"
    }
];
const productContainer = document.getElementById("productContainer");
const search =document.getElementById("search");
const noProducts =document.getElementById("noProducts");
function displayProducts(productList) {
    productContainer.innerHTML = "";
    if (productList.length === 0) {
        noProducts.style.display = "block";
        return;
    }
    noProducts.style.display = "none";
    productList.forEach(function (product) {
        const card =document.createElement("article");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                >
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>
                <button
                    class="btn btn-primary add-cart-btn"
                    data-id="${product.id}"
                >
                    Add to Cart
                </button>
            </div>
        `;
        productContainer.appendChild(card);
        const button =card.querySelector(".add-cart-btn");
        button.addEventListener("click", function () {
            addToCart(product);
        });
    });
}
function addToCart(product) {
    let cart =JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct =cart.find(function (item) {
            return item.id === product.id;
        });
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    alert(`${product.name} added to cart!`);
}
search.addEventListener("input", function () {
    const searchValue =search.value.toLowerCase().trim();
    const filteredProducts =products.filter(function (product) {
            return product.name
                .toLowerCase()
                .includes(searchValue);
        });
    displayProducts(filteredProducts);
});
displayProducts(products);