import React, { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { accentVars } from "../../theme/tokens";
import type { AudienceTab } from "../../data/audience";

interface IndustryTabsProps {
  tabs: AudienceTab[];
  /** Called when the active tab has a route and its CTA is used. */
  onExplore?: (tab: AudienceTab) => void;
  className?: string;
}

/**
 * Pill tab selector over a benefit headline and a chip-flow diagram.
 *
 * Everything is client state — switching tabs crossfades the panel, it never
 * refetches or navigates. Implements the WAI-ARIA tabs pattern: roving
 * tabindex, arrow-key/Home/End navigation, and `aria-controls` wiring, so the
 * control is usable without a pointer.
 */
export default function IndustryTabs({
  tabs,
  onExplore,
  className = "",
}: IndustryTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const reduced = useReducedMotion() ?? false;
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];
  if (!active) return null;

  const focusTab = (id: string) => {
    setActiveId(id);
    tabRefs.current[id]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = tabs.findIndex((t) => t.id === activeId);
    if (i < 0) return;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    focusTab(tabs[next].id);
  };

  const slide = reduced ? 0 : 12;

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Choose an audience segment"
        onKeyDown={onKeyDown}
        className="mb-10 flex flex-wrap justify-center gap-2"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              style={accentVars(tab.accent)}
              className="relative rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent-core)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] sm:px-5"
            >
              {/* Shared-layout pill so the active marker glides between tabs. */}
              {isActive && (
                <motion.span
                  layoutId={reduced ? undefined : `${baseId}-pill`}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "color-mix(in srgb, var(--accent-core) 16%, transparent)",
                    border:
                      "1.5px solid color-mix(in srgb, var(--accent-core) 55%, transparent)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className="relative"
                style={{
                  color: isActive ? undefined : "var(--text-micro)",
                }}
              >
                <span className={isActive ? "accent-text" : undefined}>
                  {tab.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div style={accentVars(active.accent)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            id={`${baseId}-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active.id}`}
            tabIndex={0}
            initial={{ opacity: 0, y: slide }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -slide }}
            transition={{ duration: reduced ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="outline-none"
          >
            <p className="mx-auto mb-9 max-w-2xl text-center text-xl font-bold leading-snug text-[var(--text-heading)] sm:text-2xl">
              {active.benefit}
            </p>

            {/* Chip flow. Wraps on narrow screens rather than scrolling
                sideways, so it never fights the page scroll on mobile. */}
            <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
              {active.flow.map((chip, i) => (
                <li key={chip} className="flex items-center gap-2">
                  <span
                    className="rounded-full px-3.5 py-2 text-xs font-semibold backdrop-blur-sm sm:px-4"
                    style={{
                      background:
                        "color-mix(in srgb, var(--accent-core) 10%, var(--card-bg))",
                      border:
                        "1px solid color-mix(in srgb, var(--accent-core) 38%, transparent)",
                      color: "var(--text-heading)",
                    }}
                  >
                    {chip}
                  </span>
                  {i < active.flow.length - 1 && (
                    <ChevronRight
                      aria-hidden
                      className="h-3.5 w-3.5 shrink-0 accent-text opacity-70"
                    />
                  )}
                </li>
              ))}
            </ol>

            {active.route && onExplore && (
              <div className="mt-9 text-center">
                <button
                  type="button"
                  onClick={() => onExplore(active)}
                  className="btn-secondary group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Explore {active.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
