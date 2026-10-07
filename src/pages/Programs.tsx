import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { usePageMeta } from '../hooks/usePageMeta';
import { PROGRAM_META } from '../data/site';
import Icon from '../components/Icon';
import PageHeader from '../components/PageHeader';
import { MagneticButton, ParallaxImage, Reveal, RevealText } from '../components/motion';
import { gridContainer, gridItem } from '../motion';

export default function Programs() {
  usePageMeta('programs');
  const { t } = useLang();
  const pp = t.programsPage;
  const p = t.programs;

  return (
    <>
      <PageHeader eyebrow={pp.eyebrow} title={pp.title} intro={pp.intro}>
        <nav className="jump-links" aria-label={pp.eyebrow}>
          {p.items.map((it) => (
            <a key={it.id} href={`#${it.id}`}>{it.title}</a>
          ))}
        </nav>
      </PageHeader>

      <section className="method">
        <div className="container">
          <h2 className="method__title">{pp.methodTitle}</h2>
          <motion.ol
            className="method__steps"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {pp.method.map((m, i) => (
              <motion.li key={m.title} variants={gridItem}>
                <span className="method__num">{i + 1}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <section className="section program-rows">
        <div className="container">
          {p.items.map((item, i) => {
            const meta = PROGRAM_META[item.id];
            return (
              <article key={item.id} id={item.id} className={`program-row${i % 2 ? ' program-row--flip' : ''}`}>
                <ParallaxImage src={meta.image} alt={item.imageAlt} className="program-row__img" distance={30} />
                <div className="program-row__text">
                  <div className="program-row__meta">
                    <span className="icon-badge"><Icon name={meta.icon} size={22} /></span>
                    <span className="program-row__num">0{i + 1} / 0{p.items.length}</span>
                  </div>
                  <RevealText text={item.title} className="h2" />
                  <Reveal delay={0.1}>
                    <p className="body-lg">{item.long}</p>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <h4 className="mini-title">{p.objectivesLabel}</h4>
                    <ul className="checklist">
                      {item.objectives.map((o) => (
                        <li key={o}><Icon name="check" size={18} strokeWidth={2} /> {o}</li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <h4 className="mini-title">{p.outcomesLabel}</h4>
                    <dl className="outcomes">
                      {item.outcomes.map((o) => (
                        <div key={o.label}>
                          <dt>{o.value}</dt>
                          <dd>{o.label}</dd>
                        </div>
                      ))}
                    </dl>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section section--mint cta-band">
        <div className="container cta-band__inner">
          <div>
            <RevealText text={pp.ctaTitle} className="h2" />
            <Reveal delay={0.1}>
              <p className="lead">{pp.ctaText}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="cta-band__actions">
            <MagneticButton to="/request-help" className="btn btn--primary btn--lg">
              {pp.ctaButton} <Icon name="arrow" size={18} className="btn__arrow" />
            </MagneticButton>
            <MagneticButton to="/donate" className="btn btn--accent btn--lg">
              <Icon name="heart" size={18} /> {t.nav.donate}
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
