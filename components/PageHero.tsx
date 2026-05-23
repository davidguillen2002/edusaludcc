"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { Particles } from "@/components/ui/Particles";
import { Grain } from "@/components/ui/Grain";

/**
 * Inner-page hero — matches the home hero's atmospheric language
 * (particles, grain, mesh + aurora blob, eyebrow with pulsing dot)
 * in a more compact vertical footprint.
 *
 * Title accepts a string (animated word-by-word via AnimatedHeadline)
 * or any JSX when you need custom inline elements.
 */

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      {/* Atmospheric backdrop — same vocabulary as the home hero. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-soft" />
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl animate-aurora"
      />
      <div
        aria-hidden
        className="absolute -bottom-16 right-10 -z-10 h-56 w-56 rounded-full bg-mint-200/45 blur-3xl"
      />
      <div aria-hidden className="absolute inset-0 -z-10 grid-pattern opacity-25" />
      <Particles count={14} seed={1163} />
      <Grain opacity={0.06} />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full bg-mint-50/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-mint-700 backdrop-blur"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-mint-400/70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-mint-500" />
            </span>
            {eyebrow}
          </motion.span>

          {typeof title === "string" ? (
            <AnimatedHeadline
              as="h1"
              className="mt-5 text-display-2xl font-semibold tracking-tight text-foreground text-balance"
            >
              {title}
            </AnimatedHeadline>
          ) : (
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-display-2xl font-semibold tracking-tight text-foreground text-balance"
            >
              {title}
            </motion.h1>
          )}

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-balance"
            >
              {description}
            </motion.p>
          )}
        </div>
      </Container>
    </section>
  );
}
