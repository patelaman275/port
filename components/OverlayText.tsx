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
            className="h-0.5 w-8"
            style={{ background: 'linear-gradient(90deg, #cc1100, #ff8a00)' }}
          />
          <span
            className="text-xs tracking-[0.35em] uppercase font-medium"
            style={{ color: '#ff8a00' }}
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
            <span className="block text-white drop-shadow-lg">Aman</span>
            <span className="block gradient-text drop-shadow-lg" style={{ marginTop: '0.05em' }}>
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
            className="font-light tracking-wide text-sm md:text-base text-white/80"
            style={{ letterSpacing: '0.05em' }}
          >
            ML Engineer&nbsp;
            <span className="text-[#ff4b2b] font-semibold">·</span>
            &nbsp;Full-Stack Developer&nbsp;
            <span className="text-[#ff4b2b] font-semibold">·</span>
            &nbsp;Data Science
          </p>
        </motion.div>

        {/* Single Tagline Quote (Replaces Stat Badges) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <p className="text-xs md:text-sm font-light italic text-white/50 tracking-wide leading-relaxed">
            &ldquo;Building things that learn, scale, and ship — one line of code at a time.&rdquo;
          </p>
        </motion.div>

        {/* Magnetic CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex gap-4 flex-wrap pointer-events-auto mt-2"
        >
          <MagneticButton>
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm overflow-hidden transition-all duration-300 shadow-[0_4px_30px_rgba(255,75,43,0.4)] hover:shadow-[0_6px_45px_rgba(255,138,0,0.65)] hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #cc1100 0%, #ff4b2b 60%, #ff8a00 100%)',
                color: '#fff',
              }}
            >
              <span>View Projects</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:border-[#ff4b2b]/50 hover:bg-white/10 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(240,244,255,0.85)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
              </svg>
              <span>Resume</span>
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
            className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
            style={{ borderColor: 'rgba(255,75,43,0.4)' }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{ background: 'linear-gradient(#ff4b2b, #ff8a00)' }}
            />
          </motion.div>
          <span
            className="text-xs tracking-widest uppercase text-white/30"
          >
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
