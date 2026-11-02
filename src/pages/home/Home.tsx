import React from "react";
import {
  Button,
  Eyebrow,
  GlowOrb,
  GridBackground,
  LineReveal,
  Reveal,
  Rise,
} from "../../components/ui";
import { ClosingCTA } from "../../components/site/ClosingCTA";
import { ProofSection, TrustStrip } from "../../components/site/Proof";
import { HeroWorkspace } from "./HeroWorkspace";
import { Capabilities } from "./Capabilities";
import { ProductsBento } from "./ProductsBento";
import { ConnectedStory } from "./ConnectedStory";
import { ProcessLine } from "./ProcessLine";
import { ToolsPreview } from "./ToolsPreview";

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <GridBackground fade="radial" noise />
        <GlowOrb color="teal" size={900} className="top-[38%] left-1/2 -translate-x-1/2" drift />
        <GlowOrb color="orange" size={320} className="top-[55%] right-[6%] [--orb-strength:0.12]" />

        <div className="wrap flex flex-col items-center text-center">
          <Rise>
            <Eyebrow>Independent thinking. Connected engineering.</Eyebrow>
          </Rise>
          <h1 className="mt-7 text-display text-fg">
            <LineReveal
              lines={[
                "Your next chapter.",
                <>
                  Beautifully <span className="text-signature">engineered</span>
                  <span className="text-spark">.</span>
                </>,
              ]}
            />
          </h1>
          <Rise delay={0.35}>
            <p className="mt-7 max-w-2xl text-lead text-fg-muted">
              Custom software. Intelligent automation. Products with purpose. We turn business challenges into
              systems that move you forward.
            </p>
          </Rise>
          <Rise delay={0.45} className="mt-10 flex flex-wrap justify-center gap-3">
            <Button to="/contact" size="lg" iconRight signature data-hero-cta>
              Start a project
            </Button>
            <Button to="/products" size="lg" variant="secondary" iconRight>
              Explore products
            </Button>
          </Rise>
          <Rise delay={0.5}>
            <p className="mt-6 font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">
              Your business context. Our engineering mindset.
            </p>
          </Rise>
        </div>

        <Rise delay={0.55} className="wrap-wide mt-16 md:mt-20 md:pl-16 lg:pl-24">
          <HeroWorkspace />
        </Rise>
      </section>

      <div className="border-y border-border bg-bg-sunken/40">
        <TrustStrip />
      </div>

      <Capabilities />
      <ProductsBento />
      <ConnectedStory />
      <ProofSection />
      <ProcessLine />
      <ToolsPreview />

      <section className="border-t border-border section-y" aria-labelledby="perspective">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow marker="dash">The Promptly perspective</Eyebrow>
            <h2 id="perspective" className="mt-5 text-h2 text-fg">
              Think like a partner.
              <br />
              Build like an owner<span className="text-spark">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-4 text-lg text-fg-muted lg:col-span-5 lg:pt-12">
            <p>
              Good software is more than a successful handoff. It should be understandable, maintainable, and useful
              long after launch.
            </p>
            <p>
              Building our own products keeps us close to those decisions. We bring that same care to the systems we
              build with you.
            </p>
            <div className="pt-2">
              <Button variant="link" to="/about" iconRight>
                Get to know Promptly
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <ClosingCTA
        tone="signature"
        eyebrow="The next thing starts here"
        title="What should your software make possible?"
        lead="Bring us the problem, the idea, or the system you’ve outgrown. Let’s work out what comes next."
      />
    </>
  );
}
