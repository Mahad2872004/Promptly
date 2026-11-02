import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Logo from "../../components/Logo";
import { GridBackground } from "../../components/ui";
import { services } from "../../content/navigation";
import { cn } from "../../lib/cn";
import { EASE } from "../../lib/motion";

// Node centres in % of the square map.
const NODES = [
  { x: 22, y: 22 },
  { x: 78, y: 22 },
  { x: 78, y: 66 },
  { x: 22, y: 66 },
];
const CORE = { x: 50, y: 44 };

/** Four services around one core. Hover, focus or tap a node to preview it. */
export function ServiceMap() {
  const [active, setActive] = useState(0);
  const s = services[active];
  return (
    <div className="relative isolate overflow-hidden rounded-frame border border-border bg-bg-raised shadow-elev-3">
      <GridBackground size={36} fade="radial" />
      <div className="relative aspect-[5/4] sm:aspect-[4/3]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          {NODES.map((n, i) => (
            <line
              key={i}
              x1={CORE.x}
              y1={CORE.y}
              x2={n.x}
              y2={n.y}
              vectorEffect="non-scaling-stroke"
              strokeWidth={i === active ? 2 : 1}
              className={i === active ? "ds-flow-dash stroke-[var(--accent)]" : "stroke-border-strong"}
            />
          ))}
        </svg>
        <span
          aria-hidden
          className="absolute flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[24px] border border-border bg-bg shadow-elev-2"
          style={{ left: `${CORE.x}%`, top: `${CORE.y}%` }}
        >
          <Logo size={40} showText={false} />
        </span>
        {services.map((svc, i) => {
          const Icon = svc.icon!;
          const on = i === active;
          return (
            <button
              key={svc.path}
              type="button"
              aria-pressed={on}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={cn(
                "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3.5 py-2.5 text-sm font-medium whitespace-nowrap shadow-elev-1 transition-[background-color,border-color,color,box-shadow] duration-300",
                on
                  ? "border-accent bg-accent text-accent-fg shadow-[0_10px_30px_-10px_var(--accent-glow)]"
                  : "border-border bg-bg-raised text-fg-muted hover:text-fg",
              )}
              style={{ left: `${NODES[i].x}%`, top: `${NODES[i].y}%` }}
            >
              <Icon size={15} aria-hidden />
              {svc.label}
            </button>
          );
        })}
      </div>
      <div className="border-t border-border bg-bg/70 p-5 backdrop-blur sm:p-6" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={s.path}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              <span className="block font-semibold text-fg">{s.label}</span>
              <span className="block text-sm text-fg-muted">{s.description}</span>
            </span>
            <Link
              to={s.path}
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent-text hover:underline"
            >
              Explore <ArrowRight size={14} />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
