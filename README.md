# Omar Ibrahim — product portfolio

A static HTML, CSS and JavaScript portfolio for GitHub Pages. No framework, API keys, backend or package installation is required.

## Preview

Open `index.html` directly, or run `python3 -m http.server 8765` in this directory and visit `http://localhost:8765`.

## Edit

- `scripts/build.py` contains the homepage and case-study content. Run `python3 scripts/build.py` after editing it to regenerate `index.html` and `work/*.html`.
- `assets/portfolio.css` controls the layout, responsive styles and light/dark themes.
- `assets/portfolio.js` handles project filters and the fixed, illustrative interactions. The site does not call an AI service or collect visitor information.
- `assets/Omar-Ibrahim-CV.pdf` is the current résumé download.
- `legacy.html` preserves the earlier public portfolio, with an archive label and email contact link. Its media and original assets are retained.

Generated HTML is committed with the source, so GitHub Pages can serve the repository directly. The old Bootstrap/Gulp files support the archive; they are not needed to build the new portfolio.

## Content boundaries

Current product interfaces are recreations using synthetic examples. Project names are descriptive. Private Slack material, internal documents and source evidence are not included in this repository. Earlier game imagery was already part of the public portfolio.

The authoring time comparison is approximate and includes its measurement context. Validation examples demonstrate workflow behavior, not model accuracy or learning gains. The employment timeline distinguishes game work from broader AI product ownership beginning in 2025.

GitHub Pages serves the root of the `main` branch at https://omar47i.github.io/. Publish changes by pushing the reviewed generated HTML and assets to that branch. `.nojekyll` keeps the site as plain static files.
