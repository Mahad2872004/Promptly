import type { ModuleId } from "../../theme/tokens";

interface PageAtmosphereProps {
  module?: ModuleId;
  size?: number;
  className?: string;
}

/**
 * Was a large blurred accent orb pinned behind each route's hero.
 *
 * Now inert. Every page draws its own surface colour from the token layer, so
 * an ambient glow adds nothing but the "AI-generated template" read the
 * redesign set out to remove. The props are kept so the ~13 route components
 * that mount it keep type-checking.
 */
export default function PageAtmosphere(_props: PageAtmosphereProps) {
  return null;
}
