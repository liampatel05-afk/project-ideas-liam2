const form = document.querySelector("#register-form");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const message = document.querySelector("#password-message");

function checkPasswords() {
    if (!password || !confirmPassword || !message) return true;

    if (confirmPassword.value === "") {
        message.textContent = "";
        return true;
    }

    if (password.value !== confirmPassword.value) {
        message.textContent = "Passwords must match";
        return false;
    }

    message.textContent = "";
    return true;
}

if (form) {
    confirmPassword.addEventListener("input", checkPasswords);
    password.addEventListener("input", checkPasswords);

    form.addEventListener("submit", (event) => {
        if (!checkPasswords()) {
            event.preventDefault();
        }
    });
}
