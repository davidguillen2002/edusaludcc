"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/ui/BrandMark";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <Container>
        <div
          className={cn(
            "flex h-14 items-center justify-between rounded-full pl-2 pr-2 transition-all duration-300",
            scrolled
              ? "glass-strong shadow-soft"
              : "bg-transparent border border-transparent"
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2 pl-1"
            aria-label="EduSaludCC · inicio"
          >
            <BrandMark size="sm" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    active
                      ? "text-brand-700"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-100"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Button href="/#contacto" size="sm">
              Solicitar información
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-muted md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <Container className="mt-2">
              <div className="glass-strong rounded-2xl p-3 shadow-elevated">
                <nav className="flex flex-col">
                  {navLinks.map((l) => {
                    const active = pathname === l.href;
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        className={cn(
                          "rounded-xl px-4 py-3 text-base transition-colors",
                          active
                            ? "bg-brand-50 text-brand-700"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        {l.label}
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-2 px-2 pb-1">
                  <Button href="/#contacto" className="w-full">
                    Solicitar información
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
