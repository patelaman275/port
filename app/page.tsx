'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { SoundProvider } from '@/components/SoundContext';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import LoadingExperience from '@/components/LoadingExperience';
import LiveLavenderBackground from '@/components/LiveLavenderBackground';
import RecruiterChatModal from '@/components/RecruiterChatModal';
import PortraitGlitch from '@/components/PortraitGlitch';
import OverlayText from '@/components/OverlayText';
import ProjectCarousel3D from '@/components/ProjectCarousel3D';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import EducationAndAchievements from '@/components/EducationAndAchievements';
import PublicationsSection from '@/components/PublicationsSection';
import ResumeSection from '@/components/ResumeSection';
import Footer from '@/components/Footer';

const TOTAL_FRAMES = 80;
const FRAME_PATH = (i: number) =>
  `/sequence/frame_${String(i + 1).padStart(3, '0')}.webp`;

function coverDraw(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;

  const canvasAR = cw / ch;
  const imgAR = iw / ih;

  let sw: number, sh: number, sx: number, sy: number;

  if (canvasAR > imgAR) {
    sw = iw;
    sh = iw / canvasAR;
    sx = 0;
    sy = (ih - sh) / 2;
  } else {
    sh = ih;
    sw = ih * canvasAR;
    sx = (iw - sw) / 2;
    sy = 0;
  }

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

export default function Home() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);

  const [preloadProgress, setPreloadProgress] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [hasSequence, setHasSequence] = useState(true);

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Preload sequence frames
  useEffect(() => {
    let loaded = 0;
    let failed = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const checkDone = () => {
      const prog = Math.round(((loaded + failed) / TOTAL_FRAMES) * 100);
      setPreloadProgress(prog);

      if (loaded + failed === TOTAL_FRAMES) {
        if (failed === TOTAL_FRAMES) setHasSequence(false);
        setIsPreloaded(true);
        framesRef.current = images;
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.onload = () => {
        loaded++;
        checkDone();
      };
      img.onerror = () => {
        failed++;
        checkDone();
      };
      img.src = FRAME_PATH(i);
      images[i] = img;
    }
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = framesRef.current[Math.round(index)];
    if (!img || !img.complete || !img.naturalWidth) return;
    coverDraw(ctx, img, canvas.width, canvas.height);
  }, []);

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const idx = Math.round(latest);
    if (idx === currentFrameRef.current) return;
    currentFrameRef.current = idx;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => drawFrame(idx));
  });

  useEffect(() => {
    if (isPreloaded && hasSequence) requestAnimationFrame(() => drawFrame(0));
  }, [isPreloaded, hasSequence, drawFrame]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawFrame(currentFrameRef.current);
      }, 150);
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [drawFrame]);

  return (
    <SoundProvider>
      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Custom Glowing Trailing Cursor */}
      <CustomCursor />

      {/* Living Dynamic Ambient Lavender Background */}
      <LiveLavenderBackground />

      {/* Loading Intro Experience */}
      <LoadingExperience progress={preloadProgress} />

      {/* Floating Quick Action: View / Download Resume & AI Recruiter Hub */}
      <div className="fixed top-5 right-5 z-[9990] flex flex-col items-end gap-2.5">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-black text-[#D4ff3f] font-bold text-xs border-2 border-black shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:bg-[#D4ff3f] hover:text-black hover:border-black transition-all duration-300"
        >
          <span className="w-2 h-2 rounded-full bg-[#e34234] group-hover:bg-black animate-pulse" />
          <span>📄 View Resume</span>
        </a>

        {/* LLM Recruiter Chatbot (Positioned directly below View Resume) */}
        <RecruiterChatModal />
      </div>

      <main className="relative z-10 bg-transparent min-h-screen overflow-x-hidden text-black">
        {/* ══ HERO: Portrait + Overlay Text on Living Lavender Canvas ══════════ */}
        <section
          ref={sectionRef}
          className="relative bg-transparent"
          style={{ height: '160vh' }}
          aria-label="Hero section"
        >
          <div className="sticky top-0 w-full h-screen overflow-hidden bg-transparent">
            {/* Portrait (right side - filling frame seamlessly, zero hard box borders) */}
            <PortraitGlitch scrollYProgress={scrollYProgress} />

            {/* Overlay Text (left side with high-contrast typography) */}
            <OverlayText scrollYProgress={scrollYProgress} />
          </div>
        </section>

        {/* ══ 3D SPRING ROTATION PROJECT CAROUSEL ══════════════════ */}
        <ProjectCarousel3D />

        {/* Section divider */}
        <div className="section-divider mx-auto max-w-4xl" />

        {/* ══ SKILLS SECTION ═══════════════════════════════════════ */}
        <SkillsSection />

        {/* Section divider */}
        <div className="section-divider mx-auto max-w-4xl" />

        {/* ══ CERTIFICATIONS SECTION ═══════════════════════════════ */}
        <CertificationsSection />

        {/* Section divider */}
        <div className="section-divider mx-auto max-w-4xl" />

        {/* ══ EDUCATION & ACHIEVEMENTS SECTION ══════════════════════ */}
        <EducationAndAchievements />

        {/* Section divider */}
        <div className="section-divider mx-auto max-w-4xl" />

        {/* ══ PUBLICATIONS SECTION ═════════════════════════════════ */}
        <PublicationsSection />

        {/* Section divider */}
        <div className="section-divider mx-auto max-w-4xl" />

        {/* ══ RESUME SECTION (VIEW & DOWNLOAD) ══════════════════════ */}
        <ResumeSection />

        {/* ══ FOOTER / CONTACT ═════════════════════════════════════ */}
        <Footer />
      </main>
    </SoundProvider>
  );
}
