# KICH — Kerolle Initiative for Community Health (Demo)

Sitio demo bilingüe (ES/EN) para KICH, organización sin fines de lucro de salud comunitaria en República Dominicana y Haití. Desarrollado por NEXIX Tech Studio.

> **Demo:** cifras, nombres, historias, aliados y eventos son ilustrativos. Los formularios y la donación son solo UI (no envían datos ni procesan pagos).

## Stack

React 18 · TypeScript · Vite · Framer Motion · React Router · CSS puro (sin Tailwind)

## Comandos

```bash
npm install
npm run dev      # desarrollo
npm run build    # producción → /dist
```

## Estructura

```
src/
  i18n/          es.ts (por defecto) · en.ts · contexto de idioma (persistido en localStorage)
  components/    Navbar, Footer, WhatsAppFloat, HispaniolaMap, forms, motion (RevealText, MagneticButton, AnimatedCounter, ParallaxImage)
  sections/      Secciones del Home
  pages/         About, Programs, GetInvolved, RequestHelp, Donate, Stories, Contact, NotFound
  styles/        tokens · base · components · sections · pages
  data/site.ts   WhatsApp, correos, imágenes y datos no textuales
public/images/   Fotos optimizadas en WebP (gallery/ = 24 fotos reales de la galería, versión grande + miniatura)
docs/research.md Investigación de referencias
docs/technical-file.md Ficha técnica oficial del cliente (fuente de datos reales)
```

## Reemplazar contenido

- **Textos:** `src/i18n/es.ts` y `src/i18n/en.ts` (palabras entre `*asteriscos*` se muestran en itálica).
- **Fotos:** sustituir los archivos en `public/images/` manteniendo el nombre.
- **Contacto:** `src/data/site.ts` (WhatsApp +1 829 702 1591, correos @kich.org).
