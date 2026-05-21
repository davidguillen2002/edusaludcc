import { Particles } from "@/components/ui/Particles";
import { Grain } from "@/components/ui/Grain";
import { cn } from "@/lib/cn";

/**
 * Section atmosphere primitive.
 *
 * Drop this *inside* any `relative isolate` section to give it the
 * same atmospheric depth as the hero: mesh background, drifting
 * particles, grain texture. The `tone` prop covers the four palettes
 * the site uses; pick `none` when the section already paints its own
 * background (e.g. the marquee or quote block).
 *
 * Use distinct `seed` values across sections so particle patterns
 * never visibly repeat as the user scrolls.
 */

type Tone = "light" | "warm" | "cool" | "none";

const mesh: Record<Tone, string> = {
  light: "bg-mesh-soft",
  warm: "bg-mesh-warm",
  cool:
    "[background:radial-gradient(at_20%_0%,hsl(var(--brand-100)/0.7),transparent_50%),radial-gradient(at_85%_30%,hsl(var(--accent)/0.35),transparent_50%),radial-gradient(at_40%_100%,hsl(var(--brand-50)/0.8),transparent_55%)]",
  none: "",
};

type Props = {
  tone?: Tone;
  particles?: number;
  /** Random seed so each section gets a distinct particle layout. */
  seed?: number;
  grain?: boolean;
  /** Add a faint grid pattern over the mesh (echoes the hero). */
  grid?: boolean;
  /** Opacity for the grain layer (default 0.05). */
  grainOpacity?: number;
  className?: string;
};

export function SectionBackdrop({
  tone = "light",
  particles = 10,
  seed = 7,
  grain = true,
  grid = false,
  grainOpacity = 0.05,
  className,
}: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {tone !== "none" && <div className={cn("absolute inset-0", mesh[tone])} />}
      {grid && (
        <div className="absolute inset-0 grid-pattern opacity-30" />
      )}
      {particles > 0 && <Particles count={particles} seed={seed} />}
      {grain && <Grain opacity={grainOpacity} />}
    </div>
  );
}
