import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n';
import { GALLERY, SITE } from '../data/site';
import Icon from '../components/Icon';
import { Eyebrow, Reveal, RevealText } from '../components/motion';
import { EASE, gridContainer, gridItem } from '../motion';

export default function Gallery() {
  const { t } = useLang();
  const g = t.gallery;
  const [open, setOpen] = useState<number | null>(null);

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
              <button type="button" onClick={() => setOpen(i)} aria-label={`${g.open}: ${g.alts[i]}`}>
                <motion.img layoutId={`gallery-${i}`} src={src} alt={g.alts[i]} loading="lazy" decoding="async" />
                <span className="mosaic__hover" aria-hidden="true"><Icon name="plus" size={26} /></span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <Lightbox index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </section>
  );
}

interface LightboxProps {
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}

function Lightbox({ index, onClose, onNavigate }: LightboxProps) {
  const { t } = useLang();
  const g = t.gallery;
  const n = GALLERY.length;
  const closeRef = useRef<HTMLButtonElement>(null);
  const [dir, setDir] = useState(1);

  const step = useCallback(
    (d: number) => {
      if (index === null) return;
      setDir(d);
      onNavigate((index + d + n) % n);
    },
    [index, n, onNavigate],
  );

  useEffect(() => {
    if (index === null) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prevFocus?.focus();
    };
  }, [index, onClose, step]);

  return createPortal(
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={g.alts[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <button ref={closeRef} type="button" className="lightbox__close" onClick={onClose} aria-label={g.close}>
            <Icon name="close" size={24} />
          </button>

          <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
              <motion.img
                key={index}
                layoutId={`gallery-${index}`}
                src={GALLERY[index]}
                alt={g.alts[index]}
                initial={{ opacity: 0, x: 60 * dir }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 * dir }}
                transition={{ duration: 0.45, ease: EASE.smooth }}
                drag="x"
                dragSnapToOrigin
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) step(1);
                  else if (info.offset.x > 60) step(-1);
                }}
              />
            </AnimatePresence>
            <figcaption>
              <span>{g.alts[index]}</span>
              <span className="lightbox__count">
                {index + 1} / {n}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label={g.prev}
          >
            <Icon name="arrowLeft" size={22} />
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label={g.next}
          >
            <Icon name="arrow" size={22} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
