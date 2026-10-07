import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { GALLERY, SITE } from '../data/site';
import Icon from '../components/Icon';
import { Eyebrow, Reveal, RevealText } from '../components/motion';
import { gridContainer, gridItem } from '../motion';

export default function Gallery() {
  const { t } = useLang();
  const g = t.gallery;
  return (
    <section className="section gallery">
      <div className="container gallery__grid">
        <div className="gallery__head">
          <Eyebrow>{g.eyebrow}</Eyebrow>
          <RevealText text={g.title} className="h2" />
          <Reveal delay={0.15}>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="ig-link">
              <Icon name="instagram" size={20} />
              <span>
                {g.follow}
                <small>{SITE.instagramHandle}</small>
              </span>
              <Icon name="arrow" size={18} />
            </a>
          </Reveal>
        </div>
        <motion.ul
          className="mosaic"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {GALLERY.map((src, i) => (
            <motion.li key={src} className={`mosaic__item mosaic__item--${i + 1}`} variants={gridItem}>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${g.alts[i]} — Instagram`}>
                <img src={src} alt={g.alts[i]} loading="lazy" decoding="async" />
                <span className="mosaic__hover" aria-hidden="true"><Icon name="instagram" size={26} /></span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
