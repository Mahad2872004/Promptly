/**
 * Single source of truth for the Promptly module accent system.
 *
 * Every colour here is derived from the two gradients in the Promptly mark
 * (teal-cyan roof/left-bar, orange arrow) plus the deep teal-blue seam where
 * they meet. No hues outside that family are introduced.
 *
 * `core` and `deep` are IDENTICAL across light and dark mode — they drive
 * glows, card borders and status dots, where only the background context
 * changes. `textLight` / `textDark` exist because two of the four families
 * are unreadable as text on the navy background (#155e75 → 2.66:1,
 * #334e68 → 2.23:1). Contrast ratios in the comments are measured against
 * #f7f9fc (light page) and #0a0e17 (dark page).
 */

import type { CSSProperties } from "react";

export type ModuleId = "ai" | "product" | "dev" | "startup";

export interface ModuleAccent {
  id: ModuleId;
  label: string;
  /** Glow / dot / border colour. Same hex in both themes. */
  core: string;
  /** Deeper sibling for gradient stops and pressed states. Same hex in both themes. */
  deep: string;
  /** AA-compliant text colour on the light page. */
  textLight: string;
  /** AA-compliant text colour on the dark page. */
  textDark: string;
  /** CSS variable prefix, e.g. `--mod-ai`. */
  cssVar: string;
}

export const MODULE_ACCENTS: Record<ModuleId, ModuleAccent> = {
  // Flagship. Leads AGENCY_SERVICES and carries the "AI-First" badge.
  ai: {
    id: "ai",
    label: "AI-Powered Solutions",
    core: "#2dd4bf", // 10.37:1 on navy
    deep: "#0e7490",
    textLight: "#0e7490", // 5.08:1 on off-white
    textDark: "#2dd4bf",
    cssVar: "--mod-ai",
  },
  // Digital Transformation + xSender. data.ts already links them via caseStudyRef.
  product: {
    id: "product",
    label: "Digital Transformation & xSender",
    core: "#fb923c", // 8.53:1 on navy
    deep: "#ea580c",
    textLight: "#c2410c", // 4.91:1 — #ea580c is only 3.37:1, AA-Large at best
    textDark: "#fb923c",
    cssVar: "--mod-product",
  },
  // The seam between the two gradients. Doubles as the connector colour in pipelines.
  dev: {
    id: "dev",
    label: "Software Development",
    core: "#155e75",
    deep: "#0891b2",
    textLight: "#155e75", // 6.89:1 on off-white
    textDark: "#4bb8d6", // 8.39:1 — #155e75 itself is 2.66:1 on navy
    cssVar: "--mod-dev",
  },
  // Fourth slot: muted violet-teal, blended from the seam rather than a new hue.
  startup: {
    id: "startup",
    label: "Startup Support",
    core: "#334e68",
    deep: "#475569",
    textLight: "#334e68", // 8.19:1 on off-white
    textDark: "#8aa6c0", // 7.62:1 — #334e68 itself is 2.23:1 on navy
    cssVar: "--mod-startup",
  },
};

/** Maps the ids in data.ts → AGENCY_SERVICES onto module accents. */
export const SERVICE_MODULE_MAP: Record<string, ModuleId> = {
  "ai-powered-solutions": "ai",
  "digital-transformation": "product",
  "software-development": "dev",
  "startup-support": "startup",
};

export function accentFor(id: ModuleId | undefined): ModuleAccent {
  return MODULE_ACCENTS[id ?? "ai"];
}

/**
 * Inline style object that scopes a subtree to one module's accent, so
 * components can read `var(--accent-core)` without knowing which module
 * they belong to.
 */
export function accentVars(id: ModuleId | undefined): CSSProperties {
  const a = accentFor(id);
  return {
    ["--accent-core" as string]: a.core,
    ["--accent-deep" as string]: a.deep,
    ["--accent-text-light" as string]: a.textLight,
    ["--accent-text-dark" as string]: a.textDark,
  } as CSSProperties;
}
