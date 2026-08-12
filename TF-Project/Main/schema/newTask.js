import { required, minLength } from "./validation.js";

export const newTaskSchema = {
    label: [
        required("Task cannot be blank"),
        minLength(3, "Task must be at least three characters")
    ],
    description: [
        required("Description cannot be blank"),
        minLength(5, "Description must be at least five characters")
    ],
    dueDate: [
        required("Due date cannot be blank")
    ],
    status: [
        required("Status cannot be blank")
    ]
};
