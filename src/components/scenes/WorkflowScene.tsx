import React from "react";
import { PROCESS_STEPS } from "../../data/landing";
import { ModuleId } from "../../theme/tokens";
import GlitchText from "../ui/GlitchText";
import PipelineTimeline, { PipelineStep } from "../ui/PipelineTimeline";
import ScrollReveal from "../ui/ScrollReveal";

/**
 * Maps the legacy accent names in PROCESS_STEPS onto the logo-derived
 * module palette. Kept here rather than rewritten in the data file so the
 * data stays presentation-agnostic.
 */
const ACCENT_TO_MODULE: Record<string, ModuleId> = {
  cyan: "ai",
  indigo: "dev",
  violet: "startup",
  emerald: "product",
  orange: "product",
};

/**
 * Scene 3 — Workflow.
 *
 * Deliberately NOT pinned: a pinned pipeline would hold the viewport while
 * the user reads, which fights the vertical reading motion the timeline
 * already implies. The scene title resolves out of a blur, then the nodes
 * cascade in and the rail's travelling glow loops.
 *
 * NOTE: seeded from the real PROCESS_STEPS, which currently holds three
 * stages. PipelineTimeline renders N nodes — extending to the full client
 * pipeline (Lead → Qualify → Proposal → Build → Launch → Support) is a
 * data-only change in src/data/landing.ts.
 */
export default function WorkflowScene() {
  const steps: PipelineStep[] = PROCESS_STEPS.map((s) => ({
    id: s.id,
    number: s.number,
    title: s.title,
    description: s.description,
    icon: s.icon,
    accent: ACCENT_TO_MODULE[s.accent] ?? "ai",
  }));

  return (
    // Rendered inside the existing "Why Promptly" section, which already owns
    // the border, horizontal padding and max-width — so this adds neither.
    <div id="scene-workflow" className="relative">
      <div className="mx-auto max-w-5xl">
        <header className="mb-14 text-center">
          <ScrollReveal animation="fade-up">
            <p className="eyebrow mb-4">How we work</p>
          </ScrollReveal>

          <GlitchText className="display-heading text-3xl sm:text-4xl lg:text-5xl">
            From prompt to{" "}
            <span className="italic" style={{ color: "var(--mod-product-text)" }}>
              production
            </span>
          </GlitchText>

          <ScrollReveal animation="fade-up" delay={120}>
            <p className="script-tagline mt-5">Every build, the same spine.</p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--text-body)]">
              We combine deep technical expertise with a product‑first mindset to
              deliver solutions that outperform expectations.
            </p>
          </ScrollReveal>
        </header>

        <PipelineTimeline steps={steps} />
      </div>
    </div>
  );
}
