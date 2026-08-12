export function notFoundView() {
    return `
        <section aria-labelledby="not-found-heading">
            <h2 id="not-found-heading">404 - Page not found</h2>
            <p>The requested page could not be found.</p>
            <a class="button" href="/">Back to Home</a>
        </section>
    `;
}
