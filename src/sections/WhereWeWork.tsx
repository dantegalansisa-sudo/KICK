import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n';
import Icon from '../components/Icon';
import HispaniolaMap from '../components/HispaniolaMap';
import { Eyebrow, MagneticButton, Reveal, RevealText } from '../components/motion';
import { EASE } from '../motion';

export default function WhereWeWork() {
  const { t } = useLang();
  const w = t.where;
  const [selected, setSelected] = useState('pop');
  const place = w.places.find((p) => p.id === selected) ?? w.places[0];

  return (
    <section className="section where" id="where">
      <div className="container where__grid">
        <div className="where__text">
          <Eyebrow>{w.eyebrow}</Eyebrow>
          <RevealText text={w.title} className="h2" />
          <Reveal delay={0.1}>
            <p className="body-lg">{w.body}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="where__chips" aria-label={w.hint}>
              {w.places.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    className={`where__chip${p.id === selected ? ' is-active' : ''}`}
                    aria-pressed={p.id === selected}
                    onClick={() => setSelected(p.id)}
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticButton to="/request-help" className="btn btn--primary">
              {w.cta} <Icon name="arrow" size={18} className="btn__arrow" />
            </MagneticButton>
          </Reveal>
        </div>

        <div className="where__map">
          <HispaniolaMap selected={selected} onSelect={setSelected} />
          <div className="where__card-slot" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.article
                key={place.id}
                className="where__card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE.smooth }}
              >
                <span className="where__card-type">{place.type}</span>
                <h3>
                  {place.name} <small>{place.country}</small>
                </h3>
                <p>{place.desc}</p>
                <span className="where__card-count">
                  <strong>{place.count}</strong> {w.communities}
                </span>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
