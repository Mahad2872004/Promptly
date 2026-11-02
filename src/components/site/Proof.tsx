import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, Marquee, SectionHeader, Stat } from "../ui";
import { clients, outcomes, testimonials } from "../../content/proof";
import { EASE } from "../../lib/motion";

/**
 * Client logo strip. Falls back to a plain capability strip while
 * content/proof.ts has no clients — never placeholder logos.
 */
export function TrustStrip() {
  if (clients.length) {
    return (
      <div className="wrap py-12">
        <p className="mb-8 text-center text-sm text-fg-subtle">Teams we’ve built with</p>
        <Marquee label="Clients">
          {clients.map((c) => (
            <img key={c.name} src={c.logo} alt={c.name} className="h-7 w-auto opacity-70 grayscale" loading="lazy" />
          ))}
        </Marquee>
      </div>
    );
  }
  return (
    <div className="wrap py-10">
      <ul className="grid grid-cols-2 gap-y-3 text-center text-[0.9375rem] text-fg-muted sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8">
        {["Web apps", "AI automation", "Integrations", "Product strategy"].map((item, i) => (
          <li key={item} className="sm:flex sm:items-center sm:gap-8">
            {i > 0 && <span aria-hidden className="hidden size-1 rounded-full bg-border-strong sm:block" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Testimonials carousel + outcome stats. Renders nothing until real data exists. */
export function ProofSection({ index }: { index?: string }) {
  const [i, setI] = useState(0);
  if (!testimonials.length && !outcomes.length) return null;
  const t = testimonials[i];
  return (
    <section className="section-y border-t border-border" aria-labelledby="proof">
      <div className="wrap">
        <SectionHeader id="proof" index={index} eyebrow="Proof" title="What working together looks like." />
        {outcomes.length > 0 && (
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {outcomes.slice(0, 3).map((o, n) => (
              <Stat key={o.label} value={o.value} label={o.label} emphasis={n === 0} />
            ))}
          </div>
        )}
        {t && (
          <Card size="panel" className="mt-14">
            <Quote size={28} className="text-accent-icon" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <blockquote className="mt-6 text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug text-fg">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-fg-muted">
                  <strong className="font-medium text-fg">{t.name}</strong> · {t.role}, {t.company}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
            {testimonials.length > 1 && (
              <div className="mt-8 flex gap-2">
                {[
                  [ChevronLeft, "Previous", -1],
                  [ChevronRight, "Next", 1],
                ].map(([Icon, label, step]) => {
                  const I = Icon as typeof ChevronLeft;
                  return (
                    <button
                      key={label as string}
                      type="button"
                      aria-label={`${label} testimonial`}
                      onClick={() =>
                        setI((n) => (n + (step as number) + testimonials.length) % testimonials.length)
                      }
                      className="inline-flex size-10 items-center justify-center rounded-full border border-border text-fg-muted hover:text-fg"
                    >
                      <I size={18} />
                    </button>
                  );
                })}
              </div>
            )}
          </Card>
        )}
      </div>
    </section>
  );
}
