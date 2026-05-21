import { Container } from "@/components/ui/Container";

/**
 * Route-level loading boundary.
 * Streams in while a server component fetches data. Mirrors the
 * silhouette of the real layout so there's no jarring pop-in.
 */
export default function Loading() {
  return (
    <section
      aria-busy="true"
      aria-live="polite"
      className="relative isolate pt-32 pb-20"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-soft" />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Skeleton className="mx-auto h-7 w-44 rounded-full" />
          <Skeleton className="mx-auto mt-6 h-12 w-[80%] rounded-2xl" />
          <Skeleton className="mx-auto mt-3 h-12 w-[60%] rounded-2xl" />
          <Skeleton className="mx-auto mt-7 h-5 w-[70%] rounded-full" />
          <Skeleton className="mx-auto mt-2 h-5 w-[55%] rounded-full" />

          <div className="mt-10 flex justify-center gap-3">
            <Skeleton className="h-12 w-44 rounded-full" />
            <Skeleton className="h-12 w-44 rounded-full" />
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-3xl" />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-muted/80 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, transparent, hsl(var(--surface) / 0.6), transparent)",
        backgroundSize: "200% 100%",
        animation: "skeleton-shimmer 1.6s linear infinite",
      }}
    >
      <style>{`@keyframes skeleton-shimmer{from{background-position:200% 0}to{background-position:-200% 0}}`}</style>
    </div>
  );
}
