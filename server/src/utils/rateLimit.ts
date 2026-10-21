/**
 * Persistent login rate limiter.
 *
 * Attempts live in Postgres so they survive deploys and are shared by every
 * replica. Only failed attempts are recorded, so a correct password always
 * goes through.
 */
import pool from '../config/database.js';

/** Seconds until the key is allowed again, or 0 when not blocked. */
export async function retryAfterSeconds(key: string, max: number): Promise<number> {
  const result = await pool.query(
    'SELECT count, reset_at FROM login_attempts WHERE key = $1',
    [key]
  );

  const entry = result.rows[0];
  if (!entry) return 0;

  const now = Date.now();
  const resetAt = new Date(entry.reset_at).getTime();

  if (resetAt <= now) {
    await pool.query('DELETE FROM login_attempts WHERE key = $1', [key]);
    return 0;
  }

  if (entry.count < max) return 0;

  return Math.ceil((resetAt - now) / 1000);
}

/** Record one failed attempt for the key. */
export async function recordFailure(key: string, windowMs: number): Promise<void> {
  await pool.query(
    `INSERT INTO login_attempts (key, count, reset_at)
     VALUES ($1, 1, NOW() + ($2 * INTERVAL '1 millisecond'))
     ON CONFLICT (key) DO UPDATE SET
       count = CASE WHEN login_attempts.reset_at <= NOW() THEN 1 ELSE login_attempts.count + 1 END,
       reset_at = CASE WHEN login_attempts.reset_at <= NOW() THEN EXCLUDED.reset_at ELSE login_attempts.reset_at END`,
    [key, windowMs]
  );

  // Keep the table from growing forever.
  await pool.query("DELETE FROM login_attempts WHERE reset_at <= NOW() - INTERVAL '1 day'");
}

/** Clear failures after a successful login. */
export async function clearFailures(key: string): Promise<void> {
  await pool.query('DELETE FROM login_attempts WHERE key = $1', [key]);
}

export function loginKey(email: unknown): string {
  return String(email || '').toLowerCase();
}
