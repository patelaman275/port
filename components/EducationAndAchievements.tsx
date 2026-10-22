'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Sparkles, BookOpen } from 'lucide-react';

export default function EducationAndAchievements() {
  return (
    <section
      id="education"
      className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: '#080b07' }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(29, 185, 84, 0.12) 0%, transparent 70%)',
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
            Academic Background
          </p>
          <h2 className="font-black tracking-tight text-3xl md:text-5xl text-white">
            Formal <span className="text-[#1ed760]">Education</span>
          </h2>
        </motion.div>
        <div
          className="mx-auto mt-5 h-px w-20"
          style={{ background: 'linear-gradient(90deg, transparent, #1DB954, transparent)' }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="p-8 md:p-10 rounded-3xl glass-card border border-[#1DB954]/30 hover:border-[#1DB954]/60 transition-all duration-300 relative overflow-hidden group shadow-[0_15px_50px_rgba(0,0,0,0.55)]">
            {/* Top gradient highlight */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0d9488] via-[#1DB954] to-[#1ed760]" />

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#1DB954]/15 border border-[#1DB954]/30 text-[#1ed760] flex-shrink-0">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-widest text-[#1ed760] block mb-1">
                    B.Tech Degree &middot; Undergraduate
                  </span>
                  <h3 className="text-2xl font-black text-white group-hover:text-[#1ed760] transition-colors leading-snug">
                    SRM Institute of Science and Technology
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/60 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#1DB954]" />
                    <span>Kattankulathur, Chennai, Tamil Nadu, India</span>
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between gap-2">
                <div className="px-4 py-1.5 rounded-full bg-[#1DB954]/15 border border-[#1DB954]/40 text-[#1ed760] font-black text-sm shadow-[0_0_15px_rgba(29,185,84,0.25)]">
                  CGPA: 8.83 / 10
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/50">
                  <Calendar className="w-3.5 h-3.5 text-[#1DB954]" />
                  <span>2023 – 2027</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-base font-bold text-white">
                    Computer Science and Engineering
                  </p>
                  <p className="text-xs text-[#1ed760] font-medium flex items-center gap-1.5 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Specialization: Data Science</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <BookOpen className="w-4 h-4 text-[#1DB954]" />
                  <span>4-Year Engineering Program</span>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-white/50 mb-3">
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
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80"
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
