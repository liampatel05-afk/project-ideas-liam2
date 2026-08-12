import { allUsers, findUserByEmail, insertUser } from "../models/users.js";
import { hashPassword } from "../hash.js";
import { render } from "../render.js";
import { redirect } from "../redirect.js";
import { hasErrors } from "../schema/validation.js";
import { usersView } from "../views/users.js";
import { registerView } from "../views/auth.js";

export function usersController(context) {
    return render(context, "Users", usersView(allUsers()));
}

export function registerFormController(context) {
    return render(context, "Register", registerView(), 200, {
        script: '<script src="/assets/js/confirmPassword.js" defer></script>'
    });
}

export async function registerUserController(context) {
    if (hasErrors(context.errors)) {
        return render(context, "Register", registerView({
            errors: context.errors,
            values: context.data
        }), 400, {
            script: '<script src="/assets/js/confirmPassword.js" defer></script>'
        });
    }

    const existingUser = findUserByEmail(context.data.email);
    if (existingUser) {
        return render(context, "Register", registerView({
            errors: { email: "An account with this email already exists" },
            values: context.data
        }), 400, {
            script: '<script src="/assets/js/confirmPassword.js" defer></script>'
        });
    }

    const passwordHash = await hashPassword(context.data.password);

    insertUser({
        name: String(context.data.name).trim(),
        email: String(context.data.email).trim(),
        passwordHash
    });

    return redirect("/login", "Account created. You can now sign in.");
}
