export async function withLogging(context, next) {
    console.log(`${context.request.method} ${context.url.pathname}`);
    return await next();
}
