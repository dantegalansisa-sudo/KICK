// Galería: fotos reales de KICH (carpeta FOTOS GALERY), optimizadas en /public/images/gallery.
// Los textos (pies de foto y categorías) viven en i18n: galleryPage.captions / galleryPage.filters.

export type GalleryCategory = 'health' | 'children' | 'community' | 'study' | 'sustainability';

export interface GalleryPhoto {
  id: string;
  cat: GalleryCategory;
  w: number;
  h: number;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: 'medical-team', cat: 'health', w: 720, h: 960 },
  { id: 'first-aid-training', cat: 'health', w: 872, h: 703 },
  { id: 'hypertension-talk', cat: 'health', w: 960, h: 1280 },
  { id: 'community-health-talk', cat: 'health', w: 751, h: 720 },
  { id: 'reading-together', cat: 'children', w: 960, h: 1280 },
  { id: 'circle-game', cat: 'children', w: 1280, h: 960 },
  { id: 'chess-club', cat: 'children', w: 960, h: 1280 },
  { id: 'drawing-workshop', cat: 'children', w: 1280, h: 960 },
  { id: 'street-checkup', cat: 'children', w: 1280, h: 960 },
  { id: 'kids-activity', cat: 'children', w: 1400, h: 1050 },
  { id: 'kerolle-with-kids', cat: 'community', w: 960, h: 1280 },
  { id: 'colorful-neighborhood', cat: 'community', w: 1280, h: 960 },
  { id: 'kerolle-community-walk', cat: 'community', w: 774, h: 1032 },
  { id: 'kerolle-neighborhood', cat: 'community', w: 774, h: 1032 },
  { id: 'street-visit', cat: 'community', w: 1280, h: 960 },
  { id: 'global-health-lecture', cat: 'study', w: 1400, h: 1050 },
  { id: 'outdoor-seminar', cat: 'study', w: 1280, h: 960 },
  { id: 'puerto-plata-group', cat: 'study', w: 716, h: 960 },
  { id: 'usf-students', cat: 'study', w: 1400, h: 630 },
  { id: 'field-agriculture-lesson', cat: 'sustainability', w: 960, h: 1280 },
  { id: 'tree-planting', cat: 'sustainability', w: 720, h: 960 },
  { id: 'aquaculture-pond', cat: 'sustainability', w: 960, h: 1280 },
  { id: 'banana-harvest', cat: 'sustainability', w: 960, h: 1280 },
  { id: 'drainage-cleanup', cat: 'sustainability', w: 960, h: 1280 },
];

export const GALLERY_CATEGORIES: GalleryCategory[] = ['health', 'children', 'community', 'study', 'sustainability'];

export const photoSrc = (id: string) => `/images/gallery/${id}.webp`;
export const photoThumb = (id: string) => `/images/gallery/${id}-sm.webp`;

// Selección para la vista previa del Home (orden pensado para el mosaico).
export const HOME_GALLERY_IDS = ['medical-team', 'reading-together', 'circle-game', 'kerolle-with-kids', 'outdoor-seminar', 'colorful-neighborhood'];
