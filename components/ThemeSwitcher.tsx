'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeSwitcher() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-5 right-5 z-[9990] flex items-center justify-center w-10 h-10 rounded-full border transition-all shadow-md cursor-pointer backdrop-blur-md ${
        isDark
          ? 'bg-[#161b22]/90 text-[#f0f6fc] border-[#30363d] hover:border-[#58a6ff] hover:bg-[#21262d]'
          : 'bg-white/90 text-[#3a0f34] border-[#3a0f34]/15 hover:border-[#eaaa00] hover:bg-white'
      }`}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#eaaa00]" />
      ) : (
        <Moon className="w-4 h-4 text-[#3a0f34]" />
      )}
    </button>
  );
}
