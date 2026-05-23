"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import {
  programBullets,
  servicesPageImages,
  suggestedTopics,
} from "@/lib/site";
import { shimmer } from "@/lib/blur";

export function ServicesShowcase() {
  return (
    <>
      {/* 1 — Programas de Educación Integral */}
      <section className="relative isolate overflow-hidden py-16 sm:py-24">
        <SectionBackdrop tone="light" particles={8} seed={811} />
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                  Servicio
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 text-display-xl font-semibold tracking-tight text-foreground text-balance">
                  Programas de educación integral en salud
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Diseñamos, proponemos e implementamos un programa personalizado según
                  las necesidades de tu institución.
                </p>
              </Reveal>

              <ul className="mt-7 space-y-3">
                {programBullets.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 shadow-soft"
                  >
                    <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-mint-500/15 text-mint-500">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/90">
                      {b}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="relative order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-elevated"
              >
                <Image
                  src={servicesPageImages.programs.src}
                  alt={servicesPageImages.programs.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={shimmer(16, 12)}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/30 via-transparent to-transparent" />
              </motion.div>
              <div
                aria-hidden
                className="absolute -bottom-6 -right-4 -z-10 h-44 w-44 rounded-full bg-brand-300/40 blur-3xl"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 2 — Chequeos Médicos */}
      <section className="relative isolate overflow-hidden py-16 sm:py-24">
        <SectionBackdrop tone="warm" particles={9} seed={823} />
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-elevated"
              >
                <Image
                  src={servicesPageImages.checkups.src}
                  alt={servicesPageImages.checkups.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={shimmer(16, 12)}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-mint-700/30 via-transparent to-transparent" />
              </motion.div>
            </div>

            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-mint-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-mint-700">
                  Servicio
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 text-display-xl font-semibold tracking-tight text-foreground text-balance">
                  Chequeos médicos preventivos
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Implementamos programas de salud institucional diseñados para
                  detectar riesgos tempranos y promover un bienestar integral.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Nuestros chequeos integran{" "}
                  <strong className="font-semibold text-foreground">
                    evaluaciones clínicas avanzadas
                  </strong>{" "}
                  con educación preventiva personalizada para tu organización.
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="mt-7 grid grid-cols-2 gap-3 text-sm">
                  {[
                    "Evaluaciones clínicas",
                    "Detección temprana",
                    "Educación personalizada",
                    "Seguimiento integral",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-2 rounded-xl border border-border bg-surface p-3 shadow-soft"
                    >
                      <Check className="h-4 w-4 text-mint-500" />
                      <span className="text-foreground/90">{t}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 3 — Charlas Personalizadas + topics */}
      <section className="relative isolate overflow-hidden py-16 sm:py-24">
        <SectionBackdrop tone="cool" particles={9} seed={839} />
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                  Servicio
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 text-display-xl font-semibold tracking-tight text-foreground text-balance">
                  Charlas personalizadas
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Sesión del tema en salud que tu organización requiera. Nuestras
                  charlas son espacios seguros y profesionales donde abordamos cualquier
                  tema de manera integral.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Cada sesión se desarrolla mediante un diálogo abierto y experto,
                  construyendo una ruta clara hacia la prevención y el autocuidado.
                </p>
              </Reveal>

              <div className="relative mt-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] shadow-elevated"
                >
                  <Image
                    src={servicesPageImages.talks.src}
                    alt={servicesPageImages.talks.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>

            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="rounded-3xl border border-border bg-surface p-7 shadow-soft sm:p-8">
                  <div className="flex items-center gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-white shadow-soft">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      Temas sugeridos
                    </h3>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {suggestedTopics.map((t, i) => (
                      <motion.li
                        key={t}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          duration: 0.45,
                          delay: i * 0.05,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-center gap-3 rounded-xl bg-muted/70 px-3 py-2.5 text-sm text-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-mint-500" />
                        {t}
                      </motion.li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs text-muted-foreground">
                    ¿Necesitas otro tema? Lo construimos a medida para tu organización.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
