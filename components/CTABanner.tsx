"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Particles } from "@/components/ui/Particles";
import { AnimatedRing } from "@/components/ui/AnimatedRing";

export function CTABanner({
  eyebrow,
  title,
  description,
  ctaLabel = "Solicitar información",
  ctaHref = "/#contacto",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-8 py-12 shadow-soft sm:px-14 sm:py-16"
        >
          <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-soft opacity-90" />
          <Particles count={12} seed={937} className="-z-10" />
          <div
            aria-hidden
            className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-coral-200/60 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-16 -z-10 h-72 w-72 rounded-full bg-brand-200/60 blur-3xl"
          />

          <div className="relative grid items-center gap-6 sm:grid-cols-5 sm:gap-10">
            <div className="sm:col-span-3">
              {eyebrow && (
                <span className="inline-flex items-center gap-2 rounded-full bg-coral-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-coral-700">
                  {eyebrow}
                </span>
              )}
              <h2 className="mt-3 text-display-lg font-semibold tracking-tight text-foreground text-balance">
                {title}
              </h2>
              {description && (
                <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            <div className="sm:col-span-2 sm:justify-self-end">
              <Button href={ctaHref} size="lg">
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
