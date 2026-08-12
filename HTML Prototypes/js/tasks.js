import { getTasks, deleteTask } from "./tasks-store.js";

const taskList = document.querySelector("#task-list");

function taskCard(task) {
    return `
        <article class="task-card">
            <h3>${task.label}</h3>
            <p>${task.description}</p>
            <div class="task-meta">
                <p><strong>Due:</strong> ${task.dueDate}</p>
                <p><strong>Status:</strong> ${task.status}</p>
            </div>
            <div class="task-actions">
                <a class="button small secondary" href="edit-task.html?id=${task.id}">Edit</a>
                <button class="danger small" data-delete-id="${task.id}" type="button">Delete</button>
            </div>
        </article>
    `;
}

function renderTasks() {
    const tasks = getTasks();
    taskList.innerHTML = tasks.length
        ? tasks.map(taskCard).join("")
        : "<p>No tasks have been created yet.</p>";
}

taskList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-id]");
    if (!button) return;
    deleteTask(button.dataset.deleteId);
    renderTasks();
});

renderTasks();
