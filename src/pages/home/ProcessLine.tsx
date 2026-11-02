import React from "react";
import { motion } from "motion/react";
import { Button, SectionHeader, Stagger, StaggerItem } from "../../components/ui";
import { processSteps } from "../../content/process";
import { EASE } from "../../lib/motion";

/** Compact one-line version of the process. The full story is on /process. */
export function ProcessLine() {
  return (
    <section className="section-y border-t border-border" aria-labelledby="how-we-work">
      <div className="wrap">
        <SectionHeader
          id="how-we-work"
          index="04"
          eyebrow="How we work"
          title={
            <>
              From the right question
              <br />
              to the right solution.
            </>
          }
          lead="Clear decisions. Visible progress. A shared understanding of what we’re building and why."
          action={
            <Button variant="link" to="/process" iconRight>
              See how we work
            </Button>
          }
          align="split"
        />

        <div className="relative mt-16">
          {/* Connector: fills left→right (top→bottom on mobile) once in view. */}
          <div aria-hidden className="absolute top-5 right-[10%] left-[10%] hidden h-px bg-border md:block">
            <motion.div
              className="h-full origin-left bg-[image:var(--grad-brand)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.4, ease: EASE }}
            />
          </div>
          <div aria-hidden className="absolute top-5 bottom-5 left-5 w-px bg-border md:hidden" />
          <Stagger as="ol" className="grid gap-8 md:grid-cols-5 md:gap-6">
            {processSteps.map((s, i) => (
              <StaggerItem as="li" key={s.id} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
                <span
                  className={
                    "relative z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full border font-mono text-xs " +
                    (i === 0
                      ? "border-spark bg-spark text-spark-fg"
                      : "border-border-strong bg-bg text-fg-muted")
                  }
                >
                  0{i + 1}
                </span>
                <span className="md:mt-5">
                  <span className="block text-lg font-semibold text-fg">{s.title}</span>
                  <span className="mt-1 block text-fg-muted md:text-sm">{s.text}</span>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
