#!/usr/bin/env node
/**
 * Serves dist/ the way AWS Amplify Hosting will: same response headers (parsed from
 * customHttp.yml), same rewrite/redirect rules (amplify-rewrites.json), and gzip/brotli
 * compression of text responses like Amplify's CDN.
 * Used for production-equivalent local testing -- `npm run build && npm run serve:prod`.
 *
 *   PORT=4173 node scripts/serve-prod.mjs
 */
import { createServer } from 'node:http';
import { createBrotliCompress, createGzip } from 'node:zlib';
import { readFileSync, statSync, createReadStream } from 'node:fs';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const port = Number(process.env.PORT ?? 4173);

/** Minimal reader for customHttp.yml's fixed shape: pattern -> [key, value] pairs. */
function readCustomHeaders() {
  const rules = [];
  let current = null;
  let pendingKey = null;
  const unquote = (v) => v.trim().replace(/^'(.*)'$/s, '$1').replace(/^"(.*)"$/s, '$1');
  for (const raw of readFileSync(join(root, 'customHttp.yml'), 'utf8').split(/\r?\n/)) {
    const line = raw.replace(/^\s+/, '');
    if (line.startsWith('#') || !line) continue;
    let m;
    if ((m = line.match(/^- pattern:\s*(.+)$/))) rules.push((current = { pattern: unquote(m[1]), headers: [] }));
    else if ((m = line.match(/^- key:\s*(.+)$/))) pendingKey = unquote(m[1]);
    else if ((m = line.match(/^value:\s*(.+)$/)) && pendingKey) {
      current.headers.push([pendingKey, unquote(m[1])]);
      pendingKey = null;
    }
  }
  return rules;
}

/** Glob -> RegExp: '**' = any depth, '*' = within one path segment. */
const globToRegExp = (glob) =>
  new RegExp(
    '^' +
      glob
        .split('**')
        .map((part) => part.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^/]*'))
        .join('.*') +
      '$'
  );

const headerRules = readCustomHeaders().map((r) => ({ ...r, re: globToRegExp(r.pattern) }));

// Amplify rules: literal sources, `<*>` wildcard, or `</regex/>`, top to bottom. 404 rules only apply
// when no file exists at the requested path: '404' (Redirect) 302-redirects to the target,
// '404-200' (Rewrite) serves the target with a 404 status.
const sourceToRegExp = (source) => {
  const regex = source.match(/^<\/(.*)\/>$/s);
  if (regex) return new RegExp(regex[1]);
  return new RegExp('^' + source.split('<*>').map((p) => p.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*') + '$');
};
const rewrites = JSON.parse(readFileSync(join(root, 'amplify-rewrites.json'), 'utf8')).map((r) => ({
  ...r,
  re: sourceToRegExp(r.source),
}));

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml',
};

const isFile = (p) => {
  try { return statSync(p).isFile(); } catch { return false; }
};

createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const path = decodeURIComponent(url.pathname);

  for (const rule of headerRules) if (rule.re.test(path)) for (const [k, v] of rule.headers) res.setHeader(k, v);

  const fileAt = (p) => join(dist, normalize(p === '/' ? '/index.html' : p));
  let file = fileAt(path);
  if (!file.startsWith(dist)) return res.writeHead(403).end();
  let status = 200;

  const rule = rewrites.find((r) => r.re.test(path) && (!r.status.startsWith('404') || !isFile(file)));
  if (rule?.status === '301' || rule?.status === '302' || rule?.status === '404') {
    return res.writeHead(rule.status === '404' ? 302 : Number(rule.status), { Location: rule.target + url.search }).end();
  }
  if (rule) {
    file = fileAt(rule.target);
    status = rule.status === '404-200' ? 404 : Number(rule.status);
  }
  if (!isFile(file)) return res.writeHead(404, { 'Content-Type': 'text/plain' }).end('404 Not Found');

  const size = statSync(file).size;
  const type = TYPES[extname(file)] ?? 'application/octet-stream';
  const range = req.headers.range?.match(/bytes=(\d*)-(\d*)/);
  if (range) {
    const start = range[1] ? Number(range[1]) : 0;
    const end = range[2] ? Number(range[2]) : size - 1;
    res.writeHead(206, { 'Content-Type': type, 'Content-Length': end - start + 1, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes' });
    return createReadStream(file, { start, end }).pipe(res);
  }
  const accept = String(req.headers['accept-encoding'] ?? '').split(',').map((e) => e.trim().split(';')[0]);
  const compressible = /^(text\/|application\/(json|xml|javascript)|image\/svg)/.test(type);
  if (compressible && (accept.includes('br') || accept.includes('gzip'))) {
    const br = accept.includes('br');
    res.writeHead(status, { 'Content-Type': type, 'Content-Encoding': br ? 'br' : 'gzip', Vary: 'Accept-Encoding' });
    return createReadStream(file).pipe(br ? createBrotliCompress() : createGzip()).pipe(res);
  }
  res.writeHead(status, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes' });
  createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`Serving dist/ with Amplify headers, rules + compression at http://localhost:${port}`);
});
