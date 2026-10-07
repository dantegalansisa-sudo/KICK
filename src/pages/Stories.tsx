import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useLang } from '../i18n';
import { usePageMeta } from '../hooks/usePageMeta';
import { STORY_IMAGES } from '../data/site';
import Icon from '../components/Icon';
import PageHeader from '../components/PageHeader';
import { Reveal } from '../components/motion';
import { EASE } from '../motion';

export default function Stories() {
  usePageMeta('stories');
  const { t } = useLang();
  const s = t.storiesPage;
  const [filter, setFilter] = useState(0);

  const posts = s.posts.map((p, i) => ({ ...p, image: STORY_IMAGES[i] }));
  const [featured, ...rest] = posts;
  const visible = filter === 0 ? rest : posts.filter((p) => p.cat === s.filters[filter]);

  return (
    <>
      <PageHeader eyebrow={s.eyebrow} title={s.title} intro={s.intro} />

      <section className="section stories-page">
        <div className="container">
          {filter === 0 && (
            <Reveal as="article" className="feature-post">
              <div className="feature-post__media">
                {featured.image && <img src={featured.image} alt="" loading="lazy" decoding="async" />}
                <span className="tag tag--light">{s.featured}</span>
              </div>
              <div className="feature-post__body">
                <span className="tag">{featured.cat}</span>
                <h2 className="h3">{featured.title}</h2>
                <p className="body-lg">{featured.excerpt}</p>
                <PostMeta author={featured.author} date={featured.date} read={featured.read} minutes={t.common.minutes} />
              </div>
            </Reveal>
          )}

          <div className="filters" role="tablist" aria-label={s.eyebrow}>
            <LayoutGroup>
              {s.filters.map((f, i) => (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={filter === i}
                  className={`filter${filter === i ? ' is-active' : ''}`}
                  onClick={() => setFilter(i)}
                >
                  {filter === i && <motion.span layoutId="filter-pill" className="filter__pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <span className="filter__label">{f}</span>
                </button>
              ))}
            </LayoutGroup>
          </div>

          <motion.ul layout className="posts">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <motion.li
                  key={p.title}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: EASE.smooth }}
                >
                  <article className={`post${p.image ? '' : ' post--text'}`}>
                    {p.image ? (
                      <div className="post__media">
                        <img src={p.image} alt="" loading="lazy" decoding="async" />
                      </div>
                    ) : (
                      <div className="post__quote" aria-hidden="true">
                        <Icon name="quote" size={40} />
                      </div>
                    )}
                    <div className="post__body">
                      <span className="tag">{p.cat}</span>
                      <h3>{p.title}</h3>
                      <p>{p.excerpt}</p>
                      <PostMeta author={p.author} date={p.date} read={p.read} minutes={t.common.minutes} />
                    </div>
                  </article>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          {visible.length === 0 && <p className="empty">{s.empty}</p>}
        </div>
      </section>
    </>
  );
}

function PostMeta({ author, date, read, minutes }: { author: string; date: string; read: number; minutes: string }) {
  return (
    <p className="post-meta">
      <span>{author}</span>
      <span aria-hidden="true">·</span>
      <time>{date}</time>
      <span aria-hidden="true">·</span>
      <span>
        {read} {minutes}
      </span>
    </p>
  );
}
