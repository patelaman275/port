'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Sparkles, BookOpen } from 'lucide-react';

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
          <span className="inline-block px-3.5 py-1 rounded-full bg-black text-[#D4ff3f] text-xs tracking-[0.35em] uppercase font-black mb-3 shadow-sm">
            Academic Background
          </span>
          <h2 className="font-black tracking-tight text-3xl md:text-5xl text-black">
            Formal <span className="text-[#e34234]">Education</span>
          </h2>
        </motion.div>
        <div
          className="mx-auto mt-5 h-1 w-20 rounded-full"
          style={{ background: 'linear-gradient(90deg, #e34234, #000000, #D4ff3f)' }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="p-8 md:p-10 rounded-3xl bg-black border-2 border-black hover:border-[#D4ff3f] transition-all duration-300 relative overflow-hidden group shadow-2xl">
            {/* Top gradient highlight */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#e34234] via-[#000000] to-[#D4ff3f]" />

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/10 border border-white/20 text-[#D4ff3f] flex-shrink-0">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-black tracking-widest text-[#D4ff3f] block mb-1">
                    B.Tech Degree &middot; Undergraduate
                  </span>
                  <h3 className="text-2xl font-black text-white group-hover:text-[#D4ff3f] transition-colors leading-snug">
                    SRM Institute of Science and Technology
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/70 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#e34234]" />
                    <span>Kattankulathur, Chennai, Tamil Nadu, India</span>
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between gap-2">
                <div className="px-4 py-1.5 rounded-full bg-[#D4ff3f] text-black font-black text-sm shadow-md">
                  CGPA: 8.83 / 10
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/60">
                  <Calendar className="w-3.5 h-3.5 text-[#e34234]" />
                  <span>2023 – 2027</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-white/15 pt-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-base font-bold text-white">
                    Computer Science and Engineering
                  </p>
                  <p className="text-xs text-[#D4ff3f] font-medium flex items-center gap-1.5 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Specialization: Data Science</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <BookOpen className="w-4 h-4 text-[#e34234]" />
                  <span>4-Year Engineering Program</span>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-white/60 mb-3">
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
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white/90"
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
