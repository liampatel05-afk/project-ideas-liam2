import { required, minLength, matches } from "./validation.js";

export const registerSchema = {
    name: [required("Name cannot be blank")],
    email: [required("Email cannot be blank")],
    password: [
        required("Password cannot be blank"),
        minLength(6, "Password must be at least six characters")
    ],
    confirmPassword: [
        required("Please confirm your password"),
        matches("password", "Passwords must match")
    ]
};

export const loginSchema = {
    email: [required("Email cannot be blank")],
    password: [required("Password cannot be blank")]
};
