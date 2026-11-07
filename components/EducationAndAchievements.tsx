'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';

export default function EducationAndAchievements() {
  return (
    <section
      id="education"
      className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden bg-transparent"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212, 255, 63, 0.3) 0%, transparent 70%)',
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
            Academic Background
          </span>
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl text-[#3a0f34]">
            Formal <span className="text-[#eaaa00]">Education</span>
          </h2>
        </motion.div>
        <div
          className="mx-auto mt-4 h-1 w-20 rounded-full"
          style={{ background: 'linear-gradient(90deg, #3a0f34, #eaaa00, #3a0f34)' }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="p-8 md:p-10 rounded-3xl border border-[#eaaa00]/30 hover:border-[#eaaa00]/60 transition-all duration-300 relative overflow-hidden group shadow-xl text-[#3a0f34] backdrop-blur-md"
            style={{ background: 'rgba(221, 227, 232, 0.92)' }}
          >
            {/* Top gradient highlight */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#eaaa00] via-[#3a0f34] to-[#eaaa00]" />

            {/* macOS Window Controls */}
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#3a0f34]/15">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e34234]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#eaaa00]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#3a0f34]/20" />
              </div>
              <span className="text-[10px] font-mono text-[#3a0f34]/60 tracking-wider">
                Academics_SRM_IST.app
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#3a0f34]/10 border border-[#3a0f34]/20 text-[#eaaa00] flex-shrink-0">
                  <GraduationCap className="w-7 h-7 text-[#3a0f34]" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-widest text-[#eaaa00] block mb-1">
                    B.Tech Degree &middot; Undergraduate
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#3a0f34] group-hover:text-[#eaaa00] transition-colors leading-snug">
                    SRM Institute of Science and Technology
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#5e3b58] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#eaaa00]" />
                    <span>Kattankulathur, Chennai, Tamil Nadu, India</span>
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between gap-2">
                <div className="px-4 py-1.5 rounded-full bg-[#eaaa00] text-[#3a0f34] font-black text-sm shadow-md">
                  CGPA: 8.83 / 10
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#5e3b58]">
                  <Calendar className="w-3.5 h-3.5 text-[#eaaa00]" />
                  <span>2023 &ndash; 2027</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-[#3a0f34]/15 pt-6">
              <div className="p-4 rounded-xl bg-white/60 border border-[#3a0f34]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-base font-bold text-[#3a0f34]">
                    Computer Science and Engineering
                  </p>
                  <p className="text-xs text-[#3a0f34] font-semibold flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#eaaa00]" />
                    <span>Specialization: Data Science</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#5e3b58]">
                  <BookOpen className="w-4 h-4 text-[#eaaa00]" />
                  <span>4-Year Engineering Program</span>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-[#3a0f34]/70 mb-3">
                  Key Academic Curriculum
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Data Structures & Algorithms',
                    'Object-Oriented Programming (Java / C++)',
                    'Database Management Systems (MySQL & MongoDB)',
                    'Operating Systems & System Architecture',
                    'Computer Networks',
                    'Deep Learning & Convolutional Neural Networks',
                    'Full-Stack Web Engineering',
                  ].map((subject) => (
                    <span
                      key={subject}
                      className="text-xs px-3 py-1.5 rounded-lg bg-[#3a0f34]/10 border border-[#3a0f34]/15 text-[#3a0f34] font-medium"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
