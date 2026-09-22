/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_OUT, STAGGER_CONTAINER, VIEWPORT_ONCE, directionalVariants } from './variants';

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'ul' | 'section';
  /** Seconds between each child's entrance. */
  stagger?: number;
}

/** Container that reveals its StaggerItem children one after another as it scrolls into view. */
export const StaggerGroup: React.FC<StaggerGroupProps> = ({ children, className, as = 'div', stagger }) => {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (prefersReducedMotion) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  const containerVariants = stagger
    ? { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: 0.04 } } }
    : STAGGER_CONTAINER;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
      variants={containerVariants}
    >
      {children}
    </MotionTag>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
  className?: string;
  as?: 'div' | 'li' | 'span';
  duration?: number;
}

/** A single staggered child. Must be a direct/eventual descendant of a StaggerGroup. */
export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  direction = 'up',
  className,
  as = 'div',
  duration = DURATION.base,
}: StaggerItemProps) => {
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={directionalVariants(direction)} transition={{ duration, ease: EASE_OUT }}>
      {children}
    </MotionTag>
  );
};
