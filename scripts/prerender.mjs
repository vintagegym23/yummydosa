#!/usr/bin/env node
/**
 * Static site generation, run after `vite build` (see the "build" script).
 *
 * For every route in src/seo/pages.ts it renders the React app to HTML at build time and
 * writes it with that page's own <head> (title, description, canonical, Open Graph,
 * JSON-LD), so search engines and link previews get real content without running JS.
 * The browser then hydrates the HTML (src/main.tsx). Also writes:
 *   dist/404.html       served with HTTP 404 for unknown URLs (see amplify-rewrites.json)
 *   dist/sitemap.xml    every indexable route
 *   dist/robots.txt     allows crawling + points at the sitemap (blocks everything on preview builds)
 * and keeps amplify-rewrites.json (clean URLs -> .html files) in step with the route list.
 */
import { build } from 'vite';
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { seoBuildSettings } from './seo-settings.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const ssrOut = join(root, 'node_modules/.cache/ssr');
const NOT_FOUND_URL = '/__not-found__';

const settings = seoBuildSettings();
console.log(`prerender: ${settings.siteUrl}${settings.noindex ? '  [NOINDEX build -- preview/staging]' : ''}`);

// 1. Server bundle of src/entry-server.tsx (React and other deps stay external).
await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: ssrOut, emptyOutDir: true },
});
const { render, PAGES } = await import(pathToFileURL(join(ssrOut, 'entry-server.js')).href);

// 2. Client build outputs: the HTML shell and the manifest of page chunks.
const template = readFileSync(join(dist, 'index.html'), 'utf8');
const manifestPath = join(dist, '.vite/manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
if (!template.includes('<!--app-html-->') || !/<!-- seo:start[\s\S]*?<!-- seo:end -->/.test(template)) {
  throw new Error('index.html is missing the <!--app-html--> or <!-- seo:start/end --> markers');
}

/** Route -> lazy page module, from the import() calls in src/App.tsx. */
const appSource = readFileSync(join(root, 'src/App.tsx'), 'utf8');
const lazyPage = Object.fromEntries(
  [...appSource.matchAll(/const (\w+) = lazy\(\(\) => import\('\.\/pages\/(\w+)'\)\)/g)].map(([, name, file]) => [name, `src/pages/${file}.tsx`])
);
const routeElement = Object.fromEntries(
  [...appSource.matchAll(/path="([\w-]+)"[\s\S]*?<(\w+Page) \/>/g)].map(([, path, el]) => ['/' + path, el])
);

/** modulepreload links for a page's own lazy chunk (and chunks it imports), so hydration starts sooner. */
function preloadLinks(route) {
  const entry = lazyPage[routeElement[route] ?? (route === NOT_FOUND_URL ? 'NotFoundPage' : '')];
  if (!entry || !manifest[entry]) return '';
  const files = new Set();
  const visit = (key) => {
    const chunk = manifest[key];
    if (!chunk || files.has(chunk.file)) return;
    files.add(chunk.file);
    (chunk.imports ?? []).forEach(visit);
  };
  visit(entry);
  return [...files]
    .filter((f) => !template.includes(f)) // already linked from index.html
    .map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`)
    .join('\n    ');
}

const fileFor = (route) => (route === '/' ? 'index.html' : route === NOT_FOUND_URL ? '404.html' : `${route.slice(1)}.html`);

// 3. Render every route.
const routes = [...Object.keys(PAGES), NOT_FOUND_URL];
for (const route of routes) {
  const { html, head } = await render(route);
  if (route !== NOT_FOUND_URL && /Page Not Found/.test(html)) throw new Error(`${route} rendered the 404 page -- is it in src/App.tsx?`);
  const page = template
    .replace(/<!-- seo:start[\s\S]*?<!-- seo:end -->/, [head, preloadLinks(route)].filter(Boolean).join('\n    '))
    .replace('<!--app-html-->', html);
  writeFileSync(join(dist, fileFor(route)), page);
  console.log(`  ${fileFor(route).padEnd(20)} ${(page.length / 1024).toFixed(1)} KB`);
}

// 4. sitemap.xml + robots.txt
const indexable = Object.entries(PAGES).filter(([, seo]) => !seo.noindex).map(([route]) => route);
const loc = (route) => settings.siteUrl + (route === '/' ? '/' : route);
if (settings.noindex) {
  writeFileSync(join(dist, 'robots.txt'), '# Preview/staging build: keep out of search engines.\nUser-agent: *\nDisallow: /\n');
  rmSync(join(dist, 'sitemap.xml'), { force: true });
} else {
  writeFileSync(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      indexable.map((route) => `  <url><loc>${loc(route)}</loc></url>`).join('\n') +
      `\n</urlset>\n`
  );
  writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${settings.siteUrl}/sitemap.xml\n`);
}
console.log(`  sitemap.xml          ${settings.noindex ? 'skipped (noindex build)' : `${indexable.length} URLs`}`);

// 5. Amplify rewrite rules: /page/ -> /page (301), /page -> /page.html (200), anything else -> 404.html (404).
const pageRoutes = Object.keys(PAGES).filter((r) => r !== '/');
const rules = [
  ...pageRoutes.map((r) => ({ source: `${r}/`, target: r, status: '301', condition: null })),
  ...pageRoutes.map((r) => ({ source: r, target: `${r}.html`, status: '200', condition: null })),
  // '404-200' = Amplify "404 (Rewrite)": serves 404.html with a 404 status at the requested URL.
  // (Plain '404' is "404 (Redirect)", which 302-redirects to /404.html instead.)
  { source: '/<*>', target: '/404.html', status: '404-200', condition: null },
];
const rulesFile = join(root, 'amplify-rewrites.json');
const rulesJson = JSON.stringify(rules, null, 2) + '\n';
if (!existsSync(rulesFile) || readFileSync(rulesFile, 'utf8').replace(/\r\n/g, '\n') !== rulesJson) {
  writeFileSync(rulesFile, rulesJson);
  console.warn('\n  !! amplify-rewrites.json changed: commit it and paste it into Amplify > Hosting > Rewrites and redirects.\n');
}

// Every route needs its own no-cache header rule in customHttp.yml (clean URLs aren't *.html).
const customHttp = readFileSync(join(root, 'customHttp.yml'), 'utf8');
const uncached = Object.keys(PAGES).filter((r) => !customHttp.includes(`pattern: '${r}'`));
if (uncached.length) console.warn(`\n  !! customHttp.yml has no Cache-Control pattern for: ${uncached.join(', ')}\n`);

// 6. Cleanup: the manifest is a build artifact, not something to deploy.
rmSync(join(dist, '.vite'), { recursive: true, force: true });
rmSync(ssrOut, { recursive: true, force: true });
console.log(`prerender: ${routes.length} pages written`);
