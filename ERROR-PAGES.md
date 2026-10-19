# Custom error pages

The experience section's View More button has an 8px corner radius.

## Included screens

400, 401, 403, 404, 405, 408, 410, 413, 422, 429, 500, 501, 502, 503, 504, offline, and maintenance.

Preview production pages at `/404.html`, `/403.html`, `/500.html`, `/503.html`, `/offline.html`, or `/maintenance.html`. All screens use the same brand layout and give visitors a path home and a direct contact option. Transient errors also offer a retry button. Previews do not simulate the corresponding HTTP failure or enable maintenance mode.

## Routing and recovery

- Unknown paths render the 404 screen in the React entry point. `/` and `/index.html` render the homepage; `/projects` and `/projects/developers` render the project collection. Section anchors continue to work.
- A React error boundary renders the 500 screen for rendering failures. This does not intercept unrelated network responses or event-handler exceptions.
- If the already-loaded app receives an offline event, it displays the offline screen and recovers automatically when the browser reports it is online. An initial visit without a connection still requires the browser's own offline handling; this project does not install a service worker.
- Vite emits self-contained `<code>.html` files on every build. The markup and copy come from `src/error-pages.js`; the independent stylesheet is `src/error-pages.css`. These files do not require React, external fonts, or scripts for their main recovery links.
- The build emits `dist/404.html` for static hosts that support a custom not-found file, including Vercel. Do not add a blanket rewrite to `/index.html` that converts missing pages into successful HTTP 200 responses.
- HTTP status codes are controlled by the server, not these screen components. Standalone error previews are ordinary files; they do not deliberately return failure statuses.
- Vercel's custom **platform** error replacement (for example, an actual gateway timeout) requires an Enterprise plan. The generated 5xx files are ready for that feature, or for another host's error-page mapping. See [Vercel custom error pages](https://vercel.com/docs/custom-error-pages) and [custom 404 guidance](https://vercel.com/kb/guide/custom-404-page). No deployment settings or account plans were changed.
