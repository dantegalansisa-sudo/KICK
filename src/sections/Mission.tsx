import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { IMG } from '../data/site';
import Icon from '../components/Icon';
import { Eyebrow, ParallaxImage, Reveal, RevealText } from '../components/motion';
import { EASE } from '../motion';

export default function Mission() {
  const { t } = useLang();
  const m = t.mission;
  return (
    <section className="section mission">
      <div className="container mission__grid">
        <div className="mission__media">
          <ParallaxImage src={IMG.founder} alt={m.imageAlt} className="mission__img" distance={36} />
          <motion.div
            className="mission__sig"
            initial={{ opacity: 0, y: 30, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.9, ease: EASE.smooth }}
          >
            <span className="script">Dr. Reginald Kerolle</span>
            <small>MD, MPH · {m.signatureRole}</small>
          </motion.div>
          <span className="mission__since" aria-hidden="true">
            <small>{m.since}</small>
            <strong>2007</strong>
          </span>
        </div>

        <div className="mission__text">
          <Eyebrow>{m.eyebrow}</Eyebrow>
          <RevealText text={m.title} className="h2" />
          <Reveal delay={0.1}>
            {m.body.map((p) => (
              <p key={p.slice(0, 20)} className="body-lg">{p}</p>
            ))}
          </Reveal>
          <Reveal delay={0.2} className="mission__quote">
            <Icon name="quote" size={28} />
            <blockquote>
              <p>{m.quote}</p>
              <footer>
                <span className="script">R. Kerolle</span>
                <cite>{m.signatureName}</cite>
              </footer>
            </blockquote>
          </Reveal>
          <Reveal delay={0.3}>
            <Link to="/about" className="link-arrow">
              {m.cta} <Icon name="arrow" size={18} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
