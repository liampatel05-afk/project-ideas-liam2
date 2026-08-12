import { escapeHTML } from "../escape.js";

export function layout({ title, content, flashMessage = "", user = null, script = "" }) {
    const flash = flashMessage ? `<p class="flash-message">${escapeHTML(flashMessage)}</p>` : "";
    const authLink = user
        ? `<form action="/logout" method="post" class="nav-form"><button type="submit">Sign out</button></form>`
        : `<a href="/login">Sign in</a>`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHTML(title)} | TaskFlow</title>
    <link rel="stylesheet" href="/assets/styles.css">
    ${script}
</head>
<body>
    <header>
        <h1>TaskFlow</h1>
        <nav aria-label="Main navigation">
            <a href="/">Home</a>
            <a href="/tasks">Tasks</a>
            <a href="/tasks/new">Create Task</a>
            <a href="/users">Users</a>
            ${authLink}
        </nav>
    </header>

    <main>
        ${flash}
        ${content}
    </main>

    <footer>
        <p>TaskFlow - Web Application Development Project</p>
    </footer>
</body>
</html>`;
}
