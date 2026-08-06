import React from "react";
import { ArrowRight } from "lucide-react";
import { ModuleId, accentVars } from "../../theme/tokens";

export interface ProductCardProps {
  /** Zero-based; rendered as a padded "01" index label. */
  index: number;
  accent: ModuleId;
  title: string;
  description: string;
  /** Price or stat line, e.g. "Setup: Custom quote". */
  stat?: string;
  badge?: string;
  icon?: React.ReactNode;
  onClick: () => void;
  /** Announced on the trigger, since "Explore" alone isn't a unique label. */
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Tightened for pinned scenes, where the whole grid must fit one viewport. */
  compact?: boolean;
}

/**
 * Glass card for the Systems scene.
 *
 * Anatomy, top to bottom: index number, status dot + badge, title,
 * one-line description, price/stat line, "Explore →" with an arrow that
 * slides on hover. Border and glow come from the module accent via
 * `accentVars`, so the card never hardcodes a colour.
 */
export default function ProductCard({
  index,
  accent,
  title,
  description,
  stat,
  badge,
  icon,
  onClick,
  ariaLabel,
  className = "",
  style,
  compact = false,
}: ProductCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? `${title} — view details`}
      className={`module-card group flex h-full w-full flex-col justify-between rounded-3xl ${compact ? "p-5" : "p-6"} text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-core)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] ${className}`}
      style={{ ...accentVars(accent), minHeight: compact ? "176px" : "290px", ...style }}
    >
      <div className={compact ? "space-y-2.5" : "space-y-4"}>
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-xs font-bold tracking-widest text-[var(--text-micro)]">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-2">
            <span
              className="accent-dot h-1.5 w-1.5 rounded-full"
              aria-hidden
            />
            {badge && (
              <span className="eyebrow accent-text !text-[0.625rem]">
                {badge}
              </span>
            )}
          </div>
        </div>

        {icon && !compact && (
          <div
            className="inline-flex rounded-2xl p-3.5 transition-transform duration-300 group-hover:scale-110"
            style={{
              background:
                "color-mix(in srgb, var(--accent-core) 12%, transparent)",
            }}
          >
            <span className="accent-text">{icon}</span>
          </div>
        )}

        <h3 className="text-lg font-bold leading-snug text-[var(--text-heading)]">
          {title}
        </h3>

        <p className={`${compact ? "line-clamp-2" : "line-clamp-3"} text-sm leading-relaxed text-[var(--text-body)]`}>
          {description}
        </p>
      </div>

      <div className={compact ? "mt-4 space-y-1.5" : "mt-6 space-y-3"}>
        {stat && (
          <p className="text-xs font-semibold text-[var(--text-micro)]">
            {stat}
          </p>
        )}
        <span className="accent-text flex items-center gap-1.5 text-xs font-bold">
          Explore
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  );
}
