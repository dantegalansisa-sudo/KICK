import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n';
import Icon from './Icon';
import { EASE } from '../motion';

export interface LightboxItem {
  src: string;
  thumb?: string;
  alt: string;
  tag?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}

// Visor a pantalla completa: flechas, teclado, deslizar y tira de miniaturas.
export default function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const { t } = useLang();
  const g = t.gallery;
  const n = items.length;
  const closeRef = useRef<HTMLButtonElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (to: number) => {
      if (index === null) return;
      setDir(to > index ? 1 : -1);
      onNavigate((to + n) % n);
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
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prevFocus?.focus();
    };
  }, [index, onClose, go]);

  // Mantener visible la miniatura activa.
  useEffect(() => {
    if (index === null) return;
    stripRef.current
      ?.querySelector<HTMLElement>(`[data-i="${index}"]`)
      ?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [index]);

  const item = index !== null ? items[index] : null;

  return createPortal(
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <div className="lightbox__top" onClick={(e) => e.stopPropagation()}>
            <span className="lightbox__count">
              {String(index + 1).padStart(2, '0')} <i>/</i> {String(n).padStart(2, '0')}
            </span>
            <button ref={closeRef} type="button" className="lightbox__close" onClick={onClose} aria-label={g.close}>
              <Icon name="close" size={24} />
            </button>
          </div>

          <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox__frame">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  initial={{ opacity: 0, x: 70 * dir, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -70 * dir, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: EASE.smooth }}
                  drag="x"
                  dragSnapToOrigin
                  dragElastic={0.4}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) go(index + 1);
                    else if (info.offset.x > 60) go(index - 1);
                  }}
                />
              </AnimatePresence>
            </div>
            <figcaption>
              {item.tag && <span className="lightbox__tag">{item.tag}</span>}
              <span>{item.alt}</span>
            </figcaption>
          </figure>

          {n > 1 && (
            <>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  go(index - 1);
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
                  go(index + 1);
                }}
                aria-label={g.next}
              >
                <Icon name="arrow" size={22} />
              </button>

              <div className="lightbox__strip" ref={stripRef} onClick={(e) => e.stopPropagation()}>
                {items.map((it, i) => (
                  <button
                    key={it.src}
                    type="button"
                    data-i={i}
                    className={i === index ? 'is-active' : ''}
                    onClick={() => go(i)}
                    aria-label={it.alt}
                    aria-current={i === index}
                  >
                    <img src={it.thumb ?? it.src} alt="" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
