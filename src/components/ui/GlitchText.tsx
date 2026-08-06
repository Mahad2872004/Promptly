import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { REVEAL_VIEWPORT } from "../../motion/reveal";

/**
 * Short blur/glitch resolve for a scene title.
 *
 * The text starts blurred and slightly wide-tracked, then snaps into focus —
 * a signal-locking-on feel rather than a decorative jitter. Under
 * `prefers-reduced-motion` it just appears.
 */
export default function GlitchText({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const reduced = useReducedMotion() ?? false;
  const M = motion[Tag];

  if (reduced) return <Tag className={className}>{children}</Tag>;

  return (
    <M
      className={className}
      initial={{ opacity: 0, filter: "blur(12px)", letterSpacing: "0.12em" }}
      whileInView={{ opacity: 1, filter: "blur(0px)", letterSpacing: "-0.025em" }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  );
}
