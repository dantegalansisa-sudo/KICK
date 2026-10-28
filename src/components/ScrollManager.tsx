import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scroll al inicio en cada cambio de ruta, o a la sección indicada por el hash.
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      toTop();
      // Repetir tras el render de la nueva página (las páginas se cargan bajo demanda).
      const raf = requestAnimationFrame(toTop);
      const timer = window.setTimeout(toTop, 120);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(timer);
      };
    }
    let tries = 0;
    let timer: number;
    const seek = () => {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (tries++ < 25) {
        timer = window.setTimeout(seek, 100);
      }
    };
    timer = window.setTimeout(seek, 380);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
