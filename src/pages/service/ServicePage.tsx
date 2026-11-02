import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
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
  ScrollProgress,
  Stagger,
  StaggerItem,
} from "../../components/ui";
import { ClosingCTA } from "../../components/site/ClosingCTA";
import { cn } from "../../lib/cn";
import { products } from "../../data/products";
import { faqs } from "../../content/faq";
import type { ServiceContent } from "../../content/services";
import { DecisionFlow } from "./visuals/DecisionFlow";
import { CodePreview } from "./visuals/CodePreview";
import { SystemsMap } from "./visuals/SystemsMap";
import { Roadmap } from "./visuals/Roadmap";

const VISUALS: Record<ServiceContent["visual"], React.ComponentType> = {
  code: CodePreview,
  "decision-flow": DecisionFlow,
  "systems-map": SystemsMap,
  roadmap: Roadmap,
};

const SECTIONS = [
  { id: "problems", label: "Problems we solve" },
  { id: "build", label: "What we build" },
  { id: "stack", label: "Tech stack" },
  { id: "engagement", label: "How an engagement runs" },
  { id: "related", label: "Related products" },
  { id: "faq", label: "Questions" },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function Block({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-border py-16 first:border-t-0 first:pt-0 md:py-20">
      <Rise>
        <Eyebrow index={String(index).padStart(2, "0")} marker="none">
          {SECTIONS.find((s) => s.id === id)?.label}
        </Eyebrow>
        <h2 id={`${id}-title`} className="mt-4 max-w-2xl text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-semibold tracking-[-0.025em] text-fg">
          {title}
        </h2>
      </Rise>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export function ServicePage({ service }: { service: ServiceContent }) {
  const Visual = VISUALS[service.visual];
  const related = products.filter((p) => service.relatedProducts.includes(p.id));
  const questions = faqs.filter((f) => service.faqIds.includes(f.id));
  const active = useActiveSection(SECTIONS.map((s) => s.id));

  return (
    <>
      <ScrollProgress />

      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <GridBackground fade="radial" />
        <GlowOrb color="teal" size={720} className="-top-40 right-[-10%]" />
        <div className="wrap-wide grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm text-fg-subtle">
                <li>
                  <Link to="/services" className="hover:text-fg">
                    Services
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight size={14} />
                </li>
                <li aria-current="page" className="text-fg-muted">
                  {service.name}
                </li>
              </ol>
            </nav>
            <h1 className="mt-6 text-h1 text-fg">
              <LineReveal lines={[service.title]} />
            </h1>
            <Reveal delay={0.25}>
              <p className="mt-6 max-w-xl text-lead text-fg-muted">{service.lead}</p>
            </Reveal>
            <Reveal delay={0.35} className="mt-10 flex flex-wrap gap-3">
              <Button to="/contact" size="lg" iconRight data-hero-cta>
                Discuss a project
              </Button>
              <Button to="/services" size="lg" variant="secondary">
                All services
              </Button>
            </Reveal>
          </div>
          {Visual && (
            <Reveal delay={0.3}>
              <Visual />
            </Reveal>
          )}
        </div>
      </section>

      {/* Body with sticky table of contents */}
      <div className="wrap-wide grid gap-12 border-t border-border pt-16 md:pt-20 lg:grid-cols-12">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-24">
            <p className="font-mono text-eyebrow text-fg-subtle uppercase">On this page</p>
            <ol className="mt-4 space-y-1 border-l border-border">
              {SECTIONS.filter((s) => s.id !== "related" || related.length).map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? "location" : undefined}
                    className={cn(
                      "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors",
                      active === s.id ? "border-accent text-fg" : "border-transparent text-fg-muted hover:text-fg",
                    )}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-10 rounded-card border border-border bg-bg-raised p-5">
              <p className="text-sm font-medium text-fg">Not sure where to start?</p>
              <p className="mt-1 text-sm text-fg-muted">Get a preliminary plan in under a minute.</p>
              <Button variant="link" to="/blueprint" iconRight className="mt-3 text-sm">
                Try Project Blueprint
              </Button>
            </div>
          </div>
        </nav>

        <div className="min-w-0 lg:col-span-9">
          <Block id="problems" index={1} title="Where it usually hurts.">
            <Stagger className="grid gap-5 md:grid-cols-3">
              {service.problems.map((p, i) => (
                <StaggerItem key={p.title}>
                  <Card className="h-full">
                    <span className="font-mono text-xs text-spark">0{i + 1}</span>
                    <h3 className="mt-4 text-lg font-semibold text-fg">{p.title}</h3>
                    <p className="mt-2 text-fg-muted">{p.text}</p>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </Block>

          <Block id="build" index={2} title="Shaped around the work, not the technology.">
            <Stagger className="grid gap-5 md:grid-cols-2">
              {service.capabilities.map((c) => {
                const Icon = c.icon;
                return (
                  <StaggerItem key={c.title}>
                    <Card className="h-full">
                      <span className="inline-flex size-10 items-center justify-center rounded-control border border-border bg-bg-sunken text-accent-icon">
                        <Icon size={18} aria-hidden />
                      </span>
                      <h3 className="mt-5 text-h3 text-fg">{c.title}</h3>
                      <p className="mt-2 text-fg-muted">{c.description}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {c.features.map((f) => (
                          <li key={f} className="rounded-full border border-border bg-bg-sunken px-3 py-1 text-sm text-fg-muted">
                            {f}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </Block>

          <Block id="stack" index={3} title="Proven tools, chosen for the job.">
            <div className="divide-y divide-border rounded-card border border-border bg-bg-raised">
              {service.stack.map((g) => (
                <div key={g.group} className="grid gap-3 p-5 sm:grid-cols-[140px_1fr] sm:items-center">
                  <span className="font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">{g.group}</span>
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-2 rounded-control border border-border bg-bg px-3 py-1.5 text-sm text-fg"
                      >
                        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>

          <Block id="engagement" index={4} title="A clear path through the work.">
            <Stagger as="ol" className="relative grid gap-8 md:grid-cols-3 md:gap-6">
              <span aria-hidden className="absolute top-4 right-0 left-0 hidden h-px bg-border md:block" />
              {service.engagement.map((s, i) => (
                <StaggerItem as="li" key={s.title} className="relative">
                  <span
                    className={cn(
                      "relative inline-flex size-8 items-center justify-center rounded-full border font-mono text-xs",
                      i === 0 ? "border-spark bg-spark text-spark-fg" : "border-border-strong bg-bg text-fg-muted",
                    )}
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-fg">{s.title}</h3>
                  <p className="mt-2 text-fg-muted">{s.description}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <p className="mt-10 text-sm text-fg-muted">
              Timing is agreed during planning, once scope and dependencies are clear.{" "}
              <Link to="/process" className="font-medium text-accent-text underline-offset-4 hover:underline">
                See how we work →
              </Link>
            </p>
          </Block>

          {related.length > 0 && (
            <Block id="related" index={5} title="Built with the same thinking.">
              <div className="grid gap-5 md:grid-cols-2">
                {related.map((p) => (
                  <Card key={p.id} as="article" interactive padded={false} className="group relative overflow-hidden">
                    <div className="aspect-[16/8] overflow-hidden border-b border-border bg-bg-sunken">
                      <img
                        src={p.preview.src}
                    srcSet={p.preview.srcSet}
                    sizes="(min-width: 1024px) 450px, 100vw"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width={p.preview.width}
                        height={p.preview.height}
                        className="h-full w-full object-cover object-top transition-transform duration-500 ease-brand group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-6">
                      <span className="font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">{p.category}</span>
                      <h3 className="mt-2 text-lg font-semibold text-fg">
                        <Link to={p.path} className="after:absolute after:inset-0 after:content-['']">
                          {p.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-fg-muted">{p.description}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text">
                        View product <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </Block>
          )}

          <Block id="faq" index={related.length ? 6 : 5} title="Good questions, practical answers.">
            <Accordion items={questions.map((f) => ({ id: f.id, title: f.question, content: f.answer }))} />
            <Button variant="link" to="/faq" iconRight className="mt-8">
              All questions
            </Button>
          </Block>
        </div>
      </div>

      <ClosingCTA tone="teal" eyebrow={service.name} title={service.closing.title} lead={service.closing.lead} />
    </>
  );
}
