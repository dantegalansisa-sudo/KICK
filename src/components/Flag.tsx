// Banderas simplificadas (sin escudo) para RD y Haití.
export default function Flag({ country, size = 20 }: { country: 'dr' | 'ht'; size?: number }) {
  const h = Math.round(size * 0.68);
  if (country === 'dr') {
    return (
      <svg width={size} height={h} viewBox="0 0 30 20" className="flag" aria-hidden="true">
        <rect width="30" height="20" fill="#fff" />
        <rect width="13" height="8" fill="#002d62" />
        <rect x="17" width="13" height="8" fill="#ce1126" />
        <rect y="12" width="13" height="8" fill="#ce1126" />
        <rect x="17" y="12" width="13" height="8" fill="#002d62" />
      </svg>
    );
  }
  return (
    <svg width={size} height={h} viewBox="0 0 30 20" className="flag" aria-hidden="true">
      <rect width="30" height="10" fill="#00209f" />
      <rect y="10" width="30" height="10" fill="#d21034" />
      <rect x="11" y="7" width="8" height="6" fill="#fff" />
    </svg>
  );
}
