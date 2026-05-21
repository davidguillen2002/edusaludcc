"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Check,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { Button } from "@/components/ui/Button";
import { consultationTypes, siteConfig } from "@/lib/site";
import { sendContact, type ContactResult } from "@/app/actions/contact";
import { cn } from "@/lib/cn";

type FormState = {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  /** Honeypot — visible only to bots via off-screen positioning. */
  website: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  type: consultationTypes[0],
  message: "",
  website: "",
};

type Status = "idle" | "sent" | "error";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");
    setErrorMsg("");
    startTransition(async () => {
      const result: ContactResult = await sendContact({
        name: form.name.trim(),
        email: form.email.trim() || undefined,
        phone: form.phone.trim(),
        type: form.type,
        message: form.message.trim(),
        website: form.website, // honeypot — empty for humans
      });
      if (result.ok) {
        setStatus("sent");
        setForm(initial);
      } else {
        setStatus("error");
        setErrorMsg(result.error);
      }
    });
  };

  return (
    <section
      id="contacto"
      className="relative isolate overflow-hidden py-20 sm:py-28"
    >
      <SectionBackdrop tone="light" particles={9} seed={417} />
      <Container>
        <SectionHeader
          eyebrow="Solicita información"
          title="Llena el formulario y te contactaremos"
          description="Respondemos en menos de 24 horas laborables con una propuesta clara, ética y a medida."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-3xl bg-hero-gradient p-8 text-white shadow-elevated">
              <div
                aria-hidden
                className="absolute right-0 top-0 h-40 w-40 rounded-full bg-coral-500/30 blur-3xl"
              />
              <h3 className="text-xl font-semibold tracking-tight">
                Hablemos de tu organización
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                Cuéntanos qué necesitas y te enviaremos una propuesta personalizada
                en menos de 24 horas.
              </p>

              <ul className="mt-7 space-y-4 text-sm">
                <ContactRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={siteConfig.contact.email}
                  href={`mailto:${siteConfig.contact.email}`}
                />
                <ContactRow
                  icon={<Phone className="h-4 w-4" />}
                  label="WhatsApp"
                  value={siteConfig.contact.phone}
                  href={siteConfig.socials.whatsapp}
                  external
                />
                <ContactRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Ubicación"
                  value={siteConfig.contact.location}
                />
              </ul>

              <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-4 text-xs text-white/75 backdrop-blur">
                <strong className="font-semibold text-white">
                  Confidencialidad garantizada.
                </strong>{" "}
                Tus datos solo se usan para responder esta consulta.
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={onSubmit}
              noValidate
              className="relative rounded-3xl border border-border bg-surface p-7 shadow-soft sm:p-9"
            >
              {/* Honeypot — invisible to humans, attractive to naive bots. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden opacity-0"
              >
                <label htmlFor="website">No completar este campo</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Nombre completo *"
                  name="name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  required
                  autoComplete="name"
                />
                <Field
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  autoComplete="email"
                />
                <Field
                  label="Teléfono *"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                  required
                  autoComplete="tel"
                />
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="type"
                    className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    Tipo de consulta *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="h-11 cursor-pointer rounded-xl border border-border bg-background px-3 text-sm text-foreground transition-colors focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
                  >
                    {consultationTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="resize-none rounded-xl border border-border bg-background p-3 text-sm text-foreground transition-colors focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
                  placeholder="Cuéntanos brevemente sobre tu organización y qué necesitas…"
                />
              </div>

              <div className="mt-7 flex flex-col-reverse items-stretch justify-between gap-4 sm:flex-row sm:items-center">
                <p className="text-xs text-muted-foreground sm:max-w-sm">
                  Al enviar aceptas que te contactemos por correo o WhatsApp.
                </p>

                <SubmitButton pending={pending} status={status} />
              </div>

              <AnimatePresence mode="wait">
                {status === "sent" && (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    aria-live="polite"
                    className="mt-5 flex items-center gap-2 rounded-xl bg-leaf/10 px-4 py-3 text-sm font-medium text-leaf"
                  >
                    <Check className="h-4 w-4" />
                    Mensaje enviado. Te contactaremos pronto.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    aria-live="assertive"
                    className="mt-5 flex items-center gap-2 rounded-xl bg-coral-50 px-4 py-3 text-sm font-medium text-coral-700"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errorMsg || "Hubo un error. Intenta nuevamente."}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="h-11 rounded-xl border border-border bg-background px-3 text-sm text-foreground transition-colors focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
      />
    </div>
  );
}

function SubmitButton({
  pending,
  status,
}: {
  pending: boolean;
  status: Status;
}) {
  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn(status === "sent" && "!bg-leaf hover:!bg-leaf")}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Enviando…
        </>
      ) : status === "sent" ? (
        <>
          <Check className="h-4 w-4" />
          Enviado
        </>
      ) : (
        <>
          <Send className="h-4 w-4" />
          Enviar consulta
        </>
      )}
    </Button>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 text-white backdrop-blur">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-white/60">
          {label}
        </div>
        <div className="truncate text-sm font-medium text-white">{value}</div>
      </div>
    </>
  );
  if (href) {
    return (
      <li>
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="-mx-1 flex items-center gap-3 rounded-xl px-1 py-1 transition-colors hover:bg-white/5"
        >
          {content}
        </a>
      </li>
    );
  }
  return <li className="flex items-center gap-3 px-1">{content}</li>;
}
