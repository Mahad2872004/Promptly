import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  Bell,
  Check,
  ChefHat,
  Inbox,
  LayoutGrid,
  MessageCircle,
  Package,
  Search,
  Sparkles,
  User,
  Workflow,
} from "lucide-react";
import Logo from "../../components/Logo";
import { DeviceFrame } from "../../components/ui";
import { cn } from "../../lib/cn";
import { EASE } from "../../lib/motion";

const STAGES = [
  { id: "capture", label: "Capture", caption: "A customer request" },
  { id: "connect", label: "Connect", caption: "The right context" },
  { id: "act", label: "Act", caption: "A useful outcome" },
] as const;

/** Cycles 0→1→2 every `ms` while visible; frozen under reduced motion or hover. */
function useStageCycle(ms: number, active: boolean) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setStage((s) => (s + 1) % STAGES.length), ms);
    return () => window.clearInterval(id);
  }, [ms, active]);
  return stage;
}

const swap = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.4, ease: EASE },
};

export function HeroWorkspace() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const visible = useInView(ref, { amount: 0.3 });
  const [hovered, setHovered] = useState(false);
  const stage = useStageCycle(4000, visible && !hovered && !reduced);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const frameY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const tilt = useTransform(scrollYProgress, [0.15, 0.45], [7, 0]);

  return (
    <div
      ref={ref}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      role="img"
      aria-label="Interface concept: an operations workspace capturing a customer order from a message, connecting it to customer and stock context, and acting on it with a confirmation."
      className="relative [perspective:2200px]"
    >
      {/* Desktop: browser workspace with the phone overlapping its corner. */}
      <motion.div
        aria-hidden
        className="hidden md:block"
        style={reduced ? undefined : { y: frameY, rotateX: tilt, transformOrigin: "50% 0%" }}
      >
        <DeviceFrame url="app.promptly.pk/operations" className="rounded-frame">
          <Workspace stage={stage} />
        </DeviceFrame>
      </motion.div>
      {/* The phone sits over the workspace sidebar, which is mostly navigation. */}
      <motion.div
        aria-hidden
        className="mx-auto w-[240px] md:absolute md:-bottom-20 md:-left-8 md:mx-0 md:w-[220px] lg:-left-14 lg:w-[240px]"
        style={reduced ? undefined : { y: phoneY }}
      >
        <DeviceFrame device="phone">
          <PhoneChat stage={stage} />
        </DeviceFrame>
      </motion.div>
    </div>
  );
}

function Workspace({ stage }: { stage: number }) {
  return (
    <div className="grid h-[440px] grid-cols-[200px_1fr] text-left text-sm lg:h-[460px]">
      <aside className="flex flex-col gap-1 border-r border-border bg-bg-sunken/50 p-4">
        <div className="mb-5 flex items-center gap-2 px-2">
          <Logo size={20} showText={false} />
          <span className="font-semibold text-fg">Operations</span>
        </div>
        {[
          [Inbox, "Inbox", true],
          [Workflow, "Workflows", false],
          [Package, "Orders", false],
          [LayoutGrid, "Overview", false],
        ].map(([Icon, label, on]) => {
          const I = Icon as typeof Inbox;
          return (
            <span
              key={label as string}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2 py-2",
                on ? "bg-bg-raised text-fg shadow-elev-1" : "text-fg-muted",
              )}
            >
              <I size={15} /> {label as string}
            </span>
          );
        })}
      </aside>

      <div className="flex min-w-0 flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
          <Stepper stage={stage} />
          <span className="hidden items-center gap-3 text-fg-subtle lg:flex">
            <span className="rounded-md border border-dashed border-border-strong px-2 py-1 font-mono text-[10px] tracking-wider uppercase">
              Interface concept
            </span>
            <Search size={15} />
            <Bell size={15} />
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
          <ul className="space-y-1 border-r border-border p-3">
            {[
              ["Friday order", "Can I get 2 chocolate cakes…", true],
              ["Delivery question", "Do you deliver on weekends?", false],
              ["Catering enquiry", "We need desserts for 40 people", false],
            ].map(([title, text, on]) => (
              <li
                key={title as string}
                className={cn(
                  "rounded-xl border p-3",
                  on ? "border-accent/40 bg-accent-tint" : "border-transparent",
                )}
              >
                <span className="flex items-center justify-between">
                  <span className="font-medium text-fg">{title as string}</span>
                  {on && <span className="size-1.5 rounded-full bg-spark" />}
                </span>
                <span className="mt-1 block truncate text-xs text-fg-muted">{text as string}</span>
              </li>
            ))}
          </ul>

          <div className="relative overflow-hidden p-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={stage} {...swap} className="space-y-3">
                {stage === 0 && <CaptureDetail />}
                {stage === 1 && <ConnectDetail />}
                {stage === 2 && <ActDetail />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stepper({ stage }: { stage: number }) {
  return (
    <ol className="flex items-center gap-2">
      {STAGES.map((s, i) => {
        const done = i < stage;
        const current = i === stage;
        return (
          <li key={s.id} className="flex items-center gap-2">
            <span
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-500",
                current && i === 2 && "border-spark/40 bg-spark-tint text-fg",
                current && i < 2 && "border-accent/40 bg-accent-tint text-fg",
                done && "border-border bg-bg-raised text-fg-muted",
                !current && !done && "border-border text-fg-subtle",
              )}
            >
              <span
                className={cn(
                  "inline-flex size-4 items-center justify-center rounded-full font-mono text-[9px]",
                  current ? (i === 2 ? "bg-spark text-spark-fg" : "bg-accent text-accent-fg") : "bg-fg/10",
                )}
              >
                {done ? <Check size={10} /> : i + 1}
              </span>
              {s.label}
              <span className="hidden text-fg-subtle xl:inline">· {s.caption}</span>
            </span>
            {i < STAGES.length - 1 && (
              <span className="relative h-px w-6 overflow-hidden bg-border-strong">
                <span
                  className={cn(
                    "absolute inset-0 origin-left bg-accent transition-transform duration-700",
                    i < stage ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">{children}</p>;
}

function CaptureDetail() {
  return (
    <>
      <Label>New message · WhatsApp</Label>
      <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-border bg-bg-raised p-4 text-fg shadow-elev-1">
        Hi! Can I get 2 chocolate cakes for Friday afternoon?
      </div>
      <Label>Captured details</Label>
      <div className="flex flex-wrap gap-2">
        {["Chocolate cake × 2", "Friday, afternoon", "Delivery"].map((chip, i) => (
          <motion.span
            key={chip}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.3, ease: EASE }}
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent-tint px-3 py-1 text-xs text-accent-text"
          >
            <Sparkles size={11} /> {chip}
          </motion.span>
        ))}
      </div>
    </>
  );
}

function ConnectDetail() {
  return (
    <>
      <Label>Context from your systems</Label>
      {[
        [User, "Returning customer", "4 previous orders"],
        [Package, "Stock available", "6 chocolate cakes left"],
        [ChefHat, "Friday slot open", "Kitchen capacity 2–5 pm"],
      ].map(([Icon, title, text], i) => {
        const I = Icon as typeof User;
        return (
          <motion.div
            key={title as string}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.18, duration: 0.35, ease: EASE }}
            className="flex items-center gap-3 rounded-xl border border-border bg-bg-raised p-3 shadow-elev-1"
          >
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-bg-sunken text-accent-icon">
              <I size={15} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium text-fg">{title as string}</span>
              <span className="block text-xs text-fg-muted">{text as string}</span>
            </span>
            <Check size={15} className="text-accent-icon" />
          </motion.div>
        );
      })}
    </>
  );
}

function ActDetail() {
  return (
    <>
      <Label>Next action</Label>
      <div className="rounded-2xl border border-spark/30 bg-bg-raised p-4 shadow-elev-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-fg">Order #2041 created</span>
          <span className="rounded-full bg-spark px-2 py-0.5 font-mono text-[10px] text-spark-fg uppercase">Done</span>
        </div>
        <p className="mt-1 text-xs text-fg-muted">2 × Chocolate cake · Friday 3 pm · Delivery</p>
      </div>
      {["Confirmation sent on WhatsApp", "Kitchen notified", "Added to Friday deliveries"].map((t, i) => (
        <motion.p
          key={t}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.15 }}
          className="flex items-center gap-2 text-fg-muted"
        >
          <Check size={14} className="text-accent-icon" /> {t}
        </motion.p>
      ))}
      <p className="flex items-center gap-2 pt-1 text-xs text-fg-subtle">
        <User size={12} /> Human review: not needed — within your rules
      </p>
    </>
  );
}

function PhoneChat({ stage }: { stage: number }) {
  return (
    <div className="flex h-full flex-col bg-bg-sunken text-[11px]">
      <div className="flex items-center gap-2 border-b border-border bg-bg-raised px-3 pt-11 pb-2.5">
        <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent-tint text-accent-icon">
          <MessageCircle size={14} />
        </span>
        <span>
          <span className="block font-semibold text-fg">Your business</span>
          <span className="block text-[10px] text-fg-subtle">Replies instantly</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2 p-3">
        <span className="self-center rounded-full bg-bg-raised px-2.5 py-0.5 text-[9px] text-fg-subtle">Today</span>
        <div className="max-w-[85%] self-start rounded-2xl rounded-bl-sm border border-border bg-bg-raised px-3 py-2 text-fg">
          Welcome back! 👋 What can we get for you?
        </div>
        <div className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-accent px-3 py-2 text-accent-fg">
          Hi! Can I get 2 chocolate cakes for Friday afternoon?
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {stage === 1 && (
            <motion.div key="typing" {...swap} className="flex w-12 gap-1 self-start rounded-2xl bg-bg-raised px-3 py-2.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-1.5 rounded-full bg-fg-subtle"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </motion.div>
          )}
          {stage === 2 && (
            <motion.div
              key="reply"
              {...swap}
              className="max-w-[88%] self-start rounded-2xl rounded-bl-sm border border-border bg-bg-raised px-3 py-2 text-fg"
            >
              Done! Order #2041 is confirmed for Friday, 3 pm. 🎂
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="m-3 mt-0 rounded-full border border-border bg-bg-raised px-3 py-2 text-fg-subtle">Message</div>
    </div>
  );
}
