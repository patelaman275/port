'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ACCENTURE_QUESTIONS } from './accentureData';
import {
  Play,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Code2,
  Clock,
  ArrowLeft,
  HelpCircle,
  Trophy,
  Check,
  Zap,
  Terminal,
  Eye,
  Info,
  Bookmark,
  Sun,
  Moon
} from 'lucide-react';

export default function AccentureSimulatorPage() {
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [userCodes, setUserCodes] = useState<{ [key: number]: string }>(() => {
    const initialCodes: { [key: number]: string } = {};
    ACCENTURE_QUESTIONS.forEach((q) => {
      initialCodes[q.id] = q.starterCode;
    });
    return initialCodes;
  });
  const [solvedStatus, setSolvedStatus] = useState<{ [key: number]: boolean }>({});
  const [revisitLater, setRevisitLater] = useState<{ [key: number]: boolean }>({});
  const [testResults, setTestResults] = useState<{ [key: number]: { passed: boolean; message: string; details: string[] } | null }>({});
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'results'>('editor');
  const [showLearningGuide, setShowLearningGuide] = useState(true);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [examTimer, setExamTimer] = useState<number>(600);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentQ = ACCENTURE_QUESTIONS.find((q) => q.id === activeQuestionId) || ACCENTURE_QUESTIONS[0];
  const currentCode = userCodes[currentQ.id] !== undefined ? userCodes[currentQ.id] : currentQ.starterCode;

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setExamTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCodeChange = (newCode: string) => {
    setUserCodes((prev) => ({
      ...prev,
      [currentQ.id]: newCode
    }));
  };

  const updateIframePreview = (codeToRun: string) => {
    if (!iframeRef.current) return;
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(codeToRun);
    doc.close();
  };

  const handleRunCode = () => {
    updateIframePreview(currentCode);
    setActiveTab('preview');
  };

  const handleSubmitSolution = () => {
    updateIframePreview(currentCode);

    setTimeout(() => {
      if (!iframeRef.current) return;
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      const win = iframe.contentWindow;

      if (!doc || !win) return;

      try {
        const result = currentQ.testSuite(doc, win);
        setTestResults((prev) => ({
          ...prev,
          [currentQ.id]: result
        }));

        if (result.passed) {
          setSolvedStatus((prev) => ({ ...prev, [currentQ.id]: true }));
        }
        setActiveTab('results');
      } catch (err: unknown) {
        const error = err as Error;
        setTestResults((prev) => ({
          ...prev,
          [currentQ.id]: {
            passed: false,
            message: 'Runtime Error during test execution',
            details: [error.message || 'JavaScript execution failed']
          }
        }));
        setActiveTab('results');
      }
    }, 250);
  };

  const handleResetCode = () => {
    handleCodeChange(currentQ.starterCode);
    setTestResults((prev) => ({ ...prev, [currentQ.id]: null }));
    updateIframePreview(currentQ.starterCode);
  };

  const handleInsertMissingLines = () => {
    handleCodeChange(currentQ.solutionCode);
    updateIframePreview(currentQ.solutionCode);
  };

  const toggleRevisit = () => {
    setRevisitLater((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const solvedCount = Object.values(solvedStatus).filter(Boolean).length;
  const isDark = themeMode === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans select-none transition-colors duration-200 ${
      isDark ? 'bg-[#090a0f] text-[#e2e8f0]' : 'bg-[#f4f4f6] text-[#18181b]'
    }`}>
      {/* ── TOP ACCENTURE OFFICIAL TEST BAR (Matches Screenshot) ───── */}
      <header className={`border-b px-6 py-2.5 flex items-center justify-between sticky top-0 z-50 ${
        isDark ? 'bg-[#12141d] border-[#232738]' : 'bg-white border-[#e2e8f0] shadow-sm'
      }`}>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-md transition ${
              isDark ? 'bg-[#1a1d2d] text-[#94a3b8] hover:text-white' : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Exit Test
          </Link>

          <Link
            href="/interview"
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-sm hover:from-rose-500 hover:to-rose-600 transition"
          >
            <Sparkles className="w-3.5 h-3.5" /> AI Interview & Speech Hub
          </Link>

          {/* Section Selector Dropdown matching screenshot */}
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-medium cursor-pointer ${
              isDark ? 'bg-[#1a1d2d] border-[#2e344e] text-white' : 'bg-white border-[#cbd5e1] text-[#1e293b]'
            }`}>
              <select
                value={activeQuestionId}
                onChange={(e) => {
                  setActiveQuestionId(Number(e.target.value));
                  setActiveTab('editor');
                }}
                className="bg-transparent font-semibold focus:outline-none cursor-pointer"
              >
                {ACCENTURE_QUESTIONS.map((q) => (
                  <option key={q.id} value={q.id} className={isDark ? 'bg-[#12141d] text-white' : 'bg-white text-black'}>
                    {q.id}. {q.category} — {q.title}
                  </option>
                ))}
              </select>
            </div>

            <button title="Accenture Test Instructions" className="p-1 rounded text-[#64748b] hover:text-[#0284c7]">
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Title */}
        <div className="hidden md:flex items-center gap-2 text-xs font-bold tracking-tight">
          <span className="text-[#0284c7]">Campus Hiring — Coding 2025</span>
          <span className="text-[#94a3b8]">|</span>
          <span className={isDark ? 'text-white' : 'text-[#0f172a]'}>Front end Technology</span>
        </div>

        {/* Right Section: Timer + Score + Theme Switcher */}
        <div className="flex items-center gap-4">
          {/* Progress badge */}
          <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold ${
            isDark ? 'bg-[#1a1d2d] text-white' : 'bg-[#e0f2fe] text-[#0369a1]'
          }`}>
            <Trophy className="w-3.5 h-3.5 text-[#eab308]" />
            <span>{solvedCount} / {ACCENTURE_QUESTIONS.length} Solved</span>
          </div>

          {/* Exam Timer */}
          <div className="flex items-center gap-2 bg-[#dc2626] text-white px-3 py-1 rounded-full font-mono font-bold text-xs shadow">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            <span>{formatTimer(examTimer)}</span>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
            className={`p-1.5 rounded transition ${
              isDark ? 'bg-[#1a1d2d] text-yellow-400' : 'bg-[#e2e8f0] text-slate-700'
            }`}
            title="Toggle Accenture Portal Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ── QUESTION SUB-HEADER (Matches Screenshot) ──────────────── */}
      <div className={`border-b px-6 py-3 flex items-center justify-between ${
        isDark ? 'bg-[#0d0e17] border-[#1e2235]' : 'bg-[#f8fafc] border-[#e2e8f0]'
      }`}>
        <div className="flex items-center gap-3">
          <h2 className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>
            Question {currentQ.id}
          </h2>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#e0f2fe] text-[#0369a1] font-semibold">
            {currentQ.category}
          </span>
        </div>

        {/* Revisit Later Toggle */}
        <button
          onClick={toggleRevisit}
          className={`flex items-center gap-1.5 px-3 py-1 rounded border text-xs font-semibold transition ${
            revisitLater[currentQ.id]
              ? 'bg-[#fef3c7] border-[#f59e0b] text-[#b45309]'
              : isDark
              ? 'bg-[#1a1d2d] border-[#2e344e] text-[#94a3b8] hover:text-white'
              : 'bg-white border-[#cbd5e1] text-[#475569] hover:bg-[#f1f5f9]'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${revisitLater[currentQ.id] ? 'fill-current' : ''}`} />
          <span>Revisit Later</span>
        </button>
      </div>

      {/* ── MAIN PORTAL BODY (Exact Layout from Screenshot) ────────── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* ── LEFT COLUMN: "How to Attempt?" INSTRUCTIONS ────────── */}
        <section className={`w-full lg:w-1/2 flex flex-col border-r overflow-y-auto p-6 space-y-5 ${
          isDark ? 'bg-[#090a0f] border-[#1e2235]' : 'bg-white border-[#e2e8f0]'
        }`}>
          {/* Main Question Title */}
          <div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>
              How to Attempt?
            </h3>
            <p className={`text-sm mt-2 leading-relaxed font-medium ${
              isDark ? 'text-[#cbd5e1]' : 'text-[#334155]'
            }`}>
              {currentQ.instructions.context}
            </p>
          </div>

          {/* Objectives Section */}
          <div className="space-y-2">
            <h4 className={`text-sm font-bold uppercase tracking-wider ${
              isDark ? 'text-white' : 'text-[#0f172a]'
            }`}>
              Objectives:
            </h4>
            <ul className="space-y-2.5 text-sm list-disc list-inside pl-1">
              {currentQ.instructions.objectives.map((obj, i) => (
                <li key={i} className={`leading-relaxed ${isDark ? 'text-[#cbd5e1]' : 'text-[#334155]'}`}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: obj.replace(
                        /`([^`]+)`/g,
                        `<code class="font-mono font-bold ${
                          isDark ? 'bg-[#1e293b] text-[#38bdf8]' : 'bg-[#f1f5f9] text-[#0284c7]'
                        } px-1.5 py-0.5 rounded text-xs">$1</code>`
                      )
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Constraints Section */}
          <div className="space-y-2 pt-2 border-t border-[#e2e8f0]/40">
            <h4 className={`text-sm font-bold uppercase tracking-wider ${
              isDark ? 'text-white' : 'text-[#0f172a]'
            }`}>
              Constraints:
            </h4>
            <ul className="space-y-1.5 text-xs list-disc list-inside pl-1 text-[#64748b]">
              {currentQ.instructions.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          {/* Learning Guide & Solution Help */}
          <div className={`rounded-xl border overflow-hidden mt-4 ${
            isDark ? 'bg-[#111827] border-[#1f2937]' : 'bg-[#f8fafc] border-[#cbd5e1]'
          }`}>
            <button
              onClick={() => setShowLearningGuide(!showLearningGuide)}
              className={`w-full px-4 py-3 flex items-center justify-between text-left font-bold text-xs transition ${
                isDark ? 'bg-[#1f2937] text-white' : 'bg-[#e2e8f0] text-[#0f172a]'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#f59e0b]" />
                <span>Learning Guide & 4-5 Line Solution Breakdown</span>
              </div>
              <span>{showLearningGuide ? 'Hide ▲' : 'Show ▼'}</span>
            </button>

            {showLearningGuide && (
              <div className="p-4 space-y-3 text-xs">
                <div>
                  <h5 className="font-bold text-[#f59e0b] mb-1 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> Logic Steps:
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-[#64748b]">
                    {currentQ.learningGuide.logicSteps.map((step, i) => (
                      <li key={i} dangerouslySetInnerHTML={{
                        __html: step.replace(/`([^`]+)`/g, '<code class="bg-[#e0f2fe] text-[#0369a1] px-1 py-0.5 rounded font-mono font-bold">$1</code>')
                      }} />
                    ))}
                  </ul>
                </div>

                <div className="bg-[#fef2f2] border border-[#fca5a5] p-3 rounded text-[#991b1b]">
                  <span className="font-bold flex items-center gap-1 mb-0.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#dc2626]" /> Accenture Pro-Tip:
                  </span>
                  {currentQ.learningGuide.accentureTip}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#64748b]">Insert full answer into code editor:</span>
                  <button
                    onClick={handleInsertMissingLines}
                    className="px-3 py-1 rounded bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold text-xs flex items-center gap-1 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Insert Solution
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── RIGHT COLUMN: CODE EDITOR & RESULT TABS ───────────────── */}
        <section className={`w-full lg:w-1/2 flex flex-col overflow-hidden ${
          isDark ? 'bg-[#05060a]' : 'bg-[#f8fafc]'
        }`}>
          {/* Top Bar with Tab Buttons matching Screenshot */}
          <div className={`px-4 py-2 border-b flex items-center justify-between ${
            isDark ? 'bg-[#121420] border-[#1e2235]' : 'bg-white border-[#e2e8f0]'
          }`}>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1.5 rounded font-mono text-xs font-bold flex items-center gap-1.5 transition ${
                  activeTab === 'editor'
                    ? 'bg-[#0284c7] text-white shadow'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" /> &lt;/&gt; Code
              </button>
              <button
                onClick={handleRunCode}
                className={`px-3 py-1.5 rounded font-mono text-xs font-bold flex items-center gap-1.5 transition ${
                  activeTab === 'preview'
                    ? 'bg-[#0284c7] text-white shadow'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`px-3 py-1.5 rounded font-mono text-xs font-bold flex items-center gap-1.5 transition ${
                  activeTab === 'results'
                    ? 'bg-[#0284c7] text-white shadow'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" /> Result
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRunCode}
                className="px-3 py-1.5 rounded bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs flex items-center gap-1 shadow transition"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Run Code
              </button>
              <button
                onClick={handleSubmitSolution}
                className="px-3 py-1.5 rounded bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs flex items-center gap-1 shadow transition"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" /> Submit Solution
              </button>
              <button
                onClick={handleResetCode}
                title="Reset Code"
                className="p-1.5 rounded bg-[#e2e8f0] hover:bg-[#cbd5e1] text-[#475569] transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* TAB PANELS */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {/* CODE EDITOR */}
            {activeTab === 'editor' && (
              <div className="flex-1 flex flex-col h-full bg-[#1e1e1e] text-white">
                <div className="bg-[#252526] text-[#cccccc] text-[11px] px-4 py-1.5 font-mono border-b border-[#333] flex items-center justify-between">
                  <span>index.html (Editable Accenture Template)</span>
                  <span className="text-[#888]">HTML / CSS / JS</span>
                </div>
                <textarea
                  value={currentCode}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  spellCheck={false}
                  className="flex-1 w-full bg-[#1e1e1e] text-[#9cdcfe] font-mono text-xs p-4 focus:outline-none resize-none leading-relaxed selection:bg-[#264f78]"
                />
              </div>
            )}

            {/* PREVIEW SANDBOX */}
            <div
              className={`flex-1 bg-white relative ${
                activeTab === 'preview' ? 'block' : 'hidden'
              }`}
            >
              <iframe
                ref={iframeRef}
                title="Accenture Exam Preview"
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-same-origin allow-modals"
              />
            </div>

            {/* TEST RESULTS */}
            {activeTab === 'results' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-white text-black">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#0284c7]" /> Automated Test Case Result
                </h4>

                {testResults[currentQ.id] ? (
                  <div className={`p-4 rounded-lg border space-y-3 ${
                    testResults[currentQ.id]?.passed
                      ? 'bg-[#f0fdf4] border-[#16a34a] text-[#15803d]'
                      : 'bg-[#fef2f2] border-[#dc2626] text-[#991b1b]'
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-sm">
                      {testResults[currentQ.id]?.passed ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-[#16a34a]" />
                          <span>PASSED - Solution Correct!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-[#dc2626]" />
                          <span>FAILED - {testResults[currentQ.id]?.message}</span>
                        </>
                      )}
                    </div>

                    <div className="space-y-1 font-mono text-xs border-t border-black/10 pt-2">
                      {testResults[currentQ.id]?.details.map((detail, idx) => (
                        <div key={idx}>{detail}</div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#f8fafc] border border-[#cbd5e1] p-6 rounded-lg text-center text-[#64748b]">
                    <p className="text-sm font-semibold">No test run yet.</p>
                    <p className="text-xs mt-1">Click <strong>Submit Solution</strong> to run test cases.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
