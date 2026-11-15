'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Bot, Sparkles } from 'lucide-react';
import InteractiveAnimeCharacter from '@/components/InteractiveAnimeCharacter';

export default function OverlayText() {
  const handleOpenChat = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-aman-chat'));
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center text-left px-6 sm:px-10 md:px-14 lg:px-20 py-12 sm:py-20 overflow-hidden bg-transparent">
      <div className="w-full max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-14 z-10">
        
        {/* ── Left: Left-Shifted Typography & Actions ── */}
        <div className="flex-1 flex flex-col items-start gap-5 sm:gap-6 text-left max-w-2xl">
          {/* Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wide backdrop-blur-sm shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>AI Engineer &amp; Full-Stack Specialist</span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-extrabold tracking-[-0.04em] leading-none text-[#f0f6fc]"
              style={{
                fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
                lineHeight: '0.94',
              }}
            >
              <span>Aman </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-rose-300">
                Patel
              </span>
            </h1>
          </motion.div>

          {/* Subtitle & Degree */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1"
          >
            <p className="font-semibold text-base sm:text-lg md:text-xl text-[#e6edf3] tracking-tight">
              Software Engineer&nbsp;
              <span className="text-rose-500 font-bold">·</span>
              &nbsp;AI/ML &amp; Full-Stack&nbsp;
              <span className="text-rose-500 font-bold">·</span>
              &nbsp;Backend Specialist
            </p>
            <p className="text-xs sm:text-sm text-[#8b949e] font-medium tracking-tight">
              B.Tech CSE (Data Science) @ SRM IST &middot; CGPA: 8.83/10
            </p>
          </motion.div>

          {/* Tagline Quote */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38 }}
          >
            <p className="text-xs sm:text-sm md:text-base font-normal italic text-[#8b949e] max-w-xl leading-relaxed">
              &ldquo;Building scalable full-stack applications and AI systems that solve real problems.&rdquo;
            </p>
          </motion.div>

          {/* Action Buttons: View Projects, View Resume, AI Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.52 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs md:text-sm bg-gradient-to-r from-rose-900/80 to-red-950/90 text-rose-100 hover:from-rose-800 hover:to-red-900 border border-rose-500/40 transition-all shadow-[0_4px_20px_rgba(225,29,72,0.25)] hover:shadow-[0_6px_25px_rgba(225,29,72,0.4)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 text-rose-300" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs md:text-sm bg-[#161b22] text-[#f0f6fc] hover:bg-[#21262d] border border-[#30363d] transition-all shadow-sm hover:-translate-y-0.5 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-rose-400" />
              <span>Resume</span>
            </a>

            <button
              onClick={handleOpenChat}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs md:text-sm bg-rose-950/20 hover:bg-rose-900/40 text-rose-200 hover:text-white border border-rose-500/25 transition-all cursor-pointer group shadow-sm hover:-translate-y-0.5"
              title="Open AI Assistant"
            >
              <Bot className="w-4 h-4 text-rose-400 group-hover:text-rose-300" />
              <span>AI Assistant</span>
            </button>
          </motion.div>
        </div>

        {/* ── Right: Interactive Anime Character with Eye Tracking ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative shrink-0 w-full max-w-[310px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[440px] flex justify-center"
        >
          <InteractiveAnimeCharacter className="w-full" />
        </motion.div>

      </div>
    </section>
  );
}
