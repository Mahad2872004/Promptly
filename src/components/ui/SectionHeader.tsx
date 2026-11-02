import React from "react";
import { cn } from "../../lib/cn";
import { Eyebrow, type EyebrowProps } from "./Eyebrow";
import { Reveal } from "./Reveal";

export interface SectionHeaderProps {
  eyebrow?: React.ReactNode;
  index?: string;
  marker?: EyebrowProps["marker"];
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Optional link/button, placed right on `split`, below otherwise. */
  action?: React.ReactNode;
  /** `split` puts title left and lead/action right on large screens. */
  align?: "left" | "center" | "split";
  /** Heading level. Pages own exactly one h1 — usually in their hero. */
  level?: 1 | 2;
  id?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  index,
  marker,
  title,
  lead,
  action,
  align = "left",
  level = 2,
  id,
  className,
}: SectionHeaderProps) {
  const Heading = level === 1 ? "h1" : "h2";
  const heading = (
    <>
      {eyebrow && (
        <Eyebrow index={index} marker={marker} className="mb-5">
          {eyebrow}
        </Eyebrow>
      )}
      <Heading
        id={id}
        className={cn("text-fg", level === 1 ? "text-h1" : "text-h2")}
      >
        {title}
      </Heading>
    </>
  );
  const body = (lead || action) && (
    <>
      {lead && <p className="text-lead text-fg-muted">{lead}</p>}
      {action && <div className={cn(lead && "mt-8")}>{action}</div>}
    </>
  );

  if (align === "split") {
    return (
      <Reveal
        className={cn(
          "grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12",
          className,
        )}
      >
        <div className="lg:col-span-7">{heading}</div>
        {body && <div className="max-w-xl lg:col-span-5 lg:pb-2">{body}</div>}
      </Reveal>
    );
  }

  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto flex flex-col items-center text-center",
        className,
      )}
    >
      {heading}
      {body && <div className="mt-6 max-w-2xl">{body}</div>}
    </Reveal>
  );
}
