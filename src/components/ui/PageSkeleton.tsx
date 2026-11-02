import React from "react";

/**
 * Placeholder while a lazy route downloads: the shape of a split hero, so the
 * swap to real content doesn't jump. Shimmer is static under reduced motion.
 */
export function PageSkeleton() {
  const bar = "rounded-full bg-fg/[0.07] motion-safe:animate-pulse";
  return (
    <div role="status" aria-label="Loading page" className="wrap-wide min-h-screen pt-32 md:pt-40">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div className="space-y-5">
          <div className={`${bar} h-3 w-32`} />
          <div className={`${bar} h-12 w-11/12 md:h-16`} />
          <div className={`${bar} h-12 w-3/4 md:h-16`} />
          <div className={`${bar} mt-8 h-4 w-full max-w-md`} />
          <div className={`${bar} h-4 w-4/5 max-w-sm`} />
          <div className="flex gap-3 pt-6">
            <div className="h-13 w-40 rounded-control bg-accent/25 motion-safe:animate-pulse" />
            <div className="h-13 w-32 rounded-control bg-fg/[0.07] motion-safe:animate-pulse" />
          </div>
        </div>
        <div className="aspect-[5/4] rounded-frame border border-border bg-bg-raised motion-safe:animate-pulse" />
      </div>
    </div>
  );
}
