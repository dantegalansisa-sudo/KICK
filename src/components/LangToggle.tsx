import { useLang, type Lang } from '../i18n';

export default function LangToggle({ light = false }: { light?: boolean }) {
  const { lang, setLang, t } = useLang();
  const options: Lang[] = ['es', 'en'];
  return (
    <div className={`lang${light ? ' lang--light' : ''}`} role="group" aria-label={t.nav.langLabel}>
      {options.map((code) => (
        <button
          key={code}
          type="button"
          className={`lang__btn${lang === code ? ' is-active' : ''}`}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
