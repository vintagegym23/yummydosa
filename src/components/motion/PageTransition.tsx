/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_OUT } from './variants';

/**
 * Renders the current route's element wrapped in a cross-fade + rise, keyed by pathname.
 * Captures the outlet via useOutlet() (rather than rendering a plain <Outlet/> as a child)
 * so AnimatePresence can keep the outgoing page's element mounted for its exit animation --
 * a bare <Outlet/> would swap instantly and skip the exit entirely.
 */
export const PageTransition: React.FC = () => {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{outlet}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: DURATION.page, ease: EASE_OUT }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
};
