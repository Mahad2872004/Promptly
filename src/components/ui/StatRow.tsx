import React from "react";

export interface StatRowProps {
  stats: { value: string; label: string; icon?: React.ReactNode }[];
  className?: string;
}

/**
 * Metric strip: hairline-divided cells on one surface, not four separate
 * glowing cards. The `gap-px` over a border-coloured background is how every
 * divided grid on the site is built, so the rule weight matches everywhere.
 */
export default function StatRow({ stats, className = "" }: StatRowProps) {
  return (
    <div
      className={`grid grid-cols-2 gap-px overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--border)] md:grid-cols-4 ${className}`}
    >
      {stats.map((s) => (
        <div key={s.label} className="bg-[var(--bg-panel)] p-6">
          {s.icon && (
            <span className="mb-3 inline-flex text-[var(--accent)]">{s.icon}</span>
          )}
          <p className="text-2xl font-bold tracking-tight text-[var(--text-heading)]">
            {s.value}
          </p>
          <p className="mt-1 text-xs leading-snug text-[var(--text-micro)]">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
