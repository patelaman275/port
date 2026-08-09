'use client';

import { motion } from 'framer-motion';

interface SkillCategory {
  label: string;
  color: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: 'Languages',
    color: '#cc1100',
    skills: ['Python', 'Java', 'C++', 'SQL'],
  },
  {
    label: 'Full Stack',
    color: '#dd3300',
    skills: ['MERN Stack', 'Next.js 14', 'REST APIs', 'JWT Auth', 'Socket.io', 'WebRTC'],
  },
  {
    label: 'AI / ML',
    color: '#ff5500',
    skills: [
      'Deep Learning (CNN)',
      'TensorFlow',
      'Scikit-learn',
      'OpenCV',
      'Gemini API',
      'OpenAI API',
      'MLOps',
    ],
  },
  {
    label: 'Cloud / DB',
    color: '#cc2200',
    skills: ['MongoDB Atlas', 'Firebase', 'Vercel', 'Render', 'Docker'],
  },
  {
    label: 'Tools',
    color: '#dd4400',
    skills: ['Git', 'CI/CD', 'Postman', 'Vite'],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: '#080608' }}
    >
      {/* Parallax depth background gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 80%, rgba(255,75,43,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,138,0,0.08) 0%, transparent 50%)',
        }}
      />

      {/* Header with Clip-Path Reveal */}
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
          whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-3 font-medium text-[#ff4b2b]"
          >
            Arsenal
          </p>
          <h2
            className="font-black tracking-tight text-3xl md:text-5xl"
          >
            <span className="text-white">Tech </span>
            <span className="gradient-text">Stack</span>
          </h2>
        </motion.div>
        <div
          className="mx-auto mt-5 h-px w-20"
          style={{ background: 'linear-gradient(90deg, transparent, #ff4b2b, transparent)' }}
        />
      </div>

      {/* Categories */}
      <motion.div
        className="max-w-4xl mx-auto space-y-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {SKILL_CATEGORIES.map((cat) => (
          <motion.div key={cat.label} variants={rowVariants} className="flex gap-5 items-start">
            {/* Category label */}
            <div className="flex-shrink-0 w-28 pt-1">
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: cat.color }}
              >
                {cat.label}
              </span>
            </div>

            {/* Skills */}
            <motion.div
              className="flex flex-wrap gap-2 flex-1"
              variants={containerVariants}
            >
              {cat.skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={tagVariants}
                  className="skill-tag inline-flex items-center px-4 py-2 rounded-full text-sm font-medium relative overflow-hidden"
                  style={{
                    background: `${cat.color}0f`,
                    border: `1px solid ${cat.color}30`,
                    color: 'rgba(240,244,255,0.85)',
                  }}
                  whileHover={{
                    boxShadow: `0 0 18px ${cat.color}55, 0 0 6px ${cat.color}33, inset 0 0 10px ${cat.color}11`,
                    borderColor: cat.color,
                    color: '#ffffff',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
