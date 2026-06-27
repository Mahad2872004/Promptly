import React from "react";
import { ViewType } from "../types";
import { Phone, MapPin, Zap, Target, Clock, Lock, CheckCircle, Calendar, ArrowRight } from "lucide-react";

interface ConsultationViewProps {
    setActiveView: (view: ViewType) => void;
}

export default function ConsultationView({ setActiveView }: ConsultationViewProps) {
    const openCalendly = () => window.open("https://calendly.com/promptlypk/30min", "_blank");

    return (
        <div className="relative text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">

            {/* Background gradient blobs */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)" }} />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)" }} />
                <div className="absolute -bottom-32 -right-32 h-[480px] w-[480px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }} />
            </div>

            <div className="mx-auto max-w-5xl">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 shadow-xl p-8 sm:p-12 backdrop-blur-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                        {/* Left — Content */}
                        <div>
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 border border-cyan-500/40 rounded-full px-3 py-1.5 mb-6">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-widest font-mono">
                                    Free strategy session
                                </span>
                            </div>

                            {/* Heading */}
                            <h1 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                                Book your<br />
                                <span
                                    className="italic"
                                    style={{
                                        background: "linear-gradient(135deg, #22d3ee 0%, #818cf8 55%, #a78bfa 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text"
                                    }}
                                >
                                    Consultation
                                </span>
                            </h1>

                            <p className="text-sm text-slate-400 leading-relaxed mb-8">
                                Reserve a focused 30-minute strategy session with our lead engineer.
                                Walk away with a clear software roadmap tailored to your goals.
                            </p>

                            {/* Stats */}
                            <div className="flex gap-8 pb-8 border-b border-slate-800 mb-8">
                                {[
                                    { num: "30", label: "Minutes focused" },
                                    { num: "0", label: "Cost, free" },
                                    { num: "1", label: "Clear project roadmap" },
                                ].map((s) => (
                                    <div key={s.label}>
                                        <div
                                            className="text-3xl font-extrabold"
                                            style={{
                                                background: "linear-gradient(135deg, #22d3ee 0%, #818cf8 55%, #a78bfa 100%)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                backgroundClip: "text"
                                            }}
                                        >
                                            {s.num}
                                        </div>
                                        <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Features */}
                            <div className="space-y-5 mb-8">
                                {[
                                    {
                                        icon: <MapPin className="w-4 h-4" />,
                                        title: "Project roadmap",
                                        desc: "Define your product strategy and execution milestones tailored to your vision.",
                                    },
                                    {
                                        icon: <Zap className="w-4 h-4" />,
                                        title: "Quick wins",
                                        desc: "Identify the highest-impact opportunities you can act on immediately.",
                                    },
                                    {
                                        icon: <Target className="w-4 h-4" />,
                                        title: "Expert clarity",
                                        desc: "Cut through the noise with direct guidance from a seasoned software engineer.",
                                    },
                                ].map((f) => (
                                    <div key={f.title} className="flex items-start gap-4">
                                        <div
                                            className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{
                                                background: "linear-gradient(135deg, #22d3ee22 0%, #a78bfa22 100%)",
                                                border: "1px solid #818cf840"
                                            }}
                                        >
                                            <span
                                                style={{
                                                    background: "linear-gradient(135deg, #22d3ee 0%, #818cf8 55%, #a78bfa 100%)",
                                                    WebkitBackgroundClip: "text",
                                                    WebkitTextFillColor: "transparent",
                                                    backgroundClip: "text"
                                                }}
                                            >
                                                {f.icon}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-200 mb-0.5">{f.title}</div>
                                            <div className="text-xs text-slate-500 leading-relaxed">{f.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Person */}
                            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/images/mahad.png"
                                        alt="Mahad Mateen"
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <div className="text-sm font-bold text-slate-200">Mahad Mateen</div>
                                        <div className="text-xs text-slate-500">CEO & Founder</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-slate-400 border border-slate-700 rounded-full px-3 py-1.5">
                                    <Clock className="w-3 h-3" />
                                    <span>30 min</span>
                                </div>
                            </div>
                        </div>

                        {/* Right — Phone centered + CTA below */}
                        <div className="flex flex-col items-center gap-8 pt-4">

                            {/* Phone animation — big, centered, matches screenshot */}
                            <button
                                onClick={openCalendly}
                                className="relative flex-shrink-0 cursor-pointer bg-transparent border-0 p-0 outline-none"
                                aria-label="Book a call"
                            >
                                {/* Ring 1 */}
                                <span
                                    className="absolute inset-0 rounded-full animate-ping"
                                    style={{
                                        border: "1.5px solid transparent",
                                        background: "linear-gradient(#0f172a, #0f172a) padding-box, linear-gradient(135deg, #22d3ee, #818cf8, #a78bfa) border-box",
                                        animationDelay: "0s",
                                        animationDuration: "1.8s",
                                    }}
                                />
                                {/* Ring 2 */}
                                <span
                                    className="absolute inset-0 rounded-full animate-ping"
                                    style={{
                                        border: "1.5px solid transparent",
                                        background: "linear-gradient(#0f172a, #0f172a) padding-box, linear-gradient(135deg, #22d3ee, #818cf8, #a78bfa) border-box",
                                        animationDelay: "0.6s",
                                        animationDuration: "1.8s",
                                    }}
                                />
                                {/* Ring 3 */}
                                <span
                                    className="absolute inset-0 rounded-full animate-ping"
                                    style={{
                                        border: "1.5px solid transparent",
                                        background: "linear-gradient(#0f172a, #0f172a) padding-box, linear-gradient(135deg, #22d3ee, #818cf8, #a78bfa) border-box",
                                        animationDelay: "1.2s",
                                        animationDuration: "1.8s",
                                    }}
                                />
                                {/* Phone circle */}
                                <div
                                    className="relative z-10 h-30 w-30 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                                    style={{ background: "linear-gradient(135deg, #22d3ee 0%, #818cf8 55%, #a78bfa 100%)" }}
                                >
                                    <Phone className="w-14 h-14 text-white fill-white" />
                                </div>
                            </button>

                            {/* CTA block below phone */}
                            <div className="w-full space-y-3">
                                <button
                                    onClick={openCalendly}
                                    className="w-full flex items-center justify-between text-white font-bold text-sm rounded-full px-5 py-3.5 cursor-pointer transition-opacity hover:opacity-90 my-10 border-0 outline-none"
                                    style={{ background: "linear-gradient(135deg, #22d3ee 0%, #818cf8 55%, #a78bfa 100%)" }}
                                >
                                    <span>Book a free session</span>
                                    <span className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                                    </span>
                                </button>

                                {[
                                    { icon: <Lock className="w-3.5 h-3.5" />, text: "No credit card required" },
                                    { icon: <CheckCircle className="w-3.5 h-3.5" />, text: "Completely free session" },
                                    { icon: <Calendar className="w-3.5 h-3.5" />, text: "Cancel or reschedule anytime" },
                                ].map((t) => (
                                    <div
                                        key={t.text}
                                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs text-slate-400"
                                        style={{
                                            border: "1px solid #818cf830",
                                            background: "linear-gradient(135deg, #22d3ee08 0%, #a78bfa08 100%)"
                                        }}
                                    >
                                        <span
                                            style={{
                                                background: "linear-gradient(135deg, #22d3ee 0%, #818cf8 55%, #a78bfa 100%)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                backgroundClip: "text"
                                            }}
                                        >
                                            {t.icon}
                                        </span>
                                        {t.text}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}