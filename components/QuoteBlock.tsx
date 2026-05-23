"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Particles } from "@/components/ui/Particles";
import { Grain } from "@/components/ui/Grain";
import { siteConfig } from "@/lib/site";

export function QuoteBlock() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.figure
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-hero-gradient px-8 py-14 text-white shadow-elevated sm:px-14 sm:py-20"
        >
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-mint-500/30 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-brand-400/40 blur-3xl"
          />
          <Particles count={14} seed={1049} />
          <Grain opacity={0.07} />

          <Quote
            aria-hidden
            className="absolute right-8 top-8 h-12 w-12 text-white/15"
          />

          <blockquote className="relative max-w-3xl">
            <p className="text-2xl font-medium leading-relaxed text-balance sm:text-3xl">
              “{siteConfig.quoteSignature.text}”
            </p>
          </blockquote>

          <figcaption className="relative mt-10 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-mint-300/80" />
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/85">
              {siteConfig.quoteSignature.author}
            </span>
          </figcaption>
        </motion.figure>
      </Container>
    </section>
  );
}
