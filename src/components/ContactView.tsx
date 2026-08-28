import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Check,
  Send,
  AlertCircle,
  Clock,
  Linkedin,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import ScrollReveal from "./ui/ScrollReveal";
import PageHero from "./ui/PageHero";

interface ContactViewProps {
  setActiveView: (view: any) => void;
}

const PROJECT_TYPES = [
  "Enterprise SaaS",
  "AI / LLM Integration",
  "Cloud Architecture",
  "Mobile App",
  "Prototyping Sprint",
];

const BUDGET_RANGES = [
  "Under $20,000",
  "$20,000 – $40,000",
  "$40,000 – $60,000",
  "$60,000+",
];

/** Small labelled field wrapper — one label style across the whole form. */
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-[var(--text-heading)]">
        {label}
        {required && <span className="text-[var(--accent)]"> *</span>}
      </span>
      {children}
    </label>
  );
}

export default function ContactView({ setActiveView }: ContactViewProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [budget, setBudget] = useState(BUDGET_RANGES[1]);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!supabase) {
      setErrorMsg("Contact form is not configured. Please add Supabase credentials.");
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill in your name, email, and project details.");
      return;
    }

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        project_type: projectType,
        budget,
        message: message.trim(),
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      setSuccessMsg("Thanks for reaching out — we have received your project brief.");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Start a project with us"
        lead="Tell us about the software you need. We reply within one business day with a view on scope, timeline and whether we are the right team for it."
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ── Details column ──────────────────────────────────────── */}
          <div className="lg:col-span-4">
            <h2 className="text-lg font-semibold tracking-tight text-[var(--text-heading)]">
              Reach us directly
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-body)]">
              Prefer email? Write to us and include whatever detail you already
              have — a spec, a screenshot, or two sentences.
            </p>

            <dl className="mt-8 space-y-6 border-t border-[var(--border)] pt-8">
              <div className="flex gap-4">
                <span className="icon-tile icon-tile-sm">
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <dt className="mono-label uppercase">Email</dt>
                  <dd className="mt-1">
                    <a
                      href="mailto:promptlypk@gmail.com"
                      className="text-sm font-medium text-[var(--text-heading)] hover:text-[var(--accent)]"
                    >
                      promptlypk@gmail.com
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="icon-tile icon-tile-sm">
                  <MapPin className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <dt className="mono-label uppercase">Office</dt>
                  <dd className="mt-1 text-sm font-medium text-[var(--text-heading)]">
                    Lahore, Pakistan
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="icon-tile icon-tile-sm">
                  <Clock className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <dt className="mono-label uppercase">Response time</dt>
                  <dd className="mt-1 text-sm font-medium text-[var(--text-heading)]">
                    Within one business day
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="icon-tile icon-tile-sm">
                  <Linkedin className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <dt className="mono-label uppercase">LinkedIn</dt>
                  <dd className="mt-1">
                    <a
                      href="https://www.linkedin.com/company/promptlypk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[var(--text-heading)] hover:text-[var(--accent)]"
                    >
                      /company/promptlypk
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="card-inset mt-8 p-5">
              <p className="text-sm font-semibold text-[var(--text-heading)]">
                Would rather talk it through?
              </p>
              <p className="mt-1.5 text-sm text-[var(--text-body)]">
                Book a 30-minute technical session instead.
              </p>
              <button
                type="button"
                onClick={() => setActiveView("consultation")}
                className="link-arrow mt-3"
              >
                Book a Consultation
              </button>
            </div>
          </div>

          {/* ── Form column ─────────────────────────────────────────── */}
          <ScrollReveal animation="fade-up" className="lg:col-span-8">
            <div className="surface-card p-7 md:p-9">
              <div className="flex items-center gap-2.5 border-b border-[var(--border)] pb-5">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                  aria-hidden
                />
                <span className="mono-label uppercase">
                  Currently accepting new projects
                </span>
              </div>

              {successMsg ? (
                <div className="py-10 text-center">
                  <span className="icon-tile mx-auto">
                    <Check className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--text-heading)]">
                    Brief received
                  </h3>
                  <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-[var(--text-body)]">
                    {successMsg} We will review the details and be in touch within
                    one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccessMsg("")}
                    className="btn btn-secondary mt-6 px-5"
                  >
                    Submit another brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" required>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sarah Jenkins"
                        className="field"
                      />
                    </Field>

                    <Field label="Work email" required>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@company.com"
                        className="field"
                      />
                    </Field>
                  </div>

                  <Field label="Company">
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company name"
                      className="field"
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Project type">
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="field"
                      >
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Estimated budget">
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="field"
                      >
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Tell us about your project" required>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Core requirements — user roles, integrations, key features, technical constraints…"
                      className="field leading-relaxed"
                    />
                  </Field>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-[var(--r-md)] border border-red-500/30 bg-red-500/5 p-3.5 text-sm text-red-500"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full py-3.5 disabled:opacity-60"
                  >
                    {loading ? "Sending…" : "Send Project Brief"}
                    {!loading && <Send className="h-4 w-4" aria-hidden />}
                  </button>

                  <p className="text-center text-xs text-[var(--text-micro)]">
                    We only use these details to reply to your enquiry.
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
