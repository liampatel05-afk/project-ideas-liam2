import { getTask, updateTask } from "./tasks-store.js";

const params = new URLSearchParams(window.location.search);
const taskId = params.get("id");
const task = getTask(taskId);
const form = document.querySelector("#edit-task-form");

if (!task) {
    document.querySelector("main").innerHTML = `
        <section>
            <h2>Task not found</h2>
            <p>The selected task could not be found.</p>
            <a class="button" href="tasks.html">Back to Tasks</a>
        </section>
    `;
} else {
    form.elements.label.value = task.label;
    form.elements.description.value = task.description;
    form.elements.dueDate.value = task.dueDate;
    form.elements.status.value = task.status;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    updateTask(taskId, {
        label: formData.get("label").trim(),
        description: formData.get("description").trim(),
        dueDate: formData.get("dueDate"),
        status: formData.get("status")
    });

    window.location.href = "tasks.html";
});
