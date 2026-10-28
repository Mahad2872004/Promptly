import React from "react";
import { TechnicalCanvas } from "../DesignVisuals";
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

export default function IndustryPage({
  eyebrow,
  title,
  lead,
  strengths,
  solutions,
  cta,
  setActiveView,
}: IndustryPageProps) {
  return (
    <>
      <PageHero
        parent="Industries"
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        primary={{
          label: "Discuss your project",
          onClick: () => setActiveView("contact"),
        }}
      />
      <section className="shell section-pad">
        <p className="kicker">THE BUSINESS CONTEXT</p>
        <div className="industry-strengths">
          {strengths.map((s) => (
            <article className="service-editorial" key={s.title}>
              <div className="service-editorial-copy">
                {s.icon}
                <h2>{s.title}</h2>
                <p>{s.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="principle-band">
        <div className="shell section-pad service-capabilities">
          <p className="kicker">POSSIBLE SOLUTIONS / SCOPED TOGETHER</p>
          {solutions.map((s, i) => (
            <article className="service-editorial" key={s.title}>
              <div className="service-editorial-copy">
                <span className="row-number">0{i + 1}</span>
                <h2>{s.title}</h2>
                <div>
                  <p>{s.description}</p>
                  <ul>
                    {s.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <TechnicalCanvas
                kind={
                  i % 3 === 0
                    ? "software"
                    : i % 3 === 1
                      ? "automation"
                      : "architecture"
                }
              />
            </article>
          ))}
        </div>
      </section>
      <CtaBand
        title={cta.title}
        body={cta.body}
        primary={{
          label: "Discuss a project",
          onClick: () => setActiveView("contact"),
        }}
        secondary={{
          label: "Explore services",
          onClick: () => setActiveView("services"),
        }}
      />
    </>
  );
}
