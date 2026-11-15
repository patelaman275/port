'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingExperienceProps {
  progress: number;
  onComplete?: () => void;
}

export default function LoadingExperience({ progress, onComplete }: LoadingExperienceProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (progress >= 100 && isVisible) {
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
