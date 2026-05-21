/**
 * Tiny className joiner — avoids an extra dependency on clsx/tailwind-merge
 * for a focused landing template. Swap for tailwind-merge if the project
 * grows enough to need conflict resolution.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
