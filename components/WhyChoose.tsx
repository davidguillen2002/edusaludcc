"use client";

import { motion } from "framer-motion";
import { Layers, ShieldCheck, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CountUp } from "@/components/ui/CountUp";
import { whyChoose } from "@/lib/site";
import { cn } from "@/lib/cn";

const iconMap = {
  "trending-up": TrendingUp,
  "shield-check": ShieldCheck,
  layers: Layers,
} as const;

export function WhyChoose() {
  return (
    <section id="metodologia" className="relative py-20 sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-warm opacity-70" />

      <Container>
        <SectionHeader
          eyebrow="Por qué elegir EduSaludCC"
          title="Transformamos la salud a través de la educación y la prevención"
          description="Trabajamos lado a lado con tu organización para que el cuidado deje de ser un costo y pase a ser una ventaja competitiva."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {whyChoose.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "group relative flex flex-col rounded-3xl border border-border bg-surface p-7 shadow-soft transition-all duration-300",
                  "hover:-translate-y-1 hover:border-brand-200 hover:shadow-elevated"
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-soft transition-transform group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="text-right">
                    <CountUp
                      value={item.metric}
                      className="block text-2xl font-semibold tracking-tight text-brand-700 tabular-nums"
                    />
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {item.metricLabel}
                    </div>
                  </div>
                </div>

                <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                <span
                  aria-hidden
                  className="mt-6 inline-block h-1 w-12 origin-left scale-x-50 rounded-full bg-coral-gradient transition-transform duration-500 group-hover:scale-x-100"
                />
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
