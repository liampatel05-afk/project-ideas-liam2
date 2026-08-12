import { escapeHTML } from "../escape.js";

export function usersView(users) {
    const cards = users.map((user) => `
        <article class="user-card">
            <h3>${escapeHTML(user.name)}</h3>
            <p><strong>Email:</strong> ${escapeHTML(user.email)}</p>
        </article>
    `).join("");

    return `
        <section aria-labelledby="users-heading">
            <div class="section-heading">
                <h2 id="users-heading">Users</h2>
                <a class="button" href="/register">Register User</a>
            </div>
            <div class="user-grid">${cards || "<p>No users have registered yet.</p>"}</div>
        </section>
    `;
}
