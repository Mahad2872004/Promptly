import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ViewType } from "./types";
import XSenderProject from "./components/XSenderProject";
import Seo from "./components/Seo";
import MotionExperience from "./components/MotionExperience";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AISolutionsView from "./components/AISolutionsView";
import SoftwareDevelopmentView from "./components/SoftwareDevelopmentView";
import DigitalTransformationView from "./components/DigitalTransformationView";
import StartupSupportView from "./components/StartupSupportView";
import AIArchitectView from "./components/AIArchitectView";
import PortalView from "./components/PortalView";
import ContactView from "./components/ContactView";
import StartupsView from "./components/StartupsView";
import EcommerceView from "./components/EcommerceView";
import RealEstateView from "./components/RealEstateView";
import EnterpriseView from "./components/EnterpriseView";

import { VIEW_PATHS, PATH_TO_VIEW } from "./routes";
import {
  Home,
  Services,
  Products,
  XSender,
  Work,
  About,
  Consultation,
  Intro,
} from "./components/Marketing";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userDraftPrompt, setUserDraftPrompt] = useState("");

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
  const activeView: ViewType =
    PATH_TO_VIEW[location.pathname.replace(/\/+$/, "") || "/"] ?? "home";

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
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <Seo />
        <MotionExperience />
        <Header activeView={activeView} setActiveView={setActiveView} />

        {/* Keying on pathname remounts the route subtree, so on-mount
            entrances replay for every navigation rather than only the first. */}
        <main
          id="main"
          tabIndex={-1}
          className="flex-1"
          key={location.pathname}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route
              path="/services/ai-solutions"
              element={<AISolutionsView setActiveView={setActiveView} />}
            />
            <Route
              path="/services/software-development"
              element={
                <SoftwareDevelopmentView setActiveView={setActiveView} />
              }
            />
            <Route
              path="/services/digital-transformation"
              element={
                <DigitalTransformationView setActiveView={setActiveView} />
              }
            />
            <Route
              path="/services/startup-support"
              element={<StartupSupportView setActiveView={setActiveView} />}
            />
            <Route path="/portfolio" element={<Work />} />
            <Route
              path="/ai-architect"
              element={
                <AIArchitectView
                  initialPrompt={userDraftPrompt}
                  setUserDraftPrompt={setUserDraftPrompt}
                  setActiveView={setActiveView}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/client-portal"
              element={
                <>
                  <p className="demo-notice">
                    Interactive demonstration — sample data and simulated
                    replies. Changes are not saved.
                  </p>
                  <PortalView />
                </>
              }
            />
            <Route
              path="/contact"
              element={<ContactView setActiveView={setActiveView} />}
            />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/xsender" element={<XSender />} />
            <Route
              path="/industries/startups"
              element={<StartupsView setActiveView={setActiveView} />}
            />
            <Route
              path="/industries/ecommerce"
              element={<EcommerceView setActiveView={setActiveView} />}
            />
            <Route
              path="/industries/realestate"
              element={<RealEstateView setActiveView={setActiveView} />}
            />
            <Route
              path="/industries/enterprise"
              element={<EnterpriseView setActiveView={setActiveView} />}
            />
            {/* Dedicated project route and an explicit not-found state. */}
            <Route path="/portfolio/xsender" element={<XSenderProject />} />
            <Route
              path="*"
              element={
                <>
                  <Intro
                    label="404 / PAGE NOT FOUND"
                    title="This page has moved out of reach."
                    lead="Use the navigation to explore our services and products, or get in touch with your question."
                  />
                </>
              }
            />
          </Routes>
        </main>

        <Footer setActiveView={setActiveView} />
      </div>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
