import React from "react";
import { Check, GitBranch, TrendingUp } from "lucide-react";

/**
 * Hero visual — an abstract product surface rather than an ambient glow.
 *
 * A software company's hero should show software. This renders a small
 * dashboard mock entirely from tokens: window chrome, a KPI row, a bar
 * series, and a deploy log. Nothing animates on a loop, and the only
 * chromatic element is the single brand accent on the active bars and the
 * status ticks.
 */

const BARS = [38, 52, 44, 66, 58, 79, 71, 92];

const PIPELINE = [
  { label: "build · web-app", meta: "42s", done: true },
  { label: "test · 214 passed", meta: "1m 08s", done: true },
  { label: "deploy · production", meta: "26s", done: true },
];

export default function HeroPanel() {
  return (
    <div className="relative">
      {/* Subtle field behind the panel so it doesn't float on flat white.
          A tinted plate, not a blurred orb. */}
      <div
        aria-hidden
        className="absolute -inset-x-6 -inset-y-6 -z-10 rounded-[var(--r-xl)] bg-[var(--bg-subtle)]"
      />

      <div className="surface-card overflow-hidden shadow-[var(--shadow-lg)]">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--bg-inset)] px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
          </div>
          <span className="mono-label truncate">promptly / operations-console</span>
        </div>

        <div className="p-5 sm:p-6">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--border)]">
            {[
              { label: "Automated tasks", value: "12,480" },
              { label: "Hours saved / mo", value: "310" },
              { label: "Uptime", value: "99.98%" },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-[var(--bg-panel)] px-3 py-3.5">
                <p className="text-base font-bold tracking-tight text-[var(--text-heading)] sm:text-lg">
                  {kpi.value}
                </p>
                <p className="mt-0.5 truncate text-[0.6875rem] text-[var(--text-micro)]">
                  {kpi.label}
                </p>
              </div>
            ))}
          </div>

          {/* Bar series */}
          <div className="mt-5 rounded-[var(--r-md)] border border-[var(--border)] p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[var(--text-heading)]">
                Throughput
              </p>
              <span className="inline-flex items-center gap-1 text-[0.6875rem] font-semibold text-[var(--accent)]">
                <TrendingUp className="h-3 w-3" aria-hidden />
                +34%
              </span>
            </div>

            <div className="mt-4 flex h-24 items-end gap-1.5" aria-hidden>
              {BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-[3px]"
                  style={{
                    height: `${h}%`,
                    // Last three columns carry the accent; the rest are neutral.
                    // Reads as "recent performance" without a second hue.
                    background:
                      i >= BARS.length - 3
                        ? "var(--accent)"
                        : "var(--border-strong)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Pipeline log */}
          <div className="mt-5 rounded-[var(--r-md)] border border-[var(--border)]">
            <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-2.5">
              <GitBranch className="h-3.5 w-3.5 text-[var(--text-micro)]" aria-hidden />
              <span className="mono-label">main · pipeline</span>
              <span className="chip chip-accent ml-auto">Passing</span>
            </div>
            <ul className="divide-y divide-[var(--border)]">
              {PIPELINE.map((step) => (
                <li
                  key={step.label}
                  className="flex items-center gap-2.5 px-4 py-2.5"
                >
                  <Check
                    className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]"
                    aria-hidden
                  />
                  <span className="truncate font-mono text-xs text-[var(--text-body)]">
                    {step.label}
                  </span>
                  <span className="ml-auto shrink-0 font-mono text-[0.6875rem] text-[var(--text-micro)]">
                    {step.meta}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
