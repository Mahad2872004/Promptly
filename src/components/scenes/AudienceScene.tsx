import React from "react";
import { ViewType } from "../../types";
import { AUDIENCE_TABS } from "../../data/audience";
import GlitchText from "../ui/GlitchText";
import IndustryTabs from "../ui/IndustryTabs";
import ScrollReveal from "../ui/ScrollReveal";
import GlowOrb from "../ui/GlowOrb";

interface AudienceSceneProps {
  setActiveView: (view: ViewType) => void;
}

/**
 * Scene 4 — Built for your world.
 *
 * Not pinned: the value here is the user poking at tabs, and pinning would
 * hold the viewport hostage while they do it.
 */
export default function AudienceScene({ setActiveView }: AudienceSceneProps) {
  return (
    <section
      id="scene-audience"
      className="relative overflow-hidden border-t border-slate-200 dark:border-slate-800/40 px-4 py-20 sm:px-6 md:py-28 lg:px-8"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
        <GlowOrb color="dev" size={560} halo />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <ScrollReveal animation="fade-up">
            <p className="eyebrow mb-4">Who we help</p>
          </ScrollReveal>

          <GlitchText className="display-heading text-3xl sm:text-4xl lg:text-5xl">
            Built for{" "}
            <span className="italic" style={{ color: "var(--mod-dev-text)" }}>
              your world
            </span>
          </GlitchText>

          <ScrollReveal animation="fade-up" delay={120}>
            <p className="script-tagline mt-5">Same craft, different rules.</p>
          </ScrollReveal>
        </header>

        <ScrollReveal animation="fade-up" delay={180}>
          <IndustryTabs
            tabs={AUDIENCE_TABS}
            onExplore={(tab) => tab.route && setActiveView(tab.route)}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
