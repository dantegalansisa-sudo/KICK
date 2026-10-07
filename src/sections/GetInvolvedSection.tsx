import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { INVOLVED_ICONS } from '../data/site';
import Icon from '../components/Icon';
import { Eyebrow, Reveal, RevealText } from '../components/motion';
import { gridContainer, gridItem } from '../motion';

export default function GetInvolvedSection() {
  const { t } = useLang();
  const g = t.involved;
  return (
    <section className="section involved">
      <div className="container involved__grid">
        <div className="involved__head">
          <Eyebrow>{g.eyebrow}</Eyebrow>
          <RevealText text={g.title} className="h2" />
          <Reveal delay={0.1}>
            <p className="lead">{g.intro}</p>
          </Reveal>
        </div>
        <motion.ul
          className="involved__cards"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {g.items.map((item, i) => (
            <motion.li key={item.id} variants={gridItem}>
              <Link to={`/get-involved#${item.id}`} className="involve-card">
                <span className="involve-card__num">0{i + 1}</span>
                <span className="icon-badge icon-badge--lg"><Icon name={INVOLVED_ICONS[item.id]} size={26} /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="involve-card__go" aria-hidden="true"><Icon name="arrow" size={18} /></span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
