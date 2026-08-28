import React from "react";
import { ViewType } from "../types";
import { TEAM_MEMBERS } from "../data";
import {
  Target,
  Zap,
  ShieldCheck,
  Users,
  Award,
  Cpu,
  MessageSquare,
  Boxes,
  Globe,
  Handshake,
  Layers,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import PageHero from "./ui/PageHero";
import SectionHeading from "./ui/SectionHeading";
import FeatureCard from "./ui/FeatureCard";
import CtaBand from "./ui/CtaBand";

interface AboutViewProps {
  setActiveView: (view: ViewType) => void;
}

const CORE_PRINCIPLES = [
  {
    icon: <Target className="h-5 w-5" />,
    title: "Build real things",
    description:
      "Solutions that work in the real world. No over-engineering, no complexity that exists to look impressive.",
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "AI first, always",
    description:
      "On any problem we ask whether AI or automation makes it better. It is the default question, not an upsell.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Clients are partners",
    description:
      "We work with clients over years, not per invoice. Their outcome is the thing we are measured on.",
  },
  {
    icon: <Boxes className="h-5 w-5" />,
    title: "Products over projects",
    description:
      "Alongside client work we build our own products, so the company grows on something other than hourly billing.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Speed with quality",
    description:
      "We move fast without cutting corners. Speed only counts if what lands is something you can keep.",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Clear communication",
    description:
      "Plain language with clients, with each other, and in our documentation. No jargon, no ambiguity about status.",
  },
];

const DIFFERENTIATORS = [
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "AI at the core",
    description:
      "Not a buzzword on a slide. Every system we design genuinely uses modern models and automation where they earn their place.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Speed to market",
    description:
      "Working software early, so you are reviewing a product rather than a progress report.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Global by default",
    description:
      "Our products and client systems run for businesses anywhere, not just in one market.",
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: "Agency and product company",
    description:
      "Both at once. That means steadier cash flow, less pressure to over-sell, and a longer horizon on every relationship.",
  },
  {
    icon: <Handshake className="h-5 w-5" />,
    title: "Real partnerships",
    description:
      "We do not take a one-off project and disappear. Most of our work comes from clients we already have.",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Structured systems",
    description:
      "Systems, not patchwork fixes. Everything is designed to stay clean, maintainable and possible to hand over.",
  },
];

export default function AboutView({ setActiveView }: AboutViewProps) {
  const founder = TEAM_MEMBERS.find((m) => m.name === "Mahad Mateen Butt");
  const advisor = TEAM_MEMBERS.find((m) => m.role === "Strategic Advisor");
  const team = TEAM_MEMBERS.filter(
    (m) => m.name !== "Mahad Mateen Butt" && m.role !== "Strategic Advisor"
  );

  return (
    <div>
      <PageHero
        eyebrow="About Promptly"
        title="A software company that ships its own products too"
        lead="Promptly builds AI-powered digital solutions for startups and businesses — and invests the same engineering into products of its own, so the company grows beyond hourly billing."
        primary={{ label: "Work With Us", onClick: () => setActiveView("contact") }}
        secondary={{ label: "See Our Work", onClick: () => setActiveView("portfolio") }}
        stats={[
          { value: "20+", label: "Engineers & specialists" },
          { value: "5y", label: "Years of delivery" },
          { value: "98%", label: "Client retention" },
          { value: "50+", label: "Products shipped" },
        ]}
      />

      {/* ── Principles ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we work"
            title="Our core principles"
            lead="These guide how every person at Promptly thinks, works and makes decisions — including the decision to tell a client no."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CORE_PRINCIPLES.map((p, i) => (
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

      {/* ── Differentiators ────────────────────────────────────────────── */}
      <section className="section section-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Promptly"
            title="What actually makes us different"
            lead="There are many agencies. These are the reasons clients and partners pick this one."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((d, i) => (
              <ScrollReveal key={d.title} animation="fade-up" staggerIndex={i}>
                <FeatureCard
                  icon={d.icon}
                  title={d.title}
                  description={d.description}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ─────────────────────────────────────────────────── */}
      {founder && (
        <section className="section">
          <div className="container-page">
            <SectionHeading eyebrow="Leadership" title="Founder & CEO" />

            <ScrollReveal animation="fade-up" className="mt-14">
              <div className="grid gap-px overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--border)] md:grid-cols-12">
                <div className="bg-[var(--bg-subtle)] p-8 md:col-span-4 md:p-10">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="aspect-square w-full max-w-[16rem] rounded-[var(--r-md)] border border-[var(--border)] object-cover"
                  />
                </div>

                <div className="bg-[var(--bg-panel)] p-8 md:col-span-8 md:p-10">
                  <h3 className="text-2xl font-bold tracking-tight text-[var(--text-heading)]">
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--accent)]">
                    {founder.role}
                  </p>
                  <p className="mono-label mt-1 uppercase">
                    Full Stack Developer &amp; AI Consultant
                  </p>

                  <p className="mt-5 text-sm leading-relaxed text-[var(--text-body)]">
                    {founder.bio}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {founder.specialties.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveView("consultation")}
                    className="btn btn-primary group mt-8 px-6"
                  >
                    Get in Touch
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── Team ───────────────────────────────────────────────────────── */}
      <section className="section section-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow="The team"
            title="Senior specialists, one delivery squad"
            lead="Architects, engineers and designers working in tight collaboration — not handoffs between siloed vendors."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <ScrollReveal key={member.id} animation="fade-up" staggerIndex={i}>
                <article className="surface-card flex h-full flex-col p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="h-14 w-14 shrink-0 rounded-[var(--r-md)] border border-[var(--border)] object-cover"
                    />
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold tracking-tight text-[var(--text-heading)]">
                        {member.name}
                      </h3>
                      <p className="truncate text-sm text-[var(--accent)]">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-[var(--text-body)]">
                    {member.bio}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {member.specialties.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {advisor && (
            <ScrollReveal animation="fade-up" className="mt-6">
              <article className="surface-card flex flex-col gap-6 p-7 sm:flex-row sm:items-center">
                <img
                  src={advisor.image}
                  alt={advisor.name}
                  loading="lazy"
                  className="h-20 w-20 shrink-0 rounded-[var(--r-md)] border border-[var(--border)] object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-semibold tracking-tight text-[var(--text-heading)]">
                      {advisor.name}
                    </h3>
                    <span className="chip chip-accent">
                      <ShieldCheck className="h-3 w-3" aria-hidden />
                      {advisor.role}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-body)]">
                    {advisor.bio}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {advisor.specialties.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          )}
        </div>
      </section>

      <CtaBand
        title="Ready to build something?"
        body="Tell us what you need. We will tell you what it takes, and whether we are the right team for it."
        primary={{ label: "Start Your Project", onClick: () => setActiveView("contact") }}
        secondary={{
          label: "Book a Consultation",
          onClick: () => setActiveView("consultation"),
        }}
      />
    </div>
  );
}
