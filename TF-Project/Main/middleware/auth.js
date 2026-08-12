import { findSession } from "../models/sessions.js";
import { redirect } from "../redirect.js";

function getCookie(request, name) {
    const cookie = request.headers.get("cookie") ?? "";
    const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
    return match ? match[1] : null;
}

export async function withSession(context, next) {
    const sessionId = getCookie(context.request, "sessionId");

    if (sessionId) {
        const session = findSession(sessionId);
        if (session) {
            context.session = session;
            context.user = {
                id: session.user_id,
                name: session.name,
                email: session.email
            };
        }
    }

    return await next();
}

export async function requiresSession(context, next) {
    if (!context.user) {
        return redirect("/login", "Sign in to gain access");
    }

    return await next();
}

export async function excludesSession(context, next) {
    if (context.user) {
        return redirect("/tasks");
    }

    return await next();
}
