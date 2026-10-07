import { useEffect } from 'react';
import { useLang } from '../i18n';
import type { Dict } from '../i18n/es';

export function usePageMeta(key: keyof Dict['meta']) {
  const { t, lang } = useLang();
  useEffect(() => {
    const meta = t.meta[key];
    document.title = meta.title;
    let desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!desc) {
      desc = document.createElement('meta');
      desc.name = 'description';
      document.head.appendChild(desc);
    }
    desc.content = meta.description;
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'es' ? 'es_DO' : 'en_US');
  }, [t, key, lang]);
}
