"use client";

import { Reveal } from "./Reveal";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { cn } from "@/lib/cn";

type Align = "left" | "center";

type Props = {
  eyebrow?: string;
  /** Headline. Pass a string for word-by-word animation; pass JSX for custom layout. */
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: Align;
  className?: string;
  /** Section anchor: when scrolled into view, headline animates in. */
  whenInView?: boolean;
};

/**
 * Section header — unified across every section on the site.
 *
 * - Eyebrow: pill with a pulsing mint dot
 * - Title: word-by-word reveal (AnimatedHeadline) when the prop is
 *   a string; falls back to a single Reveal when JSX is passed.
 * - Description: fades in slightly after the title for a calm cadence.
 */

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  whenInView = true,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-mint-400/70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-mint-500" />
            </span>
            {eyebrow}
          </span>
        </Reveal>
      )}

      {typeof title === "string" ? (
        <AnimatedHeadline
          as="h2"
          whenInView={whenInView}
          className="mt-4 text-display-xl font-semibold tracking-tight text-foreground text-balance"
        >
          {title}
        </AnimatedHeadline>
      ) : (
        <Reveal delay={0.05}>
          <h2 className="mt-4 text-display-xl font-semibold tracking-tight text-foreground text-balance">
            {title}
          </h2>
        </Reveal>
      )}

      {description && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-balance">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
