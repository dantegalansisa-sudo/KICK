// Datos no textuales compartidos entre idiomas.

export const SITE = {
  whatsapp: '18297021591',
  whatsappDisplay: '+1 (829) 702-1591',
  instagram: 'https://instagram.com/kerolleinitiative',
  instagramHandle: '@kerolleinitiative',
  facebook: 'https://facebook.com/',
  youtube: 'https://youtube.com/',
  linkedin: 'https://linkedin.com/',
  // Correos reales: institucional (recibe formularios) y del Director Ejecutivo.
  emails: { institution: 'kerolle.initiative.health@gmail.com', director: 'rkerollemd@aol.com' },
  orcid: 'https://orcid.org/0009-0009-4427-3047',
  orcidId: '0009-0009-4427-3047',
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
  clinics: { image: '/images/clinic-elders.webp', icon: 'stethoscope' },
  nutrition: { image: '/images/community-garden.webp', icon: 'sprout' },
  srh: { image: '/images/home-visit.webp', icon: 'heart' },
  immunization: { image: '/images/kerolle-child.webp', icon: 'baby' },
  wash: { image: '/images/hygiene-workshop.webp', icon: 'droplet' },
  schools: { image: '/images/children-education.webp', icon: 'book' },
  training: { image: '/images/medical-students.webp', icon: 'clipboard' },
};

// Carrusel del hero: mezcla de comunidades dominicanas y haitianas (mismo orden que hero.slides).
export const HERO_SLIDES = [
  '/images/hero-community-care.webp',
  '/images/kerolle-child.webp',
  '/images/team-group.webp',
  '/images/medical-students.webp',
  '/images/children-education.webp',
  '/images/team-celebration.webp',
];

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

// Íconos para las categorías de aliados (textos en i18n: partners.items).
export const PARTNER_ICONS: IconName[] = ['book', 'stethoscope', 'handshake', 'heart', 'users', 'home'];

// Íconos de las áreas de enfoque (programsPage.focus).
export const FOCUS_ICONS: IconName[] = ['stethoscope', 'baby', 'book', 'sprout', 'droplet', 'clipboard', 'globe', 'plane'];

// Íconos de la estructura organizativa (aboutPage.structure).
export const STRUCTURE_ICONS: IconName[] = ['users', 'shield', 'stethoscope', 'hand', 'clipboard'];

export type IconName =
  | 'arrow' | 'arrowLeft' | 'heart' | 'stethoscope' | 'clipboard' | 'book' | 'baby' | 'droplet' | 'sprout'
  | 'users' | 'hand' | 'plane' | 'handshake' | 'mail' | 'phone' | 'pin' | 'clock' | 'instagram'
  | 'facebook' | 'youtube' | 'linkedin' | 'whatsapp' | 'check' | 'plus' | 'close' | 'menu' | 'calendar'
  | 'download' | 'shield' | 'quote' | 'pill' | 'home' | 'globe';
