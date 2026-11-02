import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, CircleDashed, GitBranch, Layers3, Workflow } from "lucide-react";
import {
  Button,
  Card,
  SectionHeader,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui";
import { cn } from "../../lib/cn";
import { EASE } from "../../lib/motion";

const expertise = [
  {
    id: "software",
    name: "Software engineering",
    title: "Software, shaped around you.",
    path: "/services/software-development",
    body: "From the first interaction to the systems behind it. Custom applications, platforms and integrations designed to work as one.",
    tags: ["Web applications", "Business platforms", "APIs & integrations"],
    Visual: ReleaseVisual,
  },
  {
    id: "automation",
    name: "AI & automation",
    title: "Make the complex feel effortless.",
    path: "/services/ai-solutions",
    body: "Connect your tools, remove repetitive steps, and bring intelligence into everyday operations—with people in control.",
    tags: ["Connected workflows", "AI solutions", "Operational automation"],
    Visual: RunLogVisual,
  },
  {
    id: "strategy",
    name: "Strategy & architecture",
    title: "A clear direction. A stronger foundation.",
    path: "/services/startup-support",
    body: "Turn an ambitious idea into a considered technical plan. Make the decisions today that give your product room to grow.",
    tags: ["Product discovery", "Technical architecture", "MVP planning"],
    Visual: LayersVisual,
  },
];

export function Capabilities() {
  return (
    <section className="section-y" aria-labelledby="what-we-do">
      <div className="wrap">
        <SectionHeader
          id="what-we-do"
          index="01"
          eyebrow="What we do"
          title={
            <>
              The ambition is yours.
              <br />
              The engineering is ours.
            </>
          }
          lead="Build a new platform. Connect fragmented operations. Find the right technical direction. We work from the problem, all the way through to the product."
          action={
            <Button variant="link" to="/services" iconRight>
              Explore our expertise
            </Button>
          }
          align="split"
        />

        <Tabs defaultValue="software" className="mt-16">
          <TabsList label="Capabilities">
            {expertise.map((e, i) => (
              <TabsTrigger key={e.id} value={e.id}>
                <span className="mr-2 font-mono text-xs text-fg-subtle">0{i + 1}</span>
                {e.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {expertise.map((e) => (
            <TabsContent key={e.id} value={e.id} className="pt-6">
              <Card size="panel" padded={false} className="grid overflow-hidden lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="flex flex-col p-8 md:p-12"
                >
                  <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-semibold tracking-[-0.025em] text-fg">
                    {e.title}
                  </h3>
                  <p className="mt-4 max-w-md text-lg text-fg-muted">{e.body}</p>
                  <ul className="mt-8 space-y-3">
                    {e.tags.map((t) => (
                      <li key={t} className="flex items-center gap-3 text-fg">
                        <span className="inline-flex size-5 items-center justify-center rounded-full bg-accent-tint text-accent-icon">
                          <Check size={12} />
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 lg:mt-auto lg:pt-10">
                    <Button to={e.path} variant="secondary" iconRight>
                      Explore {e.name.toLowerCase()}
                    </Button>
                  </div>
                </motion.div>
                <div className="relative min-h-[320px] border-t border-border bg-bg-sunken/60 p-6 md:p-10 lg:border-t-0 lg:border-l">
                  <e.Visual />
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-8 flex flex-col gap-4 rounded-card border border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-fg-muted">
            From the first architecture decision to the next product release.{" "}
            <strong className="font-medium text-fg">One partner who sees the whole picture.</strong>
          </p>
          <Button variant="link" to="/services/digital-transformation" iconRight={<ArrowRight size={16} />}>
            Explore digital transformation
          </Button>
        </div>
      </div>
    </section>
  );
}

/* Panel visuals — decorative, theme-aware, distinct from every page hero. */

const rise = (i: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.15 + i * 0.12, duration: 0.4, ease: EASE },
});

function ReleaseVisual() {
  const checks = ["Type check", "Unit tests", "Accessibility", "Preview deploy"];
  return (
    <div aria-hidden className="mx-auto flex h-full max-w-sm flex-col justify-center gap-3">
      <motion.div {...rise(0)} className="flex items-center gap-3 rounded-xl border border-border bg-bg-raised p-4 shadow-elev-1">
        <GitBranch size={16} className="text-accent-icon" />
        <span className="flex-1 font-mono text-xs text-fg">feat/order-tracking</span>
        <span className="rounded-full bg-accent-tint px-2 py-0.5 font-mono text-[10px] text-accent-text">PR #48</span>
      </motion.div>
      {checks.map((c, i) => (
        <motion.div key={c} {...rise(i + 1)} className="flex items-center gap-3 px-4 text-sm text-fg-muted">
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-accent text-accent-fg">
            <Check size={12} />
          </span>
          {c}
        </motion.div>
      ))}
      <motion.div
        {...rise(6)}
        className="mt-2 rounded-xl border border-spark/30 bg-bg-raised p-4 text-sm shadow-elev-1"
      >
        <span className="font-medium text-fg">Ready for review</span>
        <span className="mt-1 block text-xs text-fg-muted">Reviewable increment · quality built in</span>
      </motion.div>
    </div>
  );
}

function RunLogVisual() {
  const steps = [
    ["Trigger", "New enquiry from website form", true],
    ["Enrich", "Matched to existing customer", true],
    ["Decide", "Route to sales · high intent", true],
    ["Review", "Waiting for a person to approve", false],
  ] as const;
  return (
    <div aria-hidden className="mx-auto flex h-full max-w-sm flex-col justify-center">
      <motion.p {...rise(0)} className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
        <Workflow size={12} /> Workflow run · lead routing
      </motion.p>
      <ol className="relative space-y-4 border-l border-border pl-6">
        {steps.map(([title, text, done], i) => (
          <motion.li key={title} {...rise(i + 1)} className="relative">
            <span
              className={cn(
                "absolute top-1 -left-[31px] inline-flex size-[13px] items-center justify-center rounded-full border-2",
                done ? "border-accent bg-accent" : "border-spark bg-bg",
              )}
            />
            <span className="block text-sm font-medium text-fg">{title}</span>
            <span className="flex items-center gap-1.5 text-xs text-fg-muted">
              {!done && <CircleDashed size={11} className="text-spark" />}
              {text}
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function LayersVisual() {
  const layers = [
    ["Experience", "What customers and teams use"],
    ["Application", "Business logic and integrations"],
    ["Foundation", "Data, infrastructure, security"],
  ];
  return (
    <div aria-hidden className="mx-auto flex h-full max-w-sm flex-col justify-center gap-3 [perspective:900px]">
      {layers.map(([title, text], i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, rotateX: 30, y: 20 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ delay: 0.1 + (2 - i) * 0.15, duration: 0.6, ease: EASE }}
          className={cn(
            "flex items-center gap-4 rounded-xl border bg-bg-raised p-4 shadow-elev-1",
            i === 0 ? "border-accent/40" : "border-border",
          )}
          style={{ marginInline: `${i * 12}px` }}
        >
          <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
          <Layers3 size={16} className={i === 0 ? "text-accent-icon" : "text-fg-subtle"} />
          <span>
            <span className="block text-sm font-medium text-fg">{title}</span>
            <span className="block text-xs text-fg-muted">{text}</span>
          </span>
        </motion.div>
      ))}
      <motion.p {...rise(5)} className="mt-3 text-center font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
        Strong foundations · open possibilities
      </motion.p>
    </div>
  );
}
