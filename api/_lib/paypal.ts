// Utilidades de PayPal para las funciones serverless de Vercel.
// Las credenciales viven solo en variables de entorno del servidor:
//   PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_ENV ('live' | 'sandbox', por defecto 'live').

export const PAYPAL_ENV = (process.env.PAYPAL_ENV || 'live').toLowerCase() === 'sandbox' ? 'sandbox' : 'live';

const API_BASE = PAYPAL_ENV === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

export const MIN_AMOUNT = 1;
export const MAX_AMOUNT = 10000;
export const CURRENCY = 'USD';

export class PayPalError extends Error {
  constructor(message: string, public status = 500, public details?: unknown) {
    super(message);
  }
}

export function credentialsConfigured() {
  return Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
}

export async function getAccessToken(): Promise<string> {
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!id || !secret) throw new PayPalError('PayPal credentials are not configured', 503);

  const res = await fetch(`${API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) {
    throw new PayPalError('Could not authenticate with PayPal', 502, await safeJson(res));
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function paypal<T = unknown>(path: string, init: { method?: string; body?: unknown; requestId?: string } = {}) {
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}${path}`, {
    method: init.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...(init.requestId ? { 'PayPal-Request-Id': init.requestId } : {}),
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
  });
  const data = await safeJson(res);
  if (!res.ok) throw new PayPalError(`PayPal request failed: ${path}`, res.status, data);
  return data as T;
}

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export function parseAmount(value: unknown): string {
  const n = Number(value);
  if (!Number.isFinite(n) || n < MIN_AMOUNT || n > MAX_AMOUNT) {
    throw new PayPalError(`Amount must be between ${MIN_AMOUNT} and ${MAX_AMOUNT} ${CURRENCY}`, 400);
  }
  return (Math.round(n * 100) / 100).toFixed(2);
}

export function cleanText(value: unknown, max = 120) {
  return String(value ?? '')
    .replace(/[^\p{L}\p{N}\s.,&'()\-/]/gu, '')
    .trim()
    .slice(0, max);
}

export function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

export function errorResponse(err: unknown) {
  if (err instanceof PayPalError) {
    console.error('[paypal]', err.message, JSON.stringify(err.details ?? {}));
    return json({ error: err.message }, err.status >= 400 && err.status < 600 ? err.status : 500);
  }
  console.error('[paypal] unexpected', err);
  return json({ error: 'Unexpected error' }, 500);
}
