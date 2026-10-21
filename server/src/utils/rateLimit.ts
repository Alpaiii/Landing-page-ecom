/**
 * Small in-memory rate limiter for authentication endpoints.
 *
 * Only failed attempts are recorded, so a correct password always goes through.
 * State is per-process, which is enough for the single replica this app runs.
 */

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();
const MAX_ENTRIES = 5000;

function purgeExpired(now: number) {
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}

/** Seconds until the key is allowed again, or 0 when not blocked. */
export function retryAfterSeconds(key: string, max: number): number {
  const entry = store.get(key);
  if (!entry) return 0;

  const now = Date.now();
  if (entry.resetAt <= now) {
    store.delete(key);
    return 0;
  }

  if (entry.count < max) return 0;

  return Math.ceil((entry.resetAt - now) / 1000);
}

/** Record one failed attempt for the key. */
export function recordFailure(key: string, windowMs: number): void {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
  } else {
    entry.count += 1;
  }

  if (store.size > MAX_ENTRIES) purgeExpired(now);
}

/** Clear failures after a successful login. */
export function clearFailures(key: string): void {
  store.delete(key);
}

export function loginKey(email: unknown): string {
  return String(email || '').toLowerCase();
}
