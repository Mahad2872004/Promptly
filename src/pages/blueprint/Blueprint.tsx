import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  CalendarRange,
  Check,
  Copy,
  Download,
  Info,
  Layers3,
  Lightbulb,
  Loader2,
  MessageSquare,
  RotateCcw,
  Sparkles,
  Wallet,
} from "lucide-react";
import type { ArchitectResponse } from "../../types";
import {
  Badge,
  Button,
  Card,
  Eyebrow,
  GlowOrb,
  GridBackground,
  Kbd,
  LineReveal,
  Rise,
  useToast,
} from "../../components/ui";
import { useModKey } from "../../components/site/CommandPalette";
import { cn } from "../../lib/cn";
import { EASE } from "../../lib/motion";

const EXAMPLES = [
  "A WhatsApp ordering assistant for a bakery with daily production planning",
  "A client portal for an accounting firm to share documents and invoices",
  "An inventory and POS system for three retail branches",
  "A booking app for a clinic with reminders and patient history",
];

const STEPS = [
  "Reading your brief",
  "Mapping users and workflows",
  "Choosing a technical approach",
  "Planning delivery phases",
  "Estimating timeline and budget",
  "Assembling your blueprint",
];

function toMarkdown(r: ArchitectResponse) {
  return [
    `# ${r.name}`,
    "",
    r.description,
    "",
    `**Timeline:** ${r.timeline}  `,
    `**Budget estimate:** ${r.budget}`,
    "",
    "## Tech stack",
    ...r.techStack.map((t) => `- ${t}`),
    "",
    "## Phases",
    ...r.phases.map((p, i) => `${i + 1}. **${p.name}** (${p.duration}) — ${p.details}`),
    "",
    "## Recommendations & risks",
    ...r.recommendations.map((x) => `- ${x}`),
    "",
    "_Preliminary AI-generated plan from Promptly Project Blueprint. Needs review; estimates are not quotes._",
  ].join("\n");
}

const appear = (i: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.12, duration: 0.5, ease: EASE },
});

export default function Blueprint() {
  const navigate = useNavigate();
  const toast = useToast();
  const mod = useModKey();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<ArchitectResponse | null>(null);
  const [source, setSource] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading) return;
    const id = window.setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 650);
    return () => window.clearInterval(id);
  }, [loading]);

  const analyze = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (prompt.trim().length < 5) {
      setError("Describe your idea in a sentence or two (at least 5 characters).");
      inputRef.current?.focus();
      return;
    }
    setLoading(true);
    setStep(0);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "saas" }),
      });
      if (!response.ok) throw new Error("The blueprint service didn’t respond. Please try again.");
      const json = await response.json();
      if (!json?.success) throw new Error(json?.error || "Analysis failed.");
      setResult(json.data);
      setSource(json.source + (json.note ? ` (${json.note})` : ""));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setPrompt("");
    setError("");
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const copy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(toMarkdown(result));
      toast({ variant: "success", title: "Blueprint copied", description: "Paste it anywhere as Markdown." });
    } catch {
      toast({ variant: "error", title: "Couldn’t copy", description: "Your browser blocked clipboard access." });
    }
  };

  const download = () => {
    if (!result) return;
    const url = URL.createObjectURL(new Blob([toMarkdown(result)], { type: "text/markdown" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-blueprint.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const discuss = () => {
    if (!result) return;
    navigate("/contact", {
      state: {
        message: `I generated a Project Blueprint and would like to discuss it.\n\nIdea: ${prompt.trim()}\n\n${toMarkdown(result)}`,
      },
    });
  };

  const isFallback = /fallback/i.test(source);

  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-12 md:pt-36">
        <GridBackground fade="radial" noise />
        <GlowOrb color="teal" size={760} className="-top-64 left-1/2 -translate-x-1/2" />
        <div className="wrap flex flex-col items-center text-center">
          <Rise className="flex items-center gap-3">
            <Eyebrow>Project Blueprint</Eyebrow>
            <Badge variant="teal">AI</Badge>
          </Rise>
          <h1 className="mt-6 text-h1 text-fg">
            <LineReveal lines={["Describe your idea.", <>Get a technical plan<span className="text-spark">.</span></>]} />
          </h1>
          <Rise delay={0.25}>
            <p className="mt-6 max-w-xl text-lead text-fg-muted">
              A preliminary scope, stack, phases and estimate — in under a minute.
            </p>
          </Rise>
        </div>
      </section>

      <section className="wrap pb-28" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {!result && !loading && (
            <motion.form
              key="input"
              onSubmit={analyze}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="mx-auto max-w-3xl"
            >
              <Card size="panel" padded={false} className="overflow-hidden shadow-elev-3">
                <label htmlFor="blueprint-prompt" className="sr-only">
                  Describe your software idea
                </label>
                <textarea
                  id="blueprint-prompt"
                  ref={inputRef}
                  rows={5}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) analyze();
                  }}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "blueprint-error" : "blueprint-hint"}
                  placeholder="What do you want to build, and who will use it?"
                  className="block w-full resize-none bg-transparent p-6 text-lg text-fg outline-none placeholder:text-fg-subtle md:p-8"
                />
                <div className="flex flex-col gap-4 border-t border-border bg-bg-sunken/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
                  <span id="blueprint-hint" className="flex items-center gap-2 text-xs text-fg-subtle">
                    <Kbd>{mod}</Kbd>
                    <Kbd>Enter</Kbd> to generate
                  </span>
                  <Button type="submit" iconLeft={<Sparkles size={16} />} signature>
                    Generate blueprint
                  </Button>
                </div>
              </Card>
              {error && (
                <p id="blueprint-error" role="alert" className="mt-4 text-sm text-danger">
                  {error}
                </p>
              )}
              <p className="mt-8 mb-3 text-center text-sm text-fg-subtle">Or start from an example</p>
              <ul className="flex flex-wrap justify-center gap-2">
                {EXAMPLES.map((ex) => (
                  <li key={ex}>
                    <button
                      type="button"
                      onClick={() => {
                        setPrompt(ex);
                        inputRef.current?.focus();
                      }}
                      className="rounded-full border border-border bg-bg-raised px-4 py-2 text-left text-sm text-fg-muted shadow-elev-1 transition-colors hover:border-border-strong hover:text-fg"
                    >
                      {ex}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-10 flex items-start justify-center gap-2 text-center text-xs text-fg-subtle">
                <Info size={14} className="mt-px shrink-0" aria-hidden />
                AI output needs review; estimates aren’t quotes. Avoid including confidential details.
              </p>
            </motion.form>
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-xl"
              role="status"
            >
              <Card size="panel">
                <p className="flex items-center gap-2 font-medium text-fg">
                  <Loader2 size={18} className="animate-spin text-accent-icon" aria-hidden /> Building your blueprint…
                </p>
                <ol className="mt-6 space-y-3">
                  {STEPS.map((s, i) => (
                    <li
                      key={s}
                      className={cn(
                        "flex items-center gap-3 text-sm transition-colors duration-300",
                        i < step ? "text-fg-muted" : i === step ? "text-fg" : "text-fg-subtle/60",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex size-5 items-center justify-center rounded-full border",
                          i < step ? "border-accent bg-accent text-accent-fg" : i === step ? "border-accent" : "border-border",
                        )}
                      >
                        {i < step && <Check size={11} />}
                        {i === step && <span className="size-1.5 animate-pulse rounded-full bg-accent" />}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </Card>
            </motion.div>
          )}

          {result && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-5xl">
              <motion.div {...appear(0)}>
                <Card size="panel" className="relative overflow-hidden">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={isFallback ? "neutral" : "teal"}>{isFallback ? "Sample plan" : "AI-generated"}</Badge>
                    <span className="text-xs text-fg-subtle">{source}</span>
                  </div>
                  <h2 className="mt-5 text-h2 text-fg">{result.name}</h2>
                  <p className="mt-4 max-w-3xl text-lg text-fg-muted">{result.description}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button onClick={discuss} iconLeft={<MessageSquare size={16} />}>
                      Discuss this blueprint
                    </Button>
                    <Button variant="secondary" onClick={copy} iconLeft={<Copy size={15} />}>
                      Copy
                    </Button>
                    <Button variant="secondary" onClick={download} iconLeft={<Download size={15} />}>
                      Download .md
                    </Button>
                    <Button variant="ghost" onClick={reset} iconLeft={<RotateCcw size={15} />}>
                      Start over
                    </Button>
                  </div>
                </Card>
              </motion.div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {[
                  [CalendarRange, "Timeline", result.timeline],
                  [Wallet, "Budget estimate", result.budget],
                ].map(([Icon, label, value], i) => {
                  const I = Icon as typeof Wallet;
                  return (
                    <motion.div key={label as string} {...appear(i + 1)}>
                      <Card className="h-full">
                        <p className="flex items-center gap-2 font-mono text-eyebrow text-fg-subtle uppercase">
                          <I size={14} aria-hidden /> {label as string}
                        </p>
                        <p className="mt-3 text-h3 text-fg">{value as string}</p>
                        {i === 1 && <p className="mt-1 text-xs text-fg-subtle">Exploratory — not a quote.</p>}
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-12">
                <div className="space-y-5 lg:col-span-5">
                  <motion.div {...appear(3)}>
                    <Card>
                      <p className="flex items-center gap-2 font-mono text-eyebrow text-fg-subtle uppercase">
                        <Layers3 size={14} aria-hidden /> Stack
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {result.techStack.map((t) => (
                          <li key={t} className="rounded-control border border-border bg-bg px-3 py-1.5 text-sm text-fg">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                  <motion.div {...appear(4)}>
                    <Card>
                      <p className="flex items-center gap-2 font-mono text-eyebrow text-fg-subtle uppercase">
                        <Lightbulb size={14} aria-hidden /> Recommendations & risks
                      </p>
                      <ul className="mt-4 space-y-3">
                        {result.recommendations.map((r) => (
                          <li key={r} className="flex gap-3 text-sm text-fg-muted">
                            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-spark" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                </div>
                <motion.div {...appear(5)} className="lg:col-span-7">
                  <Card className="h-full">
                    <p className="font-mono text-eyebrow text-fg-subtle uppercase">Delivery phases</p>
                    <ol className="relative mt-6 space-y-6 border-l border-border pl-6">
                      {result.phases.map((p, i) => (
                        <li key={p.name} className="relative">
                          <span className="absolute top-0.5 -left-[33px] inline-flex size-4 items-center justify-center rounded-full border-2 border-accent bg-bg-raised" />
                          <p className="flex flex-wrap items-baseline gap-x-3">
                            <span className="font-semibold text-fg">
                              {i + 1}. {p.name}
                            </span>
                            <span className="font-mono text-xs text-accent-text">{p.duration}</span>
                          </p>
                          <p className="mt-1 text-sm text-fg-muted">{p.details}</p>
                        </li>
                      ))}
                    </ol>
                  </Card>
                </motion.div>
              </div>
              <p className="mt-8 flex items-start justify-center gap-2 text-center text-xs text-fg-subtle">
                <Info size={14} className="mt-px shrink-0" aria-hidden />
                Preliminary AI-generated plan. It needs review by an engineer; estimates aren’t quotes.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
