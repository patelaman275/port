'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Bot } from 'lucide-react';
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
          {/* Name - 100% Crisp & High Contrast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-black tracking-[-0.04em] leading-none text-[#1f2328] dark:text-[#f0f6fc]"
              style={{
                fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
                lineHeight: '0.94',
              }}
            >
              <span>Aman </span>
              <span className="text-[#1f2328] dark:text-[#f0f6fc]">
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
            <p className="font-semibold text-base sm:text-lg md:text-xl text-[#24292f] dark:text-[#e6edf3] tracking-tight">
              Software Engineer&nbsp;
              <span className="text-[#0969da] dark:text-[#58a6ff] font-bold">·</span>
              &nbsp;AI/ML &amp; Full-Stack&nbsp;
              <span className="text-[#0969da] dark:text-[#58a6ff] font-bold">·</span>
              &nbsp;Backend Specialist
            </p>
            <p className="text-xs sm:text-sm text-[#57606a] dark:text-[#8b949e] font-medium tracking-tight">
              B.Tech CSE (Data Science) @ SRM IST &middot; CGPA: 8.83/10
            </p>
          </motion.div>

          {/* Tagline Quote */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38 }}
          >
            <p className="text-xs sm:text-sm md:text-base font-normal italic text-[#57606a] dark:text-[#8b949e] max-w-xl leading-relaxed">
              &ldquo;Building scalable full-stack applications and AI systems that solve real problems.&rdquo;
            </p>
          </motion.div>

          {/* Action Buttons: Clean GitHub Primary, Secondary & AI Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.52 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs md:text-sm bg-[#238636] hover:bg-[#2ea043] text-white transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs md:text-sm bg-white dark:bg-[#21262d] text-[#1f2328] dark:text-[#f0f6fc] hover:bg-[#f6f8fa] dark:hover:bg-[#30363d] border border-[#d0d7de] dark:border-[#30363d] transition-all shadow-sm hover:-translate-y-0.5 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#57606a] dark:text-[#8b949e]" />
              <span>Resume</span>
            </a>

            <button
              onClick={handleOpenChat}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs md:text-sm bg-[#f6f8fa] dark:bg-[#161b22] hover:bg-[#eaeef2] dark:hover:bg-[#21262d] text-[#0969da] dark:text-[#58a6ff] border border-[#d0d7de] dark:border-[#30363d] transition-all cursor-pointer group shadow-sm hover:-translate-y-0.5"
              title="Open AI Assistant"
            >
              <Bot className="w-4 h-4" />
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
