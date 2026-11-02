import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageSquare, Search, X } from "lucide-react";
import {
  Accordion,
  Button,
  Card,
  Eyebrow,
  GlowOrb,
  GridBackground,
  LineReveal,
  Rise,
} from "../../components/ui";
import { faqs, type FaqCategory } from "../../content/faq";
import { cn } from "../../lib/cn";

const CATEGORIES: FaqCategory[] = ["Getting started", "Pricing & timelines", "Working together", "After launch"];
const slug = (c: string) => c.toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/, "");

export default function Faq() {
  const { hash } = useLocation();
  const [query, setQuery] = useState("");
  // From an effect, not render: the pre-rendered HTML has no hash, so the
  // first client render must match it before opening the linked answer.
  const [openId, setOpenId] = useState("");
  useEffect(() => setOpenId(hash.slice(1)), [hash]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter((f) => `${f.question} ${f.answer}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      {/* FAQPage JSON-LD is emitted into the static /faq HTML by scripts/build-pages.ts. */}
      <section className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        <GridBackground fade="radial" noise />
        <GlowOrb color="teal" size={680} className="-top-56 left-1/2 -translate-x-1/2" />
        <div className="wrap flex flex-col items-center text-center">
          <Rise>
            <Eyebrow>Frequently asked questions</Eyebrow>
          </Rise>
          <h1 className="mt-6 text-h1 text-fg">
            <LineReveal lines={[<>A clearer starting point<span className="text-spark">.</span></>]} />
          </h1>
          <Rise delay={0.25}>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">
              Answers to common questions about working with Promptly, planning a project, and taking software from
              idea to launch.
            </p>
          </Rise>
          <Rise delay={0.35} className="mt-10 w-full max-w-xl">
            <div className="relative">
              <Search size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-fg-subtle" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search questions"
                placeholder="Search questions — pricing, timelines, handover…"
                className="h-14 w-full rounded-card border border-border-input bg-bg-raised pr-12 pl-12 text-base text-fg shadow-elev-2 outline-none placeholder:text-fg-subtle focus:border-accent-icon focus:shadow-[0_0_0_4px_var(--accent-tint)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-3 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-fg-subtle hover:bg-fg/[0.06] hover:text-fg"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <p className="mt-3 text-sm text-fg-subtle" aria-live="polite">
              {query ? `${matches.length} of ${faqs.length} questions match` : `${faqs.length} questions in ${CATEGORIES.length} topics`}
            </p>
          </Rise>
        </div>
      </section>

      <div className="wrap grid gap-12 border-t border-border pt-14 pb-24 md:pt-20 lg:grid-cols-12">
        <nav aria-label="FAQ topics" className="lg:col-span-3">
          <div className="flex gap-2 overflow-x-auto lg:sticky lg:top-24 lg:block lg:space-y-1">
            {CATEGORIES.map((c) => {
              const count = matches.filter((f) => f.category === c).length;
              return (
                <a
                  key={c}
                  href={`#${slug(c)}`}
                  className={cn(
                    "flex shrink-0 items-center justify-between gap-4 rounded-control px-3 py-2 text-sm whitespace-nowrap transition-colors hover:bg-fg/[0.04]",
                    count ? "text-fg-muted hover:text-fg" : "pointer-events-none text-fg-subtle/60",
                  )}
                >
                  {c}
                  <span className="tabular font-mono text-xs text-fg-subtle">{count}</span>
                </a>
              );
            })}
            <Card className="mt-8 hidden lg:block">
              <MessageSquare size={18} className="text-accent-icon" aria-hidden />
              <p className="mt-3 font-semibold text-fg">Still have questions?</p>
              <p className="mt-1 text-sm text-fg-muted">Tell us what you’re working on — we’ll answer directly.</p>
              <Button to="/contact" size="sm" className="mt-4" iconRight>
                Contact us
              </Button>
            </Card>
          </div>
        </nav>

        <div className="lg:col-span-9">
          {matches.length === 0 && (
            <Card className="text-center">
              <p className="font-semibold text-fg">No answers match “{query}”.</p>
              <p className="mt-1 text-fg-muted">Ask us directly — we’ll reply within one business day.</p>
              <Button to="/contact" className="mt-5" iconRight>
                Ask a question
              </Button>
            </Card>
          )}
          {CATEGORIES.map((c) => {
            const items = matches.filter((f) => f.category === c);
            if (!items.length) return null;
            const open = items.some((f) => f.id === openId) ? openId : undefined;
            return (
              <section key={c} id={slug(c)} className="mb-14 scroll-mt-24" aria-labelledby={`${slug(c)}-title`}>
                <h2 id={`${slug(c)}-title`} className="mb-4 font-mono text-eyebrow text-accent-text uppercase">
                  {c}
                </h2>
                {/* Keyed on the query so search results start collapsed. */}
                <Accordion
                  key={`${query}-${open ?? ""}`}
                  defaultValue={open}
                  items={items.map((f) => ({
                    id: f.id,
                    title: <span id={f.id} className="scroll-mt-28">{f.question}</span>,
                    content: f.answer,
                  }))}
                />
              </section>
            );
          })}
          <Card className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:hidden">
            <p className="font-semibold text-fg">Still have questions?</p>
            <Button to="/contact" size="sm" iconRight>
              Contact us
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}
