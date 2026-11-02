import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUpRight, CalendarDays, Check, Clock, Linkedin, Mail, MapPin, Send } from "lucide-react";
import {
  Button,
  Card,
  Eyebrow,
  GlowOrb,
  GridBackground,
  LineReveal,
  Rise,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui";
import { BOOKING_URL, CONTACT_EMAIL, LINKEDIN_URL, LOCATION } from "../../content/navigation";
import { BriefForm, PROJECT_TYPES } from "./BriefForm";

/** Calendly inline page, loaded only when asked for. */
function BookingPanel() {
  const [load, setLoad] = useState(false);
  return (
    <div>
      <h2 className="text-h3 text-fg">A good project starts with a conversation.</h2>
      <p className="mt-2 text-fg-muted">
        Book a 30-minute consultation to talk through your idea, existing system, or technical challenge.
      </p>
      <ul className="mt-6 space-y-3">
        {[
          ["The business problem", "What you’re trying to change and who the solution is for."],
          ["The practical constraints", "Existing tools, timing, budget, and technical dependencies."],
          ["A useful next step", "The questions to resolve and a sensible way forward."],
        ].map(([title, text]) => (
          <li key={title} className="flex gap-3">
            <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent-icon">
              <Check size={12} />
            </span>
            <span>
              <span className="font-medium text-fg">{title}</span>
              <span className="block text-sm text-fg-muted">{text}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-8 overflow-hidden rounded-card border border-border bg-bg">
        {load ? (
          <iframe
            src={`${BOOKING_URL}?hide_gdpr_banner=1&embed_type=Inline`}
            title="Book a 30-minute call with Promptly"
            className="block h-[640px] w-full border-0"
          />
        ) : (
          <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
            <span className="inline-flex size-12 items-center justify-center rounded-card bg-accent-tint text-accent-icon">
              <CalendarDays size={22} />
            </span>
            <p className="font-medium text-fg">30 minutes · online</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={() => setLoad(true)} iconRight>
                Show available times
              </Button>
              <Button href={BOOKING_URL} variant="secondary" iconRight={<ArrowUpRight size={15} />}>
                Open in Calendly
              </Button>
            </div>
            <p className="text-xs text-fg-subtle">The calendar loads from calendly.com.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  const location = useLocation();
  // Starts on "brief" to match the pre-rendered HTML; the effect below
  // switches to the booking panel for /contact#book.
  const [mode, setMode] = useState("brief");

  // /contact#book (and the old /consultation) open the booking panel.
  useEffect(() => {
    if (location.hash === "#book") setMode("call");
  }, [location.hash]);

  const product = new URLSearchParams(location.search).get("product");
  const initialType = product === "xsender" ? "xSender product enquiry" : PROJECT_TYPES[0];
  const initialMessage = (location.state as { message?: string } | null)?.message ?? "";

  return (
    <section className="relative isolate overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32">
      <GridBackground fade="radial" noise />
      <GlowOrb color="teal" size={720} className="-top-48 -left-40" />
      <Tabs
        defaultValue="brief"
        value={mode}
        onValueChange={setMode}
        variant="segmented"
        className="wrap-wide grid gap-12 lg:grid-cols-12 lg:gap-16"
      >
        <div className="lg:col-span-5">
          <Rise>
            <Eyebrow>Contact</Eyebrow>
          </Rise>
          <h1 className="mt-6 text-h1 text-fg">
            <LineReveal lines={["Start a project", <>with us<span className="text-spark">.</span></>]} />
          </h1>
          <Rise delay={0.25}>
            <p className="mt-6 max-w-md text-lead text-fg-muted">
              Tell us what you want to build, improve, or understand. We will review your brief and discuss a practical
              next step.
            </p>
          </Rise>
          <Rise delay={0.35} className="mt-8">
            <TabsList label="How would you like to start?">
              <TabsTrigger value="brief">
                <Send size={14} aria-hidden /> Send a brief
              </TabsTrigger>
              <TabsTrigger value="call">
                <CalendarDays size={14} aria-hidden /> Book a 30-min call
              </TabsTrigger>
            </TabsList>
          </Rise>

          <Rise delay={0.4} className="mt-12 space-y-8 border-t border-border pt-10">
            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {[
                [Clock, "Response time", "We reply within 1 business day"],
                [Mail, "Email", <a key="e" href={`mailto:${CONTACT_EMAIL}`} className="hover:text-fg hover:underline">{CONTACT_EMAIL}</a>],
                [
                  Linkedin,
                  "LinkedIn",
                  <a key="l" href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-fg hover:underline">
                    promptlypk <span className="sr-only">(opens in a new tab)</span>
                  </a>,
                ],
                [MapPin, "Location", LOCATION],
              ].map(([Icon, label, value]) => {
                const I = Icon as typeof Clock;
                return (
                  // dl > div > (dt, dd) only — the icon lives inside the dt.
                  <div key={label as string} className="relative pl-[30px]">
                    <dt className="font-mono text-eyebrow text-fg-subtle uppercase">
                      <I size={18} className="absolute top-0.5 left-0 text-accent-icon" aria-hidden />
                      {label as string}
                    </dt>
                    <dd className="mt-1 text-sm text-fg-muted">{value as React.ReactNode}</dd>
                  </div>
                );
              })}
            </dl>
            <div>
              <p className="font-mono text-eyebrow text-fg-subtle uppercase">What happens next</p>
              <ol className="mt-4 space-y-4">
                {[
                  ["We review your brief", "We read it closely and note what we need to ask."],
                  ["We reply within a business day", "With questions, or a time to talk it through."],
                  ["We agree a practical next step", "A scope, a plan, or an honest recommendation."],
                ].map(([title, text], i) => (
                  <li key={title} className="flex gap-4">
                    <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-border-strong font-mono text-xs text-fg-muted">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-fg">{title}</span>
                      <span className="text-sm text-fg-muted">{text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Rise>
        </div>

        {/* #book anchor (old /consultation links land here). */}
        <Rise delay={0.3} id="book" className="scroll-mt-24 lg:col-span-7">
          <Card size="panel" className="shadow-elev-3">
            <TabsContent value="brief" className="pt-0">
              <BriefForm initialType={initialType} initialMessage={initialMessage} />
            </TabsContent>
            <TabsContent value="call" className="pt-0">
              <BookingPanel />
            </TabsContent>
          </Card>
        </Rise>
      </Tabs>
    </section>
  );
}
