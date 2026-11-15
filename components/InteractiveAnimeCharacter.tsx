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

  // Pupil offset (px) for eye gaze tracking
  const [pupilOffset, setPupilOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  // Head / face 3D rotation and translation
  const [faceTransform, setFaceTransform] = useState({ rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 });
  // Dynamic lens reflection glint position (percent)
  const [glintPos, setGlintPos] = useState({ x: 50, y: 40, opacity: 0.25 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Smooth lerp targets for 60fps animation
  const targetPupil = useRef({ x: 0, y: 0 });
  const currentPupil = useRef({ x: 0, y: 0 });
  const targetFace = useRef({ rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 });
  const currentFace = useRef({ rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  // Natural Blinking Loop (every 2.8 to 5.5 seconds with occasional double blink)
  useEffect(() => {
    let blinkTimeout: ReturnType<typeof setTimeout>;

    const scheduleBlink = () => {
      const nextInterval = 2800 + Math.random() * 2700;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);

        setTimeout(() => {
          setIsBlinking(false);

          // 22% chance of a quick double blink
          if (Math.random() < 0.22) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => {
                setIsBlinking(false);
                scheduleBlink();
              }, 95);
            }, 120);
          } else {
            scheduleBlink();
          }
        }, 125);
      }, nextInterval);
    };

    scheduleBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Smooth 60fps lerp animation loop
  const animate = useCallback(() => {
    const factor = 0.11;

    // Smooth pupils lerp
    currentPupil.current.x += (targetPupil.current.x - currentPupil.current.x) * factor;
    currentPupil.current.y += (targetPupil.current.y - currentPupil.current.y) * factor;

    // Smooth face 3D rotation & translation lerp
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

    // Dynamic lens glint tracks opposite angle
    const glintX = 50 + currentFace.current.rotY * 1.5;
    const glintY = 38 - currentFace.current.rotX * 1.2;
    setGlintPos({
      x: Math.max(20, Math.min(80, glintX)),
      y: Math.max(20, Math.min(65, glintY)),
      opacity: 0.18 + Math.abs(currentFace.current.rotY) * 0.012,
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

      // ── Face 3D Head Turn ─────────────────────────────────
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

      // ── Pupil Offset (eyes move inside the face) ──────────
      targetPupil.current = {
        x: easedX * 7.0,
        y: easedY * 4.5,
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
        className="absolute inset-0 rounded-3xl pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(254,128,64,0.16) 0%, rgba(100,50,20,0.05) 55%, transparent 75%)',
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
        {/* Ambient subtle background dust particles in 3D */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div
            className="absolute w-2 h-2 rounded-full bg-[#FE8040]/30 blur-xs"
            style={{ top: '20%', left: '15%' }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-[#FE8040]/40 blur-xs"
            style={{ top: '65%', right: '18%' }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-white/40"
            style={{ top: '35%', right: '25%' }}
          />
        </div>

        {/* ══════════════════════════════════════════════════════════
            2. 3D MOVING CHARACTER RIG (Nested 3D parallax layers)
            Scaled (1.15) so 3D rotation & translation never clip
            ══════════════════════════════════════════════════════════ */}
        <div
          className="relative w-full h-full will-change-transform"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: '50% 72%', // Neck pivot
            transform: `
              scale(1.15)
              rotateX(${faceTransform.rotX}deg)
              rotateY(${faceTransform.rotY}deg)
              rotateZ(${faceTransform.rotZ}deg)
              translate3d(${faceTransform.x}px, ${faceTransform.y}px, 0)
            `,
            transition: 'transform 0.04s linear',
          }}
        >
          {/* Layer 1: Base Character Portrait (Face, hair, body) at Z: 0px */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ transform: 'translateZ(0px)' }}
          >
            <Image
              src="/character-base.png"
              alt="Aman Patel Character Portrait"
              fill
              priority
              sizes="(max-width: 768px) 320px, (max-width: 1200px) 460px, 520px"
              className="object-cover object-center pointer-events-none"
            />
          </div>

          {/* Layer 2: Interactive Mouse-Tracking Pupils at Z: 10px in 3D depth */}
          <div
            className="absolute inset-0 pointer-events-none will-change-transform"
            style={{
              transform: `translate3d(${pupilOffset.x}px, ${pupilOffset.y}px, 10px)`,
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

          {/* Layer 3: Natural Anime Blink at Z: 16px */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity"
            style={{
              transform: 'translateZ(16px)',
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

          {/* Layer 4: Glasses Frames & Eyelash Overlay at Z: 26px (True 3D Parallax!)
              Because this layer sits in FRONT of the eyes, when his head turns,
              the glasses frames shift realistically across the pupils! */}
          <div
            className="absolute inset-0 pointer-events-none will-change-transform"
            style={{
              transform: `translate3d(${pupilOffset.x * 0.2}px, ${pupilOffset.y * 0.2}px, 26px)`,
              transition: 'transform 0.04s linear',
            }}
          >
            <Image
              src="/eyelid-overlay.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 320px, (max-width: 1200px) 460px, 520px"
              className="object-cover object-center pointer-events-none"
            />
          </div>

          {/* Layer 5: Dynamic 3D Glasses Lens Sheen Glint at Z: 32px */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ transform: 'translateZ(32px)' }}
          >
            <div
              className="absolute w-24 h-16 rounded-full blur-md transition-all duration-75"
              style={{
                top: `${glintPos.y}%`,
                left: `${glintPos.x - 10}%`,
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.35) 0%, rgba(254,128,64,0.15) 50%, transparent 80%)',
                opacity: glintPos.opacity,
                transform: `rotate(${faceTransform.rotY * 1.5 - 20}deg)`,
              }}
            />
            <div
              className="absolute w-20 h-14 rounded-full blur-md transition-all duration-75"
              style={{
                top: `${glintPos.y}%`,
                left: `${glintPos.x + 16}%`,
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, rgba(254,128,64,0.12) 50%, transparent 80%)',
                opacity: glintPos.opacity,
                transform: `rotate(${faceTransform.rotY * 1.5 - 20}deg)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
