import { escapeHTML } from "../escape.js";

function errorText(errors, field) {
    return errors[field] ? `<p class="error-text">${escapeHTML(errors[field])}</p>` : "";
}

export function loginView({ errors = {}, values = {}, message = "" } = {}) {
    const extraMessage = message ? `<p class="error-text">${escapeHTML(message)}</p>` : "";

    return `
        <section class="account-page" aria-labelledby="login-heading">
            <h2 id="login-heading">Sign in to your account</h2>
            <p>Don't have an account? <a href="/register">Sign up here</a></p>
            <form action="/sessions" method="post" class="compact-form account-form">
                ${extraMessage}
                <div class="compact-row">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" value="${escapeHTML(values.email)}" required>
                </div>
                ${errorText(errors, "email")}
                <div class="compact-row">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                ${errorText(errors, "password")}
                <div class="compact-button-row">
                    <button type="submit">sign in</button>
                </div>
            </form>
        </section>
    `;
}

export function registerView({ errors = {}, values = {} } = {}) {
    return `
        <section class="account-page" aria-labelledby="register-heading">
            <h2 id="register-heading">Register your account</h2>
            <p>Already have an account? <a href="/login">Sign in here</a></p>
            <form action="/register" method="post" class="compact-form account-form" id="register-form">
                <div class="compact-row">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" value="${escapeHTML(values.name)}" required>
                </div>
                ${errorText(errors, "name")}
                <div class="compact-row">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" value="${escapeHTML(values.email)}" required>
                </div>
                ${errorText(errors, "email")}
                <div class="compact-row">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                ${errorText(errors, "password")}
                <div class="compact-row">
                    <label for="confirmPassword">Confirm:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required>
                </div>
                ${errorText(errors, "confirmPassword")}
                <p id="password-message" class="error-text"></p>
                <div class="compact-button-row">
                    <button type="submit">register</button>
                </div>
            </form>
        </section>
    `;
}
