"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Floating particle field.
 *
 * Generates a deterministic set of dots (size, color, position, drift
 * timing) on mount, so SSR and hydration agree on every value. Each
 * dot drifts on its own sine wave with a random delay — overall
 * effect: gentle organic motion under the hero content.
 *
 * Honors `prefers-reduced-motion` by freezing every dot in place.
 */

type Props = {
  count?: number;
  className?: string;
  /** Random seed so different sections get different patterns. */
  seed?: number;
};

const PALETTE = [
  "hsl(var(--brand-400) / 0.55)",
  "hsl(var(--mint-400) / 0.55)",
  "hsl(var(--brand-200) / 0.7)",
  "hsl(var(--mint-500) / 0.4)",
  "hsl(var(--sun) / 0.55)",
];

/** Tiny deterministic PRNG — Mulberry32. Same seed → same particles. */
function mulberry(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Particles({ count = 16, className, seed = 42 }: Props) {
  const reduced = useReducedMotion();

  const dots = useMemo(() => {
    const rand = mulberry(seed);
    return Array.from({ length: count }, () => ({
      x: rand() * 100, // %
      y: rand() * 100,
      size: 2 + rand() * 4,
      color: PALETTE[Math.floor(rand() * PALETTE.length)],
      blur: rand() > 0.7 ? 2 : 0,
      driftY: 12 + rand() * 28,
      driftX: rand() * 18 - 9,
      duration: 8 + rand() * 12,
      delay: rand() * -10,
    }));
  }, [count, seed]);

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            background: d.color,
            filter: d.blur ? `blur(${d.blur}px)` : undefined,
          }}
          animate={
            reduced
              ? undefined
              : {
                  y: [0, -d.driftY, 0],
                  x: [0, d.driftX, 0],
                  opacity: [0.4, 1, 0.4],
                }
          }
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
