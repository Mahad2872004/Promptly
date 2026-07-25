import React, { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 80);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617]">
      <div className="relative w-full max-w-md px-4">
        {/* Logo/Brand Animation */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              {/* Large glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 blur-3xl opacity-40 animate-pulse scale-150" />
              <div className="relative flex h-40 w-40 items-center justify-center animate-float overflow-hidden bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800/50 shadow-2xl">
                <img 
                  src="/images/Dynamic Logo for Software Agency 'Promptly' (3).png" 
                  alt="Promptly Logo" 
                  className="h-32 w-32 object-contain"
                />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight animate-fadeIn">Promptly</h1>
          <p className="text-sm text-slate-400 mt-2 animate-fadeIn" style={{ animationDelay: '0.2s' }}>AI-Powered Digital Solutions</p>
        </div>

        {/* Progress Bar */}
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 transition-all duration-200 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-xs font-mono text-slate-500">Loading experience...</span>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-[28rem] w-[28rem] translate-x-1/3 translate-y-1/3 rounded-full bg-indigo-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}
