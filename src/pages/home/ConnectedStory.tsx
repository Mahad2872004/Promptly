import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Code2, Layers3, Workflow } from "lucide-react";
import Logo from "../../components/Logo";
import { Button, Eyebrow, GridBackground, SectionHeader } from "../../components/ui";
import { cn } from "../../lib/cn";
import { EASE } from "../../lib/motion";

const chapters = [
  {
    node: "Experience",
    label: "Software engineering",
    title: "A better experience. At every touchpoint.",
    body: "The customer-facing product and the systems behind it, designed as one experience. Clear interfaces. Considered architecture. Software that fits your business.",
    path: "/services/software-development",
    icon: Code2,
  },
  {
    node: "Intelligence",
    label: "Intelligent automation",
    title: "Less friction. More forward motion.",
    body: "Connect fragmented tools and turn repetitive tasks into thoughtful workflows. Keep your team in control while the right work happens in the background.",
    path: "/services/ai-solutions",
    icon: Workflow,
  },
  {
    node: "Architecture",
    label: "Product thinking",
    title: "Built to launch. Ready to evolve.",
    body: "Start with a useful first release and an architecture that leaves room for what comes next. We connect business priorities with practical engineering decisions.",
    path: "/services/startup-support",
    icon: Layers3,
  },
];

// Node positions in a 400×400 viewBox: top, bottom-left, bottom-right.
const NODES = [
  { x: 200, y: 62 },
  { x: 92, y: 300 },
  { x: 308, y: 300 },
];
const CORE = { x: 200, y: 214 };

function Chapter({
  index,
  onActive,
}: {
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  // "Active" = crossing the middle band of the viewport.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  const c = chapters[index];
  const Icon = c.icon;
  return (
    <article ref={ref} className="flex flex-col justify-center py-10 lg:min-h-[62vh] lg:py-0">
      <Eyebrow index={`0${index + 1}`} marker="none">
        {c.label}
      </Eyebrow>
      <h3 className="mt-5 flex items-start gap-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-semibold tracking-[-0.025em] text-fg">
        <span className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-control border border-border bg-bg-raised text-accent-icon lg:hidden">
          <Icon size={18} aria-hidden />
        </span>
        {c.title}
      </h3>
      <p className="mt-4 max-w-md text-lg text-fg-muted">{c.body}</p>
      <div className="mt-6">
        <Button variant="link" to={c.path} iconRight>
          Explore the capability
        </Button>
      </div>
    </article>
  );
}

function SystemDiagram({ active }: { active: number }) {
  return (
    <div
      role="img"
      aria-label={`Diagram: experience, intelligence and architecture connected around one core. ${chapters[active].node} is highlighted.`}
      className="relative isolate aspect-square w-full max-w-[460px] overflow-hidden rounded-panel border border-border bg-bg-raised shadow-elev-2"
    >
      <GridBackground size={40} fade="radial" />
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
        {/* Ring connecting the three nodes. */}
        <path
          d={`M${NODES[0].x} ${NODES[0].y} L${NODES[1].x} ${NODES[1].y} L${NODES[2].x} ${NODES[2].y} Z`}
          className="fill-none stroke-border-strong"
          strokeWidth="1"
        />
        {NODES.map((n, i) => (
          <line
            key={i}
            x1={CORE.x}
            y1={CORE.y}
            x2={n.x}
            y2={n.y}
            strokeWidth={i === active ? 2 : 1}
            className={cn(
              "transition-[stroke] duration-500",
              i === active ? "ds-flow-dash stroke-[var(--accent)]" : "stroke-border-strong",
            )}
          />
        ))}
      </svg>
      {/* Core */}
      <div
        className="absolute flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28px] border border-border bg-bg shadow-elev-2"
        style={{ left: `${(CORE.x / 400) * 100}%`, top: `${(CORE.y / 400) * 100}%` }}
      >
        <Logo size={48} showText={false} />
      </div>
      {/* Nodes */}
      {chapters.map((c, i) => {
        const Icon = c.icon;
        const on = i === active;
        return (
          <div
            key={c.node}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(NODES[i].x / 400) * 100}%`, top: `${(NODES[i].y / 400) * 100}%` }}
          >
            <motion.span
              animate={{ scale: on ? 1.06 : 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium whitespace-nowrap shadow-elev-1 transition-colors duration-500",
                on
                  ? "border-accent bg-accent text-accent-fg shadow-[0_8px_30px_-8px_var(--accent-glow)]"
                  : "border-border bg-bg-raised text-fg-muted",
              )}
            >
              <Icon size={15} aria-hidden />
              {c.node}
            </motion.span>
          </div>
        );
      })}
      <p className="absolute right-0 bottom-5 left-0 text-center font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
        Thoughtfully connected · purposefully engineered
      </p>
    </div>
  );
}

export function ConnectedStory() {
  const [active, setActive] = useState(0);
  return (
    <section className="section-y border-t border-border" aria-labelledby="connected-picture">
      <div className="wrap">
        <SectionHeader
          id="connected-picture"
          index="03"
          eyebrow="The connected picture"
          title={
            <>
              Great software is
              <br />
              never just a screen.
            </>
          }
          lead="It’s everything working beautifully together."
        />
        <div className="mt-12 grid gap-10 lg:mt-4 lg:grid-cols-2 lg:gap-16">
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-230px)] flex justify-center">
              <SystemDiagram active={active} />
            </div>
          </div>
          <div className="divide-y divide-border lg:divide-y-0">
            {chapters.map((_, i) => (
              <Chapter key={i} index={i} onActive={setActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
