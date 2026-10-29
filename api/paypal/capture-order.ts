import { PayPalError, errorResponse, json, paypal } from '../_lib/paypal.js';

interface CaptureResult {
  id: string;
  status: string;
  purchase_units?: {
    payments?: { captures?: { id: string; status: string; amount: { value: string; currency_code: string } }[] };
  }[];
}

// POST /api/paypal/capture-order  { orderId } → { status, transactionId, amount, currency }
export async function POST(request: Request) {
  try {
    const { orderId } = (await request.json().catch(() => ({}))) as { orderId?: string };
    if (!orderId || !/^[A-Z0-9]{8,40}$/i.test(orderId)) throw new PayPalError('Invalid order id', 400);

    const result = await paypal<CaptureResult>(`/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      requestId: `capture-${orderId}`,
    });

    const capture = result.purchase_units?.[0]?.payments?.captures?.[0];
    return json({
      status: capture?.status ?? result.status,
      transactionId: capture?.id ?? result.id,
      amount: capture?.amount.value,
      currency: capture?.amount.currency_code,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
