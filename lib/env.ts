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

const serverSchema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_TO_EMAIL: z.string().email().optional(),
  CONTACT_FROM_EMAIL: z.string().min(1).optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

/**
 * Normalise env-var values before validation:
 *   • trim surrounding whitespace (Vercel CLI + PowerShell stdin
 *     piping appends a trailing CRLF that would otherwise break
 *     `z.email()` / `z.url()` validations);
 *   • collapse the empty string to `undefined` so `.optional()`
 *     behaves the same whether a var is missing or blank.
 */
function normalise(
  source: Record<string, string | undefined>
): Record<string, string | undefined> {
  const out: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(source)) {
    if (typeof value !== "string") {
      out[key] = value;
      continue;
    }
    const trimmed = value.trim();
    out[key] = trimmed.length === 0 ? undefined : trimmed;
  }
  return out;
}

function parse<T extends z.ZodTypeAny>(
  schema: T,
  source: Record<string, string | undefined>
): z.infer<T> {
  const parsed = schema.safeParse(normalise(source));
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
