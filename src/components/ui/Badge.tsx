import React from "react";
import { cn } from "../../lib/cn";

export type BadgeVariant = "neutral" | "teal" | "live";

const variants: Record<BadgeVariant, string> = {
  neutral: "border border-border bg-bg-sunken text-fg-muted",
  teal: "border border-accent/25 bg-accent-tint text-accent-text",
  // Orange fill with ink text — 5.9:1. The one place orange is a background.
  live: "bg-spark text-spark-fg",
};

export interface BadgeProps {
  variant?: BadgeVariant;
  /** Leading status dot. Always pulses on `live`. */
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "neutral", dot, children, className }: BadgeProps) {
  const showDot = dot ?? variant === "live";
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 font-mono text-[0.6875rem] font-medium tracking-[0.06em] uppercase",
        variants[variant],
        className,
      )}
    >
      {showDot && (
        <span
          aria-hidden
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            variant === "live" ? "ds-pulse bg-spark-fg" : "bg-current",
          )}
        />
      )}
      {children}
    </span>
  );
}
