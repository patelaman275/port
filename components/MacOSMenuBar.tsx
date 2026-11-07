'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, BatteryCharging, Search, Sliders, Terminal, FileText, ExternalLink } from 'lucide-react';

import SiriLogo from './SiriLogo';

interface MacOSMenuBarProps {
  onOpenChat?: () => void;
  onOpenAbout?: () => void;
}

export default function MacOSMenuBar({ onOpenChat, onOpenAbout }: MacOSMenuBarProps) {
  const [time, setTime] = useState<string>('');
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }) +
          '  ' +
          now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setAppleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[9995] h-7 bg-black/85 backdrop-blur-2xl border-b border-white/10 text-white select-none text-[12px] font-medium tracking-tight px-3 flex items-center justify-between">
      {/* Left Menu Items (Apple logo removed as requested) */}
      <div className="flex items-center gap-3.5 relative" ref={menuRef}>
        {/* Aman Patel System Menu Dropdown */}
        <button
          onClick={() => setAppleMenuOpen(!appleMenuOpen)}
          className="font-bold text-white hover:text-[#D4ff3f] transition-colors px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer flex items-center gap-1.5"
          title="System Overview"
        >
          <span className="w-2 h-2 rounded-full bg-[#D4ff3f]" />
          <span>Aman Patel</span>
        </button>

        {/* System Dropdown Menu */}
        <AnimatePresence>
          {appleMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute top-7 left-0 w-64 bg-black/90 backdrop-blur-2xl border border-white/20 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] py-1.5 text-xs text-white z-50 divide-y divide-white/10"
            >
              <div className="py-1 px-1">
                <button
                  onClick={() => {
                    setAppleMenuOpen(false);
                    onOpenAbout?.();
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-md hover:bg-[#D4ff3f] hover:text-black transition-colors font-semibold flex items-center justify-between"
                >
                  <span>About Aman Patel</span>
                  <span className="text-[10px] opacity-70">Portfolio OS</span>
                </button>
              </div>

              <div className="py-1 px-1 text-[11px]">
                <div className="px-3 py-1 text-white/50 font-mono text-[10px] uppercase tracking-wider">
                  System Specifications
                </div>
                <div className="px-3 py-1 flex justify-between text-white/90">
                  <span>Specialization:</span>
                  <span className="text-[#D4ff3f] font-mono">CSE Data Science</span>
                </div>
                <div className="px-3 py-1 flex justify-between text-white/90">
                  <span>Academic CGPA:</span>
                  <span className="text-[#D4ff3f] font-mono font-bold">8.83 / 10.0</span>
                </div>
                <div className="px-3 py-1 flex justify-between text-white/90">
                  <span>Cloud Engine:</span>
                  <span className="text-[#e34234] font-mono">AWS Dual Certified</span>
                </div>
                <div className="px-3 py-1 flex justify-between text-white/90">
                  <span>Research:</span>
                  <span className="text-white/80 font-mono">ICCCNet 2026 Author</span>
                </div>
              </div>

              <div className="py-1 px-1">
                <button
                  onClick={() => {
                    setAppleMenuOpen(false);
                    window.location.reload();
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-md hover:bg-[#e34234] hover:text-white transition-colors"
                >
                  Restart Experience (Re-run intro)
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Menus */}
        <button
          onClick={() => scrollTo('projects')}
          className="hidden sm:inline-block hover:text-[#D4ff3f] transition-colors px-1.5 py-0.5 rounded hover:bg-white/10 cursor-pointer"
        >
          Projects
        </button>

        <button
          onClick={() => scrollTo('skills')}
          className="hidden sm:inline-block hover:text-[#D4ff3f] transition-colors px-1.5 py-0.5 rounded hover:bg-white/10 cursor-pointer"
        >
          Skills
        </button>

        <button
          onClick={() => scrollTo('certifications')}
          className="hidden md:inline-block hover:text-[#D4ff3f] transition-colors px-1.5 py-0.5 rounded hover:bg-white/10 cursor-pointer"
        >
          Certifications
        </button>

        <button
          onClick={() => scrollTo('publications')}
          className="hidden md:inline-block hover:text-[#D4ff3f] transition-colors px-1.5 py-0.5 rounded hover:bg-white/10 cursor-pointer"
        >
          Research
        </button>

        <button
          onClick={() => scrollTo('contact')}
          className="hidden lg:inline-block hover:text-[#D4ff3f] transition-colors px-1.5 py-0.5 rounded hover:bg-white/10 cursor-pointer"
        >
          Contact
        </button>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-1 hover:text-[#D4ff3f] transition-colors px-1.5 py-0.5 rounded hover:bg-white/10"
        >
          <span>Resume</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
        </a>

        {/* AI Portfolio Assistant Trigger */}
        <button
          onClick={onOpenChat}
          className="hidden sm:inline-flex items-center gap-1.5 text-[#D4ff3f] hover:text-white transition-colors px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer font-semibold"
        >
          <SiriLogo size={16} />
          <span>AI Portfolio Assistant</span>
        </button>
      </div>

      {/* Right Status Items */}
      <div className="flex items-center gap-3 font-mono text-[11px] text-white/90">
        {/* Wi-Fi */}
        <span title="Wi-Fi: Connected to SRM-Gigabit" className="hover:text-[#D4ff3f] transition-colors cursor-pointer">
          <Wifi className="w-3.5 h-3.5" />
        </span>

        {/* Battery */}
        <span title="Battery: 100% Charged" className="flex items-center gap-1 hover:text-[#D4ff3f] transition-colors cursor-pointer">
          <span>100%</span>
          <BatteryCharging className="w-3.5 h-3.5 text-[#D4ff3f]" />
        </span>

        {/* Real Siri Logo Button */}
        <button
          onClick={onOpenChat}
          title="Siri / AI Portfolio Assistant (⌘K)"
          className="hover:scale-110 transition-transform cursor-pointer p-0.5 rounded"
        >
          <SiriLogo size={17} />
        </button>

        {/* Spotlight Search */}
        <button
          onClick={onOpenChat}
          title="Spotlight Search / Ask AI (⌘K)"
          className="hover:text-[#D4ff3f] transition-colors cursor-pointer p-0.5 rounded hover:bg-white/10"
        >
          <Search className="w-3.5 h-3.5" />
        </button>

        {/* Control Center */}
        <span title="Control Center" className="hover:text-[#D4ff3f] transition-colors cursor-pointer">
          <Sliders className="w-3.5 h-3.5" />
        </span>

        {/* Time */}
        <span className="font-sans font-medium text-[11px] tracking-tight ml-1 text-white">
          {time || '9:41 AM'}
        </span>
      </div>
    </header>
  );
}
