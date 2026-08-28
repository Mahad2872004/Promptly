import React from "react";
import { ViewType } from "../../types";
import ScrollReveal from "./ScrollReveal";
import PageHero from "./PageHero";
import SectionHeading from "./SectionHeading";
import FeatureCard from "./FeatureCard";
import StatRow from "./StatRow";
import CtaBand from "./CtaBand";

export interface ServiceCapability {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

export interface ServiceDetailPageProps {
  eyebrow: string;
  title: string;
  lead: string;
  /** Four capability cards. */
  capabilities: ServiceCapability[];
  /** Delivery outline: what actually happens, in order. */
  engagement: { title: string; description: string }[];
  stats: { value: string; label: string }[];
  cta: { title: string; body: string; primaryLabel: string };
  setActiveView: (view: ViewType) => void;
}

/**
 * Shared layout for the four service pages.
 *
 * They were four near-identical files that had drifted apart on colour alone —
 * one indigo→violet, one emerald→teal, one orange→red, one cyan→indigo. Making
 * the layout a single component means a change to the pattern lands on all
 * four, and no page can quietly reintroduce its own palette.
 */
export default function ServiceDetailPage({
  eyebrow,
  title,
  lead,
  capabilities,
  engagement,
  stats,
  cta,
  setActiveView,
}: ServiceDetailPageProps) {
  return (
    <div>
      <PageHero
        parent="Services"
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        primary={{ label: cta.primaryLabel, onClick: () => setActiveView("contact") }}
        secondary={{
          label: "All Services",
          onClick: () => setActiveView("services"),
        }}
      />

      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Capabilities"
            title="What this practice covers"
            lead="Each capability is scoped and estimated independently, so you can start with one and add the rest later."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {capabilities.map((c, i) => (
              <ScrollReveal key={c.title} animation="fade-up" staggerIndex={i}>
                <FeatureCard
                  icon={c.icon}
                  title={c.title}
                  description={c.description}
                  features={c.features}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow="Engagement"
            title="How the work runs"
            lead="No open-ended retainers by default. Each phase has a deliverable you can review before the next one starts."
          />

          <ol className="mt-14 grid gap-px overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--border)] md:grid-cols-3">
            {engagement.map((step, i) => (
              <li key={step.title} className="bg-[var(--bg-panel)] p-8">
                <span className="mono-label">
                  PHASE {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-[var(--text-heading)]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-body)]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>

          <StatRow stats={stats} className="mt-6" />
        </div>
      </section>

      <CtaBand
        title={cta.title}
        body={cta.body}
        primary={{ label: cta.primaryLabel, onClick: () => setActiveView("contact") }}
        secondary={{
          label: "Book a Consultation",
          onClick: () => setActiveView("consultation"),
        }}
      />
    </div>
  );
}
