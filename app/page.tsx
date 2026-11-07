'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeContext';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import LoadingExperience from '@/components/LoadingExperience';
import LiveLavenderBackground from '@/components/LiveLavenderBackground';
import RecruiterChatModal from '@/components/RecruiterChatModal';
import OverlayText from '@/components/OverlayText';
import ProjectCarousel3D from '@/components/ProjectCarousel3D';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import EducationAndAchievements from '@/components/EducationAndAchievements';
import PublicationsSection from '@/components/PublicationsSection';
import ResumeSection from '@/components/ResumeSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [preloadProgress, setPreloadProgress] = useState(0);

  // Smooth startup timer (2.2s)
  useEffect(() => {
    const heroImg = new window.Image();
    heroImg.src = '/portrait.png';

    const startTime = performance.now();
    const duration = 2200;

    let frameId: number;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      const easedProgress = Math.min(100, Math.round(progressRatio * 100));

      setPreloadProgress(easedProgress);

      if (progressRatio < 1) {
        frameId = requestAnimationFrame(updateProgress);
      }
    };

    frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <ThemeProvider>
      {/* Theme Toggle Switch (Icon-only) */}
      <ThemeSwitcher />

      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Ambient Canvas Background */}
      <LiveLavenderBackground />

      {/* Loading Intro Experience */}
      <LoadingExperience progress={preloadProgress} />

      {/* AI Assistant Modal Listener */}
      <RecruiterChatModal hideTrigger={true} />

      <main className="relative z-10 bg-transparent min-h-screen overflow-x-hidden text-[#3a0f34]">
        {/* ══ HERO SECTION ══════════════════════════════════════════ */}
        <OverlayText />

        {/* ══ FEATURED ENGINEERING PROJECTS ══════════════════════ */}
        <ProjectCarousel3D />

        {/* Section divider */}
        <div className="section-divider mx-auto max-w-4xl" />

        {/* ══ SKILLS SECTION ═══════════════════════════════════════ */}
        <SkillsSection />

        {/* Section divider */}
        <div className="section-divider mx-auto max-w-4xl" />

        {/* ══ CERTIFICATIONS SECTION ═══════════════════════════════ */}
        <CertificationsSection />

        {/* Section divider */}
        <div className="section-divider mx-auto max-w-4xl" />

        {/* ══ EDUCATION & ACHIEVEMENTS SECTION ══════════════════════ */}
        <EducationAndAchievements />

        {/* Section divider */}
        <div className="section-divider mx-auto max-w-4xl" />

        {/* ══ PUBLICATIONS SECTION ═════════════════════════════════ */}
        <PublicationsSection />

        {/* Section divider */}
        <div className="section-divider mx-auto max-w-4xl" />

        {/* ══ RESUME SECTION (VIEW & DOWNLOAD) ══════════════════════ */}
        <ResumeSection />

        {/* ══ FOOTER / CONTACT ═════════════════════════════════════ */}
        <Footer />
      </main>
    </ThemeProvider>
  );
}
