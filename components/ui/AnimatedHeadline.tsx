"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Word-by-word headline reveal.
 *
 * Splits the heading at whitespace, animates each word with a
 * staggered translate+blur+opacity sweep. React keys come from
 * index, so identical words don't deduplicate. Honors
 * `prefers-reduced-motion` by snapping to the final state.
 *
 * Usage:
 *   <AnimatedHeadline as="h1" gradient>
 *     Educar para una salud integral
 *   </AnimatedHeadline>
 *
 * Pass `splitChars` to animate per-character (use sparingly — long
 * titles get visually noisy).
 */

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  staggerMs?: number;
  splitChars?: boolean;
  /** Trigger when scrolled into view vs on mount. */
  whenInView?: boolean;
  /** Wrap each unit so a CSS gradient is applied per word. */
  gradient?: boolean;
};

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function AnimatedHeadline({
  children,
  as: Tag = "h1",
  className,
  delay = 0,
  staggerMs = 60,
  splitChars = false,
  whenInView = false,
  gradient = false,
}: Props) {
  const reduced = useReducedMotion();
  const units = splitChars ? Array.from(children) : children.split(/(\s+)/);

  const parent: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerMs / 1000,
        delayChildren: delay,
      },
    },
  };

  const MotionTag = motion[Tag] as typeof motion.h1;

  return (
    <MotionTag
      className={cn(className)}
      variants={parent}
      initial={reduced ? "show" : "hidden"}
      {...(whenInView
        ? { whileInView: "show", viewport: { once: true, margin: "-60px" } }
        : { animate: "show" })}
    >
      {units.map((u, i) =>
        /^\s+$/.test(u) ? (
          // Preserve interword whitespace exactly.
          <span key={`s-${i}`}>{u}</span>
        ) : (
          <motion.span
            key={`w-${i}`}
            variants={wordVariants}
            transition={{ duration: 0.7, ease: easeOutQuint }}
            className={cn(
              "inline-block",
              gradient &&
                "bg-clip-text [background-image:linear-gradient(135deg,hsl(var(--brand-700))_0%,hsl(var(--brand-500))_50%,hsl(var(--coral-500))_100%)] text-transparent"
            )}
          >
            {u}
          </motion.span>
        )
      )}
    </MotionTag>
  );
}
