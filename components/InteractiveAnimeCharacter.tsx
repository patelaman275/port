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
  // Head / face 3D rotation and translation (inside the static card)
  const [faceTransform, setFaceTransform] = useState({ rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Smooth lerp targets for 60fps animation
  const targetPupil = useRef({ x: 0, y: 0 });
  const currentPupil = useRef({ x: 0, y: 0 });
  const targetFace = useRef({ rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 });
  const currentFace = useRef({ rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  // Natural Blinking Loop (every 2.8 to 6.0 seconds)
  useEffect(() => {
    let blinkTimeout: ReturnType<typeof setTimeout>;

    const scheduleBlink = () => {
      const nextInterval = 2800 + Math.random() * 3200;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);

        setTimeout(() => {
          setIsBlinking(false);

          // 20% chance of an immediate quick double blink
          if (Math.random() < 0.22) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => {
                setIsBlinking(false);
                scheduleBlink();
              }, 100);
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

  // Smooth 60fps lerp animation loop
  const animate = useCallback(() => {
    const factor = 0.12;

    // Smooth pupils lerp
    currentPupil.current.x += (targetPupil.current.x - currentPupil.current.x) * factor;
    currentPupil.current.y += (targetPupil.current.y - currentPupil.current.y) * factor;

    // Smooth face 3D lerp
    currentFace.current.rotX += (targetFace.current.rotX - currentFace.current.rotX) * factor;
    currentFace.current.rotY += (targetFace.current.rotY - currentFace.current.rotY) * factor;
    currentFace.current.rotZ += (targetFace.current.rotZ - currentFace.current.rotZ) * factor;
    currentFace.current.x += (targetFace.current.x - currentFace.current.x) * factor;
    currentFace.current.y += (targetFace.current.y - currentFace.current.y) * factor;

    setPupilOffset({
      x: Number(currentPupil.current.x.toFixed(2)),
      y: Number(currentPupil.current.y.toFixed(2)),
    });

    setFaceTransform({
      rotX: Number(currentFace.current.rotX.toFixed(3)),
      rotY: Number(currentFace.current.rotY.toFixed(3)),
      rotZ: Number(currentFace.current.rotZ.toFixed(3)),
      x: Number(currentFace.current.x.toFixed(2)),
      y: Number(currentFace.current.y.toFixed(2)),
    });

    animFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [animate]);

  // Track mouse coordinates across the entire window
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileScreen = window.innerWidth < 768;

    if (prefersReducedMotion || (isTouchDevice && isMobileScreen)) {
      targetPupil.current = { x: 0, y: 0 };
      targetFace.current = { rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 };
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      // Eye & face center in viewport coordinates
      const faceCenterX = rect.left + rect.width * 0.51;
      const faceCenterY = rect.top + rect.height * 0.38;

      const deltaX = e.clientX - faceCenterX;
      const deltaY = e.clientY - faceCenterY;

      // Normalized coordinates (-1 to +1) based on screen dimensions
      const screenHalfW = Math.max(window.innerWidth * 0.5, 400);
      const screenHalfH = Math.max(window.innerHeight * 0.5, 300);

      const nx = Math.max(-1, Math.min(1, deltaX / screenHalfW));
      const ny = Math.max(-1, Math.min(1, deltaY / screenHalfH));

      // Ease curve: natural, responsive, and smoothly bounded at edges
      const dist = Math.hypot(nx, ny);
      const ease = dist > 0 ? Math.pow(Math.min(dist, 1), 0.85) : 0;
      const angle = Math.atan2(ny, nx);

      const easedX = Math.cos(angle) * ease;
      const easedY = Math.sin(angle) * ease;

      // ── 1. Face 3D Head Turn ───────────────────────────────
      // Yaw (rotY): up to ±20° left/right
      // Pitch (rotX): up to ±14° up/down
      // Roll (rotZ): up to ±3° natural micro-tilt
      // Lateral/Vertical shift: up to ±16px X, ±10px Y
      targetFace.current = {
        rotX: -easedY * 14,
        rotY: easedX * 20,
        rotZ: easedX * 3,
        x: easedX * 16,
        y: easedY * 10,
      };

      // ── 2. Pupil Offset (eyes move within the face) ────────
      targetPupil.current = {
        x: easedX * 6.5,
        y: easedY * 4.0,
      };
    };

    const handleMouseLeave = () => {
      targetPupil.current = { x: 0, y: 0 };
      targetFace.current = { rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 };
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
      style={{ aspectRatio: '936 / 1024' }}
    >
      {/* Soft orange ambient back-glow behind card */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 55%, rgba(254,128,64,0.12) 0%, transparent 70%)',
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          1. STATIC OUTER CARD FRAME (Does NOT tilt or move)
          Anchored firmly with clean charcoal border and obsidian shadow
          ══════════════════════════════════════════════════════════ */}
      <div
        className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#303030] shadow-2xl bg-[#090204]"
        style={{
          boxShadow: '0 0 50px rgba(254,128,64,0.08), 0 25px 50px rgba(0,0,0,0.7)',
          perspective: '1000px',
        }}
      >
        {/* ══════════════════════════════════════════════════════════
            2. MOVING CHARACTER / FACE CONTAINER
            Slightly scaled (1.14) so 3D rotation & translation
            never show blank edges outside the frame.
            ══════════════════════════════════════════════════════════ */}
        <div
          className="relative w-full h-full will-change-transform"
          style={{
            transformOrigin: '50% 70%', // Pivots at the neck/collar
            transform: `
              scale(1.14)
              rotateX(${faceTransform.rotX}deg)
              rotateY(${faceTransform.rotY}deg)
              rotateZ(${faceTransform.rotZ}deg)
              translate3d(${faceTransform.x}px, ${faceTransform.y}px, 0)
            `,
            transition: 'transform 0.04s linear',
          }}
        >
          {/* Layer 1: Base Character (Face, hair, glasses frame, clothing) */}
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

          {/* Layer 3: Glasses Frames & Eyelash Overlay (Keeps pupils behind frames) */}
          <Image
            src="/eyelid-overlay.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 320px, (max-width: 1200px) 460px, 520px"
            className="object-cover object-center pointer-events-none"
          />

          {/* Layer 4: Natural Anime Blink (Closed eyelids) */}
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
      </div>
    </div>
  );
}
