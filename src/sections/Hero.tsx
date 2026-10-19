import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '../i18n';
import { HERO_SLIDES } from '../data/site';
import Icon from '../components/Icon';
import Flag from '../components/Flag';
import HeroCarousel from '../components/HeroCarousel';
import { MagneticButton, RevealText } from '../components/motion';
import { EASE } from '../motion';

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollY } = useScroll();
  const copyY = useTransform(scrollY, [0, 700], [0, -60]);
  const stageY = useTransform(scrollY, [0, 700], [0, 50]);
  const fade = useTransform(scrollY, [0, 600], [1, 0.2]);

  return (
    <section className="hero" aria-label={`${h.countries.dr} ${h.countries.joiner} ${h.countries.ht}`}>
      {/* Fondo ambiental: la foto activa, desenfocada, tiñe todo el hero */}
      <div className="hero__ambient" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.img
            key={active}
            src={HERO_SLIDES[active]}
            alt=""
            initial={{ opacity: 0, scale: 1.25 }}
            animate={{ opacity: 1, scale: 1.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: EASE.smooth }}
          />
        </AnimatePresence>
      </div>
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__lines" aria-hidden="true" />

      <div className="container hero__grid">
        <motion.div className="hero__copy" style={reduce ? undefined : { y: copyY, opacity: fade }}>
          <motion.span
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="live-dot" aria-hidden="true" /> {h.eyebrow}
          </motion.span>

          <RevealText as="h1" text={h.title} className="hero__title" immediate delay={0.35} />

          <motion.div
            className="hero__countries"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9, ease: EASE.smooth }}
          >
            <span className="hero__country">
              <Flag country="dr" size={30} />
              {h.countries.dr}
            </span>
            <span className="hero__joiner" aria-hidden="true">
              <span />
              {h.countries.joiner}
              <span />
            </span>
            <span className="hero__country">
              <Flag country="ht" size={30} />
              {h.countries.ht}
            </span>
          </motion.div>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: EASE.smooth }}
          >
            {h.subtitle}
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.9, ease: EASE.smooth }}
          >
            <MagneticButton to="/donate" className="btn btn--accent btn--lg">
              <Icon name="heart" size={18} /> {h.ctaDonate}
            </MagneticButton>
            <MagneticButton to="/get-involved#volunteer" className="btn btn--ghost-light btn--lg">
              {h.ctaVolunteer} <Icon name="arrow" size={18} className="btn__arrow" />
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <Link to="/get-involved#trips" className="hero__next">
              <Icon name="calendar" size={16} />
              <span>
                {h.card.label} · <strong>{h.card.date}</strong>
              </span>
              <Icon name="arrow" size={15} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__stage"
          style={reduce ? undefined : { y: stageY }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: EASE.smooth }}
        >
          <HeroCarousel onChange={setActive} />
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            transition={{ delay: 1.6, type: 'spring', stiffness: 140, damping: 14 }}
          >
            <strong>{h.badge.value}</strong>
            <span>{h.badge.label}</span>
            <em className="script">Take the initiative</em>
          </motion.div>
        </motion.div>
      </div>

      <a href="#impact" className="hero__scroll">
        <span>{h.scroll}</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
