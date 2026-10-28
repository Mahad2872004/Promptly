import React, { useId } from "react";
interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  onInverse?: boolean;
}
/** Vector interpretation of Promptly's supplied turquoise/orange geometric P. */
export default function Logo({
  className = "",
  size = 36,
  showText = true,
  onInverse = false,
}: LogoProps) {
  const id = useId();
  return (
    <div className={`brand-lockup ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={`${id}-cyan`}
            x1="5"
            y1="5"
            x2="92"
            y2="94"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00ddc3" />
            <stop offset="1" stopColor="#009bb4" />
          </linearGradient>
          <linearGradient
            id={`${id}-orange`}
            x1="40"
            y1="75"
            x2="98"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ff5426" />
            <stop offset="1" stopColor="#ffab24" />
          </linearGradient>
        </defs>
        <path d="M33 3H91L61 34H3L33 3Z" fill={`url(#${id}-cyan)`} />
        <path d="M3 43H33V99H3V43Z" fill={`url(#${id}-cyan)`} />
        <path d="M100 3V35H70L100 3Z" fill="#008ba9" />
        <path
          d="M62 35H100V51L74 77H42V54H81L62 35Z"
          fill={`url(#${id}-orange)`}
        />
      </svg>
      {showText && (
        <span style={{ color: onInverse ? "#f6f8ff" : "var(--text-heading)" }}>
          Promptly<span className="brand-period">.</span>
        </span>
      )}
    </div>
  );
}
