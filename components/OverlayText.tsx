'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';

interface OverlayTextProps {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

export default function OverlayText({ scrollYProgress }: OverlayTextProps) {
  // Opacity & Translation keyframes on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.35], [1, 0.6, 0]);
  const x = useTransform(scrollYProgress, [0, 0.35], [0, -60]);
  const y = useTransform(scrollYProgress, [0, 0.35], [0, -50]);

  const nameY = useTransform(scrollYProgress, [0, 0.25], [0, -25]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.25], [0, -15]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center pointer-events-none z-20"
      style={{ opacity, x, y }}
    >
      <div
        className="pl-8 md:pl-16 lg:pl-24 flex flex-col gap-4 md:gap-5"
        style={{ maxWidth: 'min(620px, 55vw)' }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div
            className="h-1 w-8 rounded-full"
            style={{ background: 'linear-gradient(90deg, #e34234, #000000)' }}
          />
          <span
            className="text-xs tracking-[0.35em] uppercase font-black px-2.5 py-0.5 rounded bg-black text-[#D4ff3f]"
          >
            Portfolio
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          style={{ y: nameY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-black leading-none tracking-tight"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              lineHeight: '0.92',
            }}
          >
            <span className="block text-black drop-shadow-md">Aman</span>
            <span className="block drop-shadow-md" style={{ marginTop: '0.05em', color: '#e34234' }}>
              Patel
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          style={{ y: subtitleY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-bold tracking-wide text-sm md:text-base text-black"
            style={{ letterSpacing: '0.03em' }}
          >
            Software Engineer&nbsp;
            <span className="text-[#e34234] font-black">·</span>
            &nbsp;AI/ML & Full-Stack&nbsp;
            <span className="text-[#000000] font-black">·</span>
            &nbsp;Backend Specialist
          </p>
          <p className="text-xs text-black/85 mt-1 font-semibold">
            B.Tech CSE (Data Science) @ SRM IST &middot; CGPA: 8.83/10
          </p>
        </motion.div>

        {/* Highlight Quick Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-wrap gap-2 pt-1"
        >
          <span className="text-[11px] px-3 py-1 rounded-full bg-black border border-[#D4ff3f] text-[#D4ff3f] font-bold shadow-sm">
            AWS Certified AI & Cloud
          </span>
          <span className="text-[11px] px-3 py-1 rounded-full bg-black border border-[#e34234] text-[#e34234] font-bold shadow-sm">
            ICCCNet 2026 Author
          </span>
          <span className="text-[11px] px-3 py-1 rounded-full bg-black border border-[#cbb3e8] text-[#cbb3e8] font-bold shadow-sm">
            LeetCode 250+ Solved
          </span>
        </motion.div>

        {/* Single Tagline Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          <p className="text-xs md:text-sm font-semibold italic text-black/80 tracking-wide leading-relaxed">
            &ldquo;Building scalable full-stack applications and AI systems that solve real problems.&rdquo;
          </p>
        </motion.div>

        {/* Magnetic CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex gap-3 flex-wrap pointer-events-auto mt-2"
        >
          <MagneticButton>
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-xs md:text-sm overflow-hidden transition-all duration-300 bg-black text-[#D4ff3f] border-2 border-black hover:bg-[#D4ff3f] hover:text-black shadow-[0_4px_25px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View Projects</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="#resume"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs md:text-sm transition-all duration-300 bg-black text-[#e34234] border-2 border-black hover:bg-[#e34234] hover:text-black shadow-[0_4px_25px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
              </svg>
              <span>View Resume</span>
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="/resume.pdf"
              download="Aman_Patel_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full font-bold text-xs bg-black text-[#cbb3e8] border-2 border-black hover:bg-[#cbb3e8] hover:text-black transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 cursor-pointer"
              title="Download Resume PDF"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>PDF</span>
            </a>
          </MagneticButton>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex items-center gap-3 mt-3"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border-2 border-black flex items-start justify-center pt-1.5"
          >
            <div
              className="w-1.5 h-2.5 rounded-full bg-[#e34234]"
            />
          </motion.div>
          <span
            className="text-xs tracking-widest uppercase font-bold text-black/75"
          >
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
