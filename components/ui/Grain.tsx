/**
 * Subtle film-grain texture overlay.
 *
 * Uses an SVG `feTurbulence` filter rendered to a 200x200 tile that
 * the browser repeats. No image asset, no network round-trip — just
 * a single inline data URL. Layered above page content with low
 * opacity, it kills the "AI-generated flat" feeling and gives every
 * section a tactile, photographic depth.
 *
 * `mix-blend-mode: overlay` keeps light areas light and dark areas
 * dark, so the grain reads as texture instead of haze.
 */

import { cn } from "@/lib/cn";

const GRAIN_DATA_URL =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n' x='0' y='0'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.9'/></svg>";

export function Grain({
  className,
  opacity = 0.08,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 mix-blend-overlay",
        className
      )}
      style={{
        opacity,
        backgroundImage: `url("${GRAIN_DATA_URL}")`,
        backgroundSize: "200px 200px",
      }}
    />
  );
}
