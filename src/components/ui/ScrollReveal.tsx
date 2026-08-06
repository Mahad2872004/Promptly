import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  REVEAL_VIEWPORT,
  RevealAnimation,
  revealTransition,
  revealVariants,
} from "../../motion/reveal";

export type { RevealAnimation };

export interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: RevealAnimation;
  /** Extra delay in ms, on top of any staggerIndex. */
  delay?: number;
  /** Duration in ms. Defaults to the shared 600ms. */
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Index within a sibling group; multiplied by 80ms. */
  staggerIndex?: number;
  /** Fraction of the element that must be visible. */
  threshold?: number;
  /** Render as an inline element instead of a block div. */
  as?: "div" | "span" | "li";
}

/** ms between staggered siblings — the 60–100ms band from the spec. */
const STAGGER_MS = 80;

/**
 * Scroll-triggered entrance wrapper.
 *
 * Public API is unchanged from the previous CSS/IntersectionObserver version —
 * all 97 existing call sites keep working — but the engine underneath is now
 * `motion`, matching the scroll scenes so the site runs one animation system
 * rather than two.
 *
 * Plays once (`viewport.once`), never replays on scroll-back, and collapses to
 * an instant appearance under `prefers-reduced-motion`.
 */
export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration,
  className = "",
  style,
  staggerIndex,
  threshold,
  as = "div",
}: ScrollRevealProps) {
  const reduced = useReducedMotion() ?? false;

  const totalDelay = (delay + (staggerIndex ?? 0) * STAGGER_MS) / 1000;

  const variants = revealVariants(animation, reduced);
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      // Must be unconditionally defined. framer-motion's InViewFeature starts
      // its IntersectionObserver on mount and only re-observes when amount /
      // margin / root change — a `whileInView` that appears later is never
      // picked up, and with `once: true` the observer has already stopped.
      whileInView="visible"
      viewport={{
        ...REVEAL_VIEWPORT,
        ...(threshold != null ? { amount: threshold } : null),
      }}
      transition={{
        ...revealTransition,
        ...(duration != null ? { duration: duration / 1000 } : null),
        delay: reduced ? 0 : totalDelay,
      }}
    >
      {children}
    </Tag>
  );
}
