'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  FileText,
  Mail,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  'What are your top backend skills?',
  'Tell me about your published CNN research',
  'How did you architect EasyTrip with WebSockets?',
  'What is your CGPA & education at SRM IST?',
  'What are your AWS certifications?',
  'Why should we hire Aman for a Software Engineer role?',
  'What technical and HR questions can you answer about Aman?',
];

export default function RecruiterChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `### 👋 Welcome to Aman Patel's Portfolio AI Assistant

I am trained using **RAG (Retrieval-Augmented Generation)** on Aman's verified resume, academic transcripts, technical projects, and published research.

I am capable of answering recruiter and technical questions across:
• **About Aman**: Background, career journey, strengths, and work ethic
• **Academics**: SRM IST B.Tech in CSE Data Science (**8.83/10 CGPA**)
• **Known Skills**: Java, Python, Node.js, Express, React, Next.js, AWS, TensorFlow & **250+ LeetCode streak**
• **Project Architectures**: **EasyTrip** (solo real-time platform), **ChickTech AI** (ICCCNet 2026 paper), and **Career Path Generator**
• **Technical Questions**: WebSockets, CNN pipelines, REST APIs, RAG architecture, and AWS cloud workflows
• **HR & Behavioral Questions**: Team collaboration, why hire Aman, problem solving, and role availability

Feel free to click any **Recruiter Prompt** below or type your own question!`,
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || input.trim();
    if (!textToSend || isLoading) return;

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
        content: data.reply || 'Thank you for your question. Feel free to contact Aman at amanpatelsrm@gmail.com!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'Sorry, I had trouble processing that request. Please feel free to reach Aman directly at [amanpatelsrm@gmail.com](mailto:amanpatelsrm@gmail.com) or download his [Resume PDF](/resume.pdf)!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormattedLine = (line: string) => {
    // Matches markdown links [text](url), bold **text**, inline code `code`, italic *text*
    const tokenRegex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
    const parts = line.split(tokenRegex);

    return parts.map((part, i) => {
      // Check for link
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a
            key={i}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4ff3f] underline hover:text-[#e34234] font-bold inline-flex items-center gap-0.5 ml-0.5 mr-0.5"
          >
            {linkMatch[1]}
            <ExternalLink className="w-3 h-3 inline" />
          </a>
        );
      }

      // Check for bold **text**
      const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
      if (boldMatch) {
        return (
          <strong key={i} className="font-extrabold text-[#D4ff3f]">
            {boldMatch[1]}
          </strong>
        );
      }

      // Check for inline code `text`
      const codeMatch = part.match(/^`(.*?)`$/);
      if (codeMatch) {
        return (
          <code key={i} className="bg-white/10 text-[#D4ff3f] px-1.5 py-0.5 rounded text-xs font-mono">
            {codeMatch[1]}
          </code>
        );
      }

      // Check for italic *text*
      const italicMatch = part.match(/^\*(.*?)\*$/);
      if (italicMatch) {
        return (
          <em key={i} className="italic text-white font-medium">
            {italicMatch[1]}
          </em>
        );
      }

      return part;
    });
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      const trimmed = line.trim();

      // Heading ###
      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={lineIdx} className="font-black text-sm text-[#D4ff3f] mt-3 mb-1 tracking-wide">
            {trimmed.replace(/^###\s+/, '')}
          </h4>
        );
      }

      // Heading ##
      if (trimmed.startsWith('## ')) {
        return (
          <h3 key={lineIdx} className="font-black text-base text-white mt-3 mb-1 tracking-wide">
            {trimmed.replace(/^##\s+/, '')}
          </h3>
        );
      }

      // Numbered lists
      const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (numberMatch) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-[#D4ff3f] font-bold text-xs mt-0.5 min-w-[1.2rem]">{numberMatch[1]}.</span>
            <span className="flex-1 text-white/95">{renderFormattedLine(numberMatch[2])}</span>
          </div>
        );
      }

      // Bullet points (• or - or *)
      if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const bulletText = trimmed.replace(/^[•\-\*]\s+/, '');
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-[#D4ff3f] font-black leading-none mt-1 text-sm">•</span>
            <span className="flex-1 text-white/95">{renderFormattedLine(bulletText)}</span>
          </div>
        );
      }

      // Empty line / paragraph gap
      if (trimmed === '') {
        return <div key={lineIdx} className="h-2" />;
      }

      return (
        <p key={lineIdx} className="my-1 text-white/95 leading-relaxed">
          {renderFormattedLine(line)}
        </p>
      );
    });
  };

  return (
    <>
      {/* ── Trigger Button (Positioned directly below "📄 View Resume") ── */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-black text-[#D4ff3f] font-bold text-xs border-2 border-black shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-[#D4ff3f] hover:text-black hover:border-black transition-all duration-300 cursor-pointer pointer-events-auto"
        title="Ask anything about Aman's resume and projects"
      >
        <span className="w-2 h-2 rounded-full bg-[#e34234] group-hover:bg-black animate-pulse" />
        <Bot className="w-3.5 h-3.5" />
        <span>Ask</span>
      </button>

      {/* ── Recruiter Chat Modal Window ── */}
      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 md:p-6 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl h-[85vh] max-h-[750px] bg-black text-white rounded-3xl border-2 border-[#D4ff3f] shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/15 bg-black">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D4ff3f] text-black flex items-center justify-center font-black shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-sm text-white">Aman Patel AI</h3>
                      <span className="text-[10px] bg-[#D4ff3f]/20 border border-[#D4ff3f]/40 text-[#D4ff3f] px-2 py-0.2 rounded-full font-bold">
                        Recruiter Hub
                      </span>
                    </div>
                    <p className="text-[11px] text-[#cbb3e8]">
                      Trained with RAG &middot; Academics &middot; Projects &middot; Technical & HR Q&A
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#D4ff3f] hover:text-black text-xs font-bold transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Resume</span>
                  </a>
                  <a
                    href="mailto:amanpatelsrm@gmail.com"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e34234] hover:bg-white hover:text-black text-white text-xs font-bold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact</span>
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-lg bg-white/10 text-white/80 hover:text-white hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close Chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-lg bg-[#D4ff3f] text-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs md:text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-[#e34234] text-white font-medium rounded-tr-xs shadow-md'
                          : 'bg-white/10 border border-white/15 text-white/95 rounded-tl-xs shadow-md'
                      }`}
                    >
                      <div className="space-y-1">{renderFormattedText(m.content)}</div>
                      <span
                        className={`block text-[10px] mt-1.5 text-right ${
                          m.role === 'user' ? 'text-white/70' : 'text-white/40'
                        }`}
                      >
                        {m.timestamp}
                      </span>
                    </div>

                    {m.role === 'user' && (
                      <div className="w-8 h-8 rounded-lg bg-[#e34234] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-lg bg-[#D4ff3f] text-black flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 animate-spin" />
                    </div>
                    <div className="bg-white/10 border border-white/15 rounded-2xl px-4 py-2.5 text-xs text-white/70 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4ff3f] animate-ping" />
                      <span>Synthesizing response from Aman&apos;s verified resume...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Pills */}
              <div className="px-4 py-2 border-t border-white/10 bg-black/60 overflow-x-auto flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#cbb3e8] whitespace-nowrap flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D4ff3f]" />
                  Recruiter Prompts:
                </span>
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isLoading}
                    className="text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white/80 hover:bg-[#D4ff3f] hover:text-black hover:border-black whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <span>{prompt}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                ))}
              </div>

              {/* Chat Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-4 border-t border-white/15 bg-black flex items-center gap-3"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about backend skills, published research, projects, or HR questions..."
                  disabled={isLoading}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D4ff3f] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-4 py-3 rounded-xl bg-[#D4ff3f] text-black font-black text-xs md:text-sm flex items-center gap-1.5 hover:bg-[#cbb3e8] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                >
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
