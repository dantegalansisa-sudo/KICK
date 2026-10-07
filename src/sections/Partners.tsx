import { useLang } from '../i18n';
import { PARTNERS } from '../data/site';

export default function Partners() {
  const { t } = useLang();
  const row = [...PARTNERS, ...PARTNERS];
  return (
    <section className="partners" aria-label={t.partners.label}>
      <div className="container partners__inner">
        <p className="partners__label">{t.partners.label}</p>
        <div className="partners__track-wrap">
          <ul className="partners__track">
            {row.map((p, i) => (
              <li key={`${p.mark}-${i}`} className="partner-logo" aria-hidden={i >= PARTNERS.length}>
                <span className="partner-logo__mark">{p.mark}</span>
                <span className="partner-logo__name">{p.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
