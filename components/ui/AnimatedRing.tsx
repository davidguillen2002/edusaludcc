"use client";

import { cn } from "@/lib/cn";

/**
 * Rotating gradient ring — sits behind an element, conveys energy.
 *
 * Implementation: a conic-gradient on a square that's slightly
 * larger than the wrapped element, slowly rotated with CSS. The
 * inner area is masked out so only the outer "ring" is visible.
 *
 * Wrap usage:
 *   <div className="relative">
 *     <AnimatedRing />
 *     ...content...
 *   </div>
 */

type Props = {
  className?: string;
  /** Diameter relative to parent (% units). */
  size?: number;
  /** Rotation period in seconds. */
  durationS?: number;
  /** Thickness of the visible ring in px. */
  thickness?: number;
};

export function AnimatedRing({
  className,
  size = 112,
  durationS = 14,
  thickness = 2,
}: Props) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        className
      )}
      style={{
        width: `${size}%`,
        height: `${size}%`,
      }}
    >
      <span
        className="block h-full w-full animate-[spin_var(--ring-dur)_linear_infinite] rounded-[2rem] opacity-70 [--ring-dur:var(--d)]"
        style={
          {
            "--d": `${durationS}s`,
            background:
              "conic-gradient(from 0deg, hsl(var(--brand-500) / 0.0), hsl(var(--brand-400) / 0.6), hsl(var(--mint-400) / 0.6), hsl(var(--brand-500) / 0.0))",
            mask: `radial-gradient(farthest-side, transparent calc(100% - ${thickness + 2}px), #000 calc(100% - ${thickness}px))`,
            WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${thickness + 2}px), #000 calc(100% - ${thickness}px))`,
          } as React.CSSProperties
        }
      />
    </span>
  );
}
