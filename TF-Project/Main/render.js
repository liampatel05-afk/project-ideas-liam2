import { layout } from "./views/layout.js";
import { getFlash, clearFlashCookie } from "./flash.js";

export function render(context, title, content, status = 200, options = {}) {
    const flashMessage = getFlash(context.request);
    const html = layout({
        title,
        content,
        flashMessage,
        user: context.user,
        script: options.script ?? ""
    });

    const headers = new Headers(context.responseHeaders);
    headers.set("content-type", "text/html; charset=utf-8");

    if (flashMessage) {
        headers.append("set-cookie", clearFlashCookie());
    }

    return new Response(html, { status, headers });
}
