import { useEffect } from 'react';

interface DocumentMetaOptions {
  title: string;
  description: string;
  image?: string;
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Sets per-page title, meta description, canonical URL and OpenGraph tags on mount. */
export function useDocumentMeta({ title, description, image }: DocumentMetaOptions) {
  useEffect(() => {
    const fullTitle = `${title} | Yummy Dosa`;
    document.title = fullTitle;
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', window.location.href);
    if (image) setMetaTag('property', 'og:image', image);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + window.location.pathname);
  }, [title, description, image]);
}
