import React from "react";
import { motion, useTransform } from "motion/react";
import { ArrowRight, ChevronDown, Play, ShieldCheck, Users, Zap } from "lucide-react";
import { ViewType } from "../../types";
import SceneSection from "./SceneSection";
import GlowOrb from "../ui/GlowOrb";
import { useTheme } from "../../theme/ThemeProvider";

interface HeroSceneProps {
  setActiveView: (view: ViewType) => void;
}

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Enterprise Security", accent: "--mod-ai" },
  { icon: Zap, label: "Fast Delivery", accent: "--mod-product" },
  { icon: Users, label: "Expert Team", accent: "--mod-dev" },
] as const;

/**
 * Scene 1 — Hero.
 *
 * Pins for one viewport height while the orb expands and the copy lifts and
 * fades, then releases into the Systems scene. Copy is verbatim from the
 * previous hero; only the presentation changed.
 */
export default function HeroScene({ setActiveView }: HeroSceneProps) {
  const { reducedMotion } = useTheme();

  return (
    <SceneSection id="scene-hero" scrollLength={1}>
      {({ progress, pinned }) => (
        <HeroContent
          progress={progress}
          pinned={pinned}
          reducedMotion={reducedMotion}
          setActiveView={setActiveView}
        />
      )}
    </SceneSection>
  );
}

function HeroContent({
  progress,
  pinned,
  reducedMotion,
  setActiveView,
}: {
  progress: import("motion/react").MotionValue<number>;
  pinned: boolean;
  reducedMotion: boolean;
  setActiveView: (view: ViewType) => void;
}) {
  // Hooks must run unconditionally; the outputs are simply ignored when the
  // scene isn't pinned, so a mobile visitor gets a plain static hero.
  const copyY = useTransform(progress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(progress, [0, 0.62, 0.9], [1, 1, 0]);
  const orbScale = useTransform(progress, [0, 1], [1, 1.7]);
  const orbOpacity = useTransform(progress, [0, 0.7, 1], [1, 0.85, 0.25]);
  const hintOpacity = useTransform(progress, [0, 0.08], [1, 0]);

  const live = pinned && !reducedMotion;
  const style = (mv: unknown) => (live ? (mv as never) : undefined);

  return (
    <>
    <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      {/* Orb sits behind the headline, centred on it. The wrapper carries the
          centring; GlowOrb supplies the intrinsic size. */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ scale: style(orbScale), opacity: style(orbOpacity) }}
      >
        <GlowOrb color="ai" size={620} halo />
      </motion.div>

      {/*
        Two layers, deliberately separate:
          outer — scroll-linked (drives y/opacity as the scene is scrolled)
          inner — the on-load fade+rise
        They can't share one element: the scroll transform owns `opacity` and
        `y` and pins them to progress 0 on arrival, which would swallow the
        entrance entirely.
      */}
      <motion.div
        className="relative"
        style={{ y: style(copyY), opacity: style(copyOpacity) }}
      >
      {/*
        Variant-based, not `initial`/`animate` objects with orchestration keys
        mixed into the transition. Measured in-browser: putting staggerChildren
        alongside duration/ease in one non-variant transition makes motion skip
        interpolating `opacity` entirely — it holds at 0 and snaps to 1 when the
        transform finishes. Variants keep orchestration and per-value tweens in
        their proper places, and give the headline → body → CTA cascade.
      */}
      <motion.div
        className="flex flex-col items-center text-center"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={heroItem} className="eyebrow mb-5">
          Premium Digital Agency
        </motion.p>

        {/* Short emotional tagline — script face, teal accent, never body copy. */}
        <motion.p variants={heroItem} className="script-tagline mb-4">
          Software that thinks ahead.
        </motion.p>

        <motion.h1
          variants={heroItem}
          className="display-heading text-[2.75rem] sm:text-6xl lg:text-[4.75rem]"
        >
          AI-Powered{" "}
          <span className="italic accent-text" style={{ fontWeight: 700 }}>
            Digital Solutions
          </span>
          <br />
          for Startups &amp; Businesses
          <span style={{ color: "var(--mod-ai-text)" }}>.</span>
        </motion.h1>

        <motion.p variants={heroItem} className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--text-body)] sm:text-lg">
          Promptly delivers AI-powered digital solutions for startups and
          businesses — and builds its own products to scale beyond services.
        </motion.p>

        <motion.div variants={heroItem} className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            type="button"
            id="hero-cta-contact"
            onClick={() => setActiveView("contact")}
            className="btn-primary magnetic-btn group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            type="button"
            id="hero-cta-portfolio"
            onClick={() => setActiveView("portfolio")}
            className="btn-secondary magnetic-btn group inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold"
          >
            <Play className="h-4 w-4" style={{ color: "var(--mod-ai-text)" }} />
            View Our Work
          </button>
        </motion.div>

        <motion.div variants={heroItem} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {TRUST_BADGES.map(({ icon: Icon, label, accent }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-xs text-[var(--text-micro)]"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  background: `color-mix(in srgb, var(${accent}-core) 12%, transparent)`,
                }}
              >
                <Icon
                  className="h-4 w-4"
                  style={{ color: `var(${accent}-text)` }}
                />
              </span>
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
      </motion.div>
    </div>

      {/* Scroll hint — pinned to the bottom of the viewport, not to the copy
          block, so a tall headline can't push it off-screen. Fades the instant
          the user starts scrolling. */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2"
        style={{ opacity: style(hintOpacity) }}
        aria-hidden
      >
        <span className="eyebrow">Scroll to activate</span>
        <ChevronDown className="h-4 w-4 animate-scroll-hint text-[var(--text-micro)]" />
      </motion.div>
    </>
  );
}
