'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

interface InteractiveAnimeCharacterProps {
  className?: string;
}

export default function InteractiveAnimeCharacter({
  className = '',
}: InteractiveAnimeCharacterProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Pupil offset in pixels (relative to scaled rendered image)
  const [pupilOffset, setPupilOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Target and current animated values for smooth 60fps lerp
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  // Natural Blinking Loop (every 3 to 6 seconds)
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;

    const scheduleBlink = () => {
      const nextInterval = 3000 + Math.random() * 3200; // 3.0s - 6.2s
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);

        // Standard eye blink is ~130ms
        setTimeout(() => {
          setIsBlinking(false);

          // 20% chance of an immediate quick double blink
          if (Math.random() < 0.22) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => {
                setIsBlinking(false);
                scheduleBlink();
              }, 110);
            }, 120);
          } else {
            scheduleBlink();
          }
        }, 130);
      }, nextInterval);
    };

    scheduleBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Smooth Eye Tracking Animation Loop
  const animate = useCallback(() => {
    // Smooth lerp (0.12 factor)
    const factor = 0.12;
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * factor;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * factor;

    setPupilOffset({
      x: Number(currentPos.current.x.toFixed(2)),
      y: Number(currentPos.current.y.toFixed(2)),
    });

    animFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [animate]);

  // Mouse tracking logic
  useEffect(() => {
    // Check reduced motion preference or mobile/touch device
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileScreen = window.innerWidth < 768;

    if (prefersReducedMotion || (isTouchDevice && isMobileScreen)) {
      targetPos.current = { x: 0, y: 0 };
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      // Original character eye center in 936 x 1024 coordinates:
      // X = 479 / 936 = ~0.5118
      // Y = 363.5 / 1024 = ~0.3550
      const eyeCenterX = rect.left + rect.width * 0.512;
      const eyeCenterY = rect.top + rect.height * 0.355;

      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;

      // Distance from eye center
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < 1) {
        targetPos.current = { x: 0, y: 0 };
        return;
      }

      // Max movement boundaries:
      // In 936px width, max pupil travel is ~8px horizontally and ~4.5px vertically
      const scaleRatio = rect.width / 936;
      const maxRangeX = Math.max(3.5, 8.5 * scaleRatio);
      const maxRangeY = Math.max(2.2, 4.8 * scaleRatio);

      // Nonlinear response: gentle when mouse is close, capped smoothly at edge of screen
      const maxDistScreen = Math.max(window.innerWidth, window.innerHeight) * 0.65;
      const normalizedDist = Math.min(distance / maxDistScreen, 1);
      // Smooth power curve for natural anime gaze
      const easeFactor = Math.pow(normalizedDist, 0.82);

      const angle = Math.atan2(deltaY, deltaX);
      targetPos.current = {
        x: Math.cos(angle) * maxRangeX * easeFactor,
        y: Math.sin(angle) * maxRangeY * easeFactor,
      };
    };

    const handleMouseLeave = () => {
      // Smoothly return eyes to neutral when cursor exits viewport
      targetPos.current = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        targetPos.current = { x: 0, y: 0 };
      }}
      className={`relative select-none ${className}`}
      style={{
        // Maintain exact 936 : 1024 aspect ratio
        aspectRatio: '936 / 1024',
      }}
    >
      {/* ── Floating Character Container ── */}
      <div
        className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#303030] shadow-xl bg-[#090204]"
        style={{
          animation: 'gentleFloat 5.2s ease-in-out infinite',
          boxShadow: '0 0 40px rgba(254,128,64,0.08), 0 20px 40px rgba(0,0,0,0.6)',
        }}
      >
        {/* Layer 1: Base Character (Hair, face, glasses, clothing, and inpainted eye whites) */}
        <Image
          src="/character-base.png"
          alt="Aman Patel Anime Character"
          fill
          priority
          sizes="(max-width: 768px) 320px, (max-width: 1200px) 460px, 520px"
          className="object-cover object-center pointer-events-none"
        />

        {/* Layer 2: Interactive Mouse-Tracking Pupils */}
        <div
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            transform: `translate3d(${pupilOffset.x}px, ${pupilOffset.y}px, 0)`,
            transition: 'transform 0.04s linear',
          }}
        >
          <Image
            src="/pupils.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 320px, (max-width: 1200px) 460px, 520px"
            className="object-cover object-center pointer-events-none"
          />
        </div>

        {/* Layer 3: Eyelashes & Glasses Overlay (Ensures pupils slide BEHIND upper lashes and frames) */}
        <Image
          src="/eyelid-overlay.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 320px, (max-width: 1200px) 460px, 520px"
          className="object-cover object-center pointer-events-none"
        />

        {/* Layer 4: Natural Anime Blinking (Closed eyelids) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity"
          style={{
            opacity: isBlinking ? 1 : 0,
            transitionDuration: isBlinking ? '60ms' : '120ms',
          }}
        >
          <Image
            src="/blink.png"
            alt=""
            fill
            sizes="(max-width: 768px) 320px, (max-width: 1200px) 460px, 520px"
            className="object-cover object-center pointer-events-none"
          />
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-6px) rotate(0.25deg);
          }
        }
      `}</style>
    </div>
  );
}
