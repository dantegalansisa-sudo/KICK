import { TO_EMAIL, adminEmail, donationThankYouEmail, sendEmail } from './email.js';

// Datos que el donante escribió en el formulario de la web (no se usan para el monto).
export interface DonorInput {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  country?: unknown;
  designation?: unknown;
  anonymous?: unknown;
  newsletter?: unknown;
  lang?: unknown;
}

const str = (v: unknown, max = 120) =>
  String(v ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

interface Confirmed {
  amount: string; // monto confirmado por PayPal
  currency: string;
  monthly: boolean;
  reference: string; // ID de captura o de suscripción
  payerEmail?: string;
  payerName?: string;
}

// Envía el agradecimiento al donante y el aviso a la institución.
// Nunca lanza error: el pago ya está hecho y no debe "fallar" por un correo.
export async function notifyDonation(input: DonorInput | undefined, c: Confirmed) {
  const d = input ?? {};
  const lang: 'es' | 'en' = d.lang === 'es' ? 'es' : 'en';
  const formName = `${str(d.firstName, 60)} ${str(d.lastName, 60)}`.trim();
  const name = formName || c.payerName || (lang === 'es' ? 'amigo/a' : 'friend');
  const formEmail = str(d.email, 160).toLowerCase();
  const donorEmail = isEmail(formEmail) ? formEmail : c.payerEmail && isEmail(c.payerEmail) ? c.payerEmail : '';
  const designation = str(d.designation, 80) || (lang === 'es' ? 'Donde más se necesite' : 'Where it’s needed most');
  const anonymous = d.anonymous === true;

  const tasks: Promise<unknown>[] = [];

  if (donorEmail) {
    const ty = donationThankYouEmail({
      lang,
      name: formName ? str(d.firstName, 60) || name : name,
      amount: c.amount,
      currency: c.currency,
      monthly: c.monthly,
      designation,
      reference: c.reference,
    });
    tasks.push(sendEmail({ to: donorEmail, subject: ty.subject, html: ty.html, text: ty.text, replyTo: TO_EMAIL }));
  }

  const amountLabel = `US$${c.amount}${c.monthly ? ' / mes' : ''}`;
  const admin = adminEmail(
    c.monthly ? 'Donación mensual' : 'Donación',
    [
      ['Monto (confirmado por PayPal)', amountLabel],
      ['Tipo', c.monthly ? 'Mensual (suscripción)' : 'Una vez'],
      ['Destino', designation],
      ['Nombre', name],
      ['Correo (formulario)', formEmail],
      ['Correo de PayPal', c.payerEmail ?? ''],
      ['País', str(d.country, 80)],
      ['Donación anónima', anonymous ? 'Sí — no publicar su nombre' : 'No'],
      ['Quiere recibir noticias', d.newsletter === true ? 'Sí' : 'No'],
      [c.monthly ? 'ID de suscripción' : 'N.º de transacción', c.reference],
    ],
    'El pago ya fue confirmado por PayPal. Responde a este correo para escribirle directamente al donante.',
  );
  tasks.push(
    sendEmail({
      to: TO_EMAIL,
      subject: `Nueva donación${c.monthly ? ' mensual' : ''}: ${amountLabel} — ${anonymous ? 'Anónimo' : name}`,
      html: admin.html,
      text: admin.text,
      replyTo: donorEmail || undefined,
    }),
  );

  const results = await Promise.allSettled(tasks);
  results.forEach((r) => r.status === 'rejected' && console.error('[donation-email]', r.reason));
}
