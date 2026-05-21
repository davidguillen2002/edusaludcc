"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  HeartPulse,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { RotatingWord } from "@/components/ui/RotatingWord";
import { Grain } from "@/components/ui/Grain";
import { Particles } from "@/components/ui/Particles";
import { AnimatedRing } from "@/components/ui/AnimatedRing";
import { SectionWave } from "@/components/ui/SectionWave";
import { heroImage, rotatingHeroWords } from "@/lib/site";
import { shimmer } from "@/lib/blur";

/**
 * Cinematic hero — grammar-safe rotating word, multi-layer parallax,
 * drawn heartbeat, mouse-tilt card, floating particles, animated
 * gradient ring around the showcase, and a wave transition into
 * the next section.
 *
 * Headline structure:
 *   "Salud que enseña."
 *   "[Cycling word] que cuida."
 *
 * The rotating word always reads naturally with "que cuida" since
 * `rotatingHeroWords` is curated to feminine singular subjects.
 */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Three depth layers, three speeds.
  const layerSlow = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const layerMid = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const layerFast = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.7]);

  // Mouse-tilt for the showcase card.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const sx = useSpring(tiltX, { stiffness: 180, damping: 18, mass: 0.6 });
  const sy = useSpring(tiltY, { stiffness: 180, damping: 18, mass: 0.6 });

  const onCardMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5;
    const cy = (e.clientY - r.top) / r.height - 0.5;
    tiltY.set(cx * 12);
    tiltX.set(-cy * 12);
  };
  const onCardLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-28 pb-32 sm:pt-36 sm:pb-40"
    >
      {/* === BACKDROP LAYERS ============================================ */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-soft" />

      <motion.div
        aria-hidden
        style={{ y: layerSlow }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand-400/25 blur-3xl animate-aurora" />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ y: layerMid }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-24 -left-24 h-72 w-72 rounded-full bg-coral-300/45 blur-3xl animate-float-y" />
        <div className="absolute bottom-24 right-10 h-72 w-72 rounded-full bg-leaf/20 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-sun/25 blur-3xl" />
      </motion.div>

      {/* Drawn heartbeat — fast layer */}
      <motion.svg
        aria-hidden
        style={{ y: layerFast }}
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className="absolute left-0 right-0 top-[58%] -z-10 h-32 w-full"
      >
        <motion.path
          d="M0 100 L150 100 L180 60 L210 140 L240 80 L270 110 L420 110 L450 50 L480 160 L510 90 L540 110 L720 110 L760 60 L800 140 L840 80 L870 110 L1200 110"
          fill="none"
          stroke="hsl(217 91% 55% / 0.4)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        />
      </motion.svg>

      <Particles count={18} seed={314} />
      <div aria-hidden className="absolute inset-0 -z-10 grid-pattern opacity-30" />
      <Grain opacity={0.06} />

      {/* === CONTENT =================================================== */}
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Copy column */}
          <div className="lg:col-span-7">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-coral-200 bg-coral-50/90 px-3.5 py-1.5 text-xs font-semibold text-coral-700 backdrop-blur"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                aria-hidden
              >
                <Sparkles className="h-3.5 w-3.5" />
              </motion.span>
              Educar para una salud integral
            </motion.div>

            <h1 className="mt-6 text-display-2xl font-semibold tracking-tight text-foreground text-balance">
              <AnimatedHeadline as="span" className="block">
                Salud que enseña.
              </AnimatedHeadline>

              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-1 block sm:mt-2"
              >
                {/* inline-block (not inline-flex) so the line can wrap
                    naturally on narrow viewports and the baseline
                    aligns with the trailing "que cuida." text. */}
                <span className="relative inline-block align-baseline">
                  {/* Pulsing glow — tighter on mobile to avoid overflow. */}
                  <span
                    aria-hidden
                    className="absolute inset-y-1 -inset-x-2 -z-10 rounded-2xl bg-brand-100/70 blur-2xl sm:inset-y-2 sm:-inset-x-3"
                  />
                  <RotatingWord
                    words={[...rotatingHeroWords]}
                    className="text-display-2xl font-semibold"
                  />
                </span>{" "}
                <span>que cuida.</span>
              </motion.span>
            </h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={6}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-balance"
            >
              En <strong className="font-semibold text-foreground">EduSaludCC</strong>{" "}
              transformamos la educación médica con charlas personalizadas y programas
              institucionales que empoderan a las organizaciones con conocimiento
              práctico y medidas preventivas efectivas.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={7}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <MagneticButton href="/#contacto" size="lg">
                Solicitar propuesta
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <Button href="/servicios" variant="secondary" size="lg">
                <PlayCircle className="h-4 w-4" />
                Conocer servicios
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={8}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground"
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-600" />
                Equipo médico colegiado
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
              <span>Quito · Pichincha · Ecuador</span>
              <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
              <span>Charlas · Programas · Chequeos</span>
            </motion.div>
          </div>

          {/* Showcase column with mouse-tilt + animated ring */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto aspect-[5/6] w-full max-w-md sm:aspect-[4/5]">
              {/* Animated gradient ring behind the card */}
              <AnimatedRing size={118} durationS={16} thickness={3} className="z-0" />

              <motion.div
                onPointerMove={onCardMove}
                onPointerLeave={onCardLeave}
                style={{
                  rotateX: sx,
                  rotateY: sy,
                  transformPerspective: 1100,
                }}
                initial={{ opacity: 0, scale: 0.96, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-elevated [transform-style:preserve-3d]"
              >
                <div className="absolute inset-0 -z-10">
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    placeholder="blur"
                    blurDataURL={shimmer(16, 20)}
                    className="object-cover"
                  />
                </div>
                <motion.div
                  aria-hidden
                  style={{ opacity: overlayOpacity }}
                  className="absolute inset-0 bg-gradient-to-tr from-brand-900/70 via-brand-700/20 to-transparent"
                />

                {/* Sheen overlay */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(420px circle at 50% 0%, rgba(255,255,255,0.18), transparent 55%)",
                  }}
                />

                {/* Floating glass card — bottom */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transform: "translateZ(40px)" }}
                  className="absolute bottom-5 left-5 right-5 glass-strong rounded-2xl p-4 shadow-elevated"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-coral-gradient text-white animate-heartbeat">
                      <HeartPulse className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium text-muted-foreground">
                        Programa activo
                      </div>
                      <div className="truncate text-sm font-semibold text-foreground">
                        Plan preventivo cardiovascular
                      </div>
                    </div>
                    <span className="rounded-full bg-leaf/15 px-2 py-1 text-[11px] font-semibold text-leaf">
                      En curso
                    </span>
                  </div>
                </motion.div>

                {/* Floating chip — top-right */}
                <motion.div
                  initial={{ opacity: 0, y: -10, x: 10 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.7, delay: 1.1 }}
                  style={{ transform: "translateZ(30px)" }}
                  className="absolute right-4 top-4 glass-strong flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium shadow-soft"
                >
                  <Stethoscope className="h-3.5 w-3.5 text-brand-600" />
                  Atención profesional
                </motion.div>

                {/* Floating chip — left mid */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 1.3 }}
                  style={{ transform: "translateZ(25px)" }}
                  className="absolute left-4 top-24 glass-strong flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium shadow-soft"
                >
                  <Sparkles className="h-3.5 w-3.5 text-coral-500" />
                  +320 formados
                </motion.div>
              </motion.div>
            </div>

            {/* Ambient blurs */}
            <div
              aria-hidden
              className="absolute -bottom-6 -right-4 -z-10 h-44 w-44 rounded-full bg-coral-400/45 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -top-6 -left-4 -z-10 h-44 w-44 rounded-full bg-brand-400/45 blur-3xl"
            />
          </div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border/80 shadow-soft sm:grid-cols-4"
        >
          {[
            { value: "12+", label: "ejes preventivos" },
            { value: "+320", label: "profesionales formados/año" },
            { value: "98%", label: "adherencia clínica" },
            { value: "4.9★", label: "valoración promedio" },
          ].map((s) => (
            <div key={s.label} className="bg-surface px-6 py-7 text-center">
              <CountUp
                value={s.value}
                className="block text-display-lg font-semibold tracking-tight text-foreground tabular-nums"
              />
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>

      {/* Wave divider into the next section (brand-900 marquee) */}
      <SectionWave colorClassName="text-brand-900" height={70} />
    </section>
  );
}
