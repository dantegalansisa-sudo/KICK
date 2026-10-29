import { CURRENCY, MAX_AMOUNT, MIN_AMOUNT, PAYPAL_ENV, credentialsConfigured, getAccessToken, json } from '../_lib/paypal.js';

// GET /api/paypal/config → datos públicos para cargar los botones en el navegador.
// Con ?check=1 además verifica que las credenciales autentiquen (sin exponerlas).
export async function GET(request: Request) {
  const check = new URL(request.url).searchParams.get('check') === '1';
  let authOk: boolean | undefined;
  if (check && credentialsConfigured()) {
    try {
      await getAccessToken();
      authOk = true;
    } catch {
      authOk = false;
    }
  }
  return json({
    clientId: process.env.PAYPAL_CLIENT_ID ?? null,
    env: PAYPAL_ENV,
    currency: CURRENCY,
    min: MIN_AMOUNT,
    max: MAX_AMOUNT,
    ready: credentialsConfigured(),
    ...(check ? { authOk } : {}),
  });
}
