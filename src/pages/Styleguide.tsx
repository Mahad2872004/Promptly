import React, { useLayoutEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  Code2,
  Layers3,
  RotateCcw,
  Search,
  Sparkles,
  Workflow,
} from "lucide-react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  DeviceFrame,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Eyebrow,
  GlowOrb,
  GridBackground,
  Input,
  Kbd,
  LineReveal,
  Marquee,
  Reveal,
  SectionHeader,
  Select,
  Stagger,
  StaggerItem,
  Stat,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ThemeScope,
  Tooltip,
  useToast,
} from "../components/ui";
import { cn } from "../lib/cn";

/* Hidden route: /styleguide (noindex, not in sitemap or nav).
   Renders every token and primitive once in light and once in dark. */

type Theme = "light" | "dark";

const brand = [
  ["--brand-teal", "#00DDC3", "Primary accent, button fill, glows"],
  ["--brand-cyan", "#009BB4", "Gradient end, links on dark"],
  ["--brand-deep", "#008BA9", "Icons, large teal text, light focus ring"],
  ["--brand-teal-ink", "#007E82", "Small teal text & eyebrows on light"],
  ["--brand-orange", "#FF5426", "Spark: live badges, active step, key number"],
  ["--brand-amber", "#FFAB24", "Orange gradient end, warm glows"],
  ["--ink-950", "#0B111A", "Text (light) / page (dark)"],
  ["--ink-900", "#111A26", "Dark surfaces"],
  ["--ink-800", "#1A2533", "Dark raised surfaces"],
  ["--slate-600", "#526174", "Body text (light)"],
  ["--slate-500", "#6B7889", "Muted text on white only"],
  ["--line", "#DBE3ED", "Borders (light)"],
  ["--surface-subtle", "#EDF2F7", "Subtle sections (light)"],
  ["--surface", "#FAFBFC", "Page background (light)"],
] as const;

const semantic = [
  ["bg", "--bg"],
  ["bg-raised", "--bg-raised"],
  ["bg-sunken", "--bg-sunken"],
  ["fg", "--fg"],
  ["fg-muted", "--fg-muted"],
  ["fg-subtle", "--fg-subtle"],
  ["border", "--border"],
  ["border-strong", "--border-strong"],
  ["border-input", "--border-input"],
  ["accent", "--accent"],
  ["accent-text", "--accent-text"],
  ["accent-icon", "--accent-icon"],
  ["spark", "--spark"],
  ["danger", "--danger"],
  ["ring", "--ring"],
] as const;

const contrastPairs: [string, string, string, number][] = [
  ["fg on bg", "--fg", "--bg", 4.5],
  ["fg-muted on bg", "--fg-muted", "--bg", 4.5],
  ["fg-muted on bg-sunken", "--fg-muted", "--bg-sunken", 4.5],
  ["fg-subtle on bg", "--fg-subtle", "--bg", 4.5],
  ["fg-subtle on bg-sunken", "--fg-subtle", "--bg-sunken", 4.5],
  ["accent-text on bg", "--accent-text", "--bg", 4.5],
  ["accent-text on bg-raised", "--accent-text", "--bg-raised", 4.5],
  ["accent-fg on accent (button)", "--accent-fg", "--accent", 4.5],
  ["spark-fg on spark (live badge)", "--spark-fg", "--spark", 4.5],
  ["danger on bg-raised", "--danger", "--bg-raised", 4.5],
  ["ring on bg (non-text)", "--ring", "--bg", 3],
  ["border-input on bg-raised (non-text)", "--border-input", "--bg-raised", 3],
  ["accent-icon on bg (non-text)", "--accent-icon", "--bg", 3],
];

export default function Styleguide() {
  return (
    <div className="bg-bg text-fg">
      <header className="wrap pt-36 pb-16">
        <Eyebrow marker="dash">Internal · Phase 1 review</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-h1">Promptly design system</h1>
        <p className="mt-6 max-w-2xl text-lead text-fg-muted">
          Every token and primitive, rendered once in a forced light scope and once in a forced
          dark scope. This page is hidden from navigation and search.
        </p>
        <nav aria-label="Theme sections" className="mt-8 flex flex-wrap gap-3">
          <Button variant="secondary" size="sm" href="#sg-light">
            Light
          </Button>
          <Button variant="secondary" size="sm" href="#sg-dark">
            Dark
          </Button>
        </nav>
      </header>
      {(["light", "dark"] as Theme[]).map((theme) => (
        <ThemeScope
          key={theme}
          theme={theme}
          as="section"
          id={`sg-${theme}`}
          aria-label={`${theme} theme`}
          className="relative isolate scroll-mt-16 border-t border-border"
        >
          <div className="wrap py-20">
            <div className="mb-16 flex items-center gap-4">
              <Badge variant={theme === "dark" ? "teal" : "neutral"} dot>
                {theme} theme
              </Badge>
              <span className="h-px flex-1 bg-border" />
            </div>
            <Gallery theme={theme} />
          </div>
        </ThemeScope>
      ))}
    </div>
  );
}

function Section({
  title,
  index,
  children,
}: {
  title: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-14 first:border-t-0 first:pt-0">
      <Eyebrow index={index} className="mb-8">
        {title}
      </Eyebrow>
      {children}
    </section>
  );
}

function Gallery({ theme }: { theme: Theme }) {
  return (
    <>
      <Section index="01" title="Brand colours">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {brand.map(([token, hex, role]) => (
            <div key={token}>
              <div
                className="h-20 rounded-control border border-border"
                style={{ background: `var(${token})` }}
              />
              <p className="mt-3 font-mono text-xs text-fg">{token}</p>
              <p className="font-mono text-xs text-fg-subtle">{hex}</p>
              <p className="mt-1 text-xs text-fg-muted">{role}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["--grad-brand", "Teal → cyan. Default gradient."],
            ["--grad-accent", "Orange → amber. Warm highlights."],
            ["--grad-signature", "Use rarely: hero word, main CTA glow, active nav."],
          ].map(([token, role]) => (
            <div key={token}>
              <div className="h-16 rounded-control" style={{ background: `var(${token})` }} />
              <p className="mt-3 font-mono text-xs text-fg">{token}</p>
              <p className="mt-1 text-xs text-fg-muted">{role}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section index="02" title="Semantic tokens">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-8">
          {semantic.map(([name, token]) => (
            <div key={name}>
              <div
                className="h-14 rounded-control border border-border"
                style={{ background: `var(${token})` }}
              />
              <p className="mt-2 font-mono text-xs text-fg">{name}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-fg-muted">
          Tailwind: <code className="text-fg">bg-bg</code>, <code className="text-fg">text-fg-muted</code>,{" "}
          <code className="text-fg">border-border</code>, <code className="text-fg">bg-accent</code>,{" "}
          <code className="text-fg">text-accent-text</code>, <code className="text-fg">text-spark</code>…
        </p>
      </Section>

      <Section index="03" title="Contrast (measured live)">
        <ContrastTable theme={theme} />
      </Section>

      <Section index="04" title="Typography">
        <div className="space-y-8">
          <TypeRow spec="display · clamp(2.75rem, 6vw, 5.5rem) · 600 · −0.035em">
            <p className="text-display">
              Beautifully <span className="text-signature">engineered</span>
              <span className="text-spark">.</span>
            </p>
          </TypeRow>
          <TypeRow spec="h1 · clamp(2.5rem, 5vw, 4.25rem) · −0.035em">
            <p className="text-h1">Products we build and run.</p>
          </TypeRow>
          <TypeRow spec="h2 · clamp(2rem, 4vw, 3.5rem) · −0.025em">
            <p className="text-h2">The ambition is yours. The engineering is ours.</p>
          </TypeRow>
          <TypeRow spec="h3 · 1.5rem">
            <p className="text-h3">Intelligent workflows</p>
          </TypeRow>
          <TypeRow spec="lead · 1.25rem · fg-muted">
            <p className="max-w-2xl text-lead text-fg-muted">
              Custom software. Intelligent automation. Products with purpose. We turn business
              challenges into systems that move you forward.
            </p>
          </TypeRow>
          <TypeRow spec="body · 1rem–1.125rem · 1.6 · fg-muted">
            <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-fg-muted">
              Good software is more than a successful handoff. It should be understandable,
              maintainable, and useful long after launch. Building our own products keeps us close
              to those decisions.
            </p>
          </TypeRow>
          <TypeRow spec="eyebrow · JetBrains Mono 12px · 0.14em">
            <div className="flex flex-wrap gap-8">
              <Eyebrow>What we do</Eyebrow>
              <Eyebrow marker="dash">New</Eyebrow>
              <Eyebrow index="01">What we do</Eyebrow>
            </div>
          </TypeRow>
          <TypeRow spec="mono · code">
            <code className="rounded-md bg-bg-sunken px-2 py-1 text-sm text-fg">
              POST /api/workflows → 201 Created
            </code>
          </TypeRow>
        </div>
      </Section>

      <Section index="05" title="Radii, elevation, grid">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-wrap items-end gap-6">
            {[
              ["control", "10px", "rounded-control", "h-12 w-24"],
              ["card", "16px", "rounded-card", "h-20 w-28"],
              ["panel", "24px", "rounded-panel", "h-24 w-32"],
              ["frame", "32px", "rounded-frame", "h-28 w-36"],
            ].map(([name, px, cls, size]) => (
              <div key={name}>
                <div className={cn("border border-border-strong bg-bg-raised", cls, size)} />
                <p className="mt-2 font-mono text-xs text-fg-muted">
                  {name} · {px}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-6">
            {["shadow-elev-1", "shadow-elev-2", "shadow-elev-3"].map((cls) => (
              <div key={cls}>
                <div className={cn("h-20 w-32 rounded-card border border-border bg-bg-raised", cls)} />
                <p className="mt-2 font-mono text-xs text-fg-muted">{cls}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 grid grid-cols-12 gap-2 sm:gap-6">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="flex h-16 items-end justify-center rounded-md bg-accent-tint pb-1 font-mono text-[10px] text-accent-text"
            >
              {i + 1}
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-fg-muted">
          12 columns · 1200px content (<code>wrap</code>) / 1320px wide (<code>wrap-wide</code>) ·
          24px gutters, 16px on mobile · section rhythm <code>section-y</code> = 112px / 144px.
        </p>
      </Section>

      <Section index="06" title="Buttons">
        <div className="space-y-6">
          {(["lg", "md", "sm"] as const).map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-4">
              <Button size={size} iconRight>
                Start a project
              </Button>
              <Button size={size} variant="secondary" iconRight>
                Explore products
              </Button>
              <Button size={size} variant="ghost">
                Ghost
              </Button>
              <Button size={size} variant="link" iconRight={<ArrowUpRight size={16} />}>
                Link
              </Button>
              <span className="font-mono text-xs text-fg-subtle">{size}</span>
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button size="lg" signature iconRight>
              Signature CTA (once per view)
            </Button>
            <Button iconLeft={<Search size={16} />} variant="secondary">
              Search <Kbd className="ml-1">⌘K</Kbd>
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </Section>

      <Section index="07" title="Badges, keys, eyebrows">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Neutral</Badge>
          <Badge variant="teal">Beta</Badge>
          <Badge variant="teal" dot>
            In progress
          </Badge>
          <Badge variant="live">Live demo</Badge>
          <Badge variant="live">Live</Badge>
          <span className="mx-3 h-6 w-px bg-border" />
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
          <Kbd>Ctrl</Kbd>
          <Kbd>Esc</Kbd>
        </div>
      </Section>

      <Section index="08" title="Section header">
        <div className="space-y-20">
          <SectionHeader
            eyebrow="What we do"
            index="01"
            title="The ambition is yours. The engineering is ours."
            lead="Build a new platform. Connect fragmented operations. Find the right technical direction."
            action={
              <Button variant="link" to="/services" iconRight>
                Explore our expertise
              </Button>
            }
            align="split"
          />
          <SectionHeader
            eyebrow="How we work"
            title="From the right question to the right solution."
            lead="Clear decisions. Visible progress. A shared understanding of what we're building and why."
            align="center"
          />
        </div>
      </Section>

      <Section index="09" title="Cards (pointer glow on desktop)">
        <Stagger className="grid gap-5 md:grid-cols-3">
          {[
            [Code2, "Software engineering", "Custom applications, platforms, and integrations."],
            [Workflow, "AI & automation", "Connect your tools and simplify repetitive work."],
            [Layers3, "Strategy & architecture", "Turn an early idea into a clear, achievable plan."],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof Code2;
            return (
              <StaggerItem key={title as string}>
                <Card interactive className="h-full">
                  <span className="inline-flex size-10 items-center justify-center rounded-control border border-border bg-bg-sunken text-accent-icon">
                    <I size={20} aria-hidden />
                  </span>
                  <h3 className="mt-6 text-h3">{title as string}</h3>
                  <p className="mt-2 text-fg-muted">{text as string}</p>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Card size="panel" className="mt-5">
          <Eyebrow>Feature panel</Eyebrow>
          <p className="mt-4 max-w-xl text-h3">Panels use the 24px radius for larger compositions.</p>
        </Card>
      </Section>

      <Section index="10" title="Tabs, accordion, dialog, tooltip, toast">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Tabs defaultValue="software">
              <TabsList label="Capabilities">
                <TabsTrigger value="software">Software</TabsTrigger>
                <TabsTrigger value="ai">AI & automation</TabsTrigger>
                <TabsTrigger value="strategy">Strategy</TabsTrigger>
              </TabsList>
              <TabsContent value="software" className="text-fg-muted">
                Web applications, APIs, and business systems.
              </TabsContent>
              <TabsContent value="ai" className="text-fg-muted">
                Intelligent workflows, AI agents, and data processing.
              </TabsContent>
              <TabsContent value="strategy" className="text-fg-muted">
                Product discovery, MVPs, and technical direction.
              </TabsContent>
            </Tabs>
            <Tabs defaultValue="brief" variant="segmented" className="mt-12">
              <TabsList label="Contact mode">
                <TabsTrigger value="brief">Send a brief</TabsTrigger>
                <TabsTrigger value="call">Book a 30-min call</TabsTrigger>
              </TabsList>
              <TabsContent value="brief" className="text-fg-muted">
                Segmented variant — used by the contact page.
              </TabsContent>
              <TabsContent value="call" className="text-fg-muted">
                The booking panel appears here.
              </TabsContent>
            </Tabs>
            <OverlayDemos />
          </div>
          <Accordion
            items={[
              {
                id: "spec",
                title: "Do I need a complete specification to get started?",
                content:
                  "No. Start with the problem you want to solve, who will use the software, and what a successful outcome looks like.",
              },
              {
                id: "existing",
                title: "Can you work with an existing application?",
                content:
                  "Yes. A technical review helps establish whether targeted improvements, new integrations, or a phased rebuild are appropriate.",
              },
              {
                id: "after",
                title: "What happens after launch?",
                content:
                  "Discuss handover, documentation, maintenance, and ongoing development when defining your engagement.",
              },
            ]}
          />
        </div>
      </Section>

      <Section index="11" title="Form fields">
        <div className="grid max-w-3xl gap-5 md:grid-cols-2">
          <Input label="Full name" autoComplete="name" required />
          <Input label="Work email" type="email" hint="We reply within 1 business day." />
          <Input label="Company" defaultValue="Northwind" />
          <Input label="Phone" error="Enter a phone number with country code." defaultValue="0300" />
          <Select
            label="Project type"
            placeholderOption="Choose one"
            options={[
              { value: "web", label: "Web application" },
              { value: "ai", label: "AI & automation" },
              { value: "mvp", label: "Startup MVP" },
            ]}
          />
          <Select
            label="Budget"
            error="Choose a budget range."
            placeholderOption="Choose a range"
            options={[{ value: "tbd", label: "Not sure yet" }]}
          />
          <Textarea label="Tell us about the project" className="md:col-span-2" />
        </div>
      </Section>

      <Section index="12" title="Stats & marquee">
        <p className="mb-8 text-sm text-fg-muted">
          Sample values for styleguide only — production stats render only from real data.
        </p>
        <div className="grid gap-10 sm:grid-cols-3">
          <Stat value={1234} label="Sample count-up" />
          <Stat value={98.6} decimals={1} suffix="%" label="Sample with decimals" />
          <Stat value={42} prefix="×" label="Sample emphasis" emphasis />
        </div>
        <Marquee label="Capabilities" className="mt-16" duration={30}>
          {["Web apps", "AI automation", "Integrations", "Product strategy", "APIs", "Data pipelines"].map(
            (item) => (
              <span key={item} className="flex items-center gap-12 text-xl font-medium text-fg-muted">
                {item}
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              </span>
            ),
          )}
        </Marquee>
      </Section>

      <Section index="13" title="Motion">
        <MotionDemos />
      </Section>

      <Section index="14" title="Surfaces & device frames">
        <div className="relative isolate overflow-hidden rounded-panel border border-border px-6 py-20 md:px-12">
          <GridBackground noise />
          <GlowOrb color="teal" size={560} className="-top-48 left-1/2 -translate-x-1/2" drift />
          <GlowOrb color="orange" size={280} className="right-0 bottom-0 [--orb-strength:0.14]" />
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <DeviceFrame url="app.promptly.pk/operations" label="Sample operations dashboard">
              <MiniDashboard />
            </DeviceFrame>
            <DeviceFrame device="phone" className="mx-auto w-[220px]" label="Sample mobile inbox">
              <MiniPhone />
            </DeviceFrame>
          </div>
          <DeviceFrame device="laptop" className="mx-auto mt-16 max-w-3xl" label="Sample laptop screen">
            <MiniDashboard />
          </DeviceFrame>
        </div>
      </Section>
    </>
  );
}

function TypeRow({ spec, children }: { spec: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 border-b border-border pb-8 md:grid-cols-[220px_1fr] md:gap-8">
      <p className="font-mono text-xs text-fg-subtle">{spec}</p>
      <div>{children}</div>
    </div>
  );
}

/* Live WCAG contrast, from computed colours inside this theme scope. */
function luminance([r, g, b]: number[]) {
  const c = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function parseRgb(value: string) {
  return (value.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
}

function ContrastTable({ theme }: { theme: Theme }) {
  const probe = useRef<HTMLDivElement>(null);
  const [ratios, setRatios] = useState<number[]>([]);
  useLayoutEffect(() => {
    const el = probe.current;
    if (!el) return;
    const read = (token: string) => {
      el.style.color = `var(${token})`;
      return parseRgb(getComputedStyle(el).color);
    };
    setRatios(
      contrastPairs.map(([, fg, bg]) => {
        const [a, b] = [luminance(read(fg)), luminance(read(bg))];
        return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      }),
    );
  }, [theme]);

  return (
    <div className="overflow-x-auto">
      <div ref={probe} aria-hidden className="hidden" />
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="font-mono text-xs text-fg-subtle uppercase">
          <tr className="border-b border-border">
            <th className="py-3 font-medium">Pair</th>
            <th className="py-3 font-medium">Sample</th>
            <th className="py-3 font-medium">Ratio</th>
            <th className="py-3 font-medium">Needs</th>
            <th className="py-3 font-medium">Result</th>
          </tr>
        </thead>
        <tbody>
          {contrastPairs.map(([label, fg, bg, min], i) => {
            const ratio = ratios[i];
            const pass = ratio !== undefined && ratio >= min;
            return (
              <tr key={label} className="border-b border-border">
                <td className="py-3 text-fg">{label}</td>
                <td className="py-3">
                  <span
                    className="inline-flex rounded-md border border-border px-2.5 py-1 font-medium"
                    style={{ color: `var(${fg})`, background: `var(${bg})` }}
                  >
                    Aa 123
                  </span>
                </td>
                <td className="tabular py-3 font-mono text-fg">
                  {ratio ? `${ratio.toFixed(2)}:1` : "—"}
                </td>
                <td className="tabular py-3 font-mono text-fg-muted">{min}:1</td>
                <td className="py-3">
                  {ratio !== undefined && (
                    <Badge variant={pass ? "teal" : "live"}>{pass ? "Pass" : "Fail"}</Badge>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function OverlayDemos() {
  const toast = useToast();
  return (
    <div className="mt-12 flex flex-wrap items-center gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" size="sm">
            Open dialog
          </Button>
        </DialogTrigger>
        <DialogContent
          title="Discuss this blueprint"
          description="Dialogs trap focus, close on Escape, and adopt the theme of the scope they open from."
        >
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button iconRight>Continue</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      <Tooltip content="Tooltips appear on hover and keyboard focus.">
        <Button variant="secondary" size="sm" iconLeft={<Sparkles size={15} />}>
          Hover me
        </Button>
      </Tooltip>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast({
            variant: "success",
            title: "Brief sent",
            description: "We'll reply within 1 business day.",
          })
        }
      >
        Success toast
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast({
            variant: "error",
            title: "We couldn't send your brief",
            description: "Please try again or email promptlypk@gmail.com.",
          })
        }
      >
        Error toast
      </Button>
    </div>
  );
}

function MotionDemos() {
  const [run, setRun] = useState(0);
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <Button variant="secondary" size="sm" iconLeft={<RotateCcw size={15} />} onClick={() => setRun((r) => r + 1)}>
          Replay
        </Button>
        <p className="text-sm text-fg-muted">
          Easing cubic-bezier(0.22, 1, 0.36, 1) · 400–700ms · 12px rise · 60ms stagger · once at 20% in
          view · off under reduced motion.
        </p>
      </div>
      <div key={run} className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-4 font-mono text-xs text-fg-subtle">Hero line reveal</p>
          <p className="text-h2">
            <LineReveal
              lines={[
                "Your next chapter.",
                <>
                  Beautifully <span className="text-signature">engineered</span>
                  <span className="text-spark">.</span>
                </>,
              ]}
            />
          </p>
        </div>
        <div>
          <p className="mb-4 font-mono text-xs text-fg-subtle">Section entrance (staggered)</p>
          <Stagger className="space-y-3">
            {["Capture", "Connect", "Act"].map((step, i) => (
              <StaggerItem key={step}>
                <div className="flex items-center gap-4 rounded-card border border-border bg-bg-raised px-5 py-4 shadow-elev-1">
                  <span className="font-mono text-xs text-accent-text">0{i + 1}</span>
                  <span className="font-medium">{step}</span>
                  {i === 2 && <Badge variant="live" className="ml-auto">Active</Badge>}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.3}>
            <p className="mt-4 text-sm text-fg-muted">Single Reveal with a 300ms delay.</p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function MiniDashboard() {
  return (
    <div className="grid h-full min-h-[260px] grid-cols-[110px_1fr] text-[10px]" aria-hidden>
      <div className="space-y-2 border-r border-border bg-bg-sunken/60 p-3">
        <div className="mb-4 h-2.5 w-14 rounded-full bg-accent" />
        {[70, 55, 62, 48].map((w, i) => (
          <div key={i} className={cn("h-2 rounded-full", i === 0 ? "bg-fg/30" : "bg-fg/10")} style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="space-y-3 p-4">
        <div className="grid grid-cols-3 gap-3">
          {["Captured", "Connected", "Actioned"].map((label, i) => (
            <div key={label} className="rounded-lg border border-border bg-bg-raised p-2.5">
              <p className="text-fg-subtle">{label}</p>
              <div className={cn("mt-2 h-3 w-10 rounded", i === 2 ? "bg-spark" : "bg-fg/70")} />
            </div>
          ))}
        </div>
        <div className="flex h-28 items-end gap-1.5 rounded-lg border border-border bg-bg-raised p-3">
          {[40, 62, 48, 75, 58, 82, 66, 90, 72, 95].map((h, i) => (
            <div
              key={i}
              className={cn("flex-1 rounded-sm", i === 9 ? "bg-accent" : "bg-accent/30")}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniPhone() {
  return (
    <div className="flex h-full flex-col gap-2 p-3 pt-12 text-[10px]" aria-hidden>
      <div className="mb-1 flex items-center gap-2">
        <Bot size={14} className="text-accent-icon" />
        <span className="font-medium text-fg">Inbox</span>
      </div>
      {[
        ["Order #2041", "Where is my parcel?"],
        ["Booking", "Can I move to Friday?"],
        ["Lead", "Do you deliver to Lahore?"],
      ].map(([title, msg], i) => (
        <div key={title} className="rounded-xl border border-border bg-bg-raised p-2.5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-fg">{title}</span>
            {i === 0 && <span className="size-1.5 rounded-full bg-spark" />}
          </div>
          <p className="mt-1 text-fg-muted">{msg}</p>
        </div>
      ))}
      <div className="mt-auto ml-auto max-w-[80%] rounded-xl bg-accent px-2.5 py-2 text-accent-fg">
        It's out for delivery today.
      </div>
    </div>
  );
}
