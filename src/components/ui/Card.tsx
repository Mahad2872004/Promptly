import React, { useCallback } from "react";
import { cn } from "../../lib/cn";

/**
 * Writes the pointer position into --mx / --my on the element, which the
 * `.ds-card` glow reads. Touch and pen input are ignored (desktop only).
 */
export function usePointerGlow<T extends HTMLElement>() {
  return useCallback((event: React.PointerEvent<T>) => {
    if (event.pointerType !== "mouse") return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);
}

type CardTag = "div" | "article" | "li" | "section";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: CardTag;
  /** Pointer-follow border highlight. On by default. */
  glow?: boolean;
  /** Lift on hover — for cards that are links or open something. */
  interactive?: boolean;
  /** Feature panels use the larger 24px radius. */
  size?: "card" | "panel";
  padded?: boolean;
}

/** "Glass-ink" surface: hairline border, top highlight, layered shadow. */
export function Card({
  as: Tag = "div",
  glow = true,
  interactive = false,
  size = "card",
  padded = true,
  className,
  onPointerMove,
  children,
  ...rest
}: CardProps) {
  const track = usePointerGlow<HTMLElement>();
  return (
    <Tag
      data-glow={glow}
      data-interactive={interactive}
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        if (glow) track(e);
        onPointerMove?.(e);
      }}
      className={cn(
        "ds-card",
        size === "panel" && "rounded-panel",
        padded && (size === "panel" ? "p-8 md:p-10" : "p-6 md:p-7"),
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
