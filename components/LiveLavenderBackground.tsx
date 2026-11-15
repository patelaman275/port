'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export default function LiveLavenderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Minimalist particle count: clean and non-distracting
    const particleCount = Math.min(55, Math.floor((width * height) / 22000));
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.5 + 0.8,
      baseAlpha: Math.random() * 0.35 + 0.15,
      alpha: Math.random() * 0.35 + 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    let frame = 0;

    const render = () => {
      frame++;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // ── 1. Pure Deep Black Canvas ────────────────────────
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // ── 2. Minimalist subtle mouse luminescence ──────────
      if (mouse.active) {
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 350);
        glow.addColorStop(0, 'rgba(254, 128, 64, 0.045)');
        glow.addColorStop(0.5, 'rgba(254, 128, 64, 0.012)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      // ── 3. Update & Draw Particles ───────────────────────
      const connectDist = 110;
      const mouseConnectDist = 140;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries smoothly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Gentle breathing pulse
        p.alpha = p.baseAlpha + Math.sin(frame * p.pulseSpeed + p.pulsePhase) * 0.1;

        // Draw particle dot (soft white or faint orange)
        const isOrange = i % 4 === 0;
        ctx.fillStyle = isOrange
          ? `rgba(254, 128, 64, ${p.alpha * 0.75})`
          : `rgba(200, 200, 200, ${p.alpha * 0.6})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // ── Connect nearby particles with delicate faint lines ──
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectDist) {
            const lineAlpha = (1 - dist / connectDist) * 0.07;
            ctx.strokeStyle = isOrange
              ? `rgba(254, 128, 64, ${lineAlpha})`
              : `rgba(180, 180, 180, ${lineAlpha * 0.8})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // ── Connect to mouse cursor when close ─────────────
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.hypot(mdx, mdy);

          if (mdist < mouseConnectDist) {
            const mAlpha = (1 - mdist / mouseConnectDist) * 0.18;
            ctx.strokeStyle = `rgba(254, 128, 64, ${mAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Very subtle gentle repulsion
            p.x += (mdx / mdist) * 0.3;
            p.y += (mdy / mdist) * 0.3;
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh', backgroundColor: '#000000' }}
      aria-hidden="true"
    />
  );
}
