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
