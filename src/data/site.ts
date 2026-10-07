// Datos no textuales compartidos entre idiomas.

export const SITE = {
  whatsapp: '18297021591',
  whatsappDisplay: '+1 (829) 702-1591',
  instagram: 'https://instagram.com/kerolleinitiative',
  instagramHandle: '@kerolleinitiative',
  facebook: 'https://facebook.com/',
  youtube: 'https://youtube.com/',
  linkedin: 'https://linkedin.com/',
  emails: { contact: 'contact@kich.org', info: 'info@kich.org', donate: 'donate@kich.org' },
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const IMG = {
  hero: '/images/hero-community-care.webp',
  heroSm: '/images/hero-community-care-sm.webp',
  logo: '/images/kich-logo.webp',
  founder: '/images/kerolle-community.webp',
  founderAbout: '/images/kerolle-students.webp',
  story: '/images/supplies-delivery.webp',
  trip: '/images/brigade-walk.webp',
  donate: '/images/kerolle-child.webp',
};

export const PROGRAM_META: Record<string, { image: string; icon: IconName }> = {
  brigades: { image: '/images/clinic-elders.webp', icon: 'stethoscope' },
  chna: { image: '/images/home-visit.webp', icon: 'clipboard' },
  education: { image: '/images/children-education.webp', icon: 'book' },
  maternal: { image: '/images/kerolle-child.webp', icon: 'baby' },
  water: { image: '/images/hygiene-workshop.webp', icon: 'droplet' },
  development: { image: '/images/community-garden.webp', icon: 'sprout' },
};

export const GALLERY = [
  '/images/brigade-walk.webp',
  '/images/volunteer-soccer.webp',
  '/images/team-celebration.webp',
  '/images/team-group.webp',
  '/images/kerolle-students.webp',
  '/images/school-kits.webp',
];

export const INVOLVED_ICONS: Record<string, IconName> = {
  volunteer: 'hand',
  trips: 'plane',
  partner: 'handshake',
  fundraise: 'heart',
};

export const TIER_ICONS: IconName[] = ['pill', 'droplet', 'book', 'stethoscope'];

export const STORY_IMAGES: (string | null)[] = [
  '/images/children-education.webp',
  null,
  '/images/medical-students.webp',
  null,
  '/images/team-group.webp',
  '/images/hygiene-workshop.webp',
];

export const PARTNERS = [
  { name: 'USF Honors College', mark: 'USF' },
  { name: 'Fundación Salud Isla', mark: 'FSI' },
  { name: 'Hospital Costa Norte', mark: 'HCN' },
  { name: 'Caribbean Health Network', mark: 'CHN' },
  { name: 'Fondation Santé Nord', mark: 'FSN' },
  { name: 'Water for Bateyes', mark: 'WFB' },
  { name: 'Health Bridge Canada', mark: 'HBC' },
];

export type IconName =
  | 'arrow' | 'arrowLeft' | 'heart' | 'stethoscope' | 'clipboard' | 'book' | 'baby' | 'droplet' | 'sprout'
  | 'users' | 'hand' | 'plane' | 'handshake' | 'mail' | 'phone' | 'pin' | 'clock' | 'instagram'
  | 'facebook' | 'youtube' | 'linkedin' | 'whatsapp' | 'check' | 'plus' | 'close' | 'menu' | 'calendar'
  | 'download' | 'shield' | 'quote' | 'pill' | 'home' | 'globe';
