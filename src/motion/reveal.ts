import type { Transition, Variants } from "motion/react";

/**
 * Shared entrance-animation constants.
 *
 * ONE engine for the whole site: `motion`. ScrollReveal, RevealGroup,
 * PageEnter and the scroll scenes all read from here, so timing and easing
 * are impossible to drift apart per component.
 */

/**
 * Boot-overlay duration in ms. PageLoader and App both read this so the
 * overlay and the content mount are driven by one number.
 */
export const BOOT_MS = 900;

/** cubic-bezier(0.16, 1, 0.3, 1) — a hard ease-out, settles quickly. */
export const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

/** Seconds. Sits in the 500–700ms band. */
export const REVEAL_DURATION = 0.6;

/** Seconds between staggered siblings (60–100ms band). */
export const REVEAL_STAGGER = 0.08;

/** Default rise distance for the fade+rise pattern. */
export const REVEAL_RISE = 20;

export const revealTransition: Transition = {
  duration: REVEAL_DURATION,
  ease: REVEAL_EASE,
};

/**
 * Viewport config for every scroll-triggered reveal.
 * `once: true` — animations play a single time and never replay on scroll-back.
 */
export const REVEAL_VIEWPORT = {
  once: true,
  amount: 0.15,
  /*
   * The positive top margin expands the observer root UPWARD, so an element
   * the user has already scrolled past still counts as entered. Without it a
   * fast flick or a scrollbar drag can carry a section from below the fold to
   * above it between frames — IntersectionObserver never reports it as
   * intersecting and, with `once: true`, it stays invisible until the user
   * scrolls back. Costs nothing on normal downward scrolling, which is
   * governed by the bottom margin.
   */
  margin: "900px 0px -8% 0px",
} as const;

export type RevealAnimation =
  | "fade-up"
  | "fade-down"
  | "zoom-in"
  | "slide-left"
  | "slide-right"
  | "fade"
  | "scale-in"
  | "slide-left-full"
  | "slide-right-full";

/** Hidden-state offsets per animation name. Kept from the previous CSS API. */
const OFFSETS: Record<RevealAnimation, { x?: number; y?: number; scale?: number }> = {
  "fade-up": { y: REVEAL_RISE },
  "fade-down": { y: -REVEAL_RISE },
  "zoom-in": { scale: 0.92 },
  "slide-left": { x: -48 },
  "slide-right": { x: 48 },
  fade: {},
  "scale-in": { scale: 0.85 },
  "slide-left-full": { x: -80 },
  "slide-right-full": { x: 80 },
};

/**
 * Builds the hidden/visible pair for one animation.
 * When `reduced` is set the element simply appears — no transform, no delay.
 */
export function revealVariants(
  animation: RevealAnimation = "fade-up",
  reduced = false
): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
      visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0 } },
    };
  }

  const off = OFFSETS[animation] ?? OFFSETS["fade-up"];
  return {
    hidden: { opacity: 0, x: off.x ?? 0, y: off.y ?? 0, scale: off.scale ?? 1 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: revealTransition,
    },
  };
}

/** Container variants that stagger direct children. */
export function staggerVariants(stagger = REVEAL_STAGGER, reduced = false): Variants {
  return {
    hidden: {},
    visible: {
      transition: reduced
        ? { duration: 0 }
        : { staggerChildren: stagger, delayChildren: 0.05 },
    },
  };
}
