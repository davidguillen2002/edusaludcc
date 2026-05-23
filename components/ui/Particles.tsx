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

// 3-color palette mirroring the 60-30-10 distribution: brand
// dominates, mint is the spark, sand softens. Opacities sit low
// so dots register as "atmosphere" rather than "confetti".
const PALETTE = [
  "hsl(var(--brand-400) / 0.45)",
  "hsl(var(--brand-200) / 0.65)",
  "hsl(var(--mint-400) / 0.40)",
  "hsl(var(--sand-300, var(--sand-400)) / 0.50)",
  "hsl(var(--sand-200) / 0.55)",
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
      // Smaller dots — atmosphere, not decoration.
      size: 1.5 + rand() * 3,
      color: PALETTE[Math.floor(rand() * PALETTE.length)],
      // More dots get a blur pass → reads as depth.
      blur: rand() > 0.55 ? 2 : 0,
      driftY: 10 + rand() * 26,
      driftX: rand() * 16 - 8,
      duration: 9 + rand() * 13,
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
