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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0d9488] via-[#1DB954] to-[#1ed760] origin-left z-[9999] pointer-events-none shadow-[0_0_12px_#1DB954]"
      style={{ scaleX }}
    />
  );
}
