import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};

/**
 * Hydration-safe "prefers reduced motion". Pages are prerendered to static HTML, where
 * this is always false; during hydration React uses that same server value (so the
 * markup matches), then re-renders with the visitor's real preference. Motion's own
 * useReducedMotion reads the media query on the first client render, which would make
 * the first render differ from the prerendered HTML for reduced-motion visitors.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}
