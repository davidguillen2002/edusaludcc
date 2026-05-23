import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/ui/BrandMark";
import { siteConfig } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden pt-32 pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-soft" />
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
      />

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 inline-flex">
            <BrandMark size="lg" />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full bg-mint-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-mint-700">
            Error 404
          </span>

          <h1 className="mt-5 text-display-2xl font-semibold tracking-tight text-foreground text-balance">
            Esta página no la encontramos en nuestra agenda.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-balance">
            Puede que el enlace esté roto o que la sección se haya movido. Vuelve al
            inicio o escríbenos por WhatsApp y te orientamos.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/" size="lg">
              <Home className="h-4 w-4" />
              Volver al inicio
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
