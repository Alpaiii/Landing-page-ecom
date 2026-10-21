import type { Request } from 'express';

export const ADMIN_COOKIE = 'admin_token';
export const ADMIN_COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

/** Read a cookie without pulling in cookie-parser. */
export function getCookie(req: Request, name: string): string | undefined {
  const header = req.headers.cookie;
  if (!header) return undefined;

  for (const part of header.split(';')) {
    const index = part.indexOf('=');
    if (index === -1) continue;
    if (part.slice(0, index).trim() === name) {
      return decodeURIComponent(part.slice(index + 1).trim());
    }
  }

  return undefined;
}

/** Prefer the httpOnly cookie, fall back to a Bearer token for API clients. */
export function getAdminToken(req: Request): string | undefined {
  return getCookie(req, ADMIN_COOKIE) || req.headers.authorization?.replace('Bearer ', '');
}
