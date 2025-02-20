document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const navLinks = document.querySelector(".nav-links");
    const burgerCategories = document.querySelector(".burger-categories");
    const scrollToTopBtn = document.getElementById("scrollToTop");
    const cookieNotification = document.getElementById("cookie-notification");
    const acceptCookiesBtn = document.getElementById("accept-cookies");

    const registerModal = document.getElementById("register-modal");
    const openRegisterModalBtn = document.getElementById("open-register-modal");
    const closeModalBtn = document.getElementById("close-modal");

    burgerMenu.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        burgerMenu.classList.toggle("active"); 
        burgerCategories.classList.toggle("active"); 
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }

        const header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.style.backgroundColor = "#333";
        } else {
            header.style.backgroundColor = "#222";
        }
    });

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    acceptCookiesBtn.addEventListener("click", () => {
        cookieNotification.style.display = "none";
        localStorage.setItem("cookie-consent", "accepted"); // Store consent in LocalStorage
    });

    openRegisterModalBtn.addEventListener("click", () => {
        registerModal.style.display = "flex";
    });

    closeModalBtn.addEventListener("click", () => {
        registerModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === registerModal) {
            registerModal.style.display = "none";
        }
    });

    const registrationForm = document.getElementById("registration-form");
    const formStatus = document.getElementById("form-status");

    registrationForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

        if (!username || !email || !password || !confirmPassword) {
            formStatus.textContent = "All fields are required!";
            formStatus.style.color = "red";
            return;
        }

        if (!emailRegex.test(email)) {
            formStatus.textContent = "Please enter a valid email address!";
            formStatus.style.color = "red";
            return;
        }

        if (!passwordRegex.test(password)) {
            formStatus.textContent = "Password must be at least 8 characters long and contain a number.";
            formStatus.style.color = "red";
            return;
        }

        if (password !== confirmPassword) {
            formStatus.textContent = "Passwords do not match!";
            formStatus.style.color = "red";
            return;
        }

        const userData = { username, email, password };
        localStorage.setItem("user", JSON.stringify(userData));

        formStatus.textContent = "Registration successful!";
        formStatus.style.color = "green";
        registrationForm.reset();
    });

    const showHidePasswordBtn = document.getElementById("show-hide-password");
    const passwordField = document.getElementById("password");

    showHidePasswordBtn.addEventListener("click", () => {
        if (passwordField.type === "password") {
            passwordField.type = "text";
            showHidePasswordBtn.textContent = "Hide";
        } else {
            passwordField.type = "password";
            showHidePasswordBtn.textContent = "Show";
        }
    });

    if (!localStorage.getItem("cookie-consent")) {
        cookieNotification.style.display = "block";
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
        console.log(`Welcome back, ${storedUser.username}!`);
    }

    sessionStorage.setItem("session-start", new Date().toString());

    const sessionStart = sessionStorage.getItem("session-start");
    console.log(`Session started at: ${sessionStart}`);
});
