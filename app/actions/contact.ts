"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig, consultationTypes } from "@/lib/site";
import { serverEnv } from "@/lib/env";
import { limit, gc } from "@/lib/rate-limit";

/**
 * Contact form server action.
 *
 * Defense layers (outer → inner):
 *   1. Per-IP fixed-window rate limit (5 req / 10 min)
 *   2. Honeypot field — bots tend to fill every input they see
 *   3. Zod schema — type + length + email validation
 *   4. Resend — actual send if RESEND_API_KEY is configured
 *
 * Required env vars (set in Vercel → Environment Variables):
 *   - RESEND_API_KEY        Resend API key (resend.com free tier)
 *   - CONTACT_TO_EMAIL      destination inbox (defaults to siteConfig.contact.email)
 *   - CONTACT_FROM_EMAIL    verified sender (defaults to onboarding@resend.dev)
 */

const contactSchema = z.object({
  name: z.string().trim().min(2, "Nombre muy corto").max(120),
  email: z
    .union([z.literal(""), z.string().email("Correo inválido")])
    .optional(),
  phone: z.string().trim().min(6, "Teléfono muy corto").max(40),
  type: z.enum(consultationTypes as unknown as [string, ...string[]]),
  message: z.string().trim().min(8, "Mensaje muy corto").max(5000),
  /** Honeypot — must remain empty. Real users never see this field. */
  website: z.string().max(0).optional().default(""),
});

export type ContactPayload = z.input<typeof contactSchema>;
export type ContactResult = { ok: true } | { ok: false; error: string };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(p: z.output<typeof contactSchema>) {
  const rows: Array<[string, string]> = [
    ["Nombre", p.name],
    ["Teléfono", p.phone],
    ["Email", p.email || "—"],
    ["Tipo de consulta", p.type],
  ];
  const list = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;background:#f8fafc;border-radius:8px;color:#334155;font-weight:600;width:160px">${escapeHtml(
          k
        )}</td><td style="padding:8px 12px;color:#0f172a">${escapeHtml(v)}</td></tr>`
    )
    .join("");
  return `<!doctype html><html><body style="font-family:Inter,Arial,sans-serif;background:#f1f5f9;padding:24px"><div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:28px;box-shadow:0 1px 2px rgba(15,23,42,.04)"><h2 style="margin:0 0 4px;color:#1d4ed8;font-size:18px">Nueva consulta · EduSaludCC</h2><p style="margin:0 0 18px;color:#64748b;font-size:13px">Enviada desde el formulario del sitio.</p><table style="width:100%;border-collapse:separate;border-spacing:0 6px">${list}</table><div style="margin-top:18px"><div style="font-weight:600;color:#0f172a;margin-bottom:6px">Mensaje</div><div style="padding:14px;background:#f8fafc;border-radius:10px;color:#1e293b;white-space:pre-wrap">${escapeHtml(
    p.message
  )}</div></div></div></body></html>`;
}

function getClientIp(): string {
  const h = headers();
  // Vercel populates x-forwarded-for. Fall back to a stable bucket so
  // unknown clients still get *some* rate limiting.
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return h.get("x-real-ip") || "unknown";
}

export async function sendContact(input: ContactPayload): Promise<ContactResult> {
  // 1) Rate limit per IP (5 submissions / 10 minutes)
  const ip = getClientIp();
  const rl = limit(`contact:${ip}`, { max: 5, windowMs: 10 * 60 * 1000 });
  gc();
  if (!rl.ok) {
    return {
      ok: false,
      error: `Demasiadas consultas. Intenta de nuevo en ${Math.ceil(rl.retryAfterSeconds / 60)} min.`,
    };
  }

  // 2) Schema validation (also catches honeypot via z.string().max(0))
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    // If the honeypot was filled, pretend success — don't tell the bot.
    if (input.website && input.website.length > 0) {
      console.info("[contact] honeypot tripped from ip=", ip);
      return { ok: true };
    }
    const first = parsed.error.issues[0]?.message ?? "Datos inválidos.";
    return { ok: false, error: first };
  }

  const data = parsed.data;
  const to = serverEnv.CONTACT_TO_EMAIL ?? siteConfig.contact.email;
  const from = serverEnv.CONTACT_FROM_EMAIL ?? "EduSaludCC <onboarding@resend.dev>";
  const apiKey = serverEnv.RESEND_API_KEY;

  // 3) Dev fallback — no external call so the UI can be tested locally.
  if (!apiKey) {
    console.info("[contact] RESEND_API_KEY missing — payload not sent:", {
      ...data,
      ip,
    });
    return { ok: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email || undefined,
      subject: `Consulta EduSaludCC · ${data.type} · ${data.name}`,
      html: buildEmailHtml(data),
    });
    if (error) {
      console.error("[contact] resend error", error);
      return { ok: false, error: "No pudimos enviar el mensaje. Intenta de nuevo." };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return { ok: false, error: "Error inesperado. Intenta de nuevo." };
  }
}
