'use client';

import { motion, useTransform, useScroll } from 'framer-motion';
import Image from 'next/image';

interface PortraitGlitchProps {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

// Sparkle particles around face
const SPARKLES = [
  { x: 25, y: 15, delay: 0,    dur: 2.4 },
  { x: 65, y: 10, delay: 0.6,  dur: 3.1 },
  { x: 82, y: 40, delay: 1.2,  dur: 2.8 },
  { x: 55, y: 70, delay: 0.3,  dur: 3.5 },
  { x: 30, y: 60, delay: 1.8,  dur: 2.2 },
  { x: 40, y: 8,  delay: 0.9,  dur: 2.9 },
  { x: 75, y: 25, delay: 2.1,  dur: 3.3 },
  { x: 20, y: 80, delay: 1.5,  dur: 2.6 },
  { x: 50, y: 50, delay: 0.4,  dur: 3.7 },
  { x: 85, y: 65, delay: 2.4,  dur: 2.1 },
];

export default function PortraitGlitch({ scrollYProgress }: PortraitGlitchProps) {
  // Opacity & Translation tied to initial scroll
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [1, 1.05]);
  const blur = useTransform(scrollYProgress, [0.2, 0.45], [0, 16]);
  const y = useTransform(scrollYProgress, [0, 0.45], [0, -40]);

  // Glitch channel offsets — trigger between 10%–35% of scroll
  const glitchR_x = useTransform(scrollYProgress, [0.1, 0.15, 0.22, 0.3, 0.38, 0.42], [0, -6, 5, -4, 6, 0]);
  const glitchG_x = useTransform(scrollYProgress, [0.1, 0.15, 0.22, 0.3, 0.38, 0.42], [0,  7, -6, 5, -7, 0]);
  const glitchB_x = useTransform(scrollYProgress, [0.1, 0.15, 0.22, 0.3, 0.38, 0.42], [0,  4, -5, 6, -4, 0]);
  const glitchR_y = useTransform(scrollYProgress, [0.1, 0.15, 0.22, 0.3, 0.38, 0.42], [0,  4, -3, 5, -4, 0]);
  const glitchOpacity = useTransform(scrollYProgress, [0.08, 0.15, 0.32, 0.42], [0, 0.75, 0.4, 0]);

  // Scanlines opacity
  const scanlineOpacity = useTransform(scrollYProgress, [0.08, 0.15, 0.32, 0.42], [0, 0.25, 0.15, 0]);

  return (
    <motion.div
      className="absolute right-0 top-0 h-full w-full md:w-[60vw] lg:w-[54vw] pointer-events-none select-none z-10"
      style={{
        opacity,
        y,
      }}
      aria-hidden="true"
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          scale,
          filter: useTransform(blur, (v) => `blur(${v}px)`),
        }}
      >
        {/* Soft Radial Gradient Mask — Seamless blend into #080608 with no hard box borders */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            maskImage:
              'radial-gradient(ellipse 75% 80% at 65% 42%, black 40%, transparent 85%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 75% 80% at 65% 42%, black 40%, transparent 85%)',
          }}
        >
          {/* Base portrait */}
          <div className="relative w-full h-full">
            <Image
              src="/portrait.png"
              alt="Aman Patel Portrait"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-[70%_20%] md:object-[65%_22%]"
              style={{ mixBlendMode: 'normal' }}
            />

            {/* 3-Color Lavender / Chartreuse / Tomato Red rim light overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(110deg, rgba(212,255,63,0.25) 0%, rgba(203,179,232,0.18) 35%, rgba(227,66,52,0.1) 60%, transparent 80%)',
                mixBlendMode: 'screen',
              }}
            />

            {/* Continuous subtle diagonal glitter / light sweep pass across face */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '60%',
                  height: '100%',
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(212,255,63,0.2) 30%, rgba(203,179,232,0.3) 50%, rgba(227,66,52,0.2) 70%, transparent 100%)',
                  animation: 'shimmer-sweep 4s ease-in-out infinite',
                  animationDelay: '1s',
                  mixBlendMode: 'overlay',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Sparkle Ember Dots in 3 Colors: Chartreuse, Lavender, Tomato Red */}
            {SPARKLES.map((s, i) => {
              const color = i % 3 === 0 ? '#D4ff3f' : i % 3 === 1 ? '#cbb3e8' : '#e34234';
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    width: '3.5px',
                    height: '3.5px',
                    borderRadius: '50%',
                    background: color,
                    boxShadow: `0 0 10px 2px ${color}`,
                    animation: `sparkle-in ${s.dur}s ease-in-out infinite`,
                    animationDelay: `${s.delay}s`,
                    mixBlendMode: 'screen',
                    pointerEvents: 'none',
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* RGB Channel Split Glitch Layers */}
        {/* Red channel */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            x: glitchR_x,
            y: glitchR_y,
            opacity: glitchOpacity,
            maskImage:
              'radial-gradient(ellipse 75% 80% at 65% 42%, black 40%, transparent 85%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 75% 80% at 65% 42%, black 40%, transparent 85%)',
          }}
        >
          <Image
            src="/portrait.png"
            alt=""
            fill
            sizes="60vw"
            className="object-cover object-[70%_20%] md:object-[65%_22%]"
            style={{ mixBlendMode: 'screen', filter: 'saturate(0) sepia(1) hue-rotate(-10deg)' }}
          />
        </motion.div>

        {/* Green channel */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            x: glitchG_x,
            opacity: useTransform(glitchOpacity, (o) => o * 0.5),
            maskImage:
              'radial-gradient(ellipse 75% 80% at 65% 42%, black 40%, transparent 85%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 75% 80% at 65% 42%, black 40%, transparent 85%)',
          }}
        >
          <Image
            src="/portrait.png"
            alt=""
            fill
            sizes="60vw"
            className="object-cover object-[70%_20%] md:object-[65%_22%]"
            style={{ mixBlendMode: 'screen', filter: 'saturate(0) sepia(1) hue-rotate(100deg)' }}
          />
        </motion.div>

        {/* Blue channel */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            x: glitchB_x,
            opacity: useTransform(glitchOpacity, (o) => o * 0.4),
            maskImage:
              'radial-gradient(ellipse 75% 80% at 65% 42%, black 40%, transparent 85%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 75% 80% at 65% 42%, black 40%, transparent 85%)',
          }}
        >
          <Image
            src="/portrait.png"
            alt=""
            fill
            sizes="60vw"
            className="object-cover object-[70%_20%] md:object-[65%_22%]"
            style={{ mixBlendMode: 'screen', filter: 'saturate(0) sepia(1) hue-rotate(200deg)' }}
          />
        </motion.div>

        {/* Scanlines overlay during glitch */}
        <motion.div
          className="absolute inset-0 z-25 pointer-events-none"
          style={{ opacity: scanlineOpacity }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px)',
              animation: 'scanlines 0.1s steps(1) infinite',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
