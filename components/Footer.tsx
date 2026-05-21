"use client";

import Link from "next/link";
import { Instagram, MapPin, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/ui/BrandMark";
import { siteConfig, navLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border bg-surface">
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-soft opacity-40" />
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <BrandMark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Mail className="h-4 w-4 text-brand-600" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-brand-600" />
                {siteConfig.contact.location}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Navegación</h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#contacto"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Solicitar información
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Contacto</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={siteConfig.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <MessageCircle className="h-4 w-4 text-leaf" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Instagram className="h-4 w-4 text-coral-500" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-border py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.legalName}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Hecho con cuidado en Quito · Ecuador
          </p>
        </div>
      </Container>
    </footer>
  );
}
