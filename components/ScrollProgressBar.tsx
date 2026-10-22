'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e34234] via-[#cbb3e8] to-[#D4ff3f] origin-left z-[9999] pointer-events-none shadow-[0_0_12px_rgba(212,255,63,0.7)]"
      style={{ scaleX }}
    />
  );
}
