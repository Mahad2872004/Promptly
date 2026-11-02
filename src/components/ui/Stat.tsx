import React, { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { cn } from "../../lib/cn";
import { EASE } from "../../lib/motion";

export interface StatProps {
  /**
   * The figure. Numbers count up once when scrolled into view; strings are
   * shown as-is. Only ever pass real, verifiable numbers — never placeholders.
   */
  value: number | string;
  prefix?: string;
  suffix?: string;
  label: React.ReactNode;
  /** Use orange for the one number the eye should land on. */
  emphasis?: boolean;
  decimals?: number;
  className?: string;
}

export function Stat({
  value,
  prefix = "",
  suffix = "",
  label,
  emphasis,
  decimals = 0,
  className,
}: StatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const numeric = typeof value === "number";
  const [display, setDisplay] = useState(numeric && !reduced ? 0 : value);

  useEffect(() => {
    if (!numeric || !inView) return;
    if (reduced) return setDisplay(value);
    const controls = animate(0, value, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (v) => setDisplay(Number(v.toFixed(decimals))),
    });
    return () => controls.stop();
  }, [numeric, inView, reduced, value, decimals]);

  const formatted =
    typeof display === "number"
      ? display.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : display;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span
        ref={ref}
        className={cn(
          "tabular font-display text-[clamp(2.5rem,4.5vw,3.75rem)] leading-none font-semibold tracking-[-0.04em]",
          emphasis ? "text-spark" : "text-fg",
        )}
      >
        {/* Screen readers get the final value, not the animation frames. */}
        <span className="sr-only">
          {prefix}
          {typeof value === "number" ? value.toLocaleString("en-US") : value}
          {suffix}
        </span>
        <span aria-hidden>
          {prefix}
          {formatted}
          {suffix}
        </span>
      </span>
      <span className="text-sm text-fg-muted">{label}</span>
    </div>
  );
}
