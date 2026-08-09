'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { SoundProvider } from '@/components/SoundContext';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import LoadingExperience from '@/components/LoadingExperience';
import PortraitGlitch from '@/components/PortraitGlitch';
import OverlayText from '@/components/OverlayText';
import ProjectCarousel3D from '@/components/ProjectCarousel3D';
import SkillsSection from '@/components/SkillsSection';
import PublicationsSection from '@/components/PublicationsSection';
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

      {/* Loading Intro Experience */}
      <LoadingExperience progress={preloadProgress} />

      <main className="bg-[#080608] min-h-screen relative overflow-x-hidden">
        {/* ══ HERO: ScrollyCanvas + Portrait + Overlay Text ══════════ */}
        <section
          ref={sectionRef}
          className="relative"
          style={{ height: '180vh' }}
          aria-label="Hero scrollytelling section"
        >
          <div className="sticky top-0 w-full h-screen overflow-hidden">
            {/* Canvas image sequence */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ display: hasSequence ? 'block' : 'none' }}
              aria-hidden="true"
            />

            {/* Fallback atmospheric background */}
            {!hasSequence && (
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 90% 70% at 30% 60%, #200808 0%, #110406 35%, #080608 70%)',
                }}
                aria-hidden="true"
              />
            )}

            {/* Cinematic Vignette */}
            <div
              className="absolute inset-0 pointer-events-none z-[1]"
              style={{
                background:
                  'radial-gradient(ellipse 140% 100% at 50% 50%, transparent 25%, rgba(8,6,8,0.55) 65%, rgba(8,6,8,0.92) 100%)',
              }}
              aria-hidden="true"
            />

            {/* Ember sparks */}
            <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
              {[...Array(14)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-t from-[#ff4b2b] to-[#ff8a00]"
                  style={{
                    left: `${10 + (i * 6.2) % 80}%`,
                    top: `${15 + (i * 8.1) % 75}%`,
                    width: `${2 + (i % 3)}px`,
                    height: `${2 + (i % 3)}px`,
                    boxShadow: '0 0 10px #ff4b2b, 0 0 20px #ff8a00',
                    opacity: 0.2 + (i % 4) * 0.15,
                    animation: `float-y ${3 + (i % 4)}s ease-in-out infinite`,
                    animationDelay: `${(i * 0.3) % 3}s`,
                  }}
                />
              ))}
            </div>

            {/* Bottom fade into carousel */}
            <div
              className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-[5]"
              style={{
                background: 'linear-gradient(to bottom, transparent, #080608)',
              }}
              aria-hidden="true"
            />

            {/* Portrait (right side - filling frame seamlessly, zero hard box borders) */}
            <PortraitGlitch scrollYProgress={scrollYProgress} />

            {/* Overlay Text (left side with tagline quote) */}
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

        {/* ══ PUBLICATIONS SECTION ═════════════════════════════════ */}
        <PublicationsSection />

        {/* ══ FOOTER / CONTACT ═════════════════════════════════════ */}
        <Footer />
      </main>
    </SoundProvider>
  );
}
