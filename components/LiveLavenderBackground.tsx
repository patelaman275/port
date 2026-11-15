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

    const particles: Particle[] = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.25 + 0.1,
    }));

    let frame = 0;

    const render = () => {
      frame++;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Obsidian Orange canvas - permanent dark #0F0F0F
      ctx.fillStyle = '#0F0F0F';
      ctx.fillRect(0, 0, width, height);

      // Subtle ambient warm glow centered around mouse / hero area
      const t = frame * 0.0015;
      const x1 = width * 0.65 + Math.sin(t) * 60;
      const y1 = height * 0.35 + Math.cos(t * 0.8) * 40;
      const g1 = ctx.createRadialGradient(x1, y1, 20, x1, y1, width * 0.45);
      g1.addColorStop(0, 'rgba(254, 128, 64, 0.035)'); // Very soft orange ambient
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Subtle micro dust in charcoal and soft orange
      particles.forEach((p, idx) => {
        p.x += p.vx * 0.6;
        p.y += p.vy * 0.6;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = idx % 3 === 0
          ? `rgba(254, 128, 64, ${p.alpha * 0.25})`
          : `rgba(153, 153, 153, ${p.alpha * 0.15})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

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
      style={{ width: '100vw', height: '100vh', backgroundColor: '#0F0F0F' }}
      aria-hidden="true"
    />
  );
}
