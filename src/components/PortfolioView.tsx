import React, { useEffect, useRef, useState } from "react";
import { ViewType, DemoProject } from "../types";
import { CASE_STUDIES } from "../data";
import { ArrowRight, X, Check } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import PageHero from "./ui/PageHero";
import CtaBand from "./ui/CtaBand";

interface PortfolioViewProps {
  setActiveView: (view: ViewType) => void;
}

const CATEGORIES = ["All", "SaaS", "AI Integration", "Cloud", "Mobile"] as const;

export default function PortfolioView({ setActiveView }: PortfolioViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<DemoProject | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const filtered =
    selectedCategory === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.category === selectedCategory);

  // Escape closes the detail dialog, and the page behind it stops scrolling
  // while it is open. Focus moves to the close button so keyboard users land
  // inside the dialog rather than at the top of the page behind it.
  useEffect(() => {
    if (!selectedProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <div>
      <PageHero
        eyebrow="Case studies"
        title="Work, with the numbers attached"
        lead="Every case study below lists the architecture we chose, what shipped, and what changed after launch — not just a logo and an adjective."
        primary={{ label: "Start a Project", onClick: () => setActiveView("contact") }}
      />

      <section className="section">
        <div className="container-page">
          {/* ── Category filter ─────────────────────────────────────── */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter case studies by category"
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={isActive}
                  className={`rounded-[var(--r-md)] border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                      : "border-[var(--border)] text-[var(--text-body)] hover:border-[var(--border-strong)] hover:text-[var(--text-heading)]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* ── Grid ────────────────────────────────────────────────── */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((study, i) => (
              <ScrollReveal key={study.id} animation="fade-up" staggerIndex={i % 3}>
                <article className="surface-card card-interactive flex h-full flex-col p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="mono-label uppercase">{study.clientName}</span>
                    <span className="chip">{study.category}</span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-[var(--text-heading)]">
                    {study.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-body)]">
                    {study.tagline}
                  </p>

                  {study.metrics?.[0] && (
                    <div className="mt-5 border-t border-[var(--border)] pt-5">
                      <p className="mono-label uppercase">Headline result</p>
                      <p className="mt-1.5 text-sm font-semibold text-[var(--text-heading)]">
                        {study.metrics[0]}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedProject(study)}
                    className="link-arrow mt-auto self-start pt-6"
                  >
                    Read the case study
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-10 text-sm text-[var(--text-micro)]">
              No case studies in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* ── Detail dialog ─────────────────────────────────────────────── */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(11,17,26,0.6)] p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            onClick={(e) => e.stopPropagation()}
            className="animate-fadeIn max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-panel)] shadow-[var(--shadow-lg)]"
          >
            <div className="flex items-start justify-between gap-6 border-b border-[var(--border)] p-7">
              <div>
                <p className="mono-label uppercase">{selectedProject.clientName}</p>
                <h2
                  id="case-study-title"
                  className="mt-2 text-xl font-bold tracking-tight text-[var(--text-heading)]"
                >
                  {selectedProject.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close case study"
                className="btn btn-ghost h-9 w-9 shrink-0 p-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-7 p-7">
              <p className="text-sm leading-relaxed text-[var(--text-body)]">
                {selectedProject.longDescription}
              </p>

              <div>
                <p className="mono-label uppercase">Stack</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="chip font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="mono-label uppercase">Outcomes</p>
                <ul className="mt-3 space-y-2">
                  {selectedProject.metrics.map((m) => (
                    <li
                      key={m}
                      className="flex items-start gap-2.5 text-sm text-[var(--text-body)]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                        aria-hidden
                      />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedProject.testimonial && (
                <figure className="card-inset p-5">
                  <blockquote className="text-sm leading-relaxed text-[var(--text-body)]">
                    “{selectedProject.testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-3 text-xs text-[var(--text-micro)]">
                    {selectedProject.testimonial.author} —{" "}
                    {selectedProject.testimonial.role},{" "}
                    {selectedProject.testimonial.company}
                  </figcaption>
                </figure>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] p-5">
              <span className="mono-label uppercase">
                Detail shared with client consent
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedProject(null);
                  setActiveView("contact");
                }}
                className="btn btn-primary px-5"
              >
                Discuss a Similar Build
              </button>
            </div>
          </div>
        </div>
      )}

      <CtaBand
        title="Want results like these?"
        body="Send us the problem. We will tell you what a comparable build actually takes."
        primary={{ label: "Start a Project", onClick: () => setActiveView("contact") }}
        secondary={{
          label: "Book a Consultation",
          onClick: () => setActiveView("consultation"),
        }}
      />
    </div>
  );
}
