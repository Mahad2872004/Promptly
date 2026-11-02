import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, CircleDot, FileText, LayoutDashboard, Sparkles } from "lucide-react";
import { Badge, Button, Card, SectionHeader, Stagger, StaggerItem } from "../../components/ui";
import { EASE } from "../../lib/motion";

const PROMPT = "An app for our bakery to take WhatsApp orders and plan daily production.";

/** Prompt types out, then the plan's sections appear — on a loop. */
function BlueprintPreview() {
  const reduced = useReducedMotion();
  const [chars, setChars] = useState(reduced ? PROMPT.length : 0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduced) return;
    setChars(0);
    let n = 0;
    const id = window.setInterval(() => {
      n += 2;
      setChars(Math.min(n, PROMPT.length));
      if (n >= PROMPT.length) window.clearInterval(id);
    }, 40);
    const restart = window.setTimeout(() => setRun((r) => r + 1), 9000);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(restart);
    };
  }, [run, reduced]);

  const done = chars >= PROMPT.length;
  return (
    <div aria-hidden className="space-y-3 text-sm">
      <div className="rounded-xl border border-border-input bg-bg-raised p-4 shadow-elev-1">
        <span className="text-fg">{PROMPT.slice(0, chars)}</span>
        {!done && <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-fg align-middle" />}
      </div>
      <AnimatePresence>
        {done &&
          [
            ["Scope", "Ordering, production plan, admin"],
            ["Stack", "Web app · WhatsApp API · Postgres"],
            ["Phases", "MVP → integrations → reporting"],
          ].map(([title, text], i) => (
            <motion.div
              key={`${run}-${title}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 + i * 0.25, duration: 0.4, ease: EASE }}
              className="flex items-center gap-3 rounded-xl border border-border bg-bg-raised px-4 py-3"
            >
              <Sparkles size={14} className="shrink-0 text-accent-icon" />
              <span className="w-16 shrink-0 font-medium text-fg">{title}</span>
              <span className="truncate text-fg-muted">{text}</span>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

function PortalPreview() {
  const milestones = [
    ["Discovery & scope", 100],
    ["Design & prototype", 100],
    ["Core build", 64],
    ["Launch preparation", 0],
  ] as const;
  return (
    <div aria-hidden className="space-y-3 text-sm">
      {milestones.map(([title, pct], i) => (
        <div key={title} className="rounded-xl border border-border bg-bg-raised px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-fg">
              {pct === 100 ? (
                <Check size={14} className="text-accent-icon" />
              ) : (
                <CircleDot size={14} className={pct ? "text-spark" : "text-fg-subtle"} />
              )}
              {title}
            </span>
            <span className="font-mono text-xs text-fg-subtle">{pct}%</span>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-bg-sunken">
            <motion.div
              className={pct === 100 ? "h-full rounded-full bg-accent" : "h-full rounded-full bg-spark"}
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.9, ease: EASE }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ToolsPreview() {
  return (
    <section className="section-y border-t border-border" aria-labelledby="tools">
      <div className="wrap">
        <SectionHeader
          id="tools"
          index="05"
          eyebrow="Tools you can try"
          title="See how we think before we talk."
          lead="Two working tools from our own toolkit. No sign-up."
        />
        <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
          <StaggerItem>
            <Card size="panel" className="flex h-full flex-col">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-control border border-border bg-bg-sunken text-accent-icon">
                  <FileText size={18} aria-hidden />
                </span>
                <Badge variant="teal">AI</Badge>
              </div>
              <h3 className="mt-6 text-h3 text-fg">Project Blueprint</h3>
              <p className="mt-2 text-fg-muted">
                Describe your idea, get a preliminary technical plan in under a minute.
              </p>
              <div className="my-8 rounded-card bg-bg-sunken p-4">
                <BlueprintPreview />
              </div>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                <Button to="/blueprint" iconRight>
                  Try Project Blueprint
                </Button>
                <span className="text-xs text-fg-subtle">AI output needs review; estimates aren’t quotes.</span>
              </div>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card size="panel" className="flex h-full flex-col">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-control border border-border bg-bg-sunken text-accent-icon">
                  <LayoutDashboard size={18} aria-hidden />
                </span>
                <Badge>Sample data</Badge>
              </div>
              <h3 className="mt-6 text-h3 text-fg">Client Portal demo</h3>
              <p className="mt-2 text-fg-muted">
                See how we share progress, milestones, tasks, and invoices during a project.
              </p>
              <div className="my-8 rounded-card bg-bg-sunken p-4">
                <PortalPreview />
              </div>
              <div className="mt-auto">
                <Button to="/portal-demo" variant="secondary" iconRight>
                  Open the portal demo
                </Button>
              </div>
            </Card>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
