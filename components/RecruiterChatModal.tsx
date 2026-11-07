'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
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
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isDarkTheme = document.querySelector('.github-dark') !== null;
    setIsDark(isDarkTheme);

    const observer = new MutationObserver(() => {
      const darkActive = document.querySelector('.github-dark') !== null;
      setIsDark(darkActive);
    });

    observer.observe(document.body, { attributes: true, subtree: true, childList: true });
    return () => observer.disconnect();
  }, [isOpen]);

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

  // Global event listener & macOS keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('open-aman-chat', handleOpen);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-aman-chat', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
            className="text-[#58a6ff] underline hover:opacity-80 font-semibold inline-flex items-center gap-0.5 ml-0.5 mr-0.5"
          >
            {linkMatch[1]}
            <ExternalLink className="w-3 h-3 inline" />
          </a>
        );
      }

      const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
      if (boldMatch) {
        return (
          <strong key={i} className={`font-bold ${isDark ? 'text-[#f0f6fc]' : 'text-[#3a0f34]'}`}>
            {boldMatch[1]}
          </strong>
        );
      }

      const codeMatch = part.match(/^`(.*?)`$/);
      if (codeMatch) {
        return (
          <code
            key={i}
            className={`px-1.5 py-0.5 rounded text-xs font-mono ${
              isDark ? 'bg-[#21262d] text-[#58a6ff] border border-[#30363d]' : 'bg-[#3a0f34]/10 text-[#3a0f34]'
            }`}
          >
            {codeMatch[1]}
          </code>
        );
      }

      const italicMatch = part.match(/^\*(.*?)\*$/);
      if (italicMatch) {
        return (
          <em key={i} className={`italic ${isDark ? 'text-[#8b949e]' : 'text-[#5e3b58]'}`}>
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

      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={lineIdx} className={`font-bold text-sm mt-3 mb-1 ${isDark ? 'text-[#f0f6fc]' : 'text-[#3a0f34]'}`}>
            {trimmed.replace(/^###\s+/, '')}
          </h4>
        );
      }

      if (trimmed.startsWith('## ')) {
        return (
          <h3 key={lineIdx} className={`font-bold text-base mt-3 mb-1 ${isDark ? 'text-[#f0f6fc]' : 'text-[#3a0f34]'}`}>
            {trimmed.replace(/^##\s+/, '')}
          </h3>
        );
      }

      const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (numberMatch) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-[#58a6ff] font-bold text-xs mt-0.5 min-w-[1.2rem]">{numberMatch[1]}.</span>
            <span className={`flex-1 ${isDark ? 'text-[#c9d1d9]' : 'text-[#3a0f34]'}`}>
              {renderFormattedLine(numberMatch[2])}
            </span>
          </div>
        );
      }

      if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const bulletText = trimmed.replace(/^[•\-\*]\s+/, '');
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-[#58a6ff] font-bold leading-none mt-1 text-sm">•</span>
            <span className={`flex-1 ${isDark ? 'text-[#c9d1d9]' : 'text-[#3a0f34]'}`}>
              {renderFormattedLine(bulletText)}
            </span>
          </div>
        );
      }

      if (trimmed === '') {
        return <div key={lineIdx} className="h-2" />;
      }

      return (
        <p key={lineIdx} className={`my-1 leading-relaxed ${isDark ? 'text-[#c9d1d9]' : 'text-[#3a0f34]'}`}>
          {renderFormattedLine(line)}
        </p>
      );
    });
  };

  return (
    <>
      {!hideTrigger && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[9990] flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#238636] text-white font-bold text-xs shadow-xl cursor-pointer hover:bg-[#2ea043] transition-all"
        >
          <Bot className="w-4 h-4" />
          <span>Ask AI Assistant</span>
        </button>
      )}

      {/* Recruiter Chat Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-full max-w-2xl h-[85vh] max-h-[750px] flex flex-col overflow-hidden rounded-3xl border shadow-2xl ${
                isDark ? 'bg-[#0d1117] border-[#30363d] text-[#e6edf3]' : 'bg-[#dde3e8] border-[#3a0f34]/20 text-[#3a0f34]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className={`flex items-center justify-between px-5 py-3.5 border-b ${
                  isDark ? 'bg-[#161b22] border-[#30363d]' : 'bg-[#3a0f34] border-[#3a0f34]/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-3 h-3 rounded-full bg-[#f85149] hover:opacity-80 transition-opacity flex items-center justify-center cursor-pointer shadow-sm"
                      title="Close"
                    />
                    <span className="w-3 h-3 rounded-full bg-[#d29922] shadow-sm" />
                    <span className="w-3 h-3 rounded-full bg-[#2ea043] shadow-sm" />
                  </div>

                  <div className="h-4 w-px bg-white/20 mx-1" />

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#238636] text-white flex items-center justify-center font-bold shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-xs tracking-tight text-white">AI Portfolio Assistant</h3>
                        <span className="text-[10px] bg-[#1f6feb]/20 border border-[#58a6ff]/40 text-[#58a6ff] px-2 py-0.2 rounded-full font-mono font-medium">
                          RAG
                        </span>
                      </div>
                      <p className="text-[10px] text-white/70 font-normal">
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
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all border border-white/10"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Resume</span>
                  </a>
                  <a
                    href="mailto:amanpatelsrm@gmail.com"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold transition-all shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Messages Container */}
              <div
                className={`flex-1 overflow-y-auto p-4 md:p-6 space-y-4 ${
                  isDark ? 'bg-[#0d1117]' : 'bg-[#f4f7f9]'
                }`}
              >
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-lg bg-[#238636] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs md:text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-[#1f6feb] text-white font-medium rounded-tr-xs shadow-md'
                          : isDark
                          ? 'bg-[#161b22] border border-[#30363d] text-[#e6edf3] rounded-tl-xs shadow-md'
                          : 'bg-white border border-[#3a0f34]/15 text-[#3a0f34] rounded-tl-xs shadow-md'
                      }`}
                    >
                      <div className="space-y-1">{renderFormattedText(m.content)}</div>
                      <span
                        className={`block text-[10px] mt-1.5 text-right ${
                          m.role === 'user' ? 'text-white/70' : isDark ? 'text-[#8b949e]' : 'text-[#3a0f34]/50'
                        }`}
                      >
                        {m.timestamp}
                      </span>
                    </div>

                    {m.role === 'user' && (
                      <div className="w-8 h-8 rounded-lg bg-[#1f6feb] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-lg bg-[#238636] text-white flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 animate-spin" />
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-xs flex items-center gap-2 border ${
                        isDark ? 'bg-[#161b22] border-[#30363d] text-[#8b949e]' : 'bg-white border-[#3a0f34]/15 text-[#3a0f34]/70'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#58a6ff] animate-ping" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Prompts */}
              <div
                className={`px-4 py-2.5 border-t overflow-x-auto flex items-center gap-2 ${
                  isDark ? 'bg-[#161b22] border-[#30363d]' : 'bg-white border-[#3a0f34]/15'
                }`}
              >
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#58a6ff] whitespace-nowrap flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#58a6ff]" />
                  Suggestions:
                </span>
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isLoading}
                    className={`text-[11px] px-3 py-1 rounded-full border whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50 ${
                      isDark
                        ? 'bg-[#21262d] border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-[#58a6ff]'
                        : 'bg-[#f4f7f9] border-[#3a0f34]/15 text-[#3a0f34] hover:bg-[#3a0f34] hover:text-white'
                    }`}
                  >
                    <span>{prompt}</span>
                    <ChevronRight className="w-3 h-3 text-[#58a6ff]" />
                  </button>
                ))}
              </div>

              {/* Chat Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className={`p-4 border-t flex items-center gap-3 ${
                  isDark ? 'bg-[#161b22] border-[#30363d]' : 'bg-white border-[#3a0f34]/15'
                }`}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about Aman..."
                  disabled={isLoading}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-xs md:text-sm border transition-colors focus:outline-none ${
                    isDark
                      ? 'bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#6e7681] focus:border-[#58a6ff]'
                      : 'bg-[#f4f7f9] border-[#3a0f34]/20 text-[#3a0f34] placeholder-[#3a0f34]/40 focus:border-[#3a0f34]'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-5 py-2.5 rounded-xl bg-[#238636] text-white font-bold text-xs md:text-sm flex items-center gap-1.5 hover:bg-[#2ea043] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
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
