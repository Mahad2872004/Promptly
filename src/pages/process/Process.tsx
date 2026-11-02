import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Check, Eye, LayoutDashboard, MessagesSquare, UserRound } from "lucide-react";
import {
  Button,
  Card,
  Eyebrow,
  GlowOrb,
  GridBackground,
  LineReveal,
  Reveal,
  Rise,
  SectionHeader,
  Stagger,
  StaggerItem,
} from "../../components/ui";
import { ClosingCTA } from "../../components/site/ClosingCTA";
import { processSteps, workingTogether } from "../../content/process";
import { cn } from "../../lib/cn";
import { EASE } from "../../lib/motion";

const COLUMNS = ["To do", "In review", "Done"];

/** Hero: a small board where one work item travels to Done, on a loop. */
function ReviewBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion();
  const [col, setCol] = useState(1);

  useEffect(() => {
    if (!visible || reduced) return;
    const id = window.setInterval(() => setCol((c) => (c + 1) % 3), 2400);
    return () => window.clearInterval(id);
  }, [visible, reduced]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="A project board where a work item moves from to do, to review, to done."
      className="relative isolate overflow-hidden rounded-frame border border-border bg-bg-raised p-5 shadow-elev-3 sm:p-6"
    >
      <GridBackground size={32} fade="radial" />
      <div aria-hidden className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">Milestone 2 · Build</span>
        <span className="flex items-center gap-1.5 rounded-full bg-accent-tint px-2.5 py-1 text-xs text-accent-text">
          <Eye size={12} /> Visible to you
        </span>
      </div>
      <div aria-hidden className="mt-5 grid grid-cols-3 gap-3">
        {COLUMNS.map((c, i) => (
          <div key={c} className="min-h-[230px] rounded-card bg-bg-sunken/70 p-3">
            <p className="mb-3 flex items-center justify-between text-xs font-medium text-fg-muted">
              {c}
              <span className="tabular font-mono text-fg-subtle">{[2, 1, 3][i] + (col === i ? 1 : 0)}</span>
            </p>
            <div className="space-y-2">
              {col === i && (
                <motion.div
                  layoutId="travelling-card"
                  transition={{ duration: 0.6, ease: EASE }}
                  className={cn(
                    "rounded-lg border bg-bg-raised p-2.5 text-xs shadow-elev-2",
                    i === 2 ? "border-accent/50" : i === 1 ? "border-spark/50" : "border-border",
                  )}
                >
                  <span className="block font-medium text-fg">Checkout flow</span>
                  <span className="mt-1 flex items-center gap-1 text-fg-subtle">
                    {i === 2 ? <Check size={11} className="text-accent-icon" /> : null}
                    {i === 0 ? "Planned" : i === 1 ? "Demo ready" : "Approved"}
                  </span>
                </motion.div>
              )}
              {Array.from({ length: [2, 1, 3][i] }, (_, n) => (
                <div key={n} className="rounded-lg border border-border bg-bg-raised/70 p-2.5">
                  <span className="block h-1.5 w-3/4 rounded-full bg-fg/15" />
                  <span className="mt-2 block h-1.5 w-1/2 rounded-full bg-fg/10" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <ol ref={ref} className="relative mt-16 space-y-16 md:space-y-24">
      <span aria-hidden className="absolute top-2 bottom-2 left-[19px] w-0.5 rounded-full bg-border md:left-[27px]" />
      <motion.span
        aria-hidden
        style={{ scaleY: fill }}
        className="absolute top-2 bottom-2 left-[19px] w-0.5 origin-top rounded-full bg-[image:linear-gradient(180deg,#00ddc3,#009bb4_60%,#ff5426)] md:left-[27px]"
      />
      {processSteps.map((s, i) => (
        <li key={s.id} id={s.id} className="relative grid scroll-mt-24 gap-6 pl-14 md:grid-cols-12 md:pl-20">
          <span
            className={cn(
              "absolute top-0 left-0 inline-flex size-10 items-center justify-center rounded-full border font-mono text-sm md:size-14",
              i === 0 ? "border-spark bg-spark text-spark-fg" : "border-border-strong bg-bg text-fg",
            )}
          >
            0{i + 1}
          </span>
          <Reveal className="md:col-span-5">
            <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-semibold tracking-[-0.025em] text-fg">
              {s.title}
            </h3>
            <p className="mt-2 font-medium text-accent-text">{s.text}</p>
            <p className="mt-4 text-fg-muted">{s.detail}</p>
          </Reveal>
          <Reveal delay={0.1} className="grid gap-4 sm:grid-cols-2 md:col-span-7">
            <Card>
              <p className="font-mono text-eyebrow text-fg-subtle uppercase">Deliverables</p>
              <ul className="mt-4 space-y-2.5">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2.5 text-sm text-fg">
                    <Check size={14} className="shrink-0 text-accent-icon" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="bg-bg-sunken/60">
              <p className="flex items-center gap-2 font-mono text-eyebrow text-fg-subtle uppercase">
                <UserRound size={13} aria-hidden /> Your involvement
              </p>
              <p className="mt-4 text-sm text-fg-muted">{s.involvement}</p>
            </Card>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export default function Process() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <GridBackground fade="radial" noise />
        <GlowOrb color="teal" size={700} className="-top-48 right-[-6%]" />
        <div className="wrap-wide grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <Rise>
              <Eyebrow>How we work</Eyebrow>
            </Rise>
            <h1 className="mt-6 text-h1 text-fg">
              <LineReveal lines={["Clarity at", <>every step<span className="text-spark">.</span></>]} />
            </h1>
            <Rise delay={0.3}>
              <p className="mt-6 max-w-xl text-lead text-fg-muted">
                Good software starts with a shared understanding. Our approach connects business goals to a focused
                scope, reviewable progress, and a considered launch.
              </p>
            </Rise>
            <Rise delay={0.4} className="mt-10 flex flex-wrap gap-3">
              <Button to="/contact" size="lg" iconRight data-hero-cta>
                Start a project
              </Button>
              <Button href="#discover" size="lg" variant="secondary">
                See the five steps
              </Button>
            </Rise>
          </div>
          <Rise delay={0.3}>
            <ReviewBoard />
          </Rise>
        </div>
      </section>

      <section className="section-y border-t border-border" aria-labelledby="steps">
        <div className="wrap">
          <SectionHeader
            id="steps"
            index="01"
            eyebrow="The process"
            title="From the right question to the right solution."
            lead="Five steps, the same on every engagement. What changes is how long each one takes."
            align="split"
          />
          <Timeline />
        </div>
      </section>

      <section className="section-y border-t border-border bg-bg-sunken/40" aria-labelledby="working-together">
        <div className="wrap">
          <SectionHeader
            id="working-together"
            index="02"
            eyebrow="Working together"
            title="Know what comes next."
            lead="We shape the engagement around the project. Scope, responsibilities, and delivery expectations are agreed before work begins."
            align="split"
          />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
            {workingTogether.map(([title, text], i) => (
              <StaggerItem key={title}>
                <Card size="panel" className="h-full">
                  <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                  <h3 className="mt-4 text-h3 text-fg">{title}</h3>
                  <p className="mt-3 text-fg-muted">{text}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y border-t border-border" aria-labelledby="communication">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow index="03" marker="none">
              Communication & tools
            </Eyebrow>
            <h2 id="communication" className="mt-5 text-h2 text-fg">
              Progress you can see, not just hear about.
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                [Eye, "Working demos", "Decisions are made on working software, not status slides."],
                [LayoutDashboard, "Decisions on record", "Scope, priorities and agreed changes written down where everyone can find them."],
                [MessagesSquare, "Scope changes in the open", "Changes and their effect on timing are agreed before work is added."],
              ].map(([Icon, title, text]) => {
                const I = Icon as typeof Eye;
                return (
                  <li key={title as string} className="flex gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-control border border-border bg-bg-raised text-accent-icon">
                      <I size={18} aria-hidden />
                    </span>
                    <span>
                      <span className="block font-semibold text-fg">{title as string}</span>
                      <span className="text-fg-muted">{text as string}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <Card size="panel" className="flex flex-col gap-6">
              <p className="font-mono text-eyebrow text-fg-subtle uppercase">See it for yourself</p>
              <p className="text-h3 text-fg">
                Explore the Client Portal demo to see how milestones, tasks and invoices can stay visible during a
                project.
              </p>
              <div>
                <Button to="/portal-demo" iconRight>
                  Open the portal demo
                </Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      <ClosingCTA
        tone="teal"
        eyebrow="Step one"
        title="Let’s start with the right question."
        lead="Every project begins with Discover. Tell us what you’re trying to change."
      />
    </>
  );
}
