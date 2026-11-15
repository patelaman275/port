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

      const isDark = document.documentElement.classList.contains('dark') || 
                     document.documentElement.classList.contains('github-dark') || 
                     document.querySelector('.github-dark') !== null;

      if (isDark) {
        // Crisp GitHub Dark Canvas
        ctx.fillStyle = '#0d1117';
        ctx.fillRect(0, 0, width, height);

        // Subtle ambient mesh
        const t = frame * 0.002;
        const x1 = width * 0.35 + Math.sin(t) * 100;
        const y1 = height * 0.35 + Math.cos(t * 0.8) * 60;
        const g1 = ctx.createRadialGradient(x1, y1, 10, x1, y1, width * 0.5);
        g1.addColorStop(0, 'rgba(88, 166, 255, 0.04)');
        g1.addColorStop(1, 'transparent');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, width, height);

        // Subtle particle dust
        particles.forEach((p) => {
          p.x += p.vx * 0.7;
          p.y += p.vy * 0.7;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.fillStyle = `rgba(139, 148, 158, ${p.alpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      } else {
        // Crisp Clean GitHub Light Canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        // Soft, clean subtle tint (no blinding white spots that hide text!)
        const t = frame * 0.002;
        const x1 = width * 0.35 + Math.sin(t) * 100;
        const y1 = height * 0.35 + Math.cos(t * 0.8) * 60;
        const g1 = ctx.createRadialGradient(x1, y1, 10, x1, y1, width * 0.5);
        g1.addColorStop(0, 'rgba(9, 105, 218, 0.03)');
        g1.addColorStop(1, 'transparent');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, width, height);

        // Particles in subtle light slate
        particles.forEach((p) => {
          p.x += p.vx * 0.7;
          p.y += p.vy * 0.7;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.fillStyle = `rgba(101, 109, 118, ${p.alpha * 0.2})`;
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
