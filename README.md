# Omar Ibrahim — product portfolio

A static HTML, CSS and JavaScript portfolio for GitHub Pages. No framework, API keys, backend or package installation is required.

## Preview

Open `index.html` directly, or run `python3 -m http.server 8765` in this directory and visit `http://localhost:8765`.

## Edit

- `scripts/portfolio.html` contains the homepage and case-study content. Run `python3 scripts/build.py` after editing it to regenerate `index.html` and `work/*.html`.
- `assets/portfolio-v2.css` controls the layout and responsive styles.
- `assets/portfolio-v2.js` opens case studies in accessible dialogs and switches the game previews. Case-study links also work as standalone pages without JavaScript and can be shared directly. The site does not call an AI service or collect visitor information.
- `assets/Omar-Ibrahim-CV.pdf` is the current résumé download.
- `legacy.html` preserves the earlier public portfolio, with an archive label and email contact link. Its media and original assets are retained.

Generated HTML is committed with the source, so GitHub Pages can serve the repository directly. The old Bootstrap/Gulp files support the archive; they are not needed to build the new portfolio.

## Content boundaries

Current product interfaces are recreations using synthetic examples. Project names are descriptive. Private Slack material, internal documents and source evidence are not included in this repository. The featured game illustrations are AI-created recreations with fictional names, characters and branding. They do not represent original screenshots or artwork created by Omar. Descriptions of Omar’s contributions refer to the original projects.

The authoring time comparison is approximate and includes its measurement context. Validation examples demonstrate workflow behavior, not model accuracy or learning gains. The employment timeline distinguishes game work from broader AI product ownership beginning in 2025.

GitHub Pages serves the root of the `main` branch at https://omar47i.github.io/. Publish changes by pushing the reviewed generated HTML and assets to that branch. `.nojekyll` keeps the site as plain static files.
