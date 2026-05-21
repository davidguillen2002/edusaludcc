"use client";

import { motion } from "framer-motion";
import { Compass, LineChart, PlayCircle, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { SpotlightLayer } from "@/components/ui/Spotlight";
import { methodologySteps } from "@/lib/site";
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
      </Container>
    </section>
  );
}
