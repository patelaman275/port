'use client';

import React, { useState } from 'react';
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
  Moon,
  Sun,
  Code2,
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
      'Rider Client (React + Vite): createRide/joinRide, live location transmission, checkpoints, route changes, SOS button, Leaflet map',
      'Node + Express Server with Socket.io: Room manager (invite codes), Location relay, Checkpoint synchronization, Route sync',
      'Real-Time SOS Broadcast: Sub-500ms distress alert dispatch broadcasting to all active riders in the group',
      'In-Memory Room Store: Ultra-fast state management with zero database latency overhead',
    ],
  },
  {
    id: 3,
    slideNum: '03',
    appName: 'CareerPath_AI.app',
    title: 'AI-Powered Career Roadmap & Resume Analyzer',
    subtitle: 'Intelligent Career Acceleration Platform · React SPA & LLM Agents',
    category: 'Generative AI & SaaS Platform',
    badge: '70% Research Time Reduction · 15+ ATS Skill Signals Extracted',
    icon: '🚀',
    description:
      'Built a production AI SaaS platform that dynamically generates personalized career roadmaps and provides real-time ATS resume scoring with targeted skill gap recommendations.',
    highlights: [
      'Integrated GPT-4 & Gemini API to formulate milestone-based career trajectories',
      'Extracted 15+ actionable skill signals from uploaded resumes for ATS score optimization',
      'Aggregated live job listings via JSearch API with smart location & compensation filters',
    ],
    stack: ['React SPA', 'Vite', 'Tailwind CSS', 'Firebase', 'Gemini API', 'YouTube API', 'JSearch API', 'Sarvam AI'],
    demoUrl: 'https://ascend-career.vercel.app/',
    githubUrl: 'https://github.com/KunalBishwal/Ascend-Career',
    architectureImg: '/architecture/careerpath-arch.png',
    architectureDetails: [
      'React SPA on Vite: Career Galaxy interactive roadmap, Course picks from resume, Job matches, AI mentor chat & voice',
      'Gemini API Multi-Agent Suite: Dynamic roadmap generator, deep resume analysis, and mentor conversational agent',
      'External Aggregators: YouTube API v3 for targeted video courses, JSearch & Active Jobs DB via RapidAPI for live job listings',
      'Firebase Backend: Authentication (session management), Firestore (chat history sync), and Storage (resume file uploads)',
    ],
  },
  {
    id: 4,
    slideNum: '04',
    appName: 'CampusConnect.app',
    title: 'CampusConnect — University Networking & Collaboration Hub',
    subtitle: 'Award-Winning Student Platform · 3rd Prize MOZO-HACK Hackathon',
    category: 'Real-Time Web & Peer-to-Peer Systems',
    badge: 'MOZO-HACK 3rd Prize · WebRTC Video Mesh · AI Resume Matching',
    icon: '🎓',
    description:
      'Award-winning university networking platform featuring real-time peer messaging, WebRTC video calling rooms, verified student profiles, and automated resume analysis powered by Gemini API.',
    highlights: [
      'Won 3rd Prize at MOZO-HACK hackathon for real-time collaboration architecture',
      'Integrated WebRTC peer connection mesh with custom signaling server',
      'Engineered instant student community matching by shared courses & tech interests',
    ],
    stack: ['Next.js 14', 'Node.js', 'Express', 'MongoDB Atlas', 'WebRTC', 'Socket.io', 'Tailwind CSS'],
    demoUrl: 'https://campusconnect-mu-six.vercel.app/',
    githubUrl: 'https://github.com/patelaman275/campusconnect',
    architectureImg: '/architecture/campusconnect-arch.png',
    architectureDetails: [
      'Next.js 14 App Router: Real-time discussion forum, course chat channels, video room UI, and member discovery',
      'Signaling & Real-time Layer: Socket.io room orchestration with WebRTC mesh for direct P2P audio/video communication',
      'Integrations: Nodemailer OTP email verification, Gemini API for ATS resume analysis, MongoDB Atlas cloud cluster',
    ],
  },
];

export default function ProjectCarousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGithubDark, setIsGithubDark] = useState(false);
  const [activeArchProject, setActiveArchProject] = useState<Project | null>(null);

  const currentProject = PROJECTS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="projects"
      className="relative bg-transparent text-[#3a0f34] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-full overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Section Header with GitHub Theme Switch */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#3a0f34] text-[#eaaa00] text-xs font-bold tracking-wider uppercase shadow-sm mb-3">
              <span>Selected Projects · 4 Featured Systems</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#3a0f34]">
              Engineering &amp; <span className="text-[#eaaa00]">AI Systems</span>
            </h2>

            <p className="text-sm sm:text-base text-[#5e3b58] mt-1 max-w-xl font-medium leading-relaxed">
              Use arrow buttons to slide across all 4 production systems. Toggle GitHub dark theme for developer mode.
            </p>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <button
              onClick={handlePrev}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-sm ${
                isGithubDark
                  ? 'bg-[#161b22] border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d] hover:border-[#58a6ff]'
                  : 'bg-white/80 border-[#3a0f34]/20 text-[#3a0f34] hover:bg-white hover:border-[#eaaa00]'
              }`}
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-sm ${
                isGithubDark
                  ? 'bg-[#161b22] border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d] hover:border-[#58a6ff]'
                  : 'bg-white/80 border-[#3a0f34]/20 text-[#3a0f34] hover:bg-white hover:border-[#eaaa00]'
              }`}
              aria-label="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Slide Dots Selector ── */}
        <div className="flex items-center gap-2 mb-6">
          {PROJECTS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? isGithubDark
                    ? 'w-10 bg-[#58a6ff]'
                    : 'w-10 bg-[#eaaa00]'
                  : isGithubDark
                  ? 'w-2.5 bg-[#30363d] hover:bg-[#8b949e]'
                  : 'w-2.5 bg-[#3a0f34]/25 hover:bg-[#3a0f34]/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* ── Sliding Project Card ── */}
        <div className="relative overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-3xl border overflow-hidden shadow-2xl transition-colors duration-300 ${
                isGithubDark
                  ? 'bg-[#0d1117] border-[#30363d] text-[#c9d1d9]'
                  : 'border-[#eaaa00]/30 text-[#3a0f34]'
              }`}
              style={{
                background: isGithubDark ? '#0d1117' : 'rgba(221,227,232,0.92)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Card Window Titlebar */}
              <div
                className={`px-5 py-3.5 border-b flex items-center justify-between ${
                  isGithubDark
                    ? 'bg-[#161b22] border-[#30363d]'
                    : 'bg-[#3a0f34] border-[#eaaa00]/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#f85149] inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#d29922] inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#2ea043] inline-block shadow-sm" />
                  <span
                    className={`text-xs font-mono font-medium ml-2 tracking-tight ${
                      isGithubDark ? 'text-[#8b949e]' : 'text-[#dde3e8]/80'
                    }`}
                  >
                    {currentProject.appName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      isGithubDark
                        ? 'bg-[#21262d] text-[#8b949e] border border-[#30363d]'
                        : 'bg-white/15 text-[#dde3e8]/80'
                    }`}
                  >
                    SLIDE {currentProject.slideNum} / 04
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border hidden sm:inline-block ${
                      isGithubDark
                        ? 'bg-[#1f6feb]/15 text-[#58a6ff] border-[#1f6feb]/30'
                        : 'bg-[#eaaa00]/20 text-[#eaaa00] border-[#eaaa00]/30'
                    }`}
                  >
                    {currentProject.category}
                  </span>
                </div>
              </div>

              {/* Project Card Content */}
              <div className="p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-between">
                {/* Left Column: Details */}
                <div className="flex-1 space-y-4">
                  {/* Category & Badge */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        isGithubDark
                          ? 'bg-[#161b22] text-[#c9d1d9] border-[#30363d]'
                          : 'bg-[#3a0f34]/10 text-[#3a0f34] border-[#3a0f34]/20'
                      }`}
                    >
                      {currentProject.icon} {currentProject.category}
                    </span>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                        isGithubDark
                          ? 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/40'
                          : 'bg-[#eaaa00]/20 text-[#3a0f34] border-[#eaaa00]/40'
                      }`}
                    >
                      {currentProject.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3
                      className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight ${
                        isGithubDark ? 'text-white' : 'text-[#3a0f34]'
                      }`}
                    >
                      {currentProject.title}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm font-semibold mt-1 tracking-tight ${
                        isGithubDark ? 'text-[#58a6ff]' : 'text-[#eaaa00]'
                      }`}
                    >
                      {currentProject.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed font-normal ${
                      isGithubDark ? 'text-[#8b949e]' : 'text-[#3a0f34]/75'
                    }`}
                  >
                    {currentProject.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 pt-1">
                    {currentProject.highlights.map((h, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2 text-xs sm:text-[13px] ${
                          isGithubDark ? 'text-[#c9d1d9]' : 'text-[#3a0f34]/85'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                            isGithubDark ? 'bg-[#3fb950]' : 'bg-[#eaaa00]'
                          }`}
                        />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-2">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider block mb-2 ${
                        isGithubDark ? 'text-[#8b949e]' : 'text-[#3a0f34]/50'
                      }`}
                    >
                      Core Technologies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentProject.stack.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                            isGithubDark
                              ? 'bg-[#161b22] text-[#58a6ff] border-[#30363d] hover:border-[#58a6ff]'
                              : 'bg-[#3a0f34]/10 text-[#3a0f34] border-[#3a0f34]/15 hover:bg-[#eaaa00] hover:text-[#3a0f34]'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Action Buttons, Architecture & AI Trigger */}
                <div className="w-full md:w-64 flex flex-col gap-2.5 shrink-0 pt-2 md:pt-0">
                  {/* View Architecture Button */}
                  <button
                    onClick={() => setActiveArchProject(currentProject)}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                      isGithubDark
                        ? 'bg-[#238636] hover:bg-[#2ea043] text-white'
                        : 'bg-[#eaaa00] hover:bg-[#3a0f34] hover:text-[#eaaa00] text-[#3a0f34]'
                    }`}
                  >
                    <Network className="w-4 h-4" />
                    <span>View Architecture</span>
                  </button>

                  {/* Launch Live Demo */}
                  <a
                    href={currentProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                      isGithubDark
                        ? 'bg-[#21262d] text-[#c9d1d9] border-[#30363d] hover:bg-[#30363d] hover:text-white'
                        : 'bg-[#3a0f34]/10 text-[#3a0f34] border-[#3a0f34]/20 hover:bg-[#3a0f34]/20'
                    }`}
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
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer border ${
                        isGithubDark
                          ? 'bg-[#161b22] text-[#f0883e] border-[#f0883e]/30 hover:bg-[#21262d]'
                          : 'bg-[#3a0f34]/10 text-[#eaaa00] border-[#eaaa00]/40 hover:bg-[#3a0f34]/20'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>ICCCNet Research Paper</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {/* View Source Code (Verified GitHub Link) */}
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer border ${
                      isGithubDark
                        ? 'bg-[#1f6feb]/15 text-[#58a6ff] border-[#1f6feb]/30 hover:bg-[#1f6feb]/25'
                        : 'bg-[#3a0f34]/10 text-[#3a0f34] border-[#3a0f34]/15 hover:bg-[#3a0f34]/20'
                    }`}
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
                    className={`w-full py-2 px-3 rounded-xl text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1 ${
                      isGithubDark
                        ? 'text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#161b22]'
                        : 'text-[#3a0f34]/50 hover:text-[#eaaa00] hover:bg-[#3a0f34]/5'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Ask AI about this architecture</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Architecture Diagram Modal ── */}
      <AnimatePresence>
        {activeArchProject && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveArchProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-full max-w-4xl max-h-[92vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden ${
                isGithubDark
                  ? 'bg-[#0d1117] border-[#30363d] text-[#c9d1d9]'
                  : 'bg-[#3a0f34] border-[#eaaa00]/30 text-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Titlebar */}
              <div
                className={`px-5 py-4 border-b flex items-center justify-between ${
                  isGithubDark
                    ? 'bg-[#161b22] border-[#30363d]'
                    : 'bg-[#2b0a26] border-[#eaaa00]/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#eaaa00] text-[#3a0f34] flex items-center justify-center font-bold">
                    <Network className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight">
                      System Architecture · {activeArchProject.title}
                    </h3>
                    <p className="text-[11px] opacity-75 font-mono">
                      {activeArchProject.appName} &middot; Verified Design Diagram
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveArchProject(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div
                  className={`relative w-full rounded-2xl overflow-hidden border p-3 flex items-center justify-center ${
                    isGithubDark
                      ? 'bg-[#161b22] border-[#30363d]'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <Image
                    src={activeArchProject.architectureImg}
                    alt={`${activeArchProject.title} Architecture Diagram`}
                    width={900}
                    height={520}
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>

                {/* Key Architecture Specifications */}
                <div>
                  <h4
                    className={`text-xs font-mono uppercase tracking-wider font-bold mb-3 ${
                      isGithubDark ? 'text-[#58a6ff]' : 'text-[#eaaa00]'
                    }`}
                  >
                    System Pipeline &amp; Component Breakdown:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeArchProject.architectureDetails.map((spec, i) => (
                      <div
                        key={i}
                        className={`p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                          isGithubDark
                            ? 'bg-[#161b22] border-[#30363d] text-[#c9d1d9]'
                            : 'bg-white/5 border-white/10 text-white/90'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                            isGithubDark ? 'bg-[#58a6ff]' : 'bg-[#eaaa00]'
                          }`}
                        />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* External links in modal */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={activeArchProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#eaaa00] text-[#3a0f34] hover:bg-white transition-colors flex items-center gap-1.5"
                  >
                    <span>Open Live Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={activeArchProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                      isGithubDark
                        ? 'bg-[#161b22] text-[#c9d1d9] border-[#30363d] hover:text-white'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
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
