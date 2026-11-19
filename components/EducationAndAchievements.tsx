'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, BookOpen, Trophy, ExternalLink, Award } from 'lucide-react';

export default function EducationAndAchievements() {
  return (
    <section id="education" className="relative py-14 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden bg-transparent">
      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#191919] border border-[#303030] text-[#FE8040] text-xs font-bold tracking-wider uppercase shadow-sm mb-3 font-mono">
            <span>Academic Background &amp; Honors</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Education &amp; <span className="text-[#FE8040]">Achievements</span>
          </h2>
        </div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-5 sm:p-8 rounded-xl border border-[#303030] bg-[#191919] text-[#CCCCCC] shadow-md"
        >
          {/* Card Top Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#303030] mb-6">
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-[#121212] border border-[#303030] text-[#FE8040] shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#FE8040] font-semibold block mb-0.5">
                  B.Tech &middot; Computer Science and Engineering (Data Science)
                </span>
                <h3
                  className="text-lg sm:text-2xl font-bold text-[#F5F5F5] leading-snug"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  SRM Institute of Science and Technology
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#999999] mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FE8040]" />
                  <span>Kattankulathur, Chennai, Tamil Nadu, India</span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#252525]">
              <div className="px-3.5 py-1 rounded-lg bg-[#FE8040] text-[#0F0F0F] font-bold text-xs shadow-sm">
                CGPA: 8.83 / 10
              </div>
              <div className="flex items-center gap-1 text-xs text-[#777777] font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>2023 &ndash; 2027</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold text-[#FE8040] uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Core CS Coursework &amp; Specialization</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Data Structures and Algorithms',
                'Object-Oriented Programming (Java/C++)',
                'Database Management Systems (DBMS)',
                'Operating Systems',
                'Computer Networks',
                'Deep Learning & AI/ML',
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

        {/* Achievements Grid (From Resume) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          {/* 1st Prize Techknow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-5 rounded-xl border border-[#303030] bg-[#191919] flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#FE8040]">
                <Trophy className="w-4 h-4" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider">1st Prize</span>
              </div>
              <h4 className="font-bold text-sm text-[#F5F5F5] mb-1">RADAR DETECTOR Project</h4>
              <p className="text-xs text-[#999999]">Awarded at Techknow (2023–2024)</p>
            </div>
            <span className="text-[10px] font-mono text-[#FE8040] mt-3 block">Techknow 2023–2024</span>
          </motion.div>

          {/* 3rd Prize MOZO-HACK */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-5 rounded-xl border border-[#303030] bg-[#191919] flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#FE8040]">
                <Award className="w-4 h-4" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider">3rd Prize</span>
              </div>
              <h4 className="font-bold text-sm text-[#F5F5F5] mb-1">Campus Connect Project</h4>
              <p className="text-xs text-[#999999]">Awarded at MOZO-HACK (7 March 2024)</p>
            </div>
            <span className="text-[10px] font-mono text-[#FE8040] mt-3 block">MOZO-HACK 2024</span>
          </motion.div>

          {/* LeetCode 250+ solved & 100 days badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-5 rounded-xl border border-[#303030] bg-[#191919] flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#FE8040]">
                <Trophy className="w-4 h-4" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Competitive Programming</span>
              </div>
              <h4 className="font-bold text-sm text-[#F5F5F5] mb-1">LeetCode: 250+ Solved</h4>
              <p className="text-xs text-[#999999]">100 Days Consecutive Problem Solving Badge</p>
            </div>
            <a
              href="https://leetcode.com/u/aman24256/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-[#FE8040] hover:underline mt-3"
            >
              <span>Verify Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
