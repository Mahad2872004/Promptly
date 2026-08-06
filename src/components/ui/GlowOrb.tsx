import React from "react";
import { ModuleId, accentFor } from "../../theme/tokens";
import { useTheme } from "../../theme/ThemeProvider";

interface GlowOrbProps {
  /** Which module's accent drives the core. Defaults to the flagship teal. */
  color?: ModuleId;
  /** Diameter in px at the largest breakpoint. Scales down responsively. */
  size?: number;
  className?: string;
  /** Adds a warm orange halo bleeding outward. On for hero orbs. */
  halo?: boolean;
  /** Suppresses the breathing animation regardless of motion preference. */
  still?: boolean;
  /**
   * Scales the whole orb's presence, 0–1. The --orb-* tokens are tuned for a
   * hero sitting behind body copy; a full-bleed context like the boot overlay
   * needs the same orb dialled back or it floods the screen.
   */
  intensity?: number;
  style?: React.CSSProperties;
}

/**
 * The signature orb.
 *
 *  dark  → bright radial sphere: white-hot centre → teal-cyan core, with a
 *          large low-opacity orange halo bleeding outward
 *  light → the same gradient DNA rendered as a soft, large, 10–15% opacity
 *          blob — coloured light through frosted glass, not a glowing sphere
 *
 * Opacities and the core centre come from --orb-* tokens, so a theme switch
 * re-renders nothing: the CSS variables simply resolve differently.
 */
export default function GlowOrb({
  color = "ai",
  size = 520,
  className = "",
  halo = true,
  still = false,
  intensity = 1,
  style,
}: GlowOrbProps) {
  const accent = accentFor(color);
  const { reducedMotion } = useTheme();
  const animate = !still && !reducedMotion;

  return (
    // Deliberately `relative`, not `absolute`: the orb needs intrinsic size so
    // a positioned wrapper can centre it. Callers place it by wrapping this in
    // their own absolutely-positioned element.
    <div
      aria-hidden
      className={`pointer-events-none relative ${className}`}
      style={{
        width: size,
        height: size,
        maxWidth: "90vw",
        maxHeight: "90vw",
        opacity: intensity,
        ...style,
      }}
    >
      {halo && (
        <div
          className="absolute inset-[-28%] rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 55%, var(--orb-halo) 0%, transparent 62%)`,
            opacity: "var(--orb-halo-opacity)",
            filter: "blur(72px)",
            animation: animate
              ? "orb-breathe-slow 15s ease-in-out infinite"
              : undefined,
            transition: "opacity 300ms ease",
          }}
        />
      )}

      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 50% 45%, var(--orb-core-center) 0%, ${accent.core} 38%, ${accent.deep} 66%, transparent 78%)`,
          opacity: "var(--orb-core-opacity)",
          filter: "blur(44px)",
          animation: animate ? "orb-breathe 11s ease-in-out infinite" : undefined,
          transition: "opacity 300ms ease",
        }}
      />
    </div>
  );
}
