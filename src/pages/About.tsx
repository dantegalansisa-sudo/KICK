import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { usePageMeta } from '../hooks/usePageMeta';
import { IMG } from '../data/site';
import Icon from '../components/Icon';
import PageHeader from '../components/PageHeader';
import { Eyebrow, ParallaxImage, Reveal, RevealText, SectionHead } from '../components/motion';
import { EASE, gridContainer, gridItem } from '../motion';

const initials = (name: string) =>
  name
    .replace(/^(Dr\.|Dra\.|Lcda\.|Ing\.)\s*/, '')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

export default function About() {
  usePageMeta('about');
  const { t } = useLang();
  const a = t.aboutPage;

  return (
    <>
      <PageHeader eyebrow={a.eyebrow} title={a.title} intro={a.intro} />

      {/* Historia + línea de tiempo */}
      <section className="section about-story">
        <div className="container about-story__grid">
          <div>
            <Eyebrow>{a.storyTitle}</Eyebrow>
            <Reveal className="about-story__text">
              {a.story.map((p, i) => (
                <p key={i} className={i === 0 ? 'body-xl dropcap' : 'body-lg'}>{p}</p>
              ))}
            </Reveal>
          </div>
          <motion.ol
            className="timeline"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {a.timeline.map((item) => (
              <motion.li key={item.year} variants={gridItem}>
                <span className="timeline__year">{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Misión, visión, valores */}
      <section className="section section--mint mvv">
        <div className="container">
          <div className="mvv__top">
            <Reveal className="mvv__card">
              <span className="eyebrow">{a.missionLabel}</span>
              <p className="mvv__statement">{a.mission}</p>
            </Reveal>
            <Reveal className="mvv__card" delay={0.1}>
              <span className="eyebrow">{a.visionLabel}</span>
              <p className="mvv__statement">{a.vision}</p>
            </Reveal>
          </div>
          <Eyebrow>{a.valuesLabel}</Eyebrow>
          <motion.ul
            className="values"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {a.values.map((v, i) => (
              <motion.li key={v.title} variants={gridItem} className="value">
                <span className="value__num">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Fundador */}
      <section className="section founder">
        <div className="container founder__grid">
          <ParallaxImage src={IMG.founderAbout} alt={a.founderImageAlt} className="founder__img" distance={40} />
          <div className="founder__text">
            <Eyebrow>{a.founderEyebrow}</Eyebrow>
            <RevealText text={a.founderName} className="h2" />
            <p className="founder__creds">{a.founderCreds}</p>
            <Reveal delay={0.1}>
              {a.founderBio.map((p, i) => (
                <p key={i} className="body-lg">{p}</p>
              ))}
            </Reveal>
            <Reveal delay={0.2} className="founder__quote">
              <Icon name="quote" size={26} />
              <p>{a.founderQuote}</p>
              <span className="script">Dr. R. Kerolle</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="section team">
        <div className="container">
          <SectionHead eyebrow={a.teamTitle} title={a.teamIntro} layout="stack" />
          <motion.ul
            className="team__grid"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {a.team.map((m) => (
              <motion.li key={m.name} variants={gridItem} className="person">
                <span className="person__avatar" aria-hidden="true">{initials(m.name)}</span>
                <div>
                  <h3>{m.name}</h3>
                  <p>{m.role}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
          <div className="board">
            <h3 className="board__title">{a.boardTitle}</h3>
            <ul>
              {a.board.map((m) => (
                <li key={m.name}>
                  <strong>{m.name}</strong>
                  <span>{m.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Transparencia */}
      <section className="section section--cream transparency" id="transparency">
        <div className="container transparency__grid">
          <div>
            <Eyebrow>{a.transparencyTitle}</Eyebrow>
            <RevealText text={a.transparencyIntro} className="h3" />
            <ul className="bars">
              {a.allocation.map((row, i) => (
                <li key={row.label}>
                  <div className="bars__label">
                    <span>{row.label}</span>
                    <strong>{row.pct}%</strong>
                  </div>
                  <div className="bars__track">
                    <motion.span
                      className={`bars__fill${i === 0 ? ' bars__fill--main' : ''}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: i * 0.12, ease: EASE.smooth }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="reports">
            <h3 className="reports__title">{a.reportsTitle}</h3>
            <ul>
              {a.reports.map((r) => (
                <li key={r.title}>
                  <span className="reports__year">{r.year}</span>
                  <span className="reports__name">{r.title}</span>
                  <button type="button" className="reports__dl" aria-label={`${a.download}: ${r.title}`} title={t.common.demo}>
                    <Icon name="download" size={18} />
                    <span>{a.download}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
