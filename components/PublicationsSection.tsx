'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function PublicationsSection() {
  return (
    <section
      id="publications"
      className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080608 0%, #0c0608 50%, #080608 100%)' }}
    >
      {/* BG glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(255,75,43,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Header with Clip-Path Reveal */}
      <div className="text-center mb-14 relative z-10">
        <motion.div
          initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
          whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-3 font-medium text-[#ff4b2b]"
          >
            Research
          </p>
          <h2 className="font-black tracking-tight text-3xl md:text-5xl">
            <span className="text-white">Published </span>
            <span className="gradient-text">Work</span>
          </h2>
        </motion.div>
        <div
          className="mx-auto mt-5 h-px w-20"
          style={{ background: 'linear-gradient(90deg, transparent, #ff4b2b, transparent)' }}
        />
      </div>

      {/* Featured publication card */}
      <motion.div
        className="max-w-3xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="relative p-8 md:p-10 rounded-2xl overflow-hidden group"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,75,43,0.25)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Animated border gradient on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,75,43,0.15) 0%, transparent 50%, rgba(255,138,0,0.1) 100%)',
            }}
          />

          <div className="relative z-10">
            {/* Badge */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
                style={{
                  background: 'rgba(255,75,43,0.15)',
                  border: '1px solid rgba(255,75,43,0.4)',
                  color: '#ff8a00',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#ff4b2b] shadow-[0_0_6px_#ff4b2b]"
                />
                ICCCNet 2026 · Published
              </div>
            </div>

            {/* Title */}
            <h3
              className="font-bold text-white mb-3 leading-snug text-lg md:text-xl"
            >
              AI-Based Chicken Disease Detection using Convolutional Neural Networks
            </h3>

            {/* Conference */}
            <p
              className="text-sm mb-6 leading-relaxed text-white/70"
            >
              ADROID Conference Series: Engineering Sciences and Technology (ICCCNet 2026)
              <br />
              <span className="text-white/50">
                SRM Institute of Science and Technology, Chennai, India · 2026
              </span>
            </p>

            {/* Abstract preview */}
            <p
              className="text-sm leading-relaxed mb-8 text-white/75"
            >
              A dual-pipeline convolutional neural network architecture leveraging VGG16 and
              MobileNetV2 ensemble achieving{' '}
              <span className="text-[#ff8a00] font-semibold">98.2% classification accuracy</span>{' '}
              on a 5,000+ image poultry disease dataset. Integrated with Gemini RAG for contextual
              disease Q&A and Sarvam AI for multilingual voice-based diagnosis across 5+ Indian languages.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { value: '98.2%', label: 'Accuracy' },
                { value: '5,000+', label: 'Training images' },
                { value: '5+', label: 'Languages' },
                { value: 'Sub-2s', label: 'Inference' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="text-center px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(255,75,43,0.08)',
                    border: '1px solid rgba(255,75,43,0.18)',
                  }}
                >
                  <div
                    className="font-bold text-sm gradient-text"
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-xs mt-0.5 text-white/50"
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://github.com/patelaman275"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 text-[#ff8a00] hover:text-[#ff4b2b]"
            >
              <span className="hover:underline">View on GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
