import React from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import {
  fadeRise,
  IN_VIEW,
  RISE,
  stagger,
  STAGGER,
  transition,
} from "../../lib/motion";
import { cn } from "../../lib/cn";

// A variant's own transition beats the `transition` prop, so a delay has to
// live inside the variant.
const delayed = (delay: number): Variants => ({
  hidden: { opacity: 0, y: RISE },
  visible: { opacity: 1, y: 0, transition: { ...transition, delay } },
});

type RevealTag = "div" | "section" | "li" | "ul" | "ol" | "article" | "header";

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: RevealTag;
  /** Seconds. */
  delay?: number;
}

/** Fade + 12px rise, once, when 20% in view. */
export function Reveal({ as = "div", delay = 0, children, ...rest }: RevealProps) {
  const Component = motion[as] as React.ElementType;
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={IN_VIEW}
      variants={delay ? delayed(delay) : fadeRise}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** Parent that staggers its <StaggerItem> children by 60ms. */
export function Stagger({
  as = "div",
  delay = 0,
  children,
  ...rest
}: RevealProps) {
  const Component = motion[as] as React.ElementType;
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={IN_VIEW}
      variants={stagger(delay)}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  as = "div",
  children,
  ...rest
}: Omit<RevealProps, "delay">) {
  const Component = motion[as] as React.ElementType;
  return (
    <Component variants={fadeRise} {...rest}>
      {children}
    </Component>
  );
}

/**
 * Hero-only headline reveal: each line slides up from behind a mask.
 * Pass one string (or node) per visual line. Renders inline spans, so wrap
 * it in the page's <h1>.
 *
 * Pure CSS (see .ds-line in components.css) so the headline animates as soon
 * as the pre-rendered HTML and CSS arrive — it never waits for JavaScript.
 */
export function LineReveal({
  lines,
  delay = 0.1,
  className,
}: {
  lines: React.ReactNode[];
  delay?: number;
  className?: string;
}) {
  return (
    <span className={cn("block", className)}>
      {lines.map((line, i) => (
        // Padding + negative margin keep descenders from being clipped.
        <span key={i} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <span className="ds-line" style={{ animationDelay: `${delay + i * STAGGER * 1.5}s` }}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * Above-the-fold entrance (fade + 12px rise) driven by CSS, not JS, so hero
 * content paints straight from the pre-rendered HTML. Use `Reveal` for
 * anything below the fold.
 */
export function Rise({
  as: Tag = "div",
  delay = 0,
  className,
  style,
  children,
  ...rest
}: React.HTMLAttributes<HTMLElement> & { as?: "div" | "section" | "header"; delay?: number }) {
  return (
    <Tag className={cn("ds-rise", className)} style={{ animationDelay: `${delay}s`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
