import React from "react";
import { cn } from "../../lib/cn";

/**
 * Faint 1px grid, absolutely positioned behind content. The parent needs
 * `relative isolate` so the -z-10 layer stays inside it.
 */
export function GridBackground({
  size = 56,
  fade = "radial",
  noise = false,
  className,
}: {
  /** Cell size in px. */
  size?: number;
  fade?: "radial" | "bottom" | "none";
  /** Adds the 2–3% grain texture on top. */
  noise?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10", className)}>
      <div
        className="ds-grid-bg"
        data-fade={fade}
        style={{ "--grid-size": `${size}px` } as React.CSSProperties}
      />
      {noise && <div className="ds-noise" />}
    </div>
  );
}

const orbColors = {
  teal: "var(--brand-teal)",
  cyan: "var(--brand-cyan)",
  orange: "var(--brand-orange)",
  amber: "var(--brand-amber)",
} as const;

/** Soft radial glow behind key visuals. Decorative only. */
export function GlowOrb({
  color = "teal",
  size = 520,
  drift = false,
  className,
  style,
}: {
  color?: keyof typeof orbColors;
  /** Diameter in px. */
  size?: number;
  /** Slow 18s drift. Stops under reduced motion. */
  drift?: boolean;
  /** Position it with Tailwind (e.g. `-top-40 left-1/2`). */
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      data-drift={drift}
      className={cn("ds-orb -z-10", className)}
      style={
        {
          "--orb-color": orbColors[color],
          width: size,
          height: size,
          ...style,
        } as React.CSSProperties
      }
    />
  );
}
