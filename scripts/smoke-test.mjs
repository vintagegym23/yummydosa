#!/usr/bin/env node
/**
 * Browser smoke test for the built site. Runs headless Chrome (your installed
 * Chrome or Edge, via playwright-core -- no browser download) against BASE_URL:
 *
 *   npm run build && npm run serve:prod      # terminal 1: dist/ with Amplify headers
 *   npm run test:e2e                         # terminal 2
 *   BASE_URL=https://main.xxxx.amplifyapp.com npm run test:e2e   # against a live deploy
 *
 * For every route, at desktop / tablet / mobile widths, it checks: the page renders
 * its heading, no uncaught JS errors, no console errors (CSP violations included), no
 * failed same-origin requests, no broken images, no horizontal overflow. It then runs
 * the critical flows: enquiry forms -> WhatsApp, menu deep link, 404s.
 */
import { chromium } from 'playwright-core';

const BASE_URL = (process.env.BASE_URL ?? 'http://localhost:4173').replace(/\/$/, '');

const ROUTES = [
  '/', '/menu', '/about', '/gallery', '/order-online', '/orderfromus', '/book-a-table',
  '/banquet-hall', '/catering', '/franchise', '/careers', '/contact', '/photo-credits', '/no-such-page',
];
const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 820, height: 1180 },
  mobile: { width: 390, height: 844 },
};
// Noise from third-party embeds that we don't control (Google Maps, PocketOrder).
// 'Failed to load resource' duplicates the response check below (which also names the URL).
const IGNORED_CONSOLE = [/^Failed to load resource/, /google\.com\/maps/i, /pocketorder/i, /gstatic/i, /Failed to load resource.*(google|pocketorder)/i];

const failures = [];
const fail = (msg) => {
  failures.push(msg);
  console.log(`  FAIL ${msg}`);
};

async function launch() {
  for (const channel of ['chrome', 'msedge', undefined]) {
    try {
      return await chromium.launch({ channel, headless: true });
    } catch {
      /* try the next one */
    }
  }
  throw new Error('No Chrome/Edge/Chromium found. Install Chrome or run `npx playwright install chromium`.');
}

async function newPage(browser, viewport) {
  const context = await browser.newContext({ viewport });
  // Skip the once-per-session promo popup, and record window.open calls (the forms open WhatsApp).
  await context.addInitScript(() => {
    sessionStorage.setItem('yd-promo-seen', '1');
    window.__opened = [];
    window.open = (url) => {
      window.__opened.push(String(url));
      return null;
    };
  });
  const page = await context.newPage();
  const problems = [];
  page.on('pageerror', (err) => problems.push(`uncaught error: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    if (!IGNORED_CONSOLE.some((re) => re.test(text))) problems.push(`console error: ${text}`);
  });
  page.on('response', (res) => {
    const intended404 = res.status() === 404 && res.request().resourceType() === 'document'; // the 404 page itself
    if (res.url().startsWith(BASE_URL) && res.status() >= 400 && !intended404) problems.push(`HTTP ${res.status()} ${res.url()}`);
  });
  return { context, page, problems };
}

/** Scroll through the page so lazy images/sections load, then come back up. */
async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
}

async function checkRoute(browser, route, vpName) {
  const { context, page, problems } = await newPage(browser, VIEWPORTS[vpName]);
  const label = `${route} [${vpName}]`;
  try {
    const res = await page.goto(BASE_URL + route, { waitUntil: 'domcontentloaded' });
    const expectedStatus = route === '/no-such-page' ? 404 : 200; // unknown URLs get a real 404 (404.html)
    if (res.status() !== expectedStatus) fail(`${label}: status ${res.status()} (expected ${expectedStatus})`);
    if (route !== '/orderfromus') {
      await page.locator('h1').first().waitFor({ timeout: 10000 });
    } else {
      await page.locator('iframe').waitFor({ timeout: 10000 });
    }
    await scrollThrough(page);

    const title = await page.title();
    if (!/Yummy Dosa/i.test(title)) fail(`${label}: unexpected <title> "${title}"`);

    const broken = await page.evaluate(() =>
      [...document.images]
        .filter((img) => img.complete && img.naturalWidth === 0 && img.currentSrc)
        .map((img) => img.currentSrc)
    );
    broken.forEach((src) => fail(`${label}: broken image ${src}`));

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 1) fail(`${label}: horizontal overflow of ${overflow}px`);

    problems.forEach((p) => fail(`${label}: ${p}`));
    if (!broken.length && overflow <= 1 && !problems.length) console.log(`  ok   ${label}`);
  } catch (err) {
    fail(`${label}: ${err.message.split('\n')[0]}`);
  } finally {
    await context.close();
  }
}

async function checkForm(browser, route, fill, expectedNumber) {
  const { context, page, problems } = await newPage(browser, VIEWPORTS.desktop);
  try {
    await page.goto(BASE_URL + route);
    const form = page.locator('form').first();
    await form.scrollIntoViewIfNeeded();
    await fill(form);
    await form.locator('button[type="submit"]').click();
    await page.waitForFunction(() => window.__opened.length > 0, null, { timeout: 5000 });
    const [url] = await page.evaluate(() => window.__opened);
    if (!url.startsWith(`https://wa.me/${expectedNumber}?text=`)) fail(`${route} form: opened ${url}`);
    else console.log(`  ok   ${route} form -> wa.me/${expectedNumber}`);
    problems.forEach((p) => fail(`${route} form: ${p}`));
  } catch (err) {
    fail(`${route} form: ${err.message.split('\n')[0]}`);
  } finally {
    await context.close();
  }
}

/** Fills every required, empty field in the form with plausible values. */
async function fillRequired(form) {
  const fields = form.locator('input[required], textarea[required], select[required]');
  for (let i = 0; i < (await fields.count()); i++) {
    const field = fields.nth(i);
    const type = (await field.getAttribute('type')) ?? (await field.evaluate((el) => el.tagName.toLowerCase()));
    if (type === 'select') continue;
    const value = { email: 'test@example.com', tel: '07700900000', date: '2030-01-15', time: '19:30', number: '20' }[type] ?? 'Smoke Test';
    await field.fill(value);
  }
}

const browser = await launch();
console.log(`Smoke testing ${BASE_URL}\n\nRoutes:`);
for (const vp of Object.keys(VIEWPORTS)) for (const route of ROUTES) await checkRoute(browser, route, vp);

console.log('\nFlows:');
await checkForm(browser, '/book-a-table', fillRequired, '442086373026');
await checkForm(browser, '/contact', fillRequired, '442086373026');
await checkForm(browser, '/banquet-hall', fillRequired, '447776675146');
await checkForm(browser, '/catering', fillRequired, '447776675146');
await checkForm(browser, '/franchise', fillRequired, '447525795805');

{
  const { context, page } = await newPage(browser, VIEWPORTS.desktop);
  // Unknown route: SPA shows the 404 page.
  await page.goto(`${BASE_URL}/no-such-page`);
  const notFound = await page
    .locator('h1', { hasText: 'Page Not Found' })
    .waitFor({ timeout: 10000 })
    .then(() => true, () => false);
  if (!notFound) fail('/no-such-page: 404 page not rendered');
  else console.log('  ok   unknown route renders the 404 page');

  // Missing static file: must be a real 404, not the HTML shell.
  const missing = await page.request.get(`${BASE_URL}/images/does-not-exist.webp`);
  if (missing.status() !== 404) fail(`missing asset returned ${missing.status()} (expected 404)`);
  else console.log('  ok   missing asset returns 404');

  // Client-side navigation from the homepage into a lazy-loaded page.
  await page.goto(BASE_URL + '/');
  await page.locator('nav a[href="/menu"]').first().click();
  await page.waitForURL('**/menu');
  await page.locator('h1').first().waitFor();
  console.log('  ok   client-side navigation to lazy-loaded /menu');

  // Deep link to a menu section scrolls to it.
  await page.goto(`${BASE_URL}/menu#dosa`);
  await page.waitForTimeout(2500);
  const top = await page.evaluate(() => document.getElementById('dosa')?.getBoundingClientRect().top);
  if (top === undefined || Math.abs(top) > 250) fail(`/menu#dosa: section not scrolled into view (top=${top})`);
  else console.log('  ok   /menu#dosa scrolls to the section');
  await context.close();
}

await browser.close();
console.log(failures.length ? `\n${failures.length} failure(s).` : '\nAll smoke tests passed.');
process.exit(failures.length ? 1 : 0);
