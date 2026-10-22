'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface Wave {
  phase: number;
  frequency: number;
  amplitude: number;
  speed: number;
  color: string;
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

    // Mouse coordinates with smooth lag
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Particle pool: Tricolor + Lavender highlights
    // #cbb3e8 (lavender), #D4ff3f (chartreuse), #e34234 (tomato red), #000000 (black nodes)
    const PARTICLE_COUNT = Math.min(65, Math.max(35, Math.floor((width * height) / 20000)));
    let particles: Particle[] = [];

    const COLORS = [
      '#ffffff', // crisp white spark
      '#D4ff3f', // chartreuse
      '#e34234', // tomato red
      '#000000', // black anchor
      '#7437af', // deep royal purple
    ];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.1,
          vy: (Math.random() - 0.5) * 1.1,
          size: Math.random() * 3 + 1.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          baseAlpha: Math.random() * 0.4 + 0.5,
          alpha: 0.7,
          pulseSpeed: Math.random() * 0.04 + 0.02,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    // 3 Fluid Lavender Waves for continuous smooth, undulating motion
    const waves: Wave[] = [
      { phase: 0, frequency: 0.0016, amplitude: 75, speed: 0.016, color: 'rgba(182, 142, 224, 0.55)' },
      { phase: 2, frequency: 0.0022, amplitude: 95, speed: 0.012, color: 'rgba(164, 120, 212, 0.42)' },
      { phase: 4, frequency: 0.0012, amplitude: 120, speed: 0.008, color: 'rgba(215, 196, 243, 0.65)' },
    ];

    let frame = 0;

    const render = () => {
      frame++;

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 1. Base vibrant Lavender background
      ctx.fillStyle = '#cbb3e8';
      ctx.fillRect(0, 0, width, height);

      // 2. Animated Radiant Lavender Aura Gradients
      const t = frame * 0.01;
      const auraX1 = width * 0.3 + Math.sin(t * 0.7) * 120;
      const auraY1 = height * 0.35 + Math.cos(t * 0.9) * 90;
      const g1 = ctx.createRadialGradient(auraX1, auraY1, 10, auraX1, auraY1, width * 0.55);
      g1.addColorStop(0, 'rgba(235, 219, 255, 0.75)');
      g1.addColorStop(0.5, 'rgba(203, 179, 232, 0.35)');
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Subtle Chartreuse & Tomato living ambient glow
      const auraX2 = width * 0.75 + Math.cos(t * 0.6) * 100;
      const auraY2 = height * 0.65 + Math.sin(t * 0.8) * 80;
      const g2 = ctx.createRadialGradient(auraX2, auraY2, 10, auraX2, auraY2, 380);
      g2.addColorStop(0, 'rgba(212, 255, 63, 0.22)');
      g2.addColorStop(0.6, 'rgba(227, 66, 52, 0.1)');
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // 3. Fluid Undulating Lavender Waves
      waves.forEach((w, idx) => {
        w.phase += w.speed;
        ctx.beginPath();
        const baseHeight = height * (0.45 + idx * 0.18);
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseHeight);

        for (let x = 0; x <= width; x += 12) {
          // Add sine wave + subtle mouse distortion
          const distToMouse = Math.abs(x - mouse.x);
          const mouseEffect =
            mouse.active && distToMouse < 250
              ? Math.sin((distToMouse / 250) * Math.PI) * 25
              : 0;

          const y =
            baseHeight +
            Math.sin(x * w.frequency + w.phase) * w.amplitude +
            Math.cos(x * w.frequency * 0.5 + w.phase * 0.8) * (w.amplitude * 0.4) -
            mouseEffect;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = w.color;
        ctx.fill();
      });

      // 4. Subtle Interactive Mouse Spotlight
      if (mouse.active) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius
        );
        mouseGlow.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        mouseGlow.addColorStop(0.4, 'rgba(212, 255, 63, 0.15)');
        mouseGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(
          mouse.x - mouse.radius,
          mouse.y - mouse.radius,
          mouse.radius * 2,
          mouse.radius * 2
        );
      }

      // 5. Delicate Constellation Connection Lines between close particles
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.18;
            ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 6. Draw & Update Living Floating Particles
      particles.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse gentle repulsion
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140 && mdist > 0) {
            const force = (1 - mdist / 140) * 1.8;
            p.x += (mdx / mdist) * force;
            p.y += (mdy / mdist) * force;
          }
        }

        // Pulse alpha
        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.2;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow ring for colored particles
        if (p.color !== '#000000') {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = p.alpha * 0.4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
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
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* ── Active Canvas Live Lavender Background ── */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />

      {/* ── Subtle Architectural Grid Overlay (Crisp Tech Aesthetic) ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000000 1px, transparent 1px),
            linear-gradient(to bottom, #000000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
