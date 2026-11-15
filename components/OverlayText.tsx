'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Bot } from 'lucide-react';
import InteractiveAnimeCharacter from '@/components/InteractiveAnimeCharacter';
import Hero3DElement from '@/components/Hero3DElement';

export default function OverlayText() {
  const handleOpenChat = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-aman-chat'));
    }
  };

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center text-left px-6 sm:px-10 md:px-14 lg:px-20 py-12 sm:py-20 overflow-hidden bg-transparent">
      <div className="w-full max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-14 z-10">

        {/* ── Left: Typography & Actions ── */}
        <div className="flex-1 flex flex-col items-start gap-4 sm:gap-5 text-left max-w-2xl">

          {/* 3D Floating Metallic Emblem above name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[240px] sm:max-w-[280px] h-[120px] sm:h-[140px] relative -mb-2 pointer-events-auto"
          >
            <Hero3DElement />
          </motion.div>

          {/* Name — Space Grotesk Bold, Off-White + Orange Accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-bold tracking-[-0.03em] leading-none text-[#F5F5F5]"
              style={{
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
                lineHeight: '0.96',
              }}
            >
              <span>Aman </span>
              <span className="text-[#FE8040]">Patel</span>
            </h1>
          </motion.div>

          {/* Subtitle & Degree */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1.5"
          >
            <p className="font-semibold text-base sm:text-lg md:text-xl text-[#F5F5F5] tracking-tight">
              Software Engineer&nbsp;
              <span className="text-[#FE8040] font-bold">·</span>
              &nbsp;AI/ML &amp; Full-Stack&nbsp;
              <span className="text-[#FE8040] font-bold">·</span>
              &nbsp;Backend Specialist
            </p>
            <p className="text-xs sm:text-sm text-[#999999] font-medium tracking-tight">
              B.Tech CSE (Data Science) @ SRM IST &middot; CGPA: 8.83/10
            </p>
          </motion.div>

          {/* Tagline Quote */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38 }}
          >
            <p className="text-xs sm:text-sm md:text-base font-normal italic text-[#999999] max-w-xl leading-relaxed">
              &ldquo;Building scalable full-stack applications and AI systems that solve real problems.&rdquo;
            </p>
          </motion.div>

          {/* Action Buttons — Obsidian Orange */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.52 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-xs md:text-sm bg-[#FE8040] hover:bg-[#FF995F] text-[#0F0F0F] transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 text-[#0F0F0F]" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-xs md:text-sm bg-[#191919] text-[#F5F5F5] hover:bg-[#222222] hover:text-[#FE8040] border border-[#303030] hover:border-[#FE8040] transition-all shadow-sm hover:-translate-y-0.5 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#999999]" />
              <span>Resume</span>
            </a>

            <button
              onClick={handleOpenChat}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-xs md:text-sm bg-[#191919] hover:bg-[#222222] text-[#FE8040] border border-[#303030] hover:border-[#FE8040] transition-all cursor-pointer shadow-sm hover:-translate-y-0.5"
              title="Open AI Assistant"
            >
              <Bot className="w-4 h-4 text-[#FE8040]" />
              <span>AI Assistant</span>
            </button>
          </motion.div>
        </div>

        {/* ── Right: Interactive Anime Character with Head & Eye Tracking ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative shrink-0 w-full max-w-[300px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[440px] flex justify-center"
        >
          <InteractiveAnimeCharacter className="w-full" />
        </motion.div>

      </div>
    </section>
  );
}
