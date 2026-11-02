import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, MessageSquare } from "lucide-react";
import { SiFacebook, SiInstagram, SiShopify, SiWhatsapp } from "react-icons/si";
import {
  Badge,
  Button,
  Card,
  DeviceFrame,
  Eyebrow,
  GlowOrb,
  GridBackground,
  LineReveal,
  Reveal,
  Rise,
  ScrollProgress,
  SectionHeader,
} from "../../components/ui";
import { ClosingCTA } from "../../components/site/ClosingCTA";
import { products, type ProductDefinition } from "../../data/products";
import { cn } from "../../lib/cn";
import { FeatureSnippet } from "./snippets";
import { LiveDemo } from "./LiveDemo";

/** Each product's own glow, all within the brand palette. */
const ACCENT: Record<string, { orb: "teal" | "cyan" | "orange"; strength: string }> = {
  xsender: { orb: "teal", strength: "[--orb-strength:0.32]" },
  lumetry: { orb: "cyan", strength: "[--orb-strength:0.4]" },
  leadflow: { orb: "orange", strength: "[--orb-strength:0.2]" },
  retailflow: { orb: "cyan", strength: "[--orb-strength:0.28]" },
};

const INTEGRATIONS = {
  whatsapp: { label: "WhatsApp", Icon: SiWhatsapp },
  instagram: { label: "Instagram", Icon: SiInstagram },
  facebook: { label: "Facebook", Icon: SiFacebook },
  shopify: { label: "Shopify", Icon: SiShopify },
};

export function ProductPage({ product: p }: { product: ProductDefinition }) {
  const accent = ACCENT[p.id] ?? ACCENT.xsender;
  const next = products[(products.findIndex((x) => x.id === p.id) + 1) % products.length];
  const tryLabel = p.embeddableDemo ? "Try the live demo" : `Explore ${p.name}`;

  return (
    <>
      <ScrollProgress />

      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-28 md:pt-36">
        <GridBackground fade="radial" noise />
        <GlowOrb color={accent.orb} size={900} className={cn("top-[30%] left-1/2 -translate-x-1/2", accent.strength)} />
        <div className="wrap">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft size={15} /> All products
          </Link>
          <div className="mt-8 flex flex-col items-center text-center">
            <Rise className="flex flex-wrap items-center justify-center gap-3">
              <Eyebrow>{p.category} · Built by Promptly</Eyebrow>
              {p.embeddableDemo && <Badge variant="live">Live demo</Badge>}
            </Rise>
            <p className="mt-6 text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-[-0.03em] text-fg-muted">
              {p.name}
            </p>
            <h1 className="mt-2 max-w-4xl text-h1 text-fg">
              <LineReveal lines={[p.description]} />
            </h1>
            <Rise delay={0.25}>
              <p className="mt-6 max-w-2xl text-lead text-fg-muted">{p.detail}</p>
              <p className="mt-3 text-sm text-fg-subtle">{p.audience}</p>
            </Rise>
            <Rise delay={0.35} className="mt-10 flex flex-wrap justify-center gap-3">
              <Button
                href={p.embeddableDemo ? "#demo" : p.url}
                data-hero-cta
                size="lg"
                iconRight={p.embeddableDemo ? true : <ArrowUpRight size={17} />}
              >
                {tryLabel}
              </Button>
              <Button
                to={`/contact?product=${p.id}`}
                size="lg"
                variant="secondary"
                iconLeft={<MessageSquare size={17} />}
              >
                Talk to us
              </Button>
            </Rise>
          </div>
        </div>
        <Rise delay={0.45} className="wrap-wide mt-16 md:mt-20">
          <DeviceFrame url={new URL(p.url).host} className="rounded-frame rounded-b-none border-b-0">
            <img
              src={p.preview.src}
                    srcSet={p.preview.srcSet}
                    sizes="(min-width: 1320px) 1320px, 100vw"
              alt={p.preview.alt}
              width={p.preview.width}
              height={p.preview.height}
              decoding="async"
              fetchPriority="high"
              className="block h-auto w-full"
            />
          </DeviceFrame>
        </Rise>
      </section>

      {/* Problem */}
      <section className="border-t border-border bg-bg-sunken/40 section-y">
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow marker="dash">The problem it solves</Eyebrow>
            <h2 className="mt-4 text-h2 text-fg">Built around the work.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <p className="text-[clamp(1.25rem,2.2vw,1.625rem)] leading-snug text-fg">{p.problem}</p>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="section-y" aria-labelledby="features">
        <div className="wrap">
          <SectionHeader id="features" eyebrow="What it does" title={`What ${p.name} takes off your plate.`} />
          <div className="mt-16 space-y-20 md:space-y-28">
            {p.features.map((f, i) => (
              <div key={f.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
                  <span className="font-mono text-xs text-accent-text">0{i + 1}</span>
                  <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-semibold tracking-[-0.025em] text-fg">
                    {f.title}
                  </h3>
                  <p className="mt-4 max-w-md text-lg text-fg-muted">{f.text}</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <FeatureSnippet product={p} index={i} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live demo */}
      {p.embeddableDemo && (
        <section id="demo" className="scroll-mt-20 border-t border-border section-y" aria-labelledby="demo-title">
          <div className="wrap-wide">
            <SectionHeader
              id="demo-title"
              eyebrow="Try it live"
              marker="dash"
              title="The real thing, right here."
              lead={p.availability}
              align="split"
            />
            <Reveal className="mt-14">
              <LiveDemo product={p} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Integrations */}
      {p.integrations && p.integrations.length > 0 && (
        <section className="border-t border-border py-16" aria-labelledby="integrations">
          <div className="wrap flex flex-col items-center gap-8 text-center">
            <p id="integrations" className="font-mono text-eyebrow text-fg-subtle uppercase">
              Works with
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {p.integrations.map((key) => {
                const { label, Icon } = INTEGRATIONS[key];
                return (
                  <li key={key} className="flex items-center gap-3 text-lg font-medium text-fg-muted">
                    <Icon aria-hidden className="size-7" />
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* Availability (non-demo products) + next product */}
      <section className="border-t border-border pt-16 md:pt-20">
        <div className="wrap grid gap-5 lg:grid-cols-2">
          {!p.embeddableDemo && (
            <Card size="panel">
              <Eyebrow>Current product</Eyebrow>
              <h2 className="mt-4 text-h3 text-fg">{p.status}</h2>
              <p className="mt-3 text-fg-muted">{p.availability}</p>
              <Button href={p.url} variant="link" iconRight={<ArrowUpRight size={15} />} className="mt-6">
                See {p.name} directly
              </Button>
            </Card>
          )}
          <Card
            as="article"
            size="panel"
            interactive
            className={cn("group relative overflow-hidden", p.embeddableDemo && "lg:col-span-2")}
          >
            <span className="font-mono text-eyebrow text-fg-subtle uppercase">Next product</span>
            <div className="mt-4 flex items-end justify-between gap-6">
              <div>
                <h2 className="text-h2 text-fg">
                  <Link to={next.path} className="after:absolute after:inset-0 after:content-['']">
                    {next.name}
                  </Link>
                </h2>
                <p className="mt-2 text-fg-muted">{next.description}</p>
              </div>
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-border text-fg transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={20} />
              </span>
            </div>
          </Card>
        </div>
      </section>

      <ClosingCTA
        tone="spark"
        eyebrow="Built by Promptly"
        title="Want this built around your business?"
        lead="We build custom software with the same standards we bring to our own products."
        primary={{ label: "Talk to us", to: `/contact?product=${p.id}` }}
      />
    </>
  );
}
