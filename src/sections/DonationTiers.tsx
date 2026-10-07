import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { TIER_ICONS } from '../data/site';
import Icon from '../components/Icon';
import { MagneticButton, SectionHead } from '../components/motion';
import { gridContainer, gridItem } from '../motion';

export default function DonationTiers() {
  const { t } = useLang();
  const d = t.donateTiers;
  return (
    <section className="section tiers">
      <div className="container">
        <SectionHead eyebrow={d.eyebrow} title={d.title} intro={d.intro} />
        <motion.div
          className="tiers__grid"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {d.tiers.map((tier, i) => (
            <motion.div key={tier.amount} variants={gridItem}>
              <Link to={`/donate?amount=${tier.amount}`} className="tier-card">
                <span className="tier-card__icon"><Icon name={TIER_ICONS[i]} size={24} /></span>
                <span className="tier-card__amount">
                  <sup>US$</sup>
                  {tier.amount}
                </span>
                <p>{tier.text}</p>
                <span className="tier-card__go" aria-hidden="true"><Icon name="arrow" size={16} /></span>
              </Link>
            </motion.div>
          ))}
          <motion.div variants={gridItem} className="tiers__cta">
            <Icon name="heart" size={30} />
            <h3>{d.ctaTitle}</h3>
            <MagneticButton to="/donate" className="btn btn--light">
              {d.ctaButton} <Icon name="arrow" size={18} className="btn__arrow" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
