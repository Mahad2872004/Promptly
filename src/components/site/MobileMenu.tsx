import React, { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

const loadSheet = () => import("./MobileSheet");
const MobileSheet = lazy(loadSheet);

/**
 * Menu button for < lg. The full-screen sheet (Radix dialog + accordions) is
 * fetched on first tap — or on touch/hover intent — and stays mounted after.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerDown={() => void loadSheet()}
        onClick={() => {
          setRequested(true);
          setOpen(true);
        }}
        className="inline-flex size-9 items-center justify-center rounded-control text-fg hover:bg-fg/[0.06] lg:hidden"
      >
        <Menu size={20} />
      </button>
      {requested && (
        <Suspense fallback={null}>
          <MobileSheet open={open} setOpen={setOpen} />
        </Suspense>
      )}
    </>
  );
}
