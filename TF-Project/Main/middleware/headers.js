export async function withHeaders(context, next) {
    const response = await next();
    const headers = new Headers(response.headers);

    headers.set("x-content-type-options", "nosniff");

    return new Response(response.body, {
        status: response.status,
        headers
    });
}
