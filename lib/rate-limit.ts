/**
 * Minimal in-process rate limiter.
 *
 * Suitable for low-traffic single-region Vercel deployments: every
 * lambda instance keeps its own Map. For high-traffic or globally
 * distributed setups, swap this for Upstash Ratelimit (also free
 * tier) — the call site (`limit(key, options)`) stays identical.
 *
 * Algorithm: fixed window counter. Cheap and good enough for form
 * spam mitigation (we just need to break trivially-scripted floods).
 */

type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function limit(
  key: string,
  options: { max: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + options.windowMs });
    return { ok: true, remaining: options.max - 1, retryAfterSeconds: 0 };
  }

  if (existing.count >= options.max) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return {
    ok: true,
    remaining: options.max - existing.count,
    retryAfterSeconds: 0,
  };
}

/** Lightweight housekeeping — drop stale buckets when the map grows. */
export function gc() {
  if (store.size < 256) return;
  const now = Date.now();
  for (const [k, v] of store) {
    if (v.resetAt <= now) store.delete(k);
  }
}
