import { createTask } from "./tasks-store.js";

const form = document.querySelector("#create-task-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    createTask({
        label: formData.get("label").trim(),
        description: formData.get("description").trim(),
        dueDate: formData.get("dueDate"),
        status: formData.get("status")
    });

    window.location.href = "tasks.html";
});
