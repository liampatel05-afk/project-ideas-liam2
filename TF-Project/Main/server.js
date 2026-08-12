export async function server(request, app) {
    return await app.handle(request);
}
