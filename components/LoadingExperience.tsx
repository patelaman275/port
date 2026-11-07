'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingExperienceProps {
  progress: number;
  onComplete?: () => void;
}

export default function LoadingExperience({ progress, onComplete }: LoadingExperienceProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user has dark mode set or html/body has dark class
    const saved = localStorage.getItem('aman-portfolio-theme');
    if (saved === 'github-dark' || (!saved && true)) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (progress >= 100 && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden ${
          isDark ? 'bg-[#0d1117] text-[#e6edf3]' : 'bg-[#dde3e8] text-[#3a0f34]'
        }`}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      >
        <div className="relative flex flex-col items-center justify-center">
          {/* ── Coffee Machine Minimal Illustration ── */}
          <div className="relative w-36 h-40 flex items-center justify-center mb-6">
            <svg
              viewBox="0 0 140 160"
              className="w-full h-full drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Machine Top Cap */}
              <rect x="25" y="16" width="90" height="12" rx="4" fill={isDark ? '#21262d' : '#3a0f34'} />
              <rect x="35" y="10" width="70" height="8" rx="3" fill={isDark ? '#58a6ff' : '#eaaa00'} />

              {/* Machine Main Body / Column */}
              <path
                d="M30 28H110V52H102V136H38V52H30V28Z"
                fill={isDark ? '#161b22' : 'rgba(255, 255, 255, 0.75)'}
                stroke={isDark ? '#30363d' : '#3a0f34'}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Machine Spout Head */}
              <rect x="58" y="52" width="24" height="14" rx="2" fill={isDark ? '#30363d' : '#3a0f34'} />
              <rect x="66" y="66" width="8" height="6" rx="1.5" fill={isDark ? '#58a6ff' : '#eaaa00'} />

              {/* Coffee Stream Pouring (Animates while loading) */}
              <motion.line
                x1="70"
                y1="72"
                x2="70"
                y2="108"
                stroke={isDark ? '#58a6ff' : '#3a0f34'}
                strokeWidth="3.5"
                strokeLinecap="round"
                animate={{
                  strokeDasharray: ['0 10', '10 0', '0 10'],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  ease: 'linear',
                }}
              />

              {/* Coffee Cup */}
              <path
                d="M52 108H88L84 134H56L52 108Z"
                fill={isDark ? '#21262d' : '#ffffff'}
                stroke={isDark ? '#58a6ff' : '#3a0f34'}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Cup Handle */}
              <path
                d="M86 114C92 114 96 118 96 122C96 126 92 130 85 130"
                stroke={isDark ? '#58a6ff' : '#3a0f34'}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Rising Steam / Aroma Waves */}
              <motion.path
                d="M64 102C63 97 67 94 65 89"
                stroke={isDark ? '#58a6ff' : '#eaaa00'}
                strokeWidth="2"
                strokeLinecap="round"
                animate={{
                  y: [-2, -8],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: 'easeInOut',
                }}
              />
              <motion.path
                d="M74 103C73 98 77 95 75 90"
                stroke={isDark ? '#58a6ff' : '#eaaa00'}
                strokeWidth="2"
                strokeLinecap="round"
                animate={{
                  y: [-2, -8],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  delay: 0.4,
                  ease: 'easeInOut',
                }}
              />

              {/* Machine Base Plate */}
              <rect x="22" y="136" width="96" height="10" rx="3" fill={isDark ? '#21262d' : '#3a0f34'} />
              {/* Power indicator light */}
              <circle cx="98" cy="38" r="3" fill={isDark ? '#3fb950' : '#eaaa00'} className="animate-pulse" />
            </svg>
          </div>

          {/* Simple Clean Progress Bar */}
          <div className={`w-48 h-1.5 rounded-full overflow-hidden mb-3 ${isDark ? 'bg-[#21262d]' : 'bg-[#3a0f34]/15'}`}>
            <motion.div
              className={`h-full rounded-full ${
                isDark
                  ? 'bg-gradient-to-r from-[#238636] via-[#58a6ff] to-[#238636]'
                  : 'bg-gradient-to-r from-[#3a0f34] via-[#eaaa00] to-[#3a0f34]'
              }`}
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>

          {/* Clean text with high contrast in both themes */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider font-bold uppercase">
            <span className={isDark ? 'text-[#f0f6fc]' : 'text-[#3a0f34]'}>Brewing Portfolio</span>
            <span className={isDark ? 'text-[#58a6ff]' : 'text-[#eaaa00]'}>{Math.round(progress)}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
