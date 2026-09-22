/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { motion, MotionProps } from 'motion/react';
import { SPRING_SNAPPY } from './variants';

const TAP = { scale: 0.94 };
const TAP_SUBTLE = { scale: 0.97 };

/** motion-enhanced <Link> with a firm, spring-back press -- the primary touch affordance for CTAs. */
export const MotionLink = motion(Link) as React.ForwardRefExoticComponent<LinkProps & MotionProps & React.RefAttributes<HTMLAnchorElement>>;

/** motion-enhanced <a> for external/WhatsApp/tel/mailto CTAs. */
export const MotionAnchor = motion.a;

/** motion-enhanced <button> for in-page actions (filters, toggles, form submits). */
export const MotionButton = motion.button;

/** Default press props to spread onto any motion element for consistent tap feedback. */
export const tapProps: MotionProps = { whileTap: TAP, transition: SPRING_SNAPPY };
export const tapPropsSubtle: MotionProps = { whileTap: TAP_SUBTLE, transition: SPRING_SNAPPY };

/** A tappable card wrapper -- press-in feedback for grid cards/tiles that aren't links. */
export const TapDiv: React.FC<React.ComponentProps<typeof motion.div>> = ({ children, ...props }) => (
  <motion.div whileTap={TAP_SUBTLE} transition={SPRING_SNAPPY} {...props}>
    {children}
  </motion.div>
);
