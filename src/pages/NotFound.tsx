import React from "react";
import { Search } from "lucide-react";
import { Button, Eyebrow, GlowOrb, GridBackground, Kbd } from "../components/ui";
import { useCommandPalette, useModKey } from "../components/site/CommandPalette";

export default function NotFound() {
  const palette = useCommandPalette();
  const mod = useModKey();
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden pt-32 pb-24">
      <GridBackground fade="radial" noise />
      <GlowOrb color="teal" size={640} className="-top-64 left-1/2 -translate-x-1/2" />
      <GlowOrb color="orange" size={300} className="right-[8%] bottom-0 [--orb-strength:0.16]" />
      <div className="wrap">
        <Eyebrow marker="dash">Error 404</Eyebrow>
        <h1 className="mt-6 text-[clamp(7rem,22vw,15rem)] leading-[0.85] font-semibold tracking-[-0.06em] text-fg">
          404<span className="text-spark">.</span>
        </h1>
        <p className="mt-8 max-w-xl text-h3 text-fg">This route isn’t in our architecture.</p>
        <p className="mt-3 max-w-xl text-lead text-fg-muted">
          The page may have moved, or it never existed. Search the site, or pick up from one of these.
        </p>
        <button
          type="button"
          onClick={palette.open}
          className="mt-10 flex w-full max-w-md items-center gap-3 rounded-control border border-border-input bg-bg-raised px-4 py-3.5 text-left text-fg-subtle shadow-elev-1 transition-colors hover:border-fg-subtle"
        >
          <Search size={18} aria-hidden />
          <span className="flex-1">Search pages, services, products…</span>
          <Kbd>{mod} K</Kbd>
        </button>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/" iconRight>
            Home
          </Button>
          <Button to="/services" variant="secondary">
            Services
          </Button>
          <Button to="/products" variant="secondary">
            Products
          </Button>
        </div>
      </div>
    </section>
  );
}
