'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  Eye,
  Sparkles,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function ResumeSection() {
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  return (
    <section
      id="resume"
      className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #080b07 0%, #0c160e 50%, #080b07 100%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(29, 185, 84, 0.15) 0%, transparent 65%)',
        }}
      />

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
          whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-[0.4em] uppercase mb-3 font-semibold text-[#1DB954]">
            Curriculum Vitae
          </p>
          <h2 className="font-black tracking-tight text-3xl md:text-5xl text-white">
            Official <span className="text-[#1ed760]">Resume</span>
          </h2>
        </motion.div>
        <div
          className="mx-auto mt-5 h-px w-20"
          style={{ background: 'linear-gradient(90deg, transparent, #1DB954, transparent)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="p-8 md:p-12 rounded-3xl glass-card border border-[#1DB954]/30 shadow-[0_15px_50px_rgba(0,0,0,0.6)] relative overflow-hidden group">
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0d9488] via-[#1DB954] to-[#1ed760]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Summary & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1DB954]/15 border border-[#1DB954]/30 text-xs font-semibold text-[#1ed760]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Updated & Verified Resume (October 2026)</span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  Aman Patel
                </h3>
                <p className="text-sm text-[#1ed760] font-medium mt-1">
                  B.Tech CSE (Data Science) @ SRM IST &middot; CGPA: 8.83/10
                </p>
              </div>

              <p className="text-sm text-white/75 leading-relaxed">
                Full-stack software engineer and machine learning practitioner with hands-on
                experience deploying scalable AI platforms, distributed real-time coordination
                systems, and published deep learning research. Seeking entry-level software engineer
                opportunities focused on backend development and application engineering.
              </p>

              {/* Key Resume Highlights Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'AWS Certified AI & Cloud Practitioner',
                  'ICCCNet 2026 Published Researcher',
                  'LeetCode 250+ Solved (100 Days Badge)',
                  'Real-Time WebSockets & Socket.io',
                  'Dual-Pipeline CNN 98.2% Accuracy',
                  '1st Prize Techknow & 3rd Prize MOZO-HACK',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-[#1DB954] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Contact Pill Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-white/60">
                <a
                  href="mailto:amanpatelsrm@gmail.com"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:text-[#1ed760] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#1DB954]" />
                  <span>amanpatelsrm@gmail.com</span>
                </a>
                <a
                  href="tel:+919918318385"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:text-[#1ed760] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#1DB954]" />
                  <span>+91 9918318385</span>
                </a>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-[#1DB954]" />
                  <span>Lucknow, UP, India</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="/resume.pdf"
                  download="Aman_Patel_Resume.pdf"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#0d9488] via-[#1DB954] to-[#1ed760] hover:shadow-[0_0_25px_rgba(29,185,84,0.5)] transition-all cursor-pointer shadow-lg shadow-emerald-950/40"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs text-white/90 bg-white/5 border border-white/15 hover:border-[#1DB954]/60 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-[#1ed760]" />
                  <span>Open PDF in Tab</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs text-white/70 hover:text-white bg-transparent border border-white/10 hover:border-white/30 transition-all cursor-pointer"
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
                className="relative rounded-2xl bg-white/[0.04] border border-white/15 p-5 shadow-2xl overflow-hidden cursor-pointer group/card hover:border-[#1DB954]/60 transition-all duration-300"
              >
                {/* Header preview thumbnail */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#1DB954]" />
                    <span className="text-xs font-bold text-white tracking-wide">
                      Aman_Patel_Resume.pdf
                    </span>
                  </div>
                  <span className="text-[10px] text-[#1ed760] bg-[#1DB954]/15 px-2 py-0.5 rounded-full font-mono">
                    1 Page &middot; PDF
                  </span>
                </div>

                {/* Simulated document representation */}
                <div className="space-y-3 opacity-80 group-hover/card:opacity-100 transition-opacity">
                  <div className="h-4 bg-white/20 rounded w-1/2" />
                  <div className="h-2 bg-white/10 rounded w-3/4" />
                  <div className="h-px bg-white/10 my-2" />
                  <div className="space-y-1.5">
                    <div className="h-2.5 bg-[#1DB954]/30 rounded w-1/3" />
                    <div className="h-2 bg-white/10 rounded w-full" />
                    <div className="h-2 bg-white/10 rounded w-5/6" />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="h-2.5 bg-[#1ed760]/30 rounded w-1/4" />
                    <div className="h-2 bg-white/10 rounded w-full" />
                    <div className="h-2 bg-white/10 rounded w-4/5" />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="h-2.5 bg-[#10b981]/30 rounded w-1/3" />
                    <div className="h-2 bg-white/10 rounded w-11/12" />
                  </div>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                  <div className="w-12 h-12 rounded-full bg-[#1DB954] text-white flex items-center justify-center shadow-lg shadow-[#1DB954]/40">
                    <Eye className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-white">Click to Preview Full Resume</span>
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
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setShowPreviewModal(false)}
        >
          <div
            className="relative w-full max-w-4xl h-[88vh] bg-[#0c120a] rounded-2xl border border-[#1DB954]/50 shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080b07]">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#1DB954]" />
                <span className="font-bold text-sm text-white">
                  Aman Patel — Official Resume
                </span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/resume.pdf"
                  download="Aman_Patel_Resume.pdf"
                  className="px-3.5 py-1.5 rounded-lg bg-[#1DB954] text-black font-bold text-xs flex items-center gap-1.5 hover:bg-[#1ed760] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 text-white/80 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Embedded PDF iframe */}
            <div className="flex-1 w-full h-full bg-[#111]">
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
