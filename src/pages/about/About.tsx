import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, Layers3, Search, ShieldCheck } from "lucide-react";
import {
  Badge,
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
import { products } from "../../data/products";
import { StudioVisual } from "./StudioVisual";
import { Team } from "./Team";

const principles = [
  {
    icon: Search,
    title: "Understand before building",
    text: "Start with the people, constraints, and decisions that shape the problem.",
  },
  {
    icon: Layers3,
    title: "Keep complexity earned",
    text: "Use AI and automation where they help. Choose architecture for its purpose.",
  },
  {
    icon: Eye,
    title: "Make progress visible",
    text: "Review working software and agree on the next useful increment.",
  },
  {
    icon: ShieldCheck,
    title: "Build for ownership",
    text: "Favor clear systems and maintainable foundations that can evolve.",
  },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <GridBackground fade="radial" noise />
        <GlowOrb color="teal" size={760} className="-top-40 right-[-12%]" />
        <div className="wrap-wide grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <Rise>
              <Eyebrow>About Promptly</Eyebrow>
            </Rise>
            <h1 className="mt-6 text-h1 text-fg">
              <LineReveal
                lines={[
                  "Engineering-led.",
                  "Product-minded.",
                  <>
                    Business-aware<span className="text-spark">.</span>
                  </>,
                ]}
              />
            </h1>
            <Rise delay={0.3}>
              <p className="mt-6 max-w-xl text-lead text-fg-muted">
                Promptly is a technology company in Lahore, Pakistan, working across software engineering,
                intelligent automation, and proprietary software products.
              </p>
            </Rise>
            <Rise delay={0.4} className="mt-10 flex flex-wrap gap-3">
              <Button to="/contact" size="lg" iconRight data-hero-cta>
                Start a project
              </Button>
              <Button href="#team" size="lg" variant="secondary">
                Meet the team
              </Button>
            </Rise>
          </div>
          <Rise delay={0.3}>
            <StudioVisual />
          </Rise>
        </div>
      </section>

      {/* Story + mission */}
      <section className="section-y border-t border-border" aria-labelledby="story">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow index="01" marker="none">
              Our story
            </Eyebrow>
            <h2 id="story" className="mt-5 text-h2 text-fg">
              We connect what a business needs with what technology can do.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-fg-muted lg:col-span-6 lg:col-start-7 lg:pt-14">
            <p>
              Some challenges need a new application. Others need better connections between tools, a simpler
              workflow, or a clearer technical direction. We start with the problem.
            </p>
            <p>
              Our ambition is to build lasting value through both client partnerships and software of our own. That
              means thinking beyond launch: about usability, maintainability, and the next stage of the business.
            </p>
          </Reveal>
        </div>

        <Reveal className="wrap mt-20 md:mt-28">
          <figure className="relative overflow-hidden rounded-panel border border-border bg-bg-raised px-8 py-14 shadow-elev-1 md:px-16 md:py-20">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-10 left-6 font-serif text-[12rem] leading-none text-accent/15 select-none md:left-12"
            >
              “
            </span>
            <blockquote className="relative max-w-4xl text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.15] font-semibold tracking-[-0.03em] text-fg">
              The best software disappears into the work —{" "}
              <span className="text-gradient-brand">clear to use, easy to change,</span> and still earning its place
              years after launch<span className="text-spark">.</span>
            </blockquote>
            <figcaption className="mt-8 font-mono text-eyebrow text-fg-subtle uppercase">
              What we’re building toward
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* Principles */}
      <section className="section-y border-t border-border bg-bg-sunken/40" aria-labelledby="principles">
        <div className="wrap">
          <SectionHeader
            id="principles"
            index="02"
            eyebrow="Our working principles"
            title="How we decide, every day."
            lead="Four principles that shape scope, architecture, and the way we work with you."
            align="split"
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <StaggerItem key={p.title}>
                  <Card className="flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex size-10 items-center justify-center rounded-control border border-border bg-bg-sunken text-accent-icon">
                        <Icon size={18} aria-hidden />
                      </span>
                      <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                    </div>
                    <h3 className="mt-8 text-lg font-semibold text-fg">{p.title}</h3>
                    <p className="mt-2 text-fg-muted">{p.text}</p>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <Team />

      {/* Why we build our own products */}
      <section className="section-y border-t border-border" aria-labelledby="own-products">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow index="04" marker="none">
              Why we build our own products
            </Eyebrow>
            <h2 id="own-products" className="mt-5 text-h2 text-fg">
              We don’t just build for others.
            </h2>
            <p className="mt-6 max-w-lg text-lg text-fg-muted">
              Building our own products keeps us close to the decisions that matter after launch — what to
              simplify, what to automate, and what to leave alone. We bring that same care to the systems we build
              with you.
            </p>
            <Button to="/products" variant="secondary" iconRight className="mt-10">
              Explore our products
            </Button>
          </Reveal>
          <Stagger as="ul" className="grid gap-3">
            {products.map((p) => (
              <StaggerItem as="li" key={p.id}>
                <Link
                  to={p.path}
                  className="group flex items-center gap-5 rounded-card border border-border bg-bg-raised p-4 shadow-elev-1 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong"
                >
                  <img
                    src={p.preview.src}
                    srcSet={p.preview.srcSet}
                    sizes="96px"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={128}
                    height={72}
                    className="h-14 w-24 shrink-0 rounded-lg border border-border object-cover object-top"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="font-semibold text-fg">{p.name}</span>
                      {p.embeddableDemo && <Badge variant="live">Live</Badge>}
                    </span>
                    <span className="block truncate text-sm text-fg-muted">{p.description}</span>
                  </span>
                  <ArrowRight
                    size={18}
                    aria-hidden
                    className="shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-fg"
                  />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ClosingCTA
        tone="teal"
        eyebrow="Work with us"
        title="Let’s start with the right question."
        lead="Tell us what you’re trying to change. We’ll help you work out what to build first."
      />
    </>
  );
}
