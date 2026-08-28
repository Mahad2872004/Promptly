/**
 * Page background.
 *
 * Previously: two ambient gradient washes, a masked dot lattice, and a lazily
 * mounted animated particle canvas. All four were removed — perpetual ambient
 * motion behind the content was the loudest "generated template" signal on the
 * site, and every section now carries its own explicit surface colour.
 *
 * Kept as a component (rather than deleted) so `App` and any future ambient
 * treatment have one obvious place to live.
 */
export default function BackgroundLayer() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 bg-[var(--bg-base)]"
      aria-hidden
    />
  );
}
