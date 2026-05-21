"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqs } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Accordion FAQ.
 *
 * Single-expand pattern: opening one item closes the previous one
 * so the page never reflows to an unreasonable height. Height
 * animation uses `height: auto` via Framer's layout transition.
 */

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="Preguntas frecuentes"
          title="Lo que las instituciones preguntan antes de empezar"
          description="Si tu duda no aparece aquí, escríbenos por WhatsApp y respondemos en menos de un día laborable."
        />

        <div className="mx-auto mt-14 max-w-3xl">
          <ul className="divide-y divide-border rounded-3xl border border-border bg-surface shadow-soft">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full cursor-pointer items-start justify-between gap-6 px-6 py-5 text-left sm:px-8 sm:py-6"
                  >
                    <span
                      className={cn(
                        "flex-1 text-base font-semibold tracking-tight transition-colors sm:text-lg",
                        isOpen ? "text-brand-700" : "text-foreground"
                      )}
                    >
                      {item.q}
                    </span>
                    <motion.span
                      aria-hidden
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors",
                        isOpen
                          ? "border-transparent bg-brand-gradient text-white shadow-soft"
                          : "border-border text-foreground/70 group-hover:border-brand-200 group-hover:text-brand-700"
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.25 },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground sm:px-8 sm:pb-7 sm:text-base">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
