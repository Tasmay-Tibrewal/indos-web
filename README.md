# Independence OS — Website

Marketing site for **Independence OS**, which runs its own clinics and builds the AI that runs them. Live at [independenceos.ai](https://independenceos.ai).

Static site, no framework, no build step. Four pages share one stylesheet and one script.

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

The only external requests are Google Fonts (Instrument Sans, IBM Plex Mono, Newsreader). Everything else is local.

## Structure

```
.
├── index.html       # Overview: hero with globe, practices, products grid, a day at the practice, clinics, roadmap
├── products.html    # The twelve products with UI panels and a system diagram
├── vision.html      # Thesis and the six-step sequence
├── team.html        # People, grouped by team
├── privacy.html     # Privacy policy (A2P 10DLC)
├── terms.html       # SMS terms (A2P 10DLC)
├── styles.css       # All styles; light and dark themes via CSS tokens
├── main.js          # Theme toggle, sticky nav, mobile menu, products sub-nav
├── globe.js         # Canvas globe for the hero (1° land mask from Natural Earth 110m, offices and clinics marked)
├── indoslogo.png    # Logo and favicon
├── images/          # Team photos
├── .nojekyll        # Serve as-is on GitHub Pages
└── .github/workflows/deploy.yml   # Cloudflare Pages deploy; the copy at the repo root deploys this folder
```

## Editing

- **Team**: each person is an `<article class="person">` in `team.html`. Photos go in `images/`; a person without a photo uses initials in `<span class="avatar">`.
- **Products**: each product is a `<section class="product" id="...">` in `products.html`. Alternate `class="product flip"` to swap the text and panel sides.
- **Colors and type**: tokens live at the top of `styles.css`. The light palette is on `:root`, the dark palette under the `prefers-color-scheme` media query and `[data-theme="dark"]`.
- **Globe**: sites and the arc are listed at the top of `globe.js`. The land mask is a base64 bitmap, 360 by 180 cells, one bit per degree.
