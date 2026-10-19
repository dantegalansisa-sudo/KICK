import { useCallback, useEffect, useState, type PointerEvent } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import { useLang } from '../i18n';
import { HERO_SLIDES } from '../data/site';
import Icon from './Icon';
import Flag from './Flag';
import { EASE } from '../motion';

const AUTOPLAY_MS = 5500;

// Pose de cada tarjeta según su distancia a la activa (0 = frente).
function pose(rel: number, n: number) {
  if (rel === 0) return { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 5 };
  if (rel === 1) return { x: 46, y: -14, rotate: 5, scale: 0.92, opacity: 0.85, zIndex: 4 };
  if (rel === 2) return { x: 86, y: -26, rotate: 10, scale: 0.84, opacity: 0.5, zIndex: 3 };
  if (rel === n - 1) return { x: -320, y: 40, rotate: -16, scale: 0.9, opacity: 0, zIndex: 6 };
  return { x: 110, y: -34, rotate: 14, scale: 0.78, opacity: 0, zIndex: 1 };
}

export default function HeroCarousel({ onChange }: { onChange?: (index: number) => void }) {
  const { t } = useLang();
  const h = t.hero;
  const reduce = useReducedMotion();
  const n = HERO_SLIDES.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + n) % n),
    [n],
  );

  useEffect(() => onChange?.(index), [index, onChange]);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduce, go]);

  // Inclinación 3D según la posición del puntero sobre el escenario.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 });
  const imgX = useSpring(useTransform(px, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 });
  const imgY = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
    setPaused(false);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 70 || info.velocity.x > 400) go(-1);
  };

  const slide = h.slides[index];

  return (
    <div className="deck" onPointerMove={onMove} onPointerEnter={() => setPaused(true)} onPointerLeave={onLeave}>
      <div className="deck__ring" aria-hidden="true" />

      <div className="deck__stage" role="region" aria-roledescription="carousel" aria-label={h.eyebrow}>
        {HERO_SLIDES.map((src, i) => {
          const rel = (i - index + n) % n;
          const p = pose(rel, n);
          const front = rel === 0;
          const s = h.slides[i];
          return (
            <motion.div
              key={src}
              className={`deck__card${front ? ' is-front' : ''}`}
              initial={false}
              animate={{ x: p.x, y: p.y, rotate: p.rotate, scale: p.scale, opacity: p.opacity }}
              style={{ zIndex: p.zIndex }}
              transition={{ type: 'spring', stiffness: 160, damping: 22, mass: 0.9 }}
              drag={front ? 'x' : false}
              dragSnapToOrigin
              dragElastic={0.55}
              onDragEnd={onDragEnd}
              onClick={() => !front && rel === 1 && go(1)}
              aria-hidden={!front}
            >
              <motion.div className="deck__tilt" style={front ? { rotateX, rotateY } : undefined}>
                <motion.img
                  src={src}
                  alt={front ? `${s.activity} — ${s.place}` : ''}
                  draggable={false}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={front ? { x: imgX, y: imgY, scale: 1.12 } : { scale: 1.12 }}
                />
                <span className="deck__shade" aria-hidden="true" />
                <span className="deck__glare" aria-hidden="true" />
              </motion.div>
            </motion.div>
          );
        })}

        <div className="deck__caption" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE.smooth }}
              className="deck__caption-inner"
            >
              <span className="deck__country">
                {slide.country !== 'ht' && <Flag country="dr" size={18} />}
                {slide.country !== 'dr' && <Flag country="ht" size={18} />}
                {slide.country === 'dr' ? h.countries.dr : slide.country === 'ht' ? h.countries.ht : `${h.countries.dr} ${h.countries.joiner} ${h.countries.ht}`}
              </span>
              <strong>{slide.activity}</strong>
              <small>
                <Icon name="pin" size={13} /> {slide.place}
              </small>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="deck__controls">
        <button type="button" className="deck__btn" onClick={() => go(-1)} aria-label={h.prev}>
          <Icon name="arrowLeft" size={18} />
        </button>
        <div className="deck__progress" aria-hidden="true">
          {HERO_SLIDES.map((src, i) => (
            <button
              key={src}
              type="button"
              tabIndex={-1}
              className={i === index ? 'is-active' : ''}
              onClick={() => setIndex(i)}
            >
              {i === index && !paused && !reduce && (
                <motion.span
                  key={`p-${index}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                />
              )}
              {i === index && (paused || reduce) && <span style={{ transform: 'scaleX(1)' }} />}
            </button>
          ))}
        </div>
        <span className="deck__count">
          {String(index + 1).padStart(2, '0')} <i>/</i> {String(n).padStart(2, '0')}
        </span>
        <button type="button" className="deck__btn" onClick={() => go(1)} aria-label={h.next}>
          <Icon name="arrow" size={18} />
        </button>
      </div>
    </div>
  );
}
