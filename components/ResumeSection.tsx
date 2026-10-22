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
          <span className="inline-block px-3.5 py-1 rounded-full bg-black text-[#D4ff3f] text-xs tracking-[0.35em] uppercase font-black mb-3 shadow-sm">
            Curriculum Vitae
          </span>
          <h2 className="font-black tracking-tight text-3xl md:text-5xl text-black">
            Official <span className="text-[#e34234]">Resume</span>
          </h2>
        </motion.div>
        <div
          className="mx-auto mt-5 h-1 w-20 rounded-full"
          style={{ background: 'linear-gradient(90deg, #e34234, #000000, #D4ff3f)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="p-8 md:p-12 rounded-3xl bg-black border-2 border-black hover:border-[#D4ff3f] shadow-2xl relative overflow-hidden group">
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#e34234] via-[#000000] to-[#D4ff3f]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Summary & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-black text-[#D4ff3f]">
                <Sparkles className="w-3.5 h-3.5 text-[#D4ff3f]" />
                <span>Updated & Verified Resume (October 2026)</span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  Aman Patel
                </h3>
                <p className="text-sm text-[#D4ff3f] font-bold mt-1">
                  B.Tech CSE (Data Science) @ SRM IST &middot; CGPA: 8.83/10
                </p>
              </div>

              <p className="text-sm text-white/80 leading-relaxed font-normal">
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
                  <div key={item} className="flex items-center gap-2 text-xs text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#D4ff3f] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Contact Pill Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-white/70">
                <a
                  href="mailto:amanpatelsrm@gmail.com"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:text-[#D4ff3f] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#e34234]" />
                  <span>amanpatelsrm@gmail.com</span>
                </a>
                <a
                  href="tel:+919918318385"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:text-[#D4ff3f] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#e34234]" />
                  <span>+91 9918318385</span>
                </a>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-[#e34234]" />
                  <span>Lucknow, UP, India</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="/resume.pdf"
                  download="Aman_Patel_Resume.pdf"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-xs text-black bg-[#D4ff3f] hover:bg-[#cbb3e8] transition-all cursor-pointer shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-xs text-white bg-[#e34234] hover:bg-white hover:text-black transition-all cursor-pointer shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open PDF in Tab</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs text-white/80 hover:text-white bg-white/10 border border-white/20 transition-all cursor-pointer"
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
                className="relative rounded-2xl bg-white/5 border border-white/15 p-5 shadow-2xl overflow-hidden cursor-pointer group/card hover:border-[#D4ff3f] transition-all duration-300"
              >
                {/* Header preview thumbnail */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#D4ff3f]" />
                    <span className="text-xs font-bold text-white tracking-wide">
                      Aman_Patel_Resume.pdf
                    </span>
                  </div>
                  <span className="text-[10px] text-black bg-[#D4ff3f] font-black px-2 py-0.5 rounded-full font-mono">
                    1 Page &middot; PDF
                  </span>
                </div>

                {/* Simulated document representation */}
                <div className="space-y-3 opacity-80 group-hover/card:opacity-100 transition-opacity">
                  <div className="h-4 bg-white/20 rounded w-1/2" />
                  <div className="h-2 bg-white/10 rounded w-3/4" />
                  <div className="h-px bg-white/10 my-2" />
                  <div className="space-y-1.5">
                    <div className="h-2.5 bg-[#D4ff3f]/40 rounded w-1/3" />
                    <div className="h-2 bg-white/10 rounded w-full" />
                    <div className="h-2 bg-white/10 rounded w-5/6" />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="h-2.5 bg-[#e34234]/40 rounded w-1/4" />
                    <div className="h-2 bg-white/10 rounded w-full" />
                    <div className="h-2 bg-white/10 rounded w-4/5" />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="h-2.5 bg-[#cbb3e8]/40 rounded w-1/3" />
                    <div className="h-2 bg-white/10 rounded w-11/12" />
                  </div>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/85 backdrop-blur-xs flex flex-col items-center justify-center gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                  <div className="w-12 h-12 rounded-full bg-[#D4ff3f] text-black flex items-center justify-center shadow-lg font-bold">
                    <Eye className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-white">Click to Preview Full Resume</span>
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
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/20 bg-black">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#D4ff3f]" />
                <span className="font-black text-sm text-white">
                  Aman Patel — Official Resume
                </span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/resume.pdf"
                  download="Aman_Patel_Resume.pdf"
                  className="px-3.5 py-1.5 rounded-lg bg-[#D4ff3f] text-black font-black text-xs flex items-center gap-1.5 hover:bg-white transition-colors"
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
