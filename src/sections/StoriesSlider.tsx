import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLang } from '../i18n';
import { IMG } from '../data/site';
import Icon from '../components/Icon';
import { Eyebrow, ParallaxImage, Reveal, RevealText } from '../components/motion';
import { EASE } from '../motion';

export default function StoriesSlider() {
  const { t } = useLang();
  const s = t.stories;
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = s.items.length;
  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % total), 8000);
    return () => window.clearInterval(id);
  }, [paused, reduce, total]);

  const story = s.items[index];

  return (
    <section className="section stories">
      <div className="container stories__grid">
        <div className="stories__head">
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <RevealText text={s.title} className="h2" />
          <Reveal delay={0.1}>
            <p className="lead">{s.intro}</p>
          </Reveal>
          <Reveal delay={0.2} className="stories__controls">
            <button type="button" className="round-btn" onClick={() => go(-1)} aria-label={s.prev}>
              <Icon name="arrowLeft" size={20} />
            </button>
            <button type="button" className="round-btn" onClick={() => go(1)} aria-label={s.next}>
              <Icon name="arrow" size={20} />
            </button>
            <Link to="/stories" className="link-arrow">
              {s.cta} <Icon name="arrow" size={18} />
            </Link>
          </Reveal>
        </div>

        <ParallaxImage src={IMG.story} alt={s.imageAlt} className="stories__img" distance={30} />

        <div
          className="stories__quote"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <Icon name="quote" size={34} className="stories__mark" />
          <div className="stories__quote-body" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.55, ease: EASE.smooth }}
              >
                <blockquote>{story.quote}</blockquote>
                <figcaption>
                  <strong>{story.name}</strong>
                  <span>{story.role}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="stories__progress" role="tablist" aria-label={s.eyebrow}>
            {s.items.map((it, i) => (
              <button
                key={it.name}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={it.name}
                className={i === index ? 'is-active' : ''}
                onClick={() => setIndex(i)}
              >
                {i === index && !paused && !reduce && (
                  <motion.span
                    key={`bar-${index}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 8, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
