"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Magnetic CTA — the button tilts toward the pointer when it's
 * nearby. Subtle enough to feel premium, restrained enough not to
 * feel gimmicky. Falls back to a static button when the user has
 * `prefers-reduced-motion: reduce`.
 */

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 font-medium rounded-full cursor-pointer overflow-hidden transition-colors duration-200 ease-out-quint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-soft hover:shadow-elevated",
  secondary:
    "bg-surface text-foreground border border-border hover:border-brand-200 hover:text-brand-700",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base [height:3.25rem]",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** How far the button drifts toward the pointer (px). */
  strength?: number;
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  size = "lg",
  className,
  strength = 14,
}: Props) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // Normalize to [-1, 1] across the element + spill region.
    const nx = (e.clientX - cx) / (rect.width / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);
    x.set(Math.max(-1, Math.min(1, nx)) * strength);
    y.set(Math.max(-1, Math.min(1, ny)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {/* Glossy sheen that follows the cursor */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--brand-200) / 0.35), transparent 60%)",
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </motion.a>
  );
}

/**
 * Non-magnetic Link wrapper with identical styling — handy for
 * places where a tighter, calmer button is preferred.
 */
export function LinkButton({
  href,
  children,
  variant = "secondary",
  size = "lg",
  className,
}: Omit<Props, "strength">) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </Link>
  );
}
