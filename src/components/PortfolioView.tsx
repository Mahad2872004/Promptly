import React, { useState } from "react";
import { ViewType, DemoProject } from "../types";
import { CASE_STUDIES } from "../data";
import {
  ChevronRight,
  X,
  CheckCircle,
} from "lucide-react";

import ScrollReveal from "./ui/ScrollReveal";

interface PortfolioViewProps {
  setActiveView: (view: ViewType) => void;
}

export default function PortfolioView({ setActiveView }: PortfolioViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<DemoProject | null>(null);

  const categories = ["All", "SaaS", "AI Integration", "Cloud", "Mobile"];

  const filteredCaseStudies =
    selectedCategory === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.category === selectedCategory);

  const handleBookBrief = () => setActiveView("contact");

  return (
    <div className="bg-transparent text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl space-y-12">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
              Our Achievements
            </span>
            <h1 className="text-4xl font-extrabold sm:text-5xl">
              Case Blueprints
            </h1>
            <p className="text-sm text-slate-400">
              Review detailed case studies with real metrics.
            </p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-md border transition-all
                  ${
                    selectedCategory === cat
                      ? "bg-slate-900 border-cyan-500 text-cyan-400"
                      : "bg-slate-900/30 border-slate-900/60 text-slate-400"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredCaseStudies.map((study, index) => (
            <ScrollReveal key={study.id} delay={index * 0.05}>

              <div className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/30 transition-all overflow-hidden">

                <div className={`h-1.5 bg-gradient-to-r ${study.visualTheme}`} />

                <div className="p-6 space-y-4">

                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500">{study.clientName}</span>
                    <span className="text-cyan-400">{study.category}</span>
                  </div>

                  <h3 className="text-xl font-bold group-hover:text-cyan-400 transition">
                    {study.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3">
                    {study.tagline}
                  </p>

                  <div className="pt-3 border-t border-slate-900">
                    <span className="text-[10px] text-slate-500">RESULT</span>
                    <p className="text-xs font-bold text-emerald-400">
                      {study.metrics?.[0]}
                    </p>
                  </div>

                </div>

                <button
                  onClick={() => setSelectedProject(study)}
                  className="border-t border-slate-800 py-3 text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1"
                >
                  Inspect Blueprint
                  <ChevronRight className="w-3 h-3" />
                </button>

              </div>

            </ScrollReveal>
          ))}

        </div>

        {/* MODAL */}
        {selectedProject && (
          <ScrollReveal>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

              <div className="w-full max-w-3xl rounded-3xl bg-[#020617] border border-slate-800 overflow-hidden">

                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between">
                  <div>
                    <p className="text-xs text-cyan-400 uppercase">
                      {selectedProject.clientName}
                    </p>
                    <h2 className="text-2xl font-bold">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <button onClick={() => setSelectedProject(null)}>
                    <X />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">

                  <ScrollReveal delay={0.1}>
                    <p className="text-sm text-slate-400">
                      {selectedProject.longDescription}
                    </p>
                  </ScrollReveal>

                  <ScrollReveal delay={0.2}>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-slate-950 px-2 py-1 rounded border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.3}>
                    <div className="space-y-2">
                      {selectedProject.metrics.map((m, i) => (
                        <div key={i} className="flex items-center gap-2 text-emerald-400 text-xs">
                          <CheckCircle className="w-4 h-4" />
                          {m}
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>

                </div>

                {/* Footer */}
                <ScrollReveal delay={0.4}>
                  <div className="border-t border-slate-800 p-4 flex justify-between">
                    <span className="text-[10px] text-slate-500">
                      SECURE BLUEPRINT SYSTEM
                    </span>

                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        handleBookBrief();
                      }}
                      className="btn-primary text-xs px-4 py-2 rounded-full"
                    >
                      Schedule Intake
                    </button>
                  </div>
                </ScrollReveal>

              </div>

            </div>
          </ScrollReveal>
        )}

      </div>
    </div>
  );
}