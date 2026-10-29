import { CURRENCY, cleanText, errorResponse, json, parseAmount, paypal } from '../_lib/paypal.js';

// POST /api/paypal/create-order  { amount, designation } → { id }
// Crea una orden de donación única. El monto se valida en el servidor.
export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as { amount?: unknown; designation?: unknown };
    const value = parseAmount(body.amount);
    const designation = cleanText(body.designation, 80) || 'General';

    const order = await paypal<{ id: string }>('/v2/checkout/orders', {
      method: 'POST',
      requestId: crypto.randomUUID(),
      body: {
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: 'KICH_DONATION',
            description: `Donation to KICH — ${designation}`.slice(0, 127),
            custom_id: designation.slice(0, 127),
            soft_descriptor: 'KICH DONATION',
            amount: { currency_code: CURRENCY, value },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              brand_name: 'KICH - Kerolle Initiative',
              shipping_preference: 'NO_SHIPPING',
              user_action: 'PAY_NOW',
            },
          },
        },
      },
    });

    return json({ id: order.id });
  } catch (err) {
    return errorResponse(err);
  }
}
