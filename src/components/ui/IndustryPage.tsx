import React from "react";
import { Check } from "lucide-react";
import { ViewType } from "../../types";
import ScrollReveal from "./ScrollReveal";
import PageHero from "./PageHero";
import SectionHeading from "./SectionHeading";
import FeatureCard from "./FeatureCard";
import StatRow from "./StatRow";
import CtaBand from "./CtaBand";

export interface IndustryPageProps {
  eyebrow: string;
  title: string;
  lead: string;
  /** Three headline reasons this sector engages us. */
  strengths: { icon: React.ReactNode; title: string; description: string }[];
  /** Four concrete offerings, each with a technology chip list. */
  solutions: { title: string; description: string; tags: string[] }[];
  stats: { value: string; label: string }[];
  caseStudy: {
    title: string;
    challenge: string;
    solution: string;
    results: string[];
    /** Two or three headline figures shown beside the narrative. */
    figures: { value: string; label: string; note: string }[];
  };
  cta: { title: string; body: string; primaryLabel: string };
  setActiveView: (view: ViewType) => void;
}

/**
 * Shared layout for the four industry pages.
 *
 * Previously four copies of one file that differed only in accent — pink for
 * e-commerce, blue for enterprise, teal for real estate, orange for startups.
 * The layout is now one component and the accent is the site accent, so the
 * pages read as chapters of one site rather than four separate microsites.
 */
export default function IndustryPage({
  eyebrow,
  title,
  lead,
  strengths,
  solutions,
  stats,
  caseStudy,
  cta,
  setActiveView,
}: IndustryPageProps) {
  return (
    <div>
      <PageHero
        parent="Industries"
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        primary={{ label: cta.primaryLabel, onClick: () => setActiveView("contact") }}
        secondary={{
          label: "See Our Work",
          onClick: () => setActiveView("portfolio"),
        }}
      />

      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why teams here work with us"
            title={`What ${eyebrow.toLowerCase()} teams come to us for`}
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {strengths.map((s, i) => (
              <ScrollReveal key={s.title} animation="fade-up" staggerIndex={i}>
                <FeatureCard
                  icon={s.icon}
                  title={s.title}
                  description={s.description}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow="Solutions"
            title="What we build for this sector"
            lead="Each of these has shipped before. The technology below is what we would reach for again."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {solutions.map((s, i) => (
              <ScrollReveal key={s.title} animation="fade-up" staggerIndex={i}>
                <FeatureCard
                  title={s.title}
                  description={s.description}
                  tags={s.tags}
                />
              </ScrollReveal>
            ))}
          </div>

          <StatRow stats={stats} className="mt-6" />
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Case study" title={caseStudy.title} />

          <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--border)] lg:grid-cols-12">
            <div className="space-y-8 bg-[var(--bg-panel)] p-8 lg:col-span-7 lg:p-10">
              <div>
                <p className="mono-label uppercase">Challenge</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-body)]">
                  {caseStudy.challenge}
                </p>
              </div>

              <div>
                <p className="mono-label uppercase">Solution</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-body)]">
                  {caseStudy.solution}
                </p>
              </div>

              <div>
                <p className="mono-label uppercase">Results</p>
                <ul className="mt-3 space-y-2">
                  {caseStudy.results.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-2.5 text-sm text-[var(--text-body)]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                        aria-hidden
                      />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-6 bg-[var(--bg-subtle)] p-8 lg:col-span-5 lg:p-10">
              {caseStudy.figures.map((f) => (
                <div
                  key={f.label}
                  className="border-b border-[var(--border)] pb-6 last:border-0 last:pb-0"
                >
                  <p className="mono-label uppercase">{f.label}</p>
                  <p className="mt-1.5 text-3xl font-bold tracking-tight text-[var(--text-heading)]">
                    {f.value}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-micro)]">{f.note}</p>
                </div>
              ))}
            </div>
          </div>
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
