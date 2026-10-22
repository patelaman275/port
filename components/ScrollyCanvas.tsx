'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const TOTAL_FRAMES = 80;
const FRAME_PATH = (i: number) =>
  `/sequence/frame_${String(i + 1).padStart(3, '0')}.webp`;

function coverDraw(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
  aberration: number = 0
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

  if (aberration > 0.5) {
    // Chromatic Aberration Effect during fast scroll velocity
    const offset = Math.min(aberration * 1.5, 12);

    // Red Channel
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(img, sx, sy, sw, sh, -offset, 0, cw, ch);

    // Green Channel blend
    ctx.globalCompositeOperation = 'screen';
    ctx.drawImage(img, sx, sy, sw, sh, offset, 0, cw, ch);

    // Reset composite
    ctx.globalCompositeOperation = 'source-over';
  } else {
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }
}

interface ScrollyCanvasProps {
  onLoadProgress?: (progress: number) => void;
}

export default function ScrollyCanvas({ onLoadProgress }: ScrollyCanvasProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);

  const [hasSequence, setHasSequence] = useState(true);
  const scrollSpeedRef = useRef<number>(0);
  const lastScrollPosRef = useRef<number>(0);
  const lastScrollTimeRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Preload frames
  useEffect(() => {
    let loaded = 0;
    let failed = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const checkDone = () => {
      const prog = Math.round(((loaded + failed) / TOTAL_FRAMES) * 100);
      onLoadProgress?.(prog);

      if (loaded + failed === TOTAL_FRAMES) {
        if (failed === TOTAL_FRAMES) setHasSequence(false);
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
  }, [onLoadProgress]);

  // Measure velocity
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = framesRef.current[Math.round(index)];
    if (!img || !img.complete || !img.naturalWidth) return;

    coverDraw(ctx, img, canvas.width, canvas.height, scrollSpeedRef.current);
  }, []);

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const now = Date.now();
    const dt = now - lastScrollTimeRef.current || 1;
    const dp = Math.abs(latest - lastScrollPosRef.current);

    scrollSpeedRef.current = (dp / dt) * 100;
    lastScrollPosRef.current = latest;
    lastScrollTimeRef.current = now;

    const idx = Math.round(latest);
    currentFrameRef.current = idx;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => drawFrame(idx));
  });

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
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '500vh' }}
      aria-label="Scrollable canvas hero"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Canvas for WebP sequence */}
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

        {/* Ambient Ember Sparks Overlay */}
        <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-t from-[#ff4b2b] to-[#ff8a00]"
              style={{
                left: `${15 + (i * 5.2) % 75}%`,
                top: `${20 + (i * 7.4) % 70}%`,
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                boxShadow: '0 0 10px #ff4b2b, 0 0 20px #ff8a00',
                opacity: 0.2 + (i % 5) * 0.15,
                animation: `float-y ${3 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${(i * 0.4) % 3}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
