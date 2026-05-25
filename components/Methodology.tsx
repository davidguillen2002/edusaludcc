"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, LineChart, PlayCircle, Search, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { SpotlightLayer } from "@/components/ui/Spotlight";
import { AnimatedRing } from "@/components/ui/AnimatedRing";
import { methodologySteps } from "@/lib/site";
import { shimmer } from "@/lib/blur";
import { cn } from "@/lib/cn";

function trackPointer(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

const iconMap = {
  search: Search,
  compass: Compass,
  "play-circle": PlayCircle,
  "line-chart": LineChart,
} as const;

export function Methodology() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-28">
      <SectionBackdrop tone="light" particles={11} seed={509} />
      <Container>
        <SectionHeader
          eyebrow="Metodología"
          title="Nuestro proceso, paso a paso"
          description="Una ruta probada que combina rigor médico, diseño instruccional y seguimiento real del impacto."
        />

        <div className="relative mt-16">
          {/* Connector line — desktop */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block"
          />

          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {methodologySteps.map((step, i) => {
              const Icon = iconMap[step.icon];
              return (
                <motion.li
                  key={step.step}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                >
                  <div
                    onPointerMove={trackPointer}
                    className={cn(
                      "group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-7 shadow-soft transition-all duration-300",
                      "hover:-translate-y-1 hover:border-brand-200 hover:shadow-elevated"
                    )}
                  >
                    <SpotlightLayer color="hsl(var(--brand-400) / 0.22)" size={380} />
                    <div className="relative flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-soft">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-display-lg font-bold leading-none tracking-tight text-brand-100">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/* connector dot */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-12 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500 ring-4 ring-brand-100 lg:block"
                  />
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* Real-impact photo — closes the section so it doesn't read
            as pure text. Mirrors the visual language of the home hero
            (animated ring + floating glass card + parallax blob). */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-20"
        >
          <div className="relative mx-auto max-w-5xl">
            <AnimatedRing size={102} durationS={20} thickness={3} className="z-0" />

            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-elevated sm:aspect-[2/1]">
              <Image
                src="/img/edusaludcc/metodologia-salud-integral.jpg"
                alt="Programa Salud Integral de EduSaludCC en acción en una institución ecuatoriana"
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                placeholder="blur"
                blurDataURL={shimmer(16, 9)}
                className="object-cover"
              />
              {/* Subtle bottom-up gradient so the caption sits cleanly */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/85 via-brand-900/20 to-transparent" />

              {/* Caption card — same glass+icon language as the hero */}
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-md">
                <div className="glass-strong flex items-start gap-3 rounded-2xl p-4 shadow-elevated">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mint-gradient text-white shadow-soft">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mint-700">
                      Metodología en acción
                    </div>
                    <div className="mt-0.5 text-sm font-semibold text-foreground sm:text-base">
                      Salud integral aplicada en aulas reales del Ecuador
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ambient blurs framing the image */}
            <div
              aria-hidden
              className="absolute -bottom-6 -right-4 -z-10 h-40 w-40 rounded-full bg-mint-200/45 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -top-6 -left-4 -z-10 h-40 w-40 rounded-full bg-brand-200/45 blur-3xl"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
