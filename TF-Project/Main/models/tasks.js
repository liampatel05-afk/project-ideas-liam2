import { db } from "../db.js";

export function allTasksForUser(userId) {
    return db.prepare(`
        SELECT id, label, description, due_date, status
        FROM tasks
        WHERE user_id = ?
        ORDER BY id DESC
    `).all(userId);
}

export function findTask(id, userId) {
    return db.prepare(`
        SELECT id, label, description, due_date, status, user_id
        FROM tasks
        WHERE id = ? AND user_id = ?
    `).get(id, userId);
}

export function insertTask(task) {
    return db.prepare(`
        INSERT INTO tasks (label, description, due_date, status, user_id)
        VALUES (?, ?, ?, ?, ?)
    `).run(task.label, task.description, task.dueDate, task.status, task.userId);
}

export function updateTask(id, task) {
    return db.prepare(`
        UPDATE tasks
        SET label = ?, description = ?, due_date = ?, status = ?
        WHERE id = ? AND user_id = ?
    `).run(task.label, task.description, task.dueDate, task.status, id, task.userId);
}

export function deleteTask(id, userId) {
    return db.prepare("DELETE FROM tasks WHERE id = ? AND user_id = ?").run(id, userId);
}
