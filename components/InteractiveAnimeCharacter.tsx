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

  // Pupil offset (px)
  const [pupilOffset, setPupilOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  // Head tilt & rotation — full 3D head/body tracking with mouse
  const [headTransform, setHeadTransform] = useState({ rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Smooth lerp targets
  const targetPupil = useRef({ x: 0, y: 0 });
  const currentPupil = useRef({ x: 0, y: 0 });
  const targetHead = useRef({ rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 });
  const currentHead = useRef({ rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  // Natural Blinking Loop (every 3–6 s)
  useEffect(() => {
    let blinkTimeout: ReturnType<typeof setTimeout>;

    const scheduleBlink = () => {
      const nextInterval = 3000 + Math.random() * 3200;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
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

  // Combined animation loop — lerp pupils + head together at 60fps
  const animate = useCallback(() => {
    const f = 0.12;

    // Pupils lerp
    currentPupil.current.x += (targetPupil.current.x - currentPupil.current.x) * f;
    currentPupil.current.y += (targetPupil.current.y - currentPupil.current.y) * f;

    // Head 3D lerp
    currentHead.current.rotX += (targetHead.current.rotX - currentHead.current.rotX) * f;
    currentHead.current.rotY += (targetHead.current.rotY - currentHead.current.rotY) * f;
    currentHead.current.rotZ += (targetHead.current.rotZ - currentHead.current.rotZ) * f;
    currentHead.current.x += (targetHead.current.x - currentHead.current.x) * f;
    currentHead.current.y += (targetHead.current.y - currentHead.current.y) * f;

    setPupilOffset({
      x: Number(currentPupil.current.x.toFixed(2)),
      y: Number(currentPupil.current.y.toFixed(2)),
    });
    setHeadTransform({
      rotX: Number(currentHead.current.rotX.toFixed(3)),
      rotY: Number(currentHead.current.rotY.toFixed(3)),
      rotZ: Number(currentHead.current.rotZ.toFixed(3)),
      x: Number(currentHead.current.x.toFixed(2)),
      y: Number(currentHead.current.y.toFixed(2)),
    });

    animFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [animate]);

  // Mouse tracking — drives both pupils & full head tilt
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileScreen = window.innerWidth < 768;

    if (prefersReducedMotion || (isTouchDevice && isMobileScreen)) {
      targetPupil.current = { x: 0, y: 0 };
      targetHead.current = { rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 };
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      // ── 1. Pupil tracking ────────────────────────────────────
      const eyeCenterX = rect.left + rect.width * 0.512;
      const eyeCenterY = rect.top + rect.height * 0.355;

      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance >= 1) {
        const scaleRatio = rect.width / 936;
        const maxRangeX = Math.max(3.5, 8.5 * scaleRatio);
        const maxRangeY = Math.max(2.2, 4.8 * scaleRatio);
        const maxDistScreen = Math.max(window.innerWidth, window.innerHeight) * 0.65;
        const easeFactor = Math.pow(Math.min(distance / maxDistScreen, 1), 0.82);
        const angle = Math.atan2(deltaY, deltaX);
        targetPupil.current = {
          x: Math.cos(angle) * maxRangeX * easeFactor,
          y: Math.sin(angle) * maxRangeY * easeFactor,
        };
      }

      // ── 2. Full head & neck rotation toward cursor ───────────
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height * 0.45; // Neck / eye level

      const nx = (e.clientX - charCenterX) / (window.innerWidth / 2);
      const ny = (e.clientY - charCenterY) / (window.innerHeight / 2);

      const cx = Math.max(-1, Math.min(1, nx));
      const cy = Math.max(-1, Math.min(1, ny));

      // Noticeable, natural head turning:
      // Yaw (rotY): up to ±18° left/right
      // Pitch (rotX): up to ±12° up/down
      // Roll (rotZ): up to ±3.5° subtle head cant
      // Translation: up to ±10px lateral / ±6px vertical
      targetHead.current = {
        rotX: -cy * 12,
        rotY: cx * 18,
        rotZ: cx * 3.5,
        x: cx * 10,
        y: cy * 6,
      };
    };

    const handleMouseLeave = () => {
      targetPupil.current = { x: 0, y: 0 };
      targetHead.current = { rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 };
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
      className={`relative select-none ${className}`}
      style={{
        aspectRatio: '936 / 1024',
        perspective: '1000px',
      }}
    >
      {/* Soft orange ambient back-glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 55%, rgba(254,128,64,0.12) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* ── Character container with full 3D head pivot ── */}
      <div
        className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#303030] shadow-2xl bg-[#090204]"
        style={{
          boxShadow: '0 0 50px rgba(254,128,64,0.1), 0 25px 50px rgba(0,0,0,0.7)',
          transformOrigin: '50% 75%', // Pivots naturally around the neck/collar
          transform: `
            rotateX(${headTransform.rotX}deg)
            rotateY(${headTransform.rotY}deg)
            rotateZ(${headTransform.rotZ}deg)
            translate3d(${headTransform.x}px, ${headTransform.y}px, 0)
          `,
          animation: 'gentleFloat 5.2s ease-in-out infinite',
          willChange: 'transform',
          zIndex: 1,
        }}
      >
        {/* Layer 1: Base Character */}
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

        {/* Layer 3: Glasses / Eyelid Overlay */}
        <Image
          src="/eyelid-overlay.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 320px, (max-width: 1200px) 460px, 520px"
          className="object-cover object-center pointer-events-none"
        />

        {/* Layer 4: Natural Anime Blink */}
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
          0%, 100% { margin-top: 0px; }
          50% { margin-top: -6px; }
        }
      `}</style>
    </div>
  );
}
