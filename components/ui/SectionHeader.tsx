"use client";

import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

type Align = "left" | "center";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: Align;
  className?: string;
}) {
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
            <span className="h-1.5 w-1.5 rounded-full bg-coral-500" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-display-xl font-semibold tracking-tight text-foreground text-balance">
          {title}
        </h2>
      </Reveal>
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
