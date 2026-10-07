import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { PROGRAM_META } from '../data/site';
import Icon from '../components/Icon';
import { SectionHead } from '../components/motion';
import { gridContainer, gridItem } from '../motion';

export default function ProgramsGrid() {
  const { t } = useLang();
  const p = t.programs;
  return (
    <section className="section programs" id="programs">
      <div className="container">
        <SectionHead
          eyebrow={p.eyebrow}
          title={p.title}
          intro={p.intro}
          action={
            <Link to="/programs" className="link-arrow">
              {p.viewAll} <Icon name="arrow" size={18} />
            </Link>
          }
        />
        <motion.ul
          className="programs__grid"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {p.items.map((item, i) => {
            const meta = PROGRAM_META[item.id];
            return (
              <motion.li key={item.id} variants={gridItem}>
                <Link to={`/programs#${item.id}`} className="program-card">
                  <div className="program-card__media">
                    <img src={meta.image} alt={item.imageAlt} loading="lazy" decoding="async" />
                    <span className="program-card__num">0{i + 1}</span>
                  </div>
                  <div className="program-card__body">
                    <span className="icon-badge"><Icon name={meta.icon} size={22} /></span>
                    <h3>{item.title}</h3>
                    <p>{item.short}</p>
                    <span className="program-card__more">
                      {t.common.learnMore} <Icon name="arrow" size={16} />
                    </span>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
