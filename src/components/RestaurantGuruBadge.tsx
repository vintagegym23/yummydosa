import React, { useEffect, useRef } from 'react';

const BADGE_CSS = 'https://awards.infcdn.net/2026_new/badge-circledLeaves27.css';

/** Adds the badge stylesheet to <head> once. It also pulls ~730 KB of fonts, so it's never loaded up front. */
function loadBadgeStyles() {
  if (document.querySelector(`link[href="${BADGE_CSS}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = BADGE_CSS;
  document.head.appendChild(link);
}

/**
 * Restaurant Guru "Best vegetarian restaurant" award badge -- embed code supplied
 * by the client. Its stylesheet targets the element id, so render this at most once
 * per page. The stylesheet is fetched only when the badge nears the viewport, so it
 * doesn't block the first paint of the page.
 */
export const RestaurantGuruBadge: React.FC = () => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) return loadBadgeStyles();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        loadBadgeStyles();
        observer.disconnect();
      },
      { rootMargin: '800px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      id="rg26-b-circledLeaves27"
      target="_blank"
      rel="noopener noreferrer"
      href="https://restaurantguru.com/Yummy-Dosa-Multi-Cuisine-Pure-Veg-Restaurant-Ilford"
      className="rg26-b-circledLeaves27--light rg26-b-circledLeaves27--2025"
    >
      <span className="rg26-b-circledLeaves27__title">Best vegetarian restaurant</span>
      <span className="rg26-b-circledLeaves27__separator"></span>
      <span className="rg26-b-circledLeaves27__name">Yummy Dosa Pure Veg indian Restaurant</span>
    </a>
  );
};
