import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { SITE } from '../data/site';
import { GALLERY_PHOTOS, HOME_GALLERY_IDS, photoSrc, photoThumb } from '../data/gallery';
import Icon from '../components/Icon';
import Lightbox from '../components/Lightbox';
import { Eyebrow, MagneticButton, Reveal, RevealText } from '../components/motion';
import { gridContainer, gridItem } from '../motion';

// Vista previa de la galería en el Home: 6 fotos + enlace a la galería completa.
export default function Gallery() {
  const { t } = useLang();
  const g = t.gallery;
  const gp = t.galleryPage;
  const [open, setOpen] = useState<number | null>(null);

  const photos = HOME_GALLERY_IDS.map((id) => GALLERY_PHOTOS.find((p) => p.id === id)!);
  const items = photos.map((p) => ({
    src: photoSrc(p.id),
    thumb: photoThumb(p.id),
    alt: gp.captions[p.id as keyof typeof gp.captions],
    tag: gp.filters[p.cat],
  }));

  return (
    <section className="section gallery">
      <div className="container gallery__grid">
        <div className="gallery__head">
          <Eyebrow>{g.eyebrow}</Eyebrow>
          <RevealText text={g.title} className="h2" />
          <Reveal delay={0.15} className="gallery__actions">
            <MagneticButton to="/gallery" className="btn btn--primary">
              {g.viewAll} <Icon name="arrow" size={18} className="btn__arrow" />
            </MagneticButton>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="ig-link">
              <Icon name="instagram" size={20} />
              <span>
                {g.follow}
                <small>{SITE.instagramHandle}</small>
              </span>
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
          {items.map((it, i) => (
            <motion.li key={it.src} className={`mosaic__item mosaic__item--${i + 1}`} variants={gridItem}>
              <button type="button" onClick={() => setOpen(i)} aria-label={`${g.open}: ${it.alt}`}>
                <img src={it.thumb} alt={it.alt} loading="lazy" decoding="async" />
                <span className="mosaic__hover" aria-hidden="true"><Icon name="plus" size={26} /></span>
              </button>
            </motion.li>
          ))}
          <motion.li className="mosaic__more" variants={gridItem}>
            <Link to="/gallery">
              <strong>{GALLERY_PHOTOS.length}</strong>
              <span>{gp.photos}</span>
              <Icon name="arrow" size={18} />
            </Link>
          </motion.li>
        </motion.ul>
      </div>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </section>
  );
}
