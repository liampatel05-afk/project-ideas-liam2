import { escapeHTML } from "../escape.js";

function errorText(errors, field) {
    return errors[field] ? `<p class="error-text">${escapeHTML(errors[field])}</p>` : "";
}

function statusChecked(task, value) {
    return (task.status ?? "Not started") === value ? "checked" : "";
}

export function tasksView(tasks) {
    const cards = tasks.map((task) => `
        <article class="task-card">
            <h3>${escapeHTML(task.label)}</h3>
            <p>${escapeHTML(task.description)}</p>
            <div class="task-meta">
                <p><strong>Due:</strong> ${escapeHTML(task.due_date)}</p>
                <p><strong>Status:</strong> ${escapeHTML(task.status)}</p>
            </div>
            <div class="task-actions">
                <a class="button small secondary" href="/tasks/${task.id}/edit">Edit</a>
                <form action="/tasks/${task.id}/delete" method="post">
                    <button class="danger small" type="submit">Delete</button>
                </form>
            </div>
        </article>
    `).join("");

    const empty = `<p>No tasks have been created yet.</p>`;

    return `
        <section class="tasks-panel" aria-labelledby="tasks-heading">
            <div class="section-heading">
                <h2 id="tasks-heading">My Tasks</h2>
                <a class="button" href="/tasks/new">Create Task</a>
            </div>
            <div class="task-grid">${cards || empty}</div>
        </section>
    `;
}

export function taskFormView({ action, heading, buttonText, task = {}, errors = {} }) {
    return `
        <section class="compact-section task-form-section" aria-labelledby="task-form-heading">
            <h2 id="task-form-heading">${escapeHTML(heading)}</h2>
            <form action="${action}" method="post" class="compact-form task-form-box">
                <div class="compact-row">
                    <label for="label">Task:</label>
                    <input type="text" id="label" name="label" value="${escapeHTML(task.label)}" required>
                </div>
                ${errorText(errors, "label")}

                <div class="compact-row textarea-row">
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" rows="4" required>${escapeHTML(task.description)}</textarea>
                </div>
                ${errorText(errors, "description")}

                <div class="compact-row">
                    <label for="dueDate">Due date:</label>
                    <input type="date" id="dueDate" name="dueDate" value="${escapeHTML(task.due_date)}" required>
                </div>
                ${errorText(errors, "dueDate")}

                <fieldset class="status-fieldset">
                    <legend>Status:</legend>
                    <div class="status-options">
                        <input type="radio" id="not-started" name="status" value="Not started" ${statusChecked(task, "Not started")}>
                        <label for="not-started">Not started</label>

                        <input type="radio" id="in-progress" name="status" value="In progress" ${statusChecked(task, "In progress")}>
                        <label for="in-progress">In progress</label>

                        <input type="radio" id="completed" name="status" value="Completed" ${statusChecked(task, "Completed")}>
                        <label for="completed">Completed</label>
                    </div>
                </fieldset>
                ${errorText(errors, "status")}

                <div class="compact-button-row">
                    <button type="submit">${escapeHTML(buttonText)}</button>
                </div>
            </form>
        </section>
    `;
}
