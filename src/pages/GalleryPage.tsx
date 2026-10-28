import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useLang } from '../i18n';
import { usePageMeta } from '../hooks/usePageMeta';
import { GALLERY_CATEGORIES, GALLERY_PHOTOS, photoSrc, photoThumb, type GalleryCategory } from '../data/gallery';
import Icon from '../components/Icon';
import PageHeader from '../components/PageHeader';
import Lightbox from '../components/Lightbox';
import { MagneticButton, Reveal, RevealText } from '../components/motion';
import { EASE } from '../motion';

type Filter = 'all' | GalleryCategory;

function useColumnCount() {
  const get = () => (window.innerWidth >= 1200 ? 4 : window.innerWidth >= 860 ? 3 : 2);
  const [cols, setCols] = useState(get);
  useEffect(() => {
    const onResize = () => setCols(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return cols;
}

export default function GalleryPage() {
  usePageMeta('gallery');
  const { t } = useLang();
  const gp = t.galleryPage;
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<number | null>(null);
  const cols = useColumnCount();
  const sectionRef = useRef<HTMLElement>(null);

  // Al filtrar, volver al inicio de la cuadrícula si el usuario ya bajó.
  const applyFilter = (f: Filter) => {
    setFilter(f);
    const top = (sectionRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
    if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
  };

  const photos = useMemo(
    () => (filter === 'all' ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter((p) => p.cat === filter)),
    [filter],
  );

  const items = photos.map((p) => ({
    src: photoSrc(p.id),
    thumb: photoThumb(p.id),
    alt: gp.captions[p.id as keyof typeof gp.captions],
    tag: gp.filters[p.cat],
  }));

  // Masonry: cada foto va a la columna más baja, respetando su proporción real.
  const columns = useMemo(() => {
    const out: { photo: (typeof photos)[number]; index: number }[][] = Array.from({ length: cols }, () => []);
    const heights = new Array(cols).fill(0);
    photos.forEach((photo, index) => {
      const c = heights.indexOf(Math.min(...heights));
      out[c].push({ photo, index });
      heights[c] += photo.h / photo.w;
    });
    return out;
  }, [photos, cols]);

  const count = (f: Filter) => (f === 'all' ? GALLERY_PHOTOS.length : GALLERY_PHOTOS.filter((p) => p.cat === f).length);

  return (
    <>
      <PageHeader eyebrow={gp.eyebrow} title={gp.title} intro={gp.intro}>
        <p className="gallery-stats">
          <strong>{GALLERY_PHOTOS.length}</strong> {gp.photos} · <strong>{GALLERY_CATEGORIES.length}</strong> {gp.themes}
        </p>
      </PageHeader>

      <section className="gallery-page" ref={sectionRef}>
        <div className="gallery-filters">
          <div className="container">
            <div className="filters filters--gallery" role="tablist" aria-label={gp.filtersLabel}>
              <LayoutGroup id="gallery-filters">
                {(['all', ...GALLERY_CATEGORIES] as Filter[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    role="tab"
                    aria-selected={filter === f}
                    className={`filter${filter === f ? ' is-active' : ''}`}
                    onClick={() => applyFilter(f)}
                  >
                    {filter === f && (
                      <motion.span layoutId="gallery-pill" className="filter__pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                    )}
                    <span className="filter__label">
                      {gp.filters[f]} <small>{count(f)}</small>
                    </span>
                  </button>
                ))}
              </LayoutGroup>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="masonry" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {columns.map((col, ci) => (
              <div key={ci} className="masonry__col">
                <AnimatePresence mode="popLayout">
                  {col.map(({ photo, index }) => (
                    <motion.button
                      key={photo.id}
                      layout
                      type="button"
                      className="tile"
                      style={{ animationDelay: `${(index % 8) * 60}ms` }}
                      onClick={() => setOpen(index)}
                      aria-label={`${t.gallery.open}: ${items[index].alt}`}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: EASE.smooth }}
                    >
                      <img
                        src={photoThumb(photo.id)}
                        alt={items[index].alt}
                        width={photo.w}
                        height={photo.h}
                        loading={index < 8 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                      <span className="tile__shade" aria-hidden="true" />
                      <span className="tile__info" aria-hidden="true">
                        <span className="tile__tag">{gp.filters[photo.cat]}</span>
                        <span className="tile__caption">{items[index].alt}</span>
                      </span>
                      <span className="tile__zoom" aria-hidden="true">
                        <Icon name="plus" size={20} />
                      </span>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--mint cta-band">
        <div className="container cta-band__inner">
          <div>
            <RevealText text={gp.ctaTitle} className="h2" />
            <Reveal delay={0.1}>
              <p className="lead">{gp.ctaText}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="cta-band__actions">
            <MagneticButton to="/get-involved#volunteer" className="btn btn--primary btn--lg">
              {gp.ctaVolunteer} <Icon name="arrow" size={18} className="btn__arrow" />
            </MagneticButton>
            <MagneticButton to="/donate" className="btn btn--accent btn--lg">
              <Icon name="heart" size={18} /> {gp.ctaDonate}
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </>
  );
}
