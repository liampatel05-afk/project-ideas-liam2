import { allTasksForUser, findTask, insertTask, updateTask, deleteTask } from "../models/tasks.js";
import { render } from "../render.js";
import { redirect } from "../redirect.js";
import { hasErrors } from "../schema/validation.js";
import { tasksView, taskFormView } from "../views/tasks.js";

function taskFromData(data, userId) {
    return {
        label: String(data.label ?? "").trim(),
        description: String(data.description ?? "").trim(),
        dueDate: String(data.dueDate ?? "").trim(),
        status: String(data.status ?? "Not started").trim() || "Not started",
        userId
    };
}

export function tasksController(context) {
    const tasks = allTasksForUser(context.user.id);
    return render(context, "Tasks", tasksView(tasks));
}

export function newTaskController(context) {
    return render(context, "Create Task", taskFormView({
        action: "/tasks",
        heading: "Add a new task",
        buttonText: "create",
        errors: {},
        task: { status: "Not started" }
    }));
}

export function createTaskController(context) {
    if (hasErrors(context.errors)) {
        return render(context, "Create Task", taskFormView({
            action: "/tasks",
            heading: "Add a new task",
            buttonText: "create",
            task: context.data,
            errors: context.errors
        }), 400);
    }

    insertTask(taskFromData(context.data, context.user.id));
    return redirect("/tasks", "Task created successfully");
}

export function editTaskController(context) {
    const task = findTask(context.params.taskId, context.user.id);

    if (!task) {
        return redirect("/tasks", "Task could not be found");
    }

    return render(context, "Edit Task", taskFormView({
        action: `/tasks/${task.id}/edit`,
        heading: "Edit task",
        buttonText: "save",
        task,
        errors: {}
    }));
}

export function updateTaskController(context) {
    if (hasErrors(context.errors)) {
        return render(context, "Edit Task", taskFormView({
            action: `/tasks/${context.params.taskId}/edit`,
            heading: "Edit task",
            buttonText: "save",
            task: context.data,
            errors: context.errors
        }), 400);
    }

    updateTask(context.params.taskId, taskFromData(context.data, context.user.id));
    return redirect("/tasks", "Task updated successfully");
}

export function deleteTaskController(context) {
    deleteTask(context.params.taskId, context.user.id);
    return redirect("/tasks", "Task deleted successfully");
}
