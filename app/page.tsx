'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeContext';
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

  // Smooth startup timer (1.8s)
  useEffect(() => {
    const startTime = performance.now();
    const duration = 1800;

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
      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Obsidian Ambient Background Canvas */}
      <LiveLavenderBackground />

      {/* Atmospheric Soft Blur Lighting Orbs in Background (Frosted Glass Refraction) */}
      <div className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
        {/* Top-Right Hero Ambient Blur */}
        <div
          className="absolute -top-20 -right-20 w-[550px] h-[550px] rounded-full opacity-35"
          style={{
            background: 'radial-gradient(circle, rgba(254, 128, 64, 0.16) 0%, rgba(120, 50, 20, 0.05) 55%, transparent 75%)',
            filter: 'blur(120px)',
          }}
        />

        {/* Mid-Left Projects Ambient Blur */}
        <div
          className="absolute top-[35%] -left-32 w-[600px] h-[600px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(254, 128, 64, 0.14) 0%, rgba(90, 40, 15, 0.04) 60%, transparent 80%)',
            filter: 'blur(140px)',
          }}
        />

        {/* Lower-Right Experience Ambient Blur */}
        <div
          className="absolute top-[68%] -right-24 w-[550px] h-[550px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(254, 128, 64, 0.15) 0%, rgba(140, 60, 25, 0.04) 55%, transparent 75%)',
            filter: 'blur(130px)',
          }}
        />

        {/* Footer Ambient Warmth Blur */}
        <div
          className="absolute bottom-0 left-[25%] w-[650px] h-[350px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(ellipse at bottom, rgba(254, 128, 64, 0.16) 0%, transparent 70%)',
            filter: 'blur(110px)',
          }}
        />
      </div>

      {/* Loading Intro Experience */}
      <LoadingExperience progress={preloadProgress} />

      {/* Floating Bottom-Right AI Assistant Icon & Modal */}
      <RecruiterChatModal hideTrigger={false} />

      <main className="relative z-10 bg-transparent min-h-screen overflow-x-hidden text-[#CCCCCC]">
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
