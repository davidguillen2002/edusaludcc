"use client";

import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { marqueeTopics } from "@/lib/site";

/**
 * Edge-to-edge marquee of health topics.
 *
 * Two stacked tracks drift in opposite directions for a parallax
 * feel. Each track duplicates its content so the CSS animation
 * can loop seamlessly (translateX -50%). On hover the entire band
 * pauses — gives users a chance to read.
 *
 * Motion is paused for users with `prefers-reduced-motion` via the
 * global handler in globals.css (animation-duration override).
 */

export function SpecialtyMarquee() {
  return (
    <section
      aria-label="Temas de salud que abordamos"
      className="relative isolate overflow-hidden border-y border-border bg-brand-900 py-10 text-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-hero-gradient opacity-90"
      />
      <div
        aria-hidden
        className="absolute -top-20 left-1/3 -z-10 h-72 w-72 rounded-full bg-coral-500/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-20 right-1/4 -z-10 h-72 w-72 rounded-full bg-brand-400/40 blur-3xl"
      />

      <Container>
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            <HeartPulse className="h-3.5 w-3.5 animate-heartbeat" />
            Temas que abordamos
          </span>
          <span className="hidden text-xs text-white/60 sm:inline">
            Pasa el mouse para detener
          </span>
        </div>
      </Container>

      <div className="group relative overflow-hidden">
        <div className="marquee">
          <MarqueeRow items={marqueeTopics} reverse={false} />
          <MarqueeRow items={[...marqueeTopics].reverse()} reverse className="mt-3" />
        </div>
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  reverse,
  className,
}: {
  items: readonly string[];
  reverse?: boolean;
  className?: string;
}) {
  // Duplicate the array so the translate -50% loop has identical pairs.
  const doubled = [...items, ...items];

  return (
    <motion.ul
      className={`flex w-max items-center gap-3 will-change-transform ${
        reverse ? "animate-marquee-x-reverse" : "animate-marquee-x"
      } group-hover:[animation-play-state:paused] ${className ?? ""}`}
    >
      {doubled.map((t, i) => (
        <li
          key={`${t}-${i}`}
          className="flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur transition-colors hover:border-coral-400/60 hover:bg-white/10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-coral-400" />
          {t}
        </li>
      ))}
    </motion.ul>
  );
}
