import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ViewType } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundLayer from "./components/background/BackgroundLayer";
import CursorGlow from "./components/CursorGlow";
import PageLoader from "./components/PageLoader";
import HomeView from "./components/HomeView";
import ServicesView from "./components/ServicesView";
import AISolutionsView from "./components/AISolutionsView";
import SoftwareDevelopmentView from "./components/SoftwareDevelopmentView";
import DigitalTransformationView from "./components/DigitalTransformationView";
import StartupSupportView from "./components/StartupSupportView";
import PortfolioView from "./components/PortfolioView";
import AIArchitectView from "./components/AIArchitectView";
import AboutView from "./components/AboutView";
import PortalView from "./components/PortalView";
import ContactView from "./components/ContactView";
import ConsultationView from "./components/ConsultationView";
import XSenderView from "./components/XSenderView";
import ProductsView from "./components/ProductsView";
import StartupsView from "./components/StartupsView";
import EcommerceView from "./components/EcommerceView";
import RealEstateView from "./components/RealEstateView";
import EnterpriseView from "./components/EnterpriseView";

import { VIEW_PATHS, PATH_TO_VIEW } from "./routes";
import { BOOT_MS } from "./motion/reveal";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userDraftPrompt, setUserDraftPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), BOOT_MS);
    return () => clearTimeout(timer);
  }, []);

  // Jump, don't glide. A smooth scroll from deep in a long page takes over a
  // second, during which the incoming route's reveals evaluate against the
  // wrong scroll position and fire early.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  // Navigate to a ViewType (used by all child components)
  const setActiveView = (view: ViewType) => {
    navigate(VIEW_PATHS[view]);
  };

  // Derive current active view from pathname for header active-state
  const activeView: ViewType = PATH_TO_VIEW[location.pathname] ?? "home";

  /*
   * `overflow-x-clip` below, NOT `overflow-x-hidden`.
   *
   * `overflow: hidden` on either axis turns an element into a scroll
   * container, and `position: sticky` inside a scroll container sticks to
   * THAT container rather than the viewport. Since this element never scrolls
   * itself, every pinned scene silently degraded to normal scrolling while
   * still reserving its tall height — leaving big empty gaps. `clip` contains
   * horizontal overflow the same way without creating a scroll container, so
   * sticky keeps working.
   */
  return (
    <div className="min-h-screen bg-[var(--bg-base)] font-sans text-[var(--text-body)] flex flex-col justify-between relative overflow-x-clip">
      <PageLoader />
      <BackgroundLayer />
      <CursorGlow />

      {/*
        Content MOUNTS after the boot overlay clears, rather than sitting behind
        an opacity-0 wrapper.

        This is load-bearing. framer-motion attaches its viewport observer on
        mount and, with `viewport.once`, tears it down after the first
        intersection. If reveals mount while hidden behind the overlay, that
        one-and-only intersection is spent on an invisible page and nothing ever
        animates. Mounting late guarantees every observer attaches to a page the
        user can actually see.
      */}
      {isLoading ? null : (
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <Header activeView={activeView} setActiveView={setActiveView} />

        {/* Keying on pathname remounts the route subtree, so on-mount
            entrances replay for every navigation rather than only the first. */}
        <main className="flex-1" key={location.pathname}>
          <Routes>
            <Route path="/" element={<HomeView setActiveView={setActiveView} setUserDraftPrompt={setUserDraftPrompt} />} />
            <Route path="/services" element={<ServicesView setActiveView={setActiveView} />} />
            <Route path="/services/ai-solutions" element={<AISolutionsView setActiveView={setActiveView} />} />
            <Route path="/services/software-development" element={<SoftwareDevelopmentView setActiveView={setActiveView} />} />
            <Route path="/services/digital-transformation" element={<DigitalTransformationView setActiveView={setActiveView} />} />
            <Route path="/services/startup-support" element={<StartupSupportView setActiveView={setActiveView} />} />
            <Route path="/portfolio" element={<PortfolioView setActiveView={setActiveView} />} />
            <Route path="/ai-architect" element={<AIArchitectView initialPrompt={userDraftPrompt} setUserDraftPrompt={setUserDraftPrompt} setActiveView={setActiveView} />} />
            <Route path="/about" element={<AboutView setActiveView={setActiveView} />} />
            <Route path="/client-portal" element={<PortalView />} />
            <Route path="/contact" element={<ContactView setActiveView={setActiveView} />} />
            <Route path="/consultation" element={<ConsultationView setActiveView={setActiveView} />} />
            <Route path="/products" element={<ProductsView setActiveView={setActiveView} />} />
            <Route path="/products/xsender" element={<XSenderView setActiveView={setActiveView} />} />
            <Route path="/industries/startups" element={<StartupsView setActiveView={setActiveView} />} />
            <Route path="/industries/ecommerce" element={<EcommerceView setActiveView={setActiveView} />} />
            <Route path="/industries/realestate" element={<RealEstateView setActiveView={setActiveView} />} />
            <Route path="/industries/enterprise" element={<EnterpriseView setActiveView={setActiveView} />} />
            {/* Catch-all → home */}
            <Route path="*" element={<HomeView setActiveView={setActiveView} setUserDraftPrompt={setUserDraftPrompt} />} />
          </Routes>
        </main>

        <Footer setActiveView={setActiveView} />
      </div>
      )}
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
