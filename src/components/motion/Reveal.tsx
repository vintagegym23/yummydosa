/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_OUT, VIEWPORT_ONCE, directionalVariants } from './variants';

interface RevealProps {
  children: React.ReactNode;
  /** Direction the element travels in from. Defaults to 'up'. */
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
  /** Stagger delay in seconds, for sequencing multiple Reveals by hand. */
  delay?: number;
  duration?: number;
  className?: string;
  as?: 'div' | 'section' | 'span' | 'li' | 'header' | 'footer';
  /** Re-trigger every time the element scrolls into view, instead of once. */
  repeat?: boolean;
}

/** Fades + slides an element in as it enters the viewport. The default building block for scroll-based entrances. */
export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = DURATION.base,
  className,
  as = 'div',
  repeat = false,
}: RevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];
  const variants = directionalVariants(direction);

  if (prefersReducedMotion) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={repeat ? { ...VIEWPORT_ONCE, once: false } : VIEWPORT_ONCE}
      variants={variants}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </MotionTag>
  );
};
