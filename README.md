# Salon Viyana Kandy

Static, multi-page website for Salon Viyana Kandy. The project uses HTML, CSS, and vanilla JavaScript and requires no build tools or runtime dependencies.

## Project structure

```text
.
├── index.html
├── about.html
├── services.html
├── experience.html
├── bridal.html
├── gallery.html
├── testimonials.html
├── contact.html
├── appointment.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── responsive.css
│   │   └── modules/
│   ├── fonts/
│   ├── icons/
│   ├── images/
│   │   ├── brand/
│   │   ├── bridal/
│   │   ├── gallery/
│   │   ├── hero/
│   │   ├── reference/
│   │   └── services/
│   └── js/
│       ├── config.js
│       ├── main.js
│       └── appointment.js
├── docs/
│   └── deployment.md
├── robots.txt
├── sitemap.xml
└── .nojekyll
```

`style.css` imports the ordered stylesheet modules; `responsive.css` is loaded afterward for responsive overrides. `main.js` provides shared site behavior, `config.js` contains salon settings and image paths, and `appointment.js` handles the appointment-page form. The icon and font folders are ready for supplied local assets; the existing design currently uses a remote Google Fonts stylesheet.

## Salon configuration

Update verified business details in [`assets/js/config.js`](assets/js/config.js). Social profile URLs are currently blank and should only be set to verified accounts.

## Local preview

From the project root, start a static server:

```powershell
py -m http.server 8000
```

Then open `http://localhost:8000/`.

## GitHub Pages

The HTML pages remain in the repository root and use project-relative asset paths for the GitHub Pages project site at `https://heshanmadhuwantha.github.io/salon-viyana/`. Canonical, Open Graph, sitemap, and robots URLs use this production base. Follow [`docs/deployment.md`](docs/deployment.md) before publishing.

The appointment form is a frontend-only prototype; it does not transmit or persist booking requests.
