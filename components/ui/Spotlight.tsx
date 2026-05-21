"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Pointer-tracked spotlight overlay.
 *
 * Drop this as a sibling of card content (parent must be `relative`
 * and `overflow-hidden`). It paints a soft radial gradient that
 * follows the cursor — the visual cue most premium SaaS sites use
 * to signal interactivity without animating layout.
 *
 * Performance: writes go through Framer's `motionValue` → CSS
 * custom property, so React never re-renders on pointer move.
 */

type Props = {
  className?: string;
  /** Radial gradient colour at the centre. Accepts any CSS color. */
  color?: string;
  /** Size of the glow in px (diameter). */
  size?: number;
};

export function Spotlight({
  className,
  color = "hsl(var(--brand-400) / 0.35)",
  size = 360,
}: Props) {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 150, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 150, damping: 18, mass: 0.4 });

  // Attach to the nearest positioned ancestor so we don't need a
  // wrapper element. The spotlight covers the parent rectangle.
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    const onLeave = () => {
      x.set(-1000);
      y.set(-1000);
    };
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [.group:hover_&]:opacity-100",
        className
      )}
      style={{
        background: `radial-gradient(${size}px circle at ${sx.get()}px ${sy.get()}px, ${color}, transparent 60%)`,
        // CSS custom property kept in sync via motion values
        // (avoids re-rendering React on every mouse move).
        // @ts-expect-error CSS vars
        "--mx": sx,
        "--my": sy,
      }}
    />
  );
}

/**
 * Variant that uses CSS custom properties directly — preferred for
 * cards rendered in lists, since we avoid one extra React subtree.
 */
export function SpotlightLayer({
  className,
  size = 360,
  color = "hsl(var(--brand-400) / 0.35)",
}: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        className
      )}
      style={{
        background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 60%)`,
      }}
    />
  );
}
