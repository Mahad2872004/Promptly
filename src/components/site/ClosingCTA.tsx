import React from "react";
import { CalendarDays } from "lucide-react";
import { Button, Eyebrow, GlowOrb, GridBackground, Reveal } from "../ui";
import { cn } from "../../lib/cn";
import { BOOKING_URL } from "../../content/navigation";

export interface ClosingCTAProps {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Primary action; defaults to "Start a project" → /contact. */
  primary?: { label: string; to: string };
  /**
   * Visual per page family:
   * - `signature`: animated gradient border (home only)
   * - `teal`: grid + teal glow (services, process, about)
   * - `spark`: warm orange glow (products)
   */
  tone?: "signature" | "teal" | "spark";
}

/** The page-closing call to action. One per page, different per page family. */
export function ClosingCTA({
  eyebrow = "Start a project",
  title,
  lead,
  primary = { label: "Start a project", to: "/contact" },
  tone = "teal",
}: ClosingCTAProps) {
  return (
    <section className="section-y">
      <div className="wrap-wide">
        <Reveal
          className={cn(
            "relative isolate overflow-hidden rounded-panel border border-border bg-bg-raised px-6 py-16 shadow-elev-2 sm:px-12 md:py-24",
            tone === "signature" && "ds-gradient-border overflow-visible border-transparent",
          )}
        >
          {tone !== "signature" && <GridBackground fade="radial" size={48} />}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
            {tone === "spark" ? (
              <>
                <GlowOrb color="orange" size={520} className="-right-40 -bottom-56 [--orb-strength:0.18]" />
                <GlowOrb color="amber" size={360} className="-bottom-40 left-1/4 [--orb-strength:0.12]" />
              </>
            ) : (
              <GlowOrb color="teal" size={620} className="-top-72 left-1/2 -translate-x-1/2" />
            )}
          </div>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Eyebrow marker={tone === "spark" ? "dash" : "dot"}>{eyebrow}</Eyebrow>
            <h2 className="mt-6 text-h2 text-fg">{title}</h2>
            {lead && <p className="mt-6 max-w-xl text-lead text-fg-muted">{lead}</p>}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button to={primary.to} size="lg" iconRight signature={tone === "signature"}>
                {primary.label}
              </Button>
              <Button href={BOOKING_URL} size="lg" variant="secondary" iconLeft={<CalendarDays size={17} />}>
                Book a 30-min call
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
