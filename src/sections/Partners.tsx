import { useLang } from '../i18n';
import { PARTNER_ICONS } from '../data/site';
import Icon from '../components/Icon';

// Franja con las categorías de aliados indicadas en la ficha técnica.
export default function Partners() {
  const { t } = useLang();
  const items = t.partners.items;
  const row = [...items, ...items];
  return (
    <section className="partners" aria-label={t.partners.label}>
      <div className="container partners__inner">
        <p className="partners__label">{t.partners.label}</p>
        <div className="partners__track-wrap">
          <ul className="partners__track">
            {row.map((name, i) => (
              <li key={`${name}-${i}`} className="partner-logo" aria-hidden={i >= items.length}>
                <span className="partner-logo__mark">
                  <Icon name={PARTNER_ICONS[i % items.length]} size={20} />
                </span>
                <span className="partner-logo__name">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
