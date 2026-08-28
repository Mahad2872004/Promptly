import React from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export interface SectionHeadingProps {
  /** Short uppercase orienting label. Rendered with the brand rule. */
  eyebrow: string;
  title: React.ReactNode;
  /** One or two sentences under the title. Optional. */
  lead?: string;
  /** Right-aligned secondary link on desktop, stacked underneath on mobile. */
  action?: { label: string; onClick: () => void };
  /** Centres the block. Default is left-aligned — the software-site default. */
  centered?: boolean;
  className?: string;
}

/**
 * The single section-header pattern used across the site.
 *
 * Replaces the previous per-section combination of a pulsing coloured pill,
 * a handwritten script tagline and a two-tone gradient headline. One eyebrow,
 * one solid heading, one optional lead — and the accent appears exactly once,
 * on the eyebrow rule.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
        centered ? "md:flex-col md:items-center" : ""
      } ${className}`}
    >
      <div className={centered ? "text-center" : "max-w-2xl"}>
        <ScrollReveal animation="fade-up">
          <p className={`eyebrow ${centered ? "eyebrow-center" : ""}`}>{eyebrow}</p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={60}>
          <h2 className="section-title mt-4">{title}</h2>
        </ScrollReveal>

        {lead && (
          <ScrollReveal animation="fade-up" delay={120}>
            <p
              className={`section-lead mt-4 ${centered ? "mx-auto max-w-2xl" : ""}`}
            >
              {lead}
            </p>
          </ScrollReveal>
        )}
      </div>

      {action && (
        <ScrollReveal animation="fade-up" delay={160}>
          <button type="button" onClick={action.onClick} className="link-arrow">
            {action.label}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </button>
        </ScrollReveal>
      )}
    </div>
  );
}
