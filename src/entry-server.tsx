/**
 * Server entry used only at build time by scripts/prerender.mjs: renders a route to
 * static HTML plus its <head> tags. Mirrors main.tsx.
 *
 * Uses renderToString rather than the streaming prerender API: streaming output reveals
 * Suspense boundaries with inline <script>s, which the site's Content-Security-Policy
 * (script-src 'self') blocks. Lazy pages suspend on the first pass, which starts loading
 * their modules; once loaded, a later pass renders them fully, as plain HTML.
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { renderHeadTags } from './seo/head';

export { PAGES, NOT_FOUND_PAGE, SITE_URL, SITE_NOINDEX } from './seo/pages';

/** React marks a Suspense boundary it couldn't finish with <!--$!--> (client-render) or <!--$?--> (pending). */
const INCOMPLETE = /<!--\$[!?]-->/;

export async function render(url: string): Promise<{ html: string; head: string }> {
  const app = (
    <StrictMode>
      <ErrorBoundary>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </ErrorBoundary>
    </StrictMode>
  );

  let html = '';
  for (let attempt = 0; attempt < 20; attempt++) {
    html = renderToString(app);
    if (!INCOMPLETE.test(html)) return { html, head: renderHeadTags(url) };
    await new Promise((resolve) => setTimeout(resolve, 25)); // let lazy page modules finish loading
  }
  throw new Error(`Prerender of ${url} still has unfinished Suspense boundaries`);
}
