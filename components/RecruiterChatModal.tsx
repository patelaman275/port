'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, FileText, Mail, ExternalLink, ChevronRight, Sparkles, Zap } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface RecruiterChatModalProps {
  hideTrigger?: boolean;
}

const SUGGESTED_PROMPTS = [
  'What are your top backend skills?',
  'Tell me about your published CNN research',
  'How did you architect EasyTrip with WebSockets?',
  'What is your CGPA & education at SRM IST?',
  'What are your AWS certifications?',
  'Why should we hire Aman for a Software Engineer role?',
];

export default function RecruiterChatModal({ hideTrigger = false }: RecruiterChatModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingAnim, setIsSendingAnim] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Hello! I'm Aman's AI assistant. Ask me anything about his projects, technical stack, published research, or background!`,
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Global event listener & Cmd+K / Ctrl+K shortcut
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

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || input.trim();
    if (!textToSend || isLoading) return;

    // Trigger sending flight animation
    setIsSendingAnim(true);
    setTimeout(() => setIsSendingAnim(false), 600);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Thank you! Reach Aman directly at amanpatelsrm@gmail.com.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormattedLine = (line: string) => {
    const tokenRegex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
    const parts = line.split(tokenRegex);

    return parts.map((part, i) => {
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
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
      }
      const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
      if (boldMatch) return <strong key={i} className="font-bold text-[#F5F5F5]">{boldMatch[1]}</strong>;

      const codeMatch = part.match(/^`(.*?)`$/);
      if (codeMatch) return (
        <code key={i} className="px-1.5 py-0.5 rounded text-xs font-mono bg-[#222222] text-[#FE8040] border border-[#303030]">
          {codeMatch[1]}
        </code>
      );

      const italicMatch = part.match(/^\*(.*?)\*$/);
      if (italicMatch) return <em key={i} className="italic text-[#999999]">{italicMatch[1]}</em>;

      return part;
    });
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('### ')) return (
        <h4 key={lineIdx} className="font-bold text-sm mt-3 mb-1 text-[#F5F5F5]">
          {trimmed.replace(/^###\s+/, '')}
        </h4>
      );

      if (trimmed.startsWith('## ')) return (
        <h3 key={lineIdx} className="font-bold text-base mt-3 mb-1 text-[#F5F5F5]">
          {trimmed.replace(/^##\s+/, '')}
        </h3>
      );

      const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (numberMatch) return (
        <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
          <span className="text-[#FE8040] font-bold text-xs mt-0.5 min-w-[1.2rem]">{numberMatch[1]}.</span>
          <span className="flex-1 text-[#CCCCCC]">{renderFormattedLine(numberMatch[2])}</span>
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
  };

  return (
    <>
      {!hideTrigger && (
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-6 right-6 z-[9990] w-12 h-12 rounded-full bg-[#191919] text-[#FE8040] border border-[#303030] hover:border-[#FE8040] shadow-2xl flex items-center justify-center cursor-pointer transition-colors group"
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

      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl h-[86vh] max-h-[760px] flex flex-col overflow-hidden rounded-2xl border border-[#303030] shadow-2xl bg-[#0F0F0F] text-[#CCCCCC]"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: '0 0 60px rgba(254,128,64,0.1), 0 25px 60px rgba(0,0,0,0.85)',
              }}
            >
              {/* ── Header with Live Pulsing Radar Animation ── */}
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
                    {/* Orange bot icon with subtle animated ping */}
                    <div className="relative w-8 h-8 rounded-lg bg-[#FE8040] text-[#0F0F0F] flex items-center justify-center shadow-sm">
                      <Bot className="w-4 h-4" />
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FE8040] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FE8040]" />
                      </span>
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

              {/* ── Messages Container with Ambient Breathing Background ── */}
              <div
                className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[#0F0F0F] relative"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#303030 transparent',
                  backgroundImage: 'radial-gradient(circle at 50% 15%, rgba(254, 128, 64, 0.035) 0%, transparent 60%)',
                }}
              >
                {messages.map((m, idx) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 16, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 26,
                      delay: idx === 0 ? 0 : 0.04,
                    }}
                    className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-lg bg-[#FE8040] text-[#0F0F0F] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
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
                      <div className="space-y-1">{renderFormattedText(m.content)}</div>
                      <span
                        className={`block text-[10px] mt-1.5 text-right ${
                          m.role === 'user' ? 'text-[#0F0F0F]/65' : 'text-[#777777]'
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

                {/* Animated Neural Thinking Waveform */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="flex gap-3 items-center"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FE8040] text-[#0F0F0F] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Sparkles className="w-4 h-4 animate-spin" />
                    </div>
                    <div className="rounded-2xl px-4 py-2.5 text-xs flex items-center gap-3 border bg-[#191919] border-[#303030] text-[#999999] rounded-tl-sm shadow-md">
                      {/* Animated audio/neural frequency bars */}
                      <div className="flex items-center gap-1 h-3">
                        <motion.span
                          animate={{ height: ['4px', '14px', '4px'] }}
                          transition={{ repeat: Infinity, duration: 0.7, ease: 'easeInOut' }}
                          className="w-1 bg-[#FE8040] rounded-full inline-block"
                        />
                        <motion.span
                          animate={{ height: ['6px', '16px', '6px'] }}
                          transition={{ repeat: Infinity, duration: 0.7, delay: 0.15, ease: 'easeInOut' }}
                          className="w-1 bg-[#FE8040] rounded-full inline-block"
                        />
                        <motion.span
                          animate={{ height: ['4px', '12px', '4px'] }}
                          transition={{ repeat: Infinity, duration: 0.7, delay: 0.3, ease: 'easeInOut' }}
                          className="w-1 bg-[#FE8040] rounded-full inline-block"
                        />
                      </div>
                      <span className="text-[#FE8040] font-mono font-medium">Synthesizing answer...</span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* ── Suggested Prompts with Hover Spring Micro-Animations ── */}
              <div
                className="px-4 py-2.5 border-t border-[#252525] overflow-x-auto flex items-center gap-2 bg-[#121212]"
                style={{ scrollbarWidth: 'none' }}
              >
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#FE8040] whitespace-nowrap flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE8040] animate-ping" />
                  Suggestions:
                </span>
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <motion.button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isLoading}
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className="text-[11px] px-3 py-1 rounded-full border border-[#303030] bg-[#191919] text-[#CCCCCC] hover:bg-[#222222] hover:text-[#FE8040] hover:border-[#FE8040] whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <span>{prompt}</span>
                    <ChevronRight className="w-3 h-3 text-[#FE8040]" />
                  </motion.button>
                ))}
              </div>

              {/* ── Chat Input with Flying Swoosh Animation ── */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-4 border-t border-[#303030] flex items-center gap-3 bg-[#121212] relative overflow-hidden"
              >
                {/* Sending wave flash */}
                {isSendingAnim && (
                  <motion.div
                    initial={{ x: '-100%', opacity: 0.5 }}
                    animate={{ x: '200%', opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FE8040]/20 to-transparent pointer-events-none"
                  />
                )}

                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about Aman..."
                  disabled={isLoading}
                  className="flex-1 rounded-xl px-4 py-2.5 text-xs md:text-sm border transition-all focus:outline-none bg-[#0F0F0F] border-[#303030] text-[#F5F5F5] placeholder-[#777777] focus:border-[#FE8040] focus:ring-1 focus:ring-[#FE8040]/30"
                />

                <motion.button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-5 py-2.5 rounded-xl bg-[#FE8040] text-[#0F0F0F] font-bold text-xs md:text-sm flex items-center gap-1.5 hover:bg-[#FF995F] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md overflow-hidden"
                >
                  <span>Send</span>
                  <motion.div
                    animate={
                      isSendingAnim
                        ? {
                            x: [0, 20, -20, 0],
                            y: [0, -15, 10, 0],
                            scale: [1, 1.3, 0.7, 1],
                            rotate: [0, 30, -10, 0],
                          }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.div>
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
