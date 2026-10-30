import { PayPalError, errorResponse, json, paypal } from '../_lib/paypal.js';
import { notifyDonation, type DonorInput } from '../_lib/donations.js';

interface CaptureResult {
  id: string;
  status: string;
  payer?: { email_address?: string; name?: { given_name?: string; surname?: string } };
  purchase_units?: {
    payments?: { captures?: { id: string; status: string; amount: { value: string; currency_code: string } }[] };
  }[];
}

// POST /api/paypal/capture-order  { orderId, donor } → { status, transactionId, amount, currency }
// Al confirmarse el cobro, envía el agradecimiento al donante y el aviso a la institución.
export async function POST(request: Request) {
  try {
    const { orderId, donor } = (await request.json().catch(() => ({}))) as { orderId?: string; donor?: DonorInput };
    if (!orderId || !/^[A-Z0-9]{8,40}$/i.test(orderId)) throw new PayPalError('Invalid order id', 400);

    const result = await paypal<CaptureResult>(`/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      requestId: `capture-${orderId}`,
    });

    const capture = result.purchase_units?.[0]?.payments?.captures?.[0];
    const status = capture?.status ?? result.status;
    const transactionId = capture?.id ?? result.id;

    if (status === 'COMPLETED' && capture) {
      const payerName = [result.payer?.name?.given_name, result.payer?.name?.surname].filter(Boolean).join(' ');
      await notifyDonation(donor, {
        amount: capture.amount.value,
        currency: capture.amount.currency_code,
        monthly: false,
        reference: transactionId,
        payerEmail: result.payer?.email_address,
        payerName: payerName || undefined,
      });
    }

    return json({ status, transactionId, amount: capture?.amount.value, currency: capture?.amount.currency_code });
  } catch (err) {
    return errorResponse(err);
  }
}
