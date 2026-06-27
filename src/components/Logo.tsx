import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function Logo({ className = "", size = 36, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Handcrafted high-fidelity geometric P icon mimicking the attached image */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform duration-300 hover:rotate-3"
      >
        {/* Top cyan element - isometrical perspective */}
        <path
          d="M39 20H80L69 35H28L39 20Z"
          fill="url(#cyanTopGradient)"
        />
        {/* Vertical teal left branch */}
        <path
          d="M28 35H46V78H28V35Z"
          fill="#14B8A6"
        />
        {/* Right diagonal shadow piece */}
        <path
          d="M80 20L80 43L69 35L80 20Z"
          fill="#0F172A"
          opacity="0.25"
        />
        <path
          d="M80 35L80 50L69 50L69 35L80 35Z"
          fill="#0284C7"
        />
        {/* Bottom orange-to-red loop wrapping back in isometric style */}
        <path
          d="M46 45H80V58H46V45Z"
          fill="url(#orangeLoopGradient)"
        />
        <path
          d="M46 58H65L55 68H46V58Z"
          fill="#EA580C"
        />

        {// Gradients definitions matching Promptly's color style perfectly
        }
        <defs>
          <linearGradient id="cyanTopGradient" x1="28" y1="27.5" x2="80" y2="27.5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="orangeLoopGradient" x1="46" y1="51.5" x2="80" y2="51.5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <span className="font-sans text-xl font-bold tracking-tight text-white">
          Promptly<span className="text-gradient-cyan-indigo">.</span>
        </span>
      )}
    </div>
  );
}
