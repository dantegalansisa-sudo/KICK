import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n';
import { SITE, whatsappLink } from '../data/site';
import Icon from './Icon';
import Logo from './Logo';
import LangToggle from './LangToggle';
import { MagneticButton } from './motion';
import { EASE } from '../motion';

export default function Navbar() {
  const { t } = useLang();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    { to: '/', label: t.nav.home, end: true },
    { to: '/about', label: t.nav.about },
    { to: '/programs', label: t.nav.programs },
    { to: '/#where', label: t.nav.where, hash: true },
    { to: '/get-involved', label: t.nav.involved },
    { to: '/stories', label: t.nav.stories },
    { to: '/gallery', label: t.nav.gallery },
    { to: '/contact', label: t.nav.contact },
  ];

  const solid = scrolled || !isHome;

  return (
    <header className={`nav ${solid ? 'nav--solid' : 'nav--clear'} ${open ? 'nav--open' : ''}`}>
      <div className="container nav__inner">
        <Logo light={!solid && !open} />

        <nav className="nav__links" aria-label="Principal">
          {links.map((l) =>
            l.hash ? (
              <Link key={l.to} to={l.to} className="nav__link">
                {l.label}
              </Link>
            ) : (
              <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}>
                {l.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="nav__actions">
          <LangToggle light={!solid && !open} />
          <MagneticButton to="/donate" className="btn btn--accent btn--sm nav__donate" strength={0.25}>
            <Icon name="heart" size={16} />
            {t.nav.donate}
          </MagneticButton>
          <button
            type="button"
            className="nav__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE.premium }}
          >
            <nav className="container mobile-menu__inner" aria-label="Móvil">
              <ul>
                {[...links, { to: '/request-help', label: t.nav.requestHelp }].map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.5, ease: EASE.smooth }}
                  >
                    <Link to={l.to} onClick={() => setOpen(false)}>
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="mobile-menu__foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="mobile-menu__lang">
                  <LangToggle />
                </div>
                <Link to="/donate" className="btn btn--accent" onClick={() => setOpen(false)}>
                  <Icon name="heart" size={18} /> {t.nav.donate}
                </Link>
                <a href={whatsappLink(t.whatsapp.message)} target="_blank" rel="noopener noreferrer" className="mobile-menu__contact">
                  <Icon name="whatsapp" size={18} /> {SITE.whatsappDisplay}
                </a>
                <a href={`mailto:${SITE.emails.institution}`} className="mobile-menu__contact">
                  <Icon name="mail" size={18} /> {SITE.emails.institution}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
