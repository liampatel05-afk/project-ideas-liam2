import { validateSchema } from "../schema/validation.js";

export function validate(schema) {
    return async function validateRequest(context, next) {
        const formData = await context.request.formData();
        const data = Object.fromEntries(formData.entries());
        const errors = validateSchema(schema, data);

        context.data = data;
        context.errors = errors;

        return await next();
    };
}
