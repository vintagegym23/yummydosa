/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface FloatingBlobsProps {
  /** 'warm' for orange/amber glows, 'cool' for emerald glows. */
  tone?: 'warm' | 'cool';
  className?: string;
}

/**
 * Slow-drifting blurred gradient orbs for dark/ambient sections. Purely decorative
 * (aria-hidden), GPU-cheap (transform-only), and skipped entirely for reduced-motion users.
 */
export const FloatingBlobs: React.FC<FloatingBlobsProps> = ({ tone = 'cool', className = '' }) => {
  const prefersReducedMotion = useReducedMotion();
  const colorA = tone === 'warm' ? 'bg-amber-500/10' : 'bg-emerald-500/10';
  const colorB = tone === 'warm' ? 'bg-orange-500/10' : 'bg-white/5';

  if (prefersReducedMotion) {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
        <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl ${colorB}`} />
        <div className={`absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl ${colorA}`} />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <motion.div
        className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl ${colorB}`}
        animate={{ x: [0, 30, -10, 0], y: [0, 20, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl ${colorA}`}
        animate={{ x: [0, -25, 15, 0], y: [0, -15, 25, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  );
};
