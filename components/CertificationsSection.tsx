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
    type: 'Foundational Certification',
    url: 'https://www.credly.com/badges/004e33b3-890d-423f-bbd5-cda6f15d52ed/public_url',
    icon: <Cpu className="w-6 h-6 text-[#D4ff3f]" />,
    skills: ['Generative AI', 'Amazon Bedrock', 'Foundation Models', 'Responsible AI', 'ML Workflows'],
  },
  {
    id: 2,
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    type: 'Foundational Certification',
    url: 'https://www.credly.com/badges/0eaec43f-c20f-42e1-a781-1d5717784400/public_url',
    icon: <Cloud className="w-6 h-6 text-[#e34234]" />,
    skills: ['Cloud Architecture', 'AWS Core Services', 'IAM & Security', 'Cloud Economics', 'Billing & Support'],
  },
  {
    id: 3,
    title: 'Java Programming (Elite Certificate)',
    issuer: 'NPTEL IIT (via SWAYAM / NPTEL)',
    type: 'Elite Ministry of Education Credential',
    icon: <Code className="w-6 h-6 text-[#D4ff3f]" />,
    skills: ['Object-Oriented Programming', 'Multithreading', 'Collections Framework', 'Exception Handling', 'Design Patterns'],
  },
  {
    id: 4,
    title: 'Introduction to Machine Learning',
    issuer: 'NPTEL IIT Kharagpur',
    type: 'IIT Kharagpur Credential',
    icon: <Award className="w-6 h-6 text-[#e34234]" />,
    skills: ['Supervised Learning', 'Unsupervised Learning', 'Neural Networks', 'Feature Engineering', 'Model Optimization'],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden bg-transparent"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(212, 255, 63, 0.35) 0%, transparent 60%)',
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
            Credentials
          </span>
          <h2 className="font-black tracking-tight text-3xl md:text-5xl text-black">
            Professional <span className="text-[#e34234]">Certifications</span>
          </h2>
        </motion.div>
        <div
          className="mx-auto mt-5 h-1 w-20 rounded-full"
          style={{ background: 'linear-gradient(90deg, #e34234, #000000, #D4ff3f)' }}
        />
      </div>

      {/* Certifications Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {CERTIFICATIONS.map((cert) => (
          <motion.div
            key={cert.id}
            variants={cardVariants}
            className="group relative p-7 rounded-2xl glass-card border-2 border-black hover:border-[#D4ff3f] transition-all duration-300 shadow-xl overflow-hidden bg-black"
            whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)' }}
          >
            {/* Active Card Rotating Conic Gradient Border Glow */}
            <div className="absolute -inset-[1px] rounded-2xl bg-[conic-gradient(from_0deg_at_50%_50%,#D4ff3f,#cbb3e8,#e34234,#D4ff3f)] opacity-0 group-hover:opacity-40 blur-xs -z-10 animate-[spin_8s_linear_infinite] transition-opacity duration-300 pointer-events-none" />

            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 border border-white/20 flex-shrink-0">
                {cert.icon}
              </div>
              <span className="text-[11px] text-[#D4ff3f] font-bold bg-white/10 border border-white/20 px-2.5 py-1 rounded-full">
                {cert.type}
              </span>
            </div>

            <h3 className="font-black text-white text-lg group-hover:text-[#D4ff3f] transition-colors duration-200 mb-1">
              {cert.title}
            </h3>
            <p className="text-xs text-white/70 mb-3">{cert.issuer}</p>

            {/* Skills acquired */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/90 border border-white/20"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Link button (Credly verification) */}
            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(cert.url, '_blank', 'noopener,noreferrer');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#D4ff3f] text-black font-black text-xs hover:bg-[#cbb3e8] transition-all cursor-pointer pointer-events-auto shadow-sm"
              >
                <span>Verify on Credly</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
