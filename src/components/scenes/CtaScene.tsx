import React from "react";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { ViewType } from "../../types";
import GlitchText from "../ui/GlitchText";
import GlowOrb from "../ui/GlowOrb";
import ScrollReveal from "../ui/ScrollReveal";

interface CtaSceneProps {
  setActiveView: (view: ViewType) => void;
}

/**
 * Scene 5 — the close.
 *
 * A CTA landing rather than a literal loop back to the hero orb. The hero orb
 * returns here as a visual bookend, so the "full circle" reading survives, but
 * the scroll ends on an action instead of a decorative rewind — this is a
 * services site and the last screen is the one that has to convert.
 */
export default function CtaScene({ setActiveView }: CtaSceneProps) {
  return (
    <section
      id="scene-cta"
      className="relative overflow-hidden border-t border-slate-200 dark:border-slate-800/40 px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      {/* The hero orb, returning — the bookend. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <GlowOrb color="ai" size={680} halo />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <ScrollReveal animation="fade-up">
          <span className="eyebrow inline-flex items-center gap-2">
            <Sparkles className="h-3 w-3" aria-hidden />
            Free consultation
          </span>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={80}>
          <p className="script-tagline mt-5">Pricing is just a number.</p>
        </ScrollReveal>

        <GlitchText className="display-heading mt-3 text-4xl sm:text-5xl lg:text-6xl">
          Let&apos;s build something{" "}
          <span className="italic" style={{ color: "var(--mod-ai-text)" }}>
            exceptional
          </span>
        </GlitchText>

        <ScrollReveal animation="fade-up" delay={160}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--text-body)]">
            Book a 30-minute architecture session with our principal team. No
            deck, no pitch — we&apos;ll map your problem and tell you what it
            actually takes to build.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={240}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              id="cta-scene-consultation"
              onClick={() => setActiveView("consultation")}
              className="btn-primary group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold"
            >
              <Calendar className="h-4 w-4" aria-hidden />
              Book a Consultation
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              id="cta-scene-contact"
              onClick={() => setActiveView("contact")}
              className="btn-secondary group inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold"
            >
              Send a project brief
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade" delay={320}>
          <p className="eyebrow mt-8">Typically replies within one business day</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
