'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Cpu, Cloud, Code } from 'lucide-react';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  type: string;
  url?: string;
  icon: React.ReactNode;
  skills: string[];
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    title: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    type: 'Credly Verified',
    url: 'https://www.credly.com/badges/004e33b3-890d-423f-bbd5-cda6f15d52ed/public_url',
    icon: <Cpu className="w-5 h-5 text-[#FE8040]" />,
    skills: ['Generative AI', 'Amazon Bedrock', 'Foundation Models', 'Responsible AI'],
  },
  {
    id: 2,
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    type: 'Credly Verified',
    url: 'https://www.credly.com/badges/0eaec43f-c20f-42e1-a781-1d5717784400/public_url',
    icon: <Cloud className="w-5 h-5 text-[#FE8040]" />,
    skills: ['Cloud Architecture', 'Core AWS Services', 'IAM Security', 'Cloud Economics'],
  },
  {
    id: 3,
    title: 'Java Programming (Elite Certificate)',
    issuer: 'NPTEL IIT (via SWAYAM)',
    type: 'Ministry of Education Credential',
    icon: <Code className="w-5 h-5 text-[#FE8040]" />,
    skills: ['Object-Oriented Programming', 'Multithreading', 'Collections', 'Design Patterns'],
  },
  {
    id: 4,
    title: 'Introduction to Machine Learning',
    issuer: 'NPTEL IIT Kharagpur',
    type: 'IIT Kharagpur Credential',
    icon: <Award className="w-5 h-5 text-[#FE8040]" />,
    skills: ['Supervised Learning', 'Neural Networks', 'Feature Engineering', 'Optimization'],
  },
  {
    id: 5,
    title: 'SQL Foundations',
    issuer: 'Coursera (Oct 2026)',
    type: 'Verified Course Credential',
    icon: <Code className="w-5 h-5 text-[#FE8040]" />,
    skills: ['Relational Database Queries', 'JOINs & Aggregations', 'Subqueries', 'Database Normalization'],
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-14 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#191919] border border-[#303030] text-[#FE8040] text-xs font-bold tracking-wider uppercase shadow-sm mb-3 font-mono">
            <span>Verified Credentials</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Professional <span className="text-[#FE8040]">Certifications</span>
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CERTIFICATIONS.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-xl border border-[#303030] hover:border-[#FE8040] bg-[#191919] transition-all flex flex-col justify-between shadow-sm group"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#121212] border border-[#303030]">
                    {cert.icon}
                  </div>
                  <span className="text-[10px] text-[#FE8040] font-mono font-semibold bg-[#121212] border border-[#303030] px-2.5 py-1 rounded-md">
                    {cert.type}
                  </span>
                </div>

                <h3
                  className="font-bold text-[#F5F5F5] text-base group-hover:text-[#FE8040] transition-colors mb-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {cert.title}
                </h3>
                <p className="text-xs text-[#999999] mb-4">{cert.issuer}</p>

                {/* Skills acquired */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-[#121212] text-[#CCCCCC] border border-[#303030] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verify Link */}
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121212] hover:bg-[#FE8040] text-[#FE8040] hover:text-[#0F0F0F] border border-[#303030] hover:border-[#FE8040] font-semibold text-xs transition-all w-fit cursor-pointer"
                >
                  <span>Verify on Credly</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
