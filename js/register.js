const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    if (name === "" || email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }
    if (name.length < 3) {
        alert("Name must contain at least 3 characters.");
        return;
    }
    if (password.length < 4) {
        alert("Password must contain at least 4 characters.");
        return;
    }
    const existingUser = localStorage.getItem("user");
    if (existingUser !== null) {
        const user = JSON.parse(existingUser);
        if (user.email === email) {
            alert("An account with this email already exists.");
            return;
        }
    }
    const user = {
        name: name,
        email: email,
        password: password
    };
    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );
    alert("Registration successful!");
    registerForm.reset();
    window.location.href = "./login.html";
});