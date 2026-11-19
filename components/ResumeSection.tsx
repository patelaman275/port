'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  Eye,
  Mail,
  Phone,
  MapPin,
  X,
} from 'lucide-react';
import LucknowEarthModal from '@/components/LucknowEarthModal';

export default function ResumeSection() {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showEarthModal, setShowEarthModal] = useState(false);

  return (
    <section
      id="resume"
      className="relative py-14 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden bg-transparent"
    >
      {/* Earth Modal triggerable from location badge */}
      <LucknowEarthModal isOpen={showEarthModal} onClose={() => setShowEarthModal(false)} />

      {/* Header */}
      <div className="text-center mb-10 sm:mb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-md bg-[#191919] border border-[#303030] text-[#FE8040] text-xs font-mono font-bold tracking-wider uppercase mb-3 shadow-sm">
            Curriculum Vitae
          </span>
          <h2
            className="font-bold tracking-tight text-3xl md:text-5xl text-[#F5F5F5]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Official <span className="text-[#FE8040]">Resume</span>
          </h2>
        </motion.div>
        <div
          className="mx-auto mt-4 h-0.5 w-16 rounded-full"
          style={{ background: 'linear-gradient(90deg, #303030, #FE8040, #303030)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="p-5 sm:p-8 md:p-12 rounded-2xl border border-[#303030] hover:border-[#FE8040]/50 shadow-2xl relative overflow-hidden group bg-[#191919] transition-all duration-300">
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FE8040] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Summary & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#303030] text-xs font-mono text-[#CCCCCC]">
                <span className="w-2 h-2 rounded-full bg-[#FE8040] animate-pulse" />
                <span>Updated &amp; Verified Resume (2026)</span>
              </div>

              <div>
                <h3
                  className="text-2xl md:text-3xl font-bold text-[#F5F5F5] leading-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Aman Patel
                </h3>
                <p className="text-xs sm:text-sm text-[#FE8040] font-mono mt-1">
                  B.Tech CSE (Data Science) @ SRM IST &middot; CGPA: 8.83/10
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed font-normal">
                Full-stack software engineer and machine learning practitioner with hands-on
                experience deploying scalable AI platforms, distributed real-time coordination
                systems, and published deep learning research. Seeking entry-level software engineer
                opportunities focused on backend development and application engineering.
              </p>

              {/* Key Resume Highlights Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  'AWS Certified AI & Cloud Practitioner',
                  'ICCCNet 2026 Published Researcher',
                  'LeetCode 250+ Solved (100 Days Badge)',
                  'Real-Time WebSockets & Socket.io',
                  'Dual-Pipeline CNN 98.2% Accuracy',
                  '1st Prize Techknow & 3rd MOZO-HACK',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-[#999999] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FE8040] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Contact Pill Row */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs text-[#999999]">
                <a
                  href="mailto:amanpatelsrm@gmail.com"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121212] border border-[#303030] hover:text-[#FE8040] hover:border-[#FE8040] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FE8040]" />
                  <span>amanpatelsrm@gmail.com</span>
                </a>
                <a
                  href="tel:+919918318385"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121212] border border-[#303030] hover:text-[#FE8040] hover:border-[#FE8040] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FE8040]" />
                  <span>+91 9918318385</span>
                </a>
                <button
                  type="button"
                  onClick={() => setShowEarthModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121212] border border-[#303030] hover:text-[#FE8040] hover:border-[#FE8040] transition-colors cursor-pointer"
                  title="Click to view Lucknow on 3D Earth"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FE8040]" />
                  <span>Lucknow, UP, India</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="/resume.pdf"
                  download="Aman_Patel_Resume.pdf"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-bold text-xs text-[#0F0F0F] bg-[#FE8040] hover:bg-[#FF995F] transition-all cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-bold text-xs text-[#F5F5F5] bg-[#121212] hover:bg-[#222222] border border-[#303030] hover:border-[#FE8040] transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-[#FE8040]" />
                  <span>Open in Tab</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-xs text-[#999999] hover:text-[#F5F5F5] bg-[#121212] hover:bg-[#222222] border border-[#303030] transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Quick Preview</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Resume Document Card */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setShowPreviewModal(true)}
                className="relative rounded-xl bg-[#121212] border border-[#303030] p-5 shadow-lg overflow-hidden cursor-pointer group/card hover:border-[#FE8040] transition-all duration-300"
              >
                {/* Header preview thumbnail */}
                <div className="flex items-center justify-between pb-3 border-b border-[#303030] mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#FE8040]" />
                    <span className="text-xs font-bold text-[#F5F5F5] font-mono tracking-wide">
                      Aman_Patel_Resume.pdf
                    </span>
                  </div>
                  <span className="text-[10px] text-[#0F0F0F] bg-[#FE8040] font-black px-2 py-0.5 rounded-full font-mono">
                    1 Page &middot; PDF
                  </span>
                </div>

                {/* Simulated document representation */}
                <div className="space-y-3 opacity-60 group-hover/card:opacity-90 transition-opacity">
                  <div className="h-3.5 bg-[#FE8040]/30 rounded w-1/2" />
                  <div className="h-2 bg-[#303030] rounded w-3/4" />
                  <div className="h-px bg-[#303030] my-2" />
                  <div className="space-y-1.5">
                    <div className="h-2 bg-[#FE8040]/20 rounded w-1/3" />
                    <div className="h-1.5 bg-[#252525] rounded w-full" />
                    <div className="h-1.5 bg-[#252525] rounded w-5/6" />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="h-2 bg-[#FE8040]/20 rounded w-1/4" />
                    <div className="h-1.5 bg-[#252525] rounded w-full" />
                    <div className="h-1.5 bg-[#252525] rounded w-4/5" />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="h-2 bg-[#FE8040]/20 rounded w-1/3" />
                    <div className="h-1.5 bg-[#252525] rounded w-11/12" />
                  </div>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#0F0F0F]/90 backdrop-blur-xs flex flex-col items-center justify-center gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                  <div className="w-10 h-10 rounded-full bg-[#FE8040] text-[#0F0F0F] flex items-center justify-center shadow-lg font-bold">
                    <Eye className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#F5F5F5] font-mono">Click to Preview Full Resume</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Full Preview Modal */}
      {showPreviewModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setShowPreviewModal(false)}
        >
          <div
            className="relative w-full max-w-4xl h-[88vh] bg-[#0F0F0F] rounded-2xl border border-[#303030] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Window Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#303030] bg-[#121212]">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#FE8040]" />
                <span className="font-semibold text-xs tracking-tight text-[#F5F5F5] font-mono">
                  Aman_Patel_Resume.pdf — Preview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/resume.pdf"
                  download="Aman_Patel_Resume.pdf"
                  className="px-3 py-1.5 rounded-lg bg-[#FE8040] text-[#0F0F0F] font-bold text-xs flex items-center gap-1.5 hover:bg-[#FF995F] transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="w-7 h-7 rounded-lg bg-[#191919] hover:bg-[#222222] text-[#999999] hover:text-[#F5F5F5] border border-[#303030] flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded PDF iframe */}
            <div className="flex-1 w-full h-full bg-[#111111]">
              <iframe
                src="/resume.pdf#toolbar=1"
                title="Aman Patel Resume PDF"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
