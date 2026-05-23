"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  HeartPulse,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightLayer } from "@/components/ui/Spotlight";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { services } from "@/lib/site";
import { shimmer } from "@/lib/blur";
import { cn } from "@/lib/cn";

/** Update CSS custom properties so SpotlightLayer can paint a glow
 *  centred on the cursor. Pure DOM writes — never re-renders React. */
function trackPointer(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

const iconBySlug = {
  charlas: Users,
  programas: Sparkles,
  chequeos: Stethoscope,
  bienestar: HeartPulse,
} as const;

export function BentoServices() {
  return (
    <section
      id="servicios"
      className="relative isolate overflow-hidden py-20 sm:py-28"
    >
      <SectionBackdrop tone="light" particles={10} seed={101} />
      <Container>
        <SectionHeader
          eyebrow="Nuestros servicios"
          title="Cuatro caminos para cuidar a tu organización"
          description="Cada servicio sigue el mismo protocolo: escuchar primero, medir con rigor y acompañar con humanidad hasta el resultado."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[minmax(220px,auto)]">
          {/* CHARLAS — grande con imagen */}
          <ServiceCardLarge
            service={services[0]}
            Icon={iconBySlug.charlas}
            className="md:col-span-3 md:row-span-2"
          />

          {/* PROGRAMAS — mediana mint */}
          <ServiceCardAccent
            service={services[1]}
            Icon={iconBySlug.programas}
            className="md:col-span-3 md:row-span-1"
          />

          {/* CHEQUEOS — con imagen */}
          <ServiceCardImage
            service={services[2]}
            Icon={iconBySlug.chequeos}
            className="md:col-span-3 md:row-span-1"
          />

          {/* BIENESTAR — neutral wide */}
          <ServiceCardWide
            service={services[3]}
            Icon={iconBySlug.bienestar}
            className="md:col-span-6"
          />
        </div>
      </Container>
    </section>
  );
}

type IconType = React.ComponentType<{ className?: string }>;
type Service = (typeof services)[number];

function ServiceCardLarge({
  service,
  Icon,
  className,
}: {
  service: Service;
  Icon: IconType;
  className?: string;
}) {
  return (
    <motion.article
      onPointerMove={trackPointer}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated",
        className
      )}
    >
      <Image
        src={service.image.src}
        alt={service.image.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        placeholder="blur"
        blurDataURL={shimmer(16, 16)}
        className="object-cover transition-transform duration-[1400ms] ease-out-quint group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/95 via-brand-900/40 to-transparent" />
      <SpotlightLayer color="hsl(var(--mint-300) / 0.45)" size={420} />

      <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
        <div className="flex items-center justify-between">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur">
            <Icon className="h-5 w-5" />
          </span>
          <span className="inline-flex items-center rounded-full bg-mint-500/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
            Más demandado
          </span>
        </div>

        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {service.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">
            {service.description}
          </p>
          <Link
            href="/servicios"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-transform group-hover:translate-x-0.5"
          >
            Saber más
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function ServiceCardAccent({
  service,
  Icon,
  className,
}: {
  service: Service;
  Icon: IconType;
  className?: string;
}) {
  return (
    <motion.article
      onPointerMove={trackPointer}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-mint-gradient p-7 text-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow-mint sm:p-8",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/15 blur-2xl"
      />
      <SpotlightLayer color="hsl(0 0% 100% / 0.25)" size={360} />
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/20 text-white backdrop-blur">
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
          {service.summary}
        </p>
        <Link
          href="/servicios"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:translate-x-0.5"
        >
          Saber más
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

function ServiceCardImage({
  service,
  Icon,
  className,
}: {
  service: Service;
  Icon: IconType;
  className?: string;
}) {
  return (
    <motion.article
      onPointerMove={trackPointer}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        // Stack vertically on phones (image on top), split into a
        // 2:3 grid only from `sm:` upward where there's room for it.
        "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated sm:grid sm:grid-cols-5",
        className
      )}
    >
      <SpotlightLayer color="hsl(var(--brand-400) / 0.25)" size={400} />
      <div className="relative h-44 overflow-hidden sm:col-span-2 sm:h-auto">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
          className="object-cover transition-transform duration-[1200ms] ease-out-quint group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface/30 sm:bg-gradient-to-r sm:to-surface/60" />
      </div>
      <div className="flex flex-col justify-between gap-4 p-6 sm:col-span-3 sm:p-7">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {service.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {service.summary}
          </p>
          <Link
            href="/servicios"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-transform group-hover:translate-x-0.5"
          >
            Saber más
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function ServiceCardWide({
  service,
  Icon,
  className,
}: {
  service: Service;
  Icon: IconType;
  className?: string;
}) {
  return (
    <motion.article
      onPointerMove={trackPointer}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated sm:p-10",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 dot-pattern opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <SpotlightLayer color="hsl(var(--brand-400) / 0.3)" size={520} />
      <div className="relative grid items-center gap-8 md:grid-cols-2">
        <div>
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient text-white shadow-soft">
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
            {service.title}
          </h3>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">
            {service.description}
          </p>
          <Link
            href="/servicios"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-transform group-hover:translate-x-0.5"
          >
            Conocer más
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mini features */}
        <ul className="space-y-3 text-sm">
          {[
            "Decisiones saludables, evidencia clara",
            "Prevención de enfermedades crónicas",
            "Hábitos sostenibles a largo plazo",
          ].map((t) => (
            <li
              key={t}
              className="flex items-start gap-3 rounded-2xl border border-border bg-background/70 p-4 backdrop-blur"
            >
              <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-mint-500/15 text-mint-500">
                <HeartPulse className="h-3.5 w-3.5" />
              </span>
              <span className="text-foreground/90">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
