import React from "react";
import { ModuleId } from "../../theme/tokens";
import GlowOrb from "./GlowOrb";

/**
 * Per-route atmosphere: the signature orb, parked behind the page header.
 *
 * Sub-routes aren't scroll-scenes, but they still need to read as part of the
 * same control-center language rather than "the old page in new colours".
 * One orb in each page's module accent does most of that work; the glass
 * cards and type roles do the rest.
 *
 * Absolutely positioned and pointer-events-none, so it never affects layout
 * or interaction. Opacity/animation come from the --orb-* tokens, so it
 * reinterprets itself per theme and goes still under reduced motion.
 */
export default function PageAtmosphere({
  module = "ai",
  size = 620,
}: {
  module?: ModuleId;
  size?: number;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 flex justify-center overflow-hidden"
      style={{ height: size }}
    >
      <div className="relative -translate-y-1/3">
        <GlowOrb color={module} size={size} halo />
      </div>
    </div>
  );
}
