'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
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
      radius: 200,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.3 + 0.15,
    }));

    let frame = 0;

    const render = () => {
      frame++;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const isGithubDark = document.querySelector('.github-dark') !== null;

      if (isGithubDark) {
        // Deep Obsidian Noir Canvas
        ctx.fillStyle = '#0a0406';
        ctx.fillRect(0, 0, width, height);

        // Rich Ruby Crimson Ambient Mesh Glow (Blends with Anime Character)
        const t = frame * 0.003;
        const x1 = width * 0.35 + Math.sin(t) * 120;
        const y1 = height * 0.35 + Math.cos(t * 0.9) * 80;
        const g1 = ctx.createRadialGradient(x1, y1, 10, x1, y1, width * 0.55);
        g1.addColorStop(0, 'rgba(225, 29, 72, 0.09)');
        g1.addColorStop(0.5, 'rgba(136, 19, 55, 0.04)');
        g1.addColorStop(1, 'transparent');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, width, height);

        // Subtle Deep Wine Red secondary shimmer
        const x2 = width * 0.75 + Math.cos(t * 0.7) * 100;
        const y2 = height * 0.65 + Math.sin(t * 1.1) * 90;
        const g2 = ctx.createRadialGradient(x2, y2, 10, x2, y2, width * 0.5);
        g2.addColorStop(0, 'rgba(159, 18, 57, 0.07)');
        g2.addColorStop(0.5, 'rgba(10, 4, 6, 0.3)');
        g2.addColorStop(1, 'transparent');
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, width, height);

        // Mouse Interactive Ambient Crimson Glow
        const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius * 1.4);
        mouseGlow.addColorStop(0, 'rgba(225, 29, 72, 0.07)');
        mouseGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);

        // Update & draw particles in Ruby Ember dust
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.fillStyle = `rgba(244, 63, 94, ${p.alpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      } else {
        // Base Ice Silver
        ctx.fillStyle = '#dde3e8';
        ctx.fillRect(0, 0, width, height);

        // Silvery ambient glow
        const t = frame * 0.003;
        const x1 = width * 0.3 + Math.sin(t) * 120;
        const y1 = height * 0.3 + Math.cos(t * 0.9) * 80;
        const g1 = ctx.createRadialGradient(x1, y1, 10, x1, y1, width * 0.5);
        g1.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
        g1.addColorStop(0.4, 'rgba(235, 240, 244, 0.45)');
        g1.addColorStop(1, 'transparent');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, width, height);

        // Subtle marigold shimmer
        const x2 = width * 0.75 + Math.cos(t * 0.7) * 100;
        const y2 = height * 0.65 + Math.sin(t * 1.1) * 90;
        const g2 = ctx.createRadialGradient(x2, y2, 10, x2, y2, width * 0.45);
        g2.addColorStop(0, 'rgba(234, 170, 0, 0.08)');
        g2.addColorStop(0.5, 'rgba(221, 227, 232, 0.25)');
        g2.addColorStop(1, 'transparent');
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, width, height);

        // Cursor gentle interaction glow
        const cg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        cg.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        cg.addColorStop(0.5, 'rgba(234, 170, 0, 0.05)');
        cg.addColorStop(1, 'transparent');
        ctx.fillStyle = cg;
        ctx.fillRect(0, 0, width, height);

        // Update & draw particles
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.fillStyle = `rgba(58, 15, 52, ${p.alpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh', backgroundColor: '#dde3e8' }}
      aria-hidden="true"
    />
  );
}
