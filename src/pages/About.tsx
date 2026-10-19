import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { usePageMeta } from '../hooks/usePageMeta';
import { IMG, SITE, STRUCTURE_ICONS } from '../data/site';
import Icon from '../components/Icon';
import PageHeader from '../components/PageHeader';
import { Eyebrow, MagneticButton, ParallaxImage, Reveal, RevealText, SectionHead } from '../components/motion';
import { gridContainer, gridItem } from '../motion';

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

      {/* Lema */}
      <section className="section motto">
        <div className="container motto__grid">
          <div>
            <Eyebrow>{a.mottoEyebrow}</Eyebrow>
            <RevealText text={a.mottoTitle} className="h1 motto__title" />
            <span className="script motto__script" aria-hidden="true">Toma la iniciativa</span>
          </div>
          <Reveal delay={0.1} className="motto__text">
            {a.mottoText.map((p, i) => (
              <p key={i} className={i === 0 ? 'body-xl' : 'body-lg'}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Director Ejecutivo */}
      <section className="section founder">
        <div className="container founder__grid">
          <div className="founder__media">
            <ParallaxImage src={IMG.founderAbout} alt={a.founderImageAlt} className="founder__img" distance={40} />
            <Reveal className="founder__programs" delay={0.15}>
              <h3 className="mini-title">{a.founderProgramsTitle}</h3>
              <ul>
                {a.founderPrograms.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Reveal>
          </div>
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
            <Reveal delay={0.25}>
              <a href={SITE.orcid} target="_blank" rel="noopener noreferrer" className="orcid">
                <span className="orcid__badge" aria-hidden="true">iD</span>
                <span>
                  <small>{a.orcidLabel}</small>
                  {SITE.orcidId}
                </span>
                <Icon name="arrow" size={16} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Estructura organizativa */}
      <section className="section team">
        <div className="container">
          <SectionHead eyebrow={a.structureTitle} title={a.structureIntro} layout="stack" />
          <motion.ul
            className="structure"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {a.structure.map((s, i) => (
              <motion.li key={s.title} variants={gridItem} className={`structure__item${i === 0 ? ' structure__item--lead' : ''}`}>
                <span className="icon-badge"><Icon name={STRUCTURE_ICONS[i]} size={22} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Monitoreo, evaluación y transparencia */}
      <section className="section section--cream transparency" id="transparency">
        <div className="container transparency__grid">
          <div>
            <Eyebrow>{a.transparencyTitle}</Eyebrow>
            <RevealText text={a.transparencyIntro} className="h3" />
            <motion.ul
              className="me"
              variants={gridContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {a.me.map((m, i) => (
                <motion.li key={m.title} variants={gridItem}>
                  <span className="me__num">0{i + 1}</span>
                  <div>
                    <h3>{m.title}</h3>
                    <p>{m.text}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <Reveal className="reports" delay={0.15}>
            <span className="icon-badge icon-badge--lg"><Icon name="clipboard" size={26} /></span>
            <h3 className="reports__title">{a.financeTitle}</h3>
            <p className="reports__text">{a.financeText}</p>
            <MagneticButton
              href={`mailto:${SITE.emails.info}?subject=${encodeURIComponent(a.financeTitle + ' — KICH')}`}
              className="btn btn--primary"
            >
              <Icon name="mail" size={18} /> {a.financeCta}
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
