/**
 * Promptly accent system — deliberately single-hue.
 *
 * The site previously ran four accent families (teal / orange / deep-blue /
 * slate-violet), one per service module. Every card, badge, icon tile and
 * button picked a different one, which is what made the page read as a
 * template rather than a software company's site.
 *
 * There is now ONE brand colour. `MODULE_ACCENTS` is kept so the ~40 call
 * sites that pass a module id still compile, but every entry resolves to the
 * same values — a module id is now purely a label, never a colour choice.
 *
 * Contrast is measured against #ffffff (light page) and #0b111a (dark page).
 */

import type { CSSProperties } from "react";

export type ModuleId = "ai" | "product" | "dev" | "startup";

export interface ModuleAccent {
  id: ModuleId;
  label: string;
  /** Border / dot / icon colour. */
  core: string;
  /** Deeper sibling for pressed and hover states. */
  deep: string;
  /** AA-compliant text colour on the light page. */
  textLight: string;
  /** AA-compliant text colour on the dark page. */
  textDark: string;
  /** CSS variable prefix, e.g. `--mod-ai`. Retained for legacy call sites. */
  cssVar: string;
}

/** The single brand accent. Everything below is a labelled view of this. */
export const BRAND = {
  core: "#0891b2", // brand-600
  deep: "#155e75", // brand-800
  textLight: "#0e7490", // brand-700 — 5.37:1 on white
  textDark: "#22cce8", // brand-400  — 10.4:1 on #0b111a
  /** Ink to place on top of a solid brand fill. */
  onSolidLight: "#ffffff",
  onSolidDark: "#04212b",
} as const;

function moduleAccent(id: ModuleId, label: string): ModuleAccent {
  return {
    id,
    label,
    core: BRAND.core,
    deep: BRAND.deep,
    textLight: BRAND.textLight,
    textDark: BRAND.textDark,
    cssVar: `--mod-${id}`,
  };
}

export const MODULE_ACCENTS: Record<ModuleId, ModuleAccent> = {
  ai: moduleAccent("ai", "AI-Powered Solutions"),
  product: moduleAccent("product", "Digital Transformation & xSender"),
  dev: moduleAccent("dev", "Software Development"),
  startup: moduleAccent("startup", "Startup Support"),
};

/** Maps the ids in data.ts → AGENCY_SERVICES onto module labels. */
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
 * Scopes a subtree to the brand accent so components can read
 * `var(--accent-core)` without knowing anything about colour.
 *
 * The values are identical for every module id — the signature is kept only
 * so existing `style={accentVars(moduleId)}` call sites keep working.
 */
export function accentVars(_id?: ModuleId): CSSProperties {
  return {
    ["--accent-core" as string]: "var(--accent)",
    ["--accent-deep" as string]: "var(--accent-hover)",
    ["--accent-text-light" as string]: "var(--accent)",
    ["--accent-text-dark" as string]: "var(--accent)",
  } as CSSProperties;
}
