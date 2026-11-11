# Deploying to AWS Amplify Hosting

The site is a Vite + React app, **prerendered to static HTML** at build time: every page ships with
its own content, title, description, canonical URL, Open Graph tags and JSON-LD, then React takes over
in the browser. There is no backend, database or server-side secret. Forms open WhatsApp with a
pre-filled message, ordering is the embedded PocketOrder page, and maps are a Google Maps embed.

## Environment variables (Amplify → Hosting → Environment variables)

| Variable | Required? | Value |
| --- | --- | --- |
| `VITE_SITE_URL` | **Set it** | The live domain, e.g. `https://www.yummydosarestaurant.co.uk` (https, no trailing slash). Used for canonical URLs, the sitemap, Open Graph and structured data. Defaults to `https://www.yummydosarestaurant.co.uk` if unset. |
| `PRODUCTION_BRANCH` | Optional | Branch that may be indexed by search engines. Default `main`. Every other branch builds as **noindex**. |
| `SEO_NOINDEX` | Optional | `true` keeps even the production branch out of search engines (e.g. before launch). |

None of these are secrets.

## Files Amplify uses

| File | Purpose |
| --- | --- |
| `amplify.yml` | Build spec: Node 22, `npm ci`, `npm test`, `npm run build` (Vite build, WebP image variants, prerender), publishes `dist/` |
| `customHttp.yml` | Response headers: security headers (CSP, HSTS, etc.) and `Cache-Control` per path |
| `amplify-rewrites.json` | Clean URLs (`/menu` → `menu.html`), trailing-slash 301s, and a real 404 for unknown URLs. **Amplify does not read this file.** Paste it into the console (see below). The build regenerates it when pages are added. |
| `.nvmrc` | Node version for local development (22) |

## One-time setup

1. Amplify console → **Create new app** → **Host web app** → connect the Git repository and the `main` branch.
2. Build settings: Amplify detects `amplify.yml`. Leave the detected settings as they are.
3. **Environment variables:** add `VITE_SITE_URL` (see above).
4. **Hosting → Rewrites and redirects → Manage redirects → Open text editor**: replace everything with the
   contents of `amplify-rewrites.json`. This replaces Amplify's default rule. Without it, `/menu` and other
   pages return 404.
   - Or with the AWS CLI: `aws amplify update-app --app-id <APP_ID> --custom-rules file://amplify-rewrites.json`
5. Deploy, then run the checks below against the `https://main.<id>.amplifyapp.com` URL.
6. **Custom domain:** Hosting → Custom domains → Add domain. Amplify issues and renews the SSL certificate (ACM).
   Pick one of `www` / apex as primary and let Amplify redirect the other to it, and make sure it matches
   `VITE_SITE_URL`.

## Search engines (after the custom domain is live)

1. **Google Search Console:** add the domain property (DNS TXT verification), then submit
   `https://<domain>/sitemap.xml`. Use URL Inspection on `/` and `/menu` to confirm Google sees the content.
2. **Bing Webmaster Tools:** import the site from Search Console.
3. **Google Business Profile:** make sure name, address, phone and hours match the site exactly
   (they come from `src/data/content.ts`), and set the website link to the canonical domain.
4. Check structured data with the [Rich Results Test](https://search.google.com/test/rich-results) and
   the [Schema.org validator](https://validator.schema.org/) for `/`, `/menu` and `/contact`.

## Verify a deploy

```bash
BASE_URL=https://main.<id>.amplifyapp.com npm run test:e2e   # browser smoke test
BASE_URL=https://main.<id>.amplifyapp.com npm run test:seo   # crawler-view SEO audit (JS disabled)
curl -sI https://<domain>/menu    # expect 200 + Cache-Control: no-cache
curl -sI https://<domain>/menu/   # expect 301 -> /menu
curl -sI https://<domain>/nope    # expect 404
curl -s  https://<domain>/robots.txt
```

## Local production check

```bash
npm ci
npm test              # typecheck + every referenced asset exists in public/
npm run build         # vite build + WebP variants + prerender (14 pages, sitemap, robots)
npm run serve:prod    # serves dist/ with Amplify's headers, rules and compression, http://localhost:4173
npm run test:e2e      # headless Chrome: all routes x 3 viewports, forms, 404s, hydration errors
npm run test:seo      # SEO audit of the raw HTML as crawlers see it
```

## Adding or changing a page

1. Add the route in `src/App.tsx`.
2. Add its title, description and breadcrumb in `src/seo/pages.ts`. The build prerenders it and adds it to the sitemap.
3. Add a `no-cache` pattern for it in `customHttp.yml` (the build warns if one is missing).
4. Run `npm run build`: it updates `amplify-rewrites.json`. Commit it and paste it into the Amplify console again.

## Content to keep up to date

- WhatsApp numbers for the enquiry forms: `ENQUIRY_WHATSAPP` in `src/data/content.ts`.
- Business details (address, phone, hours, socials) in `src/data/content.ts` feed the visible site
  **and** the structured data, so change them in one place.
- Adding a third-party embed or script (e.g. analytics) means adding its domain to the
  `Content-Security-Policy` in `customHttp.yml`, or the browser will block it.
- New page images go in `public/images/` as WebP; menu photos as ~800px JPGs in
  `public/images/menu/photos/` (WebP versions are generated at build time). `npm test` fails the build
  if the code points at a file that doesn't exist.
- Full-resolution originals of the restaurant's dish photos live in
  `client-resources/menu-photo-originals/` and are not deployed.
