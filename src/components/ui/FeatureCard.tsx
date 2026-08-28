import React from "react";
import { Check } from "lucide-react";

export interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  /** Rendered as a ticked list under a hairline divider. */
  features?: string[];
  /** Rendered as chips instead of a ticked list. */
  tags?: string[];
  /** Small right-aligned label in the card header. */
  badge?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

/**
 * The one card the site uses for a feature, capability or offering.
 *
 * Flat surface, hairline border, one icon tile in the single brand accent.
 * Every page previously rolled its own — each with a different gradient fill,
 * blurred corner glow and hue — which is the pattern this replaces.
 */
export default function FeatureCard({
  icon,
  title,
  description,
  features,
  tags,
  badge,
  footer,
  onClick,
  className = "",
}: FeatureCardProps) {
  const interactive = typeof onClick === "function";

  return (
    <article
      {...(interactive
        ? { onClick, role: "button", tabIndex: 0 }
        : {})}
      className={`surface-card flex h-full flex-col p-6 ${
        interactive ? "card-interactive cursor-pointer" : ""
      } ${className}`}
    >
      {(icon || badge) && (
        <div className="flex items-start justify-between gap-4">
          {icon && <span className="icon-tile">{icon}</span>}
          {badge && <span className="chip">{badge}</span>}
        </div>
      )}

      <h3
        className={`text-base font-semibold tracking-tight text-[var(--text-heading)] ${
          icon || badge ? "mt-5" : ""
        }`}
      >
        {title}
      </h3>

      <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-body)]">
        {description}
      </p>

      {features && features.length > 0 && (
        <ul className="mt-5 space-y-2 border-t border-[var(--border)] pt-5">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 text-sm text-[var(--text-body)]"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                aria-hidden
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}

      {tags && tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--border)] pt-5">
          {tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      )}

      {footer && <div className="mt-auto pt-6">{footer}</div>}
    </article>
  );
}
