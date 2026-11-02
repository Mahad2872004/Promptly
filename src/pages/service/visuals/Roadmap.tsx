import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { FlaskConical, Lightbulb, Rocket, Ruler, TrendingUp } from "lucide-react";
import { GridBackground } from "../../../components/ui";
import { cn } from "../../../lib/cn";
import { EASE } from "../../../lib/motion";

const STAGES = [
  { label: "Idea", icon: Lightbulb, title: "What problem, for whom?", text: "Pin down the assumption the product has to prove." },
  { label: "Scope", icon: Ruler, title: "A one-week scope sprint", text: "A defined MVP, a technical approach and a fixed price." },
  { label: "MVP", icon: FlaskConical, title: "Weekly deployable builds", text: "Real users see progress while the rest is built." },
  { label: "Launch", icon: Rocket, title: "Live and instrumented", text: "Measure what people actually do, not what we guessed." },
  { label: "Scale", icon: TrendingUp, title: "Grow without a rewrite", text: "Architecture and team move when the usage says so." },
];

/** Idea → MVP → scale roadmap with a travelling progress marker. */
export function Roadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(2);

  useEffect(() => {
    if (!visible || reduced) return;
    const id = window.setInterval(() => setStage((s) => (s + 1) % STAGES.length), 2800);
    return () => window.clearInterval(id);
  }, [visible, reduced]);

  const s = STAGES[stage];
  const Icon = s.icon;
  return (
    <div
      ref={ref}
      role="img"
      aria-label="Roadmap from idea to scope, MVP, launch and scale."
      className="relative isolate overflow-hidden rounded-frame border border-border bg-bg-raised p-6 shadow-elev-3 sm:p-8"
    >
      <GridBackground size={32} fade="radial" />
      <div aria-hidden>
        <p className="font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">Product roadmap</p>
        <div className="mt-5 min-h-[132px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className={cn(
                "rounded-card border bg-bg p-5 shadow-elev-1",
                stage === 2 ? "border-spark/40" : "border-accent/40",
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-control",
                    stage === 2 ? "bg-spark-tint text-spark" : "bg-accent-tint text-accent-icon",
                  )}
                >
                  <Icon size={18} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
                    Stage {stage + 1} · {s.label}
                  </span>
                  <span className="block font-semibold text-fg">{s.title}</span>
                </span>
              </div>
              <p className="mt-3 text-sm text-fg-muted">{s.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mt-10 px-3">
          <span className="absolute top-[7px] right-3 left-3 h-0.5 rounded-full bg-border" />
          <motion.span
            className="absolute top-[7px] left-3 h-0.5 rounded-full bg-[image:var(--grad-brand)]"
            animate={{ width: `calc(${(stage / (STAGES.length - 1)) * 100}% - ${(stage / (STAGES.length - 1)) * 24}px)` }}
            transition={{ duration: 0.7, ease: EASE }}
          />
          <ol className="relative flex justify-between">
            {STAGES.map((st, i) => (
              <li key={st.label} className="flex flex-col items-center gap-2.5">
                <span
                  className={cn(
                    "size-4 rounded-full border-2 transition-colors duration-500",
                    i === stage
                      ? i === 2
                        ? "border-spark bg-spark ring-4 ring-spark-tint"
                        : "border-accent bg-accent ring-4 ring-accent-tint"
                      : i < stage
                        ? "border-accent bg-accent"
                        : "border-border-strong bg-bg-raised",
                  )}
                />
                <span className={cn("text-xs font-medium", i === stage ? "text-fg" : "text-fg-subtle")}>
                  {st.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
