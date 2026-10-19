import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import type { IconName } from '../data/site';
import Icon from '../components/Icon';
import { AnimatedCounter } from '../components/motion';
import { gridContainer, gridItem } from '../motion';

const ICONS: IconName[] = ['users', 'calendar', 'stethoscope', 'book', 'globe'];

export default function ImpactBar() {
  const { t } = useLang();
  return (
    <section className="impact" id="impact" aria-label={t.impact.motto}>
      <div className="container impact__inner">
        <motion.ul
          className="impact__list"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {t.impact.items.map((item, i) => (
            <motion.li key={item.label} className="impact__item" variants={gridItem}>
              <span className="impact__icon"><Icon name={ICONS[i]} size={24} /></span>
              <span className="impact__num">
                <AnimatedCounter target={item.value} suffix={item.suffix} />
              </span>
              <span className="impact__label">{item.label}</span>
            </motion.li>
          ))}
        </motion.ul>
        <motion.span
          className="script impact__motto"
          initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
          whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 120 }}
        >
          {t.impact.motto}
          <svg viewBox="0 0 160 14" aria-hidden="true">
            <motion.path
              d="M2 9 C 40 2, 90 2, 158 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.9 }}
            />
          </svg>
        </motion.span>
      </div>
    </section>
  );
}
