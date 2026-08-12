import { setFlash } from "./flash.js";

export function redirect(location, message = "") {
    const headers = new Headers();
    headers.set("location", location);

    if (message) {
        headers.append("set-cookie", setFlash(message));
    }

    return new Response(null, { status: 303, headers });
}
