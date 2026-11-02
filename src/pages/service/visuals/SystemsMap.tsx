import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Logo from "../../../components/Logo";
import { GridBackground } from "../../../components/ui";
import { cn } from "../../../lib/cn";
import { EASE } from "../../../lib/motion";

const TOOLS = ["Spreadsheets", "WhatsApp", "Email", "POS", "Accounting"];

// viewBox 400 × 300. Before: scattered. After: arranged around the hub.
const BEFORE = [
  [70, 70],
  [300, 52],
  [190, 150],
  [330, 225],
  [80, 238],
];
const HUB = [200, 150];
const AFTER = TOOLS.map((_, i) => {
  const a = (-90 + (360 / TOOLS.length) * i) * (Math.PI / 180);
  return [HUB[0] + Math.cos(a) * 128, HUB[1] + Math.sin(a) * 102];
});
// Ad-hoc, duplicated connections between tools before the change.
const TANGLE = [
  [0, 2],
  [0, 3],
  [1, 4],
  [1, 2],
  [2, 4],
  [3, 0],
  [4, 1],
];

const transition = { duration: 1.1, ease: EASE };

/** Before/after systems map: scattered tools → one connected system. */
export function SystemsMap() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion();
  const [after, setAfter] = useState(false);

  useEffect(() => {
    if (!visible || reduced) return;
    const id = window.setInterval(() => setAfter((v) => !v), 3800);
    return () => window.clearInterval(id);
  }, [visible, reduced]);

  const pos = after ? AFTER : BEFORE;
  return (
    <div
      ref={ref}
      role="img"
      aria-label="Before: spreadsheets, WhatsApp, email, POS and accounting tools connected ad hoc. After: all of them connected through one system."
      className="relative isolate overflow-hidden rounded-frame border border-border bg-bg-raised p-5 shadow-elev-3 sm:p-6"
    >
      <GridBackground size={32} fade="radial" />
      <div aria-hidden className="flex items-center justify-between">
        <span className="inline-flex rounded-full border border-border bg-bg-sunken p-1 text-xs font-medium">
          {["Before", "After"].map((label, i) => (
            <span
              key={label}
              className={cn(
                "rounded-full px-3 py-1 transition-colors duration-500",
                after === (i === 1) ? (i ? "bg-accent text-accent-fg" : "bg-spark text-spark-fg") : "text-fg-muted",
              )}
            >
              {label}
            </span>
          ))}
        </span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
          {after ? "One connected flow" : "Copy, paste, repeat"}
        </span>
      </div>

      <svg aria-hidden viewBox="0 0 400 300" className="mt-3 w-full">
        {/* Tangled links (fade out) */}
        {TANGLE.map(([a, b], i) => (
          <motion.line
            key={`t${i}`}
            initial={false}
            animate={{
              x1: pos[a][0],
              y1: pos[a][1],
              x2: pos[b][0],
              y2: pos[b][1],
              opacity: after ? 0 : 0.7,
            }}
            transition={transition}
            strokeWidth="1.2"
            strokeDasharray="3 5"
            className="stroke-[var(--spark)]"
          />
        ))}
        {/* Clean links to the hub (fade in) */}
        {TOOLS.map((_, i) => (
          <motion.line
            key={`h${i}`}
            initial={false}
            animate={{ x1: HUB[0], y1: HUB[1], x2: pos[i][0], y2: pos[i][1], opacity: after ? 1 : 0 }}
            transition={transition}
            strokeWidth="1.5"
            className="ds-flow-dash stroke-[var(--accent)]"
          />
        ))}
        {/* Hub */}
        <motion.g initial={false} animate={{ opacity: after ? 1 : 0, scale: after ? 1 : 0.6 }} transition={transition} style={{ transformOrigin: "200px 150px" }}>
          <rect x={HUB[0] - 30} y={HUB[1] - 30} width="60" height="60" rx="18" className="fill-bg stroke-[var(--accent)]" strokeWidth="1.5" />
          <foreignObject x={HUB[0] - 16} y={HUB[1] - 16} width="32" height="32">
            <Logo size={32} showText={false} />
          </foreignObject>
        </motion.g>
        {/* Tool pills */}
        {TOOLS.map((name, i) => {
          const w = name.length * 6.6 + 24;
          return (
            <motion.g key={name} initial={false} animate={{ x: pos[i][0] - w / 2, y: pos[i][1] - 14 }} transition={transition}>
              <rect
                width={w}
                height="28"
                rx="14"
                className={cn(
                  "fill-bg-raised transition-[stroke] duration-700",
                  after ? "stroke-[var(--accent)]" : "stroke-border-strong",
                )}
                strokeWidth="1"
              />
              <text x={w / 2} y="18.5" textAnchor="middle" className="fill-fg text-[11px] font-medium">
                {name}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
