"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Reading-progress bar pinned to the top of the viewport.
 *
 * Uses `useScroll` against the document and a spring so the bar
 * eases into its new position instead of jittering. Sits above
 * the navbar (z-[55]) but below modal overlays.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-gradient-to-r from-brand-600 via-coral-500 to-brand-400"
    />
  );
}
