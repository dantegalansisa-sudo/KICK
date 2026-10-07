import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { EASE } from '../motion';

// Mapa estilizado de La Española a partir de coordenadas aproximadas (lon, lat).
type Pt = [number, number];

const K = 128;
const project = ([lon, lat]: Pt): Pt => [(lon + 74.55) * K, (20.05 - lat) * K * 1.06 + 12];

const BORDER: Pt[] = [
  [-71.76, 18.04], [-71.72, 18.32], [-71.88, 18.5], [-71.7, 18.75], [-71.75, 19.0],
  [-71.65, 19.2], [-71.73, 19.45], [-71.75, 19.7],
];

const HAITI_COAST: Pt[] = [
  [-71.95, 19.68], [-72.2, 19.77], [-72.55, 19.88], [-72.83, 19.95], [-73.15, 19.93], [-73.42, 19.83],
  [-73.25, 19.66], [-72.95, 19.6], [-72.7, 19.45], [-72.78, 19.25], [-72.7, 19.1], [-72.5, 18.77],
  [-72.35, 18.56], [-72.6, 18.5], [-72.77, 18.43], [-73.09, 18.45], [-73.5, 18.53], [-73.88, 18.57],
  [-74.12, 18.65], [-74.42, 18.56], [-74.46, 18.45], [-74.38, 18.32], [-73.92, 18.08], [-73.75, 18.19],
  [-73.4, 18.27], [-72.9, 18.2], [-72.53, 18.22], [-72.1, 18.23],
];

const DR_COAST: Pt[] = [
  [-71.65, 19.87], [-71.35, 19.88], [-70.95, 19.9], [-70.69, 19.81], [-70.52, 19.77], [-70.4, 19.76],
  [-70.08, 19.65], [-69.9, 19.64], [-69.85, 19.4], [-69.5, 19.33], [-69.13, 19.3], [-69.3, 19.19],
  [-69.62, 19.12], [-69.38, 19.05], [-69.04, 18.98], [-68.7, 18.94], [-68.33, 18.6], [-68.37, 18.48],
  [-68.48, 18.35], [-68.85, 18.36], [-68.97, 18.42], [-69.3, 18.45], [-69.6, 18.44], [-69.9, 18.46],
  [-70.15, 18.25], [-70.33, 18.24], [-70.55, 18.2], [-70.73, 18.4], [-71.05, 18.32], [-71.1, 18.18],
  [-71.23, 17.92], [-71.42, 17.62], [-71.62, 17.85], [-71.74, 18.03],
];

// Ambos contornos arrancan en el extremo norte de la frontera y regresan por ella desde el sur.
const HAITI: Pt[] = [BORDER[BORDER.length - 1], ...HAITI_COAST, ...BORDER.slice(0, -1)];
const DR: Pt[] = [BORDER[BORDER.length - 1], ...DR_COAST, ...BORDER.slice(0, -1)];

// Catmull-Rom → Bézier para un contorno suave.
function smoothPath(points: Pt[], closed = true) {
  const p = points.map(project);
  const n = p.length;
  const at = (i: number) => p[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  let d = `M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`;
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return closed ? d + 'Z' : d;
}

const HAITI_D = smoothPath(HAITI);
const DR_D = smoothPath(DR);
const BORDER_D = smoothPath(BORDER, false);

export const PLACE_COORDS: Record<string, Pt> = {
  pop: [-70.72, 19.74],
  sos: [-70.45, 19.71],
  stg: [-70.7, 19.45],
  mcr: [-71.5, 19.76],
  daj: [-71.71, 19.52],
  cap: [-72.2, 19.7],
  sdq: [-69.93, 18.52],
};

interface MapProps {
  selected: string;
  onSelect?: (id: string) => void;
  compact?: boolean;
}

export default function HispaniolaMap({ selected, onSelect, compact = false }: MapProps) {
  const { t } = useLang();
  const places = t.where.places;
  const [hx, hy] = project([-72.35, 19.2]);
  const [dx, dy] = project([-70.25, 18.88]);

  return (
    <svg viewBox="0 0 810 372" className={`map${compact ? ' map--compact' : ''}`} role="group" aria-label={`${t.where.haiti} · ${t.where.dr}`}>
      <defs>
        <pattern id="map-dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.1" className="map__dot" />
        </pattern>
      </defs>

      <motion.path
        d={HAITI_D}
        className="map__land map__land--ht"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        whileInView={{ pathLength: 1, fillOpacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: EASE.smooth }}
      />
      <motion.path
        d={DR_D}
        className="map__land map__land--dr"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        whileInView={{ pathLength: 1, fillOpacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: EASE.smooth, delay: 0.2 }}
      />
      <path d={HAITI_D} fill="url(#map-dots)" opacity="0.5" />
      <path d={DR_D} fill="url(#map-dots)" opacity="0.5" />
      <path d={BORDER_D} className="map__border" />

      {!compact && (
        <>
          <text x={hx} y={hy} className="map__label" textAnchor="middle">{t.where.haiti.toUpperCase()}</text>
          <text x={dx} y={dy} className="map__label" textAnchor="middle">{t.where.dr.toUpperCase()}</text>
        </>
      )}

      {places.map((pl, i) => {
        const coords = PLACE_COORDS[pl.id];
        if (!coords) return null;
        const [x, y] = project(coords);
        const active = pl.id === selected;
        if (compact && !active) return null;
        return (
          <motion.g
            key={pl.id}
            className={`map__pin${active ? ' is-active' : ''}`}
            role={onSelect ? 'button' : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-label={onSelect ? `${pl.name} — ${pl.type}` : undefined}
            aria-pressed={onSelect ? active : undefined}
            onClick={() => onSelect?.(pl.id)}
            onKeyDown={(e) => {
              if (onSelect && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onSelect(pl.id);
              }
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 + i * 0.12, type: 'spring', stiffness: 300, damping: 16 }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          >
            <circle cx={x} cy={y} r="18" className="map__hit" />
            {active && <circle cx={x} cy={y} r="9" className="map__pulse" />}
            <circle cx={x} cy={y} r={active ? 8 : 6} className="map__core" />
          </motion.g>
        );
      })}
    </svg>
  );
}
