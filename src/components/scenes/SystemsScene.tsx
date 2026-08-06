import React, { useMemo, useState } from "react";
import { MotionValue, motion, useReducedMotion, useTransform } from "motion/react";
import { REVEAL_VIEWPORT, revealTransition, revealVariants } from "../../motion/reveal";
import { Bot, Cpu, Monitor, Smartphone } from "lucide-react";
import { AGENCY_SERVICES } from "../../data";
import { AgencyService, ViewType } from "../../types";
import { SERVICE_MODULE_MAP, accentFor } from "../../theme/tokens";
import SceneSection from "./SceneSection";
import GlowOrb from "../ui/GlowOrb";
import ProductCard from "../ui/ProductCard";
import DetailModal from "../ui/DetailModal";

interface SystemsSceneProps {
  setActiveView: (view: ViewType) => void;
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "ai-powered-solutions": <Bot className="h-5 w-5" />,
  "software-development": <Monitor className="h-5 w-5" />,
  "digital-transformation": <Cpu className="h-5 w-5" />,
  "startup-support": <Smartphone className="h-5 w-5" />,
};

/** Service id → route, so the modal's action can deep-link to the full page. */
const SERVICE_ROUTES: Record<string, ViewType> = {
  "ai-powered-solutions": "ai-solutions",
  "software-development": "software-development",
  "digital-transformation": "digital-transformation",
  "startup-support": "startup-support",
};

const FILTERS = ["all", "AI & Automation", "Software Development"] as const;
type Filter = (typeof FILTERS)[number];

/**
 * Scene 2 — Systems.
 *
 * Four orbs, one per offering, drift in from the corners and settle behind a
 * 2×2 grid of glass cards as the scene scrolls. Each card opens a focus-trapped
 * detail dialog. The category filter from the previous Services section is
 * preserved.
 */
export default function SystemsScene({ setActiveView }: SystemsSceneProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const services = useMemo(
    () =>
      AGENCY_SERVICES.filter(
        (s) => filter === "all" || s.category === filter
      ),
    [filter]
  );

  const active = AGENCY_SERVICES.find((s) => s.id === openId) ?? null;
  const activeModule = active ? SERVICE_MODULE_MAP[active.id] ?? "ai" : "ai";

  return (
    <>
      <SceneSection id="scene-systems" scrollLength={1.15}>
        {({ progress, pinned }) => (
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <header className="mb-6 text-center">
              <p className="eyebrow mb-2">Our Services</p>
              <p className="script-tagline mb-2">Whatever you need.</p>
              <h2 className="display-heading text-3xl sm:text-4xl lg:text-5xl">
                Systems we{" "}
                <span className="italic" style={{ color: "var(--mod-ai-text)" }}>
                  build
                </span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-[var(--text-body)] sm:text-sm">
                Web applications, AI automation, AI systems, and app
                development—every solution we ship is AI‑native,
                production‑ready, and built to scale.
              </p>
            </header>

            <div
              className="mb-5 flex flex-wrap justify-center gap-2"
              role="group"
              aria-label="Filter services by category"
            >
              {FILTERS.map((f) => {
                const isActive = filter === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={isActive}
                    className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all ${
                      isActive ? "btn-primary" : "btn-secondary"
                    }`}
                  >
                    {f === "all" ? "All" : f}
                  </button>
                );
              })}
            </div>

            {/* 2×2 on desktop, stacked on mobile. */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {services.map((service, i) => (
                <SystemCard
                  key={service.id}
                  service={service}
                  index={i}
                  total={services.length}
                  progress={progress}
                  pinned={pinned}
                  onOpen={() => setOpenId(service.id)}
                />
              ))}
            </div>
          </div>
        )}
      </SceneSection>

      {active && (
        <DetailModal
          open
          onClose={() => setOpenId(null)}
          accent={activeModule}
          eyebrow={active.category}
          title={active.title}
          description={active.description}
          setupCost={active.setupCost}
          ongoingCost={active.ongoingCost}
          includes={active.details}
          caveats={active.caveats}
          action={{
            label: `Explore ${active.title}`,
            onClick: () => {
              setOpenId(null);
              setActiveView(SERVICE_ROUTES[active.id] ?? "services");
            },
          }}
        />
      )}
    </>
  );
}

/**
 * One card plus the orb that drifts in behind it. Owns its own transforms so
 * the hook count stays stable when the filter changes the rendered set.
 */
function SystemCard({
  service,
  index,
  total,
  progress,
  pinned,
  onOpen,
}: {
  service: AgencyService;
  index: number;
  total: number;
  progress: MotionValue<number>;
  pinned: boolean;
  onOpen: () => void;
}) {
  const moduleId = SERVICE_MODULE_MAP[service.id] ?? "ai";
  const tone = accentFor(moduleId);
  const reducedMotion = useReducedMotion() ?? false;

  // Cards resolve in sequence, ~14% of the scene apart, so the grid assembles
  // card by card rather than as one block.
  const start = 0.05 + index * 0.14;
  const end = start + 0.3;

  // Orbs start scattered outward from the grid centre and converge onto their
  // card as it resolves.
  const spreadX = index % 2 === 0 ? -280 : 280;
  const spreadY = index < total / 2 ? -220 : 220;
  const orbX = useTransform(progress, [start, end], [spreadX, 0]);
  const orbY = useTransform(progress, [start, end], [spreadY, 0]);
  const orbScale = useTransform(progress, [start, end], [1.5, 1]);

  const live = pinned;
  const mv = (v: MotionValue<number>) => (live ? (v as never) : undefined);

  return (
    /*
     * The card's fade+rise runs on `whileInView`, NOT on scroll progress.
     *
     * Verified in-browser: on an element whose `style` carries both a
     * scroll-linked `opacity` and a scroll-linked `y`, motion keeps writing the
     * transform channel but stops writing opacity — the MotionValue reads 1
     * while the DOM stays at 0, leaving the cards permanently invisible. The
     * orb below still uses scroll transforms, which were measured to update
     * correctly; only the opacity channel moves to the viewport system that the
     * other 17 routes already use.
     */
    <motion.div
      className="relative"
      variants={revealVariants("fade-up", reducedMotion)}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
      transition={{ ...revealTransition, delay: reducedMotion ? 0 : index * 0.08 }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ x: mv(orbX), y: mv(orbY), scale: mv(orbScale) }}
      >
        <GlowOrb color={moduleId} size={340} halo={false} />
      </motion.div>

      <ProductCard
        index={index}
        accent={moduleId}
        title={service.title}
        description={service.description}
        badge={service.badge}
        stat={service.setupCost ? `Setup: ${service.setupCost}` : undefined}
        icon={SERVICE_ICONS[service.id]}
        onClick={onOpen}
        compact
        ariaLabel={`${service.title} — ${tone.label} details`}
        className="relative"
      />
    </motion.div>
  );
}
