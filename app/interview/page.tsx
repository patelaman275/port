'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  SPEECH_PRACTICE_QUESTIONS,
  BOT_INTERVIEW_QUESTIONS
} from './interviewData';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Brain,
  Send,
  ArrowLeft,
  Search,
  BarChart2,
  Zap,
  ShieldCheck,
  Layers,
  Cpu
} from 'lucide-react';

// Web Speech API Types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

export default function AccentureInterviewPage() {
  const [activeTab, setActiveTab] = useState<'speak' | 'bot' | 'cheatsheet'>('speak');

  // --- SPEAK PRACTICE STATE ---
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(SPEECH_PRACTICE_QUESTIONS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isSpeakingTTS, setIsSpeakingTTS] = useState<boolean>(false);
  
  // Metrics calculation
  const [speechStartTime, setSpeechStartTime] = useState<number | null>(null);
  const [speechDurationSecs, setSpeechDurationSecs] = useState<number>(0);
  const [fluencyScore, setFluencyScore] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);
  const [wordDiff, setWordDiff] = useState<{ word: string; status: 'matched' | 'missed' }[]>([]);

  // --- BOT CHAT STATE ---
  const [botRoundType, setBotRoundType] = useState<'technical' | 'project' | 'hr' | 'full'>('full');
  const [currentBotIndex, setCurrentBotIndex] = useState<number>(0);
  const [chatMessages, setChatMessages] = useState<
    { sender: 'bot' | 'user'; text: string; time: string; feedback?: { score: number; fluency: number; strengths: string[]; missed: string[]; suggestion: string } }[]
  >(() => [
    {
      sender: 'bot',
      text: BOT_INTERVIEW_QUESTIONS[0].question,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInputText, setUserInputText] = useState<string>('');
  const [isBotThinking, setIsBotThinking] = useState<boolean>(false);
  const [isBotVoiceActive, setIsBotVoiceActive] = useState<boolean>(true);

  const handleRoundTypeChange = (newRound: 'technical' | 'project' | 'hr' | 'full') => {
    setBotRoundType(newRound);
    setCurrentBotIndex(0);
    setChatMessages([
      {
        sender: 'bot',
        text: BOT_INTERVIEW_QUESTIONS[0].question,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Speech Recognition Ref
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const currentQuestion = SPEECH_PRACTICE_QUESTIONS.find((q) => q.id === selectedQuestionId) || SPEECH_PRACTICE_QUESTIONS[0];

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        const recognition = new SpeechRecognitionClass();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript + ' ';
          }
          setTranscript(currentTranscript.trim());
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Clean Speech Text
  const cleanWord = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Calculate Speech Accuracy & Metrics
  const analyzeSpokenAnswer = () => {
    if (!transcript.trim()) return;

    const modelWords = currentQuestion.modelAnswer.split(/\s+/).map(cleanWord).filter(Boolean);
    const spokenWords = transcript.split(/\s+/).map(cleanWord).filter(Boolean);
    const spokenSet = new Set(spokenWords);

    let matchCount = 0;
    const diff = currentQuestion.modelAnswer.split(/\s+/).map((rawWord) => {
      const cleaned = cleanWord(rawWord);
      const isMatched = spokenSet.has(cleaned);
      if (isMatched) matchCount++;
      return { word: rawWord, status: isMatched ? ('matched' as const) : ('missed' as const) };
    });

    const calculatedFluency = Math.min(100, Math.round((matchCount / Math.max(1, modelWords.length)) * 100));

    // WPM calculation
    const duration = speechStartTime ? Math.max(3, Math.round((Date.now() - speechStartTime) / 1000)) : 15;
    setSpeechDurationSecs(duration);
    const calculatedWpm = Math.round((spokenWords.length / duration) * 60);

    // Keywords matched
    const foundKeywords = currentQuestion.keywords.filter((kw) =>
      transcript.toLowerCase().includes(kw.toLowerCase())
    );

    setMatchedKeywords(foundKeywords);
    setFluencyScore(calculatedFluency);
    setWpm(calculatedWpm);
    setWordDiff(diff);
  };

  // Toggle Voice Recognition
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported in this browser. Please use Chrome, Edge, or Brave.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      analyzeSpokenAnswer();
    } else {
      setTranscript('');
      setFluencyScore(null);
      setMatchedKeywords([]);
      setWordDiff([]);
      setSpeechStartTime(Date.now());
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch {
        // ignore if already started
      }
    }
  };

  // Text-To-Speech Playback
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    if (isSpeakingTTS) {
      window.speechSynthesis.cancel();
      setIsSpeakingTTS(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any active speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Clear accenture interview pacing
    utterance.pitch = 1.0;

    // Try to use a natural English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('India') || v.name.includes('UK') || v.name.includes('US')));
    if (englishVoice) utterance.voice = englishVoice;

    utterance.onstart = () => setIsSpeakingTTS(true);
    utterance.onend = () => setIsSpeakingTTS(false);
    utterance.onerror = () => setIsSpeakingTTS(false);

    window.speechSynthesis.speak(utterance);
  };

  // BOT CHAT: Submit Answer
  const handleSendBotAnswer = (textToSend?: string) => {
    const text = textToSend || userInputText;
    if (!text.trim() || isBotThinking) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessages = [...chatMessages, { sender: 'user' as const, text, time: timeStr }];
    setChatMessages(newMessages);
    setUserInputText('');
    setIsBotThinking(true);

    const currentBotQ = BOT_INTERVIEW_QUESTIONS[currentBotIndex % BOT_INTERVIEW_QUESTIONS.length];

    // Evaluate user answer
    setTimeout(() => {
      const userTextLower = text.toLowerCase();
      const matched = currentBotQ.sampleKeywords.filter((kw) => userTextLower.includes(kw.toLowerCase()));
      const keywordRatio = matched.length / currentBotQ.sampleKeywords.length;

      const score = Math.min(10, Math.max(5, Math.round(5 + keywordRatio * 5)));
      const fluency = Math.min(10, Math.round(6 + (text.split(/\s+/).length > 20 ? 3 : 1)));

      const missed = currentBotQ.sampleKeywords.filter((kw) => !userTextLower.includes(kw.toLowerCase()));
      const strengths = matched.length > 0 ? [`Covered key technical terms: ${matched.join(', ')}`] : ['Answered clearly without hesitation'];

      const feedback = {
        score,
        fluency,
        strengths,
        missed: missed.slice(0, 3),
        suggestion: currentBotQ.idealAnswerOverview
      };

      const nextIndex = currentBotIndex + 1;
      const nextQ = BOT_INTERVIEW_QUESTIONS[nextIndex % BOT_INTERVIEW_QUESTIONS.length];

      const botReplyText = `[Evaluation Score: ${score}/10]\n${
        score >= 8
          ? 'Impressive response! You demonstrated solid technical alignment with Accenture expectations.'
          : 'Good effort! Make sure to explicitly emphasize key project metrics and architecture choices.'
      }\n\nNext Question: ${nextQ.question}`;

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot' as const,
          text: botReplyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          feedback
        }
      ]);

      setCurrentBotIndex(nextIndex);
      setIsBotThinking(false);

      if (isBotVoiceActive) {
        speakText(nextQ.question);
      }
    }, 1200);
  };

  // Filter speech questions by category and search
  const categories = ['All', 'HR & Accenture Fit', 'Project: CNN Disease Detection', 'Project: EasyTrip & CampusConnect', 'Project: AI Career Path', 'Core CS & DSA', 'DBMS & SQL', 'Cloud & System Design'];

  const filteredQuestions = SPEECH_PRACTICE_QUESTIONS.filter((q) => {
    const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.modelAnswer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#080608] text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* --- TOP HEADER --- */}
      <header className="border-b border-rose-950/40 bg-[#0c080e]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/accenture"
              className="p-2 rounded-lg bg-rose-950/30 border border-rose-800/30 hover:bg-rose-900/40 text-rose-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Assessment Simulator</span>
            </Link>
            <div className="h-5 w-px bg-rose-900/40 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-rose-600 to-amber-600 text-white">
                  Accenture AI Portal
                </span>
                <span className="text-xs text-rose-400 font-medium">Aman Patel (SRM IST · 8.83 CGPA)</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Accenture Mock Interview & Fluency Trainer
              </h1>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-[#150d1a] p-1 rounded-xl border border-rose-900/40 text-xs font-medium">
            <button
              onClick={() => setActiveTab('speak')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'speak'
                  ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-md shadow-rose-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Read & Speak Fluently</span>
            </button>

            <button
              onClick={() => setActiveTab('bot')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'bot'
                  ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-md shadow-rose-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>AI Mock Interviewer</span>
            </button>

            <button
              onClick={() => setActiveTab('cheatsheet')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'cheatsheet'
                  ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-md shadow-rose-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Accenture Cheat Sheet</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ========================================================================= */}
        {/* TAB 1: READ & SPEAK FLUENTLY TELEPROMPTER */}
        {/* ========================================================================= */}
        {activeTab === 'speak' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT SIDEBAR: Question Selector & Filters */}
            <div className="lg:col-span-4 space-y-4">
              {/* Category Pills & Search */}
              <div className="bg-[#120b17] p-4 rounded-2xl border border-rose-950/60 shadow-xl space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search Accenture questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#1c1224] border border-rose-900/40 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors font-medium ${
                        selectedCategory === cat
                          ? 'bg-rose-600 text-white'
                          : 'bg-[#1e1329] text-slate-400 hover:text-slate-200 hover:bg-[#281938]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Questions List */}
              <div className="bg-[#120b17] p-3 rounded-2xl border border-rose-950/60 shadow-xl max-h-[560px] overflow-y-auto space-y-2 custom-scrollbar">
                <div className="px-2 py-1 flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Accenture Questions ({filteredQuestions.length})</span>
                  <span>Select to Practice</span>
                </div>

                {filteredQuestions.map((q) => {
                  const isSelected = q.id === selectedQuestionId;
                  return (
                    <div
                      key={q.id}
                      onClick={() => {
                        setSelectedQuestionId(q.id);
                        setTranscript('');
                        setFluencyScore(null);
                        setWordDiff([]);
                      }}
                      className={`p-3 rounded-xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-gradient-to-r from-rose-950/70 to-[#221028] border-rose-500/60 shadow-md'
                          : 'bg-[#180f21]/60 border-rose-950/40 hover:bg-[#21142e] hover:border-rose-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-rose-950/80 text-rose-300 font-medium border border-rose-800/40">
                          {q.category}
                        </span>
                        <span className="text-slate-400 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-400" /> {q.timeEstimate}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-200 line-clamp-2">{q.title}</h4>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT MAIN PANEL: Teleprompter & Speech Analyzer */}
            <div className="lg:col-span-8 space-y-6">
              {/* Question Header Card */}
              <div className="bg-[#120b17] p-6 rounded-2xl border border-rose-900/40 shadow-xl relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="px-3 py-1 rounded-lg bg-rose-950/80 border border-rose-800/50 text-rose-300 text-xs font-semibold">
                    {currentQuestion.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {currentQuestion.difficulty}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Est: {currentQuestion.timeEstimate}</span>
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-white mb-2">{currentQuestion.question}</h2>

                <div className="mt-3 p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200/90 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300">Accenture Panel Tip: </strong>
                    {currentQuestion.accentureTip}
                  </div>
                </div>
              </div>

              {/* TELEPROMPTER & MODEL ANSWER BOX */}
              <div className="bg-[#120b17] p-6 rounded-2xl border border-rose-900/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-rose-900/30 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-rose-400" />
                    <h3 className="text-sm font-bold text-white">
                      Fluent Model Answer (Read Out Loud into Microphone)
                    </h3>
                  </div>

                  {/* Audio Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => speakText(currentQuestion.modelAnswer)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isSpeakingTTS
                          ? 'bg-amber-600 border-amber-500 text-white animate-pulse'
                          : 'bg-rose-950/60 border-rose-800/50 text-rose-300 hover:bg-rose-900/50'
                      }`}
                    >
                      {isSpeakingTTS ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isSpeakingTTS ? 'Stop Audio' : 'Listen to Model Voice'}</span>
                    </button>
                  </div>
                </div>

                {/* Teleprompter Box */}
                <div className="p-5 rounded-xl bg-[#0c0710] border border-rose-950/80 leading-relaxed text-sm text-slate-200 font-mono tracking-wide relative min-h-[140px]">
                  {wordDiff.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {wordDiff.map((item, idx) => (
                        <span
                          key={idx}
                          className={`px-1 rounded transition-colors ${
                            item.status === 'matched'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50 font-bold'
                              : 'text-slate-400 opacity-60'
                          }`}
                        >
                          {item.word}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-200">{currentQuestion.modelAnswer}</p>
                  )}
                </div>

                {/* Key Keywords to Hit */}
                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Must-Hit Technical Keywords (Voice Recognition Target):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentQuestion.keywords.map((kw) => {
                      const isHit = matchedKeywords.some((m) => m.toLowerCase() === kw.toLowerCase());
                      return (
                        <span
                          key={kw}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                            isHit
                              ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950 scale-105'
                              : 'bg-[#1b1124] text-slate-400 border border-rose-900/30'
                          }`}
                        >
                          {isHit ? '✓ ' : ''}{kw}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* MICROPHONE ACTION BUTTON */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-rose-900/30">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleListening}
                      className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2.5 shadow-lg transition-all ${
                        isListening
                          ? 'bg-rose-600 text-white animate-pulse shadow-rose-600/40 ring-4 ring-rose-500/30'
                          : 'bg-gradient-to-r from-rose-600 to-rose-700 text-white hover:from-rose-500 hover:to-rose-600 shadow-rose-950'
                      }`}
                    >
                      {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      <span>{isListening ? 'Stop & Evaluate Speech' : 'Start Speaking Out Loud'}</span>
                    </button>

                    {transcript && (
                      <button
                        onClick={() => {
                          setTranscript('');
                          setFluencyScore(null);
                          setWordDiff([]);
                        }}
                        className="p-2.5 rounded-xl bg-[#1b1124] border border-rose-900/40 text-slate-400 hover:text-slate-200 transition-colors"
                        title="Clear Speech"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {isListening && (
                    <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                      <span>Listening... Speak fluently into your mic</span>
                    </div>
                  )}
                </div>
              </div>

              {/* LIVE SPEECH ANALYZER RESULTS */}
              {transcript && (
                <div className="bg-[#120b17] p-6 rounded-2xl border border-rose-900/40 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-rose-900/30 pb-3">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-sm font-bold text-white">Your Spoken Transcript & AI Fluency Metrics</h3>
                    </div>
                    {speechDurationSecs > 0 && (
                      <span className="text-xs text-slate-400 font-mono">Spoken in {speechDurationSecs}s</span>
                    )}
                  </div>

                  {/* Transcribed text display */}
                  <div className="p-4 rounded-xl bg-[#0c0710] border border-rose-950 text-xs text-slate-300 font-mono">
                    <strong className="text-slate-400 block mb-1">Microphone Speech Transcript:</strong>
                    &quot;{transcript}&quot;
                  </div>

                  {/* Metrics Cards Grid */}
                  {fluencyScore !== null && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#1a1024] to-[#120a1a] border border-rose-900/40 text-center">
                        <span className="text-xs text-slate-400 font-semibold block mb-1">Word Fluency Score</span>
                        <div className="text-2xl font-black text-rose-400">{fluencyScore}%</div>
                        <span className="text-[10px] text-slate-500">
                          {fluencyScore >= 85 ? '🌟 Native Fluency' : fluencyScore >= 65 ? '👍 Strong Flow' : '💪 Practice Repeating'}
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#1a1024] to-[#120a1a] border border-rose-900/40 text-center">
                        <span className="text-xs text-slate-400 font-semibold block mb-1">Speaking Pacing (WPM)</span>
                        <div className="text-2xl font-black text-amber-400">{wpm || 135}</div>
                        <span className="text-[10px] text-slate-500">Target: 120-150 Words/Min</span>
                      </div>

                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#1a1024] to-[#120a1a] border border-rose-900/40 text-center">
                        <span className="text-xs text-slate-400 font-semibold block mb-1">Tech Keywords Hit</span>
                        <div className="text-2xl font-black text-emerald-400">
                          {matchedKeywords.length} / {currentQuestion.keywords.length}
                        </div>
                        <span className="text-[10px] text-slate-500">Accent & Keyword Precision</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: AI ACCENTURE MOCK INTERVIEWER CHATBOT */}
        {/* ========================================================================= */}
        {activeTab === 'bot' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Chat Banner */}
            <div className="bg-[#120b17] p-5 rounded-2xl border border-rose-900/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                    Accenture Panel Interview Simulator
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white">Live Mock Technical & HR Round</h2>
              </div>

              {/* Round Selector */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsBotVoiceActive(!isBotVoiceActive)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isBotVoiceActive ? 'bg-rose-950/80 border-rose-600 text-rose-300' : 'bg-[#180f21] border-rose-900/40 text-slate-500'
                  }`}
                  title="Toggle Voice Readout"
                >
                  {isBotVoiceActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <select
                  value={botRoundType}
                  onChange={(e) => handleRoundTypeChange(e.target.value as 'full' | 'technical' | 'project' | 'hr')}
                  className="bg-[#1a1024] border border-rose-900/50 rounded-xl px-3 py-2 text-xs text-slate-200 font-medium focus:outline-none focus:border-rose-500"
                >
                  <option value="full">Full Accenture Round (ASE / Advanced ASE)</option>
                  <option value="technical">Technical CS & DSA Focus</option>
                  <option value="project">Project Grilling (CNN & MERN)</option>
                  <option value="hr">HR & Cultural Fit</option>
                </select>
              </div>
            </div>

            {/* Chat Box Container */}
            <div className="bg-[#120b17] rounded-2xl border border-rose-900/40 shadow-xl overflow-hidden flex flex-col h-[560px]">
              {/* Messages Area */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 custom-scrollbar">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                      {/* Bubble */}
                      <div
                        className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white font-medium rounded-tr-none shadow-lg shadow-rose-950'
                            : 'bg-[#1c1226] border border-rose-900/40 text-slate-200 rounded-tl-none'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 opacity-75">
                          <span className="font-bold uppercase tracking-wider">
                            {msg.sender === 'user' ? 'Aman Patel' : 'Accenture Interviewer'}
                          </span>
                          <span>{msg.time}</span>
                        </div>
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>

                      {/* Feedback Box if available */}
                      {msg.feedback && (
                        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#1a1024] to-[#12081a] border border-rose-800/40 text-xs space-y-2 shadow-md">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1">
                              <Award className="w-3.5 h-3.5 text-amber-400" /> AI Evaluation Feedback
                            </span>
                            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-black border border-rose-800/50">
                              Score: {msg.feedback.score}/10
                            </span>
                          </div>

                          {msg.feedback.strengths.length > 0 && (
                            <div className="text-emerald-300 flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{msg.feedback.strengths.join('. ')}</span>
                            </div>
                          )}

                          {msg.feedback.missed.length > 0 && (
                            <div className="text-amber-300/90 flex items-start gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              <span>Missed key topics: {msg.feedback.missed.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isBotThinking && (
                  <div className="flex justify-start">
                    <div className="bg-[#1c1226] border border-rose-900/40 p-3 rounded-2xl text-xs text-rose-400 flex items-center gap-2">
                      <Brain className="w-4 h-4 animate-spin text-rose-500" />
                      <span>Accenture Interviewer is evaluating your answer...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="p-4 bg-[#0e0712] border-t border-rose-900/40 space-y-2">
                {/* Voice transcript preview if listening */}
                {transcript && (
                  <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-800/30 text-xs text-rose-200 flex items-center justify-between">
                    <span className="truncate">Voice: &quot;{transcript}&quot;</span>
                    <button
                      onClick={() => {
                        handleSendBotAnswer(transcript);
                        setTranscript('');
                      }}
                      className="px-2 py-1 rounded bg-rose-600 text-white font-bold text-[10px]"
                    >
                      Send Voice
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleListening}
                    className={`p-3 rounded-xl border transition-all ${
                      isListening
                        ? 'bg-rose-600 border-rose-500 text-white animate-pulse'
                        : 'bg-[#180f21] border-rose-900/40 text-slate-300 hover:text-white'
                    }`}
                    title="Speak Answer"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    placeholder="Type or speak your answer for Accenture panel..."
                    value={userInputText}
                    onChange={(e) => setUserInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendBotAnswer()}
                    className="flex-1 bg-[#1a1024] border border-rose-900/40 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />

                  <button
                    onClick={() => handleSendBotAnswer()}
                    disabled={!userInputText.trim() || isBotThinking}
                    className="p-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 text-white disabled:opacity-50 transition-all shadow-md shadow-rose-950"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ACCENTURE MASTER CHEAT SHEET */}
        {/* ========================================================================= */}
        {activeTab === 'cheatsheet' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-[#120b17] p-6 rounded-2xl border border-rose-900/40 shadow-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-rose-900/30 pb-3">
                <ShieldCheck className="w-5 h-5 text-rose-400" />
                <h2 className="text-lg font-bold text-white">Aman Patel — Accenture Candidate Cheat Sheet</h2>
              </div>

              {/* 4 Cards Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card 1: CNN Project */}
                <div className="p-4 rounded-xl bg-[#180f21] border border-rose-950 space-y-2">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                    <Cpu className="w-4 h-4" /> CNN Chicken Disease Detection
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    <li>Dual Pipeline: <strong>VGG16 + MobileNetV2</strong> ensembled.</li>
                    <li>Accuracy: <strong>95.2%</strong> on 5,000+ poultry images (Coccidiosis).</li>
                    <li>Research Paper: Published at <strong>ICCCNet 2026</strong>.</li>
                    <li>Features: Gemini RAG for Q&A, Sarvam AI voice (5+ languages), Docker Vercel latency &lt;2s.</li>
                  </ul>
                </div>

                {/* Card 2: MERN & Real-Time */}
                <div className="p-4 rounded-xl bg-[#180f21] border border-rose-950 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                    <Layers className="w-4 h-4" /> EasyTrip & CampusConnect
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    <li>EasyTrip: 10+ concurrent GPS riders, <strong>Socket.io SOS &lt;500ms</strong>.</li>
                    <li>CampusConnect: WebRTC video calls, JWT auth, bcrypt password hashing.</li>
                    <li>AI Career Path: GPT-4 roadmaps, RapidAPI JSearch, ATS optimizer.</li>
                  </ul>
                </div>

                {/* Card 3: Core CS & OOP */}
                <div className="p-4 rounded-xl bg-[#180f21] border border-rose-950 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" /> Core Technical Answers
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    <li>Call by value (copy) vs Call by reference (address).</li>
                    <li>4 OOP Pillars: Encapsulation, Abstraction, Inheritance, Polymorphism.</li>
                    <li>DBMS: 1NF (atomic), 2NF (no partial key dep), 3NF (no transitive dep).</li>
                    <li>OS: Process (separate address space) vs Thread (shared memory).</li>
                  </ul>
                </div>

                {/* Card 4: AWS & HR */}
                <div className="p-4 rounded-xl bg-[#180f21] border border-rose-950 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                    <Award className="w-4 h-4" /> AWS Certs & Accenture Fit
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    <li>Certs: <strong>AWS Certified AI Practitioner</strong> & <strong>Cloud Practitioner</strong>.</li>
                    <li>Cloud Choice: EC2 (Compute), S3 (Object Storage), RDS (Managed Relational DB).</li>
                    <li>Pitch: Digital transformation, cloud-first alignment, cross-functional agility.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
