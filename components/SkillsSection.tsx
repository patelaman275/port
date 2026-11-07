'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Terminal,
  Database,
  Wrench,
  Layers,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react';

interface ProjectInfo {
  id: string;
  title: string;
  icon: string;
  role: string;
  demoUrl?: string;
}

interface SkillItem {
  name: string;
  projects?: string[]; // IDs of related projects
  highlightText?: string;
}

interface SkillGroup {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  skills: SkillItem[];
}

const PROJECTS_MAP: Record<string, ProjectInfo> = {
  easytrip: {
    id: 'easytrip',
    title: 'EasyTrip — Multi-Rider Safety',
    icon: '🗺️',
    role: 'Solo Project: Real-time GPS tracking & Socket.io SOS emergency dispatch broadcast.',
    demoUrl: 'https://easytrip-swart.vercel.app/',
  },
  chicktech: {
    id: 'chicktech',
    title: 'ChickTech AI — Disease Detection',
    icon: '🔬',
    role: 'ICCCNet 2026 Paper: 98.2% Accuracy Dual CNN (VGG16/MobileNetV2), Next.js UI & Gemini RAG.',
    demoUrl: 'https://chick-tech-ai-diagnosis.vercel.app/',
  },
  careerpath: {
    id: 'careerpath',
    title: 'AI Career Path Generator',
    icon: '🚀',
    role: 'Team Project: Full-stack roadmap synthesizer powered by OpenAI GPT-4 & ATS resume analyzer.',
    demoUrl: 'https://ai-career-path-generator.vercel.app/',
  },
  campusconnect: {
    id: 'campusconnect',
    title: 'CampusConnect — Peer Network',
    icon: '🎓',
    role: 'MOZO-HACK 3rd Prize: Real-time WebRTC video calling & student messaging platform.',
    demoUrl: 'https://campusconnect-mu-six.vercel.app/',
  },
  leetcode: {
    id: 'leetcode',
    title: 'LeetCode Problem Solving (250+)',
    icon: '⚡',
    role: '250+ Algorithmic challenges solved across Graphs, DP, Trees, Arrays (100-Day Streak Badge).',
    demoUrl: 'https://leetcode.com/u/aman24256/',
  },
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    icon: <Code2 className="w-4 h-4 text-[#D4ff3f]" />,
    color: '#D4ff3f',
    skills: [
      { name: 'Java', projects: ['leetcode'], highlightText: 'Primary language for 250+ LeetCode DSA problem solving and Elite NPTEL OOP certification.' },
      { name: 'Python', projects: ['chicktech'], highlightText: 'Deep learning pipeline training (TensorFlow/Keras), dataset augmentation, and Flask inference APIs.' },
      { name: 'JavaScript', projects: ['easytrip', 'careerpath', 'campusconnect'], highlightText: 'Full-stack development across Node.js event loops, Socket.io clients, and modern React interfaces.' },
      { name: 'TypeScript', projects: ['chicktech', 'campusconnect'], highlightText: 'Type-safe Next.js architecture, component interfaces, and server route handlers.' },
      { name: 'SQL', projects: ['campusconnect'], highlightText: 'Relational schema modeling, indexed foreign key relations, and transactional integrity queries.' },
      { name: 'C/C++', projects: ['leetcode'], highlightText: 'Low-level memory management, pointers, and optimized algorithmic execution.' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: <Layers className="w-4 h-4 text-[#cbb3e8]" />,
    color: '#cbb3e8',
    skills: [
      { name: 'React.js', projects: ['easytrip', 'careerpath', 'campusconnect'], highlightText: 'Dynamic SPAs, custom reactive hooks, real-time state management, and Leaflet map rendering.' },
      { name: 'Next.js', projects: ['chicktech'], highlightText: 'App Router architecture, SSR rendering, optimized image pipelines, and edge API route processing.' },
      { name: 'Tailwind CSS', projects: ['chicktech', 'easytrip', 'careerpath'], highlightText: 'Custom utility design systems, high-contrast typography, and fluid responsive layouts.' },
      { name: 'WebRTC', projects: ['campusconnect'], highlightText: 'Peer-to-peer audio/video streaming mesh networks for the MOZO-HACK winning CampusConnect.' },
      { name: 'HTML5/CSS3', projects: ['chicktech', 'easytrip'], highlightText: 'Semantic DOM accessibility, SVG canvas rendering, and hardware-accelerated animations.' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: <Terminal className="w-4 h-4 text-[#e34234]" />,
    color: '#e34234',
    skills: [
      { name: 'Node.js', projects: ['easytrip', 'careerpath', 'campusconnect'], highlightText: 'Event-driven server runtime handling concurrent WebSocket connections and REST endpoints.' },
      { name: 'Express.js', projects: ['easytrip', 'careerpath', 'campusconnect'], highlightText: 'Modular REST API routing, custom auth middleware, and error-handling pipelines.' },
      { name: 'Socket.io', projects: ['easytrip', 'campusconnect'], highlightText: 'Bi-directional live GPS coordinate streaming and emergency SOS distress alerts in EasyTrip.' },
      { name: 'Flask', projects: ['chicktech'], highlightText: 'Lightweight Python microservice serving TensorFlow model inferences for poultry image classification.' },
      { name: 'REST APIs', projects: ['easytrip', 'careerpath', 'campusconnect'], highlightText: 'Stateless endpoints, standardized JSON response schemas, and rate-limited gateway integration.' },
      { name: 'JWT Auth', projects: ['easytrip', 'campusconnect'], highlightText: 'Stateless token authentication with encrypted payload claims and protected route guards.' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: <Database className="w-4 h-4 text-[#D4ff3f]" />,
    color: '#D4ff3f',
    skills: [
      { name: 'MongoDB Atlas', projects: ['easytrip', 'careerpath', 'campusconnect'], highlightText: 'Document schema design, geospatial 2dsphere indexing for GPS riders, and aggregation pipelines.' },
      { name: 'MySQL', projects: ['campusconnect'], highlightText: 'Relational ACID storage, normalized entities, foreign key constraints, and stored procedures.' },
      { name: 'Firebase', projects: ['chicktech'], highlightText: 'Real-time database synching, cloud image storage, and rapid prototype hosting.' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: <Wrench className="w-4 h-4 text-[#cbb3e8]" />,
    color: '#cbb3e8',
    skills: [
      { name: 'AWS (Certified)', projects: ['chicktech'], highlightText: 'Double AWS Certified (AI Practitioner & Cloud Practitioner on Credly) — EC2, S3, IAM, Bedrock.' },
      { name: 'Docker', projects: ['easytrip'], highlightText: 'Containerizing Node.js and Python microservices for reproducible production deployment.' },
      { name: 'Git / GitHub', projects: ['chicktech', 'easytrip', 'careerpath', 'campusconnect'], highlightText: 'Version control, feature branches, and maintaining 44+ open-source repositories.' },
      { name: 'Postman', projects: ['easytrip', 'careerpath'], highlightText: 'API test suites, automated mock environments, and contract verification.' },
      { name: 'Vercel / Vite', projects: ['chicktech', 'easytrip', 'careerpath', 'campusconnect'], highlightText: 'Continuous deployment pipelines, preview deployments, and bundle tree-shaking.' },
    ],
  },
];

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="skills" className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden bg-transparent">
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 80%, rgba(234,170,0,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(58,15,52,0.12) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-left md:text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#3a0f34] text-[#eaaa00] text-xs font-semibold tracking-wider uppercase mb-3 shadow-sm">
              Interactive Matrix
            </span>
            <h2 className="font-extrabold tracking-[-0.03em] text-3xl md:text-5xl text-[#3a0f34]">
              Technical <span className="text-[#eaaa00]">Skills</span>
            </h2>
            <p className="text-xs md:text-sm text-[#5e3b58] font-medium mt-2 max-w-md mx-auto">
              Select any skill icon below to highlight the exact production projects powered by it.
            </p>
          </motion.div>
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: 'linear-gradient(90deg, #3a0f34, #eaaa00, #3a0f34)' }}
          />
        </div>

        {/* 5 Categorized Skill Rows */}
        <div className="space-y-4">
          {SKILL_GROUPS.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 p-4 rounded-2xl border border-[#eaaa00]/30 shadow-md backdrop-blur-md"
              style={{ background: 'rgba(221, 227, 232, 0.85)' }}
            >
              {/* Group Label */}
              <div className="w-36 flex-shrink-0 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#3a0f34]/10 text-[#3a0f34]">{group.icon}</span>
                <span className="text-xs font-semibold tracking-tight text-[#3a0f34] uppercase">
                  {group.label}
                </span>
              </div>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2 flex-1">
                {group.skills.map((skill) => {
                  const isSelected = selectedSkill?.name === skill.name;

                  return (
                    <motion.button
                      key={skill.name}
                      onClick={() => setSelectedSkill(isSelected ? null : skill)}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#eaaa00] text-[#3a0f34] font-bold shadow-[0_0_16px_rgba(234,170,0,0.4)] border border-[#3a0f34] scale-105'
                          : 'bg-[#3a0f34]/10 hover:bg-[#3a0f34]/20 text-[#3a0f34] border border-[#3a0f34]/15'
                      }`}
                    >
                      <span>{skill.name}</span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#3a0f34] animate-ping" />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Dynamic Related Projects Highlight Panel ── */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {selectedSkill ? (
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="p-6 md:p-8 rounded-3xl border-2 border-[#eaaa00] shadow-[0_20px_60px_rgba(58,15,52,0.15)] text-[#3a0f34] relative overflow-hidden backdrop-blur-md"
                style={{ background: 'rgba(221, 227, 232, 0.95)' }}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#3a0f34]/15 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#eaaa00] animate-pulse" />
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-[#3a0f34] flex items-center gap-2">
                        <span>Projects Powered by</span>
                        <span className="text-[#eaaa00] underline decoration-[#eaaa00] font-mono">
                          {selectedSkill.name}
                        </span>
                      </h4>
                      <p className="text-xs text-[#5e3b58] mt-0.5">
                        {selectedSkill.highlightText}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="p-1.5 rounded-full hover:bg-[#3a0f34]/10 text-[#3a0f34]/60 hover:text-[#3a0f34] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Related Project Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedSkill.projects?.map((projId) => {
                    const proj = PROJECTS_MAP[projId];
                    if (!proj) return null;

                    return (
                      <div
                        key={proj.id}
                        className="p-4 rounded-2xl bg-white/60 border border-[#3a0f34]/15 hover:border-[#eaaa00] transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{proj.icon}</span>
                            <h5 className="font-bold text-xs text-[#3a0f34] line-clamp-1">{proj.title}</h5>
                          </div>
                          <p className="text-[11px] text-[#5e3b58] leading-relaxed mb-3">
                            {proj.role}
                          </p>
                        </div>

                        {proj.demoUrl && (
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#eaaa00] hover:text-[#3a0f34] mt-auto transition-colors"
                          >
                            <span>Inspect Project</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
