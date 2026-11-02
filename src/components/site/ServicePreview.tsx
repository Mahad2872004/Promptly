import React from "react";
import { motion } from "motion/react";
import { EASE } from "../../lib/motion";

/** Tiny abstract visual per service, used in the Services mega-menu. */
export function ServicePreview({ path }: { path: string }) {
  return (
    <motion.div
      key={path}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="h-full"
      aria-hidden
    >
      {path.endsWith("software-development") && <Code />}
      {path.endsWith("ai-solutions") && <Flow />}
      {path.endsWith("digital-transformation") && <BeforeAfter />}
      {path.endsWith("startup-support") && <Roadmap />}
    </motion.div>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full overflow-hidden rounded-card border border-border bg-bg p-4">
      {children}
    </div>
  );
}

function Code() {
  const lines = [
    [12, 40, 22],
    [20, 28],
    [20, 18, 30],
    [28, 34],
    [20, 24],
    [12],
  ];
  return (
    <Frame>
      <div className="space-y-2 font-mono">
        {lines.map((segments, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-3 text-[9px] text-fg-subtle">{i + 1}</span>
            {segments.map((w, j) => (
              <span
                key={j}
                className={j === 1 ? "h-1.5 rounded-full bg-accent/70" : "h-1.5 rounded-full bg-fg/15"}
                style={{ width: w * 1.6 }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="absolute right-3 bottom-3 rounded-md border border-border bg-bg-raised px-2 py-1 font-mono text-[9px] text-accent-text">
        ✓ build passed
      </div>
    </Frame>
  );
}

function Flow() {
  return (
    <Frame>
      <svg viewBox="0 0 220 120" className="h-full w-full">
        <path d="M40 60 C 80 60, 80 25, 110 25" className="fill-none stroke-border-strong" strokeWidth="1.5" />
        <path d="M40 60 C 80 60, 80 95, 110 95" className="fill-none stroke-border-strong" strokeWidth="1.5" />
        <path d="M130 25 C 160 25, 160 60, 185 60" className="fill-none stroke-[var(--accent)]" strokeWidth="1.5" />
        <circle cx="34" cy="60" r="10" className="fill-bg-raised stroke-border-strong" />
        <circle cx="120" cy="25" r="10" className="fill-accent-tint stroke-[var(--accent)]" />
        <circle cx="120" cy="95" r="10" className="fill-bg-raised stroke-border-strong" />
        <circle cx="192" cy="60" r="10" className="fill-[var(--spark)]" />
      </svg>
    </Frame>
  );
}

function BeforeAfter() {
  return (
    <Frame>
      <div className="grid h-full grid-cols-2 gap-3">
        <div className="relative rounded-lg border border-dashed border-border-strong">
          {[[10, 12], [52, 30], [22, 62], [58, 70]].map(([x, y], i) => (
            <span key={i} className="absolute size-4 rounded bg-fg/15" style={{ left: `${x}%`, top: `${y}%` }} />
          ))}
          <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-fg-subtle">before</span>
        </div>
        <div className="relative flex flex-col justify-center gap-2 rounded-lg border border-border bg-bg-raised p-2.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-accent" />
              <span className="h-1.5 flex-1 rounded-full bg-fg/15" />
            </span>
          ))}
          <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-accent-text">after</span>
        </div>
      </div>
    </Frame>
  );
}

function Roadmap() {
  const steps = ["Idea", "MVP", "Scale"];
  return (
    <Frame>
      <div className="flex h-full flex-col justify-center">
        <div className="relative flex justify-between">
          <span className="absolute top-2 right-2 left-2 h-px bg-border-strong" />
          <span className="absolute top-2 left-2 h-px w-1/2 bg-[image:var(--grad-brand)]" />
          {steps.map((s, i) => (
            <span key={s} className="relative flex flex-col items-center gap-2">
              <span
                className={
                  i === 1
                    ? "size-4 rounded-full bg-spark ring-4 ring-spark-tint"
                    : i === 0
                      ? "size-4 rounded-full bg-accent"
                      : "size-4 rounded-full border border-border-strong bg-bg-raised"
                }
              />
              <span className="font-mono text-[10px] text-fg-muted">{s}</span>
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}
