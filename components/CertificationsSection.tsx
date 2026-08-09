'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, Cpu, Cloud, Layers } from 'lucide-react';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  url: string;
  icon: React.ReactNode;
  skills: string[];
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    title: 'TensorFlow Developer Certificate',
    issuer: 'DeepLearning.AI / Google',
    date: '2026',
    credentialId: 'TF-DEV-884920',
    url: 'https://github.com/patelaman275',
    icon: <Cpu className="w-6 h-6 text-[#1DB954]" />,
    skills: ['TensorFlow', 'Computer Vision', 'NLP', 'Time Series Forecasting'],
  },
  {
    id: 2,
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI (Coursera)',
    date: '2025',
    credentialId: 'DL-SPEC-339281',
    url: 'https://github.com/patelaman275',
    icon: <Layers className="w-6 h-6 text-[#1ed760]" />,
    skills: ['Neural Networks', 'CNNs', 'Structuring ML Projects', 'Hyperparameter Tuning'],
  },
  {
    id: 3,
    title: 'Associate Cloud Engineer',
    issuer: 'Google Cloud (GCP)',
    date: '2025',
    credentialId: 'GCP-ACE-774921',
    url: 'https://github.com/patelaman275',
    icon: <Cloud className="w-6 h-6 text-[#1DB954]" />,
    skills: ['GCP Infrastructure', 'App Engine', 'Kubernetes Engine', 'Cloud IAM'],
  },
  {
    id: 4,
    title: 'Meta Front-End Developer',
    issuer: 'Meta (Coursera)',
    date: '2025',
    credentialId: 'META-FED-992083',
    url: 'https://github.com/patelaman275',
    icon: <ShieldCheck className="w-6 h-6 text-[#1ed760]" />,
    skills: ['React.js', 'UI/UX Design Systems', 'Web Development', 'Version Control'],
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
      className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: '#080b07' }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 animate-pulse"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(29, 185, 84, 0.08) 0%, transparent 60%)',
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
            Credentials
          </p>
          <h2 className="font-black tracking-tight text-3xl md:text-5xl text-white">
            Professional <span className="text-[#1ed760]">Certifications</span>
          </h2>
        </motion.div>
        <div
          className="mx-auto mt-5 h-px w-20"
          style={{ background: 'linear-gradient(90deg, transparent, #1DB954, transparent)' }}
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
            className="group relative p-7 rounded-2xl glass-card border border-white/5 hover:border-[#1DB954]/50 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)] overflow-hidden bg-white/[0.02]"
            whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(29, 185, 84, 0.15)' }}
          >
            {/* Active Card Rotating Conic Gradient Border Glow */}
            <div className="absolute -inset-[1px] rounded-2xl bg-[conic-gradient(from_0deg_at_50%_50%,#1DB954,transparent,#1ed760,transparent)] opacity-0 group-hover:opacity-40 blur-xs -z-10 animate-[spin_8s_linear_infinite] transition-opacity duration-300 pointer-events-none" />

            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#1DB954]/10 border border-[#1DB954]/20 flex-shrink-0">
                {cert.icon}
              </div>
              <span className="text-xs text-[#1DB954] font-semibold bg-[#1DB954]/10 border border-[#1DB954]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {cert.date}
              </span>
            </div>

            <h3 className="font-bold text-white text-lg group-hover:text-[#1ed760] transition-colors duration-200 mb-1">
              {cert.title}
            </h3>
            <p className="text-xs text-white/50 mb-3">{cert.issuer} &middot; Credential ID: {cert.credentialId}</p>

            {/* Skills acquired */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Link button */}
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(cert.url, '_blank', 'noopener,noreferrer');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-[#1ed760] transition-colors cursor-pointer pointer-events-auto"
            >
              <span>View Credential</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
