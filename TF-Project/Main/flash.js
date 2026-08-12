export function setFlash(message) {
    return `flash=${encodeURIComponent(message)}; Path=/; SameSite=Lax`;
}

export function getFlash(request) {
    const cookie = request.headers.get("cookie") ?? "";
    const match = cookie.match(/(?:^|; )flash=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : "";
}

export function clearFlashCookie() {
    return "flash=; Path=/; Max-Age=0; SameSite=Lax";
}
