import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '../i18n';
import { IMG } from '../data/site';
import Icon from '../components/Icon';
import { Eyebrow, MagneticButton, RevealText } from '../components/motion';
import { EASE } from '../motion';

export default function Hero() {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 900], [1, 1.12]);
  const mediaY = useTransform(scrollY, [0, 900], [0, 140]);
  const contentY = useTransform(scrollY, [0, 700], [0, -70]);
  const contentOpacity = useTransform(scrollY, [0, 550], [1, 0]);

  const alt =
    lang === 'es'
      ? 'Un médico de KICH conversa con una madre y sus hijos frente a sus casas en una comunidad rural'
      : 'A KICH doctor talks with a mother and her children outside their homes in a rural community';

  return (
    <section className="hero" aria-label={t.hero.eyebrow}>
      <motion.div className="hero__media" style={reduce ? undefined : { scale, y: mediaY }}>
        <motion.picture
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: EASE.smooth }}
        >
          <source media="(max-width: 700px)" srcSet={IMG.heroSm} />
          <img src={IMG.hero} alt={alt} width={1716} height={916} />
        </motion.picture>
      </motion.div>
      <div className="hero__overlay" aria-hidden="true" />

      <motion.div className="container hero__content" style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <Eyebrow light>{t.hero.eyebrow}</Eyebrow>
        </motion.div>
        <RevealText as="h1" text={t.hero.title} className="hero__title" immediate delay={0.45} />
        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: EASE.smooth }}
        >
          {t.hero.subtitle}
        </motion.p>
        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9, ease: EASE.smooth }}
        >
          <MagneticButton to="/donate" className="btn btn--accent btn--lg">
            {t.hero.ctaDonate} <Icon name="arrow" size={18} className="btn__arrow" />
          </MagneticButton>
          <MagneticButton to="/get-involved#volunteer" className="btn btn--ghost-light btn--lg">
            {t.hero.ctaVolunteer} <Icon name="arrow" size={18} className="btn__arrow" />
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1, ease: EASE.smooth }}
      >
        <span className="hero__card-label">
          <span className="live-dot" aria-hidden="true" /> {t.hero.card.label}
        </span>
        <strong>{t.hero.card.date}</strong>
        <span className="hero__card-place">
          <Icon name="pin" size={15} /> {t.hero.card.place}
        </span>
        <Link to="/get-involved#trips" className="hero__card-cta">
          {t.hero.card.cta} <Icon name="arrow" size={16} />
        </Link>
      </motion.div>

      <motion.a
        href="#impact"
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span>{t.hero.scroll}</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
