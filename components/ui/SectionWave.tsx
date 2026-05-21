/**
 * Decorative wave at a section boundary.
 *
 * Sits absolutely at the bottom of a `relative` section, painting
 * an SVG curve in the section's surface color so the next section
 * "flows" out instead of cutting at a hard line. Set `flip` when
 * placing it at the top of a section instead.
 */

import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Tailwind text-* color class — controls the wave fill via currentColor. */
  colorClassName?: string;
  flip?: boolean;
  /** Height in px. */
  height?: number;
};

export function SectionWave({
  className,
  colorClassName = "text-background",
  flip = false,
  height = 80,
}: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 z-[1] leading-[0]",
        flip ? "top-0 -scale-y-100" : "bottom-0",
        colorClassName,
        className
      )}
      style={{ height }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 40 C 240 80 480 0 720 30 C 960 60 1200 10 1440 30 L1440 80 L0 80 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
