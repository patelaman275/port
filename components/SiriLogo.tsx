'use client';

import React from 'react';

interface SiriLogoProps {
  className?: string;
  size?: number;
}

export default function SiriLogo({ className = 'w-5 h-5', size = 24 }: SiriLogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#e34234] via-[#cbb3e8] to-[#D4ff3f] opacity-75 blur-xs animate-pulse" />

      {/* Official Apple Siri / Apple Intelligence Fluid Sphere */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10 drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="siriGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4ff3f" />
            <stop offset="45%" stopColor="#cbb3e8" />
            <stop offset="80%" stopColor="#e34234" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>

          <linearGradient id="siriGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#cbb3e8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e34234" stopOpacity="0.9" />
          </linearGradient>

          <filter id="siriGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Orb */}
        <circle cx="50" cy="50" r="46" fill="url(#siriGrad1)" filter="url(#siriGlow)" />

        {/* Dynamic Siri Waves / Concentric Light Ribbon */}
        <ellipse
          cx="50"
          cy="50"
          rx="38"
          ry="22"
          transform="rotate(-28 50 50)"
          stroke="url(#siriGrad2)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <ellipse
          cx="50"
          cy="50"
          rx="34"
          ry="18"
          transform="rotate(38 50 50)"
          stroke="rgba(212, 255, 63, 0.95)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Core luminous nucleus */}
        <circle cx="50" cy="50" r="10" fill="#ffffff" />
        <circle cx="50" cy="50" r="16" fill="rgba(255,255,255,0.3)" />
      </svg>
    </div>
  );
}
