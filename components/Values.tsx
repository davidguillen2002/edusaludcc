"use client";

import { motion } from "framer-motion";
import { GraduationCap, HeartPulse, Scale } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { values } from "@/lib/site";

const iconMap = {
  "heart-pulse": HeartPulse,
  "graduation-cap": GraduationCap,
  scale: Scale,
} as const;

export function Values() {
  return (
    <section className="relative py-20 sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-soft opacity-70" />

      <Container>
        <SectionHeader
          eyebrow="Nuestros valores"
          title="Educación y atención con enfoque humano y profesional"
          description="Tres principios que guían cada propuesta, cada charla y cada chequeo que entregamos."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {values.map((v, i) => {
            const Icon = iconMap[v.icon];
            return (
              <motion.article
                key={v.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
              >
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-coral-100/60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-coral-gradient text-white shadow-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="relative mt-6 text-lg font-semibold tracking-tight text-foreground">
                  {v.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
