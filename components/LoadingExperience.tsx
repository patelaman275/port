'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingExperienceProps {
  progress: number;
  onComplete?: () => void;
}

// Simple, soothing harmonic entry sound (Web Audio API + fallback tone)
function playSimpleEntrySound() {
  if (typeof window === 'undefined') return;

  // 1. Try Web Audio API soothing harmonic chime
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      const t = ctx.currentTime;

      // Soft, elegant 2-tone melodic chime: C5 (523.25Hz) -> G5 (783.99Hz)
      const notes = [
        { freq: 523.25, time: t + 0.02, duration: 1.1, gain: 0.08 },
        { freq: 783.99, time: t + 0.14, duration: 1.3, gain: 0.06 },
      ];

      notes.forEach(({ freq, time, duration, gain }) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        // Smooth acoustic envelope
        g.gain.setValueAtTime(0.0001, time);
        g.gain.linearRampToValueAtTime(gain, time + 0.04);
        g.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(g);
        g.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + duration + 0.05);
      });
    }
  } catch {
    // Silently handle autoplay restrictions
  }

  // 2. Also try HTML5 audio for tone.mp3
  try {
    const audio = new Audio('/tone.mp3');
    audio.volume = 0.25;
    audio.play().catch(() => {});
  } catch {
    // Ignore
  }
}

export default function LoadingExperience({ progress, onComplete }: LoadingExperienceProps) {
  const [isVisible, setIsVisible] = useState(true);
  const soundPlayedRef = useRef(false);

  useEffect(() => {
    if (progress >= 100 && isVisible) {
      if (!soundPlayedRef.current) {
        soundPlayedRef.current = true;
        // Play simple entry sound right as entering portfolio
        playSimpleEntrySound();
      }

      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden bg-[#0F0F0F] text-[#F5F5F5]"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
      >
        <div className="relative flex flex-col items-center justify-center">
          {/* Subtle Geometric Emblem */}
          <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="w-14 h-14 rounded-xl border border-[#303030] flex items-center justify-center"
            >
              <div className="w-6 h-6 rounded-md bg-[#FE8040]/20 border border-[#FE8040]" />
            </motion.div>
          </div>

          {/* Simple Clean Obsidian Orange Progress Bar */}
          <div className="w-56 h-1 rounded-full overflow-hidden mb-3 bg-[#222222] border border-[#303030]">
            <motion.div
              className="h-full rounded-full bg-[#FE8040]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>

          {/* Clean metadata text */}
          <div className="flex items-center gap-3 text-xs tracking-wider uppercase font-mono">
            <span className="text-[#999999]">Loading</span>
            <span className="text-[#FE8040] font-bold">{Math.round(progress)}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
