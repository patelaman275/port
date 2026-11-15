'use client';

import { motion } from 'framer-motion';
import { ExternalLink, BookMarked } from 'lucide-react';

export default function PublicationsSection() {
  return (
    <section id="publications" className="relative py-16 sm:py-20 px-6 md:px-12 lg:px-20 overflow-hidden bg-transparent">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#191919] border border-[#303030] text-[#FE8040] text-xs font-bold tracking-wider uppercase shadow-sm mb-3 font-mono">
            <span>Peer-Reviewed Literature</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Published <span className="text-[#FE8040]">Research</span>
          </h2>
        </div>

        {/* Featured publication card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8 rounded-xl border border-[#303030] bg-[#191919] text-[#CCCCCC] shadow-md group"
        >
          {/* Card Top Titlebar */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#303030]">
            <span className="text-xs font-mono font-semibold text-[#FE8040] flex items-center gap-1.5">
              <BookMarked className="w-4 h-4" />
              <span>ADROID Conference Series (ICCCNet 2026)</span>
            </span>
            <span className="text-[11px] font-mono text-[#777777]">Paper ID: 120/90</span>
          </div>

          {/* Title */}
          <h3
            className="font-bold text-[#F5F5F5] mb-2 leading-snug text-xl md:text-2xl group-hover:text-[#FE8040] transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            AI-Based Chicken Disease Detection Using CNN
          </h3>

          {/* Metadata */}
          <p className="text-xs text-[#999999] mb-4 leading-relaxed">
            ADROID Conference Series: Engineering Sciences and Technology &middot; SRM IST &middot; Published Paper
          </p>

          <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed mb-5">
            Engineered a dual-pipeline CNN architecture leveraging VGG16 and MobileNetV2 feature extraction to classify poultry disease from images with 98.2% accuracy. Supervised by Dr. Monica Bhavani M, Professor at SRM IST.
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 pt-4 border-t border-[#303030]">
            <div className="p-3 rounded-lg bg-[#121212] border border-[#303030]">
              <span className="text-[10px] font-mono text-[#777777] uppercase block">Model Accuracy</span>
              <span className="text-sm font-bold font-mono text-[#FE8040]">98.2% Dual CNN</span>
            </div>
            <div className="p-3 rounded-lg bg-[#121212] border border-[#303030]">
              <span className="text-[10px] font-mono text-[#777777] uppercase block">Dataset Scale</span>
              <span className="text-sm font-bold font-mono text-[#FE8040]">5,000+ Annotated</span>
            </div>
            <div className="p-3 rounded-lg bg-[#121212] border border-[#303030] col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono text-[#777777] uppercase block">Inference Speed</span>
              <span className="text-sm font-bold font-mono text-[#FE8040]">&lt; 2s (Render Docker)</span>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://conferenceseries.adroidjournals.com/index.php/ACSET/article/view/120/90"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FE8040] text-[#0F0F0F] font-bold text-xs hover:bg-[#FF995F] transition-all cursor-pointer shadow-sm"
            >
              <span>Read Published Paper</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#0F0F0F]" />
            </a>
            <a
              href="https://github.com/KunalBishwal/ChickTech-AI-Diagnosis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#121212] text-[#CCCCCC] hover:text-[#FE8040] border border-[#303030] hover:border-[#FE8040] font-semibold text-xs transition-all cursor-pointer shadow-sm"
            >
              <span>View Model Repository</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
