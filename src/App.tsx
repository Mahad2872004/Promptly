import React, { useState } from "react";
import { ViewType } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundMotion from "./components/BackgroundMotion";
import CursorGlow from "./components/CursorGlow";
import HomeView from "./components/HomeView";
import ServicesView from "./components/ServicesView";
import PortfolioView from "./components/PortfolioView";
import AIArchitectView from "./components/AIArchitectView";
import AboutView from "./components/AboutView";
import PortalView from "./components/PortalView";
import ContactView from "./components/ContactView";

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>("home");
  const [userDraftPrompt, setUserDraftPrompt] = useState("");

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
    <div className="min-h-screen bg-[#020617] font-sans text-slate-200 flex flex-col justify-between relative overflow-x-hidden">
      <BackgroundMotion />
      <CursorGlow />

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
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
