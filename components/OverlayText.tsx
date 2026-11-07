'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Bot, Download } from 'lucide-react';

export default function OverlayText() {
  const handleOpenChat = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-aman-chat'));
    }
  };

  return (
    <section className="relative min-h-[82vh] flex items-center justify-center text-left px-6 sm:px-12 md:px-16 lg:px-24 py-16 sm:py-24 overflow-hidden bg-transparent">
      <div className="w-full max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16 z-10">
        
        {/* ── Left: Left-Shifted Typography & Actions ── */}
        <div className="flex-1 flex flex-col items-start gap-5 sm:gap-6 text-left max-w-2xl">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-extrabold tracking-[-0.04em] leading-none text-[#3a0f34]"
              style={{
                fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
                lineHeight: '0.94',
              }}
            >
              <span>Aman </span>
              <span className="text-[#3a0f34]">Patel</span>
            </h1>
          </motion.div>

          {/* Subtitle & Degree */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1"
          >
            <p className="font-semibold text-base sm:text-lg md:text-xl text-[#3a0f34] tracking-tight">
              Software Engineer&nbsp;
              <span className="text-[#eaaa00] font-bold">·</span>
              &nbsp;AI/ML &amp; Full-Stack&nbsp;
              <span className="text-[#eaaa00] font-bold">·</span>
              &nbsp;Backend Specialist
            </p>
            <p className="text-xs sm:text-sm text-[#5e3b58] font-medium tracking-tight">
              B.Tech CSE (Data Science) @ SRM IST &middot; CGPA: 8.83/10
            </p>
          </motion.div>

          {/* Tagline Quote */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38 }}
          >
            <p className="text-xs sm:text-sm md:text-base font-normal italic text-[#5e3b58] max-w-xl leading-relaxed">
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs md:text-sm bg-[#3a0f34] text-[#dde3e8] hover:bg-[#501748] border border-[#eaaa00]/40 transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 text-[#eaaa00]" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs md:text-sm bg-white text-[#3a0f34] hover:bg-[#f4f7f9] border border-[#3a0f34]/25 transition-all shadow-sm hover:-translate-y-0.5 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#eaaa00]" />
              <span>Resume</span>
            </a>

            <button
              onClick={handleOpenChat}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs md:text-sm bg-[#3a0f34]/10 hover:bg-[#3a0f34] text-[#3a0f34] hover:text-[#dde3e8] border border-[#3a0f34]/20 transition-all cursor-pointer group"
              title="Open AI Assistant"
            >
              <Bot className="w-4 h-4 text-[#eaaa00] group-hover:text-[#eaaa00]" />
              <span>AI Assistant</span>
            </button>
          </motion.div>
        </div>

        {/* ── Right: Circular Portfolio Illustration ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative shrink-0 self-center lg:self-auto"
        >
          {/* Subtle Deep Aubergine & Marigold Accent Ring */}
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full p-1.5 bg-gradient-to-tr from-[#3a0f34] via-[#eaaa00] to-[#3a0f34] shadow-[0_20px_50px_rgba(58,15,52,0.22)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#dde3e8] border-2 border-[#dde3e8] relative">
              <Image
                src="/avatar.png"
                alt="Aman Patel Illustration"
                fill
                priority
                className="object-cover object-top hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 240px, 288px"
              />
            </div>

            {/* Subtle Availability Badge */}
            <div
              className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3a0f34] text-[#dde3e8] border border-[#eaaa00] text-[11px] font-bold shadow-lg"
              title="Available for Software Engineering & AI roles"
            >
              <span className="w-2 h-2 rounded-full bg-[#eaaa00] animate-pulse" />
              <span>Available</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
