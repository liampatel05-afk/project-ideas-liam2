import { render } from "../render.js";
import { notFoundView } from "../views/notFound.js";

export function notFoundController(context) {
    return render(context, "Not found", notFoundView(), 404);
}
