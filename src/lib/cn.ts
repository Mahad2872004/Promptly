import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the custom scales from styles/tokens.css, otherwise it
// reads `text-h2` as a colour and lets it survive next to `text-sm`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h1", "h2", "h3", "lead", "eyebrow"],
      radius: ["control", "card", "panel", "frame"],
      shadow: ["elev-1", "elev-2", "elev-3"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
