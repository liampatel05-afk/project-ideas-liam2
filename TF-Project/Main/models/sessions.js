import { db } from "../db.js";

export function insertSession(userId) {
    const id = crypto.randomUUID();

    db.prepare("INSERT INTO sessions (id, user_id) VALUES (?, ?)").run(id, userId);

    return id;
}

export function findSession(id) {
    return db.prepare(`
        SELECT sessions.id, users.id AS user_id, users.name, users.email
        FROM sessions
        JOIN users ON sessions.user_id = users.id
        WHERE sessions.id = ?
    `).get(id);
}

export function deleteSession(id) {
    return db.prepare("DELETE FROM sessions WHERE id = ?").run(id);
}
