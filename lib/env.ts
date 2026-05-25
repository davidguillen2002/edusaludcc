import { z } from "zod";

/**
 * Runtime-validated environment surface.
 *
 * Booting the app with a malformed `.env` should fail loudly with an
 * actionable message — not silently break the contact form at 11 PM
 * on a Friday. This module is the single source of truth for every
 * env var the application touches.
 *
 * Public vars (NEXT_PUBLIC_*) are inlined at build time and safe to
 * expose. Server-only vars must NEVER be imported into a client
 * component — TypeScript can't enforce that, code review must.
 */

/**
 * Helper: trim surrounding whitespace before further validation, and
 * collapse the empty string to `undefined` so `.optional()` works as
 * expected even when an env var is set to "" or "\n".
 *
 * Some platforms (notably the Vercel CLI receiving stdin from PowerShell)
 * append a trailing CRLF to env values; without trimming, `z.email()`
 * rejects perfectly valid addresses for the wrong reason.
 */
const trimmed = () =>
  z.preprocess((v) => {
    if (typeof v !== "string") return v;
    const t = v.trim();
    return t.length === 0 ? undefined : t;
  }, z.string());

const serverSchema = z.object({
  RESEND_API_KEY: trimmed().min(1).optional(),
  CONTACT_TO_EMAIL: trimmed().email().optional(),
  CONTACT_FROM_EMAIL: trimmed().min(1).optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: trimmed().url().optional(),
});

function parse<T extends z.ZodTypeAny>(schema: T, source: Record<string, string | undefined>) {
  const parsed = schema.safeParse(source);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid environment variables:\n${issues}`);
  }
  return parsed.data as z.infer<T>;
}

/** Server-only env. Importing this from a client module is a bug. */
export const serverEnv = parse(serverSchema, {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  NODE_ENV: process.env.NODE_ENV,
});

/** Safe to read from anywhere — inlined at build. */
export const clientEnv = parse(clientSchema, {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
