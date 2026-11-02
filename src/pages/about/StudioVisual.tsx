import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Box, Code2, MapPin, Workflow } from "lucide-react";
import Logo from "../../components/Logo";
import { GridBackground } from "../../components/ui";
import { EASE } from "../../lib/motion";

function useLahoreTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Karachi",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
  // Starts empty so the pre-rendered HTML (built earlier) matches hydration;
  // the real time fills in on mount.
  const [time, setTime] = useState("");
  useEffect(() => {
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

// Disciplines orbiting the studio pin (positions in % of the panel).
const CHIPS = [
  { label: "Engineering", icon: Code2, x: 16, y: 30 },
  { label: "Automation", icon: Workflow, x: 76, y: 24 },
  { label: "Products", icon: Box, x: 72, y: 78 },
];
const PIN = { x: 44, y: 56 };

/** Abstract "studio in Lahore" composition for the About hero. */
export function StudioVisual() {
  const time = useLahoreTime();
  return (
    <div
      role="img"
      aria-label="Abstract map of Promptly's studio in Lahore, Pakistan, connecting engineering, automation and products."
      className="relative isolate aspect-[5/4] overflow-hidden rounded-frame border border-border bg-bg-raised shadow-elev-3"
    >
      <GridBackground size={36} fade="radial" />

      {/* Abstract streets, ring road and river — not a real map. */}
      <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full" aria-hidden>
        <path
          d="M-10 120 C 80 90, 140 150, 210 120 S 330 40, 520 70"
          className="fill-none stroke-[var(--brand-cyan)] opacity-30"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <ellipse cx="220" cy="225" rx="170" ry="120" className="fill-none stroke-border-strong" strokeWidth="1.5" />
        <ellipse cx="220" cy="225" rx="95" ry="64" className="fill-none stroke-border" strokeWidth="1" />
        {[
          "M40 380 L 220 225 L 470 300",
          "M120 30 L 220 225 L 300 400",
          "M0 260 L 520 200",
        ].map((d) => (
          <path key={d} d={d} className="fill-none stroke-border" strokeWidth="1" />
        ))}
        {CHIPS.map((c) => (
          <line
            key={c.label}
            x1={(PIN.x / 100) * 500}
            y1={(PIN.y / 100) * 400}
            x2={(c.x / 100) * 500}
            y2={(c.y / 100) * 400}
            strokeWidth="1.5"
            className="ds-flow-dash stroke-[var(--accent)] opacity-70"
          />
        ))}
      </svg>

      {/* Pin with pulsing rings */}
      <div
        aria-hidden
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${PIN.x}%`, top: `${PIN.y}%` }}
      >
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
            initial={{ scale: 0.4, opacity: 0.8 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 2.8, repeat: Infinity, delay: i * 1.4, ease: "easeOut" }}
          />
        ))}
        <span className="relative flex size-16 items-center justify-center rounded-[20px] border border-border bg-bg shadow-elev-2">
          <Logo size={34} showText={false} />
        </span>
        <span className="absolute top-full left-1/2 mt-3 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-spark px-2.5 py-1 font-mono text-[10px] font-medium whitespace-nowrap text-spark-fg uppercase">
          <MapPin size={11} /> Lahore
        </span>
      </div>

      {/* Discipline chips */}
      {CHIPS.map((c, i) => {
        const Icon = c.icon;
        return (
          <motion.span
            key={c.label}
            aria-hidden
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.15, duration: 0.5, ease: EASE }}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-border bg-bg-raised px-3.5 py-2 text-sm font-medium whitespace-nowrap text-fg shadow-elev-1"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            <Icon size={14} className="text-accent-icon" /> {c.label}
          </motion.span>
        );
      })}

      {/* Corner readouts */}
      <div className="absolute top-5 left-5 sm:top-6 sm:left-6">
        <p className="font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">Studio</p>
        <p className="mt-1 text-sm font-medium text-fg">Lahore, Pakistan</p>
      </div>
      <div className="absolute top-5 right-5 text-right sm:top-6 sm:right-6">
        <p className="font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">Local time</p>
        <p className="tabular mt-1 text-sm font-medium text-fg">{time || "--:--"} PKT</p>
      </div>
      <p className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase sm:bottom-6 sm:left-6">
        31.5204° N · 74.3587° E
      </p>
    </div>
  );
}
