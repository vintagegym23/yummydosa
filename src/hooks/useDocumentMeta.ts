import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { renderHeadTags } from '../seo/head';

/**
 * Keeps <head> (title, description, canonical, robots, Open Graph, Twitter, JSON-LD) in
 * sync with the current route on client-side navigation. Per-page values live in
 * src/seo/pages.ts; the same tags are baked into each page's static HTML at build time.
 */
export function useDocumentMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
    // The plain <title>/description in index.html (dev server only) would otherwise duplicate ours.
    document.head.querySelectorAll('title, meta[name="description"]').forEach((el) => el.remove());
    const template = document.createElement('template');
    template.innerHTML = renderHeadTags(pathname);
    document.head.append(template.content);
  }, [pathname]);
}
