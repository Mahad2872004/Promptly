import React, { useState } from "react";
import { ViewType, DemoProject } from "../types";
import { CASE_STUDIES } from "../data";
import { Search, ChevronRight, X, Sparkles, Code, CheckCircle, ShieldAlert, BadgeInfo } from "lucide-react";

interface PortfolioViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function PortfolioView({ setActiveView }: PortfolioViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<DemoProject | null>(null);

  const categories = ["All", "SaaS", "AI Integration", "Cloud", "Mobile"];

  const filteredCaseStudies = selectedCategory === "All" 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(cs => cs.category === selectedCategory);

  const handleBookBrief = () => {
    setActiveView("contact");
  };

  return (
    <div className="bg-transparent text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500/20">
      <div className="mx-auto max-w-7xl space-y-12">
        
        {/* Header Title Information */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">Our Achievements</span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight sm:text-5xl">
            Case Blueprints
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            Review detailed case blueprints displaying live statistics, technical layouts, and direct client validations. We let raw metrics speak for themselves.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2" id="portfolio-category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`portfolio-tab-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-md border transition-all select-none
                ${selectedCategory === cat 
                  ? "bg-slate-900 border-cyan-500 text-cyan-400" 
                  : "bg-slate-900/30 border-slate-900/60 text-slate-400 hover:border-slate-850 hover:text-white"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Standard Grid of Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="portfolio-blueprint-grid">
          {filteredCaseStudies.map((study) => (
            <div 
              key={study.id}
              id={`portfolio-card-${study.id}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-cyan-950/5"
            >
              <div className={`h-1.5 bg-gradient-to-r ${study.visualTheme}`} />
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 uppercase">{study.clientName}</span>
                  <span className="text-cyan-400 font-semibold">{study.category}</span>
                </div>

                <h3 className="font-sans font-extrabold text-xl text-slate-100 group-hover:text-cyan-400 transition-colors">
                  {study.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                  {study.tagline}
                </p>

                {/* Performance Metrics Highlight */}
                <div className="space-y-1.5 pt-3 border-t border-slate-900/40">
                  <span className="text-[10px] font-mono text-slate-500 block">KEY OUTCOME RATIO</span>
                  {study.metrics.slice(0, 1).map((met, idx) => (
                    <div key={idx} className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {met}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button 
                id={`btn-inspect-${study.id}`}
                onClick={() => setSelectedProject(study)}
                className="w-full text-center py-3.5 border-t border-slate-800/40 bg-slate-900/20 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-900/40 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                Inspect Technical Blueprint
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* ----------------- Project Detail Inspect Modal Showcase ----------------- */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4">
            <div 
              id="portfolio-blueprint-modal"
              className="relative w-full max-w-3xl rounded-3xl border border-slate-800 bg-[#020617] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Top color gradient indicator bar */}
              <div className={`h-1.5 bg-gradient-to-r ${selectedProject.visualTheme}`} />

              <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
                {/* Modal Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-semibold">
                      ARCHITECTURAL DISCOVERY / CLIENT: {selectedProject.clientName}
                    </span>
                    <h2 className="font-sans text-2xl font-extrabold text-slate-100 sm:text-3xl">
                      {selectedProject.title}
                    </h2>
                  </div>
                  <button 
                    id="close-portfolio-modal"
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full bg-slate-900 hover:bg-slate-800 p-2 text-slate-400 hover:text-white border border-slate-800/80 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Split grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left block - Summary */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-sans font-bold text-xs text-slate-300 uppercase tracking-wide">Problem & Execution</h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    {/* Technical details list */}
                    <div className="space-y-2">
                      <h4 className="font-sans font-bold text-xs text-slate-300 uppercase tracking-wide">Applied Systems Stack</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.technologies.map((tech) => (
                           <span key={tech} className="font-mono text-[10px] text-slate-450 bg-slate-950 px-2.5 py-1 rounded border border-slate-850">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right block - Performance stats & testimonials */}
                  <div className="md:col-span-5 space-y-4 md:border-l md:border-slate-800 md:pl-6">
                    <div className="space-y-2.5">
                      <h4 className="font-sans font-bold text-xs text-slate-300 uppercase tracking-wide">Business & Operational Impacts</h4>
                      <div className="space-y-2">
                        {selectedProject.metrics.map((met, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-900">
                            <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                            <span className="font-sans font-bold text-xs text-emerald-400">{met}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedProject.testimonial && (
                      <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/40 space-y-3">
                        <p className="font-sans text-xs italic text-slate-400 leading-relaxed">
                          "{selectedProject.testimonial.quote}"
                        </p>
                        <div className="space-y-0.5">
                          <p className="font-sans text-[11px] font-bold text-slate-200">{selectedProject.testimonial.author}</p>
                          <p className="font-sans text-[10px] text-slate-500">{selectedProject.testimonial.role}, {selectedProject.testimonial.company}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="border-t border-slate-800 bg-slate-950/80 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-[9px] text-slate-500">
                  STANDARD PROMPT CODE SYSTEM SECURED
                </span>
                <button
                  id="modal-btn-contact-kickoff"
                  onClick={() => {
                    setSelectedProject(null);
                    handleBookBrief();
                  }}
                  className="w-full sm:w-auto bg-white hover:bg-cyan-50 px-6 py-2.5 text-xs font-bold text-slate-950 rounded-full shadow-lg shadow-white/5 transition-colors cursor-pointer"
                >
                  Schedule Architectural Intake
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
