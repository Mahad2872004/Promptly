import React from "react";
import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { ModuleId, accentVars } from "../../theme/tokens";
import { REVEAL_VIEWPORT, revealVariants, staggerVariants } from "../../motion/reveal";

export interface PipelineStep {
  id: string;
  /** Displayed as-is, e.g. "01". Falls back to the index. */
  number?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  accent: ModuleId;
}

interface PipelineTimelineProps {
  steps: PipelineStep[];
  className?: string;
}

/**
 * Connected process pipeline: labelled nodes joined by a thin glowing line,
 * with a dot travelling along the path on a loop.
 *
 * Vertical at every breakpoint. The brief allowed a horizontal variant on
 * mobile, but a horizontal pipeline on a narrow screen either overflows or
 * needs its own scroll container fighting the page scroll — a vertical rail
 * reads the same and costs nothing.
 *
 * Renders N nodes, so extending the process is a data change, not a layout one.
 */
export default function PipelineTimeline({
  steps,
  className = "",
}: PipelineTimelineProps) {
  const reduced = useReducedMotion() ?? false;

  const item = revealVariants("fade-up", reduced);
  const container = staggerVariants(0.12, reduced);

  return (
    <motion.ol
      className={`relative mx-auto max-w-3xl ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
    >
      {/* The rail. Sits under the nodes, inset to line up with node centres. */}
      <div
        aria-hidden
        className="absolute bottom-8 left-[1.4375rem] top-8 w-px sm:left-[1.9375rem]"
        style={{
          background:
            "linear-gradient(180deg, var(--mod-ai-core), var(--mod-dev-deep) 50%, var(--mod-product-core))",
          opacity: 0.45,
        }}
      />

      {/* Travelling glow. Pure CSS transform loop — no JS per frame. */}
      {!reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-8 left-[1.4375rem] top-8 w-px overflow-visible sm:left-[1.9375rem]"
        >
          <span className="pipeline-pulse" />
        </div>
      )}

      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <motion.li
            key={step.id}
            variants={item}
            className="relative flex gap-5 pb-10 last:pb-0 sm:gap-6"
            style={accentVars(step.accent)}
          >
            {/* Node */}
            <div className="relative z-10 shrink-0">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl backdrop-blur-sm sm:h-16 sm:w-16"
                style={{
                  background:
                    "color-mix(in srgb, var(--accent-core) 14%, var(--bg-panel))",
                  border:
                    "1.5px solid color-mix(in srgb, var(--accent-core) 45%, transparent)",
                  boxShadow:
                    "0 0 22px -6px color-mix(in srgb, var(--accent-core) 60%, transparent)",
                }}
              >
                {Icon ? (
                  <Icon
                    className="h-5 w-5 sm:h-7 sm:w-7 accent-text"
                    strokeWidth={1.6}
                  />
                ) : (
                  <span className="accent-text font-mono text-sm font-bold">
                    {step.number ?? String(i + 1).padStart(2, "0")}
                  </span>
                )}
              </div>
            </div>

            <div className="min-w-0 flex-1 pt-1 sm:pt-2.5">
              <div className="mb-1.5 flex items-center gap-2.5">
                <span className="accent-dot h-1.5 w-1.5 rounded-full" aria-hidden />
                <span className="eyebrow">
                  {step.number ?? String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-heading)] sm:text-xl">
                {step.title}
              </h3>
              {step.description && (
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-body)]">
                  {step.description}
                </p>
              )}
            </div>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
