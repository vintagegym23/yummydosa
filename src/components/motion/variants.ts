/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/** Shared easing + timing tokens so every animation in the app feels like one system. */

/** "Expo out" -- fast start, long smooth settle. Reads as premium, not springy. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
/** Symmetric ease for things that move both in and out (drawers, toggles). */
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const DURATION = {
  fast: 0.22,
  base: 0.45,
  slow: 0.7,
  page: 0.38,
} as const;

export const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 420, damping: 34, mass: 0.7 };
export const SPRING_SOFT = { type: 'spring' as const, stiffness: 260, damping: 28, mass: 0.9 };
export const SPRING_SHEET = { type: 'spring' as const, stiffness: 300, damping: 32, mass: 1 };

/** Viewport trigger used by every scroll-reveal so re-entering a section never replays it. */
export const VIEWPORT_ONCE = { once: true, margin: '-10% 0px -10% 0px', amount: 0.2 } as const;

export const STAGGER_CONTAINER = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const OFFSET = 28;

export function directionalVariants(direction: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none') {
  const base = { opacity: 0 };
  switch (direction) {
    case 'up':
      return { hidden: { ...base, y: OFFSET }, show: { opacity: 1, y: 0 } };
    case 'down':
      return { hidden: { ...base, y: -OFFSET }, show: { opacity: 1, y: 0 } };
    case 'left':
      return { hidden: { ...base, x: OFFSET }, show: { opacity: 1, x: 0 } };
    case 'right':
      return { hidden: { ...base, x: -OFFSET }, show: { opacity: 1, x: 0 } };
    case 'scale':
      return { hidden: { ...base, scale: 0.92 }, show: { opacity: 1, scale: 1 } };
    case 'none':
    default:
      return { hidden: base, show: { opacity: 1 } };
  }
}
