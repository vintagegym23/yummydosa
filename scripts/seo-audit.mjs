#!/usr/bin/env node
/**
 * SEO audit of the built site as a crawler first sees it: JavaScript DISABLED, raw HTML only.
 *
 *   npm run build && npm run serve:prod     # terminal 1
 *   npm run test:seo                        # terminal 2 (BASE_URL=... for a live deploy)
 *
 * Checks every URL in sitemap.xml (plus the 404 page): HTTP status, robots meta, unique
 * title + description of sensible length, canonical, html lang, Open Graph/Twitter tags,
 * exactly one <h1> with no skipped heading levels, alt text on every image, valid JSON-LD
 * whose BreadcrumbList matches the visible breadcrumbs, and that every internal link works.
 */
import { chromium } from 'playwright-core';

const BASE_URL = (process.env.BASE_URL ?? 'http://localhost:4173').replace(/\/$/, '');
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

async function launch() {
  for (const channel of ['chrome', 'msedge', undefined]) {
    try {
      return await chromium.launch({ channel, headless: true });
    } catch {
      /* next */
    }
  }
  throw new Error('No Chrome/Edge/Chromium found.');
}

const browser = await launch();
const context = await browser.newContext({ javaScriptEnabled: false });
const page = await context.newPage();
const request = context.request;

// robots.txt + sitemap
const robots = await request.get(`${BASE_URL}/robots.txt`);
const robotsText = await robots.text();
if (robots.status() !== 200) err(`robots.txt: HTTP ${robots.status()}`);
const sitemapUrl = robotsText.match(/^Sitemap:\s*(\S+)/m)?.[1];
if (/^Disallow:\s*\/\s*$/m.test(robotsText)) warn('robots.txt disallows everything (noindex/preview build)');
if (!sitemapUrl) err('robots.txt: no Sitemap line');

const sitemap = await request.get(`${BASE_URL}/sitemap.xml`);
if (sitemap.status() !== 200) err(`sitemap.xml: HTTP ${sitemap.status()}`);
const locs = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const siteOrigin = locs[0] ? new URL(locs[0]).origin : null;
if (sitemapUrl && siteOrigin && !sitemapUrl.startsWith(siteOrigin)) err(`robots.txt Sitemap (${sitemapUrl}) is on a different origin from the sitemap URLs (${siteOrigin})`);
const paths = locs.map((l) => new URL(l).pathname);
console.log(`sitemap: ${paths.length} URLs on ${siteOrigin}\n`);

const titles = new Map();
const descriptions = new Map();
const internalLinks = new Set();

for (const path of [...paths, '/this-page-does-not-exist']) {
  const isNotFound = path === '/this-page-does-not-exist';
  const res = await page.goto(BASE_URL + path, { waitUntil: 'domcontentloaded' });
  const label = path;
  const expected = isNotFound ? 404 : 200;
  if (res.status() !== expected) err(`${label}: HTTP ${res.status()} (expected ${expected})`);
  const xRobots = res.headers()['x-robots-tag'];
  if (!isNotFound && xRobots && /noindex/.test(xRobots)) err(`${label}: X-Robots-Tag ${xRobots}`);

  const data = await page.evaluate(() => {
    const meta = (sel) => document.querySelector(sel)?.getAttribute('content') ?? null;
    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => ({
      level: Number(h.tagName[1]),
      text: h.textContent.trim().replace(/\s+/g, ' ').slice(0, 60),
    }));
    return {
      lang: document.documentElement.lang,
      title: document.title,
      titleCount: document.querySelectorAll('title').length,
      description: meta('meta[name="description"]'),
      robots: meta('meta[name="robots"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
      og: ['og:title', 'og:description', 'og:image', 'og:url', 'og:type'].map((p) => [p, meta(`meta[property="${p}"]`)]),
      twitter: meta('meta[name="twitter:card"]'),
      viewport: meta('meta[name="viewport"]'),
      headings,
      imgsWithoutAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).map((i) => i.getAttribute('src')),
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
      breadcrumbs: [...document.querySelectorAll('nav[aria-label="Breadcrumb"] li')].map((li) => li.textContent.trim()),
      links: [...document.querySelectorAll('a[href]')].map((a) => ({ href: a.getAttribute('href'), text: (a.textContent || a.getAttribute('aria-label') || a.querySelector('img')?.alt || '').trim() })),
      textLength: document.body.innerText.length,
    };
  });

  if (!data.lang) err(`${label}: <html> has no lang`);
  if (!data.viewport) err(`${label}: no viewport meta`);
  if (data.titleCount !== 1) err(`${label}: ${data.titleCount} <title> elements`);
  if (!data.title) err(`${label}: empty <title>`);
  else if (data.title.length > 65) warn(`${label}: title is ${data.title.length} chars (may be truncated): "${data.title}"`);
  if (!data.description) err(`${label}: no meta description`);
  else if (data.description.length < 70 || data.description.length > 165) warn(`${label}: description is ${data.description.length} chars`);

  if (isNotFound) {
    if (!/noindex/.test(data.robots ?? '')) err(`${label}: 404 page is not noindex`);
  } else {
    if (/noindex/.test(data.robots ?? '')) err(`${label}: in sitemap but robots="${data.robots}"`);
    if (!data.canonical) err(`${label}: no canonical`);
    else if (new URL(data.canonical).pathname !== path || new URL(data.canonical).origin !== siteOrigin)
      err(`${label}: canonical ${data.canonical} doesn't match sitemap URL`);
    titles.set(data.title, [...(titles.get(data.title) ?? []), path]);
    descriptions.set(data.description, [...(descriptions.get(data.description) ?? []), path]);
    data.og.filter(([, v]) => !v).forEach(([p]) => err(`${label}: missing ${p}`));
    if (!data.twitter) err(`${label}: missing twitter:card`);
    if (data.textLength < 300) warn(`${label}: only ${data.textLength} characters of text in the raw HTML`);
  }

  const h1s = data.headings.filter((h) => h.level === 1);
  if (h1s.length !== 1) err(`${label}: ${h1s.length} <h1> elements ${JSON.stringify(h1s.map((h) => h.text))}`);
  data.headings.forEach((h, i) => {
    const prev = data.headings[i - 1];
    if (prev && h.level > prev.level + 1) warn(`${label}: heading skips a level: h${prev.level} "${prev.text}" -> h${h.level} "${h.text}"`);
  });
  data.imgsWithoutAlt.forEach((src) => err(`${label}: <img> without alt: ${src}`));

  for (const raw of data.jsonLd) {
    let json;
    try {
      json = JSON.parse(raw);
    } catch (e) {
      err(`${label}: invalid JSON-LD (${e.message})`);
      continue;
    }
    const graph = json['@graph'] ?? [json];
    if (json['@context'] !== 'https://schema.org') err(`${label}: JSON-LD @context is ${json['@context']}`);
    graph.forEach((node) => !node['@type'] && err(`${label}: JSON-LD node without @type`));
    const crumbs = graph.find((n) => n['@type'] === 'BreadcrumbList');
    if (crumbs) {
      const names = crumbs.itemListElement.map((i) => i.name);
      if (JSON.stringify(names) !== JSON.stringify(data.breadcrumbs)) err(`${label}: BreadcrumbList ${JSON.stringify(names)} != visible ${JSON.stringify(data.breadcrumbs)}`);
    } else if (data.breadcrumbs.length) err(`${label}: visible breadcrumbs but no BreadcrumbList`);
  }
  if (!isNotFound && !data.jsonLd.length) warn(`${label}: no JSON-LD`);

  for (const link of data.links) {
    if (/^(click here|here|read more|more|learn more|link)$/i.test(link.text)) warn(`${label}: non-descriptive link text "${link.text}" -> ${link.href}`);
    if (!link.text) warn(`${label}: link with no text or aria-label -> ${link.href}`);
    if (link.href.startsWith('/') && !link.href.startsWith('//')) internalLinks.add(link.href.split('#')[0] || '/');
  }

  const shortTitle = data.title.length > 48 ? data.title.slice(0, 45) + '...' : data.title;
  console.log(`  ${path.padEnd(26)} ${res.status()}  h1=${h1s.length} imgs-no-alt=${data.imgsWithoutAlt.length} ld=${data.jsonLd.length}  "${shortTitle}"`);
}

for (const [t, ps] of titles) if (ps.length > 1) err(`duplicate title "${t}" on ${ps.join(', ')}`);
for (const [d, ps] of descriptions) if (ps.length > 1) err(`duplicate description on ${ps.join(', ')}`);

// Every internal link must resolve (assets and pages), without redirects.
for (const href of internalLinks) {
  const res = await request.get(BASE_URL + href, { maxRedirects: 0 });
  if (res.status() !== 200) err(`internal link ${href}: HTTP ${res.status()}`);
}
console.log(`\ninternal links checked: ${internalLinks.size}`);

await browser.close();
warnings.forEach((w) => console.log(`  warn  ${w}`));
errors.forEach((e) => console.log(`  ERROR ${e}`));
console.log(errors.length ? `\n${errors.length} error(s), ${warnings.length} warning(s).` : `\nSEO audit passed (${warnings.length} warning(s)).`);
process.exit(errors.length ? 1 : 0);
