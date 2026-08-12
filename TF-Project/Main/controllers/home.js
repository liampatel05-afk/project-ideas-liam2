import { render } from "../render.js";
import { homeView } from "../views/home.js";

export function homeController(context) {
    return render(context, "Home", homeView());
}
