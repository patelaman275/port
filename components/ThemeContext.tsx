'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'github-dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  isDark: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('github-dark');

  useEffect(() => {
    const saved = localStorage.getItem('aman-portfolio-theme') as Theme | null;
    if (saved) {
      setTheme(saved);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'github-dark' ? 'light' : 'github-dark';
      localStorage.setItem('aman-portfolio-theme', next);
      return next;
    });
  };

  const isDark = theme === 'github-dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      <div className={isDark ? 'github-dark' : 'theme-light'}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
