import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  /** Renders the wordmark in white, for the dark footer and inverse bands. */
  onInverse?: boolean;
}

/**
 * Promptly mark + wordmark.
 *
 * The mark keeps its original isometric "P" geometry but is now rendered in a
 * single brand colour with white shapes at graded opacity, rather than the
 * previous cyan-plus-orange two-gradient construction. One hue, one mark.
 */
export default function Logo({
  className = "",
  size = 32,
  showText = true,
  onInverse = false,
}: LogoProps) {
  return (
    <div className={`flex select-none items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect x="0" y="0" width="100" height="100" rx="20" fill="var(--brand-700)" />
        {/* Top bar — the roof of the P */}
        <path d="M39 20H80L69 35H28L39 20Z" fill="#ffffff" />
        {/* Left stem */}
        <path d="M28 35H46V78H28V35Z" fill="#ffffff" />
        {/* Right shoulder */}
        <path d="M80 35H69V50H80V35Z" fill="#ffffff" opacity="0.55" />
        {/* The bowl, closing back on the stem */}
        <path d="M46 45H80V58H46V45Z" fill="#ffffff" opacity="0.78" />
        <path d="M46 58H65L55 68H46V58Z" fill="#ffffff" opacity="0.55" />
      </svg>

      {showText && (
        <span
          className="font-sans text-[1.0625rem] font-bold tracking-[-0.02em]"
          style={{ color: onInverse ? "#ffffff" : "var(--text-heading)" }}
        >
          Promptly
        </span>
      )}
    </div>
  );
}
