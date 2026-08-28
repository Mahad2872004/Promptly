import React from "react";
import { ViewType } from "../types";
import {
  AGENCY_SERVICES,
  CASE_STUDIES,
  CLIENT_TESTIMONIALS,
  TEAM_MEMBERS,
} from "../data";
import {
  CLIENT_LOGOS,
  AGENCY_STATS,
  PROCESS_STEPS,
  PARTNERS,
  TECH_STACK,
  INDUSTRIES,
} from "../data/landing";
import ScrollReveal from "./ui/ScrollReveal";
import AnimatedCounter from "./ui/AnimatedCounter";
import HeroPanel from "./ui/HeroPanel";
import SectionHeading from "./ui/SectionHeading";
import {
  Bot,
  Monitor,
  Cpu,
  Smartphone,
  ArrowRight,
  ArrowUpRight,
  Check,
  Quote,
  Star,
  ShieldCheck,
  Clock,
  Headphones,
  Award,
} from "lucide-react";

interface HomeViewProps {
  setActiveView: (view: ViewType) => void;
  setUserDraftPrompt: (prompt: string) => void;
}

/** Service id → icon. One icon set, one colour — the tile supplies the accent. */
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "ai-powered-solutions": <Bot className="h-5 w-5" />,
  "software-development": <Monitor className="h-5 w-5" />,
  "digital-transformation": <Cpu className="h-5 w-5" />,
  "startup-support": <Smartphone className="h-5 w-5" />,
};

/** Service id → its dedicated route. */
const SERVICE_ROUTES: Record<string, ViewType> = {
  "ai-powered-solutions": "ai-solutions",
  "software-development": "software-development",
  "digital-transformation": "digital-transformation",
  "startup-support": "startup-support",
};

const INDUSTRY_ROUTES: Record<string, ViewType> = {
  startups: "startups",
  ecommerce: "ecommerce",
  realestate: "realestate",
  enterprise: "enterprise",
};

const ASSURANCES = [
  { icon: ShieldCheck, stat: "100%", label: "Security compliant" },
  { icon: Clock, stat: "< 8 wks", label: "Average delivery" },
  { icon: Headphones, stat: "24/7", label: "Support available" },
  { icon: Award, stat: "4.9 / 5", label: "Client rating" },
];

const TECH_CATEGORY_LABELS: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend & Data",
  ai: "AI & Machine Learning",
  devops: "Cloud & DevOps",
};

export default function HomeView({ setActiveView }: HomeViewProps) {
  const featuredProjects = CASE_STUDIES.filter((p) => p.featured).slice(0, 3);
  const teamMembers = TEAM_MEMBERS.filter((m) => m.role !== "Strategic Advisor");
  const advisor = TEAM_MEMBERS.find((m) => m.role === "Strategic Advisor");

  return (
    <div>
      {/* ═══ HERO ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="container-page grid items-center gap-14 py-16 md:py-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <ScrollReveal animation="fade-up">
              <p className="eyebrow">Software Engineering Company</p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={60}>
              <h1 className="display-heading mt-5 text-[2.5rem] sm:text-5xl lg:text-[3.5rem]">
                We build the software that runs your business
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={120}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-body)]">
                Promptly designs, engineers and maintains AI-powered platforms,
                custom business applications and internal systems — from
                discovery through to production support.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={180}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  id="hero-cta-contact"
                  onClick={() => setActiveView("contact")}
                  className="btn btn-primary group px-6 py-3.5"
                >
                  Start a Project
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
                <button
                  type="button"
                  id="hero-cta-portfolio"
                  onClick={() => setActiveView("portfolio")}
                  className="btn btn-secondary px-6 py-3.5"
                >
                  View Our Work
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={240}>
              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-[var(--border)] pt-8">
                {AGENCY_STATS.slice(0, 3).map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                        className="text-2xl font-bold tracking-tight text-[var(--text-heading)]"
                      />
                      <p className="mt-1 text-xs leading-snug text-[var(--text-micro)]">
                        {stat.label}
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fade-up" delay={140} className="lg:col-span-6">
            <HeroPanel />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CLIENT LOGOS ══════════════════════════════════════════════ */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-subtle)] py-10">
        <div className="container-page">
          <p className="mono-label text-center uppercase tracking-[0.18em]">
            Trusted by teams across 6 industries
          </p>
          <div className="relative mt-6 overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-14">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
                <span
                  key={`${logo.name}-${i}`}
                  className="whitespace-nowrap text-base font-semibold tracking-tight text-[var(--text-micro)]"
                >
                  {logo.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ══════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we do"
            title="Engineering services, end to end"
            lead="Four practices, one delivery team. Every engagement is scoped, estimated and shipped by the same senior engineers who run it in production."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {AGENCY_SERVICES.map((service, i) => (
              <ScrollReveal key={service.id} animation="fade-up" staggerIndex={i}>
                <article className="surface-card card-interactive flex h-full flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="icon-tile">{SERVICE_ICONS[service.id]}</span>
                    <span className="chip">{service.badge}</span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--text-heading)]">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-body)]">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-[var(--border)] pt-5">
                    {service.details.slice(0, 4).map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2.5 text-sm text-[var(--text-body)]"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                          aria-hidden
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveView(SERVICE_ROUTES[service.id] ?? "services")
                    }
                    className="link-arrow mt-6 self-start"
                  >
                    Explore {service.title}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AUTOMATION VALUE BAND (inverse) ═══════════════════════════ */}
      <section className="section-inverse py-20 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow" style={{ color: "var(--brand-400)" }}>
              Automation
            </p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              We remove the repetitive work your team does every day
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60">
              Manual data entry, copy-paste reporting, chasing approvals across
              inboxes. We map those processes, automate them, and hand you the
              system that runs them.
            </p>
            <button
              type="button"
              onClick={() => setActiveView("contact")}
              className="btn btn-on-inverse group mt-8 px-6 py-3.5"
            >
              Start Automating
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
            {[
              {
                title: "Reduce cost",
                body: "Cut overhead by eliminating manual, repetitive operations work.",
              },
              {
                title: "Save time",
                body: "Reclaim hours every day with intelligent, monitored automation.",
              },
              {
                title: "Focus on growth",
                body: "Let the team do the work that actually moves the business.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} animation="fade-up" staggerIndex={i}>
                <div className="card-inverse h-full p-6">
                  <span className="mono-label text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {item.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTS ══════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our products"
            title="Software we own and operate"
            lead="Alongside client work we build and run our own products — the same engineering standard, held to our own uptime."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <ScrollReveal animation="fade-up" className="lg:col-span-2">
              <article className="surface-card flex h-full flex-col p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="icon-tile">
                      <Smartphone className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-[var(--text-heading)]">
                        xSender
                      </h3>
                      <p className="text-sm text-[var(--text-micro)]">
                        WhatsApp order management platform
                      </p>
                    </div>
                  </div>
                  <span className="chip chip-accent">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-current"
                      aria-hidden
                    />
                    Live
                  </span>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-[var(--text-body)]">
                  Turns unstructured WhatsApp conversations into a real ordering
                  system: a product catalogue customers can browse, one-click
                  order capture, and a dashboard the business actually runs on.
                </p>

                <div className="mt-6 grid gap-x-6 gap-y-2.5 border-t border-[var(--border)] pt-6 sm:grid-cols-2">
                  {[
                    "Product catalogue system",
                    "One-click WhatsApp ordering",
                    "Order management dashboard",
                    "Mobile-first storefront",
                  ].map((f) => (
                    <p
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-[var(--text-body)]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                        aria-hidden
                      />
                      {f}
                    </p>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveView("xsender")}
                    className="btn btn-primary px-5"
                  >
                    View xSender
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveView("products")}
                    className="btn btn-secondary px-5"
                  >
                    All Products
                  </button>
                </div>
              </article>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={80}>
              <div className="card-inset flex h-full flex-col justify-center p-8">
                <span className="mono-label uppercase">In development</span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--text-heading)]">
                  More products shipping soon
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-body)]">
                  Two internal tools are being productised for external release.
                  Join the newsletter to hear first.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══════════════════════════════════════════════════ */}
      <section className="section section-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we work"
            title="A delivery process you can plan around"
            lead="Fixed-scope sprints, a demo at the end of each one, and a git repository handed over at every milestone."
          />

          <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--border)] md:grid-cols-3">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <ScrollReveal
                  key={step.id}
                  animation="fade-up"
                  staggerIndex={i}
                  className="h-full"
                >
                  <div className="flex h-full flex-col bg-[var(--bg-panel)] p-8">
                    <div className="flex items-center gap-4">
                      <span className="icon-tile icon-tile-sm">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="mono-label">STEP {step.number}</span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--text-heading)]">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-body)]">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Assurances — a plain metric row, not four glowing cards. */}
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--border)] md:grid-cols-4">
            {ASSURANCES.map(({ icon: Icon, stat, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 bg-[var(--bg-panel)] p-6"
              >
                <Icon
                  className="h-5 w-5 shrink-0 text-[var(--accent)]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <div>
                  <p className="text-lg font-bold tracking-tight text-[var(--text-heading)]">
                    {stat}
                  </p>
                  <p className="text-xs text-[var(--text-micro)]">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SELECTED WORK ═════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects with measurable outcomes"
            lead="A sample of recent engagements. Full case studies include architecture, timelines and the numbers after launch."
            action={{ label: "All case studies", onClick: () => setActiveView("portfolio") }}
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((proj, i) => (
              <ScrollReveal key={proj.id} animation="fade-up" staggerIndex={i}>
                <article
                  className="surface-card card-interactive flex h-full cursor-pointer flex-col p-7"
                  onClick={() => setActiveView("portfolio")}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="mono-label uppercase">{proj.clientName}</span>
                    <span className="chip">{proj.category}</span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-[var(--text-heading)]">
                    {proj.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-body)]">
                    {proj.tagline}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {proj.metrics.slice(0, 2).map((met) => (
                      <li
                        key={met}
                        className="flex items-start gap-2.5 text-sm font-medium text-[var(--text-heading)]"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                          aria-hidden
                        />
                        {met}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-1.5 border-t border-[var(--border)] pt-5">
                    {proj.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="chip font-mono">
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 3 && (
                      <span className="chip font-mono">
                        +{proj.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRIES ════════════════════════════════════════════════ */}
      <section className="section section-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow="Who we help"
            title="Same engineering, different rules"
            lead="Each sector brings its own constraints — compliance, margins, integrations. We build to them rather than around them."
          />

          <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry) => {
              const route = INDUSTRY_ROUTES[industry.id];
              const Tag = route ? "button" : "div";
              return (
                <Tag
                  key={industry.id}
                  {...(route
                    ? {
                        type: "button" as const,
                        onClick: () => setActiveView(route),
                      }
                    : {})}
                  className={`group flex flex-col bg-[var(--bg-panel)] p-7 text-left transition-colors ${
                    route ? "hover:bg-[var(--bg-panel-hover)]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold tracking-tight text-[var(--text-heading)]">
                      {industry.name}
                    </h3>
                    {route && (
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--text-micro)] transition-colors group-hover:text-[var(--accent)]" />
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-[var(--text-body)]">
                    {industry.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {industry.services.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK ════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Technology"
            title="A stack chosen for the next five years"
            lead="Mainstream, well-supported technology with large talent pools — so the system stays maintainable long after we hand it over."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {Object.entries(TECH_STACK).map(([category, technologies], i) => (
              <ScrollReveal key={category} animation="fade-up" staggerIndex={i}>
                <div className="surface-card h-full p-7">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-micro)]">
                    {TECH_CATEGORY_LABELS[category] ?? category}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {technologies.map((tech) => {
                      const Icon = tech.icon;
                      return (
                        <span
                          key={tech.name}
                          className="inline-flex items-center gap-2 rounded-[var(--r-sm)] border border-[var(--border)] bg-[var(--bg-inset)] px-2.5 py-1.5 text-[0.8125rem] font-medium text-[var(--text-body)]"
                        >
                          {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden />}
                          {tech.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 border-t border-[var(--border)] pt-8">
            <p className="mono-label uppercase tracking-[0.16em]">
              Platform partners
            </p>
            <div className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
              {PARTNERS.map((partner) => (
                <span
                  key={partner.name}
                  className="text-sm font-semibold text-[var(--text-micro)]"
                >
                  {partner.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAND ════════════════════════════════════════════════ */}
      <section className="section-inverse py-16">
        <div className="container-page grid grid-cols-2 gap-10 md:grid-cols-4">
          {AGENCY_STATS.map((stat) => (
            <div key={stat.label}>
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              />
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-white/45">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ══════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Client feedback"
            title="What teams say after launch"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CLIENT_TESTIMONIALS.slice(0, 3).map((t, i) => (
              <ScrollReveal key={t.id} animation="fade-up" staggerIndex={i}>
                <figure className="surface-card flex h-full flex-col p-7">
                  <Quote
                    className="h-6 w-6 text-[var(--accent)] opacity-40"
                    aria-hidden
                  />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-body)]">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-inset)] text-xs font-bold text-[var(--text-heading)]">
                      {t.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[var(--text-heading)]">
                        {t.author}
                      </p>
                      <p className="truncate text-xs text-[var(--text-micro)]">
                        {t.role}, {t.company}
                        {t.country ? ` · ${t.country}` : ""}
                      </p>
                    </div>
                    <span
                      className="ml-auto flex shrink-0 items-center gap-1 text-xs font-semibold text-[var(--text-heading)]"
                      aria-label={`Rated ${t.rating} out of 5`}
                    >
                      <Star
                        className="h-3.5 w-3.5 fill-current text-[var(--accent)]"
                        aria-hidden
                      />
                      {t.rating}.0
                    </span>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM ══════════════════════════════════════════════════════ */}
      <section className="section section-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow="The team"
            title="Senior specialists, one delivery squad"
            lead="Architects, engineers and designers working together — not handoffs between siloed vendors."
            action={{ label: "About Promptly", onClick: () => setActiveView("about") }}
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, i) => (
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
                    {member.specialties.slice(0, 4).map((s) => (
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
                    <span className="chip chip-accent">{advisor.role}</span>
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

      {/* ═══ CLOSING CTA ═══════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-page">
          <div className="surface-card flex flex-col items-start justify-between gap-8 p-10 md:flex-row md:items-center md:p-12">
            <div>
              <h2 className="section-title max-w-2xl">
                Tell us what you need built
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-body)]">
                A 30-minute technical session, no deck and no pitch. We scope the
                problem and tell you honestly what it takes to build. Typically a
                reply within one business day.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <button
                type="button"
                id="cta-consultation"
                onClick={() => setActiveView("consultation")}
                className="btn btn-primary group px-6 py-3.5"
              >
                Book a Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
              <button
                type="button"
                id="cta-contact"
                onClick={() => setActiveView("contact")}
                className="btn btn-secondary px-6 py-3.5"
              >
                Send a Brief
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
