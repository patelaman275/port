'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function PublicationsSection() {
  return (
    <section
      id="publications"
      className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080b07 0%, #0c140b 50%, #080b07 100%)' }}
    >
      {/* BG glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(29,185,84,0.08) 0%, transparent 70%)',
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
            className="text-xs tracking-[0.4em] uppercase mb-3 font-semibold text-[#1DB954]"
          >
            Research & Publications
          </p>
          <h2 className="font-black tracking-tight text-3xl md:text-5xl">
            <span className="text-white">Published </span>
            <span className="gradient-text">Research</span>
          </h2>
        </motion.div>
        <div
          className="mx-auto mt-5 h-px w-20"
          style={{ background: 'linear-gradient(90deg, transparent, #1DB954, transparent)' }}
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
          className="relative p-8 md:p-10 rounded-2xl overflow-hidden group glass-card border border-[#1DB954]/25 hover:border-[#1DB954]/60 shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300"
        >
          {/* Animated border gradient on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(29,185,84,0.15) 0%, transparent 50%, rgba(30,215,96,0.1) 100%)',
            }}
          />

          <div className="relative z-10">
            {/* Badge */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
                style={{
                  background: 'rgba(29,185,84,0.15)',
                  border: '1px solid rgba(29,185,84,0.4)',
                  color: '#1ed760',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#1DB954] shadow-[0_0_6px_#1DB954]"
                />
                ICCCNet 2026 · Published Research
              </div>
            </div>

            {/* Title */}
            <h3
              className="font-bold text-white mb-3 leading-snug text-lg md:text-2xl group-hover:text-[#1ed760] transition-colors"
            >
              AI-Based Chicken Disease Detection Using CNN
            </h3>

            {/* Conference & Authorship */}
            <p
              className="text-sm mb-4 leading-relaxed text-white/80 font-medium"
            >
              ADROID Conference Series: Engineering Sciences and Technology (ICCCNet 2026)
              <br />
              <span className="text-white/60 text-xs">
                SRM IST (Virtual), 17 June 2026 · Author & Lead Frontend/ML Pipeline Engineer
              </span>
            </p>

            {/* Guidance note from resume */}
            <div className="mb-6 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-white/70">
              <span className="text-[#1ed760] font-semibold">Supervision:</span> Research conducted under the guidance of{' '}
              <span className="text-white font-medium">Monica Bhavani M</span>, Professor, SRM IST.
            </div>

            {/* Abstract preview */}
            <p
              className="text-sm leading-relaxed mb-8 text-white/75"
            >
              A dual-pipeline convolutional neural network architecture leveraging VGG16 and
              MobileNetV2 ensemble achieving{' '}
              <span className="text-[#1ed760] font-bold">98.2% accuracy</span>{' '}
              on a 5,000+ image poultry dataset collected and annotated from Kaggle, GitHub, and online repositories. Integrated with Gemini RAG for contextual
              disease Q&A and Sarvam AI for multilingual voice diagnosis across 5+ Indian languages.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { value: '98.2%', label: 'CNN Accuracy' },
                { value: '5,000+', label: 'Poultry Images' },
                { value: '5+ Langs', label: 'Sarvam AI Voice' },
                { value: 'Sub-2s', label: 'Inference Speed' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="text-center px-4 py-3 rounded-xl flex-1 min-w-[110px]"
                  style={{
                    background: 'rgba(29,185,84,0.08)',
                    border: '1px solid rgba(29,185,84,0.2)',
                  }}
                >
                  <div
                    className="font-bold text-base gradient-text"
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
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="https://conferenceseries.adroidjournals.com/index.php/ACSET/article/view/120/90"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0d9488] to-[#1DB954] hover:from-[#1DB954] hover:to-[#1ed760] transition-all shadow-[0_4px_18px_rgba(29,185,84,0.4)]"
              >
                <span>Read Published Paper</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://chick-tech-ai-diagnosis.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white/90 bg-white/5 border border-white/10 hover:border-[#1DB954]/50 hover:text-white transition-all"
              >
                <span>Live App Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/patelaman275"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white/70 bg-white/5 border border-white/10 hover:text-white hover:border-[#1DB954]/50 transition-all"
              >
                <span>GitHub Repo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
