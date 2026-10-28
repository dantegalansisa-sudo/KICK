import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { SITE, whatsappLink } from '../data/site';
import Icon from './Icon';
import Logo from './Logo';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo light />
            <p>{t.footer.mission}</p>
            <span className="script footer__motto">{t.impact.motto}</span>
          </div>

          <div className="footer__col">
            <h3>{t.footer.explore}</h3>
            <ul>
              <li><Link to="/about">{t.nav.about}</Link></li>
              <li><Link to="/programs">{t.nav.programs}</Link></li>
              <li><Link to="/#where">{t.nav.where}</Link></li>
              <li><Link to="/stories">{t.nav.stories}</Link></li>
              <li><Link to="/gallery">{t.nav.gallery}</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h3>{t.footer.act}</h3>
            <ul>
              <li><Link to="/donate">{t.nav.donate}</Link></li>
              <li><Link to="/get-involved">{t.nav.involved}</Link></li>
              <li><Link to="/request-help">{t.nav.requestHelp}</Link></li>
              <li><Link to="/contact">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div className="footer__col footer__contact">
            <h3>{t.footer.contact}</h3>
            <ul>
              <li>
                <a href={`mailto:${SITE.emails.contact}`}><Icon name="mail" size={16} /> {SITE.emails.contact}</a>
              </li>
              <li>
                <a href={`mailto:${SITE.emails.info}`}><Icon name="mail" size={16} /> {SITE.emails.info}</a>
              </li>
              <li>
                <a href={`mailto:${SITE.emails.donate}`}><Icon name="mail" size={16} /> {SITE.emails.donate}</a>
              </li>
              <li>
                <a href={whatsappLink(t.whatsapp.message)} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={16} /> {SITE.whatsappDisplay}
                </a>
              </li>
              <li className="footer__address"><Icon name="pin" size={16} /> {t.footer.address}</li>
            </ul>
          </div>
        </div>

        <div className="footer__mid">
          <div className="footer__social">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icon name="instagram" size={20} /></a>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Icon name="facebook" size={20} /></a>
            <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Icon name="youtube" size={20} /></a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={20} /></a>
          </div>
          <p className="footer__nonprofit"><Icon name="shield" size={16} /> {t.footer.nonprofit}</p>
        </div>

        <div className="footer__bottom">
          <span>© {year} Kerolle Initiative for Community Health. {t.footer.rights}</span>
          <nav aria-label="Legal">
            <Link to="/about#transparency">{t.footer.transparency}</Link>
            <Link to="/contact">{t.footer.privacy}</Link>
          </nav>
          <span className="footer__credit">{t.footer.madeBy}</span>
        </div>
      </div>
    </footer>
  );
}
