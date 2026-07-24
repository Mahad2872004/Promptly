import React, { useState, useEffect } from "react";
import { ViewType } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundMotion from "./components/BackgroundMotion";
import CursorGlow from "./components/CursorGlow";
import PageLoader from "./components/PageLoader";
import HomeView from "./components/HomeView";
import ServicesView from "./components/ServicesView";
import PortfolioView from "./components/PortfolioView";
import AIArchitectView from "./components/AIArchitectView";
import AboutView from "./components/AboutView";
import PortalView from "./components/PortalView";
import ContactView from "./components/ContactView";
import ConsultationView from "./components/ConsultationView";

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>("home");
  const [userDraftPrompt, setUserDraftPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case "home":
        return (
          <HomeView
            setActiveView={setActiveView}
            setUserDraftPrompt={setUserDraftPrompt}
          />
        );
      case "services":
        return <ServicesView setActiveView={setActiveView} />;
      case "portfolio":
        return <PortfolioView setActiveView={setActiveView} />;
      case "ai-architect":
        return (
          <AIArchitectView
            initialPrompt={userDraftPrompt}
            setUserDraftPrompt={setUserDraftPrompt}
            setActiveView={setActiveView}
          />
        );
      case "about":
        return <AboutView setActiveView={setActiveView} />;
      case "client-portal":
        return <PortalView />;
      case "contact":
        return <ContactView setActiveView={setActiveView} />;
      case "consultation":
        return <ConsultationView setActiveView={setActiveView} />;
      default:
        return (
          <HomeView
            setActiveView={setActiveView}
            setUserDraftPrompt={setUserDraftPrompt}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-slate-200 flex flex-col justify-between relative overflow-x-hidden">
      <PageLoader />
      <BackgroundMotion />
      <CursorGlow />

      <div className={`relative z-10 flex flex-col min-h-screen justify-between transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Translucent persistent sticky navigation head */}
        <Header activeView={activeView} setActiveView={setActiveView} />

        {/* Primary interactive view frame */}
        <main className="flex-1">
          {renderActiveView()}
        </main>

        {/* Dynamic sitemap footer */}
        <Footer setActiveView={setActiveView} />
      </div>
    </div>
  );
}
