import { db } from "../db.js";

export function allUsers() {
    return db.prepare("SELECT id, name, email FROM users ORDER BY id DESC").all();
}

export function findUserByEmail(email) {
    return db.prepare("SELECT id, name, email, password_hash FROM users WHERE email = ?").get(email);
}

export function insertUser(user) {
    return db.prepare(`
        INSERT INTO users (name, email, password_hash)
        VALUES (?, ?, ?)
    `).run(user.name, user.email, user.passwordHash);
}
