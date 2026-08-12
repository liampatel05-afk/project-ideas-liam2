export function homeView() {
    return `
        <section class="hero" aria-labelledby="home-heading">
            <h2 id="home-heading">TaskFlow</h2>
            <p>
                This website's main purpose is to help users create tasks and stay up to date with their work.
                People will be able to log in to their account and track their progress.
            </p>
            <div class="hero-actions">
                <a class="button" href="/tasks">View Tasks</a>
                <a class="button secondary" href="/tasks/new">Create Task</a>
            </div>
        </section>
    `;
}
