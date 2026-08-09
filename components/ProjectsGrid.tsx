'use client';

import { motion } from 'framer-motion';

interface Project {
  title: string;
  stack: string[];
  description: string;
  link: string;
  accent: string;
  icon: string;
}

const PROJECTS: Project[] = [
  {
    title: 'AI Chicken Disease Detection',
    stack: ['Python', 'TensorFlow', 'VGG16', 'MobileNetV2', 'OpenCV', 'Flask', 'Next.js', 'Firebase'],
    description:
      'Dual-pipeline CNN on 5,000+ images detecting Coccidiosis in poultry. VGG16 + MobileNetV2 ensemble achieved 98.2% accuracy, published at ICCCNet 2026 (ADROID Conference Series, SRM IST). Integrated Gemini RAG for disease Q&A and Sarvam AI for multilingual voice diagnosis across 5+ languages. Sub-2s inference, 99.9% uptime.',
    link: 'https://github.com/patelaman275',
    accent: '#cc1100',
    icon: '🧬',
  },
  {
    title: 'AI Career Path Generator',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API'],
    description:
      'SaaS platform generating personalized career roadmaps via GPT-4, cutting manual research time by 70%+. LLM-powered resume analyzer extracting 15+ skill signals with ATS optimization. AI Mentor chatbot for mock interviews with 50+ curated question flows.',
    link: 'https://github.com/patelaman275',
    accent: '#ff6b00',
    icon: '🚀',
  },
  {
    title: 'EasyTrip — Multi-Rider Safety',
    stack: ['React.js', 'Node.js', 'Express.js', 'Socket.io', 'Leaflet'],
    description:
      'Real-time group ride platform with 6-character invite codes, live GPS tracking, synchronized route polylines, and SOS alert system broadcasting distress overlays to all riders in under 500ms via Socket.io.',
    link: 'https://github.com/patelaman275',
    accent: '#dd3300',
    icon: '🗺️',
  },
  {
    title: 'CampusConnect — College Network',
    stack: ['MERN Stack', 'Socket.io', 'WebRTC', 'JWT', 'MongoDB Atlas'],
    description:
      'College-exclusive networking platform with real-time chat, WebRTC video calls, LinkedIn-style profiles. JWT auth, bcrypt hashing, OTP email verification. Gemini API for AI resume analysis and ATS scoring.',
    link: 'https://github.com/patelaman275',
    accent: '#bb1500',
    icon: '🎓',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ProjectsGrid() {
  return (
    <section
      id="projects"
      className="relative py-28 px-6 md:px-12 lg:px-20"
      style={{ background: 'linear-gradient(180deg, #080608 0%, #0d060a 50%, #080608 100%)' }}
    >
      {/* Section background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(150,10,0,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Section header */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p
          className="text-xs tracking-[0.4em] uppercase mb-4 font-medium"
          style={{ color: '#cc1100' }}
        >
          Selected Work
        </p>
        <h2
          className="font-black tracking-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05 }}
        >
          <span className="text-white">Featured </span>
          <span className="gradient-text">Projects</span>
        </h2>
        <div
          className="mx-auto mt-5 h-px w-20"
          style={{ background: 'linear-gradient(90deg, transparent, #cc1100, transparent)' }}
        />
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {PROJECTS.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            className="glass-card block p-7 group cursor-pointer"
            style={{ textDecoration: 'none' }}
          >
            {/* Card top row */}
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}22, ${project.accent}11)`,
                  border: `1px solid ${project.accent}33`,
                }}
              >
                {project.icon}
              </div>
              {/* Arrow */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{
                  background: `${project.accent}22`,
                  border: `1px solid ${project.accent}44`,
                  transform: 'translateX(-4px)',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={project.accent} strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3
              className="font-bold mb-3 leading-snug group-hover:text-white transition-colors duration-200"
              style={{
                fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                color: 'rgba(240,244,255,0.92)',
              }}
            >
              {project.title}
            </h3>

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: 'rgba(136,146,164,0.85)', lineHeight: '1.7' }}
            >
              {project.description}
            </p>

            {/* Stack pills */}
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    background: `${project.accent}14`,
                    border: `1px solid ${project.accent}28`,
                    color: 'rgba(220,200,195,0.75)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
