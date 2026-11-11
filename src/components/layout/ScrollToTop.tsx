import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** How long to wait for a #hash target to appear (page exit animation + lazy page chunk). */
const HASH_WAIT_MS = 3000;
const HASH_POLL_MS = 100;

/** Resets scroll position on route change, except when navigating to an in-page anchor (#hash). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const scrollToHash = () => {
      const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return Boolean(el);
    };

    if (scrollToHash()) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    if (!hash) return;

    // Cross-page anchors (e.g. /menu#dosa from the homepage): the target page mounts only after
    // the outgoing page's exit animation and its lazy chunk load, so keep looking briefly.
    const started = Date.now();
    const timer = window.setInterval(() => {
      if (scrollToHash() || Date.now() - started > HASH_WAIT_MS) window.clearInterval(timer);
    }, HASH_POLL_MS);
    return () => window.clearInterval(timer);
  }, [pathname, hash]);

  return null;
}
