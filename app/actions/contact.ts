"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig, consultationTypes } from "@/lib/site";
import { serverEnv } from "@/lib/env";
import { limit, gc } from "@/lib/rate-limit";

/**
 * Production-grade contact form action.
 *
 * What this guarantees:
 *  1. Per-IP rate limit (5 / 10 min) — fast bot defence.
 *  2. Honeypot — silently accepts naive bots without sending.
 *  3. Zod schema — type/length/email validated server-side.
 *  4. Resend send with retry on transient (5xx/timeout) failures.
 *  5. HTML + plain-text body (boosts deliverability with Outlook/Gmail).
 *  6. Reply-To set to the submitter — admin can reply in one click.
 *  7. Resend tags — for delivery monitoring in the Resend dashboard.
 *  8. Idempotency-friendly reference ID surfaced to the user + logs.
 *  9. Optional confirmation copy sent back to the submitter (best UX).
 * 10. Structured console logs — every send shows up in Vercel logs.
 *
 * Required env (Vercel → Project → Settings → Environment Variables):
 *  - RESEND_API_KEY         API key from resend.com
 *  - CONTACT_TO_EMAIL       primary inbox (defaults to siteConfig.contact.email)
 *  - CONTACT_FROM_EMAIL     verified sender — "EduSaludCC <hola@edusaludcc.com>"
 *                           once Resend domain verification is done.
 *                           Falls back to "EduSaludCC <onboarding@resend.dev>".
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
export type ContactResult =
  | { ok: true; reference: string }
  | { ok: false; error: string };

type ValidatedPayload = z.output<typeof contactSchema>;

const FALLBACK_FROM = "EduSaludCC <onboarding@resend.dev>";

/* ------------------------------------------------------------------ */
/* Utilities                                                          */
/* ------------------------------------------------------------------ */

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getClientIp(): string {
  const h = headers();
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return h.get("x-real-ip") || "unknown";
}

/** Compact, human-readable reference: YYYYMMDD-HHMM-XXXX. */
function newReference(): string {
  const d = new Date();
  const stamp =
    d.getUTCFullYear().toString() +
    String(d.getUTCMonth() + 1).padStart(2, "0") +
    String(d.getUTCDate()).padStart(2, "0") +
    "-" +
    String(d.getUTCHours()).padStart(2, "0") +
    String(d.getUTCMinutes()).padStart(2, "0");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${stamp}-${random}`;
}

/** Classify a Resend SDK error as transient (worth retrying). */
function isTransient(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const e = err as { name?: string; statusCode?: number; message?: string };
  if (e.statusCode && e.statusCode >= 500 && e.statusCode < 600) return true;
  const s = `${e.name ?? ""} ${e.message ?? ""}`.toLowerCase();
  return /timeout|econn|fetch|temporar|rate.?limit|429|503|504/.test(s);
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/* ------------------------------------------------------------------ */
/* Email content                                                      */
/* ------------------------------------------------------------------ */

function adminEmail(p: ValidatedPayload, ref: string, ip: string) {
  const rows: Array<[string, string]> = [
    ["Nombre", p.name],
    ["Teléfono", p.phone],
    ["Email", p.email || "—"],
    ["Tipo de consulta", p.type],
    ["Referencia", ref],
    ["IP", ip],
  ];

  const html = `<!doctype html><html><body style="margin:0;font-family:Inter,Arial,sans-serif;background:#f1f5f9;padding:24px;color:#0f172a">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:28px;box-shadow:0 1px 2px rgba(15,23,42,.04)">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
    <div style="width:8px;height:8px;border-radius:50%;background:#22a578"></div>
    <span style="font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#475569;font-weight:600">Nueva consulta</span>
  </div>
  <h2 style="margin:0 0 4px;color:#1d4ed8;font-size:20px">EduSaludCC · ${escapeHtml(p.type)}</h2>
  <p style="margin:0 0 18px;color:#64748b;font-size:13px">Recibida desde el formulario del sitio · responde directo con "Reply" — ya está dirigido al solicitante.</p>
  <table style="width:100%;border-collapse:separate;border-spacing:0 6px">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 12px;background:#f8fafc;border-radius:8px;color:#334155;font-weight:600;width:160px">${escapeHtml(
            k
          )}</td><td style="padding:8px 12px;color:#0f172a">${escapeHtml(v)}</td></tr>`
      )
      .join("")}
  </table>
  <div style="margin-top:18px">
    <div style="font-weight:600;color:#0f172a;margin-bottom:6px">Mensaje</div>
    <div style="padding:14px;background:#f8fafc;border-radius:10px;color:#1e293b;white-space:pre-wrap;line-height:1.55">${escapeHtml(
      p.message
    )}</div>
  </div>
</div>
</body></html>`;

  const text =
    `EduSaludCC · Nueva consulta\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nMensaje:\n${p.message}\n\n— Enviado desde el formulario de edusaludcc.com`;

  return { html, text };
}

function userConfirmationEmail(p: ValidatedPayload, ref: string) {
  const html = `<!doctype html><html><body style="margin:0;font-family:Inter,Arial,sans-serif;background:#f1f5f9;padding:24px;color:#0f172a">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:28px;box-shadow:0 1px 2px rgba(15,23,42,.04)">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
    <div style="width:8px;height:8px;border-radius:50%;background:#22a578"></div>
    <span style="font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#475569;font-weight:600">Recibimos tu consulta</span>
  </div>
  <h2 style="margin:0 0 8px;color:#1d4ed8;font-size:22px">Hola ${escapeHtml(p.name.split(/\s+/)[0])}, gracias por escribirnos.</h2>
  <p style="margin:0 0 18px;color:#475569;line-height:1.55">Nuestro equipo de EduSaludCC ya recibió tu consulta sobre <strong style="color:#0f172a">${escapeHtml(
    p.type
  )}</strong>. Te responderemos en menos de 24 horas laborables al correo o WhatsApp que nos dejaste.</p>
  <div style="background:#f0fdf4;border-left:3px solid #22a578;padding:14px 16px;border-radius:8px;color:#14532d;font-size:14px;margin-bottom:18px">
    <strong>Referencia:</strong> ${ref}<br>
    Guárdala por si quieres hacernos seguimiento.
  </div>
  <div style="font-weight:600;color:#0f172a;margin-bottom:6px">Lo que nos enviaste</div>
  <div style="padding:14px;background:#f8fafc;border-radius:10px;color:#1e293b;white-space:pre-wrap;line-height:1.55;font-size:14px">${escapeHtml(
    p.message
  )}</div>
  <p style="margin:22px 0 0;color:#64748b;font-size:13px">¿Urge? Escríbenos por WhatsApp al ${escapeHtml(
    siteConfig.contact.phone
  )} y mencionas tu referencia.</p>
  <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0">
  <p style="margin:0;color:#94a3b8;font-size:12px">EduSaludCC · ${escapeHtml(
    siteConfig.contact.location
  )} · ${escapeHtml(siteConfig.contact.email)}</p>
</div>
</body></html>`;

  const text =
    `Hola ${p.name.split(/\s+/)[0]}, gracias por escribirnos.\n\n` +
    `Recibimos tu consulta sobre "${p.type}". Te responderemos en menos de 24 horas laborables.\n\n` +
    `Referencia: ${ref}\n\n` +
    `Lo que nos enviaste:\n${p.message}\n\n` +
    `¿Urgente? WhatsApp ${siteConfig.contact.phone}\n\n` +
    `— EduSaludCC · ${siteConfig.contact.location}`;

  return { html, text };
}

/* ------------------------------------------------------------------ */
/* Resend send with retry                                             */
/* ------------------------------------------------------------------ */

type SendArgs = {
  resend: Resend;
  from: string;
  to: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  tags: Array<{ name: string; value: string }>;
};

async function sendWithRetry({
  resend,
  from,
  to,
  replyTo,
  subject,
  html,
  text,
  tags,
}: SendArgs): Promise<{ ok: true; id?: string } | { ok: false; error: unknown }> {
  const attempts = 2;
  for (let i = 0; i < attempts; i++) {
    try {
      const { data, error } = await resend.emails.send({
        from,
        to,
        replyTo,
        subject,
        html,
        text,
        tags,
      });
      if (error) {
        if (i < attempts - 1 && isTransient(error)) {
          await sleep(700 * (i + 1));
          continue;
        }
        return { ok: false, error };
      }
      return { ok: true, id: data?.id };
    } catch (err) {
      if (i < attempts - 1 && isTransient(err)) {
        await sleep(700 * (i + 1));
        continue;
      }
      return { ok: false, error: err };
    }
  }
  return { ok: false, error: new Error("send failed after retries") };
}

/* ------------------------------------------------------------------ */
/* Public action                                                      */
/* ------------------------------------------------------------------ */

export async function sendContact(input: ContactPayload): Promise<ContactResult> {
  const ip = getClientIp();
  const reference = newReference();

  // 1) Rate limit per IP (5 submissions / 10 minutes)
  const rl = limit(`contact:${ip}`, { max: 5, windowMs: 10 * 60 * 1000 });
  gc();
  if (!rl.ok) {
    console.warn("[contact] rate-limited", { ip, retryAfterSeconds: rl.retryAfterSeconds });
    return {
      ok: false,
      error: `Demasiadas consultas. Intenta de nuevo en ${Math.ceil(rl.retryAfterSeconds / 60)} min.`,
    };
  }

  // 2) Validation + honeypot
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    if (input.website && input.website.length > 0) {
      // Bot tripped the honeypot — silently pretend success.
      console.info("[contact] honeypot tripped", { ip, reference });
      return { ok: true, reference };
    }
    const first = parsed.error.issues[0]?.message ?? "Datos inválidos.";
    return { ok: false, error: first };
  }

  const data = parsed.data;
  const to = serverEnv.CONTACT_TO_EMAIL ?? siteConfig.contact.email;
  const from = serverEnv.CONTACT_FROM_EMAIL ?? FALLBACK_FROM;
  const apiKey = serverEnv.RESEND_API_KEY;

  // 3) Dev / unconfigured fallback — never silently lose a submission in prod.
  if (!apiKey) {
    if (serverEnv.NODE_ENV === "production") {
      console.error(
        "[contact] CRITICAL · RESEND_API_KEY missing in production",
        { reference, payload: { ...data, ip } }
      );
      return {
        ok: false,
        error:
          "El envío de correo no está configurado. Escríbenos directo por WhatsApp mientras lo resolvemos.",
      };
    }
    console.info("[contact] dev mode · payload not sent", {
      reference,
      payload: { ...data, ip },
    });
    return { ok: true, reference };
  }

  const resend = new Resend(apiKey);

  // 4) Send admin notification (primary path — MUST succeed)
  const adminBody = adminEmail(data, reference, ip);
  const adminSubject = `[EduSaludCC] ${data.type} · ${data.name} · ${reference}`;
  const adminResult = await sendWithRetry({
    resend,
    from,
    to,
    replyTo: data.email || undefined,
    subject: adminSubject,
    html: adminBody.html,
    text: adminBody.text,
    tags: [
      { name: "category", value: "contact_form" },
      { name: "audience", value: "admin" },
      { name: "consultation_type", value: data.type.replace(/[^a-z0-9_-]/gi, "_") },
    ],
  });

  if (!adminResult.ok) {
    console.error("[contact] admin send FAILED", {
      reference,
      ip,
      error: String((adminResult.error as { message?: string })?.message ?? adminResult.error),
    });
    return {
      ok: false,
      error: "No pudimos enviar tu mensaje ahora mismo. Intenta de nuevo o escríbenos por WhatsApp.",
    };
  }

  console.info("[contact] admin sent", {
    reference,
    ip,
    type: data.type,
    resendId: adminResult.id,
  });

  // 5) Best-effort confirmation copy to the submitter (non-blocking).
  //    If this fails, the admin notification already landed — don't bubble it up.
  if (data.email) {
    const userBody = userConfirmationEmail(data, reference);
    const userResult = await sendWithRetry({
      resend,
      from,
      to: data.email,
      subject: `Recibimos tu consulta · EduSaludCC · ${reference}`,
      html: userBody.html,
      text: userBody.text,
      tags: [
        { name: "category", value: "contact_form" },
        { name: "audience", value: "user_confirmation" },
      ],
    });
    if (!userResult.ok) {
      console.warn("[contact] user confirmation failed (non-fatal)", {
        reference,
        error: String((userResult.error as { message?: string })?.message ?? userResult.error),
      });
    } else {
      console.info("[contact] user confirmation sent", {
        reference,
        resendId: userResult.id,
      });
    }
  }

  return { ok: true, reference };
}
