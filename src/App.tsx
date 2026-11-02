import React, { lazy, Suspense, useEffect, useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import Seo from "./components/Seo";
import { SiteHeader } from "./components/site/SiteHeader";
import { SiteFooter } from "./components/site/SiteFooter";
import { CommandPaletteProvider } from "./components/site/CommandPalette";
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound";
import { PageSkeleton } from "./components/ui/PageSkeleton";
import { useChatWidgetTheme } from "./components/site/useHideChatWidget";
import { REDIRECTS } from "./seo";
import { products } from "./data/products";
import { allServices } from "./content/services";

// Home ships in the main bundle (it's the landing page); every other route is
// split into its own chunk and loaded on navigation.
const ServicesOverview = lazy(() => import("./pages/services/ServicesOverview"));
const ServicePage = lazy(() => import("./pages/service/ServicePage").then((m) => ({ default: m.ServicePage })));
const ProductsOverview = lazy(() => import("./pages/products/ProductsOverview"));
const ProductPage = lazy(() => import("./pages/product/ProductPage").then((m) => ({ default: m.ProductPage })));
const Industries = lazy(() => import("./pages/industries/Industries"));
const Process = lazy(() => import("./pages/process/Process"));
const About = lazy(() => import("./pages/about/About"));
const Faq = lazy(() => import("./pages/faq/Faq"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const Blueprint = lazy(() => import("./pages/blueprint/Blueprint"));
const PortalDemo = lazy(() => import("./pages/portal/PortalDemo"));
const Privacy = lazy(() => import("./pages/Legal").then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import("./pages/Legal").then((m) => ({ default: m.Terms })));
const Styleguide = lazy(() => import("./pages/Styleguide"));

/**
 * Scroll to the #hash target once it has rendered. Lazy routes may still be
 * downloading, so keep looking for ~3s of frames.
 */
function scrollToHash(id: string, attempts = 180) {
  const el = document.getElementById(id);
  if (el) return el.scrollIntoView();
  if (attempts > 0) requestAnimationFrame(() => scrollToHash(id, attempts - 1));
}

export default function App() {
  const location = useLocation();
  useChatWidgetTheme();

  // Jump, don't glide: a long smooth scroll would make the incoming route's
  // reveals evaluate against the wrong position. Hash links land on target.
  useEffect(() => {
    if (location.hash) scrollToHash(decodeURIComponent(location.hash.slice(1)));
    else window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname, location.hash]);

  // The first page is pre-rendered HTML and must show immediately (and match
  // the server markup), so only in-app navigations get the fade.
  const firstRender = useRef(true);
  useEffect(() => {
    firstRender.current = false;
  }, []);

  /*
   * `overflow-x-clip`, not `overflow-x-hidden`: `hidden` creates a scroll
   * container, which silently breaks every `position: sticky` inside it.
   */
  return (
    <CommandPaletteProvider>
      <div className="relative flex min-h-screen flex-col overflow-x-clip bg-bg font-sans text-fg">
        <Seo />
        <SiteHeader />

        {/* Keyed on pathname so entrances replay per route; the 200ms fade is
            the route transition. */}
        <motion.main
          id="main"
          tabIndex={-1}
          className="flex-1 outline-none"
          key={location.pathname}
          initial={firstRender.current ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              {Object.entries(REDIRECTS).map(([from, to]) => (
                <Route key={from} path={from} element={<Navigate to={to} replace />} />
              ))}

              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesOverview />} />
              {allServices.map((s) => (
                <Route key={s.slug} path={s.path} element={<ServicePage service={s} />} />
              ))}
              <Route path="/products" element={<ProductsOverview />} />
              {products.map((p) => (
                <Route key={p.id} path={p.path} element={<ProductPage product={p} />} />
              ))}
              <Route path="/industries" element={<Industries />} />
              <Route path="/process" element={<Process />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blueprint" element={<Blueprint />} />
              <Route path="/portal-demo" element={<PortalDemo />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/styleguide" element={<Styleguide />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.main>

        <SiteFooter />
      </div>
    </CommandPaletteProvider>
  );
}
