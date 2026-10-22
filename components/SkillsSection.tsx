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
    color: '#D4ff3f',
    skills: ['Java', 'Python', 'JavaScript', 'SQL', 'C/C++'],
  },
  {
    label: 'Backend',
    color: '#e34234',
    skills: ['Node.js', 'Express.js', 'Flask', 'REST APIs', 'Socket.io', 'JWT Auth'],
  },
  {
    label: 'Frontend',
    color: '#cbb3e8',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'WebRTC', 'HTML5/CSS3'],
  },
  {
    label: 'AI & ML',
    color: '#D4ff3f',
    skills: [
      'TensorFlow',
      'Deep Learning',
      'CNNs (VGG16, MobileNetV2)',
      'NLP',
      'LLMs',
      'Gemini API',
      'OpenAI API',
      'RAG',
    ],
  },
  {
    label: 'Databases',
    color: '#e34234',
    skills: ['MySQL', 'MongoDB Atlas', 'Firebase'],
  },
  {
    label: 'Tools & Cloud',
    color: '#cbb3e8',
    skills: ['AWS', 'Git', 'GitHub', 'Docker', 'Postman', 'Vite', 'Vercel'],
  },
  {
    label: 'Core CS',
    color: '#D4ff3f',
    skills: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (OOP)',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
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
      className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden bg-transparent"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 80%, rgba(212,255,63,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(227,66,52,0.3) 0%, transparent 50%)',
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
          <span className="inline-block px-3.5 py-1 rounded-full bg-black text-[#D4ff3f] text-xs tracking-[0.35em] uppercase font-black mb-3 shadow-sm">
            Technical Expertise
          </span>
          <h2
            className="font-black tracking-tight text-3xl md:text-5xl text-black"
          >
            Technical <span className="text-[#e34234]">Skills</span>
          </h2>
        </motion.div>
        <div
          className="mx-auto mt-5 h-1 w-20 rounded-full"
          style={{ background: 'linear-gradient(90deg, #e34234, #000000, #D4ff3f)' }}
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
          <motion.div key={cat.label} variants={rowVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center">
            {/* Category label */}
            <div className="flex-shrink-0 w-36 pt-1">
              <span
                className="text-xs font-black tracking-widest uppercase flex items-center gap-2 px-2.5 py-1 rounded bg-black"
                style={{ color: cat.color }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
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
                  className="skill-tag inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold relative overflow-hidden transition-all duration-200 bg-black text-white border border-black shadow-sm"
                  whileHover={{
                    boxShadow: `0 0 16px ${cat.color}`,
                    borderColor: cat.color,
                    color: cat.color,
                    y: -2,
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
