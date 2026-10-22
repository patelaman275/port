'use client';

import { useState, useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import { SoundProvider } from '@/components/SoundContext';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import LoadingExperience from '@/components/LoadingExperience';
import LiveLavenderBackground from '@/components/LiveLavenderBackground';
import RecruiterChatModal from '@/components/RecruiterChatModal';
import PortraitGlitch from '@/components/PortraitGlitch';
import OverlayText from '@/components/OverlayText';
import ProjectCarousel3D from '@/components/ProjectCarousel3D';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import EducationAndAchievements from '@/components/EducationAndAchievements';
import PublicationsSection from '@/components/PublicationsSection';
import ResumeSection from '@/components/ResumeSection';
import Footer from '@/components/Footer';

export default function Home() {
  const sectionRef = useRef<HTMLElement>(null);
  const [preloadProgress, setPreloadProgress] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef });

  // Cinematic 3.2-second smooth startup calibration timer
  useEffect(() => {
    // Preload actual hero portrait
    const heroImg = new window.Image();
    heroImg.src = '/portrait.png';

    const startTime = performance.now();
    const duration = 3200; // 3.2 seconds smooth progression

    let frameId: number;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);

      // Smooth easing curve (accelerates and decelerates smoothly)
      const easedProgress = Math.min(
        100,
        Math.round(
          progressRatio < 0.5
            ? 2 * progressRatio * progressRatio * 100
            : (1 - Math.pow(-2 * progressRatio + 2, 2) / 2) * 100
        )
      );

      setPreloadProgress(easedProgress);

      if (progressRatio < 1) {
        frameId = requestAnimationFrame(updateProgress);
      }
    };

    frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <SoundProvider>
      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Custom Glowing Trailing Cursor */}
      <CustomCursor />

      {/* Living Dynamic Ambient Lavender Background */}
      <LiveLavenderBackground />

      {/* Loading Intro Experience */}
      <LoadingExperience progress={preloadProgress} />

      {/* Floating Quick Action: View / Download Resume & AI Recruiter Hub */}
      <div className="fixed top-5 right-5 z-[9990] flex flex-col items-end gap-2.5">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-black text-[#D4ff3f] font-bold text-xs border-2 border-black shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:bg-[#D4ff3f] hover:text-black hover:border-black transition-all duration-300"
        >
          <span className="w-2 h-2 rounded-full bg-[#e34234] group-hover:bg-black animate-pulse" />
          <span>📄 View Resume</span>
        </a>

        {/* LLM Recruiter Chatbot (Positioned directly below View Resume) */}
        <RecruiterChatModal />
      </div>

      <main className="relative z-10 bg-transparent min-h-screen overflow-x-hidden text-black">
        {/* ══ HERO: Portrait + Overlay Text on Living Lavender Canvas ══════════ */}
        <section
          ref={sectionRef}
          className="relative bg-transparent"
          style={{ height: '160vh' }}
          aria-label="Hero section"
        >
          <div className="sticky top-0 w-full h-screen overflow-hidden bg-transparent">
            {/* Portrait (right side - filling frame seamlessly, zero hard box borders) */}
            <PortraitGlitch scrollYProgress={scrollYProgress} />

            {/* Overlay Text (left side with high-contrast typography) */}
            <OverlayText scrollYProgress={scrollYProgress} />
          </div>
        </section>

        {/* ══ 3D SPRING ROTATION PROJECT CAROUSEL ══════════════════ */}
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
    </SoundProvider>
  );
}
