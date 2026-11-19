'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Cpu, Cloud, Code, Sparkles } from 'lucide-react';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  type: string;
  url?: string;
  icon: React.ReactNode;
  skills: string[];
  isHolographic?: boolean;
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
    isHolographic: true,
  },
  {
    id: 2,
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    type: 'Credly Verified',
    url: 'https://www.credly.com/badges/0eaec43f-c20f-42e1-a781-1d5717784400/public_url',
    icon: <Cloud className="w-5 h-5 text-[#FE8040]" />,
    skills: ['Cloud Architecture', 'Core AWS Services', 'IAM Security', 'Cloud Economics'],
    isHolographic: true,
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

function HolographicTiltCard({ cert }: { cert: Certification }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, glareX: 50, glareY: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    setTilt({
      rotX: Number(((py - 0.5) * -16).toFixed(2)),
      rotY: Number(((px - 0.5) * 16).toFixed(2)),
      glareX: Math.round(px * 100),
      glareY: Math.round(py * 100),
      opacity: 0.6,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotX: 0, rotY: 0, glareX: 50, glareY: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        animate={{
          rotateX: tilt.rotX,
          rotateY: tilt.rotY,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="relative h-full p-6 rounded-xl border border-[#303030] hover:border-[#FE8040] bg-[#191919] transition-colors flex flex-col justify-between shadow-lg overflow-hidden group select-none"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Holographic Rainbow Specular Foil Sheen (for AWS badges) */}
        {cert.isHolographic && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: tilt.opacity,
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(254,128,64,0.35) 0%, rgba(56,189,248,0.2) 35%, rgba(168,85,247,0.15) 60%, transparent 80%)`,
              mixBlendMode: 'screen',
            }}
          />
        )}

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#121212] border border-[#303030]">
              {cert.icon}
            </div>
            <div className="flex items-center gap-1.5">
              {cert.isHolographic && (
                <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>3D FOIL</span>
                </span>
              )}
              <span className="text-[10px] text-[#FE8040] font-mono font-semibold bg-[#121212] border border-[#303030] px-2.5 py-1 rounded-md">
                {cert.type}
              </span>
            </div>
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
            className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121212] hover:bg-[#FE8040] text-[#FE8040] hover:text-[#0F0F0F] border border-[#303030] hover:border-[#FE8040] font-semibold text-xs transition-all w-fit cursor-pointer shadow-sm"
          >
            <span>Verify on Credly</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </motion.div>
    </div>
  );
}

export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-14 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#191919] border border-[#303030] text-[#FE8040] text-xs font-bold tracking-wider uppercase shadow-sm mb-3 font-mono">
            <span>Verified Credentials &amp; 3D Holographic Badges</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Professional <span className="text-[#FE8040]">Certifications</span>
          </h2>
        </div>

        {/* Certifications Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CERTIFICATIONS.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              <HolographicTiltCard cert={cert} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
