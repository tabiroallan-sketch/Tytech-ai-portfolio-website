/**
 * Simple in-memory rate limiter.
 *
 * Guards the contact form and demo-chat endpoints against abuse / spam /
 * brute-force. Tracks requests per client IP + route using a sliding window.
 *
 * NOTE: This is per-instance state. For multi-instance deployments (e.g.
 * serverless with more than one function invocation) use a shared store such
 * as Redis/Upstash instead — see `RATE_LIMIT_STORE` guidance in .env sample.
 */

interface Entry {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Entry>();

// Opportunistic cleanup so the map never grows without bound.
const MAX_BUCKETS = 10_000;

export interface RateLimitOptions {
  /** Max acceptable requests within the window. */
  limit: number;
  /** Window duration in seconds. */
  windowSeconds: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

export function rateLimit(request: Request, options: RateLimitOptions): RateLimitResult {
  const ip = getClientIp(request);
  const now = Date.now();
  const key = `${ip}:${new URL(request.url).pathname}`;

  // Lazy cleanup of expired buckets to bound memory.
  if (buckets.size >= MAX_BUCKETS) {
    for (const [k, entry] of buckets) {
      if (entry.resetAt <= now) buckets.delete(k);
    }
  }

  const windowMs = options.windowSeconds * 1000;
  let entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    entry = { count: 1, resetAt: now + windowMs };
    buckets.set(key, entry);
    return { success: true, remaining: options.limit - 1, retryAfterSeconds: 0 };
  }

  entry.count += 1;

  if (entry.count > options.limit) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((entry.resetAt - now) / 1000),
    );
    return { success: false, remaining: 0, retryAfterSeconds };
  }

  return {
    success: true,
    remaining: options.limit - entry.count,
    retryAfterSeconds: 0,
  };
}
