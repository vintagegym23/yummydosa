/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

/** Thin gradient bar pinned under the navbar that fills as the visitor scrolls down the page. */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-[#D9531E] via-[#E59819] to-[#2d6a4f]"
      style={{ scaleX }}
    />
  );
};
