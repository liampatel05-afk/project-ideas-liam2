function routeToPattern(route) {
    const keys = [];
    const pattern = route
        .replace(/\//g, "\\/")
        .replace(/:([A-Za-z0-9_]+)/g, (_match, key) => {
            keys.push(key);
            return "([^/]+)";
        });

    return {
        keys,
        regex: new RegExp(`^${pattern}$`)
    };
}

export class ApplicationRouter {
    constructor() {
        this.routes = [];
        this.middleware = [];
        this.notFoundController = () => new Response("Not found", { status: 404 });
    }

    use(handler) {
        this.middleware.push(handler);
    }

    get(path, controller, ...middleware) {
        this.add("GET", path, controller, middleware);
    }

    post(path, controller, ...middleware) {
        this.add("POST", path, controller, middleware);
    }

    add(method, path, controller, middleware = []) {
        this.routes.push({ method, path, controller, middleware, ...routeToPattern(path) });
    }

    notFound(controller) {
        this.notFoundController = controller;
    }

    match(method, pathname) {
        for (const route of this.routes) {
            if (route.method !== method) continue;

            const match = pathname.match(route.regex);
            if (!match) continue;

            const params = {};
            route.keys.forEach((key, index) => {
                params[key] = match[index + 1];
            });

            return { ...route, params };
        }

        return null;
    }

    async handle(request) {
        const url = new URL(request.url);

        if (url.pathname === "/assets/styles.css") {
            const css = await Deno.readTextFile("assets/styles.css");
            return new Response(css, { headers: { "content-type": "text/css; charset=utf-8" } });
        }

        if (url.pathname === "/assets/js/confirmPassword.js") {
            const js = await Deno.readTextFile("assets/js/confirmPassword.js");
            return new Response(js, { headers: { "content-type": "text/javascript; charset=utf-8" } });
        }

        const route = this.match(request.method, url.pathname);
        const context = {
            request,
            url,
            params: route?.params ?? {},
            data: {},
            errors: {},
            session: null,
            user: null,
            responseHeaders: new Headers()
        };

        const handlers = route
            ? [...this.middleware, ...route.middleware, route.controller]
            : [...this.middleware, this.notFoundController];

        let index = -1;

        const next = async () => {
            index += 1;
            const handler = handlers[index];
            if (!handler) return new Response("No response", { status: 500 });
            return await handler(context, next);
        };

        return await next();
    }
}
