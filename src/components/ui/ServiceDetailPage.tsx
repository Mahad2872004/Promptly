import React from "react";
import { TechnicalCanvas } from "../DesignVisuals";
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

export default function ServiceDetailPage({
  eyebrow,
  title,
  lead,
  capabilities,
  engagement,
  cta,
  setActiveView,
}: ServiceDetailPageProps) {
  return (
    <>
      <PageHero
        parent="Services"
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        primary={{
          label: "Discuss a project",
          onClick: () => setActiveView("contact"),
        }}
        secondary={{
          label: "All services",
          onClick: () => setActiveView("services"),
        }}
      />
      <section className="shell section-pad service-capabilities">
        <p className="kicker">CAPABILITIES / SHAPED AROUND YOUR NEEDS</p>
        {capabilities.map((c, i) => (
          <article className="service-editorial" key={c.title}>
            <div className="service-editorial-copy">
              <span className="row-number">0{i + 1}</span>
              <div>
                <span className="service-icon">{c.icon}</span>
                <h2>{c.title}</h2>
              </div>
              <div>
                <p>{c.description}</p>
                <ul>
                  {c.features.map((f) => (
                    <li key={f}>{f}</li>
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
      </section>
      <section className="principle-band">
        <div className="shell section-pad">
          <p className="kicker">FROM DEFINITION TO DELIVERY</p>
          <h2 className="detail-heading">A clear path through the work.</h2>
          <ol className="delivery-steps">
            {engagement.map((s, i) => (
              <li key={s.title}>
                <span>0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </li>
            ))}
          </ol>
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
          label: "Explore our work",
          onClick: () => setActiveView("portfolio"),
        }}
      />
    </>
  );
}
