/**
 * Build-time SEO settings, shared by vite.config.ts and scripts/prerender.mjs.
 *
 * VITE_SITE_URL      Canonical origin of the live site, e.g. https://www.yummydosarestaurant.co.uk
 *                    (no trailing slash). Used for canonical URLs, Open Graph, sitemap and JSON-LD.
 * SEO_NOINDEX=true   Force "noindex" (robots.txt disallows everything, pages get a noindex meta).
 * AWS_BRANCH         Set automatically by Amplify. Any branch other than PRODUCTION_BRANCH
 *                    (default "main") is treated as staging/preview and is never indexed.
 */
export const DEFAULT_SITE_URL = 'https://www.yummydosarestaurant.co.uk';

export function seoBuildSettings(env = process.env) {
  const siteUrl = (env.VITE_SITE_URL || DEFAULT_SITE_URL).trim().replace(/\/+$/, '');
  if (!/^https:\/\/[^/]+$/.test(siteUrl)) {
    throw new Error(`VITE_SITE_URL must be an https origin with no path, got "${siteUrl}"`);
  }
  const productionBranch = env.PRODUCTION_BRANCH || 'main';
  const isPreviewBranch = Boolean(env.AWS_BRANCH) && env.AWS_BRANCH !== productionBranch;
  const noindex = env.SEO_NOINDEX === 'true' || isPreviewBranch;
  return { siteUrl, noindex, branch: env.AWS_BRANCH ?? null };
}
