'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  FileText,
  Bot,
  ArrowUpRight,
  Network,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Activity,
  Layers,
} from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

interface Project {
  id: number;
  slideNum: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  icon: string;
  description: string;
  highlights: string[];
  stack: string[];
  demoUrl: string;
  paperUrl?: string;
  githubUrl: string;
  architectureImg: string;
  architectureDetails: string[];
  appName: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    slideNum: '01',
    appName: 'ChickTech_AI.app',
    title: 'AI-Based Chicken Disease Detection System',
    subtitle: 'Published Research at ICCCNet 2026 · ADROID Conference Series',
    category: 'Computer Vision & Deep Learning',
    badge: '98.2% Accuracy · Dual CNN Pipeline · ADROID Published Paper',
    icon: '🔬',
    description:
      'Engineered an automated poultry disease diagnosis application for early disease prevention in rural poultry farms. Implemented dual-pipeline CNNs leveraging both VGG16 and MobileNetV2 feature extraction to classify poultry disease from images with sub-2s inference.',
    highlights: [
      'Published paper author in ADROID Conference Series (ICCCNet 2026, SRM IST)',
      'Curated & annotated 5,000+ poultry images from Kaggle & GitHub repositories',
      'Integrated Gemini RAG disease Q&A & Sarvam AI voice diagnosis in 5+ regional languages',
    ],
    stack: ['Python', 'TensorFlow', 'VGG16', 'MobileNetV2', 'OpenCV', 'Next.js 14', 'Gemini RAG', 'Sarvam AI', 'Flask API', 'Firebase'],
    demoUrl: 'https://chick-tech-ai-diagnosis.vercel.app/',
    paperUrl: 'https://conferenceseries.adroidjournals.com/index.php/ACSET/article/view/120/90',
    githubUrl: 'https://github.com/KunalBishwal/ChickTech-AI-Diagnosis',
    architectureImg: '/architecture/chicktech-arch.png',
    architectureDetails: [
      'Next.js 14 Client on Vercel with Diagnosis UI, Indic voice input, and OGL WebGL visual layer',
      'Flask API on Render/Docker with Rate Limiter (flask-limiter), Bloom Filter (pybloom_live), and Magic bytes sanitizer',
      'predict.py Dual CNN: Coccidiosis classification (MobileNetV2) & Lesion pipeline (Fowlpox, Bumblefoot)',
      'rag_engine.py: Sentence-Transformers embedder with 47 chunks across 9 diseases + Gemini plan writer',
    ],
  },
  {
    id: 2,
    slideNum: '02',
    appName: 'EasyTrip.app',
    title: 'EasyTrip — Multi-Rider Safety & Travel Companion',
    subtitle: 'Full-Stack Distributed System · Real-Time GPS & SOS Alerts',
    category: 'Full-Stack & Distributed Web Systems',
    badge: 'Sub-500ms Socket.io SOS · 6-Char Invite Sync · Leaflet Live Tracking',
    icon: '🗺️',
    description:
      'Architected a real-time group travel coordination application enabling synchronized routing, live GPS geolocation, and an emergency SOS broadcast mesh for multi-rider journeys.',
    highlights: [
      'Designed WebSocket mesh via Socket.io broadcasting distress overlays in under 500ms',
      'Synchronized route polylines and member locations using Leaflet and OpenStreetMap',
      'Implemented secure 6-character room codes for effortless group onboarding',
    ],
    stack: ['React.js', 'Vite', 'Node.js', 'Express.js', 'Socket.io', 'Leaflet', 'Tailwind CSS'],
    demoUrl: 'https://easytrip-swart.vercel.app/',
    githubUrl: 'https://github.com/patelaman275/easytrip',
    architectureImg: '/architecture/easytrip-arch.png',
    architectureDetails: [
      'React (Vite) Single Page App on Vercel with Leaflet.js real-time polyline & pin renderer',
      'Express & Node.js backend hosted on Render running Socket.io room orchestration',
      'In-memory Room State holding member coordinates, roles, active distress pings, and waypoint lists',
      'Instant broadcast mesh delivering geolocation coordinate deltas to all room peers simultaneously',
    ],
  },
  {
    id: 3,
    slideNum: '03',
    appName: 'CareerPath_AI.app',
    title: 'CareerPath — Generative AI Career Navigation Platform',
    subtitle: 'Production GenAI SaaS · Gemini 1.5 Pro · Personalized Roadmaps',
    category: 'Generative AI & LLM Systems',
    badge: '100+ Roadmaps Generated · Context-Aware Quiz Engine · 9-Skill Assessments',
    icon: '🎯',
    description:
      'Engineered an AI-driven career advisor providing interactive diagnostic quizzes and custom multi-phase roadmaps synthesized via Gemini 1.5 Pro with role-aligned milestones.',
    highlights: [
      'Orchestrated multi-turn structured prompting with Google Gemini 1.5 Pro API',
      'Built 9 comprehensive technical domain assessment tracks with weighted scoring',
      'Rendered milestone progression paths with PDF export and progress checkpoints',
    ],
    stack: ['Next.js 14', 'React.js', 'Gemini 1.5 Pro', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
    demoUrl: 'https://careerpath-delta.vercel.app/',
    githubUrl: 'https://github.com/patelaman275/CareerPath',
    architectureImg: '/architecture/careerpath-arch.png',
    architectureDetails: [
      'Next.js 14 App Router UI with dynamic assessment wizard & animated timeline views',
      'API Route /api/generate-roadmap with prompt engineering & JSON schema enforcement',
      'Gemini 1.5 Pro Model parsing candidate strengths, weaknesses, and target roles',
      'Synthesized structured roadmap with phases, timeline estimates, courses, and resource links',
    ],
  },
  {
    id: 4,
    slideNum: '04',
    appName: 'CampusConnect.app',
    title: 'CampusConnect — University Community Network',
    subtitle: 'Full-Stack Social Platform · Real-Time Chat & Resource Exchange',
    category: 'Full-Stack Web Engineering',
    badge: 'MongoDB Scalable Schema · JWT Auth · Real-Time Campus Feeds',
    icon: '🎓',
    description:
      'Created a comprehensive digital campus network connecting students, clubs, and faculty for academic collaboration, peer messaging, event discovery, and study material sharing.',
    highlights: [
      'Engineered RESTful API with Express.js handling posts, comments, clubs, and notifications',
      'Designed normalized MongoDB schemas with Mongoose indexing for high-speed queries',
      'Built responsive dashboard with feed filters, event registration, and peer messaging',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Tailwind CSS'],
    demoUrl: 'https://campus-connect-ochre.vercel.app/',
    githubUrl: 'https://github.com/patelaman275/CampusConnect',
    architectureImg: '/architecture/campusconnect-arch.png',
    architectureDetails: [
      'React frontend client with token storage, protected routes, and modular view controllers',
      'Express.js server with JWT auth middleware, bcrypt password hashing, and input validation',
      'MongoDB Atlas cluster with collections for Users, Posts, Events, Resources, and Messages',
      'REST endpoints serving paginated feeds, real-time message exchange, and event participation',
    ],
  },
];

export default function ProjectCarousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeArchProject, setActiveArchProject] = useState<Project | null>(null);

  // Interactive Architecture State
  const [archZoom, setArchZoom] = useState(1);
  const [activeStage, setActiveStage] = useState(0);
  const [activeTab, setActiveTab] = useState<'blueprint' | 'flow'>('blueprint');

  const currentProject = PROJECTS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
  };

  // Auto-slide every 4 seconds continuously (only paused if architecture modal is open)
  useEffect(() => {
    if (activeArchProject) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [activeArchProject]);

  // Reset zoom & stage when a new architecture modal opens
  useEffect(() => {
    if (activeArchProject) {
      setArchZoom(1);
      setActiveStage(0);
      setActiveTab('blueprint');
    }
  }, [activeArchProject]);

  return (
    <section
      id="projects"
      className="relative bg-transparent text-[#CCCCCC] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-full overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#191919] border border-[#303030] text-[#FE8040] text-xs font-bold tracking-wider uppercase shadow-sm mb-3 font-mono">
              <span>Selected Projects · 4 Featured Systems</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Engineering &amp; <span className="text-[#FE8040]">AI Systems</span>
            </h2>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-lg border border-[#303030] bg-[#191919] text-[#CCCCCC] hover:text-[#FE8040] hover:border-[#FE8040] hover:bg-[#222222] transition-all cursor-pointer shadow-sm"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-lg border border-[#303030] bg-[#191919] text-[#CCCCCC] hover:text-[#FE8040] hover:border-[#FE8040] hover:bg-[#222222] transition-all cursor-pointer shadow-sm"
              aria-label="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Slide Progress Bar / Indicator Dots ── */}
        <div className="flex items-center gap-2 mb-6">
          {PROJECTS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? 'w-10 bg-[#FE8040]'
                  : 'w-2.5 bg-[#303030] hover:bg-[#999999]'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* ── Sliding Project Card ── */}
        <div className="relative overflow-hidden rounded-2xl border border-[#303030] shadow-2xl bg-[#191919]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {/* Card Window Titlebar */}
              <div className="px-5 py-3.5 border-b border-[#303030] bg-[#121212] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#f85149] inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#d29922] inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#2ea043] inline-block shadow-sm" />
                  <span className="text-xs font-mono font-medium ml-2 tracking-tight text-[#999999]">
                    {currentProject.appName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#222222] text-[#999999] border border-[#303030]">
                    SLIDE {currentProject.slideNum} / 04
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold border border-[#FE8040]/30 bg-[#FE8040]/10 text-[#FE8040] hidden sm:inline-block">
                    {currentProject.category}
                  </span>
                </div>
              </div>

              {/* Project Card Content */}
              <div className="p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-between bg-[#191919]">
                {/* Left Column: Details */}
                <div className="flex-1 space-y-4">
                  {/* Category & Badge */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-lg border border-[#303030] bg-[#121212] text-[#CCCCCC]">
                      {currentProject.icon} {currentProject.category}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-lg border border-[#FE8040]/30 bg-[#FE8040]/10 text-[#FE8040]">
                      {currentProject.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#F5F5F5] leading-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {currentProject.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold mt-1 tracking-tight text-[#FE8040]">
                      {currentProject.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm leading-relaxed font-normal text-[#CCCCCC]">
                    {currentProject.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 pt-1">
                    {currentProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-[#CCCCCC]">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#FE8040]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider block mb-2 text-[#777777]">
                      Core Technologies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentProject.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-mono font-medium border border-[#303030] bg-[#121212] text-[#FE8040] hover:border-[#FE8040] transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Action Buttons & Architecture */}
                <div className="w-full md:w-64 flex flex-col gap-2.5 shrink-0 pt-2 md:pt-0">
                  {/* View Interactive Architecture Button */}
                  <button
                    onClick={() => setActiveArchProject(currentProject)}
                    className="w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-bold bg-[#FE8040] hover:bg-[#FF995F] text-[#0F0F0F] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer group"
                  >
                    <Network className="w-4 h-4 text-[#0F0F0F] group-hover:rotate-12 transition-transform" />
                    <span>View Interactive Architecture</span>
                  </button>

                  {/* Launch Live Demo */}
                  <a
                    href={currentProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-[#121212] hover:bg-[#222222] text-[#F5F5F5] hover:text-[#FE8040] border border-[#303030] hover:border-[#FE8040] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {/* Research Paper (if available) */}
                  {currentProject.paperUrl && (
                    <a
                      href={currentProject.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-[#121212] hover:bg-[#222222] text-[#FE8040] border border-[#FE8040]/40 hover:border-[#FE8040] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#FE8040]" />
                      <span>ICCCNet Research Paper</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {/* View on GitHub */}
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-[#121212] hover:bg-[#222222] text-[#CCCCCC] hover:text-[#F5F5F5] border border-[#303030] hover:border-[#FE8040] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View on GitHub</span>
                  </a>

                  {/* Ask AI Assistant */}
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.dispatchEvent(new CustomEvent('open-aman-chat'));
                      }
                    }}
                    className="w-full py-2 px-3 rounded-lg text-[11px] font-medium text-[#777777] hover:text-[#FE8040] hover:bg-[#121212] transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                  >
                    <Bot className="w-3.5 h-3.5 text-[#FE8040]" />
                    <span>Ask AI about this project</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          INTERACTIVE ARCHITECTURE STUDIO MODAL
          Features: Zoom (+/-), Pan, Node Telemetry, and Live Data Flow
          ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeArchProject && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveArchProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl max-h-[92vh] rounded-2xl border border-[#303030] shadow-2xl flex flex-col overflow-hidden bg-[#0F0F0F] text-[#CCCCCC]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Titlebar */}
              <div className="px-5 py-4 border-b border-[#303030] bg-[#121212] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FE8040] text-[#0F0F0F] flex items-center justify-center font-bold shadow-sm">
                    <Network className="w-4 h-4" />
                  </div>
                  <div>
                    <h3
                      className="text-sm font-bold tracking-tight text-[#F5F5F5]"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      System Architecture · {activeArchProject.title}
                    </h3>
                    <p className="text-[11px] text-[#777777] font-mono">
                      {activeArchProject.appName} &middot; Interactive System Blueprint
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Tab Selector */}
                  <div className="hidden sm:flex items-center bg-[#191919] p-1 rounded-lg border border-[#303030]">
                    <button
                      onClick={() => setActiveTab('blueprint')}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                        activeTab === 'blueprint'
                          ? 'bg-[#FE8040] text-[#0F0F0F]'
                          : 'text-[#999999] hover:text-[#F5F5F5]'
                      }`}
                    >
                      Blueprint Studio
                    </button>
                    <button
                      onClick={() => setActiveTab('flow')}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        activeTab === 'flow'
                          ? 'bg-[#FE8040] text-[#0F0F0F]'
                          : 'text-[#999999] hover:text-[#F5F5F5]'
                      }`}
                    >
                      <Activity className="w-3 h-3" />
                      <span>Live Flow</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveArchProject(null)}
                    className="w-8 h-8 rounded-full bg-[#191919] hover:bg-[#222222] text-[#999999] hover:text-[#FE8040] border border-[#303030] transition-colors flex items-center justify-center cursor-pointer ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
                {activeTab === 'blueprint' ? (
                  <>
                    {/* Interactive Zoomable Architecture Viewer */}
                    <div className="relative rounded-xl border border-[#303030] bg-[#121212] overflow-hidden group">
                      {/* Interactive Controls Bar */}
                      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-[#191919]/90 backdrop-blur-md p-1.5 rounded-lg border border-[#303030] shadow-lg">
                        <button
                          onClick={() => setArchZoom((z) => Math.min(z + 0.3, 2.5))}
                          className="p-1.5 rounded hover:bg-[#222222] text-[#999999] hover:text-[#FE8040] transition-colors"
                          title="Zoom In"
                        >
                          <ZoomIn className="w-4 h-4" />
                        </button>
                        <span className="text-[11px] font-mono px-1.5 text-[#FE8040] font-semibold min-w-[3rem] text-center">
                          {Math.round(archZoom * 100)}%
                        </span>
                        <button
                          onClick={() => setArchZoom((z) => Math.max(z - 0.3, 1))}
                          className="p-1.5 rounded hover:bg-[#222222] text-[#999999] hover:text-[#FE8040] transition-colors"
                          title="Zoom Out"
                        >
                          <ZoomOut className="w-4 h-4" />
                        </button>
                        <div className="w-px h-3.5 bg-[#303030] mx-0.5" />
                        <button
                          onClick={() => setArchZoom(1)}
                          className="p-1.5 rounded hover:bg-[#222222] text-[#999999] hover:text-[#FE8040] transition-colors"
                          title="Reset View (100%)"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Zoomable Image Container */}
                      <div
                        className="p-4 sm:p-6 flex items-center justify-center min-h-[340px] sm:min-h-[420px] overflow-auto cursor-grab active:cursor-grabbing"
                        style={{
                          scrollbarWidth: 'thin',
                          scrollbarColor: '#303030 transparent',
                        }}
                      >
                        <motion.div
                          animate={{ scale: archZoom }}
                          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                          className="relative max-w-full origin-center"
                        >
                          <Image
                            src={activeArchProject.architectureImg}
                            alt={`${activeArchProject.title} Architecture Diagram`}
                            width={960}
                            height={540}
                            className="w-full h-auto object-contain rounded-lg shadow-md pointer-events-none"
                            priority
                          />
                        </motion.div>
                      </div>

                      {/* Bottom Hint */}
                      <div className="px-4 py-2 border-t border-[#303030] bg-[#161616] flex items-center justify-between text-[11px] text-[#777777] font-mono">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FE8040]" />
                          Interactive View: Use controls above to inspect subsystem wiring
                        </span>
                        <span className="hidden sm:inline">960 x 540 High-Res Blueprint</span>
                      </div>
                    </div>

                    {/* Interactive Pipeline Telemetry Breakdown */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider font-bold mb-3 text-[#FE8040] flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Interactive Subsystem Inspector (Click to inspect):</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeArchProject.architectureDetails.map((spec, i) => {
                          const isSelected = activeStage === i;
                          const stageLabels = [
                            'Layer 1: Client & Presentation Engine',
                            'Layer 2: Ingress, Security & Routing Gateway',
                            'Layer 3: Core Processing & Inference Cluster',
                            'Layer 4: Data Pipeline & State Persistence',
                          ];

                          return (
                            <motion.div
                              key={i}
                              onClick={() => setActiveStage(i)}
                              whileHover={{ scale: 1.01 }}
                              className={`p-4 rounded-xl border text-xs leading-relaxed flex flex-col gap-1.5 cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-[#191919] border-[#FE8040] shadow-[0_0_20px_rgba(254,128,64,0.15)] text-[#F5F5F5]'
                                  : 'bg-[#121212] border-[#303030] text-[#999999] hover:border-[#FE8040]/50 hover:text-[#CCCCCC]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] font-bold text-[#FE8040] tracking-wider uppercase">
                                  {stageLabels[i]}
                                </span>
                                {isSelected && (
                                  <span className="w-2 h-2 rounded-full bg-[#FE8040] animate-pulse" />
                                )}
                              </div>
                              <span className="leading-relaxed">{spec}</span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  /* Live Flow Pipeline Mode */
                  <div className="space-y-6">
                    <div className="rounded-xl border border-[#303030] bg-[#121212] p-6 sm:p-8">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h4 className="text-sm font-bold text-[#F5F5F5]">
                            Simulated Pipeline Execution Flow
                          </h4>
                          <p className="text-xs text-[#777777]">
                            Real-time data packets traveling through the {activeArchProject.appName} distributed stack
                          </p>
                        </div>
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#FE8040]/15 text-[#FE8040] border border-[#FE8040]/30 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FE8040] animate-ping" />
                          <span>ACTIVE MESH</span>
                        </span>
                      </div>

                      {/* 4 Pipeline Nodes with Animated Data Stream */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                        {[
                          { title: 'Client Device', desc: 'Vercel CDN Edge / Browser', icon: '💻' },
                          { title: 'Ingress Gateway', desc: 'Rate Limiter & Sanitizer', icon: '🛡️' },
                          { title: 'Inference Engine', desc: 'Dual CNN / Gemini 1.5 / Sockets', icon: '⚡' },
                          { title: 'Data Warehouse', desc: 'MongoDB / Pinecone / State', icon: '💾' },
                        ].map((node, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl border border-[#303030] bg-[#191919] relative flex flex-col items-center text-center group hover:border-[#FE8040] transition-colors"
                          >
                            <span className="text-2xl mb-2">{node.icon}</span>
                            <span className="text-xs font-bold text-[#F5F5F5]">{node.title}</span>
                            <span className="text-[11px] text-[#777777] mt-1">{node.desc}</span>

                            {/* Arrow on desktop */}
                            {idx < 3 && (
                              <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#121212] border border-[#303030] items-center justify-center text-[10px] text-[#FE8040]">
                                →
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Flow Telemetry Metrics */}
                      <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-[#303030]">
                        <div className="text-center">
                          <span className="text-[10px] font-mono uppercase text-[#777777] block">Inference Speed</span>
                          <span className="text-sm font-bold font-mono text-[#FE8040]">&lt; 1.8s</span>
                        </div>
                        <div className="text-center">
                          <span className="text-[10px] font-mono uppercase text-[#777777] block">Network Latency</span>
                          <span className="text-sm font-bold font-mono text-[#FE8040]">&lt; 120ms</span>
                        </div>
                        <div className="text-center">
                          <span className="text-[10px] font-mono uppercase text-[#777777] block">Telemetry Protocol</span>
                          <span className="text-sm font-bold font-mono text-[#FE8040]">HTTPS / WSS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* External Links */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={activeArchProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg text-xs font-bold bg-[#FE8040] hover:bg-[#FF995F] text-[#0F0F0F] transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Open Live Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={activeArchProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#191919] hover:bg-[#222222] text-[#F5F5F5] hover:text-[#FE8040] border border-[#303030] hover:border-[#FE8040] transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
