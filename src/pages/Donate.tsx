import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n';
import { usePageMeta } from '../hooks/usePageMeta';
import { IMG, PROGRAM_META, SITE } from '../data/site';
import Icon from '../components/Icon';
import PayPalCheckout, { type PaymentResult } from '../components/PayPalCheckout';
import PageHeader from '../components/PageHeader';
import { Field, FormSuccess, Select, fieldA11y, useForm } from '../components/forms';
import { Eyebrow, MagneticButton, ParallaxImage, Reveal, RevealText } from '../components/motion';
import { gridContainer, gridItem } from '../motion';

const AMOUNTS = [25, 50, 100, 250] as const;
type AmountKey = '25' | '50' | '100' | '250';

export default function Donate() {
  usePageMeta('donate');
  const { t } = useLang();
  const d = t.donatePage;
  const [params] = useSearchParams();
  const preset = Number(params.get('amount'));

  const [monthly, setMonthly] = useState(false);
  const [amount, setAmount] = useState<number | 'custom'>(AMOUNTS.includes(preset as never) ? preset : 50);
  const [custom, setCustom] = useState('');
  const [amountError, setAmountError] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [news, setNews] = useState(true);
  const [step, setStep] = useState<'form' | 'pay' | 'done'>('form');
  const [result, setResult] = useState<PaymentResult | null>(null);
  const form = useForm({ dedicate: d.dedicate[0], firstName: '', lastName: '', email: '', country: '' });
  const { values, errors, bind } = form;

  const finalAmount = amount === 'custom' ? Number(custom) || 0 : amount;
  const impactText = amount === 'custom' ? d.amountImpacts.custom : d.amountImpacts[String(amount) as AmountKey];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const amountOk = finalAmount >= 1;
    setAmountError(amountOk ? '' : t.common.required);
    const ok = form.validate(['firstName', 'lastName', 'email'], ['email']);
    if (!ok || !amountOk) return;
    setStep('pay');
    document.querySelector('.donate__card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onPaid = (r: PaymentResult) => {
    setResult(r);
    setStep('done');
    document.querySelector('.donate__card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <PageHeader eyebrow={d.eyebrow} title={d.title} intro={d.intro} />

      <section className="section donate">
        <div className="container donate__grid">
          <Reveal className="form-card donate__card">
            {step === 'done' ? (
              <FormSuccess
                title={d.successTitle}
                text={`${result?.monthly ? d.successMonthly : d.successText} US$${finalAmount}${result?.monthly ? d.perMonth : ''} · ${d.transaction}: ${result?.transactionId ?? ''}`}
              />
            ) : step === 'pay' ? (
              <div className="pay-step">
                <h2 className="h3">{d.payTitle}</h2>
                <p className="pay-step__intro">{d.payIntro}</p>
                <dl className="pay-summary">
                  <div>
                    <dt>{d.summaryAmount}</dt>
                    <dd>
                      US${finalAmount}
                      {monthly ? d.perMonth : ''}
                    </dd>
                  </div>
                  <div>
                    <dt>{d.summaryType}</dt>
                    <dd>{monthly ? d.monthly : d.once}</dd>
                  </div>
                  <div>
                    <dt>{d.summaryDedicate}</dt>
                    <dd>{values.dedicate}</dd>
                  </div>
                </dl>
                <PayPalCheckout amount={finalAmount} monthly={monthly} designation={values.dedicate} onSuccess={onPaid} />
                <button type="button" className="btn btn--text pay-step__back" onClick={() => setStep('form')}>
                  <Icon name="arrowLeft" size={18} /> {d.edit}
                </button>
                <p className="donate__secure">
                  <Icon name="shield" size={16} /> {d.demoNote}
                </p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="toggle" role="radiogroup" aria-label={`${d.once} / ${d.monthly}`}>
                  {[false, true].map((m) => (
                    <button
                      key={String(m)}
                      type="button"
                      role="radio"
                      aria-checked={monthly === m}
                      className={monthly === m ? 'is-active' : ''}
                      onClick={() => setMonthly(m)}
                    >
                      {monthly === m && (
                        <motion.span layoutId="toggle-pill" className="toggle__pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                      )}
                      <span className="toggle__label">{m ? d.monthly : d.once}</span>
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {monthly && (
                    <motion.p
                      className="donate__monthly-note"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Icon name="calendar" size={16} /> {d.monthlyNote}
                    </motion.p>
                  )}
                </AnimatePresence>

                <fieldset className="amounts">
                  <legend>{d.amountLabel}</legend>
                  <div className="amounts__grid">
                    {AMOUNTS.map((a) => (
                      <button
                        key={a}
                        type="button"
                        className={`amount${amount === a ? ' is-active' : ''}`}
                        aria-pressed={amount === a}
                        onClick={() => {
                          setAmount(a);
                          setAmountError('');
                        }}
                      >
                        <sup>$</sup>
                        {a}
                        {monthly && <small>{d.perMonth}</small>}
                      </button>
                    ))}
                    <div className={`amount amount--custom${amount === 'custom' ? ' is-active' : ''}`}>
                      <label htmlFor="f-custom" className="sr-only">{d.other}</label>
                      <span aria-hidden="true">$</span>
                      <input
                        id="f-custom"
                        type="number"
                        min={1}
                        inputMode="numeric"
                        placeholder={d.other}
                        value={custom}
                        onFocus={() => setAmount('custom')}
                        onChange={(e) => {
                          setCustom(e.target.value);
                          setAmount('custom');
                          setAmountError('');
                        }}
                      />
                    </div>
                  </div>
                  {amountError && <span className="field__error" role="alert">{amountError}</span>}
                </fieldset>

                <div className="donate__impact" aria-live="polite">
                  <span className="icon-badge"><Icon name="heart" size={20} /></span>
                  <div>
                    <small>{d.impactFor}</small>
                    <AnimatePresence mode="wait">
                      <motion.strong
                        key={impactText}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                      >
                        {impactText}
                      </motion.strong>
                    </AnimatePresence>
                  </div>
                </div>

                <Field id="dedicate" label={d.dedicateLabel}>
                  <Select options={d.dedicate} {...fieldA11y('dedicate')} {...bind('dedicate')} />
                </Field>

                <h3 className="mini-title donate__details">{d.detailsTitle}</h3>
                <div className="form-grid">
                  <Field id="firstName" label={d.firstName} error={errors.firstName}>
                    <input type="text" autoComplete="given-name" {...fieldA11y('firstName', errors.firstName)} {...bind('firstName')} />
                  </Field>
                  <Field id="lastName" label={d.lastName} error={errors.lastName}>
                    <input type="text" autoComplete="family-name" {...fieldA11y('lastName', errors.lastName)} {...bind('lastName')} />
                  </Field>
                  <Field id="email" label={d.email} error={errors.email}>
                    <input type="email" autoComplete="email" {...fieldA11y('email', errors.email)} {...bind('email')} />
                  </Field>
                  <Field id="country" label={d.country} optional>
                    <input type="text" autoComplete="country-name" {...fieldA11y('country')} {...bind('country')} />
                  </Field>
                </div>

                <div className="checks">
                  <label className="check">
                    <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
                    <span className="check__box" aria-hidden="true"><Icon name="check" size={14} strokeWidth={2.4} /></span>
                    {d.anonymous}
                  </label>
                  <label className="check">
                    <input type="checkbox" checked={news} onChange={(e) => setNews(e.target.checked)} />
                    <span className="check__box" aria-hidden="true"><Icon name="check" size={14} strokeWidth={2.4} /></span>
                    {d.newsletter}
                  </label>
                </div>

                <MagneticButton type="submit" className="btn btn--accent btn--lg btn--block" strength={0.15}>
                  <Icon name="heart" size={18} /> {d.submit} · US${finalAmount || '—'}
                  {monthly ? d.perMonth : ''}
                </MagneticButton>
                <p className="donate__secure">
                  <Icon name="shield" size={16} /> {d.secure}
                </p>
                <p className="form-note">{d.demoNote}</p>
              </form>
            )}
          </Reveal>

          <div className="donate__side">
            <ParallaxImage src={IMG.donate} alt={t.programs.items[3].imageAlt} className="donate__img" distance={24} />
            <Reveal className="donate__where">
              <h3 className="mini-title">{d.supportsTitle}</h3>
              <ul className="supports">
                {t.programs.items.map((p) => (
                  <li key={p.id}>
                    <span className="supports__icon"><Icon name={PROGRAM_META[p.id].icon} size={18} /></span>
                    {p.title}
                  </li>
                ))}
              </ul>
              <p className="supports__note">
                <Icon name="clipboard" size={16} /> {d.financeNote}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--cream other-ways">
        <div className="container">
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <RevealText text={d.otherTitle} className="h2" />
          <motion.ul
            className="other-ways__grid"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {d.other_ways.map((w, i) => (
              <motion.li key={w.title} variants={gridItem} className="way-card">
                <span className="icon-badge"><Icon name={(['sprout', 'stethoscope', 'handshake', 'globe'] as const)[i]} size={22} /></span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <a href={`mailto:${SITE.emails.institution}?subject=${encodeURIComponent(w.title)}`} className="link-arrow link-arrow--sm">
                  {d.otherCta} <Icon name="arrow" size={16} />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </>
  );
}
