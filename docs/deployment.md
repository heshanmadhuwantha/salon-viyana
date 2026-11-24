# GitHub Pages deployment

The site is a static HTML, CSS, and JavaScript project with no build step.

1. Push the repository to GitHub.
2. In **Settings → Pages**, choose deployment from the desired branch and the repository root.
3. The production project-site URL is `https://heshanmadhuwantha.github.io/salon-viyana/`. Canonical and Open Graph URLs in the root HTML pages, `sitemap.xml`, and the sitemap declaration in `robots.txt` use this URL.
4. Confirm the published home page and the nine root HTML pages load, then verify the sitemap and `robots.txt`.

All asset references are relative to the project root so they work on both a custom domain and a GitHub Pages project-site path. `.nojekyll` is included to disable Jekyll processing.

The appointment form is a frontend-only prototype. It validates and previews a request but does not send or persist bookings.
