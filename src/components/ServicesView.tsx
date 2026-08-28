import React, { useState } from "react";
import { ViewType } from "../types";
import { AGENCY_SERVICES } from "../data";
import {
  Cpu,
  Bot,
  Monitor,
  Smartphone,
  Check,
  ArrowRight,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import PageHero from "./ui/PageHero";
import SectionHeading from "./ui/SectionHeading";
import FeatureCard from "./ui/FeatureCard";
import CtaBand from "./ui/CtaBand";

interface ServicesViewProps {
  setActiveView: (view: ViewType) => void;
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "ai-powered-solutions": <Bot className="h-5 w-5" />,
  "software-development": <Monitor className="h-5 w-5" />,
  "digital-transformation": <Cpu className="h-5 w-5" />,
  "startup-support": <Smartphone className="h-5 w-5" />,
};

const SERVICE_ROUTES: Record<string, ViewType> = {
  "ai-powered-solutions": "ai-solutions",
  "software-development": "software-development",
  "digital-transformation": "digital-transformation",
  "startup-support": "startup-support",
};

const PRINCIPLES = [
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "Weekly deployable builds",
    description:
      "Every sprint ends in something you can open, click through and comment on — not a status document.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Credentials never leave the server",
    description:
      "Secrets stay in server-side environments, access is scoped per environment, and every deploy is auditable.",
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "Documented handover",
    description:
      "Clean, commented code and a full repository at every milestone, so you are never locked to one vendor.",
  },
];

/**
 * Services index.
 *
 * A tab strip selects one practice and the detail panel below swaps. The
 * previous version gave each tab its own gradient fill, border hue, ping dot
 * and blurred halo; selection is now a solid accent left rule plus a filled
 * icon tile, so which one is active is clearer with a quarter of the ink.
 */
export default function ServicesView({ setActiveView }: ServicesViewProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    "ai-powered-solutions"
  );

  const activeService =
    AGENCY_SERVICES.find((s) => s.id === selectedServiceId) ?? AGENCY_SERVICES[0];

  return (
    <div>
      <PageHero
        eyebrow="Services"
        title="Digital solutions for real business"
        lead="AI-powered systems, custom software, digital transformation and startup support — four practices delivered by one senior engineering team."
        primary={{ label: "Start a Project", onClick: () => setActiveView("contact") }}
        secondary={{
          label: "View Case Studies",
          onClick: () => setActiveView("portfolio"),
        }}
      />

      {/* ── Practice selector + detail ─────────────────────────────────── */}
      <section className="section">
        <div className="container-page">
          <div
            className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--border)] lg:grid-cols-4"
            id="services-selector-tabs"
          >
            {AGENCY_SERVICES.map((serv) => {
              const isSelected = serv.id === selectedServiceId;
              return (
                <button
                  key={serv.id}
                  type="button"
                  onClick={() => setSelectedServiceId(serv.id)}
                  aria-pressed={isSelected}
                  className={`relative flex flex-col items-start gap-4 p-6 text-left transition-colors ${
                    isSelected
                      ? "bg-[var(--bg-panel)]"
                      : "bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel-hover)]"
                  }`}
                >
                  {/* Selection is a solid 2px accent rule along the top. */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 transition-colors"
                    style={{
                      background: isSelected ? "var(--accent)" : "transparent",
                    }}
                  />
                  <span
                    className={`icon-tile ${
                      isSelected
                        ? ""
                        : "border-[var(--border)] bg-[var(--bg-inset)] text-[var(--text-micro)]"
                    }`}
                  >
                    {SERVICE_ICONS[serv.id]}
                  </span>
                  <span>
                    <span
                      className={`block text-sm font-semibold ${
                        isSelected
                          ? "text-[var(--text-heading)]"
                          : "text-[var(--text-body)]"
                      }`}
                    >
                      {serv.title}
                    </span>
                    <span className="mt-1 block text-xs text-[var(--text-micro)]">
                      {serv.badge}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            key={selectedServiceId}
            className="animate-fadeIn mt-6 grid gap-px overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--border)] lg:grid-cols-12"
          >
            <div className="bg-[var(--bg-panel)] p-8 lg:col-span-5 lg:p-10">
              <p className="mono-label uppercase">Service overview</p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--text-heading)] md:text-3xl">
                {activeService.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-body)]">
                {activeService.description}
              </p>

              {activeService.setupCost && (
                <dl className="mt-8 space-y-3 border-t border-[var(--border)] pt-6 text-sm">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-[var(--text-micro)]">Setup</dt>
                    <dd className="font-semibold text-[var(--text-heading)]">
                      {activeService.setupCost}
                    </dd>
                  </div>
                  {activeService.ongoingCost && (
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-[var(--text-micro)]">Ongoing</dt>
                      <dd className="font-semibold text-[var(--text-heading)]">
                        {activeService.ongoingCost}
                      </dd>
                    </div>
                  )}
                </dl>
              )}

              <button
                type="button"
                onClick={() =>
                  setActiveView(SERVICE_ROUTES[activeService.id] ?? "contact")
                }
                className="link-arrow mt-8"
              >
                Full {activeService.title} page
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>

            <div className="bg-[var(--bg-panel)] p-8 lg:col-span-7 lg:p-10">
              <p className="mono-label uppercase">What&apos;s included</p>

              <ul className="mt-5 space-y-3">
                {activeService.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-3 text-sm text-[var(--text-body)]"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                      aria-hidden
                    />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {activeService.caveats && activeService.caveats.length > 0 && (
                <div className="card-inset mt-8 p-5">
                  <p className="mono-label uppercase">Good to know</p>
                  <ul className="mt-3 space-y-2">
                    {activeService.caveats.map((c) => (
                      <li
                        key={c}
                        className="text-sm leading-relaxed text-[var(--text-body)]"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setActiveView("contact")}
                  className="btn btn-primary px-6"
                >
                  Start Your Project
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView("portfolio")}
                  className="btn btn-secondary px-6"
                >
                  View Case Studies
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Delivery principles ────────────────────────────────────────── */}
      <section className="section section-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we deliver"
            title="Three commitments on every engagement"
            lead="These hold whichever practice you engage. They are in the contract, not just on the site."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <ScrollReveal key={p.title} animation="fade-up" staggerIndex={i}>
                <FeatureCard
                  icon={p.icon}
                  title={p.title}
                  description={p.description}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which service you need?"
        body="Describe the problem and we will tell you which practice fits — or that you do not need us at all."
        primary={{ label: "Talk to an Engineer", onClick: () => setActiveView("contact") }}
        secondary={{
          label: "Book a Consultation",
          onClick: () => setActiveView("consultation"),
        }}
      />
    </div>
  );
}
