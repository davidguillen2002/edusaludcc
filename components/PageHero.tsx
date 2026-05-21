"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

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
    <section className="relative isolate overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-soft" />
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl animate-aurora"
      />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full bg-coral-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-coral-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-coral-500" />
            {eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-display-2xl font-semibold tracking-tight text-foreground text-balance"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
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
