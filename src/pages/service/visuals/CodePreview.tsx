import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Package } from "lucide-react";
import { cn } from "../../../lib/cn";
import { EASE } from "../../../lib/motion";

type Seg = [string, string?];
// Hand-tokenised so highlighting stays theme-aware without a highlighter library.
const K = "text-[var(--brand-orange)]"; // keywords
const T = "text-accent-text"; // components / tags
const S = "text-fg-subtle"; // punctuation
const LINES: Seg[][] = [
  [["export function ", K], ["OrderStatus", T], ["({ order }) {", S]],
  [["  return (", S]],
  [["    <", S], ["Card", T], [">", S]],
  [["      <", S], ["Title", T], [">{order.id}</", S], ["Title", T], [">", S]],
  [["      <", S], ["Badge", T], [">{order.status}</", S], ["Badge", T], [">", S]],
  [["      <", S], ["Progress", T], [" value={order.pct} />", S]],
  [["    </", S], ["Card", T], [">", S]],
  [["  );", S]],
  [["}", S]],
];

/** Editor types a component; the live preview fills in as each line lands. */
export function CodePreview() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion();
  const [lines, setLines] = useState(reduced ? LINES.length : 0);

  useEffect(() => {
    if (reduced) return setLines(LINES.length);
    if (!visible) return;
    const id = window.setInterval(() => {
      // Type one line at a time, hold the finished state, then start over.
      setLines((n) => (n >= LINES.length + 6 ? 0 : n + 1));
    }, 420);
    return () => window.clearInterval(id);
  }, [visible, reduced]);

  const shown = Math.min(lines, LINES.length);
  return (
    <div
      ref={ref}
      role="img"
      aria-label="A code editor writing an order status component, with a live preview updating beside it."
      className="overflow-hidden rounded-frame border border-border bg-bg-raised shadow-elev-3"
    >
      <div aria-hidden className="flex items-center gap-2 border-b border-border bg-bg-sunken/60 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2.5 rounded-full bg-border-strong" />
        ))}
        <span className="ml-3 rounded-md bg-bg-raised px-2.5 py-1 font-mono text-[11px] text-fg-muted">
          OrderStatus.tsx
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-fg-subtle">
          <span className="size-1.5 animate-pulse rounded-full bg-accent" /> live preview
        </span>
      </div>
      <div aria-hidden className="grid sm:grid-cols-[1.25fr_1fr]">
        <pre className="min-h-[260px] overflow-hidden border-border p-5 font-mono text-[12px] leading-6 sm:border-r">
          {LINES.map((segs, i) => (
            <div key={i} className={cn("flex transition-opacity duration-200", i < shown ? "opacity-100" : "opacity-0")}>
              <span className="mr-4 w-4 shrink-0 text-right text-fg-subtle/60 select-none">{i + 1}</span>
              <span className="whitespace-pre">
                {segs.map(([text, cls], j) => (
                  <span key={j} className={cls ?? "text-fg"}>
                    {text}
                  </span>
                ))}
              </span>
              {i === shown - 1 && shown < LINES.length && (
                <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-accent" />
              )}
            </div>
          ))}
        </pre>
        <div className="flex items-center justify-center border-t border-border bg-bg p-6 sm:border-t-0">
          <div className="w-full max-w-[240px] rounded-card border border-border bg-bg-raised p-5 shadow-elev-2">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-bg-sunken text-accent-icon">
                <Package size={15} />
              </span>
              <AnimatePresence>
                {shown >= 4 && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="font-semibold text-fg"
                  >
                    Order #2041
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-4 h-6">
              <AnimatePresence>
                {shown >= 5 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="inline-flex rounded-full bg-spark px-2.5 py-1 font-mono text-[10px] font-medium text-spark-fg uppercase"
                  >
                    Out for delivery
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-bg-sunken">
              <motion.div
                className="h-full rounded-full bg-accent"
                animate={{ width: shown >= 6 ? "72%" : "0%" }}
                transition={{ duration: 0.8, ease: EASE }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
