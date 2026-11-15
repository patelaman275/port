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

  // Pupil offset (px) for dynamic eye gaze tracking
  const [pupilOffset, setPupilOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  // Head / face 3D rotation and translation
  const [faceTransform, setFaceTransform] = useState({ rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Smooth lerp targets for 60fps animation
  const targetPupil = useRef({ x: 0, y: 0 });
  const currentPupil = useRef({ x: 0, y: 0 });
  const targetFace = useRef({ rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 });
  const currentFace = useRef({ rotX: 0, rotY: 0, rotZ: 0, x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  // Natural Blinking Loop (every 3.0 to 5.5 seconds with occasional double blink)
  useEffect(() => {
    let blinkTimeout: ReturnType<typeof setTimeout>;

    const scheduleBlink = () => {
      const nextInterval = 3000 + Math.random() * 2500;
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
        }, 125);
      }, nextInterval);
    };

    scheduleBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Smooth 60fps lerp animation loop for both pupil tracking and head 3D rotation
  const animate = useCallback(() => {
    const factor = 0.12;

    // Smooth pupils gaze tracking lerp
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

      // Eye center in viewport coordinates
      const eyeCenterX = rect.left + rect.width * 0.51;
      const eyeCenterY = rect.top + rect.height * 0.36;

      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;

      // Normalized coordinates (-1 to +1) based on screen dimensions
      const screenHalfW = Math.max(window.innerWidth * 0.5, 400);
      const screenHalfH = Math.max(window.innerHeight * 0.5, 300);

      const nx = Math.max(-1, Math.min(1, deltaX / screenHalfW));
      const ny = Math.max(-1, Math.min(1, deltaY / screenHalfH));

      // Ease curve: responsive, natural tracking
      const dist = Math.hypot(nx, ny);
      const ease = dist > 0 ? Math.pow(Math.min(dist, 1), 0.85) : 0;
      const angle = Math.atan2(ny, nx);

      const easedX = Math.cos(angle) * ease;
      const easedY = Math.sin(angle) * ease;

      // ── 1. ACTIVE PUPIL MOVEMENT (Gaze follows mouse pointer) ──
      // Pupils shift smoothly within the eye sockets: ±5.5px horizontally, ±3.5px vertically
      targetPupil.current = {
        x: easedX * 5.5,
        y: easedY * 3.5,
      };

      // ── 2. HEAD 3D ROTATION (Head turns naturally with gaze) ──
      targetFace.current = {
        rotX: -easedY * 12,
        rotY: easedX * 16,
        rotZ: easedX * 2.2,
        x: easedX * 12,
        y: easedY * 8,
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
          background: 'radial-gradient(ellipse at 50% 50%, rgba(254,128,64,0.20) 0%, rgba(100,50,20,0.06) 55%, transparent 75%)',
          filter: 'blur(20px)',
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          1. STATIC OUTER CARD FRAME (Does NOT tilt or move)
          Anchored firmly with clean charcoal border and glass blur shadow
          ══════════════════════════════════════════════════════════ */}
      <div
        className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#303030] bg-[#090204]/90 backdrop-blur-xl"
        style={{
          boxShadow: '0 16px 40px -8px rgba(0,0,0,0.85), 0 0 45px rgba(254,128,64,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
          perspective: '1200px',
        }}
      >
        {/* ══════════════════════════════════════════════════════════
            2. 3D MOVING CHARACTER RIG (Head turns, pupils track cursor)
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
          {/* Layer 1: Base Character Portrait (Face, hair, body, white eye sockets) */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/character-base.png"
              alt="Aman Patel Character"
              fill
              priority
              sizes="(max-width: 768px) 320px, (max-width: 1200px) 460px, 520px"
              className="object-cover object-center pointer-events-none"
            />
          </div>

          {/* Layer 2: ACTIVE PUPIL MOVEMENT (Pupils shift with cursor within eye sockets!) */}
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

          {/* Layer 3: Glasses Frames & Eyelash Overlay (Locked at 0 offset so glasses never double!)
              Placed in FRONT of pupils so pupils realistically move behind glasses and eyelashes */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/eyelid-overlay.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 320px, (max-width: 1200px) 460px, 520px"
              className="object-cover object-center pointer-events-none"
            />
          </div>

          {/* Layer 4: Natural Anime Eyelid Blink (Smooth 125ms blink) */}
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
        </div>
      </div>
    </div>
  );
}
