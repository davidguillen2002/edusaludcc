"use client";

import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import * as React from "react";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutQuint } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: easeOutQuint } },
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Render once when visible, then stop observing. */
  once?: boolean;
  /** Distance the element travels into place (px). */
  y?: number;
};

export function Reveal({
  children,
  delay = 0,
  once = true,
  y = 24,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: easeOutQuint }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
