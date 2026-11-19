'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Send, Bot, User, FileText, Mail, ExternalLink,
  ChevronRight, Zap, Loader2, ChevronDown,
} from 'lucide-react';

/* ─────────────────────────── Types ─────────────────────────── */

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  revealed: boolean;
}

interface RecruiterChatModalProps {
  hideTrigger?: boolean;
}

/* ─────────────────────────── Constants ─────────────────────── */

const PARTICLE_COUNT = 6;
const TYPEWRITER_INTERVAL_MS = 15;

/* ─────────────────────────── Particle burst ────────────────── */

function ParticleBurst({ active }: { active: boolean }) {
  const angles = Array.from({ length: PARTICLE_COUNT }, (_, i) =>
    (i * 360) / PARTICLE_COUNT
  );
  return (
    <AnimatePresence>
      {active &&
        angles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const dist = 28 + Math.random() * 12;
          const tx = Math.cos(rad) * dist;
          const ty = Math.sin(rad) * dist;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: tx, y: ty, scale: 0.3 }}
              exit={{}}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#FE8040',
                pointerEvents: 'none',
                top: '50%',
                right: 20,
                marginTop: -2.5,
              }}
            />
          );
        })}
    </AnimatePresence>
  );
}

/* ─────────────────────────── Animated orb avatar ───────────── */

function PulsingOrb({ loading }: { loading: boolean }) {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
      {/* Breathing outer ring */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: -3,
          borderRadius: '50%',
          border: '1.5px solid #FE8040',
          pointerEvents: 'none',
        }}
      />
      {/* Orb body */}
      <motion.div
        animate={{
          scale: [1, 1.07, 1],
          background: [
            'radial-gradient(circle at 35% 35%, #FFB347, #FE8040 55%, #c94a00)',
            'radial-gradient(circle at 65% 65%, #FFB347, #FE8040 55%, #c94a00)',
            'radial-gradient(circle at 35% 35%, #FFB347, #FE8040 55%, #c94a00)',
          ],
        }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 10px rgba(254,128,64,0.5)',
        }}
      >
        {loading ? (
          <Loader2
            className="w-4 h-4 text-[#0F0F0F]"
            style={{ animation: 'spin 0.7s linear infinite' }}
          />
        ) : (
          <Bot className="w-4 h-4 text-[#0F0F0F]" />
        )}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────── Ambient orbs ──────────────────── */

const AMBIENT_ORBS: Array<{
  color: string;
  size: number;
  paths: Array<{ x: number; y: number }>;
  duration: number;
}> = [
  {
    color: 'rgba(254,128,64,0.08)',
    size: 220,
    paths: [
      { x: 10, y: 20 },
      { x: 60, y: 60 },
      { x: 30, y: 80 },
      { x: 10, y: 20 },
    ],
    duration: 11,
  },
  {
    color: 'rgba(140,80,220,0.07)',
    size: 180,
    paths: [
      { x: 70, y: 10 },
      { x: 20, y: 50 },
      { x: 75, y: 85 },
      { x: 70, y: 10 },
    ],
    duration: 9,
  },
  {
    color: 'rgba(254,128,64,0.05)',
    size: 150,
    paths: [
      { x: 50, y: 70 },
      { x: 80, y: 30 },
      { x: 15, y: 15 },
      { x: 50, y: 70 },
    ],
    duration: 13,
  },
];

function AmbientOrbs() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {AMBIENT_ORBS.map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            x: orb.paths.map((p) => `${p.x}%`),
            y: orb.paths.map((p) => `${p.y}%`),
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: orb.color,
            filter: 'blur(60px)',
            top: `-${orb.size / 2}px`,
            left: `-${orb.size / 2}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── Thinking bubble ───────────────── */

function ThinkingBubble() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCounter((c) => (c >= 99 ? 0 : c + 1));
    }, 200);
    return () => clearInterval(id);
  }, []);

  const waveDelays = [0, 0.1, 0.2, 0.3, 0.4];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="flex gap-3 items-start"
    >
      <PulsingOrb loading={true} />
      <div
        className="rounded-2xl px-4 py-3 text-xs flex flex-col gap-2 border bg-[#191919] border-[#303030] text-[#999999] rounded-tl-sm shadow-md overflow-hidden"
        style={{ minWidth: 220, position: 'relative' }}
      >
        {/* Scanning line */}
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '40%',
            height: '100%',
            background:
              'linear-gradient(90deg, transparent, rgba(254,128,64,0.18), transparent)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Waveform bars */}
        <div className="flex items-center gap-1 h-5">
          {waveDelays.map((delay, i) => (
            <motion.span
              key={i}
              animate={{ height: ['4px', '20px', '4px'] }}
              transition={{
                repeat: Infinity,
                duration: 0.7,
                ease: 'easeInOut',
                delay,
              }}
              style={{
                width: 4,
                borderRadius: 2,
                background: '#FE8040',
                display: 'inline-block',
                alignSelf: 'center',
              }}
            />
          ))}
        </div>

        {/* Label + counter */}
        <div className="flex items-center gap-2">
          <span className="text-[#FE8040] font-mono font-medium text-xs">
            Neural processing...
          </span>
          <span className="text-[#777777] font-mono text-[10px]">
            {String(counter).padStart(2, '0')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────── Markdown renderer ─────────────── */

function renderFormattedLine(line: string): React.ReactNode[] {
  const tokenRegex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
  const parts = line.split(tokenRegex);

  return parts.map((part, i) => {
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch)
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FE8040] underline hover:text-[#FF995F] font-semibold inline-flex items-center gap-0.5"
        >
          {linkMatch[1]}
          <ExternalLink className="w-3 h-3 inline" />
        </a>
      );
    const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
    if (boldMatch)
      return (
        <strong key={i} className="font-bold text-[#F5F5F5]">
          {boldMatch[1]}
        </strong>
      );
    const codeMatch = part.match(/^`(.*?)`$/);
    if (codeMatch)
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded text-xs font-mono bg-[#222222] text-[#FE8040] border border-[#303030]"
        >
          {codeMatch[1]}
        </code>
      );
    const italicMatch = part.match(/^\*(.*?)\*$/);
    if (italicMatch)
      return (
        <em key={i} className="italic text-[#999999]">
          {italicMatch[1]}
        </em>
      );
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function renderFormattedText(text: string): React.ReactNode[] {
  return text.split('\n').map((line, lineIdx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('### '))
      return (
        <h4 key={lineIdx} className="font-bold text-sm mt-3 mb-1 text-[#F5F5F5]">
          {trimmed.replace(/^###\s+/, '')}
        </h4>
      );
    if (trimmed.startsWith('## '))
      return (
        <h3 key={lineIdx} className="font-bold text-base mt-3 mb-1 text-[#F5F5F5]">
          {trimmed.replace(/^##\s+/, '')}
        </h3>
      );

    const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numberMatch)
      return (
        <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
          <span className="text-[#FE8040] font-bold text-xs mt-0.5 min-w-[1.2rem]">
            {numberMatch[1]}.
          </span>
          <span className="flex-1 text-[#CCCCCC]">
            {renderFormattedLine(numberMatch[2])}
          </span>
        </div>
      );

    if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const bulletText = trimmed.replace(/^[•\-\*]\s+/, '');
      return (
        <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
          <span className="text-[#FE8040] font-bold leading-none mt-1 text-sm">•</span>
          <span className="flex-1 text-[#CCCCCC]">{renderFormattedLine(bulletText)}</span>
        </div>
      );
    }

    if (trimmed === '') return <div key={lineIdx} className="h-2" />;

    return (
      <p key={lineIdx} className="my-1 leading-relaxed text-[#CCCCCC]">
        {renderFormattedLine(line)}
      </p>
    );
  });
}

/* ─────────────────────────── Typewriter message ────────────── */

function TypewriterText({ content, done }: { content: string; done: boolean }) {
  const [displayed, setDisplayed] = useState(done ? content : '');

  useEffect(() => {
    if (done) {
      setDisplayed(content);
      return;
    }
    setDisplayed('');
    let idx = 0;
    const id = setInterval(() => {
      idx += 1;
      setDisplayed(content.slice(0, idx));
      if (idx >= content.length) clearInterval(id);
    }, TYPEWRITER_INTERVAL_MS);
    return () => clearInterval(id);
  }, [content, done]);

  return <div className="space-y-1">{renderFormattedText(displayed || '')}</div>;
}

/* ─────────────────────────── Scroll-to-bottom indicator ────── */

function ScrollIndicator({
  show,
  onClick,
}: {
  show: boolean;
  onClick: () => void;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 8, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.85 }}
          onClick={onClick}
          title="Scroll to bottom"
          style={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            background: '#FE8040',
            border: 'none',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 0 14px rgba(254,128,64,0.55)',
          }}
        >
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-[#0F0F0F]" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────── Main component ────────────────── */

export default function RecruiterChatModal({
  hideTrigger = false,
}: RecruiterChatModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingAnim, setIsSendingAnim] = useState(false);
  const [inputGlow, setInputGlow] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Hello! I'm Aman's AI assistant. Ask me anything about his projects, technical stack, published research, or background!`,
      timestamp: 'Just now',
      revealed: true,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  /* Keyboard shortcuts */
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('open-aman-chat', handleOpen);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-aman-chat', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  /* Scroll to bottom on open/new messages */
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  /* Track scroll position for scroll indicator */
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const handler = () => {
      const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      setShowScrollBtn(distFromBottom > 80);
    };
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, [isOpen]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  /* Mark oldest unrevealed assistant message as revealed after typewriter finishes */
  const markRevealed = useCallback((id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, revealed: true } : m))
    );
  }, []);

  /* Send message */
  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || input.trim();
    if (!textToSend || isLoading) return;

    // Input glow flash
    setInputGlow(true);
    setTimeout(() => setInputGlow(false), 600);

    // Particle burst
    setIsSendingAnim(true);
    setTimeout(() => setIsSendingAnim(false), 450);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      revealed: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content:
          data.reply || 'Thank you! Reach Aman directly at amanpatelsrm@gmail.com.',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        revealed: false, // typewriter will reveal
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content:
            'Sorry, I had trouble processing that. Reach Aman directly at [amanpatelsrm@gmail.com](mailto:amanpatelsrm@gmail.com) or download his [Resume PDF](/resume.pdf)!',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          revealed: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /* ─── Render ─── */
  return (
    <>
      {/* Floating trigger button */}
      {!hideTrigger && (
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9990] w-12 h-12 rounded-full bg-[#191919] text-[#FE8040] border border-[#303030] hover:border-[#FE8040] shadow-2xl flex items-center justify-center cursor-pointer transition-colors group"
          title="Chat with AI Assistant (Cmd+K)"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-5 h-5 text-[#FE8040] group-hover:scale-110 transition-transform" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FE8040] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FE8040]" />
          </span>
        </motion.button>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[99999] flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 32 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl h-[92vh] sm:h-[86vh] max-h-[760px] flex flex-col overflow-hidden rounded-2xl border border-[#303030] shadow-2xl bg-[#0F0F0F] text-[#CCCCCC]"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow:
                  '0 0 60px rgba(254,128,64,0.12), 0 25px 60px rgba(0,0,0,0.85)',
              }}
            >
              {/* ── Header ── */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#303030] bg-[#121212]">
                <div className="flex items-center gap-3">
                  {/* macOS dots */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-3 h-3 rounded-full bg-[#f85149] hover:opacity-80 transition-opacity cursor-pointer"
                      title="Close"
                    />
                    <span className="w-3 h-3 rounded-full bg-[#d29922]" />
                    <span className="w-3 h-3 rounded-full bg-[#2ea043]" />
                  </div>

                  <div className="h-4 w-px bg-[#303030] mx-1" />

                  <div className="flex items-center gap-2.5">
                    {/* Animated 3D-like pulsing orb avatar */}
                    <div className="relative">
                      <PulsingOrb loading={isLoading} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-xs tracking-tight text-[#F5F5F5]">
                          AI Portfolio Assistant
                        </h3>
                        <span className="text-[10px] bg-[#FE8040]/15 border border-[#FE8040]/40 text-[#FE8040] px-2 py-0.5 rounded-full font-mono font-medium flex items-center gap-1">
                          <Zap className="w-2.5 h-2.5" />
                          <span>RAG ONLINE</span>
                        </span>
                      </div>
                      <p className="text-[10px] text-[#777777] font-normal">
                        Aman Patel &middot; Resume &middot; Projects &middot; Research
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#191919] hover:bg-[#222222] text-xs font-medium text-[#CCCCCC] hover:text-[#FE8040] transition-all border border-[#303030] hover:border-[#FE8040]"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Resume</span>
                  </a>
                  <a
                    href="mailto:amanpatelsrm@gmail.com"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FE8040] hover:bg-[#FF995F] text-[#0F0F0F] text-xs font-semibold transition-all shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-[#222222] text-[#777777] hover:text-[#FE8040] transition-colors cursor-pointer"
                    title="Close (Esc)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ── Messages container ── */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[#0F0F0F] relative"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#303030 transparent',
                }}
              >
                {/* Ambient floating orbs */}
                <AmbientOrbs />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {messages.map((m, idx) => (
                    <motion.div
                      key={m.id}
                      initial={
                        m.role === 'user'
                          ? { opacity: 0, x: 60, scale: 0.94 }
                          : { opacity: 0, x: -60, scale: 0.94 }
                      }
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={
                        m.role === 'user'
                          ? {
                              type: 'spring',
                              stiffness: 340,
                              damping: 22,
                              delay: idx === 0 ? 0 : 0.04,
                            }
                          : {
                              type: 'spring',
                              stiffness: 280,
                              damping: 20,
                              delay: idx === 0 ? 0 : 0.04,
                            }
                      }
                      className={`flex gap-3 mb-4 ${
                        m.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {m.role === 'assistant' && (
                        <div
                          className="w-8 h-8 rounded-lg bg-[#FE8040] text-[#0F0F0F] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm"
                          style={{ minWidth: 32 }}
                        >
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs md:text-sm leading-relaxed ${
                          m.role === 'user'
                            ? 'bg-[#FE8040] text-[#0F0F0F] font-medium rounded-tr-sm shadow-md'
                            : 'bg-[#191919] border border-[#303030] text-[#CCCCCC] rounded-tl-sm shadow-md'
                        }`}
                      >
                        {m.role === 'assistant' ? (
                          <TypewriterText
                            content={m.content}
                            done={m.revealed}
                          />
                        ) : (
                          <div className="space-y-1">
                            {renderFormattedText(m.content)}
                          </div>
                        )}
                        <span
                          className={`block text-[10px] mt-1.5 text-right ${
                            m.role === 'user'
                              ? 'text-[#0F0F0F]/65'
                              : 'text-[#777777]'
                          }`}
                        >
                          {m.timestamp}
                        </span>
                      </div>

                      {m.role === 'user' && (
                        <div className="w-8 h-8 rounded-lg bg-[#222222] border border-[#303030] text-[#FE8040] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {/* Thinking state */}
                  {isLoading && <ThinkingBubble />}

                  <div ref={messagesEndRef} />
                </div>

                {/* Scroll-to-bottom indicator */}
                <ScrollIndicator
                  show={showScrollBtn}
                  onClick={scrollToBottom}
                />
              </div>

              {/* ── Chat input ── */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 sm:p-4 border-t border-[#303030] flex items-center gap-2 sm:gap-3 bg-[#121212] relative overflow-visible"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about Aman..."
                  disabled={isLoading}
                  className="flex-1 rounded-xl px-3.5 sm:px-4 py-2.5 text-base sm:text-xs md:text-sm border transition-all focus:outline-none bg-[#0F0F0F] text-[#F5F5F5] placeholder-[#777777]"
                  style={{
                    borderColor: inputGlow ? '#FE8040' : '#303030',
                    boxShadow: inputGlow
                      ? '0 0 0 2px rgba(254,128,64,0.35), 0 0 16px rgba(254,128,64,0.2)'
                      : 'none',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                  }}
                />

                {/* Send button with particle burst */}
                <div style={{ position: 'relative', display: 'inline-flex' }}>
                  <ParticleBurst active={isSendingAnim} />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.93 }}
                    className="relative px-4 sm:px-5 py-2.5 rounded-xl bg-[#FE8040] text-[#0F0F0F] font-bold text-xs md:text-sm flex items-center gap-1.5 hover:bg-[#FF995F] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md overflow-visible shrink-0"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
