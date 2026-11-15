'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';

export default function EducationAndAchievements() {
  return (
    <section id="education" className="relative py-16 sm:py-20 px-6 md:px-12 lg:px-20 overflow-hidden bg-transparent">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#191919] border border-[#303030] text-[#FE8040] text-xs font-bold tracking-wider uppercase shadow-sm mb-3 font-mono">
            <span>Academic Background</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Education &amp; <span className="text-[#FE8040]">Academics</span>
          </h2>
        </div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8 rounded-xl border border-[#303030] bg-[#191919] text-[#CCCCCC] shadow-md"
        >
          {/* Card Top Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#303030] mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#121212] border border-[#303030] text-[#FE8040] shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#FE8040] font-semibold block mb-0.5">
                  B.Tech &middot; Computer Science and Engineering
                </span>
                <h3
                  className="text-xl sm:text-2xl font-bold text-[#F5F5F5]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  SRM Institute of Science and Technology
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#999999] mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FE8040]" />
                  <span>Chennai, Tamil Nadu, India</span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1.5 shrink-0">
              <div className="px-3.5 py-1 rounded-lg bg-[#FE8040] text-[#0F0F0F] font-bold text-xs shadow-sm">
                CGPA: 8.83 / 10
              </div>
              <div className="flex items-center gap-1 text-xs text-[#777777] font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>2022 &ndash; 2026</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold text-[#FE8040] uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Core Specialization &amp; Coursework</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Data Science & Analytics',
                'Deep Learning & CNNs',
                'Object-Oriented Programming (Java)',
                'Database Management Systems',
                'Operating Systems & Networking',
                'Data Structures & Algorithms',
              ].map((course) => (
                <span
                  key={course}
                  className="text-xs px-2.5 py-1 rounded-md bg-[#121212] text-[#CCCCCC] border border-[#303030]"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
