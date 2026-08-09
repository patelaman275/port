'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './SoundContext';

interface LoadingExperienceProps {
  progress: number;
  onComplete?: () => void;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!';

export default function LoadingExperience({ progress, onComplete }: LoadingExperienceProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isEntering, setIsEntering] = useState(false);
  const [scrambleText, setScrambleText] = useState('INITIALIZING ARCHITECTURE');
  const [reducedMotion, setReducedMotion] = useState(false);
  const { playBootSound } = useSound();

  const targetText = 'LOADING EXPERIENCE';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const visited = sessionStorage.getItem('aman_portfolio_visited');
      if (visited === 'true') {
        setIsVisible(false);
        onComplete?.();
        return;
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setReducedMotion(true);
      }
    }
  }, [onComplete]);

  // Attempt automatic audio trigger on load
  useEffect(() => {
    if (isVisible) {
      playBootSound();
    }
  }, [isVisible, playBootSound]);

  // Text scramble effect
  useEffect(() => {
    if (reducedMotion || !isVisible) return;
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const currentProgress = Math.min(progress / 100, 1);
      const revealedLength = Math.floor(targetText.length * currentProgress);

      const scrambled = targetText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < revealedLength) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setScrambleText(scrambled);

      if (currentProgress >= 1 && frame > targetText.length * 2) {
        clearInterval(interval);
        setScrambleText(targetText);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [progress, reducedMotion, isVisible]);

  const handleEnter = () => {
    if (isEntering) return;
    setIsEntering(true);
    playBootSound();

    if (typeof window !== 'undefined') {
      sessionStorage.getItem('aman_portfolio_visited');
      sessionStorage.setItem('aman_portfolio_visited', 'true');
    }

    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 850);
  };

  if (!isVisible) return null;

  const isReady = progress >= 100;
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080608] text-white select-none overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Iris / Radial Mask wipe layer when entering */}
        {isEntering && (
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none"
            initial={{ clipPath: 'circle(150% at 50% 50%)' }}
            animate={{ clipPath: 'circle(0% at 50% 50%)' }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            style={{ background: '#080608' }}
          />
        )}

        {/* Center Circular Counter */}
        <div className="relative flex flex-col items-center justify-center">
          {/* SVG Progress Ring */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff4b2b" />
                  <stop offset="50%" stopColor="#ff8a00" />
                  <stop offset="100%" stopColor="#cc1100" />
                </linearGradient>
              </defs>
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-white/10"
                strokeWidth="2.5"
                fill="transparent"
              />
              <motion.circle
                cx="80"
                cy="80"
                r={radius}
                stroke="url(#ringGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            </svg>

            {/* Percentage Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-4xl font-bold tracking-tighter text-white">
                {Math.round(progress)}
                <span className="text-xs text-[#ff8a00] font-normal font-sans ml-0.5">%</span>
              </span>
            </div>
          </div>

          {/* Kinetic Scramble Tagline */}
          <div className="mt-8 h-6 flex items-center justify-center">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/60">
              {scrambleText}
            </p>
          </div>

          {/* Enter Button or Status */}
          <div className="mt-10 h-12 flex items-center justify-center">
            {isReady ? (
              <motion.button
                onClick={handleEnter}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3 rounded-full font-semibold text-xs tracking-[0.2em] uppercase text-white bg-gradient-to-r from-[#cc1100] via-[#ff4b2b] to-[#ff8a00] shadow-[0_0_30px_rgba(255,75,43,0.4)] hover:shadow-[0_0_50px_rgba(255,138,0,0.7)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <span>ENTER EXPERIENCE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </motion.button>
            ) : (
              <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase">
                PRELOADING ASSETS · {Math.round(progress)} / 100
              </p>
            )}
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(255,75,43,0.06)_0%,_transparent_70%)]" />
      </motion.div>
    </AnimatePresence>
  );
}
