import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { usePageMeta } from '../hooks/usePageMeta';
import { SITE, whatsappLink } from '../data/site';
import Icon from '../components/Icon';
import PageHeader from '../components/PageHeader';
import HispaniolaMap from '../components/HispaniolaMap';
import { Field, FormSuccess, Honeypot, Select, SendError, fieldA11y, useForm, useSubmit } from '../components/forms';
import { MagneticButton, Reveal } from '../components/motion';

export default function Contact() {
  usePageMeta('contact');
  const { t } = useLang();
  const c = t.contactPage;
  const f = c.form;
  const [done, setDone] = useState(false);
  const form = useForm({ name: '', email: '', phone: '', reason: f.reasons[0], message: '' });
  const { errors, bind } = form;
  const sub = useSubmit('contact');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const el = e.currentTarget;
    if (!form.validate(['name', 'email', 'message'], ['email'])) return;
    if (await sub.send(form.values, el)) setDone(true);
  };

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

      <section className="section contact">
        <div className="container contact__grid">
          <Reveal className="form-card">
            {done ? (
              <FormSuccess
                title={f.successTitle}
                text={f.successText}
                resetLabel={t.common.back}
                onReset={() => {
                  form.reset();
                  setDone(false);
                }}
              />
            ) : (
              <form onSubmit={submit} noValidate>
                <Honeypot />
                <h2 className="h3 form-card__title">{f.title}</h2>
                <div className="form-grid">
                  <Field id="name" label={f.name} error={errors.name}>
                    <input type="text" autoComplete="name" {...fieldA11y('name', errors.name)} {...bind('name')} />
                  </Field>
                  <Field id="email" label={f.email} error={errors.email}>
                    <input type="email" autoComplete="email" {...fieldA11y('email', errors.email)} {...bind('email')} />
                  </Field>
                  <Field id="phone" label={f.phone} optional>
                    <input type="tel" autoComplete="tel" {...fieldA11y('phone')} {...bind('phone')} />
                  </Field>
                  <Field id="reason" label={f.reason}>
                    <Select options={f.reasons} {...fieldA11y('reason')} {...bind('reason')} />
                  </Field>
                  <Field id="message" label={f.message} error={errors.message} className="span-2">
                    <textarea rows={6} {...fieldA11y('message', errors.message)} {...bind('message')} />
                  </Field>
                </div>
                <div className="form-card__nav">
                  <p className="form-note">{t.common.demo}</p>
                  <MagneticButton type="submit" className="btn btn--primary btn--lg" strength={0.2} disabled={sub.sending}>
                    {sub.sending ? t.common.sending : f.submit} <Icon name="arrow" size={18} className="btn__arrow" />
                  </MagneticButton>
                </div>
                <SendError message={sub.error} />
              </form>
            )}
          </Reveal>

          <div className="contact__side">
            <Reveal className="contact-wa">
              <Icon name="whatsapp" size={34} />
              <div>
                <small>{c.whatsappLabel}</small>
                <strong>{SITE.whatsappDisplay}</strong>
              </div>
              <a href={whatsappLink(t.whatsapp.message)} target="_blank" rel="noopener noreferrer" className="btn btn--light btn--sm">
                {c.whatsappCta} <Icon name="arrow" size={16} />
              </a>
            </Reveal>

            <Reveal className="info-card" delay={0.1}>
              <ul className="channels">
                <li>
                  <Icon name="users" size={18} />
                  <div>
                    <small>{c.personLabel}</small>
                    <strong className="channels__person">{c.personName}</strong>
                    <span>
                      {c.personRole} ·{' '}
                      <a href={SITE.orcid} target="_blank" rel="noopener noreferrer">ORCID {SITE.orcidId}</a>
                    </span>
                  </div>
                </li>
                {c.channels.map((ch) => (
                  <li key={ch.value}>
                    <Icon name="mail" size={18} />
                    <div>
                      <small>{ch.label}</small>
                      <a href={`mailto:${ch.value}`}>{ch.value}</a>
                    </div>
                  </li>
                ))}
                <li>
                  <Icon name="pin" size={18} />
                  <div>
                    <small>{c.locationLabel}</small>
                    <span className="pre">{c.location}</span>
                  </div>
                </li>
                <li>
                  <Icon name="clock" size={18} />
                  <div>
                    <small>{c.hoursLabel}</small>
                    <span>{c.hours}</span>
                  </div>
                </li>
              </ul>
            </Reveal>

            <Reveal className="contact__map" delay={0.15}>
              <HispaniolaMap selected="pop" compact />
            </Reveal>

            <Link to="/request-help" className="link-arrow">
              {c.requestCta} <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
