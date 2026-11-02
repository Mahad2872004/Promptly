import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Check, Loader2, Send } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { Button, Input, Select, Textarea, useToast } from "../../components/ui";
import { CONTACT_EMAIL } from "../../content/navigation";
import { cn } from "../../lib/cn";
import { EASE } from "../../lib/motion";

export const PROJECT_TYPES = [
  "Software engineering",
  "Business automation",
  "xSender product enquiry",
  "Enterprise SaaS",
  "AI / LLM Integration",
  "Cloud Architecture",
  "Mobile App",
  "Prototyping Sprint",
];

const BUDGET_RANGES = ["Not sure yet", "Under $20,000", "$20,000 – $40,000", "$40,000 – $60,000", "$60,000+"];

const STEPS = ["About you", "Project", "Details"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/** Three-step project brief. Submits to Supabase exactly as the previous form did. */
export function BriefForm({ initialType, initialMessage }: { initialType: string; initialMessage: string }) {
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState(initialType);
  const [budget, setBudget] = useState(BUDGET_RANGES[0]);
  const [message, setMessage] = useState(initialMessage);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState("");

  const validate = (s: number): Errors => {
    const e: Errors = {};
    if (s === 0) {
      if (!name.trim()) e.name = "Enter your name.";
      if (!email.trim()) e.email = "Enter your email address.";
      else if (!EMAIL_RE.test(email.trim())) e.email = "Enter a valid email address, like you@company.com.";
    }
    if (s === 2 && !message.trim()) e.message = "Tell us a little about the project.";
    return e;
  };

  const next = () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => s + 1);
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (step < STEPS.length - 1) return next();
    const e = { ...validate(0), ...validate(2) };
    setErrors(e);
    if (Object.keys(e).length) {
      if (e.name || e.email) setStep(0);
      return;
    }
    setFormError("");

    if (!supabase) {
      const msg = `The form is temporarily unavailable. Please email ${CONTACT_EMAIL} with your project details.`;
      setFormError(msg);
      toast({ variant: "error", title: "Form unavailable", description: msg });
      return;
    }

    setLoading(true);
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
      setSent(true);
      toast({ variant: "success", title: "Brief sent", description: "We’ll reply within one business day." });
    } catch {
      const msg = `We could not send your brief. Please try again or email ${CONTACT_EMAIL}.`;
      setFormError(msg);
      toast({ variant: "error", title: "We couldn’t send your brief", description: msg });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex flex-col items-center py-12 text-center"
        role="status"
      >
        <span className="relative inline-flex size-16 items-center justify-center rounded-full bg-accent text-accent-fg">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}>
            <Check size={30} strokeWidth={2.5} />
          </motion.span>
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-accent"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </span>
        <h3 className="mt-6 text-h3 text-fg">Thanks, {name.split(" ")[0]} — we have your brief.</h3>
        <p className="mt-2 max-w-sm text-fg-muted">
          We’ll review it and reply within one business day with questions or a time to talk.
        </p>
        <Button
          variant="secondary"
          className="mt-8"
          onClick={() => {
            setSent(false);
            setStep(0);
            setName("");
            setEmail("");
            setCompany("");
            setMessage("");
          }}
        >
          Send another brief
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate aria-describedby={formError ? "brief-error" : undefined}>
      {/* Progress */}
      <ol className="grid grid-cols-3 gap-2" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
        {STEPS.map((label, i) => (
          <li key={label} aria-current={i === step ? "step" : undefined}>
            <span className="block h-1 overflow-hidden rounded-full bg-bg-sunken">
              <motion.span
                className="block h-full rounded-full bg-accent"
                initial={false}
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            </span>
            <span className={cn("mt-2 block text-xs", i === step ? "font-medium text-fg" : "text-fg-subtle")}>
              {i + 1}. {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 min-h-[300px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.fieldset
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="space-y-5"
          >
            <legend className="sr-only">{STEPS[step]}</legend>
            {step === 0 && (
              <>
                <Input label="Full name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
                <Input label="Work email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
                <Input label="Company" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} hint="Optional" />
              </>
            )}
            {step === 1 && (
              <>
                <Select
                  label="Project type"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  options={PROJECT_TYPES.map((t) => ({ value: t, label: t }))}
                />
                <fieldset>
                  <legend className="mb-3 text-sm font-medium text-fg">Estimated budget</legend>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_RANGES.map((b) => (
                      <label
                        key={b}
                        className={cn(
                          "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--ring)]",
                          budget === b
                            ? "border-accent bg-accent-tint text-fg"
                            : "border-border-input text-fg-muted hover:border-fg-subtle hover:text-fg",
                        )}
                      >
                        <input type="radio" name="budget" value={b} checked={budget === b} onChange={() => setBudget(b)} className="sr-only" />
                        {b}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </>
            )}
            {step === 2 && (
              <Textarea
                label="Tell us about your project"
                required
                rows={7}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                error={errors.message}
                hint="Core requirements — user roles, integrations, key features, technical constraints."
              />
            )}
          </motion.fieldset>
        </AnimatePresence>
      </div>

      {formError && (
        <p id="brief-error" role="alert" className="mt-4 rounded-control border border-danger/40 bg-danger-tint px-4 py-3 text-sm text-danger">
          {formError}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button variant="ghost" iconLeft={<ArrowLeft size={16} />} onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <Button type="submit" iconRight>
            Continue
          </Button>
        ) : (
          <Button type="submit" disabled={loading} iconRight={loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}>
            {loading ? "Sending…" : "Send brief"}
          </Button>
        )}
      </div>
    </form>
  );
}
