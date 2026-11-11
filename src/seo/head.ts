import { SITE_NAME, SITE_NOINDEX, SITE_URL, absoluteUrl, getPageSeo } from './pages';
import { pageSchema } from './schema';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** JSON for a <script> body: "<" is escaped so content can never close the tag. */
const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

/**
 * Every per-page <head> tag, as HTML. The prerender script writes this into each page's
 * static HTML; on client-side navigation useDocumentMeta swaps the same tags in, so what
 * crawlers see and what the browser shows never drift apart. All tags carry data-seo.
 */
export function renderHeadTags(pathname: string): string {
  const { path, seo } = getPageSeo(pathname);
  const noindex = SITE_NOINDEX || seo.noindex;
  const url = path ? absoluteUrl(path) : null;
  const image = seo.ogImage ? `${SITE_URL}${seo.ogImage}` : null;
  const schema = pageSchema(path, seo);

  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}">`,
    `<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">`,
    url && !noindex ? `<link rel="canonical" href="${url}">` : '',
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    `<meta property="og:locale" content="en_GB">`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}">`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}">`,
    url ? `<meta property="og:url" content="${url}">` : '',
    image ? `<meta property="og:image" content="${image}">` : '',
    image ? `<meta property="og:image:width" content="1200">` : '',
    image ? `<meta property="og:image:height" content="630">` : '',
    image && seo.ogImageAlt ? `<meta property="og:image:alt" content="${escapeHtml(seo.ogImageAlt)}">` : '',
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}">`,
    image ? `<meta name="twitter:image" content="${image}">` : '',
    image && seo.ogImageAlt ? `<meta name="twitter:image:alt" content="${escapeHtml(seo.ogImageAlt)}">` : '',
    schema ? `<script type="application/ld+json">${safeJson(schema)}</script>` : '',
  ];

  return tags
    .filter(Boolean)
    .map((tag) => tag.replace(/^<(\w+)/, '<$1 data-seo'))
    .join('\n    ');
}
