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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3a0f34] via-[#eaaa00] to-[#3a0f34] origin-left z-[9999] pointer-events-none shadow-[0_0_8px_rgba(234,170,0,0.5)]"
      style={{ scaleX }}
    />
  );
}
