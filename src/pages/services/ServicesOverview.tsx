import React from "react";
import { Check, Compass } from "lucide-react";
import {
  Accordion,
  Button,
  Card,
  Eyebrow,
  GlowOrb,
  GridBackground,
  LineReveal,
  Reveal,
  Rise,
  SectionHeader,
  Stagger,
  StaggerItem,
} from "../../components/ui";
import { ClosingCTA } from "../../components/site/ClosingCTA";
import { ServicePreview } from "../../components/site/ServicePreview";
import { allServices, engagementModels } from "../../content/services";
import { faqs } from "../../content/faq";
import { cn } from "../../lib/cn";
import { ServiceMap } from "./ServiceMap";

export default function ServicesOverview() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <GridBackground fade="radial" noise />
        <GlowOrb color="teal" size={760} className="-top-40 right-[-10%]" />
        <div className="wrap-wide grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <Rise>
              <Eyebrow>Our expertise</Eyebrow>
            </Rise>
            <h1 className="mt-6 text-h1 text-fg">
              <LineReveal lines={["The right technology.", "For the real problem."]} />
            </h1>
            <Rise delay={0.3}>
              <p className="mt-6 max-w-xl text-lead text-fg-muted">
                Engineering, automation, and technical direction — connected around what your business needs to
                accomplish.
              </p>
            </Rise>
            <Rise delay={0.4} className="mt-10 flex flex-wrap gap-3">
              <Button to="/contact" size="lg" iconRight data-hero-cta>
                Start a project
              </Button>
              <Button href="#models" size="lg" variant="secondary">
                Ways to work together
              </Button>
            </Rise>
          </div>
          <Rise delay={0.3}>
            <ServiceMap />
          </Rise>
        </div>
      </section>

      {/* Service rows */}
      <section className="section-y border-t border-border" aria-labelledby="what-we-do">
        <div className="wrap">
          <SectionHeader
            id="what-we-do"
            index="01"
            eyebrow="What we do"
            title="Four disciplines. One connected partner."
            lead="Start with one, or bring us a problem that needs all four."
            align="split"
          />
          <div className="mt-16 space-y-6">
            {allServices.map((s, i) => (
              <Reveal key={s.slug}>
                <Card size="panel" padded={false} className="grid overflow-hidden lg:grid-cols-2">
                  <div className={cn("flex flex-col p-8 md:p-12", i % 2 === 1 && "lg:order-2")}>
                    <span className="font-mono text-xs text-accent-text">0{i + 1}</span>
                    <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-semibold tracking-[-0.025em] text-fg">
                      {s.name}
                    </h3>
                    <p className="mt-3 max-w-lg text-fg-muted">{s.lead}</p>
                    <div className="mt-8 grid gap-8 sm:grid-cols-2">
                      <div>
                        <p className="font-mono text-eyebrow text-fg-subtle uppercase">What we build</p>
                        <ul className="mt-3 space-y-2">
                          {s.capabilities.map((c) => (
                            <li key={c.title} className="flex items-center gap-2.5 text-sm text-fg">
                              <Check size={14} className="shrink-0 text-accent-icon" aria-hidden />
                              {c.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-eyebrow text-fg-subtle uppercase">How it runs</p>
                        <ol className="mt-3 space-y-2">
                          {s.engagement.map((e, n) => (
                            <li key={e.title} className="flex items-center gap-2.5 text-sm text-fg">
                              <span className="font-mono text-xs text-fg-subtle">{n + 1}</span>
                              {e.title}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    <div className="mt-10 lg:mt-auto lg:pt-10">
                      <Button to={s.path} variant="secondary" iconRight>
                        Explore {s.name.toLowerCase()}
                      </Button>
                    </div>
                  </div>
                  <div className="min-h-[260px] border-t border-border bg-bg-sunken/60 p-8 md:p-12 lg:border-t-0 lg:border-l">
                    <div className="mx-auto h-full max-w-sm">
                      <ServicePreview path={s.path} />
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section id="models" className="section-y scroll-mt-16 border-t border-border bg-bg-sunken/40" aria-labelledby="models-title">
        <div className="wrap">
          <SectionHeader
            id="models-title"
            index="02"
            eyebrow="Engagement models"
            title="Choose how we work together."
            lead="Every engagement starts with the same conversation. The shape it takes depends on what you need."
            align="split"
          />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {engagementModels.map((m, i) => (
              <StaggerItem key={m.title}>
                <Card className="flex h-full flex-col">
                  <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                  <h3 className="mt-5 text-lg font-semibold text-fg">{m.title}</h3>
                  <p className="mt-1 text-sm font-medium text-accent-text">{m.forWho}</p>
                  <p className="mt-4 text-sm text-fg-muted">{m.text}</p>
                  <ul className="mt-6 space-y-2 border-t border-border pt-5">
                    {m.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-fg">
                        <Check size={14} className="shrink-0 text-accent-icon" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8 flex flex-col gap-4 rounded-card border border-border bg-bg-raised px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-3 text-fg-muted">
              <Compass size={18} className="shrink-0 text-accent-icon" aria-hidden />
              Every model follows the same five steps, from Discover to Improve.
            </span>
            <Button variant="link" to="/process" iconRight>
              See how we work
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Contextual FAQ */}
      <section className="section-y border-t border-border" aria-labelledby="services-faq">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow index="03" marker="none">
              Questions
            </Eyebrow>
            <h2 id="services-faq" className="mt-5 text-h2 text-fg">
              Before you decide.
            </h2>
            <Button variant="link" to="/faq" iconRight className="mt-6">
              All questions
            </Button>
          </Reveal>
          <div className="lg:col-span-8">
            <Accordion
              items={faqs
                .filter((f) => ["specification", "cost", "scope-changes"].includes(f.id))
                .map((f) => ({ id: f.id, title: f.question, content: f.answer }))}
            />
          </div>
        </div>
      </section>

      <ClosingCTA
        tone="teal"
        eyebrow="Start with the problem"
        title="Have a system you’ve outgrown?"
        lead="Tell us where it slows you down. We’ll show you what replacing or connecting it would take."
      />
    </>
  );
}
