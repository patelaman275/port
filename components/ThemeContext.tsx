'use client';

import React, { createContext, useContext, useEffect } from 'react';

interface ThemeContextType {
  theme: 'obsidian-dark';
  toggleTheme: () => void;
  isDark: true;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'obsidian-dark',
  toggleTheme: () => {},
  isDark: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Permanent Obsidian Dark theme: enforce dark class and purge legacy light settings
    try {
      localStorage.removeItem('aman-portfolio-theme');
    } catch {
      // ignore
    }
    document.documentElement.classList.remove('theme-light', 'github-light', 'light');
    document.documentElement.classList.add('dark', 'obsidian-dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'obsidian-dark', toggleTheme: () => {}, isDark: true }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
