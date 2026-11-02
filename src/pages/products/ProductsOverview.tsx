import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import {
  Badge,
  Button,
  DeviceFrame,
  Eyebrow,
  GlowOrb,
  GridBackground,
  LineReveal,
  Reveal,
  Rise,
  SectionHeader,
} from "../../components/ui";
import { ClosingCTA } from "../../components/site/ClosingCTA";
import { products, type ProductDefinition } from "../../data/products";
import { cn } from "../../lib/cn";

// Final fanned positions per card (stacked at scroll 0).
const FAN = [
  { rotate: -9, x: -46, y: 18 },
  { rotate: -3, x: -15, y: 4 },
  { rotate: 3, x: 15, y: 4 },
  { rotate: 9, x: 46, y: 18 },
];

function FanCard({ product, i, progress }: { product: ProductDefinition; i: number; progress: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const f = FAN[i];
  const rotate = useTransform(progress, [0, 1], [f.rotate * 0.3, f.rotate]);
  const x = useTransform(progress, [0, 1], [`${f.x * 0.25}%`, `${f.x}%`]);
  const y = useTransform(progress, [0, 1], [`${i * 3}%`, `${f.y}%`]);
  return (
    <motion.div
      className="absolute inset-x-[18%] top-0 origin-bottom"
      style={reduced ? { rotate: f.rotate, x: `${f.x}%`, y: `${f.y}%`, zIndex: i } : { rotate, x, y, zIndex: i }}
    >
      <div className="overflow-hidden rounded-card border border-border bg-bg-raised shadow-elev-3">
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <span className="text-xs font-semibold text-fg">{product.name}</span>
          <span className="flex gap-1">
            {[0, 1, 2].map((d) => (
              <span key={d} className="size-1.5 rounded-full bg-border-strong" />
            ))}
          </span>
        </div>
        <img
          src={product.preview.src}
                    srcSet={product.preview.srcSet}
                    sizes="(min-width: 1024px) 680px, 64vw"
          alt=""
          width={product.preview.width}
          height={product.preview.height}
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
    </motion.div>
  );
}

function ProductFan() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "center 45%"] });
  return (
    <div
      ref={ref}
      role="img"
      aria-label="xSender, Lumetry, LeadFlow and RetailFlow product screens fanned out."
      className="relative mx-auto aspect-[16/9] w-full max-w-5xl"
    >
      {products.map((p, i) => (
        <FanCard key={p.id} product={p} i={i} progress={scrollYProgress} />
      ))}
    </div>
  );
}

export default function ProductsOverview() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-24 md:pt-36 md:pb-40">
        <GridBackground fade="radial" noise />
        <GlowOrb color="teal" size={820} className="top-[40%] left-[30%] -translate-x-1/2" />
        <GlowOrb color="orange" size={420} className="top-[55%] right-[10%] [--orb-strength:0.14]" />
        <div className="wrap flex flex-col items-center text-center">
          <Rise>
            <Eyebrow>Our products</Eyebrow>
          </Rise>
          <h1 className="mt-6 text-display text-fg">
            <LineReveal lines={["Products we build", <>and run<span className="text-spark">.</span></>]} />
          </h1>
          <Rise delay={0.3}>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">
              From customer conversations to commerce intelligence, lead management, and retail operations. Explore
              the software we build and the problems it addresses.
            </p>
          </Rise>
        </div>
        <Rise delay={0.4} className="wrap-wide mt-16 md:mt-20">
          <ProductFan />
        </Rise>
      </section>

      <section className="section-y border-t border-border" aria-labelledby="portfolio">
        <div className="wrap">
          <SectionHeader
            id="portfolio"
            index="01"
            eyebrow="The portfolio"
            title="Four products. Four everyday problems."
            align="split"
            lead="Each one is a working application you can explore today."
          />
          <div className="mt-16 space-y-24 md:space-y-32">
            {products.map((p, i) => (
              <article key={p.id} id={p.id} className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-eyebrow text-fg-subtle uppercase">{p.category}</span>
                    {p.embeddableDemo ? <Badge variant="live">Live demo</Badge> : <Badge variant="teal">Available</Badge>}
                  </div>
                  <h3 className="mt-4 text-[clamp(2rem,3.6vw,3rem)] leading-none font-semibold tracking-[-0.035em] text-fg">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-h3 font-medium text-fg-muted">{p.description}</p>
                  <ul className="mt-8 space-y-3">
                    {p.features.map((f) => (
                      <li key={f.title} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent-icon">
                          <Check size={12} />
                        </span>
                        <span>
                          <span className="font-medium text-fg">{f.title}</span>
                          <span className="block text-sm text-fg-muted">{f.text}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <Button to={p.path} iconRight>
                      Explore {p.name}
                    </Button>
                    <Button href={p.url} variant="secondary" iconRight={<ArrowUpRight size={16} />}>
                      Visit website
                    </Button>
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <Link to={p.path} aria-label={`Explore ${p.name}`} className="group block rounded-panel">
                    <DeviceFrame url={new URL(p.url).host} className="transition-transform duration-500 ease-brand group-hover:-translate-y-1">
                      <img
                        src={p.preview.src}
                    srcSet={p.preview.srcSet}
                    sizes="(min-width: 1024px) 600px, 100vw"
                        alt={p.preview.alt}
                        width={p.preview.width}
                        height={p.preview.height}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full"
                      />
                    </DeviceFrame>
                  </Link>
                  <p className="mt-3 text-center text-xs text-fg-subtle">{p.preview.caption}</p>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bg-sunken/40 py-16 md:py-20">
        <Reveal className="wrap flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Eyebrow index="02" marker="none">
              Same standards, your product
            </Eyebrow>
            <p className="mt-4 max-w-2xl text-h3 text-fg">
              Built with the same standards we bring to client work — and the other way around.
            </p>
          </div>
          <Button to="/services" variant="secondary" iconRight={<ArrowRight size={16} />}>
            Explore our services
          </Button>
        </Reveal>
      </section>

      <ClosingCTA
        tone="spark"
        eyebrow="Built by Promptly"
        title="Want this built around your business?"
        lead="Tell us which workflow you want to own. We’ll shape the software around it."
      />
    </>
  );
}
