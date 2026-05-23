"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Cycling word with a soft blur+lift transition.
 *
 * Used in the hero to keep the headline visually alive after the
 * initial reveal. The width auto-fits the longest word with `grid`
 * stacking so neighbouring text doesn't jump as the active word
 * changes.
 */

type Props = {
  words: string[];
  className?: string;
  intervalMs?: number;
};

export function RotatingWord({ words, className, intervalMs = 2400 }: Props) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), intervalMs);
    return () => clearInterval(id);
  }, [reduced, words.length, intervalMs]);

  return (
    <span
      className={cn(
        "relative inline-grid align-baseline",
        // grid stack: all words share a slot so width = widest word
        "[grid-template-areas:'stack']",
        className
      )}
      aria-live="polite"
    >
      {/* Invisible sizer — keeps the slot exactly the widest word's width */}
      <span
        aria-hidden
        className="[grid-area:stack] invisible whitespace-nowrap"
      >
        {words.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "0.45em", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-0.45em", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="[grid-area:stack] whitespace-nowrap bg-clip-text text-transparent [background-image:linear-gradient(135deg,hsl(var(--brand-600))_0%,hsl(var(--brand-400))_50%,hsl(var(--mint-500))_100%)]"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
