import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { IMG } from '../data/site';

export default function Logo({ light = false }: { light?: boolean }) {
  const { t } = useLang();
  const [l1, l2] = t.nav.tagline.split('\n');
  return (
    <Link to="/" className={`brand${light ? ' brand--light' : ''}`} aria-label="KICH — Kerolle Initiative for Community Health">
      <img src={IMG.logo} alt="" width={52} height={52} className="brand__seal" />
      <span className="brand__text">
        <strong>KICH</strong>
        <small>
          {l1}
          <br />
          {l2}
        </small>
      </span>
    </Link>
  );
}
