"use client";

import { useEffect } from "react";
import { RotateCcw, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/ui/BrandMark";
import { siteConfig } from "@/lib/site";

/**
 * Route-level error boundary.
 * Next renders this whenever a server/client error escapes a page —
 * the user sees branded recovery options instead of a stack trace.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to monitoring later (Sentry, Vercel logs already capture it).
    console.error("[route-error]", error);
  }, [error]);

  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden pt-32 pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-soft" />
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-coral-200/40 blur-3xl"
      />

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 inline-flex">
            <BrandMark size="lg" />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full bg-coral-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-coral-700">
            Algo se rompió de nuestro lado
          </span>

          <h1 className="mt-5 text-display-2xl font-semibold tracking-tight text-foreground text-balance">
            Tuvimos un imprevisto técnico.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-balance">
            Ya quedó registrado en nuestros logs. Intenta de nuevo en unos segundos
            o escríbenos directo por WhatsApp si urge.
          </p>

          {error.digest && (
            <p className="mt-3 text-xs text-muted-foreground">
              Código de referencia: <code className="font-mono">{error.digest}</code>
            </p>
          )}

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={reset} size="lg">
              <RotateCcw className="h-4 w-4" />
              Reintentar
            </Button>
            <Button
              href={siteConfig.socials.whatsapp}
              variant="secondary"
              size="lg"
            >
              <MessageCircle className="h-4 w-4" />
              Escribir por WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
