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

  // Head / face 3D rotation and translation
  const [faceTransform, setFaceTransform] = useState({ rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 });
  // Dynamic glasses lens reflection glint position
  const [lensGlint, setLensGlint] = useState({ x: 50, y: 38, opacity: 0.2 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Smooth lerp targets for 60fps animation
  const targetFace = useRef({ rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 });
  const currentFace = useRef({ rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  // Natural Blinking Loop (every 3 to 6 seconds with occasional double blink)
  useEffect(() => {
    let blinkTimeout: ReturnType<typeof setTimeout>;

    const scheduleBlink = () => {
      const nextInterval = 3000 + Math.random() * 2800;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);

        setTimeout(() => {
          setIsBlinking(false);

          // 20% chance of a quick double blink
          if (Math.random() < 0.2) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => {
                setIsBlinking(false);
                scheduleBlink();
              }, 90);
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

  // Smooth 60fps lerp animation loop for head 3D rotation
  const animate = useCallback(() => {
    const factor = 0.11;

    // Smooth face 3D rotation & translation lerp
    currentFace.current.rotX += (targetFace.current.rotX - currentFace.current.rotX) * factor;
    currentFace.current.rotY += (targetFace.current.rotY - currentFace.current.rotY) * factor;
    currentFace.current.rotZ += (targetFace.current.rotZ - currentFace.current.rotZ) * factor;
    currentFace.current.x += (targetFace.current.x - currentFace.current.x) * factor;
    currentFace.current.y += (targetFace.current.y - currentFace.current.y) * factor;

    setFaceTransform({
      rotX: Number(currentFace.current.rotX.toFixed(3)),
      rotY: Number(currentFace.current.rotY.toFixed(3)),
      rotZ: Number(currentFace.current.rotZ.toFixed(3)),
      x: Number(currentFace.current.x.toFixed(2)),
      y: Number(currentFace.current.y.toFixed(2)),
    });

    // Dynamic lens light sheen follows head angle
    setLensGlint({
      x: 50 + currentFace.current.rotY * 1.8,
      y: 36 - currentFace.current.rotX * 1.2,
      opacity: 0.15 + Math.abs(currentFace.current.rotY) * 0.015,
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
      targetFace.current = { rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 };
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      // Eye & face center in viewport coordinates
      const faceCenterX = rect.left + rect.width * 0.5;
      const faceCenterY = rect.top + rect.height * 0.42;

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

      // ── Face 3D Head Turn (Yaw, Pitch, Roll) ─────────────────
      // Pupils stay naturally part of the face (no detached pupil movement)
      targetFace.current = {
        rotX: -easedY * 14,
        rotY: easedX * 20,
        rotZ: easedX * 2.8,
        x: easedX * 16,
        y: easedY * 10,
      };
    };

    const handleMouseLeave = () => {
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
        className="absolute inset-0 rounded-3xl pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(254,128,64,0.18) 0%, rgba(100,50,20,0.06) 55%, transparent 75%)',
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          1. STATIC OUTER CARD FRAME (Does NOT tilt or move)
          Anchored firmly with clean charcoal border and obsidian shadow
          ══════════════════════════════════════════════════════════ */}
      <div
        className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#303030] shadow-2xl bg-[#090204]"
        style={{
          boxShadow: '0 0 50px rgba(254,128,64,0.08), 0 25px 50px rgba(0,0,0,0.85)',
          perspective: '1200px',
        }}
      >
        {/* Subtle obsidian ambient particles in background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div
            className="absolute w-2 h-2 rounded-full bg-[#FE8040]/30 blur-xs"
            style={{ top: '18%', left: '12%' }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-[#FE8040]/35 blur-xs"
            style={{ top: '68%', right: '15%' }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-white/40"
            style={{ top: '32%', right: '22%' }}
          />
        </div>

        {/* ══════════════════════════════════════════════════════════
            2. 3D MOVING CHARACTER RIG (Head moves with mouse)
            Uses character.png (complete with natural dark pupils)
            Scaled (1.14) so 3D rotation never reveals frame edges
            ══════════════════════════════════════════════════════════ */}
        <div
          className="relative w-full h-full will-change-transform"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: '50% 72%', // Neck pivot point
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
          {/* Complete Character Portrait with Natural Dark Pupils */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/character.png"
              alt="Aman Patel Character Portrait"
              fill
              priority
              sizes="(max-width: 768px) 320px, (max-width: 1200px) 460px, 520px"
              className="object-cover object-center pointer-events-none"
            />
          </div>

          {/* Natural Anime Eyelid Blink (Only appears during 130ms blink) */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity"
            style={{
              opacity: isBlinking ? 1 : 0,
              transitionDuration: isBlinking ? '60ms' : '110ms',
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

          {/* Dynamic 3D Glasses Lens Specular Glint */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ transform: 'translateZ(15px)' }}
          >
            <div
              className="absolute w-20 h-14 rounded-full blur-md transition-all duration-75"
              style={{
                top: `${lensGlint.y}%`,
                left: `${lensGlint.x - 12}%`,
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, rgba(254,128,64,0.18) 50%, transparent 80%)',
                opacity: lensGlint.opacity,
                transform: `rotate(${faceTransform.rotY * 1.5 - 18}deg)`,
              }}
            />
            <div
              className="absolute w-18 h-12 rounded-full blur-md transition-all duration-75"
              style={{
                top: `${lensGlint.y}%`,
                left: `${lensGlint.x + 14}%`,
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.35) 0%, rgba(254,128,64,0.15) 50%, transparent 80%)',
                opacity: lensGlint.opacity,
                transform: `rotate(${faceTransform.rotY * 1.5 - 18}deg)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
