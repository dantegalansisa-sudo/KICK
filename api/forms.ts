import { TO_EMAIL, adminEmail, confirmationEmail, sendEmail } from './_lib/email.js';

// POST /api/forms  { type, lang, data, website }
// Recibe los formularios de la web, avisa a KICH por correo y envía confirmación a la persona.
// Antispam: campo trampa (website), validación estricta y límite de envíos por IP.

type FormType = 'contact' | 'volunteer' | 'request' | 'newsletter';
type Data = Record<string, unknown>;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

// Límite simple en memoria por instancia: 5 envíos cada 10 minutos por IP.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

const str = (v: unknown, max = 200) =>
  String(v ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 160;

class InputError extends Error {}
function need(v: string, field: string) {
  if (!v) throw new InputError(`Missing field: ${field}`);
  return v;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as { type?: FormType; lang?: string; data?: Data; website?: string } | null;
    if (!body || typeof body.data !== 'object' || !body.data) return json({ error: 'Invalid request' }, 400);

    // Campo trampa: los humanos no lo ven; si viene lleno es un bot. Fingimos éxito.
    if (str(body.website)) return json({ ok: true });

    const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
    if (rateLimited(ip)) return json({ error: 'Too many requests' }, 429);

    const lang: 'es' | 'en' = body.lang === 'es' ? 'es' : 'en';
    const d = body.data;
    const email = str(d.email, 160).toLowerCase();
    if (email && !isEmail(email)) throw new InputError('Invalid email');
    const name = str(d.name, 120);

    let kind = '';
    let subject = '';
    let fields: [string, string][] = [];
    let confirm: { heading: string; message: string } | null = null;

    switch (body.type) {
      case 'contact': {
        need(name, 'name');
        need(email, 'email');
        const message = need(str(d.message, 4000), 'message');
        const reason = str(d.reason, 80);
        kind = 'Contacto';
        subject = `Contacto web: ${reason || 'Mensaje'} — ${name}`;
        fields = [['Nombre', name], ['Correo', email], ['Teléfono', str(d.phone, 40)], ['Motivo', reason], ['Mensaje', message]];
        confirm =
          lang === 'es'
            ? { heading: 'Recibimos tu mensaje', message: 'Gracias por escribirnos. Nuestro equipo te responderá en un máximo de 48 horas hábiles.' }
            : { heading: 'We received your message', message: 'Thank you for reaching out. Our team will reply within 48 business hours.' };
        break;
      }
      case 'volunteer': {
        need(name, 'name');
        need(email, 'email');
        kind = 'Voluntariado';
        subject = `Nueva solicitud de voluntariado — ${name}`;
        fields = [
          ['Nombre', name],
          ['Correo', email],
          ['Teléfono / WhatsApp', str(d.phone, 40)],
          ['País', need(str(d.country, 80), 'country')],
          ['Tipo de participación', str(d.type, 80)],
          ['Programa de interés', str(d.trip, 120)],
          ['Duración', str(d.duration, 40)],
          ['Habilidades', str(d.skills, 300)],
          ['Motivación', str(d.message, 3000)],
        ];
        confirm =
          lang === 'es'
            ? { heading: '¡Gracias por tomar la iniciativa!', message: 'Recibimos tu solicitud de voluntariado. Nuestro equipo te escribirá en los próximos días con los siguientes pasos.' }
            : { heading: 'Thank you for taking the initiative!', message: 'We received your volunteer application. Our team will email you in the coming days with next steps.' };
        break;
      }
      case 'request': {
        need(name, 'name');
        const phone = need(str(d.phone, 40), 'phone');
        const community = need(str(d.community, 120), 'community');
        kind = 'Solicitud de apoyo';
        subject = `Solicitud de apoyo: ${community} — ${str(d.need, 60)} (${str(d.urgency, 40)})`;
        fields = [
          ['Nombre', name],
          ['Rol', str(d.role, 80)],
          ['Organización', str(d.organization, 120)],
          ['Comunidad', community],
          ['País', str(d.country, 60)],
          ['Provincia / Departamento', str(d.province, 80)],
          ['Personas a beneficiar', str(d.people, 40)],
          ['Tipo de apoyo', str(d.need, 80)],
          ['Urgencia', str(d.urgency, 60)],
          ['Descripción', str(d.description, 4000)],
          ['Teléfono / WhatsApp', phone],
          ['Correo', email],
        ];
        confirm = email
          ? lang === 'es'
            ? { heading: 'Recibimos tu solicitud', message: `Gracias por tomar la iniciativa por ${community}. Nuestro equipo te contactará por WhatsApp en un máximo de 7 días.` }
            : { heading: 'We received your request', message: `Thank you for taking the initiative for ${community}. Our team will contact you on WhatsApp within 7 days.` }
          : null;
        break;
      }
      case 'newsletter': {
        need(email, 'email');
        kind = 'Newsletter';
        subject = `Nueva suscripción al boletín — ${email}`;
        fields = [['Correo', email], ['Idioma', lang === 'es' ? 'Español' : 'Inglés']];
        confirm =
          lang === 'es'
            ? { heading: '¡Bienvenido a la comunidad KICH!', message: 'Gracias por suscribirte. Una vez al mes te enviaremos historias desde terreno, próximas clínicas y formas de ayudar.' }
            : { heading: 'Welcome to the KICH community!', message: 'Thank you for subscribing. Once a month we’ll send you stories from the field, upcoming clinics and ways to help.' };
        break;
      }
      default:
        return json({ error: 'Unknown form type' }, 400);
    }

    const admin = adminEmail(kind, fields);
    await sendEmail({ to: TO_EMAIL, subject, html: admin.html, text: admin.text, replyTo: email || undefined });

    // La confirmación es un extra: si falla, el formulario igual se considera enviado.
    if (confirm && email) {
      const c = confirmationEmail(lang, name || (lang === 'es' ? 'amigo/a' : 'friend'), confirm.heading, confirm.message);
      await sendEmail({ to: email, subject: `KICH — ${confirm.heading}`, html: c.html, text: c.text, replyTo: TO_EMAIL }).catch((e) =>
        console.error('[forms] confirmation failed', e),
      );
    }

    return json({ ok: true });
  } catch (err) {
    if (err instanceof InputError) return json({ error: err.message }, 400);
    console.error('[forms]', err);
    return json({ error: 'Could not send the form' }, 500);
  }
}
