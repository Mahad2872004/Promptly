import React from "react";
import { cn } from "../../lib/cn";

export interface EyebrowProps {
  children: React.ReactNode;
  /** Section number, rendered as "01 — Label". */
  index?: string;
  /** Leading mark: teal dot (default), orange dash, or none. */
  marker?: "dot" | "dash" | "none";
  as?: "p" | "span" | "div";
  className?: string;
}

/** 12px mono label above headings. Teal-ink on light, teal on dark. */
export function Eyebrow({
  children,
  index,
  marker = "dot",
  as: Tag = "p",
  className,
}: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-eyebrow uppercase text-accent-text",
        className,
      )}
    >
      {marker === "dot" && !index && (
        <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
      )}
      {marker === "dash" && !index && (
        <span aria-hidden className="h-0.5 w-2.5 shrink-0 rounded-full bg-spark" />
      )}
      {index && (
        <span className="text-fg-subtle">
          {index} <span aria-hidden>—</span>
        </span>
      )}
      <span>{children}</span>
    </Tag>
  );
}
