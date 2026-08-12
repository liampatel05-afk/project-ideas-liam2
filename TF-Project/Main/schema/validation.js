export function required(message = "This field is required") {
    return function checkRequired(value) {
        return String(value ?? "").trim() ? "" : message;
    };
}

export function minLength(length, message = `Must be at least ${length} characters`) {
    return function checkLength(value) {
        return String(value ?? "").trim().length >= length ? "" : message;
    };
}

export function matches(field, message = "Fields do not match") {
    return function checkMatch(value, data) {
        return String(value ?? "") === String(data[field] ?? "") ? "" : message;
    };
}

export function validateSchema(schema, data) {
    const errors = {};

    for (const [field, rules] of Object.entries(schema)) {
        for (const rule of rules) {
            const error = rule(data[field], data);
            if (error) {
                errors[field] = error;
                break;
            }
        }
    }

    return errors;
}

export function hasErrors(errors) {
    return Object.keys(errors).length > 0;
}
