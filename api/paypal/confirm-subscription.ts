import { PayPalError, errorResponse, json, paypal } from '../_lib/paypal.js';
import { notifyDonation, type DonorInput } from '../_lib/donations.js';

interface Subscription {
  id: string;
  status: string;
  plan_id: string;
  subscriber?: { email_address?: string; name?: { given_name?: string; surname?: string } };
}
interface Plan {
  billing_cycles?: { pricing_scheme?: { fixed_price?: { value: string; currency_code: string } } }[];
}

// POST /api/paypal/confirm-subscription  { subscriptionId, donor } → { ok, status }
// Verifica con PayPal que la suscripción mensual quedó activa y envía los correos.
export async function POST(request: Request) {
  try {
    const { subscriptionId, donor } = (await request.json().catch(() => ({}))) as { subscriptionId?: string; donor?: DonorInput };
    if (!subscriptionId || !/^I-[A-Z0-9]{6,40}$/i.test(subscriptionId)) throw new PayPalError('Invalid subscription id', 400);

    const sub = await paypal<Subscription>(`/v1/billing/subscriptions/${subscriptionId}`);
    if (!['ACTIVE', 'APPROVED'].includes(sub.status)) return json({ ok: false, status: sub.status });

    const plan = await paypal<Plan>(`/v1/billing/plans/${sub.plan_id}`);
    const price = plan.billing_cycles?.[0]?.pricing_scheme?.fixed_price;
    if (!price) throw new PayPalError('Plan price not found', 502);

    const payerName = [sub.subscriber?.name?.given_name, sub.subscriber?.name?.surname].filter(Boolean).join(' ');
    await notifyDonation(donor, {
      amount: price.value,
      currency: price.currency_code,
      monthly: true,
      reference: sub.id,
      payerEmail: sub.subscriber?.email_address,
      payerName: payerName || undefined,
    });

    return json({ ok: true, status: sub.status });
  } catch (err) {
    return errorResponse(err);
  }
}
