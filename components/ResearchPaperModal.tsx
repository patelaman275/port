'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  BookOpen,
  ExternalLink,
  Award,
  Layers,
  Database,
  BarChart3,
  CheckCircle2,
  FileText,
  UserCheck,
} from 'lucide-react';

interface ResearchPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResearchPaperModal({ isOpen, onClose }: ResearchPaperModalProps) {
  const [activeTab, setActiveTab] = useState<'abstract' | 'metrics' | 'architecture'>('abstract');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl h-[92vh] sm:h-[86vh] max-h-[780px] rounded-2xl border border-[#303030] shadow-2xl bg-[#0F0F0F] text-[#CCCCCC] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: '0 0 60px rgba(254,128,64,0.15), 0 25px 60px rgba(0,0,0,0.85)',
          }}
        >
          {/* Header Titlebar */}
          <div className="px-5 py-4 border-b border-[#303030] bg-[#121212] flex items-start justify-between shrink-0">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FE8040] text-[#0F0F0F] flex items-center justify-center font-bold shrink-0 mt-0.5">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FE8040]/15 text-[#FE8040] border border-[#FE8040]/30 font-bold">
                    ICCCNet 2026 PUBLISHED PAPER
                  </span>
                  <span className="text-[10px] font-mono text-[#777777]">
                    ADROID Conference Series · Paper ID: 120/90
                  </span>
                </div>
                <h3
                  className="font-bold text-base sm:text-lg text-[#F5F5F5] leading-snug"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  AI-Based Chicken Disease Detection Using CNN
                </h3>
                <p className="text-xs text-[#999999] mt-0.5 flex flex-wrap items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#FE8040]" />
                  <span>Aman Patel</span>
                  <span className="text-[#666666]">&middot;</span>
                  <span>Supervisor: Monica Bhavani M (Professor, SRM IST)</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-[#222222] text-[#777777] hover:text-[#FE8040] transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-5 py-2.5 border-b border-[#252525] bg-[#141414] flex items-center gap-2 overflow-x-auto shrink-0">
            {[
              { id: 'abstract', label: 'Paper Abstract & Methods', icon: <FileText className="w-3.5 h-3.5" /> },
              { id: 'metrics', label: 'Confusion Matrix & Metrics', icon: <BarChart3 className="w-3.5 h-3.5" /> },
              { id: 'architecture', label: 'Dual CNN & Voice RAG', icon: <Layers className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#FE8040] text-[#0F0F0F] shadow-sm'
                    : 'bg-[#191919] text-[#999999] hover:text-[#F5F5F5] border border-[#303030]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
            {activeTab === 'abstract' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase text-[#FE8040] tracking-wider mb-2">
                    Official Peer-Reviewed Abstract
                  </h4>
                  <div className="p-4 sm:p-5 rounded-xl border border-[#303030] bg-[#121212] text-xs sm:text-sm leading-relaxed text-[#CCCCCC] space-y-3">
                    <p>
                      Early detection of avian pathologies is vital for smallholder and commercial poultry farms to curb infectious spread and minimize severe economic losses. In this research, we introduce an end-to-end deep learning framework utilizing a dual-pipeline Convolutional Neural Network (CNN) architecture combining VGG16 deep feature representation with MobileNetV2 depthwise separable efficiency.
                    </p>
                    <p>
                      The dual-pipeline achieved an experimental classification accuracy of <strong className="text-[#FE8040]">98.2%</strong> for Coccidiosis and associated enteric lesions across a curated dataset of over 5,000 annotated images. To assist farmers across regional language barriers, the system was integrated with Gemini-powered Retrieval-Augmented Generation (RAG) and Sarvam AI Indic voice synthesis for real-time multilingual disease queries.
                    </p>
                  </div>
                </div>

                {/* Key Research Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#121212] border border-[#303030]">
                    <span className="text-[10px] font-mono text-[#777777] block uppercase">Dataset Size</span>
                    <span className="text-sm font-bold text-[#F5F5F5] font-mono mt-0.5 block">5,000+ Curated</span>
                    <p className="text-[11px] text-[#888888] mt-1">Annotated poultry images across Kaggle &amp; GitHub</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#121212] border border-[#303030]">
                    <span className="text-[10px] font-mono text-[#777777] block uppercase">Dual CNN Models</span>
                    <span className="text-sm font-bold text-[#FE8040] font-mono mt-0.5 block">VGG16 + MobileNetV2</span>
                    <p className="text-[11px] text-[#888888] mt-1">Balancing deep feature depth with sub-2s edge inference</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#121212] border border-[#303030]">
                    <span className="text-[10px] font-mono text-[#777777] block uppercase">Multilingual AI</span>
                    <span className="text-sm font-bold text-[#F5F5F5] font-mono mt-0.5 block">Gemini RAG + Sarvam</span>
                    <p className="text-[11px] text-[#888888] mt-1">Grounded voice Q&amp;A across 5+ Indian dialects</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'metrics' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase text-[#FE8040] tracking-wider mb-2">
                    Classification Metrics Table
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-[#303030] bg-[#121212]">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#191919] text-[#999999] font-mono text-[11px] border-b border-[#303030]">
                        <tr>
                          <th className="p-3">Disease Class</th>
                          <th className="p-3">Precision</th>
                          <th className="p-3">Recall</th>
                          <th className="p-3">F1-Score</th>
                          <th className="p-3">Support (Images)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#252525] font-mono">
                        <tr>
                          <td className="p-3 font-bold text-[#F5F5F5]">Coccidiosis</td>
                          <td className="p-3 text-[#FE8040]">98.4%</td>
                          <td className="p-3 text-[#FE8040]">98.7%</td>
                          <td className="p-3 text-[#FE8040]">98.5%</td>
                          <td className="p-3 text-[#999999]">2,140</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-[#F5F5F5]">Fowlpox</td>
                          <td className="p-3 text-[#CCCCCC]">97.8%</td>
                          <td className="p-3 text-[#CCCCCC]">98.1%</td>
                          <td className="p-3 text-[#CCCCCC]">97.9%</td>
                          <td className="p-3 text-[#999999]">1,280</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-[#F5F5F5]">Bumblefoot</td>
                          <td className="p-3 text-[#CCCCCC]">97.2%</td>
                          <td className="p-3 text-[#CCCCCC]">97.6%</td>
                          <td className="p-3 text-[#CCCCCC]">97.4%</td>
                          <td className="p-3 text-[#999999]">820</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-[#F5F5F5]">Healthy Controls</td>
                          <td className="p-3 text-[#CCCCCC]">99.1%</td>
                          <td className="p-3 text-[#CCCCCC]">98.9%</td>
                          <td className="p-3 text-[#CCCCCC]">99.0%</td>
                          <td className="p-3 text-[#999999]">1,160</td>
                        </tr>
                        <tr className="bg-[#161616] font-bold">
                          <td className="p-3 text-[#FE8040]">Overall Weighted Average</td>
                          <td className="p-3 text-[#FE8040]">98.1%</td>
                          <td className="p-3 text-[#FE8040]">98.3%</td>
                          <td className="p-3 text-[#FE8040]">98.2%</td>
                          <td className="p-3 text-[#FE8040]">5,400 Total</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Key Observations */}
                <div className="p-4 rounded-xl border border-[#303030] bg-[#121212] space-y-2 text-xs text-[#999999]">
                  <span className="font-bold text-[#F5F5F5] font-mono text-[11px] block">
                    Key Performance Takeaways:
                  </span>
                  <div className="space-y-1">
                    <p>• MobileNetV2 reduced feature map parameter count by 68% relative to unpruned VGG16.</p>
                    <p>• Sub-2s inference latency makes it feasible to run predictions on edge Docker containers.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'architecture' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase text-[#FE8040] tracking-wider">
                  Full-Stack Architecture &amp; RAG Pipeline
                </h4>
                <div className="space-y-3 text-xs text-[#CCCCCC]">
                  <div className="p-4 rounded-xl bg-[#121212] border border-[#303030] space-y-1.5">
                    <span className="font-bold text-[#F5F5F5] font-mono text-[11px] text-[#FE8040] block">
                      1. Next.js Client Interface (Aman&#39;s Contribution)
                    </span>
                    <p className="leading-relaxed">
                      Responsive web dashboard with drag-and-drop poultry image intake, voice recording for Indic speech, and real-time inference telemetry.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#121212] border border-[#303030] space-y-1.5">
                    <span className="font-bold text-[#F5F5F5] font-mono text-[11px] text-[#FE8040] block">
                      2. Flask REST Inference Microservice
                    </span>
                    <p className="leading-relaxed">
                      Dockerized Python service on Render executing image normalization, magic byte validation, and dual-pipeline CNN forward passes.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#121212] border border-[#303030] space-y-1.5">
                    <span className="font-bold text-[#F5F5F5] font-mono text-[11px] text-[#FE8040] block">
                      3. Gemini RAG &amp; Sarvam Multilingual Voice
                    </span>
                    <p className="leading-relaxed">
                      Vector similarity matching over 47 specialized veterinary chunks prevents hallucination; Sarvam AI outputs natural speech in regional Indian languages.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Action Links */}
          <div className="px-5 py-3.5 border-t border-[#303030] bg-[#121212] flex flex-wrap items-center justify-between gap-3 shrink-0">
            <span className="text-[11px] text-[#777777] font-mono">
              Published at SRM IST Virtual Conference &middot; 17 June 2026
            </span>

            <div className="flex items-center gap-2.5">
              <a
                href="https://conferenceseries.adroidjournals.com/index.php/ACSET/article/view/120/90"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#FE8040] hover:bg-[#FF995F] text-[#0F0F0F] font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <span>Read on ADROID Journals</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/KunalBishwal/ChickTech-AI-Diagnosis"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#191919] hover:bg-[#222222] text-[#CCCCCC] hover:text-[#FE8040] border border-[#303030] font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
