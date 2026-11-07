'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Play, RotateCcw, Copy, Check } from 'lucide-react';

interface TerminalTab {
  cmd: string;
  output: React.ReactNode;
}

const TERMINAL_DATA: Record<string, TerminalTab> = {
  whoami: {
    cmd: 'whoami',
    output: (
      <div className="space-y-1 text-white/90">
        <p className="text-[#D4ff3f] font-semibold">Aman Patel (he/him)</p>
        <p className="text-white/70">Role: Software Engineer · AI/ML & Backend Specialist</p>
        <p className="text-white/70">Education: SRM IST Chennai (B.Tech CSE Data Science, CGPA: 8.83/10)</p>
        <p className="text-white/70">Location: Lucknow, UP / Chennai, India</p>
      </div>
    ),
  },
  skills: {
    cmd: 'cat ~/.skillsrc',
    output: (
      <div className="space-y-1 text-white/90">
        <p className="text-white/60"># Core Engineering Stack</p>
        <p><span className="text-[#e34234] font-bold">Languages:</span> Java, Python, JavaScript, TypeScript, SQL, C/C++</p>
        <p><span className="text-[#D4ff3f] font-bold">Backend:</span> Node.js, Express.js, Flask, REST APIs, Socket.io</p>
        <p><span className="text-[#cbb3e8] font-bold">Frontend:</span> React.js, Next.js, Tailwind CSS, WebRTC</p>
        <p><span className="text-[#D4ff3f] font-bold">AI / ML:</span> TensorFlow, CNNs, Gemini API, RAG, NLP</p>
        <p><span className="text-[#e34234] font-bold">Cloud:</span> AWS (Certified AI & Cloud Practitioner on Credly)</p>
      </div>
    ),
  },
  projects: {
    cmd: './status-projects.sh',
    output: (
      <div className="space-y-1.5 text-white/90 text-[11px]">
        <div className="flex items-center justify-between">
          <span className="text-[#D4ff3f] font-bold">1. ChickTech AI (ICCCNet 2026 Paper)</span>
          <span className="px-1.5 py-0.2 rounded bg-[#D4ff3f]/20 text-[#D4ff3f] text-[9px] font-bold">98.2% ACCURACY</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#cbb3e8] font-bold">2. EasyTrip (Solo Full-Stack)</span>
          <span className="px-1.5 py-0.2 rounded bg-[#cbb3e8]/20 text-[#cbb3e8] text-[9px] font-bold">LIVE GPS & SOS</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#e34234] font-bold">3. AI Career Path Generator</span>
          <span className="px-1.5 py-0.2 rounded bg-[#e34234]/20 text-[#e34234] text-[9px] font-bold">GPT-4 ROADMAPS</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/80 font-bold">4. CampusConnect (MOZO-HACK)</span>
          <span className="px-1.5 py-0.2 rounded bg-white/20 text-white text-[9px] font-bold">3RD PRIZE</span>
        </div>
      </div>
    ),
  },
  status: {
    cmd: 'echo $RECRUITER_STATUS',
    output: (
      <div className="space-y-1 text-white/90">
        <p className="text-[#D4ff3f] font-semibold">✔ Holding: Accenture ASE Offer (4.5 LPA, July 2027)</p>
        <p className="text-white/80">🎯 Exploring: High-impact Software Engineer / AI/ML roles (~200% hike target)</p>
        <p className="text-[#cbb3e8]">⚡ Availability: Pre-graduation technical internships & full-time onboarding</p>
      </div>
    ),
  },
};

export default function HeroTerminal() {
  const [activeTab, setActiveTab] = useState<string>('whoami');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('amanpatelsrm@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg apple-window rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] font-mono text-xs select-none">
      {/* Terminal Title Bar */}
      <div className="px-4 py-2.5 bg-black/80 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#e34234] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#D4ff3f] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-white/20 inline-block shadow-sm" />
          <span className="text-[11px] text-white/60 ml-2 font-medium tracking-tight">
            aman@macbook: ~ (zsh)
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="text-white/50 hover:text-[#D4ff3f] transition-colors p-1 rounded hover:bg-white/10 flex items-center gap-1 text-[10px]"
          title="Copy email command"
        >
          {copied ? <Check className="w-3 h-3 text-[#D4ff3f]" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Email'}</span>
        </button>
      </div>

      {/* Terminal Command Quick Chips */}
      <div className="px-3.5 py-1.5 bg-black/60 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto">
        <span className="text-[10px] text-white/40 uppercase mr-1">Run:</span>
        {Object.keys(TERMINAL_DATA).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
              activeTab === key
                ? 'bg-[#D4ff3f] text-black font-bold shadow-sm'
                : 'bg-white/5 text-white/70 hover:bg-white/15 hover:text-white'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Terminal Body */}
      <div className="p-4 bg-black/75 backdrop-blur-xl min-h-[140px] flex flex-col justify-between">
        <div>
          {/* Prompt line */}
          <div className="flex items-center gap-2 text-white/80 mb-2.5">
            <span className="text-[#D4ff3f] font-bold">aman@macbook</span>
            <span className="text-[#cbb3e8]">:~%</span>
            <span className="text-white font-medium">{TERMINAL_DATA[activeTab].cmd}</span>
          </div>

          {/* Command Output */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              {TERMINAL_DATA[activeTab].output}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Blinking Prompt Cursor */}
        <div className="flex items-center gap-1.5 text-white/50 text-[11px] pt-3 mt-2 border-t border-white/5">
          <span className="text-[#e34234]">➜</span>
          <span className="text-white/40">ready</span>
          <span className="w-2 h-3.5 bg-[#D4ff3f] animate-pulse inline-block" />
        </div>
      </div>
    </div>
  );
}
