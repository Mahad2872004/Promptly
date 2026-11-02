import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, CircleAlert } from "lucide-react";
import {
  Button,
  Card,
  Eyebrow,
  GlowOrb,
  GridBackground,
  LineReveal,
  Reveal,
  Rise,
  Stagger,
  StaggerItem,
} from "../../components/ui";
import { ClosingCTA } from "../../components/site/ClosingCTA";
import { industries, type Industry } from "../../content/industries";
import { products } from "../../data/products";
import { cn } from "../../lib/cn";
import { EASE } from "../../lib/motion";

/** Hero: the four industry "lenses" as a rotating card stack. */
function LensStack() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion();
  const [front, setFront] = useState(0);

  useEffect(() => {
    if (!visible || reduced) return;
    const id = window.setInterval(() => setFront((f) => (f + 1) % industries.length), 3200);
    return () => window.clearInterval(id);
  }, [visible, reduced]);

  return (
    <div ref={ref} className="relative mx-auto aspect-[5/4] w-full max-w-[520px]" aria-hidden>
      {industries.map((ind, i) => {
        const depth = (i - front + industries.length) % industries.length; // 0 = front
        const Icon = ind.icon;
        return (
          <motion.div
            key={ind.id}
            initial={false}
            animate={{
              y: depth * -22,
              scale: 1 - depth * 0.06,
              opacity: depth > 2 ? 0 : 1 - depth * 0.22,
              rotate: depth === 0 ? 0 : depth % 2 ? -2 : 2,
            }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ zIndex: industries.length - depth }}
            className="absolute inset-x-0 bottom-0 origin-bottom rounded-panel border border-border bg-bg-raised p-7 shadow-elev-3 sm:p-9"
          >
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "inline-flex size-12 items-center justify-center rounded-card",
                  depth === 0 ? "bg-accent text-accent-fg" : "bg-bg-sunken text-fg-muted",
                )}
              >
                <Icon size={22} />
              </span>
              <span className="font-mono text-xs text-fg-subtle">
                0{i + 1} / 0{industries.length}
              </span>
            </div>
            <p className="mt-8 text-h3 text-fg">{ind.name}</p>
            <p className="mt-2 text-fg-muted">{ind.short}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {ind.challenges.slice(0, 2).map((c) => (
                <li key={c} className="rounded-full border border-border bg-bg-sunken px-3 py-1 text-xs text-fg-muted">
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}

function useActive(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function Related({ related }: { related: Industry["related"] }) {
  if (related.kind === "product") {
    const p = products.find((x) => x.id === related.id)!;
    return (
      <Card as="article" interactive padded={false} className="group relative flex h-full flex-col overflow-hidden">
        <div className="aspect-[16/8] overflow-hidden border-b border-border bg-bg-sunken">
          <img
            src={p.preview.src}
                    srcSet={p.preview.srcSet}
                    sizes="(min-width: 1024px) 400px, 100vw"
            alt=""
            loading="lazy"
            decoding="async"
            width={p.preview.width}
            height={p.preview.height}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-brand group-hover:scale-[1.03]"
          />
        </div>
        <div className="p-6">
          <span className="font-mono text-eyebrow text-fg-subtle uppercase">Built by Promptly · {p.category}</span>
          <h4 className="mt-2 text-lg font-semibold text-fg">
            <Link to={p.path} className="after:absolute after:inset-0 after:content-['']">
              {p.name}
            </Link>
          </h4>
          <p className="mt-1 text-sm text-fg-muted">{p.description}</p>
        </div>
      </Card>
    );
  }
  return (
    <Card as="article" interactive className="group relative flex h-full flex-col justify-between">
      <div>
        <span className="font-mono text-eyebrow text-fg-subtle uppercase">Try it</span>
        <h4 className="mt-2 text-lg font-semibold text-fg">
          <Link to={related.path} className="after:absolute after:inset-0 after:content-['']">
            {related.label}
          </Link>
        </h4>
        <p className="mt-1 text-sm text-fg-muted">{related.text}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text">
        Open <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Card>
  );
}

export default function Industries() {
  const active = useActive(industries.map((i) => i.id));
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <GridBackground fade="radial" noise />
        <GlowOrb color="teal" size={720} className="-top-40 right-[-8%]" />
        <div className="wrap-wide grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Rise>
              <Eyebrow>Industries</Eyebrow>
            </Rise>
            <h1 className="mt-6 text-h1 text-fg">
              <LineReveal lines={["Built around", <>your business<span className="text-spark">.</span></>]} />
            </h1>
            <Rise delay={0.3}>
              <p className="mt-6 max-w-xl text-lead text-fg-muted">
                Different industries share a need for better software. The right solution starts with understanding
                the people, processes, and decisions behind yours.
              </p>
            </Rise>
          </div>
          <Rise delay={0.3} className="pt-10">
            <LensStack />
          </Rise>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <nav
        aria-label="Industries"
        className="sticky top-16 z-30 border-y border-border bg-bg-overlay backdrop-blur-xl"
      >
        <ul className="wrap flex gap-1 overflow-x-auto py-2">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <li key={ind.id}>
                <a
                  href={`#${ind.id}`}
                  aria-current={active === ind.id ? "location" : undefined}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-control px-3.5 py-2 text-sm whitespace-nowrap transition-colors",
                    active === ind.id ? "bg-fg/[0.06] text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  <Icon size={15} aria-hidden />
                  {ind.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {industries.map((ind, n) => {
        const Icon = ind.icon;
        return (
          <section
            key={ind.id}
            id={ind.id}
            aria-labelledby={`${ind.id}-title`}
            className={cn("section-y scroll-mt-28", n > 0 && "border-t border-border")}
          >
            <div className="wrap">
              <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                  <Eyebrow index={`0${n + 1}`} marker="none">
                    {ind.name}
                  </Eyebrow>
                  <h2 id={`${ind.id}-title`} className="mt-5 flex items-start gap-4 text-h2 text-fg">
                    <span className="mt-2 hidden size-12 shrink-0 items-center justify-center rounded-card border border-border bg-bg-raised text-accent-icon shadow-elev-1 md:inline-flex">
                      <Icon size={22} aria-hidden />
                    </span>
                    {ind.title}
                  </h2>
                </div>
                <p className="text-lg text-fg-muted lg:col-span-5">{ind.lead}</p>
              </Reveal>

              <div className="mt-14 grid gap-5 lg:grid-cols-12">
                <Reveal className="lg:col-span-4">
                  <Card className="h-full bg-bg-sunken/60">
                    <p className="font-mono text-eyebrow text-fg-subtle uppercase">Common challenges</p>
                    <ul className="mt-5 space-y-4">
                      {ind.challenges.map((c) => (
                        <li key={c} className="flex gap-3 text-fg">
                          <CircleAlert size={18} className="mt-0.5 shrink-0 text-spark" aria-hidden />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Reveal>
                <Stagger className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
                  {ind.solutions.map((s) => (
                    <StaggerItem key={s.title}>
                      <Card className="h-full">
                        <h3 className="text-lg font-semibold text-fg">{s.title}</h3>
                        <p className="mt-2 text-sm text-fg-muted">{s.description}</p>
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {s.tags.map((t) => (
                            <li key={t} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-fg-muted">
                              {t}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-12">
                <Reveal className="lg:col-span-4">
                  <Related related={ind.related} />
                </Reveal>
                <Reveal
                  delay={0.1}
                  className="flex flex-col justify-between gap-6 rounded-card border border-border bg-bg-raised p-7 shadow-elev-1 sm:flex-row sm:items-center lg:col-span-8"
                >
                  <div>
                    <p className="text-h3 text-fg">{ind.cta.title}</p>
                    <p className="mt-1 text-fg-muted">{ind.cta.text}</p>
                  </div>
                  <Button to="/contact" iconRight className="shrink-0">
                    Start a project
                  </Button>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <ClosingCTA
        tone="teal"
        eyebrow="Your context, our engineering"
        title="Don’t see your industry?"
        lead="The right solution starts with the people and decisions behind your business — whatever it is."
      />
    </>
  );
}
