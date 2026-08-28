import React from "react";
import { ArrowRight } from "lucide-react";

export interface CtaBandProps {
  title: string;
  body?: string;
  primary: { label: string; onClick: () => void };
  secondary?: { label: string; onClick: () => void };
}

/**
 * Closing call-to-action, used at the foot of every inner page.
 *
 * A dark full-bleed band — the same treatment as the homepage automation
 * section and the footer — so the page ends on a deliberate note instead of a
 * lone gradient pill button floating in whitespace.
 */
export default function CtaBand({
  title,
  body,
  primary,
  secondary,
}: CtaBandProps) {
  return (
    <section className="section-inverse py-16 md:py-20">
      <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
          {body && (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">
              {body}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={primary.onClick}
            className="btn btn-on-inverse group px-6 py-3.5"
          >
            {primary.label}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
          {secondary && (
            <button
              type="button"
              onClick={secondary.onClick}
              className="btn btn-outline-inverse px-6 py-3.5"
            >
              {secondary.label}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
