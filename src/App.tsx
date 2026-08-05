import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ViewType } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundMotion from "./components/BackgroundMotion";
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

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userDraftPrompt, setUserDraftPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Navigate to a ViewType (used by all child components)
  const setActiveView = (view: ViewType) => {
    navigate(VIEW_PATHS[view]);
  };

  // Derive current active view from pathname for header active-state
  const activeView: ViewType = PATH_TO_VIEW[location.pathname] ?? "home";

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-slate-200 flex flex-col justify-between relative overflow-x-hidden">
      <PageLoader />
      <BackgroundMotion />
      <CursorGlow />

      <div className={`relative z-10 flex flex-col min-h-screen justify-between transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        <Header activeView={activeView} setActiveView={setActiveView} />

        <main className="flex-1">
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
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
