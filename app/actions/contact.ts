"use server";

import { Resend } from "resend";
import { siteConfig, consultationTypes } from "@/lib/site";

/**
 * Contact form server action.
 *
 * Flow:
 *  - Validates the submission server-side (defense in depth).
 *  - Sends an email through Resend if RESEND_API_KEY is configured.
 *  - In dev with no key, logs the payload and returns ok=true so the UI
 *    can be exercised end-to-end without external setup.
 *
 * Required env vars in production (Vercel → Project → Settings → Environment Variables):
 *  - RESEND_API_KEY        Resend API key (resend.com — free tier)
 *  - CONTACT_TO_EMAIL      (optional) destination inbox. Defaults to siteConfig.contact.email
 *  - CONTACT_FROM_EMAIL    (optional) verified sender. Defaults to onboarding@resend.dev
 */

export type ContactPayload = {
  name: string;
  email?: string;
  phone: string;
  type: string;
  message: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

const MAX = { name: 120, email: 200, phone: 40, type: 80, message: 5000 } as const;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(p: ContactPayload) {
  const rows: Array<[string, string]> = [
    ["Nombre", p.name],
    ["Teléfono", p.phone],
    ["Email", p.email ?? "—"],
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

export async function sendContact(payload: ContactPayload): Promise<ContactResult> {
  // Server-side validation
  if (!payload.name?.trim() || payload.name.length > MAX.name) {
    return { ok: false, error: "Nombre inválido." };
  }
  if (!payload.phone?.trim() || payload.phone.length > MAX.phone) {
    return { ok: false, error: "Teléfono inválido." };
  }
  if (payload.email && (payload.email.length > MAX.email || !isEmail(payload.email))) {
    return { ok: false, error: "Correo electrónico inválido." };
  }
  if (!consultationTypes.includes(payload.type)) {
    return { ok: false, error: "Tipo de consulta no permitido." };
  }
  if (!payload.message?.trim() || payload.message.length > MAX.message) {
    return { ok: false, error: "Mensaje inválido." };
  }

  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "EduSaludCC <onboarding@resend.dev>";
  const apiKey = process.env.RESEND_API_KEY;

  // Dev fallback — no external call so the UI can be tested locally.
  if (!apiKey) {
    console.info("[contact] RESEND_API_KEY missing — payload not sent:", payload);
    return { ok: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: payload.email || undefined,
      subject: `Consulta EduSaludCC · ${payload.type} · ${payload.name}`,
      html: buildEmailHtml(payload),
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
