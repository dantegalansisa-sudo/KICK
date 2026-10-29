import { CURRENCY, errorResponse, json, parseAmount, paypal } from '../_lib/paypal.js';

// POST /api/paypal/create-plan  { amount } → { planId }
// Donación mensual: busca (o crea) el producto "KICH Monthly Donation" y un plan
// mensual para ese monto exacto. Reutiliza planes existentes para no duplicarlos.

const PRODUCT_NAME = 'KICH Monthly Donation';

interface Product {
  id: string;
  name: string;
}
interface Plan {
  id: string;
  name: string;
  status: string;
}

async function findOrCreateProduct(): Promise<string> {
  const list = await paypal<{ products?: Product[] }>('/v1/catalogs/products?page_size=20&total_required=false');
  const existing = list.products?.find((p) => p.name === PRODUCT_NAME);
  if (existing) return existing.id;
  const created = await paypal<Product>('/v1/catalogs/products', {
    method: 'POST',
    requestId: 'kich-monthly-donation-product',
    body: {
      name: PRODUCT_NAME,
      description: 'Recurring monthly donation to the Kerolle Initiative for Community Health',
      type: 'SERVICE',
      category: 'CHARITY',
    },
  });
  return created.id;
}

async function findPlan(productId: string, name: string): Promise<string | null> {
  for (let page = 1; page <= 5; page++) {
    const res = await paypal<{ plans?: Plan[]; total_pages?: number }>(
      `/v1/billing/plans?product_id=${productId}&page_size=20&page=${page}&total_required=true`,
    );
    const hit = res.plans?.find((p) => p.name === name && p.status === 'ACTIVE');
    if (hit) return hit.id;
    if (!res.total_pages || page >= res.total_pages) break;
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as { amount?: unknown };
    const value = parseAmount(body.amount);
    const productId = await findOrCreateProduct();
    const name = `KICH Monthly ${CURRENCY} ${value}`;

    const existing = await findPlan(productId, name);
    if (existing) return json({ planId: existing });

    const plan = await paypal<Plan>('/v1/billing/plans', {
      method: 'POST',
      requestId: `kich-plan-${value}`,
      body: {
        product_id: productId,
        name,
        description: `Monthly donation of ${value} ${CURRENCY} to KICH`,
        status: 'ACTIVE',
        billing_cycles: [
          {
            frequency: { interval_unit: 'MONTH', interval_count: 1 },
            tenure_type: 'REGULAR',
            sequence: 1,
            total_cycles: 0,
            pricing_scheme: { fixed_price: { value, currency_code: CURRENCY } },
          },
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
          setup_fee_failure_action: 'CONTINUE',
          payment_failure_threshold: 2,
        },
      },
    });

    return json({ planId: plan.id });
  } catch (err) {
    return errorResponse(err);
  }
}
