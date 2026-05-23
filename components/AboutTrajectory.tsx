"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { aboutImages } from "@/lib/site";
import { shimmer } from "@/lib/blur";
import { CountUp } from "@/components/ui/CountUp";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { AnimatedRing } from "@/components/ui/AnimatedRing";

export function AboutTrajectory() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-28">
      <SectionBackdrop tone="light" particles={9} seed={727} />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <AnimatedRing size={108} durationS={18} thickness={3} className="z-0" />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] shadow-elevated sm:rounded-[2rem] lg:aspect-[4/5]"
            >
              <Image
                src={aboutImages.trajectory.src}
                alt={aboutImages.trajectory.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={shimmer(16, 20)}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/30 via-transparent to-transparent" />
            </motion.div>
            <div
              aria-hidden
              className="absolute -bottom-6 -left-4 -z-10 h-44 w-44 rounded-full bg-mint-300/40 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -top-6 -right-4 -z-10 h-44 w-44 rounded-full bg-brand-300/40 blur-3xl"
            />
          </div>

          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-mint-500" />
                Nuestra trayectoria
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 text-display-xl font-semibold tracking-tight text-foreground text-balance">
                Comprometidos con tu bienestar y la salud preventiva
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                En <strong className="font-semibold text-foreground">EduSaludCC</strong>{" "}
                nuestra misión es transformar la percepción de la salud a través de la
                educación y la prevención.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Desde charlas y programas institucionales hasta atenciones médicas,
                hemos trabajado con estudiantes, profesionales y personas de todos los
                grupos etarios, con un único fin:{" "}
                <strong className="font-semibold text-foreground">
                  educar y atender con calidad y humanidad.
                </strong>
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border/80 text-center shadow-soft">
                {[
                  { v: "+5", l: "años educando" },
                  { v: "+30", l: "instituciones aliadas" },
                  { v: "100%", l: "soluciones a medida" },
                ].map((s) => (
                  <div key={s.l} className="bg-surface px-4 py-5">
                    <CountUp
                      value={s.v}
                      className="block text-2xl font-semibold tracking-tight text-foreground tabular-nums"
                    />
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
