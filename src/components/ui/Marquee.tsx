import React, { useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Infinite horizontal scroller (logos, capability strip). The second copy is
 * aria-hidden; screen readers get the list once. Pauses on hover, and has a
 * pause control because moving content must be stoppable (WCAG 2.2.2).
 * Under reduced motion it renders as a static, wrapped row.
 */
export function Marquee({
  children,
  duration = 40,
  gap = "3rem",
  label = "Scrolling list",
  className,
}: {
  children: React.ReactNode;
  /** Seconds per loop. */
  duration?: number;
  gap?: string;
  /** Accessible name for the region. */
  label?: string;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={cn("relative", className)}>
      <div
        role="region"
        aria-label={label}
        className="ds-marquee"
        data-paused={paused}
        style={
          {
            "--marquee-duration": `${duration}s`,
            "--marquee-gap": gap,
          } as React.CSSProperties
        }
      >
        <div className="ds-marquee-track">
          <div className="ds-marquee-group">{children}</div>
          <div className="ds-marquee-group" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play scrolling list" : "Pause scrolling list"}
        className="absolute top-1/2 right-0 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg-raised text-fg-subtle transition-colors hover:text-fg motion-safe:inline-flex"
      >
        {paused ? <Play size={12} /> : <Pause size={12} />}
      </button>
    </div>
  );
}
