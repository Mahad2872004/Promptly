import React from "react";
import { Lock } from "lucide-react";
import { cn } from "../../lib/cn";

export interface DeviceFrameProps {
  device?: "browser" | "laptop" | "phone";
  /** Address-bar text for the browser frame. */
  url?: string;
  children: React.ReactNode;
  className?: string;
  /** Classes for the screen area (e.g. aspect ratio, background). */
  screenClassName?: string;
  /** Accessible description of what the mockup shows. */
  label?: string;
}

/**
 * Theme-aware device mockups for live React/SVG compositions. The bezels stay
 * ink in both themes; the screen inherits the page tokens.
 */
export function DeviceFrame({
  device = "browser",
  url = "app.promptly.pk",
  children,
  className,
  screenClassName,
  label,
}: DeviceFrameProps) {
  const a11y = label ? { role: "img" as const, "aria-label": label } : {};

  if (device === "phone") {
    return (
      <div className={cn("ds-frame-phone w-full max-w-[300px]", className)} {...a11y}>
        <div className={cn("ds-frame-phone-screen", screenClassName)}>
          <span aria-hidden className="ds-frame-phone-island" />
          {children}
        </div>
      </div>
    );
  }

  if (device === "laptop") {
    return (
      <div className={cn("w-full px-[6%]", className)} {...a11y}>
        <div className="ds-frame-laptop-screen">
          <div
            className={cn(
              "aspect-[16/10] overflow-hidden rounded-[6px] bg-bg",
              screenClassName,
            )}
          >
            {children}
          </div>
        </div>
        <div aria-hidden className="ds-frame-laptop-base" />
      </div>
    );
  }

  return (
    <div className={cn("ds-frame-browser w-full", className)} {...a11y}>
      <div
        aria-hidden
        className="flex h-11 items-center gap-3 border-b border-border bg-bg-sunken/60 px-4"
      >
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-border-strong" />
          ))}
        </span>
        <span className="mx-auto flex h-6 min-w-0 max-w-[60%] flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-bg-raised px-3 font-mono text-[0.6875rem] text-fg-subtle">
          <Lock size={10} className="shrink-0" />
          <span className="truncate">{url}</span>
        </span>
        <span className="w-[42px]" />
      </div>
      <div className={cn("bg-bg", screenClassName)}>{children}</div>
    </div>
  );
}
