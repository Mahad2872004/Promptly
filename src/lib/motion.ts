import type { Transition, Variants } from "motion/react";

/**
 * Motion language for the redesigned site. Premium = restrained:
 * one easing curve, 400–700ms, small distances, entrances play once.
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * (transforms are dropped, opacity still fades) plus the CSS override in
 * styles/base.css for keyframe animations.
 */

/** cubic-bezier(0.22, 1, 0.36, 1) — mirrors --ease in tokens.css. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.2,
  base: 0.5,
  slow: 0.7,
} as const;

/** Section entrances: 12px rise, 60ms between siblings, 20% in view. */
export const RISE = 12;
export const STAGGER = 0.06;
export const IN_VIEW = { once: true, amount: 0.2 } as const;

export const transition: Transition = {
  duration: DURATION.base,
  ease: EASE,
};

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: RISE },
  visible: { opacity: 1, y: 0, transition },
};

export const stagger = (delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER, delayChildren } },
});

