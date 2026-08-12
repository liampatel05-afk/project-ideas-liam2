import { findUserByEmail } from "../models/users.js";
import { insertSession, deleteSession } from "../models/sessions.js";
import { verifyPassword } from "../hash.js";
import { render } from "../render.js";
import { redirect } from "../redirect.js";
import { hasErrors } from "../schema/validation.js";
import { loginView } from "../views/auth.js";

function sessionCookie(sessionId) {
    return `sessionId=${sessionId}; Path=/; HttpOnly; SameSite=Lax`;
}

function removeSessionCookie() {
    return "sessionId=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax";
}

export function loginFormController(context) {
    return render(context, "Sign in", loginView());
}

export async function createSessionController(context) {
    if (hasErrors(context.errors)) {
        return render(context, "Sign in", loginView({
            errors: context.errors,
            values: context.data
        }), 400);
    }

    const user = findUserByEmail(context.data.email);
    const validPassword = user && await verifyPassword(context.data.password, user.password_hash);

    if (!user || !validPassword) {
        return render(context, "Sign in", loginView({
            values: context.data,
            message: "Email or password is incorrect"
        }), 401);
    }

    const sessionId = insertSession(user.id);
    const response = redirect("/tasks", "Signed in successfully");
    response.headers.append("set-cookie", sessionCookie(sessionId));
    return response;
}

export function deleteSessionController(context) {
    if (context.session) {
        deleteSession(context.session.id);
    }

    const response = redirect("/login", "Signed out successfully");
    response.headers.append("set-cookie", removeSessionCookie());
    return response;
}
