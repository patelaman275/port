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
  const { playBootSound, playTickSound, unlockAudio, isAudioUnlocked } = useSound();

  const getTargetText = () => {
    if (progress < 30) return 'INITIALIZING ARCHITECTURE';
    if (progress < 65) return 'CALIBRATING NEURAL MESH';
    if (progress < 95) return 'MOUNTING PRODUCTION SYSTEMS';
    return 'SYSTEMS VERIFIED · READY';
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) {
      onComplete?.();
    }
  }, [isVisible, onComplete]);

  // Play audio tick sound on progress increments
  useEffect(() => {
    if (progress > 0 && progress < 100) {
      playTickSound(progress);
    }
  }, [progress, playTickSound]);

  // Text scramble effect synchronized with progress phase
  useEffect(() => {
    const targetText = getTargetText();
    if (reducedMotion || !isVisible) {
      setScrambleText(targetText);
      return;
    }

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const currentProgress = Math.min(progress / 100, 1);
      const revealedLength = Math.floor(targetText.length * Math.min(currentProgress * 1.2, 1));

      const scrambled = targetText
        .split('')
        .map((char, index) => {
          if (char === ' ' || char === '·') return char;
          if (index < revealedLength) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setScrambleText(scrambled);

      if (frame > targetText.length * 1.5) {
        clearInterval(interval);
        setScrambleText(targetText);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [progress, reducedMotion, isVisible]);

  // Transition when 100% is reached
  useEffect(() => {
    if (progress >= 100 && !isEntering && isVisible) {
      playBootSound();
      const timer = setTimeout(() => {
        handleEnter();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, isEntering, isVisible, playBootSound]);

  const handleEnter = () => {
    if (isEntering) return;
    setIsEntering(true);
    playBootSound();

    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 450);
  };

  if (!isVisible) return null;

  const isReady = progress >= 100;
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#cbb3e8] text-black select-none overflow-hidden cursor-pointer"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={unlockAudio}
      >
        {/* Audio Status Pill */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            unlockAudio();
          }}
          className="absolute top-6 right-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-[#D4ff3f] border-2 border-black text-xs font-mono font-bold shadow-lg cursor-pointer hover:bg-[#D4ff3f] hover:text-black transition-colors"
          title="Click to toggle or activate sound effects"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isAudioUnlocked ? 'bg-[#D4ff3f] animate-ping' : 'bg-[#e34234] animate-pulse'
            }`}
          />
          <span>{isAudioUnlocked ? 'AUDIO ACTIVE' : 'TAP FOR SOUND'}</span>
        </button>

        {/* Iris / Radial Mask wipe layer when entering */}
        {isEntering && (
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none"
            initial={{ clipPath: 'circle(150% at 50% 50%)' }}
            animate={{ clipPath: 'circle(0% at 50% 50%)' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            style={{ background: '#cbb3e8' }}
          />
        )}

        {/* Center Circular Counter */}
        <div className="relative flex flex-col items-center justify-center">
          {/* SVG Progress Ring */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e34234" />
                  <stop offset="50%" stopColor="#000000" />
                  <stop offset="100%" stopColor="#D4ff3f" />
                </linearGradient>
              </defs>
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-black/15"
                strokeWidth="3.5"
                fill="transparent"
              />
              <motion.circle
                cx="80"
                cy="80"
                r={radius}
                stroke="url(#ringGradient)"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            </svg>

            {/* Percentage Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-4xl font-black tracking-tighter text-black">
                {Math.round(progress)}
                <span className="text-xs text-[#e34234] font-black font-sans ml-0.5">%</span>
              </span>
            </div>
          </div>

          {/* Kinetic Scramble Tagline */}
          <div className="mt-8 h-6 flex items-center justify-center">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-black font-bold">
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
                className="px-7 py-3 rounded-full font-black text-xs tracking-[0.2em] uppercase text-[#D4ff3f] bg-black border-2 border-black hover:bg-[#D4ff3f] hover:text-black shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <span>ENTER EXPERIENCE</span>
                <span className="w-2 h-2 rounded-full bg-[#e34234] animate-ping" />
              </motion.button>
            ) : (
              <p className="text-[10px] tracking-[0.25em] text-black/60 font-black uppercase">
                PRELOADING ASSETS · {Math.round(progress)} / 100
              </p>
            )}
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(212,255,63,0.3)_0%,_transparent_70%)]" />
      </motion.div>
    </AnimatePresence>
  );
}
