'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderKanban,
  Code2,
  Award,
  BookOpen,
  FileText,
  Compass,
} from 'lucide-react';

import SiriLogo from './SiriLogo';

interface MacOSDockProps {
  onOpenChat: () => void;
}

interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  accent: string;
  isApp?: boolean;
}

export default function MacOSDock({ onOpenChat }: MacOSDockProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const DOCK_ITEMS: DockItem[] = [
    {
      id: 'finder',
      label: 'Finder (Overview)',
      icon: <Compass className="w-6 h-6 text-[#D4ff3f]" />,
      action: () => scrollTo('top'),
      accent: '#D4ff3f',
    },
    {
      id: 'projects',
      label: 'Projects.app',
      icon: <FolderKanban className="w-6 h-6 text-[#cbb3e8]" />,
      action: () => scrollTo('projects'),
      accent: '#cbb3e8',
    },
    {
      id: 'skills',
      label: 'Skills.app',
      icon: <Code2 className="w-6 h-6 text-[#D4ff3f]" />,
      action: () => scrollTo('skills'),
      accent: '#D4ff3f',
    },
    {
      id: 'certifications',
      label: 'Certifications.app',
      icon: <Award className="w-6 h-6 text-[#e34234]" />,
      action: () => scrollTo('certifications'),
      accent: '#e34234',
    },
    {
      id: 'publications',
      label: 'Research.app',
      icon: <BookOpen className="w-6 h-6 text-[#cbb3e8]" />,
      action: () => scrollTo('publications'),
      accent: '#cbb3e8',
    },
    {
      id: 'resume',
      label: 'Resume.pdf (Preview)',
      icon: <FileText className="w-6 h-6 text-[#e34234]" />,
      action: () => window.open('/resume.pdf', '_blank'),
      accent: '#e34234',
    },
    {
      id: 'ai-assistant',
      label: 'AI Portfolio Assistant (Siri)',
      icon: <SiriLogo size={28} />,
      action: onOpenChat,
      accent: '#D4ff3f',
      isApp: true,
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9990] pointer-events-auto">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2 md:gap-3 px-3 py-2.5 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]"
      >
        {DOCK_ITEMS.map((item, index) => {
          const isHovered = hoveredId === item.id;

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.9 }}
                    animate={{ opacity: 1, y: -45, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute whitespace-nowrap px-2.5 py-1 rounded-md bg-black/90 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium tracking-tight shadow-lg pointer-events-none z-50"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Separator before AI Assistant */}
              {index === DOCK_ITEMS.length - 1 && (
                <div className="w-px h-8 bg-white/20 mr-1.5" />
              )}

              {/* App Icon Button with Apple Magnification */}
              <motion.button
                onClick={item.action}
                whileHover={{ scale: 1.25, y: -6 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/15 shadow-md transition-colors relative cursor-pointer group"
                title={item.label}
              >
                {item.icon}

                {/* Subtle sheen highlight */}
                <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
              </motion.button>

              {/* Running App Indicator Dot */}
              <div
                className={`w-1 h-1 rounded-full mt-1 transition-opacity ${
                  item.isApp ? 'bg-[#e34234] opacity-100' : 'bg-[#D4ff3f] opacity-80'
                }`}
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
