import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n';
import Icon from './Icon';

// Botones oficiales de PayPal (PayPal + tarjeta). El Client ID se lee del servidor
// (/api/paypal/config) y las órdenes se crean/capturan en funciones serverless,
// así el Secret nunca llega al navegador.

export interface PaymentResult {
  transactionId: string;
  monthly: boolean;
}

interface Props {
  amount: number;
  monthly: boolean;
  designation: string;
  onSuccess: (r: PaymentResult) => void;
}

interface PayPalConfig {
  clientId: string | null;
  currency: string;
  ready: boolean;
}

type Status = 'loading' | 'ready' | 'unavailable' | 'error' | 'cancelled';

/* eslint-disable @typescript-eslint/no-explicit-any */
const sdkCache = new Map<string, Promise<any>>();

function loadSdk(cfg: PayPalConfig, monthly: boolean, lang: string): Promise<any> {
  const namespace = monthly ? 'paypal_kich_monthly' : 'paypal_kich_once';
  const params = new URLSearchParams({
    'client-id': cfg.clientId!,
    currency: cfg.currency,
    components: 'buttons',
    'enable-funding': 'card',
    locale: lang === 'es' ? 'es_US' : 'en_US',
    ...(monthly ? { vault: 'true', intent: 'subscription' } : { intent: 'capture' }),
  });
  const src = `https://www.paypal.com/sdk/js?${params}`;
  if (!sdkCache.has(src)) {
    sdkCache.set(
      src,
      new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.dataset.namespace = namespace;
        s.onload = () => resolve((window as any)[namespace]);
        s.onerror = () => {
          sdkCache.delete(src);
          reject(new Error('PayPal SDK failed to load'));
        };
        document.head.appendChild(s);
      }),
    );
  }
  return sdkCache.get(src)!;
}

let configPromise: Promise<PayPalConfig> | null = null;
const getConfig = () =>
  (configPromise ??= fetch('/api/paypal/config')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error('config'))))
    .catch((e) => {
      configPromise = null;
      throw e;
    }));

async function post<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data as T;
}

export default function PayPalCheckout({ amount, monthly, designation, onSuccess }: Props) {
  const { t, lang } = useLang();
  const d = t.donatePage;
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>('loading');
  const successRef = useRef(onSuccess);
  successRef.current = onSuccess;

  useEffect(() => {
    let cancelled = false;
    let buttons: any = null;
    setStatus('loading');

    (async () => {
      try {
        const cfg = await getConfig();
        if (!cfg.ready || !cfg.clientId) {
          if (!cancelled) setStatus('unavailable');
          return;
        }
        const pp = await loadSdk(cfg, monthly, lang);
        if (cancelled || !ref.current || !pp) return;
        ref.current.innerHTML = '';

        const common = {
          style: { layout: 'vertical', shape: 'pill', color: 'gold', label: monthly ? 'subscribe' : 'donate', height: 48 },
          onCancel: () => setStatus('cancelled'),
          onError: (err: unknown) => {
            console.error('[paypal]', err);
            setStatus('error');
          },
        };

        buttons = monthly
          ? pp.Buttons({
              ...common,
              createSubscription: async (_: unknown, actions: any) => {
                const { planId } = await post<{ planId: string }>('/api/paypal/create-plan', { amount });
                return actions.subscription.create({ plan_id: planId, custom_id: designation.slice(0, 127) });
              },
              onApprove: async (data: { subscriptionID: string }) => {
                successRef.current({ transactionId: data.subscriptionID, monthly: true });
              },
            })
          : pp.Buttons({
              ...common,
              createOrder: async () => {
                const { id } = await post<{ id: string }>('/api/paypal/create-order', { amount, designation });
                return id;
              },
              onApprove: async (data: { orderID: string }) => {
                const r = await post<{ status: string; transactionId: string }>('/api/paypal/capture-order', {
                  orderId: data.orderID,
                });
                if (r.status !== 'COMPLETED') throw new Error(`Capture status ${r.status}`);
                successRef.current({ transactionId: r.transactionId, monthly: false });
              },
            });

        if (!buttons.isEligible || buttons.isEligible()) {
          await buttons.render(ref.current);
          if (!cancelled) setStatus('ready');
        } else if (!cancelled) {
          setStatus('unavailable');
        }
      } catch (err) {
        console.error('[paypal]', err);
        if (!cancelled) setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
      try {
        buttons?.close?.();
      } catch {
        /* ya cerrado */
      }
    };
  }, [amount, monthly, designation, lang]);

  return (
    <div className="paypal">
      {status === 'loading' && (
        <p className="paypal__state">
          <span className="paypal__spinner" aria-hidden="true" /> {d.loadingPay}
        </p>
      )}
      {status === 'unavailable' && (
        <p className="paypal__state paypal__state--warn">
          <Icon name="mail" size={18} /> {d.notReady}
        </p>
      )}
      {status === 'error' && (
        <p className="paypal__state paypal__state--warn" role="alert">
          <Icon name="shield" size={18} /> {d.payError}
        </p>
      )}
      {status === 'cancelled' && (
        <p className="paypal__state" role="status">
          {d.cancelled}
        </p>
      )}
      <div ref={ref} className="paypal__buttons" />
    </div>
  );
}
