"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Animated number counter — runs once when the element enters the
 * viewport. Honors `prefers-reduced-motion` by snapping to the final
 * value with no animation.
 *
 * Accepts a string number with optional prefix/suffix kept verbatim,
 * so `value="+320"` animates 0→320 and renders the leading "+".
 */

type Props = {
  value: string;
  durationMs?: number;
  className?: string;
};

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

export function CountUp({ value, durationMs = 1400, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();

  // Split prefix / digits / suffix without losing characters like "+", "%", "★".
  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const number = match ? parseFloat(match[2].replace(",", ".")) : 0;
  const suffix = match?.[3] ?? "";
  const decimals = match?.[2].includes(".") || match?.[2].includes(",") ? 1 : 0;

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setDisplay(number);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs);
      setDisplay(number * easeOutQuint(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, number, durationMs, prefersReducedMotion]);

  const text = match ? display.toFixed(decimals) : value;

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {prefix}
      <span tabIndex={-1}>{text}</span>
      {suffix}
    </motion.span>
  );
}
