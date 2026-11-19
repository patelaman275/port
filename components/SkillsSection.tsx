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
  projects?: string[];
  highlightText?: string;
}

interface SkillGroup {
  id: string;
  label: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

const PROJECTS_MAP: Record<string, ProjectInfo> = {
  easytrip: {
    id: 'easytrip',
    title: 'EasyTrip — Multi-Rider Safety',
    icon: '🗺️',
    role: 'Real-time GPS tracking & Socket.io SOS emergency dispatch broadcast mesh.',
    demoUrl: 'https://easytrip-swart.vercel.app/',
  },
  chicktech: {
    id: 'chicktech',
    title: 'ChickTech AI — Disease Detection',
    icon: '🔬',
    role: 'ICCCNet 2026 Paper: 98.2% Accuracy Dual CNN (VGG16/MobileNetV2) & Gemini RAG.',
    demoUrl: 'https://chick-tech-ai-diagnosis.vercel.app/',
  },
  careerpath: {
    id: 'careerpath',
    title: 'CareerPath — GenAI Navigation',
    icon: '🎯',
    role: 'Personalized career roadmaps synthesized via Google Gemini 1.5 Pro.',
    demoUrl: 'https://careerpath-delta.vercel.app/',
  },
  campusconnect: {
    id: 'campusconnect',
    title: 'CampusConnect — Peer Network',
    icon: '🎓',
    role: 'Full-stack campus community network with JWT auth and real-time feeds.',
    demoUrl: 'https://campus-connect-ochre.vercel.app/',
  },
  leetcode: {
    id: 'leetcode',
    title: 'LeetCode Problem Solving (250+)',
    icon: '⚡',
    role: '250+ Algorithmic challenges solved across Graphs, DP, Trees, Arrays.',
    demoUrl: 'https://leetcode.com/u/aman24256/',
  },
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    icon: <Code2 className="w-4 h-4 text-[#FE8040]" />,
    skills: [
      { name: 'Java', projects: ['leetcode'], highlightText: 'Primary language for 250+ LeetCode DSA problem solving & OOP certification.' },
      { name: 'Python', projects: ['chicktech'], highlightText: 'Deep learning pipeline training (TensorFlow/Keras) & Flask inference APIs.' },
      { name: 'JavaScript', projects: ['easytrip', 'careerpath', 'campusconnect'], highlightText: 'Full-stack development across Node.js event loops, Socket.io & React.' },
      { name: 'SQL', projects: ['campusconnect'], highlightText: 'Relational schema modeling, indexed foreign key relations & Coursera certified.' },
      { name: 'C/C++', projects: ['leetcode'], highlightText: 'Low-level memory management, pointers & algorithmic execution.' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Web',
    icon: <Terminal className="w-4 h-4 text-[#FE8040]" />,
    skills: [
      { name: 'Node.js', projects: ['easytrip', 'careerpath', 'campusconnect'], highlightText: 'Event-driven server runtime handling concurrent connections & REST APIs.' },
      { name: 'Express.js', projects: ['easytrip', 'careerpath', 'campusconnect'], highlightText: 'Modular REST API routing, custom auth middleware & pipelines.' },
      { name: 'Flask', projects: ['chicktech'], highlightText: 'Python microservice serving TensorFlow model inferences.' },
      { name: 'REST APIs', projects: ['easytrip', 'careerpath', 'campusconnect'], highlightText: 'Stateless endpoints, standardized JSON schemas & rate-limiting.' },
      { name: 'Socket.io', projects: ['easytrip'], highlightText: 'Live GPS coordinate streaming & emergency SOS distress alerts.' },
      { name: 'React.js', projects: ['easytrip', 'careerpath', 'campusconnect'], highlightText: 'SPAs, custom reactive hooks, real-time state & Leaflet map rendering.' },
      { name: 'Next.js', projects: ['chicktech'], highlightText: 'App Router architecture, SSR rendering & edge route processing.' },
    ],
  },
  {
    id: 'aiml',
    label: 'AI & Machine Learning',
    icon: <Layers className="w-4 h-4 text-[#FE8040]" />,
    skills: [
      { name: 'TensorFlow', projects: ['chicktech'], highlightText: 'Dual-pipeline CNN architecture (VGG16 + MobileNetV2) reaching 98.2% accuracy.' },
      { name: 'Deep Learning / CNNs', projects: ['chicktech'], highlightText: 'ICCCNet 2026 published research on avian disease image classification.' },
      { name: 'Gemini API & RAG', projects: ['chicktech'], highlightText: 'Retrieval-augmented generation grounding LLM Q&A on poultry pathology data.' },
      { name: 'OpenAI API (GPT-4)', projects: ['careerpath'], highlightText: 'Prompt engineering for personalized roadmap synthesis & ATS parsing.' },
      { name: 'NLP & LLMs', projects: ['careerpath', 'chicktech'], highlightText: 'Context-aware skill parsing, token optimization & multi-turn dialog.' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps (AWS)',
    icon: <Wrench className="w-4 h-4 text-[#FE8040]" />,
    skills: [
      { name: 'AWS (EC2, S3, Lambda)', projects: ['chicktech'], highlightText: 'Certified AI Practitioner & Cloud Practitioner on Credly.' },
      { name: 'IAM, VPC, CloudWatch', projects: ['chicktech'], highlightText: 'Identity access policies, virtual private clouds, monitoring & metrics.' },
      { name: 'Docker', projects: ['easytrip'], highlightText: 'Containerizing Node.js and Python microservices for production.' },
      { name: 'Terraform (basics)', projects: ['chicktech'], highlightText: 'Infrastructure-as-code configuration and automated provisioning.' },
      { name: 'Git & GitHub', projects: ['chicktech', 'easytrip', 'careerpath', 'campusconnect'], highlightText: 'Version control, feature branching & open-source collaboration.' },
      { name: 'Postman & Vite', projects: ['easytrip', 'careerpath'], highlightText: 'API test suites, automated mock environments & fast bundling.' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases & Core CS',
    icon: <Database className="w-4 h-4 text-[#FE8040]" />,
    skills: [
      { name: 'MySQL', projects: ['campusconnect'], highlightText: 'Relational ACID storage, normalized entities & foreign key constraints.' },
      { name: 'MongoDB Atlas', projects: ['easytrip', 'careerpath', 'campusconnect'], highlightText: 'Document schema design, geospatial 2dsphere indexing & aggregation.' },
      { name: 'DynamoDB & Firebase', projects: ['chicktech'], highlightText: 'NoSQL key-value caching, real-time database synching & cloud storage.' },
      { name: 'DSA & OOP', projects: ['leetcode'], highlightText: 'Data structures & algorithms: 250+ LeetCode problems, 100 Days Badge.' },
      { name: 'DBMS & OS & Networks', projects: ['campusconnect'], highlightText: 'Operating systems processes, computer networks TCP/UDP & database transactions.' },
    ],
  },
];

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  return (
    <section id="skills" className="relative py-14 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#191919] border border-[#303030] text-[#FE8040] text-xs font-bold tracking-wider uppercase shadow-sm mb-3 font-mono">
            <span>Core Competencies</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Technical <span className="text-[#FE8040]">Skills</span>
          </h2>
        </div>

        {/* Categorized Skill Rows */}
        <div className="space-y-3">
          {SKILL_GROUPS.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 p-4 rounded-xl border border-[#303030] bg-[#191919] shadow-sm"
            >
              {/* Group Label */}
              <div className="w-full md:w-44 flex-shrink-0 flex items-center gap-2.5 pb-2 md:pb-0 border-b md:border-b-0 border-[#252525]">
                <span className="p-1.5 rounded-lg bg-[#121212] border border-[#303030] text-[#FE8040]">
                  {group.icon}
                </span>
                <span className="text-xs font-bold tracking-tight text-[#F5F5F5] uppercase font-mono">
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
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#FE8040] text-[#0F0F0F] font-bold shadow-md'
                          : 'bg-[#121212] hover:bg-[#222222] text-[#CCCCCC] hover:text-[#FE8040] border border-[#303030] hover:border-[#FE8040]'
                      }`}
                    >
                      <span>{skill.name}</span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F0F]" />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Related Projects Highlight Panel ── */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {selectedSkill ? (
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-5 md:p-6 rounded-xl border border-[#FE8040]/50 shadow-xl bg-[#191919] text-[#CCCCCC]"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#303030] mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FE8040] animate-pulse" />
                    <div>
                      <h4 className="text-sm font-bold text-[#F5F5F5] flex items-center gap-2">
                        <span>Projects Powered by</span>
                        <span className="text-[#FE8040] font-mono">{selectedSkill.name}</span>
                      </h4>
                      <p className="text-xs text-[#999999] mt-0.5">{selectedSkill.highlightText}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="p-1.5 rounded-lg hover:bg-[#222222] text-[#777777] hover:text-[#FE8040] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Related Project Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedSkill.projects?.map((projId) => {
                    const proj = PROJECTS_MAP[projId];
                    if (!proj) return null;

                    return (
                      <div
                        key={proj.id}
                        className="p-3.5 rounded-lg bg-[#121212] border border-[#303030] hover:border-[#FE8040] transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-lg">{proj.icon}</span>
                            <h5 className="font-bold text-xs text-[#F5F5F5]">{proj.title}</h5>
                          </div>
                          <p className="text-[11px] text-[#999999] leading-relaxed mb-3">
                            {proj.role}
                          </p>
                        </div>

                        {proj.demoUrl && (
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#FE8040] hover:underline mt-auto"
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
