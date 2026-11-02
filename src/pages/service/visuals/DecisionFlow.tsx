import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, Mail, MessageCircle, Sparkles, UserRound, Globe } from "lucide-react";
import Logo from "../../../components/Logo";
import { GridBackground } from "../../../components/ui";
import { cn } from "../../../lib/cn";
import { EASE } from "../../../lib/motion";

/** Route 0 = Automate, 1 = Human review. */
const EVENTS = [
  { icon: MessageCircle, channel: "WhatsApp", text: "New order: 3 boxes for Saturday", reason: "Matches your order rules", route: 0 },
  { icon: Mail, channel: "Email", text: "Refund request above the usual limit", reason: "Outside policy — needs a person", route: 1 },
  { icon: Globe, channel: "Web form", text: "Pricing enquiry from a returning client", reason: "Known customer · high intent", route: 0 },
] as const;

const fade = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.35, ease: EASE },
};

/** Business event → intelligence with context → the right next action. */
export function DecisionFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!visible || reduced) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % EVENTS.length), 3600);
    return () => window.clearInterval(id);
  }, [visible, reduced]);

  const e = EVENTS[i];
  const EventIcon = e.icon;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Diagram: a business event is checked against context, then either automated or sent to a person for review."
      className="relative isolate overflow-hidden rounded-frame border border-border bg-bg-raised p-6 shadow-elev-3 sm:p-8"
    >
      <GridBackground size={32} fade="radial" />
      <div aria-hidden className="mx-auto flex max-w-md flex-col items-center">
        {/* 1. Event */}
        <p className="self-start font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">Business event</p>
        <div className="mt-3 w-full overflow-hidden rounded-card border border-border bg-bg p-4 shadow-elev-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={i} {...fade} className="flex items-center gap-3">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-bg-sunken text-accent-icon">
                <EventIcon size={16} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-fg-subtle">{e.channel}</span>
                <span className="block truncate font-medium text-fg">{e.text}</span>
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <svg viewBox="0 0 10 48" className="h-12 w-2.5">
          <line x1="5" y1="0" x2="5" y2="48" strokeWidth="2" className="ds-flow-dash stroke-[var(--accent)]" />
        </svg>

        {/* 2. Intelligence */}
        <div className="w-full rounded-card border border-accent/40 bg-bg p-4 shadow-[0_12px_40px_-16px_var(--accent-glow)]">
          <div className="flex items-center gap-3">
            <Logo size={32} showText={false} />
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
                Intelligence with context
              </span>
              <span className="block font-semibold text-fg">The right next action.</span>
            </span>
            <Sparkles size={16} className="text-accent-icon" />
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={i}
              {...fade}
              className="mt-3 rounded-lg bg-bg-sunken px-3 py-2 text-xs text-fg-muted"
            >
              {e.reason}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Branches */}
        {/* Branch ends sit on the centres of the two destination columns. */}
        <svg viewBox="0 0 200 56" className="h-14 w-full" preserveAspectRatio="none">
          {[
            "M100 0 C100 30, 49 26, 49 56",
            "M100 0 C100 30, 151 26, 151 56",
          ].map((d, b) => (
            <path
              key={b}
              d={d}
              fill="none"
              vectorEffect="non-scaling-stroke"
              strokeWidth={b === e.route ? 2 : 1}
              className={cn(
                "transition-[stroke] duration-500",
                b === e.route
                  ? cn("ds-flow-dash", b === 0 ? "stroke-[var(--accent)]" : "stroke-[var(--spark)]")
                  : "stroke-border-strong",
              )}
            />
          ))}
        </svg>

        {/* 3. Destinations */}
        <div className="grid w-full grid-cols-2 gap-3">
          {[
            { icon: Check, title: "Automate", text: "Repeatable work" },
            { icon: UserRound, title: "Human review", text: "Considered decisions" },
          ].map((d, b) => {
            const on = b === e.route;
            const Icon = d.icon;
            return (
              <div
                key={d.title}
                className={cn(
                  "rounded-card border p-4 transition-[border-color,background-color,box-shadow] duration-500",
                  on
                    ? b === 0
                      ? "border-accent/50 bg-accent-tint shadow-elev-1"
                      : "border-spark/50 bg-spark-tint shadow-elev-1"
                    : "border-border bg-bg",
                )}
              >
                <Icon size={16} className={on ? (b === 0 ? "text-accent-icon" : "text-spark") : "text-fg-subtle"} />
                <span className="mt-2 block font-medium text-fg">{d.title}</span>
                <span className="block text-xs text-fg-muted">{d.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
