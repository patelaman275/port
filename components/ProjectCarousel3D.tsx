'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Sparkles, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: number;
  title: string;
  subtitle: string;
  stack: string[];
  description: string;
  demoUrl: string;
  githubUrl: string;
  accent: string;
  badge: string;
  icon: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'AI Chicken Disease Detection',
    subtitle: 'Published Research & Production System',
    stack: ['Python', 'TensorFlow', 'VGG16', 'MobileNetV2', 'OpenCV', 'Flask', 'Next.js', 'Firebase'],
    description:
      'Dual-pipeline CNN on 5,000+ images detecting Coccidiosis in poultry. VGG16 + MobileNetV2 ensemble achieved 98.2% accuracy, published at ICCCNet 2026 (ADROID Conference Series, SRM IST). Integrated Gemini RAG for disease Q&A and Sarvam AI for multilingual voice diagnosis across 5+ languages. Sub-2s inference, 99.9% uptime.',
    demoUrl: 'https://chick-tech-ai-diagnosis.vercel.app/',
    githubUrl: 'https://github.com/patelaman275',
    accent: '#cc1100',
    badge: 'Published at ICCCNet 2026 · 98.2% Accuracy',
    icon: '🧬',
  },
  {
    id: 2,
    title: 'AI Career Path Generator',
    subtitle: 'SaaS Platform & ATS Resume Analyzer',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API'],
    description:
      'SaaS platform generating personalized career roadmaps via GPT-4, cutting manual research time by 70%+. LLM-powered resume analyzer extracting 15+ skill signals with ATS optimization. AI Mentor chatbot for mock interviews with 50+ curated question flows.',
    demoUrl: 'https://ascend-career.vercel.app/',
    githubUrl: 'https://github.com/patelaman275',
    accent: '#ff6b00',
    badge: 'Cut Research Time by 70%+',
    icon: '🚀',
  },
  {
    id: 3,
    title: 'EasyTrip — Multi-Rider Safety',
    subtitle: 'Real-Time GPS & Emergency Platform',
    stack: ['React.js', 'Node.js', 'Express.js', 'Socket.io', 'Leaflet'],
    description:
      'Real-time group ride platform with 6-character invite codes, live GPS tracking, synchronized route polylines, and SOS alert system broadcasting distress overlays to all riders in under 500ms via Socket.io.',
    demoUrl: 'https://easytrip-swart.vercel.app/',
    githubUrl: 'https://github.com/patelaman275',
    accent: '#dd3300',
    badge: '<500ms SOS Broadcast Speed',
    icon: '🗺️',
  },
  {
    id: 4,
    title: 'CampusConnect — College Network',
    subtitle: 'Real-Time Communication & AI Portal',
    stack: ['MERN Stack', 'Socket.io', 'WebRTC', 'JWT', 'MongoDB Atlas'],
    description:
      'College-exclusive networking platform with real-time chat, WebRTC video calls, LinkedIn-style profiles. JWT auth, bcrypt hashing, OTP email verification. Gemini API integration for AI resume analysis and ATS scoring.',
    demoUrl: 'https://campusconnect-mu-six.vercel.app/',
    githubUrl: 'https://github.com/patelaman275',
    accent: '#bb1500',
    badge: 'WebRTC Video & Real-time Chat',
    icon: '🎓',
  },
];

export default function ProjectCarousel3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse 3D Tilt for active card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP 3D Ring Rotation on Scroll
  useEffect(() => {
    if (isMobile || !containerRef.current || !ringRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=180%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1
          const targetRotationY = -progress * 270;

          gsap.to(ringRef.current, {
            rotationY: targetRotationY,
            ease: 'power2.out',
            duration: 0.3,
            overwrite: 'auto',
          });

          const idx = Math.min(Math.round(progress * 3), 3);
          setActiveIndex(idx);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="projects" className="relative bg-[#080608] text-white">
      {/* Eyebrow Header */}
      <div className="pt-16 pb-6 px-6 md:px-12 max-w-6xl mx-auto text-center relative z-30 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#ff4b2b] bg-[#ff4b2b]/10 border border-[#ff4b2b]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Curated 4 of 44+ Projects
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Featured <span className="gradient-text">Engineering Work</span>
          </h2>
          <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto">
            This is a curated 4 out of 44+ production applications & AI systems I&apos;ve shipped.{' '}
            <a
              href="https://github.com/patelaman275"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#ff8a00] hover:text-[#ff4b2b] font-medium underline underline-offset-4 transition-colors relative z-40 pointer-events-auto"
            >
              <span>Explore full repository list on GitHub</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </p>
        </motion.div>
      </div>

      {/* ── 3D Scroll Carousel (Desktop) ─────────────────────────────────── */}
      {!isMobile ? (
        <div
          ref={containerRef}
          className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden z-20 pointer-events-auto"
        >
          {/* Pulsing Central Orange Radial Glow Anchor */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,75,43,0.18)_0%,_rgba(255,138,0,0.06)_45%,_transparent_70%)] pointer-events-none blur-3xl animate-pulse" />

          {/* 3D Scene Viewport */}
          <div
            className="relative w-full max-w-5xl h-[480px] flex items-center justify-center z-30 pointer-events-auto"
            style={{ perspective: '1200px' }}
          >
            {/* 3D Rotating Ring Container */}
            <div
              ref={ringRef}
              className="relative w-[420px] h-[440px] pointer-events-auto"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {PROJECTS.map((project, idx) => {
                const angle = idx * 90;
                const isActive = activeIndex === idx;
                const radius = 420;

                return (
                  <div
                    key={project.id}
                    className={`absolute inset-0 p-7 rounded-2xl glass-card border transition-all duration-500 ${
                      isActive
                        ? 'border-[#ff4b2b]/60 shadow-[0_0_50px_rgba(255,75,43,0.3)] opacity-100 filter-none pointer-events-auto z-40'
                        : 'border-white/10 opacity-20 filter blur-[4px] pointer-events-none z-0'
                    }`}
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                      backfaceVisibility: 'visible',
                      transformStyle: 'preserve-3d',
                    }}
                    onMouseMove={isActive ? handleMouseMove : undefined}
                    onMouseLeave={isActive ? handleMouseLeave : undefined}
                  >
                    {/* Active Card Rotating Conic Gradient Border Glow */}
                    {isActive && (
                      <div className="absolute -inset-[1px] rounded-2xl bg-[conic-gradient(from_0deg_at_50%_50%,#ff4b2b,#ff8a00,#cc1100,#ff4b2b)] opacity-40 blur-xs -z-10 animate-[spin_8s_linear_infinite] pointer-events-none" />
                    )}

                    {/* Active Card Content */}
                    <div
                      className="w-full h-full flex flex-col justify-between relative z-50 pointer-events-auto"
                      style={{
                        transform: isActive
                          ? `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
                          : 'none',
                        transition: 'transform 0.15s ease-out',
                      }}
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{project.icon}</span>
                            <div>
                              <h3 className="font-bold text-lg leading-tight text-white">
                                {project.title}
                              </h3>
                              <p className="text-xs text-[#ff8a00] font-medium mt-0.5">
                                {project.subtitle}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Badge */}
                        <div className="mb-3">
                          <span className="inline-block text-[11px] px-2.5 py-0.5 rounded-full bg-[#ff4b2b]/15 text-[#ff8a00] border border-[#ff4b2b]/30">
                            {project.badge}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs leading-relaxed text-white/70 mb-4 line-clamp-4">
                          {project.description}
                        </p>

                        {/* Stack Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-white/60 border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-3 pt-3 border-t border-white/10 mt-auto relative z-50 pointer-events-auto">
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#cc1100] to-[#ff4b2b] hover:from-[#ff4b2b] hover:to-[#ff8a00] transition-all duration-300 shadow-[0_4px_15px_rgba(204,17,0,0.3)] relative z-50 cursor-pointer pointer-events-auto"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center justify-center p-2.5 rounded-xl text-white/70 bg-white/5 border border-white/10 hover:text-white hover:border-[#ff4b2b]/50 transition-all duration-300 relative z-50 cursor-pointer pointer-events-auto"
                          title="View GitHub Repository"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 Indicator Glowing Dots */}
          <div className="flex items-center gap-3 mt-6 z-30 pointer-events-auto">
            {PROJECTS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === idx
                    ? 'w-7 h-2 bg-[#ff4b2b] shadow-[0_0_12px_#ff4b2b]'
                    : 'w-2 h-2 bg-white/20'
                }`}
                title={`Go to ${p.title}`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* ── Mobile Horizontal Swipeable Carousel ──────────────────────────── */
        <div className="px-6 py-8 max-w-lg mx-auto flex flex-col items-center relative z-30 pointer-events-auto">
          <div className="w-full flex items-center justify-between gap-4 mb-4">
            <button
              onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : 3))}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-[#ff8a00] font-mono uppercase tracking-widest">
              PROJECT {activeIndex + 1} OF 4
            </span>
            <button
              onClick={() => setActiveIndex((prev) => (prev < 3 ? prev + 1 : 0))}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Active Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={PROJECTS[activeIndex].id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full p-6 rounded-2xl glass-card border border-[#ff4b2b]/40 relative overflow-hidden pointer-events-auto z-40"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{PROJECTS[activeIndex].icon}</span>
                <div>
                  <h3 className="font-bold text-lg text-white">
                    {PROJECTS[activeIndex].title}
                  </h3>
                  <p className="text-xs text-[#ff8a00] font-medium">
                    {PROJECTS[activeIndex].subtitle}
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <span className="inline-block text-[11px] px-2.5 py-0.5 rounded-full bg-[#ff4b2b]/15 text-[#ff8a00] border border-[#ff4b2b]/30">
                  {PROJECTS[activeIndex].badge}
                </span>
              </div>

              <p className="text-xs text-white/70 leading-relaxed mb-4">
                {PROJECTS[activeIndex].description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {PROJECTS[activeIndex].stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-white/60 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10 relative z-50 pointer-events-auto">
                <a
                  href={PROJECTS[activeIndex].demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#cc1100] to-[#ff4b2b] cursor-pointer pointer-events-auto relative z-50"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
                <a
                  href={PROJECTS[activeIndex].githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2.5 rounded-xl text-white/70 bg-white/5 border border-white/10 cursor-pointer pointer-events-auto relative z-50"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 mt-6">
            {PROJECTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === idx
                    ? 'w-6 h-2 bg-[#ff4b2b]'
                    : 'w-2 h-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
