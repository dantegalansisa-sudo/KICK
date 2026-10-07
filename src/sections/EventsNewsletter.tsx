import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n';
import Icon from '../components/Icon';
import { Eyebrow, MagneticButton, Reveal, RevealText } from '../components/motion';
import { gridContainer, gridItem } from '../motion';

export default function EventsNewsletter() {
  const { t } = useLang();
  const e = t.events;
  const n = t.newsletter;
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(email.trim() ? t.common.invalidEmail : t.common.required);
      return;
    }
    setDone(true);
  };

  return (
    <section className="section events">
      <div className="container events__grid">
        <div className="events__col">
          <Eyebrow>{e.eyebrow}</Eyebrow>
          <RevealText text={e.title} className="h2" />
          <Reveal delay={0.1}>
            <p className="lead">{e.intro}</p>
          </Reveal>
          <motion.ul
            className="event-list"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {e.items.map((item) => (
              <motion.li key={item.title} variants={gridItem}>
                <Link to="/get-involved#trips" className="event-row">
                  <span className="event-row__date">
                    <small>{item.month}</small>
                    <strong>{item.day}</strong>
                  </span>
                  <span className="event-row__info">
                    <strong>{item.title}</strong>
                    <span><Icon name="pin" size={14} /> {item.place}</span>
                  </span>
                  <span className="event-row__go" aria-hidden="true"><Icon name="arrow" size={18} /></span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <Reveal className="newsletter" delay={0.15}>
          <span className="newsletter__icon"><Icon name="mail" size={26} /></span>
          <Eyebrow>{n.eyebrow}</Eyebrow>
          <RevealText as="h3" text={n.title} className="h3" />
          <p>{n.intro}</p>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.p
                key="ok"
                className="newsletter__ok"
                role="status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Icon name="check" size={20} strokeWidth={2} /> {n.success}
              </motion.p>
            ) : (
              <motion.form key="form" className="newsletter__form" onSubmit={submit} noValidate exit={{ opacity: 0 }}>
                <label htmlFor="nl-email" className="sr-only">{n.placeholder}</label>
                <div className={`newsletter__field${error ? ' has-error' : ''}`}>
                  <input
                    id="nl-email"
                    type="email"
                    autoComplete="email"
                    placeholder={n.placeholder}
                    value={email}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? 'nl-err' : undefined}
                    onChange={(ev) => {
                      setEmail(ev.target.value);
                      setError('');
                    }}
                  />
                  <MagneticButton type="submit" className="btn btn--primary" strength={0.2} ariaLabel={n.button}>
                    <span className="newsletter__btn-text">{n.button}</span>
                    <Icon name="arrow" size={18} />
                  </MagneticButton>
                </div>
                {error && <span id="nl-err" className="field__error" role="alert">{error}</span>}
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
