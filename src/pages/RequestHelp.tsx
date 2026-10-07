import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { usePageMeta } from '../hooks/usePageMeta';
import { whatsappLink } from '../data/site';
import Icon from '../components/Icon';
import PageHeader from '../components/PageHeader';
import { Chips, Field, FormSuccess, Select, fieldA11y, useForm } from '../components/forms';
import { MagneticButton, Reveal } from '../components/motion';
import { gridContainer, gridItem } from '../motion';

export default function RequestHelp() {
  usePageMeta('request');
  const { t } = useLang();
  const r = t.requestPage;
  const f = r.form;
  const [done, setDone] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState('');
  const form = useForm({
    name: '', role: '', organization: '', community: '', country: '', province: '',
    people: '', need: '', urgency: '', description: '', phone: '', email: '',
  });
  const { values, errors, bind } = form;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const ok = form.validate(['name', 'role', 'community', 'country', 'need', 'urgency', 'phone'], ['email']);
    setConsentError(consent ? '' : t.common.required);
    if (!ok || !consent) return;
    setDone(true);
    window.scrollTo({ top: (document.getElementById('request-form')?.offsetTop ?? 0) - 100, behavior: 'smooth' });
  };

  return (
    <>
      <PageHeader eyebrow={r.eyebrow} title={r.title} intro={r.intro} />

      <section className="how">
        <div className="container">
          <h2 className="method__title">{r.howTitle}</h2>
          <motion.ol
            className="method__steps"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {r.how.map((h, i) => (
              <motion.li key={h.title} variants={gridItem}>
                <span className="method__num">{i + 1}</span>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <section className="section request" id="request-form">
        <div className="container request__grid">
          <Reveal className="form-card form-card--wide">
            {done ? (
              <FormSuccess
                title={f.successTitle}
                text={f.successText}
                resetLabel={t.common.sendAnother}
                onReset={() => {
                  form.reset();
                  setConsent(false);
                  setDone(false);
                }}
              />
            ) : (
              <form onSubmit={submit} noValidate>
                <h2 className="h3 form-card__title">{f.title}</h2>

                <fieldset className="form-section">
                  <legend><span>01</span> {f.sectionOrg}</legend>
                  <div className="form-grid">
                    <Field id="name" label={f.name} error={errors.name}>
                      <input type="text" autoComplete="name" {...fieldA11y('name', errors.name)} {...bind('name')} />
                    </Field>
                    <Field id="role" label={f.role} error={errors.role}>
                      <Select options={f.roles} placeholder="—" {...fieldA11y('role', errors.role)} {...bind('role')} />
                    </Field>
                    <Field id="organization" label={f.organization} optional className="span-2">
                      <input type="text" autoComplete="organization" {...fieldA11y('organization')} {...bind('organization')} />
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="form-section">
                  <legend><span>02</span> {f.sectionCommunity}</legend>
                  <div className="form-grid">
                    <Field id="community" label={f.community} error={errors.community} className="span-2">
                      <input type="text" {...fieldA11y('community', errors.community)} {...bind('community')} />
                    </Field>
                    <Chips
                      name="country"
                      legend={f.country}
                      options={f.countries}
                      value={values.country}
                      onChange={(v) => form.setValue('country', v as string)}
                      error={errors.country}
                    />
                    <Field id="province" label={f.province} optional>
                      <input type="text" autoComplete="address-level1" {...fieldA11y('province')} {...bind('province')} />
                    </Field>
                    <Field id="people" label={f.people} optional className="span-2">
                      <Select options={f.peopleOptions} placeholder="—" {...fieldA11y('people')} {...bind('people')} />
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="form-section">
                  <legend><span>03</span> {f.sectionNeed}</legend>
                  <div className="form-grid">
                    <Chips
                      name="need"
                      legend={f.needType}
                      options={f.needs}
                      value={values.need}
                      onChange={(v) => form.setValue('need', v as string)}
                      error={errors.need}
                    />
                    <Chips
                      name="urgency"
                      legend={f.urgency}
                      options={f.urgencies}
                      value={values.urgency}
                      onChange={(v) => form.setValue('urgency', v as string)}
                      error={errors.urgency}
                    />
                    <Field id="description" label={f.description} optional className="span-2">
                      <textarea rows={4} placeholder={f.descriptionPh} {...fieldA11y('description')} {...bind('description')} />
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="form-section">
                  <legend><span>04</span> {f.sectionContact}</legend>
                  <div className="form-grid">
                    <Field id="phone" label={f.phone} error={errors.phone}>
                      <input type="tel" autoComplete="tel" {...fieldA11y('phone', errors.phone)} {...bind('phone')} />
                    </Field>
                    <Field id="email" label={f.email} error={errors.email} optional>
                      <input type="email" autoComplete="email" {...fieldA11y('email', errors.email)} {...bind('email')} />
                    </Field>
                  </div>
                  <label className={`check${consentError ? ' field--error' : ''}`}>
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        setConsentError('');
                      }}
                    />
                    <span className="check__box" aria-hidden="true"><Icon name="check" size={14} strokeWidth={2.4} /></span>
                    {f.consent}
                  </label>
                  {consentError && <span className="field__error" role="alert">{consentError}</span>}
                </fieldset>

                <div className="form-card__nav">
                  <p className="form-note">{t.common.demo}</p>
                  <MagneticButton type="submit" className="btn btn--primary btn--lg" strength={0.2}>
                    {f.submit} <Icon name="arrow" size={18} className="btn__arrow" />
                  </MagneticButton>
                </div>
              </form>
            )}
          </Reveal>

          <aside className="request__aside">
            <Reveal className="info-card info-card--warn">
              <Icon name="shield" size={26} />
              <h3>{r.asideTitle}</h3>
              <p>{r.asideText}</p>
              <MagneticButton href={whatsappLink(t.whatsapp.message)} className="btn btn--whatsapp">
                <Icon name="whatsapp" size={20} /> WhatsApp
              </MagneticButton>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
