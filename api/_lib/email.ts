// Envío de correos con Resend (https://resend.com).
// Variables de entorno:
//   RESEND_API_KEY   (obligatoria, secreta)
//   FORMS_TO_EMAIL   bandeja que recibe los formularios
//   FORMS_FROM_EMAIL remitente verificado en Resend

export const TO_EMAIL = process.env.FORMS_TO_EMAIL || 'kerolle.initiative.health@gmail.com';
export const FROM_EMAIL = process.env.FORMS_FROM_EMAIL || 'KICH <no-reply@kichorganisation.org>';
const SITE = 'https://www.kichorganisation.org';

export interface EmailMessage {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export async function sendEmail(msg: EmailMessage) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not configured');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: Array.isArray(msg.to) ? msg.to : [msg.to],
      subject: msg.subject,
      html: msg.html,
      text: msg.text,
      ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
    }),
  });
  const data = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
  if (!res.ok) throw new Error(`Resend error ${res.status}: ${data.message ?? 'unknown'}`);
  return data.id;
}

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

// ---------- Plantillas ----------

const shell = (title: string, body: string, preheader = '') => `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:#f7f3ea;font-family:Arial,Helvetica,sans-serif;color:#18231d;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f3ea;padding:32px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fffdf8;border-radius:20px;overflow:hidden;">
<tr><td style="background:#0e2f21;padding:28px 32px;" align="left">
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="padding-right:14px;"><img src="${SITE}/logo-512.png" width="52" height="52" alt="KICH" style="display:block;border-radius:50%;background:#fff;"></td>
<td><div style="font-family:Georgia,serif;font-size:24px;color:#ffffff;line-height:1;">KICH</div>
<div style="font-size:10px;letter-spacing:2px;color:#a9eaa9;margin-top:6px;">KEROLLE INITIATIVE FOR COMMUNITY HEALTH</div></td>
</tr></table>
</td></tr>
<tr><td style="padding:32px;">${body}</td></tr>
<tr><td style="padding:22px 32px;background:#e3f4e1;font-size:12px;color:#3f4b44;">
<span style="font-family:Georgia,serif;font-style:italic;font-size:15px;color:#155a3a;">Take the initiative</span><br>
Calle Principal #15, Villa Emmanuel, Sosúa, República Dominicana · WhatsApp +1 (829) 702-1591<br>
<a href="${SITE}" style="color:#155a3a;">kichorganisation.org</a>
</td></tr>
</table>
</td></tr></table>
</body></html>`;

export function adminEmail(kind: string, fields: [string, string][], note?: string) {
  const rows = fields
    .filter(([, v]) => v)
    .map(
      ([k, v]) => `<tr>
<td style="padding:10px 12px;border-bottom:1px solid #eee5d6;font-size:12px;color:#6a756e;text-transform:uppercase;letter-spacing:1px;width:38%;vertical-align:top;">${escapeHtml(k)}</td>
<td style="padding:10px 12px;border-bottom:1px solid #eee5d6;font-size:15px;color:#18231d;white-space:pre-line;">${escapeHtml(v)}</td></tr>`,
    )
    .join('');
  const body = `<div style="display:inline-block;background:#c4552d;color:#fff;font-size:11px;letter-spacing:2px;padding:6px 12px;border-radius:999px;">${escapeHtml(kind.toUpperCase())}</div>
<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:26px;color:#0e2f21;margin:18px 0 6px;">Nuevo formulario desde la web</h1>
<p style="font-size:14px;color:#3f4b44;margin:0 0 20px;">${escapeHtml(note ?? 'Responde a este correo para contestarle directamente a la persona.')}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee5d6;border-radius:12px;">${rows}</table>`;
  const text = `${kind}\n\n${fields.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n')}`;
  return { html: shell(`KICH — ${kind}`, body, kind), text };
}

export function confirmationEmail(lang: 'es' | 'en', name: string, heading: string, message: string) {
  const hi = lang === 'es' ? `Hola ${name},` : `Hi ${name},`;
  const sign = lang === 'es' ? 'Con gratitud,' : 'With gratitude,';
  const cta = lang === 'es' ? 'Visitar la web' : 'Visit our website';
  const body = `<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:28px;color:#0e2f21;margin:0 0 18px;">${escapeHtml(heading)}</h1>
<p style="font-size:16px;line-height:1.6;margin:0 0 14px;">${escapeHtml(hi)}</p>
<p style="font-size:16px;line-height:1.6;margin:0 0 24px;color:#3f4b44;">${escapeHtml(message)}</p>
<a href="${SITE}" style="display:inline-block;background:#155a3a;color:#fff;text-decoration:none;padding:13px 24px;border-radius:999px;font-size:15px;">${cta}</a>
<p style="font-size:15px;line-height:1.6;margin:28px 0 0;color:#3f4b44;">${sign}<br><strong style="color:#0e2f21;">Dr. Reginald Kerolle</strong><br>KICH</p>`;
  return { html: shell(heading, body, message), text: `${hi}\n\n${message}\n\n${sign}\nDr. Reginald Kerolle — KICH\n${SITE}` };
}

// ---------- Donaciones ----------

export interface DonationInfo {
  lang: 'es' | 'en';
  name: string;
  amount: string;
  currency: string;
  monthly: boolean;
  designation: string;
  reference: string;
}

export function donationThankYouEmail(d: DonationInfo) {
  const es = d.lang === 'es';
  const amount = `US$${d.amount}${d.monthly ? (es ? ' al mes' : ' per month') : ''}`;
  const heading = es ? '¡Gracias por tu donación!' : 'Thank you for your donation!';
  const hi = es ? `Hola ${d.name},` : `Hi ${d.name},`;
  const p1 = es
    ? `En nombre de todo el equipo de la Iniciativa Kerolle para la Salud Comunitaria, gracias de corazón. Tu aporte de ${amount} se convierte en consultas gratuitas, prevención y educación en salud para familias de bateyes y comunidades rurales del norte de República Dominicana y Haití.`
    : `On behalf of the entire Kerolle Initiative for Community Health team, thank you from the bottom of our hearts. Your gift of ${amount} becomes free check-ups, prevention and health education for families in bateyes and rural communities across northern Dominican Republic and Haiti.`;
  const p2 = d.monthly
    ? es
      ? 'Al ser una donación mensual, nos permites planificar clínicas con meses de anticipación. Puedes modificarla o cancelarla cuando quieras desde tu cuenta de PayPal.'
      : 'Because your gift is monthly, you help us plan clinics months in advance. You can change or cancel it anytime from your PayPal account.'
    : es
      ? 'Cuando ves a alguien que necesita ayuda y actúas, estás tomando la iniciativa. Hoy lo hiciste tú.'
      : 'When you see someone in need and act, you are taking the initiative. Today, you did.';
  const labels = es
    ? { amount: 'Monto', type: 'Tipo', dest: 'Destino', ref: 'N.º de transacción', once: 'Una vez', monthly: 'Mensual' }
    : { amount: 'Amount', type: 'Type', dest: 'Directed to', ref: 'Transaction ID', once: 'One-time', monthly: 'Monthly' };
  const note = es
    ? 'PayPal te envía por separado el recibo oficial del pago. Guarda este correo como constancia de tu donación.'
    : 'PayPal sends you the official payment receipt separately. Keep this email as a record of your donation.';
  const sign = es ? 'Con gratitud,' : 'With gratitude,';
  const role = es ? 'Fundador y Director Ejecutivo' : 'Founder & Executive Director';
  const row = (k: string, v: string) =>
    `<tr><td style="padding:10px 14px;border-bottom:1px solid #eee5d6;font-size:12px;color:#6a756e;text-transform:uppercase;letter-spacing:1px;">${escapeHtml(k)}</td><td style="padding:10px 14px;border-bottom:1px solid #eee5d6;font-size:15px;color:#0e2f21;" align="right">${escapeHtml(v)}</td></tr>`;

  const body = `<div style="text-align:center;margin-bottom:22px;"><div style="display:inline-block;width:64px;height:64px;line-height:64px;border-radius:50%;background:#e3f4e1;color:#c4552d;font-size:30px;">&#10084;</div></div>
<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:30px;color:#0e2f21;margin:0 0 18px;text-align:center;">${escapeHtml(heading)}</h1>
<p style="font-size:16px;line-height:1.6;margin:0 0 14px;">${escapeHtml(hi)}</p>
<p style="font-size:16px;line-height:1.6;margin:0 0 14px;color:#3f4b44;">${escapeHtml(p1)}</p>
<p style="font-size:16px;line-height:1.6;margin:0 0 24px;color:#3f4b44;">${escapeHtml(p2)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee5d6;border-radius:12px;background:#f7f3ea;margin-bottom:18px;">
${row(labels.amount, amount)}${row(labels.type, d.monthly ? labels.monthly : labels.once)}${row(labels.dest, d.designation)}${row(labels.ref, d.reference)}
</table>
<p style="font-size:13px;line-height:1.5;color:#6a756e;margin:0 0 26px;">${escapeHtml(note)}</p>
<p style="font-size:15px;line-height:1.6;margin:0;color:#3f4b44;">${sign}<br><strong style="color:#0e2f21;">Dr. Reginald Kerolle</strong><br>${role} · KICH</p>`;

  const text = `${hi}\n\n${p1}\n\n${p2}\n\n${labels.amount}: ${amount}\n${labels.type}: ${d.monthly ? labels.monthly : labels.once}\n${labels.dest}: ${d.designation}\n${labels.ref}: ${d.reference}\n\n${note}\n\n${sign}\nDr. Reginald Kerolle — KICH`;
  return { subject: `KICH — ${heading}`, html: shell(heading, body, p1), text };
}
