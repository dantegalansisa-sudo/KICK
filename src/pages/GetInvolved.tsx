import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n';
import { usePageMeta } from '../hooks/usePageMeta';
import { IMG, INVOLVED_ICONS } from '../data/site';
import Icon from '../components/Icon';
import PageHeader from '../components/PageHeader';
import Accordion from '../components/Accordion';
import { Chips, Field, FormSuccess, Select, fieldA11y, useForm } from '../components/forms';
import { Eyebrow, MagneticButton, ParallaxImage, Reveal, RevealText } from '../components/motion';
import { EASE, gridContainer, gridItem } from '../motion';

export default function GetInvolved() {
  usePageMeta('involved');
  const { t } = useLang();
  const g = t.involvedPage;

  return (
    <>
      <PageHeader eyebrow={g.eyebrow} title={g.title} intro={g.intro} />

      {/* Formas de participar */}
      <section className="ways">
        <div className="container">
          <motion.ul
            className="ways__grid"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {t.involved.items.map((item) => (
              <motion.li key={item.id} variants={gridItem}>
                <a href={`#${item.id}`} className="way">
                  <Icon name={INVOLVED_ICONS[item.id]} size={24} />
                  <span>{item.title}</span>
                  <Icon name="arrow" size={16} className="way__go" />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <Trip />
      <VolunteerForm />

      {/* FAQ */}
      <section className="section faq">
        <div className="container faq__grid">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <RevealText text={g.faqTitle} className="h2" />
          </div>
          <Reveal delay={0.1}>
            <Accordion items={g.faq} />
          </Reveal>
        </div>
      </section>

      {/* Alianzas */}
      <section className="section section--cream partner" id="partner">
        <div className="container">
          <div className="partner__head">
            <div>
              <Eyebrow>{g.partner.eyebrow}</Eyebrow>
              <RevealText text={g.partner.title} className="h2" />
            </div>
            <Reveal delay={0.1}>
              <p className="lead">{g.partner.text}</p>
              <MagneticButton to="/contact" className="btn btn--primary">
                {g.partner.cta} <Icon name="arrow" size={18} className="btn__arrow" />
              </MagneticButton>
            </Reveal>
          </div>
          <motion.ul
            className="partner__types"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {g.partner.types.map((pt, i) => (
              <motion.li key={pt.title} variants={gridItem}>
                <span className="partner__num">0{i + 1}</span>
                <h3>{pt.title}</h3>
                <p>{pt.text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Recaudar */}
      <section className="section fundraise" id="fundraise">
        <div className="container">
          <Reveal className="fundraise__card">
            <span className="icon-badge icon-badge--lg"><Icon name="heart" size={26} /></span>
            <div>
              <h2 className="h3">{g.fundraise.title}</h2>
              <p>{g.fundraise.text}</p>
            </div>
            <MagneticButton to="/contact" className="btn btn--accent">
              {g.fundraise.cta} <Icon name="arrow" size={18} className="btn__arrow" />
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Trip() {
  const { t } = useLang();
  const trip = t.involvedPage.trip;
  return (
    <section className="section trip" id="trips">
      <div className="container">
        <div className="trip__top">
          <div>
            <Eyebrow>{trip.eyebrow}</Eyebrow>
            <RevealText text={trip.title} className="h2" />
            <Reveal delay={0.1}>
              <p className="body-lg">{trip.intro}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <dl className="facts">
                {trip.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <ParallaxImage src={IMG.trip} alt={t.gallery.alts[0]} className="trip__img" distance={30} />
        </div>

        <div className="trip__bottom">
          <div>
            <h3 className="mini-title">{trip.itineraryTitle}</h3>
            <motion.ol
              className="itinerary"
              variants={gridContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {trip.itinerary.map((d) => (
                <motion.li key={d.day} variants={gridItem}>
                  <span className="itinerary__day">{d.day}</span>
                  <div>
                    <strong>{d.title}</strong>
                    <p>{d.text}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
          <div className="trip__lists">
            <Reveal className="info-card">
              <h3 className="mini-title">{trip.includesTitle}</h3>
              <ul className="checklist">
                {trip.includes.map((x) => (
                  <li key={x}><Icon name="check" size={18} strokeWidth={2} /> {x}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="info-card info-card--outline" delay={0.1}>
              <h3 className="mini-title">{trip.reqTitle}</h3>
              <ul className="checklist checklist--muted">
                {trip.requirements.map((x) => (
                  <li key={x}><Icon name="shield" size={18} /> {x}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function VolunteerForm() {
  const { t } = useLang();
  const f = t.involvedPage.form;
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [done, setDone] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const form = useForm({ type: '', trip: '', duration: '', name: '', email: '', phone: '', country: '', message: '' });
  const { values, errors, bind } = form;

  const next = () => {
    const ok = step === 0 ? form.validate(['type']) : step === 1 ? form.validate(['trip', 'duration']) : true;
    if (!ok) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, 2));
  };
  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (step < 2) return next();
    if (!form.validate(['name', 'email', 'country'], ['email'])) return;
    setDone(true);
  };
  const restart = () => {
    form.reset();
    setSkills([]);
    setStep(0);
    setDone(false);
  };

  return (
    <section className="section section--mint volunteer" id="volunteer">
      <div className="container volunteer__grid">
        <div className="volunteer__intro">
          <Eyebrow>{f.eyebrow}</Eyebrow>
          <RevealText text={f.title} className="h2" />
          <Reveal delay={0.1}>
            <p className="lead">{f.intro}</p>
            <ol className="stepper" aria-label={`${t.common.step} ${step + 1} ${t.common.of} 3`}>
              {f.steps.map((s, i) => (
                <li key={s} className={i === step ? 'is-current' : i < step || done ? 'is-done' : ''}>
                  <span>{i < step || done ? <Icon name="check" size={14} strokeWidth={2.4} /> : i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal className="form-card" delay={0.15}>
          {done ? (
            <FormSuccess title={f.successTitle} text={f.successText} onReset={restart} resetLabel={t.common.sendAnother} />
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="form-card__progress" aria-hidden="true">
                <motion.span animate={{ width: `${((step + 1) / 3) * 100}%` }} transition={{ duration: 0.6, ease: EASE.smooth }} />
              </div>
              <p className="form-card__step">
                {t.common.step} {step + 1} {t.common.of} 3 · <strong>{f.steps[step]}</strong>
              </p>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={step}
                  custom={dir}
                  initial={{ opacity: 0, x: 40 * dir }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 * dir }}
                  transition={{ duration: 0.4, ease: EASE.smooth }}
                  className="form-grid"
                >
                  {step === 0 && (
                    <Chips
                      name="type"
                      legend={f.typeLabel}
                      options={f.types}
                      value={values.type}
                      onChange={(v) => form.setValue('type', v as string)}
                      error={errors.type}
                    />
                  )}
                  {step === 1 && (
                    <>
                      <Field id="trip" label={f.tripLabel} error={errors.trip} className="span-2">
                        <Select options={f.trips} placeholder="—" {...fieldA11y('trip', errors.trip)} {...bind('trip')} />
                      </Field>
                      <Chips
                        name="duration"
                        legend={f.durationLabel}
                        options={f.durations}
                        value={values.duration}
                        onChange={(v) => form.setValue('duration', v as string)}
                        error={errors.duration}
                      />
                      <Chips
                        name="skills"
                        legend={f.skillsLabel}
                        options={f.skills}
                        value={skills}
                        multiple
                        onChange={(v) => setSkills(v as string[])}
                      />
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <Field id="name" label={f.name} error={errors.name}>
                        <input type="text" autoComplete="name" {...fieldA11y('name', errors.name)} {...bind('name')} />
                      </Field>
                      <Field id="email" label={f.email} error={errors.email}>
                        <input type="email" autoComplete="email" {...fieldA11y('email', errors.email)} {...bind('email')} />
                      </Field>
                      <Field id="phone" label={f.phone} optional>
                        <input type="tel" autoComplete="tel" {...fieldA11y('phone')} {...bind('phone')} />
                      </Field>
                      <Field id="country" label={f.country} error={errors.country}>
                        <input type="text" autoComplete="country-name" {...fieldA11y('country', errors.country)} {...bind('country')} />
                      </Field>
                      <Field id="message" label={f.message} optional className="span-2">
                        <textarea rows={4} {...fieldA11y('message')} {...bind('message')} />
                      </Field>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="form-card__nav">
                {step > 0 ? (
                  <button type="button" className="btn btn--text" onClick={back}>
                    <Icon name="arrowLeft" size={18} /> {t.common.back}
                  </button>
                ) : (
                  <span />
                )}
                <MagneticButton type="submit" className="btn btn--primary" strength={0.2}>
                  {step < 2 ? t.common.next : f.submit} <Icon name="arrow" size={18} className="btn__arrow" />
                </MagneticButton>
              </div>
              <p className="form-note">{t.common.demo}</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
