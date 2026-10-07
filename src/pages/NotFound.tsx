import { useLang } from '../i18n';
import { usePageMeta } from '../hooks/usePageMeta';
import Icon from '../components/Icon';
import { Seal } from '../components/PageHeader';
import { MagneticButton, RevealText } from '../components/motion';

export default function NotFound() {
  usePageMeta('notFound');
  const { t } = useLang();
  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <Seal className="seal--static" />
        <span className="not-found__code">404</span>
        <RevealText as="h1" text={t.notFound.title} className="h1" immediate />
        <p className="lead">{t.notFound.text}</p>
        <MagneticButton to="/" className="btn btn--primary btn--lg">
          <Icon name="home" size={18} /> {t.notFound.cta}
        </MagneticButton>
      </div>
    </section>
  );
}
