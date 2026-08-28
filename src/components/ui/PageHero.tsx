import React from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export interface PageHeroAction {
  label: string;
  onClick: () => void;
}

export interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  primary?: PageHeroAction;
  secondary?: PageHeroAction;
  /** Optional metric strip rendered under the copy. */
  stats?: { value: string; label: string }[];
  /** Breadcrumb-style parent label, e.g. "Services". */
  parent?: string;
}

/**
 * Standard hero band for every route except the homepage.
 *
 * Left-aligned, on the subtle surface, with a hairline base border. Replaces
 * the previous per-page combination of an ambient orb, a pill badge with a
 * ping animation, a script tagline, and a two-tone gradient headline — each
 * page had its own colour, which is what made the site read as a collection
 * of templates rather than one product.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  primary,
  secondary,
  stats,
  parent,
}: PageHeroProps) {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <div className="container-page py-16 md:py-20">
        <ScrollReveal animation="fade-up">
          <p className="eyebrow">
            {parent ? `${parent} — ${eyebrow}` : eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={60}>
          <h1 className="display-heading mt-5 max-w-3xl text-[2.25rem] sm:text-5xl">
            {title}
          </h1>
        </ScrollReveal>

        {lead && (
          <ScrollReveal animation="fade-up" delay={120}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-body)]">
              {lead}
            </p>
          </ScrollReveal>
        )}

        {(primary || secondary) && (
          <ScrollReveal animation="fade-up" delay={180}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {primary && (
                <button
                  type="button"
                  onClick={primary.onClick}
                  className="btn btn-primary group px-6 py-3.5"
                >
                  {primary.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              )}
              {secondary && (
                <button
                  type="button"
                  onClick={secondary.onClick}
                  className="btn btn-secondary px-6 py-3.5"
                >
                  {secondary.label}
                </button>
              )}
            </div>
          </ScrollReveal>
        )}

        {stats && stats.length > 0 && (
          <ScrollReveal animation="fade-up" delay={240}>
            <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-8 border-t border-[var(--border)] pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <p className="text-2xl font-bold tracking-tight text-[var(--text-heading)]">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-[var(--text-micro)]">
                      {s.label}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
