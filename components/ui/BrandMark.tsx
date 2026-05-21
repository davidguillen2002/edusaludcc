import Image from "next/image";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg";

// The real EduSaludCC logo already contains the wordmark — we render the
// PNG on its own. Heights are chosen so the lockup aligns visually with
// surrounding nav/footer copy.
const sizes: Record<Size, { height: number; cls: string }> = {
  sm: { height: 36, cls: "h-9" },
  md: { height: 44, cls: "h-11" },
  lg: { height: 56, cls: "h-14" },
};

export function BrandMark({
  size = "md",
  className,
}: {
  size?: Size;
  className?: string;
}) {
  const s = sizes[size];
  return (
    <span
      className={cn("inline-flex items-center", className)}
      aria-label="EduSaludCC"
    >
      <Image
        src="/logo.png"
        alt="EduSaludCC"
        width={Math.round(s.height * 1.2)}
        height={s.height}
        priority
        className={cn("w-auto select-none", s.cls)}
      />
    </span>
  );
}
