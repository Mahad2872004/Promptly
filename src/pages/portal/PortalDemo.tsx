import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Circle, CircleDot, FileText, FlaskConical, Send } from "lucide-react";
import type { PortalInvoice, PortalMessage, PortalTask } from "../../types";
import {
  Button,
  DeviceFrame,
  GlowOrb,
  GridBackground,
  LineReveal,
  Rise,
} from "../../components/ui";
import { ClosingCTA } from "../../components/site/ClosingCTA";
import { cn } from "../../lib/cn";
import { EASE } from "../../lib/motion";

// Sample data — the demo never sends or saves anything.
const INITIAL_TASKS: PortalTask[] = [
  { id: "task-1", title: "Setup secure server-side Express sandbox with SSL key configs", status: "completed", phase: "Milestone 1", assignedTo: "Kamil" },
  { id: "task-2", title: "Generate vector embedding database tables for cognitive search", status: "completed", phase: "Milestone 1", assignedTo: "Ethan" },
  { id: "task-3", title: "Implement Row-Level Security parameters on multi-tenant tables", status: "in-progress", phase: "Milestone 2", assignedTo: "Kamil" },
  { id: "task-4", title: "Engineer patient calendar drag/drop UI state machine", status: "in-progress", phase: "Milestone 2", assignedTo: "Meera" },
  { id: "task-5", title: "Incorporate Stripe continuous payment webhook handler", status: "pending", phase: "Milestone 3", assignedTo: "Kamil" },
];

const INVOICES: PortalInvoice[] = [
  { id: "inv-101", amount: "$12,400.00", date: "2026-05-02", status: "paid", item: "Milestone 1: Prototype Scaffolding & Blueprint Signing" },
  { id: "inv-102", amount: "$15,000.00", date: "2026-05-18", status: "sent", item: "Milestone 2: Database Schema & Secure Auth Deployment" },
  { id: "inv-103", amount: "$15,000.00", date: "Est. 2026-06-03", status: "draft", item: "Milestone 3: Production QA & Standalone Client Hand-off" },
];

const NEXT_STATUS = { completed: "in-progress", "in-progress": "pending", pending: "completed" } as const;

function reply(input: string) {
  const text = input.toLowerCase();
  if (["database", "postgresql", "db"].some((k) => text.includes(k)))
    return "Got it. Regarding the database, we're building Row-Level Security (RLS) policies based on the tenant-uuid key to guarantee 100% isolation. I'll publish the schema on Github tonight.";
  if (["stripe", "payment", "price"].some((k) => text.includes(k)))
    return "Understood! For Stripe integration, we're proxying checkout intents via our custom server-side microservice to bypass token exposure. Let's discuss billing intervals tomorrow.";
  if (["timeline", "sprint", "fast"].some((k) => text.includes(k)))
    return "We are running exactly according to schedule! Milestone 2 tasks are 75% completed, and we expect a staging build ready for your audit on Friday.";
  return "Understood. I have logged this technical note on our sprint board. I'll analyze this in detail and share a spec upgrade during our stand-up.";
}

const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

function Panel({ title, aside, children, className }: { title: string; aside?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-card border border-border bg-bg-raised", className)}>
      <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <h2 className="font-semibold text-fg">{title}</h2>
        {aside}
      </header>
      {children}
    </section>
  );
}

function Workspace() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [messages, setMessages] = useState<PortalMessage[]>([
    {
      id: "m-1",
      sender: "lead-engineer",
      text: "Welcome to your Promptly Client Portal! I am Kamil, your Assigned Specialist. We've compiled your database schema.",
      timestamp: "10:14 AM",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const feed = useRef<HTMLDivElement>(null);

  useEffect(() => {
    feed.current?.scrollTo({ top: feed.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const done = tasks.filter((t) => t.status === "completed").length;

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const text = input;
    setMessages((m) => [...m, { id: `m-u-${Date.now()}`, sender: "client", text, timestamp: now() }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: `m-s-${Date.now()}`, sender: "lead-engineer", text: reply(text), timestamp: now() }]);
    }, 1000);
  };

  return (
    <div className="space-y-5 bg-bg-sunken/50 p-4 text-left text-sm sm:p-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Project", "PR_SaaS_09", ""],
          ["Completion", "68% total", "text-accent-text"],
          ["Build status", "All green", "text-accent-text"],
          ["Due for handover", "16 days", ""],
        ].map(([label, value, cls]) => (
          <div key={label} className="rounded-card border border-border bg-bg-raised px-4 py-3">
            <p className="text-xs text-fg-subtle">{label}</p>
            <p className={cn("mt-1 font-mono font-semibold text-fg", cls)}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-7">
          <Panel
            title="Milestone tasks"
            aside={<span className="text-xs text-fg-subtle">{done} of {tasks.length} done · select to change status</span>}
          >
            <ul className="divide-y divide-border">
              {tasks.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => setTasks((all) => all.map((x) => (x.id === t.id ? { ...x, status: NEXT_STATUS[x.status] } : x)))}
                    aria-label={`${t.title}: ${t.status.replace("-", " ")}. Change status`}
                    className="flex w-full items-start gap-3 px-5 py-3.5 text-left transition-colors hover:bg-fg/[0.03]"
                  >
                    {t.status === "completed" && <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-icon" />}
                    {t.status === "in-progress" && <CircleDot size={18} className="mt-0.5 shrink-0 text-spark" />}
                    {t.status === "pending" && <Circle size={18} className="mt-0.5 shrink-0 text-fg-subtle" />}
                    <span className="min-w-0 flex-1">
                      <span className={cn("block", t.status === "completed" ? "text-fg-subtle line-through" : "text-fg")}>
                        {t.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-fg-subtle">
                        {t.assignedTo} · {t.phase}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Invoices (simulated)">
            <ul className="divide-y divide-border">
              {INVOICES.map((inv) => (
                <li key={inv.id} className="flex flex-col gap-2 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-start gap-3">
                    <FileText size={16} className="mt-0.5 shrink-0 text-fg-subtle" />
                    <span>
                      <span className="block text-fg">{inv.item}</span>
                      <span className="text-xs text-fg-subtle">
                        {inv.id} · issued {inv.date}
                      </span>
                    </span>
                  </span>
                  <span className="flex items-center gap-3 pl-7 sm:pl-0">
                    <span className="font-mono font-semibold text-fg">{inv.amount}</span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs capitalize",
                        inv.status === "paid" && "bg-accent-tint text-accent-text",
                        inv.status === "sent" && "bg-spark text-spark-fg",
                        inv.status === "draft" && "bg-bg-sunken text-fg-muted",
                      )}
                    >
                      {inv.status}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <Panel title="Messages" className="flex h-[560px] flex-col lg:col-span-5">
          <div className="flex items-center gap-3 border-b border-border px-5 py-3">
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent-tint font-mono text-xs font-semibold text-accent-text">
              KV
            </span>
            <span>
              <span className="block font-medium text-fg">Kamil Vance</span>
              <span className="flex items-center gap-1.5 text-xs text-fg-subtle">
                <span className="size-1.5 rounded-full bg-accent" /> Your assigned specialist · online
              </span>
            </span>
          </div>
          <div ref={feed} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4" aria-live="polite">
            <AnimatePresence initial={false}>
              {messages.map((m) => {
                const mine = m.sender === "client";
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5",
                      mine
                        ? "self-end rounded-br-sm bg-accent text-accent-fg"
                        : "self-start rounded-bl-sm border border-border bg-bg text-fg",
                    )}
                  >
                    <p>{m.text}</p>
                    <p className={cn("mt-1 text-right text-[10px]", mine ? "text-accent-fg/70" : "text-fg-subtle")}>
                      {m.timestamp}
                    </p>
                  </motion.div>
                );
              })}
              {typing && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-1 self-start rounded-2xl border border-border bg-bg px-4 py-3"
                  aria-label="Kamil is typing"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="size-1.5 rounded-full bg-fg-subtle"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
            <input
              aria-label="Message for the demo workspace"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about ‘database’, ‘stripe’, or ‘timeline’…"
              className="h-10 min-w-0 flex-1 rounded-control border border-border-input bg-bg px-3 text-sm text-fg outline-none placeholder:text-fg-subtle focus:border-accent-icon"
            />
            <Button type="submit" size="sm" aria-label="Send demo message" className="h-10 px-3">
              <Send size={16} />
            </Button>
          </form>
        </Panel>
      </div>
    </div>
  );
}

export default function PortalDemo() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36">
        <GridBackground fade="radial" noise />
        <GlowOrb color="teal" size={760} className="-top-64 left-1/2 -translate-x-1/2" />
        <div className="wrap flex flex-col items-center text-center">
          <Rise>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-tint px-3.5 py-1.5 text-xs font-medium text-accent-text">
              <FlaskConical size={13} aria-hidden /> Interactive demonstration — sample data
            </span>
          </Rise>
          <h1 className="mt-6 text-h1 text-fg">
            <LineReveal lines={["The work. The context.", <>One shared place<span className="text-spark">.</span></>]} />
          </h1>
          <Rise delay={0.25}>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">
              Explore a sample client workspace. Change task status, review invoices and try the simulated messages.
              Nothing you do here is saved or sent.
            </p>
          </Rise>
        </div>
      </section>

      <Rise delay={0.3} className="wrap-wide pb-8">
        <DeviceFrame url="portal.promptly.pk/projects/pr-saas-09" className="rounded-frame">
          <Workspace />
        </DeviceFrame>
      </Rise>

      <ClosingCTA
        tone="teal"
        eyebrow="Visibility built in"
        title="Want this level of clarity on your project?"
        lead="Tell us about your project and how you’d like to follow its progress."
      />
    </>
  );
}
