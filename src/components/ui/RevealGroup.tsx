import React, { Children, isValidElement } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  REVEAL_STAGGER,
  REVEAL_VIEWPORT,
  RevealAnimation,
  revealVariants,
  staggerVariants,
} from "../../motion/reveal";

interface RevealGroupProps {
  children: React.ReactNode;
  /** Applied to the container — pass the grid/flex classes here. */
  className?: string;
  style?: React.CSSProperties;
  animation?: RevealAnimation;
  /** Seconds between children. Defaults to 80ms. */
  stagger?: number;
  threshold?: number;
  /**
   * Classes for each generated child wrapper. Pass "h-full" in card grids so
   * equal-height cards keep filling their grid row through the extra element.
   */
  itemClassName?: string;
}

/**
 * Container that reveals each direct child on its own delay.
 *
 * Replaces the pattern of wrapping a whole grid in one <ScrollReveal>, which
 * animated 4–8 cards as a single block. Each child gets its own entrance, so
 * a card grid cascades instead of appearing all at once.
 *
 * Children are wrapped rather than cloned, so they don't need to be motion
 * components or accept a ref — an ordinary <div> or <button> works.
 */
export default function RevealGroup({
  children,
  className = "",
  style,
  animation = "fade-up",
  stagger = REVEAL_STAGGER,
  threshold,
  itemClassName = "",
}: RevealGroupProps) {
  const reduced = useReducedMotion() ?? false;

  const item = revealVariants(animation, reduced);
  const container = staggerVariants(stagger, reduced);

  return (
    <motion.div
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{
        ...REVEAL_VIEWPORT,
        ...(threshold != null ? { amount: threshold } : null),
      }}
    >
      {Children.map(children, (child, i) =>
        // Skip null/false branches so conditional children don't take a slot
        // in the stagger sequence and leave a visible gap in the cascade.
        isValidElement(child) || typeof child === "string" ? (
          <motion.div key={i} variants={item} className={itemClassName}>
            {child}
          </motion.div>
        ) : (
          child
        )
      )}
    </motion.div>
  );
}
