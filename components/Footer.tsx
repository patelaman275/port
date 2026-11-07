'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin, Download, FileText, ArrowRight } from 'lucide-react';

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/patelaman275',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/aman24256/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aman-patel-972935319/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:amanpatelsrm@gmail.com',
    icon: <Mail className="w-4 h-4" />,
  },
  {
    label: 'Phone',
    href: 'tel:+919918318385',
    icon: <Phone className="w-4 h-4" />,
  },
];

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Full-Time / Internship Opportunity',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'warning'; mailtoUrl?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const mailSubject = `[Portfolio] ${formData.subject || 'New Message'} from ${formData.name}`;
    const fallbackUrl = `mailto:amanpatelsrm@gmail.com?subject=${encodeURIComponent(
      mailSubject
    )}&body=${encodeURIComponent(`Hi Aman,\n\nFrom: ${formData.name} (${formData.email})\nRole/Subject: ${formData.subject}\n\nMessage:\n${formData.message}`)}`;

    try {
      // 1. Submit directly from browser via Web3Forms (bypasses server-side bot challenges)
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '382e2260-5eea-4df8-bf07-7fda2533f892',
          name: formData.name,
          email: formData.email,
          subject: mailSubject,
          message: formData.message,
          from_name: `${formData.name} (Portfolio Inquiry)`,
        }),
      });

      const data = await res.json();

      // Also log asynchronously to local server
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(() => {});

      if (res.ok && data.success) {
        setStatusMessage({
          text: `Message delivered directly to Aman's inbox! Thank you ${formData.name}, I will reply to ${formData.email} shortly.`,
          type: 'success',
        });
        setFormData({ name: '', email: '', subject: 'Full-Time / Internship Opportunity', message: '' });
      } else {
        setStatusMessage({
          text: data.message || 'Delivery service returned an issue. Click below to send via your email client:',
          type: 'warning',
          mailtoUrl: fallbackUrl,
        });
      }
    } catch {
      setStatusMessage({
        text: 'Network issue. Click below to send directly via your email app:',
        type: 'warning',
        mailtoUrl: fallbackUrl,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="relative border-t border-[#eaaa00]/30 bg-transparent">
      {/* Top glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent, #eaaa00, transparent)' }}
      />

      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#3a0f34] text-[#eaaa00] text-xs font-semibold tracking-wider uppercase mb-3 shadow-sm border border-[#eaaa00]/30">
            Get In Touch
          </span>
          <h2
            className="font-black tracking-tight mb-2 text-[#3a0f34]"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
          >
            Let&apos;s Build <span className="text-[#eaaa00]">Something Great</span>
          </h2>
          <p className="text-sm text-[#5e3b58] font-medium max-w-lg mx-auto">
            Actively exploring Software Engineer, Backend, and AI/ML opportunities. Send me a direct message below!
          </p>
        </div>

        {/* ── Working macOS Styled Contact Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto mb-16 rounded-3xl overflow-hidden border border-[#eaaa00]/30 shadow-xl text-[#3a0f34] backdrop-blur-md"
          style={{ background: 'rgba(221, 227, 232, 0.92)' }}
        >
          {/* macOS Window Titlebar */}
          <div className="px-5 py-3 border-b border-[#3a0f34]/15 bg-[#3a0f34]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#e34234]" />
              <span className="w-3 h-3 rounded-full bg-[#eaaa00]" />
              <span className="w-3 h-3 rounded-full bg-[#3a0f34]/20" />
            </div>
            <span className="text-xs font-medium tracking-tight text-[#3a0f34]/80">
              New Message to Aman Patel
            </span>
            <div className="w-12" />
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-[#3a0f34] mb-1.5">
                  Your Name <span className="text-[#eaaa00]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Connor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-[#3a0f34]/15 text-[#3a0f34] placeholder-[#5e3b58]/50 text-xs focus:outline-none focus:border-[#eaaa00] focus:bg-white transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-[#3a0f34] mb-1.5">
                  Your Email <span className="text-[#eaaa00]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-[#3a0f34]/15 text-[#3a0f34] placeholder-[#5e3b58]/50 text-xs focus:outline-none focus:border-[#eaaa00] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-medium text-[#3a0f34] mb-1.5">
                Subject / Role
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-[#3a0f34]/15 text-[#3a0f34] text-xs focus:outline-none focus:border-[#eaaa00] transition-all cursor-pointer"
              >
                <option value="Full-Time / Internship Opportunity">Full-Time / Internship Opportunity</option>
                <option value="Software Engineer Role">Software Engineer Role</option>
                <option value="Backend Developer Opportunity">Backend Developer Opportunity</option>
                <option value="AI / Machine Learning Role">AI / Machine Learning Role</option>
                <option value="Research / Project Collaboration">Research / Project Collaboration</option>
                <option value="General Conversation">General Conversation</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-medium text-[#3a0f34] mb-1.5">
                Message <span className="text-[#eaaa00]">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell me about the role, project, or what you'd like to collaborate on..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-[#3a0f34]/15 text-[#3a0f34] placeholder-[#5e3b58]/50 text-xs focus:outline-none focus:border-[#eaaa00] focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Status Feedback */}
            <AnimatePresence>
              {statusMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-3.5 rounded-xl text-xs flex flex-col gap-2 ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
                      : statusMessage.type === 'warning'
                      ? 'bg-amber-500/15 border border-amber-500/40 text-amber-900 dark:text-amber-200'
                      : 'bg-red-500/15 border border-red-500/40 text-red-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {statusMessage.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                    )}
                    <span className="font-medium">{statusMessage.text}</span>
                  </div>

                  {statusMessage.mailtoUrl && (
                    <div className="pt-1">
                      <a
                        href={statusMessage.mailtoUrl}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] transition-colors shadow-sm"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Now via Email App (Pre-filled)</span>
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-[#5e3b58]">
                Direct email: <a href="mailto:amanpatelsrm@gmail.com" className="text-[#eaaa00] underline hover:text-[#3a0f34] font-medium">amanpatelsrm@gmail.com</a>
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-full bg-[#eaaa00] text-[#3a0f34] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#3a0f34] hover:text-[#eaaa00] transition-all duration-200 cursor-pointer shadow-md disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </motion.div>

        {/* Profile Card & Resume Quick Actions */}
        <div className="text-center mb-10">
          <h3 className="font-bold text-xl text-[#3a0f34] mb-1">Aman Patel</h3>
          <p className="text-xs text-[#5e3b58] font-semibold mb-2">
            B.Tech CSE (Data Science) @ SRM IST &middot; CGPA: 8.83/10
          </p>
          <p className="text-xs flex items-center justify-center gap-1.5 mb-6 text-[#7d5977] font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#eaaa00]" />
            Lucknow, Uttar Pradesh, India
          </p>

          <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
            <a
              href="/resume.pdf"
              download="Aman_Patel_Resume.pdf"
              className="apple-dock-pill px-6 py-2.5 rounded-full text-xs font-semibold text-[#eaaa00] flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Resume (PDF)</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-dock-pill px-5 py-2.5 rounded-full text-xs font-semibold text-[#e34234] flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Resume</span>
            </a>
          </div>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="apple-dock-pill flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-white/90 hover:text-[#D4ff3f]"
            >
              {s.icon}
              <span>{s.label}</span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mx-auto mb-8 h-px max-w-xs rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(58, 15, 52, 0.2), transparent)' }}
        />

        {/* Credit */}
        <p className="text-xs font-medium text-[#5e3b58] tracking-tight text-center">
          &copy; {new Date().getFullYear()} Aman Patel. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
