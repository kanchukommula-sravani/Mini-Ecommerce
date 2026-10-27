const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password =document.getElementById("loginPassword").value.trim();
    if (email === "" || password === "") {
        alert("Please enter your email and password.");
        return;
    }
    const storedUser = localStorage.getItem("user");
    if (storedUser === null) {
        alert("No account found. Please register first.");
        return;
    }
    const user = JSON.parse(storedUser);
    if (
        email === user.email && password === user.password
    ) {
        localStorage.setItem("isLoggedIn", "true");
        alert("Login successful!");
        loginForm.reset();
        window.location.href = "./product.html";
    } else {
        alert("Invalid email or password.");
    }
});