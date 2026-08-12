const storageKey = "taskflowPrototypeTasks";

function exampleTasks() {
    return [
        {
            id: 1,
            label: "Record HTML Semantics video",
            description: "Explain semantic elements, forms and accessibility.",
            dueDate: "2026-08-08",
            status: "In progress"
        }
    ];
}

export function getTasks() {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
        return JSON.parse(saved);
    }

    const tasks = exampleTasks();
    saveTasks(tasks);
    return tasks;
}

export function getTask(id) {
    return getTasks().find((task) => task.id === Number(id));
}

export function saveTasks(tasks) {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
}

export function createTask(task) {
    const tasks = getTasks();
    const nextId = tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
    tasks.push({ id: nextId, ...task });
    saveTasks(tasks);
}

export function updateTask(id, updatedTask) {
    const tasks = getTasks().map((task) => {
        if (task.id === Number(id)) {
            return { id: Number(id), ...updatedTask };
        }
        return task;
    });
    saveTasks(tasks);
}

export function deleteTask(id) {
    const tasks = getTasks().filter((task) => task.id !== Number(id));
    saveTasks(tasks);
}
