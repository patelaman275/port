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
} from 'lucide-react';

export default function ResumeSection() {
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  return (
    <section
      id="resume"
      className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden bg-transparent"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(212, 255, 63, 0.3) 0%, transparent 65%)',
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
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#3a0f34] text-[#eaaa00] text-xs tracking-[0.25em] uppercase font-bold mb-3 shadow-sm border border-[#eaaa00]/30">
            Curriculum Vitae
          </span>
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl text-[#3a0f34]">
            Official <span className="text-[#eaaa00]">Resume</span>
          </h2>
        </motion.div>
        <div
          className="mx-auto mt-4 h-1 w-20 rounded-full"
          style={{ background: 'linear-gradient(90deg, #3a0f34, #eaaa00, #3a0f34)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div
          className="p-8 md:p-12 rounded-3xl border border-[#eaaa00]/30 hover:border-[#eaaa00]/60 shadow-xl relative overflow-hidden group text-[#3a0f34] backdrop-blur-md"
          style={{ background: 'rgba(221, 227, 232, 0.92)' }}
        >
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#eaaa00] via-[#3a0f34] to-[#eaaa00]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Summary & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3a0f34]/10 border border-[#3a0f34]/20 text-xs font-bold text-[#3a0f34]">
                <span className="w-2 h-2 rounded-full bg-[#eaaa00]" />
                <span>Updated &amp; Verified Resume (October 2026)</span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#3a0f34] leading-tight">
                  Aman Patel
                </h3>
                <p className="text-sm text-[#eaaa00] font-bold mt-1">
                  B.Tech CSE (Data Science) @ SRM IST &middot; CGPA: 8.83/10
                </p>
              </div>

              <p className="text-sm text-[#5e3b58] leading-relaxed font-normal">
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
                  <div key={item} className="flex items-center gap-2 text-xs text-[#3a0f34]/90 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#eaaa00] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Contact Pill Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#5e3b58]">
                <a
                  href="mailto:amanpatelsrm@gmail.com"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3a0f34]/10 border border-[#3a0f34]/15 hover:text-[#eaaa00] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#eaaa00]" />
                  <span>amanpatelsrm@gmail.com</span>
                </a>
                <a
                  href="tel:+919918318385"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3a0f34]/10 border border-[#3a0f34]/15 hover:text-[#eaaa00] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#eaaa00]" />
                  <span>+91 9918318385</span>
                </a>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3a0f34]/10 border border-[#3a0f34]/15">
                  <MapPin className="w-3.5 h-3.5 text-[#eaaa00]" />
                  <span>Lucknow, UP, India</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="/resume.pdf"
                  download="Aman_Patel_Resume.pdf"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs text-[#3a0f34] bg-[#eaaa00] hover:bg-[#3a0f34] hover:text-[#eaaa00] transition-all cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs text-[#3a0f34] bg-[#3a0f34]/10 hover:bg-[#3a0f34]/20 border border-[#3a0f34]/20 transition-all cursor-pointer shadow-sm"
                >
                  <ExternalLink className="w-4 h-4 text-[#eaaa00]" />
                  <span>Open PDF in Tab</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs text-[#3a0f34]/80 hover:text-[#3a0f34] bg-white/60 border border-[#3a0f34]/15 transition-all cursor-pointer"
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
                className="relative rounded-2xl bg-white/70 border border-[#eaaa00]/40 p-5 shadow-lg overflow-hidden cursor-pointer group/card hover:border-[#eaaa00] transition-all duration-300"
              >
                {/* Header preview thumbnail */}
                <div className="flex items-center justify-between pb-3 border-b border-[#3a0f34]/15 mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#eaaa00]" />
                    <span className="text-xs font-bold text-[#3a0f34] tracking-wide">
                      Aman_Patel_Resume.pdf
                    </span>
                  </div>
                  <span className="text-[10px] text-[#3a0f34] bg-[#eaaa00] font-black px-2 py-0.5 rounded-full font-mono">
                    1 Page &middot; PDF
                  </span>
                </div>

                {/* Simulated document representation */}
                <div className="space-y-3 opacity-80 group-hover/card:opacity-100 transition-opacity">
                  <div className="h-4 bg-[#3a0f34]/20 rounded w-1/2" />
                  <div className="h-2 bg-[#3a0f34]/10 rounded w-3/4" />
                  <div className="h-px bg-[#3a0f34]/10 my-2" />
                  <div className="space-y-1.5">
                    <div className="h-2.5 bg-[#eaaa00]/40 rounded w-1/3" />
                    <div className="h-2 bg-[#3a0f34]/10 rounded w-full" />
                    <div className="h-2 bg-[#3a0f34]/10 rounded w-5/6" />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="h-2.5 bg-[#3a0f34]/30 rounded w-1/4" />
                    <div className="h-2 bg-[#3a0f34]/10 rounded w-full" />
                    <div className="h-2 bg-[#3a0f34]/10 rounded w-4/5" />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="h-2.5 bg-[#eaaa00]/30 rounded w-1/3" />
                    <div className="h-2 bg-[#3a0f34]/10 rounded w-11/12" />
                  </div>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#3a0f34]/90 backdrop-blur-xs flex flex-col items-center justify-center gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                  <div className="w-12 h-12 rounded-full bg-[#eaaa00] text-[#3a0f34] flex items-center justify-center shadow-lg font-bold">
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
            className="relative w-full max-w-4xl h-[88vh] bg-black rounded-2xl border-2 border-[#D4ff3f] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* macOS Preview Window Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/15 bg-black/80 backdrop-blur-xl">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 mr-2">
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="w-3 h-3 rounded-full bg-[#e34234] hover:opacity-80 transition-opacity cursor-pointer shadow-sm"
                    title="Close"
                  />
                  <span className="w-3 h-3 rounded-full bg-[#D4ff3f] shadow-sm" title="Minimize" />
                  <span className="w-3 h-3 rounded-full bg-white/25 shadow-sm" title="Expand" />
                </div>
                <FileText className="w-4 h-4 text-[#D4ff3f]" />
                <span className="font-semibold text-xs tracking-tight text-white">
                  Aman_Patel_Resume.pdf — Preview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/resume.pdf"
                  download="Aman_Patel_Resume.pdf"
                  className="px-3.5 py-1.5 rounded-full bg-[#D4ff3f] text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-white transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
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
