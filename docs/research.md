# research.md — KICH (Kerolle Initiative for Community Health) Demo Website

> Content & structure base for Claude Code. Date of research: 2026-10-06.
> Legend: **[INVENTED]** = placeholder data, must be confirmed by client · **[VERIFY]** = found in a public source but may be outdated · **[PENDING]** = could not be inspected, fill manually.

### Research coverage & limits (read first)
| Source | Status |
|---|---|
| offbeattravel.com — Home, DR destination, Our Story, Responsible Travel, Safety, Education Abroad, Blog | ✅ Inspected |
| shinethelight.ca — Home (full nav + sitemap), About the Trips | ✅ Inspected |
| shinethelight.ca — Donate, Apply, Projects, Gala, Contact, Shop | ⚠️ Site returned rate-limit errors (HTTP 429) repeatedly; patterns below are inferred from the Home page + nav and marked [VERIFY] |
| instagram.com/kerolleinitiative | ❌ Instagram blocks automated reading (robots.txt) and the Chrome browser integration was not connected. Section 4 uses public sources about KICH instead; the 20-photo list is a **shot-list template** to fill manually. |
| Public KICH sources used | Old KICH WordPress + Blogspot sites, USF Honors College program pages, 2025 peer-reviewed hypertension study (SAGE / PubMed) |

---

## 1. Executive summary
1. KICH is a Dominican NGO founded by Dr. Reginald Kerolle (2006–2007 [VERIFY]) running free mobile clinics, health education and community programs in north-coast bateyes (Puerto Plata) with a fixed clinic in Villa Ascensión, Montellano, and reach into Haiti.
2. Its strongest, unique assets are **real credibility** (USF Honors partnership since 2016, 200+ students, a 2025 published study with 379 patients) — no reference site has that; lead with it.
3. Take from **Shine The Light**: simple mission story + big impact counters + "upcoming trips" + dual CTA (Apply / Donate). Avoid its thin trip info and lack of a newsletter.
4. Take from **Offbeat**: premium editorial layout, locally-led positioning, safety/trust pillars, multi-step lead form, partner logo strip, impact stats with "since" dates.
5. Site = bilingual (ES/EN), 6 core pages, two conversion paths: **Donate** and **Join a brigade / Partner**, plus a small **Request help** form for communities.

---

## 2. Shine The Light — structure & patterns

### 2.1 Sitemap
- **Home**
- **About** → How We Started · Overview · Meet Our Team · Family Friendly Trips
- **Trips** → About The Trips · Trip Galleries (one page per trip, e.g. "Dominican Dec 2025") · FAQ · Apply
- **Connect** → Contact Us · Testimonials
- **Projects** → Our Projects · far•o Supply Co (fair-trade artisan brand) · Skilled Trades Training
- **Gala** → Gala 2026 · Gala 2024 (one page per edition)
- **Shop** → external Shopify store
- **Donate**
- Utility: Cart

### 2.2 Home — section order
| # | Section | Purpose |
|---|---|---|
| 1 | Hero banner (photo + logo + next trip announcement) | Brand + urgency |
| 2 | Founder/organization overview (dentist + wife, started 2004–05, from dental aid → home building + job training) + "Read More" | Origin story / trust |
| 3 | Impact counters: trips · participants · homes built (3 big numbers) | Proof |
| 4 | Recent trip galleries (4 latest, dated by month/year) + "More galleries" | Activity proof, FOMO |
| 5 | Upcoming trips (3 date ranges) + Apply | Conversion (volunteers) |
| 6 | Initiatives grid (5): clinics · home building · skills training · fair-trade brand · fundraisers | Program overview |
| 7 | Closing CTA: "change a life, it changes yours" style + benefits + Apply / Donate | Dual conversion |
| 8 | Footer: logo + Facebook/Instagram/YouTube | — |

### 2.3 Navigation
- 8 top-level items, 4 with dropdowns; "Donate" is a nav item (not a distinct button style [VERIFY]).
- Platform: Squarespace-style template; standard header, no strong sticky/CTA differentiation [VERIFY].
- CTAs used: Read More · Apply · Donate Now · Learn More.

### 2.4 Donation flow [VERIFY — page not loadable]
- Donate appears in: main nav, closing home section, likely project pages.
- Secondary revenue streams: annual **Gala** (tickets/sponsorship, ticketing probably via third-party platform), **Shop** (Shopify, merch + fair-trade products, 100% profit reinvested), fundraisers tied to a specific community center.
- Takeaway for KICH: diversify giving (donation + event + "sponsor a brigade") but keep it on-site.

### 2.5 How they present things
- **Impact numbers**: 3 counters, cumulative, no time frame.
- **Projects**: icon/photo cards with one-line benefit + Learn More.
- **Trips**: experiential bullet list (build a home in a week, cook local food with families, medical/dental clinic, beach day) + aspirational quote. **No** price, duration, requirements or daily schedule on the overview page → weak.
- **Stories**: separate Testimonials page under Connect (not on home).
- **Events**: one page per gala year (archive effect).
- **Partners**: not shown on home.

### 2.6 Forms
- Trip Apply form (fields not inspectable [PENDING]); typical for this type: name, contact, DOB, trip choice, profession/skills, passport, emergency contact, medical notes.
- Contact form under Connect. No newsletter signup in footer.

### 2.7 Visual
- Typography: clean sans-serif, template default.
- Color: mostly white, photos carry the color; accent in logo tone.
- Photos: volunteer-centric (group shots, building, clinic), gallery-heavy.
- Spacing: standard template blocks; few or no custom animations.

### 2.8 Tone + headline examples (paraphrased)
Warm, faith/service-adjacent, volunteer-focused.
- "Going there changes them — and it changes you."
- "Over 60 trips. Over 100 homes. One growing family."
- "From a dental chair to a whole community."
- "Your next week could build someone's home."

### 2.9 Works / feels outdated
- ✅ Clear founder story, big counters, dated galleries prove activity, dual CTA.
- ❌ Too many nav items, galleries fragmented into many pages, missing practical trip info, no newsletter, shop off-site, volunteer-centered story (the visitor is the hero, not the community), generic template look.

---

## 3. Offbeat Travel — structure & patterns

### 3.1 Sitemap
- **Services** → Travel Partners · Education Abroad · Tailor-Made Travel
- **Destinations** → Costa Rica · Dominican Republic · Puerto Rico
- **About Us** → Our Story · Our Team · Partners · Careers
- **Approach** → Safety and Security · Responsible Travel · Experiential Learning
- **Impact** → annual Impact Report (2025)
- **Blog** (filter by country) · **Contact**
- Legal: Privacy · Terms · Our Photography (photo ethics page — notable)

### 3.2 Home — section order
| # | Section | Purpose |
|---|---|---|
| 1 | Video hero: "locally led experiences in [3 countries]" (countries in italic) + CTAs | Positioning |
| 2 | "Who we serve" — 3 audience cards (partners / educators / families) | Self-segmentation |
| 3 | Photo mosaic (wildlife, community work, colonial city, culture) | Mood |
| 4 | "What sets us apart" — 3 pillars: local expertise · responsible (75%+ of spend stays local) · safety | Differentiation |
| 5 | "The experience" — 5 feature cards (off the tourist trail, all-inclusive custom, one program manager, pre/post resources, 24/7 support) | Reduce friction |
| 6 | Destinations — 3 cards with one striking fact each | Exploration |
| 7 | Testimonials — 4 quotes with name + role + organization | Social proof |
| 8 | Blog — 4 latest posts (Spanish section label "Nuestras Palabras") | SEO / voice |
| 9 | Multi-step "Get started" form | Lead capture |
| 10 | "Trusted by / member of" logo strip (6) | Credibility |
| 11 | Footer: offices (San José + Santo Domingo), email, phone, newsletter, social, full link map | — |

### 3.3 Navigation
- 6 grouped items + Contact button; mega-structure grouped by *intent* (Services / Approach) rather than by internal department.
- CTAs: Get Started · Schedule a Call · Start Planning · Explore [country] · Learn More →.

### 3.4 Donation / impact equivalent
Not a donor site, but the Impact model is reusable: **$300k+ to community projects since 2022 · 117,000+ volunteer hours · 4 years of impact reports · 20+ years on the ground** — every number carries a "since" date. "View the report" CTA.

### 3.5 Key inner pages
- **Dominican Republic**: intro statement + local nickname for the country, regions list, country quick-facts box, 3 sample itineraries (duration + route), photo gallery "colors of DR", testimonial, form. No Haiti mention, no public-health program — KICH can own that niche.
- **Responsible Travel**: framing (communities must own and benefit) → 4 stats → 4 pillars (economic, community-led w/ SDGs + monitoring, respectful engagement incl. child protection & photo guidelines, environment) → testimonials → Contact / View report.
- **Safety**: headline promise → 4 stats (20+ yrs, 50+ training hrs/yr, 100% background-checked, 24/7) → 7 trust blocks (trained local staff, risk plans w/ hospitals & evacuation routes, vendor audits, emergency protocol, external medical partner, memberships, insurance).
- **Education Abroad**: 5-step process (discovery call → proposal in 10–14 days → pre-travel prep → on-ground delivery → debrief + impact report). Very reusable for KICH university partnerships.
- **Our Story**: tagline + mission/vision + co-founder origin narrative (low drama, values-based).
- **Blog**: country filter tabs, cards = flag tag · title · excerpt · author · date · image, "Load more". Mix of local guides + staff reflections.

### 3.6 Form (multi-step, 4 steps)
1. Trip type (partnership / educational / family-individual / corporate-group / other)
2. Destination · month · year · days (ranges) · group size (ranges) · budget tier per person/day
3. First/last name · organization · email · phone · travelers (adults/children)
4. Focus (single choice) · interests (multi-chip, incl. Public Health, Service Learning, Community Development) · how did you hear · free text

### 3.7 Visual
- Typography: elegant pairing — serif/italic accent for key words in headlines + clean sans for body.
- Color: natural, earthy palette; generous white space; photography-led.
- Photos: authentic local people and places, landscape + culture; video hero.
- Interactions: dropdown menus, card hovers, multi-step form with progress, country flags in dropdown.

### 3.8 Tone + headline examples (paraphrased)
Confident, professional, values-driven, bilingual touches.
- "Experiences led by the people who live there."
- "Three countries, roots that go deep."
- "Safety built into every layer."
- "Better trips, stronger communities."
- "Travel that leaves more than it takes."

### 3.9 Works / feels generic
- ✅ Intent-based nav, numbers with dates, safety page, process steps, multi-step form, partner strip, photo-ethics page, local offices in footer.
- ❌ Very long homepage, some stock-like "we're different" pillars, form may be heavy for casual visitors.

---

## 4. KICH — activities, themes, photo selection

> ⚠️ Instagram could not be read. Facts below come from public sources (old KICH sites, USF, 2025 study). **Dante: confirm with the client and with the IG feed.**

### 4.1 Verified facts
| Fact | Source |
|---|---|
| Founded by Dr. Reginald Kerolle; dates cited: 2006 (study/WordPress) and Nov 2007 (Blogspot) [VERIFY which] | WordPress, Blogspot, SAGE |
| Vision: a community health organization at the service of people | Blogspot |
| Mission: improve health in vulnerable communities via prevention, primary care, health education — Haiti & DR | Blogspot |
| Values: love, philanthropy, service, solidarity, leadership | Blogspot |
| Free care regardless of religion, politics or gender | Blogspot |
| Fixed clinic in **Villa Ascensión, Montellano** (twice weekly) [VERIFY current] | Blogspot |
| North-coast bateys: **Ascensión, Batey Baraguana, La Cambirma, Loma Blanca, Poncho Mateo**; ~1,500–1,700 people reached [VERIFY] | WordPress |
| Other communities: **Bella Vista**; base area **Sosúa / Puerto Plata** | USF |
| Programs (historic): community clinics, prenatal & pediatric care, HIV-AIDS care, emergency/disaster response, health-worker training & internships, adult literacy, counseling/motivational talks | Blogspot |
| Current activities with USF: mobile clinics, physician shadowing, sustainable gardening / food security, wellness education, global-health lectures by Dr. Kerolle | USF |
| **USF Judy Genshaft Honors College** partnership since 2016, 200+ students; next trip Dec 12–22, 2026 | USF |
| Published study (2025): hypertension awareness in 3 bateys, Puerto Plata, **379 adults** (Dec 2022–Jan 2023); 27% hypertensive, low knowledge levels | SAGE / PubMed |
| Interns 1 week – 3 months (medical students) | WordPress |
| Supplies from donors/volunteers in Canada & USA | WordPress |
| Languages in field: Spanish + Haitian Creole (+ English with US volunteers) | USF |
| Dr. Kerolle quote: nothing good comes from the comfort zone (paraphrased) | USF |
| Team roles: executive director, program director, admin assistant, health professionals, **community health agents**, volunteers, interns | Blogspot |

### 4.2 Themes & values to carry into copy
Free access to health · prevention over cure · education as medicine · community health agents (local leadership) · Dominican–Haitian solidarity · student/academic partnership · "take the initiative" / leaving the comfort zone.

### 4.3 Brand colors & logo
[PENDING] — extract from IG avatar/logo file. Ask the client for the vector logo.

### 4.4 Photo shot list (fill from Instagram — 20 slots)
| # | Post date | Description to look for | Section |
|---|---|---|---|
| 1 | [PENDING] | Wide shot of mobile clinic in a batey, line of patients, mountains/sugarcane behind | Hero |
| 2 | [PENDING] | Dr. Kerolle with stethoscope talking with an elder, eye-level | About / Founder |
| 3 | [PENDING] | Dr. Kerolle teaching students (lecture or field) | About / Partners |
| 4 | [PENDING] | Blood pressure check close-up (hands, cuff) | Programs – Clinics |
| 5 | [PENDING] | Health education talk to a community group | Programs – Education |
| 6 | [PENDING] | Prenatal / mother consult (with consent, dignified) | Programs – Maternal |
| 7 | [PENDING] | Children in a hygiene / nutrition activity, smiling, active | Programs – Education |
| 8 | [PENDING] | Garden / food-security work | Programs – Community dev. |
| 9 | [PENDING] | Pharmacy table / medicine sorting by volunteers | Get involved |
| 10 | [PENDING] | USF students + local agents group photo with banner | Partners / Volunteer |
| 11 | [PENDING] | Community health agents (local team) portrait | About / Team |
| 12 | [PENDING] | Fixed clinic exterior, Villa Ascensión | About / Contact |
| 13 | [PENDING] | Haiti activity (any) | Where we work |
| 14 | [PENDING] | Road / truck arriving to community (journey feel) | Stories / Brigades |
| 15 | [PENDING] | Literacy or adult class | Programs |
| 16 | [PENDING] | Celebration / community event / dance | Gallery |
| 17 | [PENDING] | Landscape of north coast community | Section dividers |
| 18 | [PENDING] | Volunteer + patient laughing moment | Stories |
| 19 | [PENDING] | Supplies donation arriving (boxes) | Donate |
| 20 | [PENDING] | Team portrait with logo/T-shirts | Footer CTA / About |

Selection rules: dignity first (no crying/sick children, no "savior" selfies), people active and participating, prefer landscape 16:9 for hero, ≥2000px width, consent for minors.

---

## 5. Recommended sitemap for KICH

```
/                     Inicio / Home
/nosotros  /about     Historia, fundador, misión-visión-valores, equipo, transparencia
/programas /programs  Clínicas móviles · Educación en salud · Salud materno-infantil · Desarrollo comunitario · Formación (agentes, internos)
/donde-trabajamos     Mapa DR + Haití, comunidades
/brigadas  /brigades  Para universidades y voluntarios: cómo funciona, próximas fechas, seguridad, FAQ, formulario
/impacto   /impact    Números, estudio publicado, historias, informes
/donar     /donate    Donación + otras formas de dar
/contacto  /contact   Contacto + "Solicitar ayuda" (comunidades)
/historias /stories   (fase 2) blog/noticias
```
Top nav (5 + CTA): Nosotros · Programas · Brigadas · Impacto · Contacto · **[Donar]** · ES/EN toggle.

### Home — section order
1. **Hero** — photo/video of mobile clinic, headline, sub, CTAs: *Donar* (primary) / *Únete a una brigada* (secondary).
2. **Trust bar** — "Since 2006 · Puerto Plata, DR & Haiti · Partner of USF Honors College" + small logos.
3. **Impact counters** (4) with "since" dates.
4. **Mission in one line + founder** — portrait of Dr. Kerolle + short quote + link to About.
5. **Programs** — 4–5 cards.
6. **Where we work** — stylized map of Hispaniola with community pins.
7. **How a brigade works** — 4 steps + next dates + CTA.
8. **Evidence** — the 2025 study highlight ("We don't guess, we measure").
9. **Story** — one featured story (patient/agent/student), pull-quote.
10. **Partners** logo strip.
11. **Donate band** — 3 tiers with tangible outcomes + monthly toggle.
12. **Request help / Contact** — split card: "¿Tu comunidad necesita apoyo?" / "¿Quieres colaborar?".
13. **Footer** — address, WhatsApp, email, social, newsletter, legal + registration number [INVENTED].

---

## 6. Recommended content per section (draft copy)

### 6.1 Hero
- **ES:** "Salud que llega a donde hace falta." / Sub: "Clínicas móviles, educación en salud y desarrollo comunitario en República Dominicana y Haití. Toma la iniciativa."
- **EN:** "Health care that goes where it's needed." / Sub: "Mobile clinics, health education and community development in the Dominican Republic and Haiti. Take the initiative."
- CTAs: **Donar / Donate** · **Únete a una brigada / Join a brigade**

### 6.2 Trust bar
- ES: "Desde 2006 · Puerto Plata, RD y Haití · Aliados de la Universidad del Sur de Florida (USF)"
- EN: "Since 2006 · Puerto Plata, DR & Haiti · Partnered with the University of South Florida"

### 6.3 Impact counters
| Value | ES | EN | Status |
|---|---|---|---|
| 20 | años de servicio | years of service | from 2006 founding [VERIFY] |
| 1,700+ | personas atendidas por año | people reached per year | [VERIFY] |
| 200+ | estudiantes universitarios formados desde 2016 | university students trained since 2016 | USF source |
| 10+ | comunidades atendidas | communities served | [INVENTED] |
| 5,000+ | consultas gratuitas | free consultations | [INVENTED] |

### 6.4 Founder block
- ES: "El Dr. Reginald Kerolle, médico y salubrista (MD, MPH), fundó KICH con una idea sencilla: la salud no debería depender de dónde naciste. Hoy, junto a agentes comunitarios, voluntarios y universidades, llevamos atención y educación a bateyes y comunidades rurales."
- EN: "Dr. Reginald Kerolle, physician and public health specialist (MD, MPH), founded KICH on a simple idea: your health shouldn't depend on where you were born. Today, with community health agents, volunteers and universities, we bring care and education to bateyes and rural communities."
- Quote (paraphrased from public source): ES "Nada bueno nace de la zona de confort." / EN "Nothing good grows in the comfort zone."

### 6.5 Programs
| Program | ES | EN |
|---|---|---|
| Clínicas móviles / Mobile clinics | Consultas, presión arterial, glucosa y medicamentos gratuitos en la comunidad. | Free check-ups, blood pressure, glucose screening and medicine, on site. |
| Educación en salud / Health education | Charlas sobre hipertensión, nutrición, higiene y salud sexual, en español y creole. | Talks on hypertension, nutrition, hygiene and sexual health — in Spanish and Creole. |
| Salud materno-infantil / Mother & child | Control prenatal y pediátrico para familias sin acceso a un centro de salud. | Prenatal and pediatric follow-up for families far from a health center. |
| Desarrollo comunitario / Community development | Huertos, seguridad alimentaria y alfabetización de adultos. | Gardens, food security and adult literacy. |
| Formación / Training | Agentes comunitarios de salud e internados para estudiantes de medicina (1 semana a 3 meses). | Community health agents and internships for medical students (1 week to 3 months). |

### 6.6 Where we work
- Pins: Villa Ascensión (Montellano) — fixed clinic [VERIFY] · Batey Baraguana · La Cambirma · Loma Blanca · Poncho Mateo · Bella Vista · Sosúa area · Haiti: [PENDING — community names from IG/client].
- ES: "Trabajamos en la costa norte de la isla, donde el centro de salud más cercano puede estar a horas de camino." EN: "We work on the island's north coast, where the nearest clinic can be hours away." [INVENTED detail on distance]

### 6.7 Brigades (for universities/volunteers)
- ES title: "Ven a aprender. Quédate a servir." EN: "Come to learn. Stay to serve."
- Steps (adapted from Offbeat's process): 1 Llamada inicial / Discovery call → 2 Propuesta a la medida en 2 semanas / Custom proposal in 2 weeks [INVENTED timing] → 3 Preparación: orientación cultural, idioma, protocolos / Pre-departure prep → 4 Brigada en terreno con equipo local / Field brigade with local team → 5 Informe de impacto / Impact report.
- Next dates: Dec 12–22, 2026 (USF Honors) + 2 more [INVENTED].
- Practical box (what Shine The Light lacked): duration 7–14 days [INVENTED] · lodging with host families · includes local transport, meals, translation [INVENTED] · requirements: 18+, travel insurance, vaccination per CDC [INVENTED] · honest note: heat, walking, hills, power outages.
- Safety pillars: local team on call 24/7 [INVENTED] · medical supervision by Dr. Kerolle · emergency plan per community with nearest hospital [INVENTED].

### 6.8 Evidence
- ES: "No adivinamos: medimos. En 2025 publicamos junto a USF un estudio con 379 adultos de tres bateyes de Puerto Plata: 1 de cada 4 tenía hipertensión y la mayoría no conocía la enfermedad. Por eso la educación es parte de cada consulta."
- EN: "We don't guess — we measure. In 2025, with USF, we published a study of 379 adults in three Puerto Plata bateyes: 1 in 4 had high blood pressure and most knew little about it. That's why education is part of every visit."
- CTA: "Leer el estudio / Read the study" → SAGE link.

### 6.9 Featured story [INVENTED — replace with real one]
- ES: "Doña Altagracia, 64, descubrió su hipertensión en una clínica móvil. Hoy mide su presión cada mes con la agente comunitaria de su batey." EN equivalent.

### 6.10 Partners
University of South Florida — Judy Genshaft Honors College (verified) · donor networks in Canada & USA (verified, unnamed) · [PENDING: hospitals, ministries, other universities from IG].

### 6.11 Donate band
- ES: "Tu aporte se convierte en consultas." EN: "Your gift becomes check-ups."
- Tiers [INVENTED amounts]: US$25 → medicines for one family's month · US$75 → one day of mobile clinic supplies · US$250 → training one community health agent. Toggle: Una vez / Mensual — One-time / Monthly.

### 6.12 Footer microcopy
- ES: "Atención gratuita sin distinción de religión, política ni género." EN: "Free care regardless of religion, politics or gender." (verified value)

---

## 7. Donation & "request help" flow

### 7.1 Donate (`/donar`)
- **Entry points:** sticky nav button (always visible), hero, donate band on every page, end of each program page, post-brigade-form thank-you page.
- **Step 1:** frequency toggle (Monthly preselected, softly) → amount chips (25 / 50 / 75 / 250 / other) each with an outcome line → optional "dedicate to a program" select (Clinics, Mother & child, Education, Where most needed).
- **Step 2:** name, email, country, (optional) phone/WhatsApp, "make it anonymous" checkbox, newsletter opt-in.
- **Step 3:** payment (Stripe/PayPal for USD; local DR option: bank transfer details/Azul [VERIFY with client]).
- **Thank-you:** personalized message from Dr. Kerolle, share buttons, "join a brigade" cross-sell.
- **Other ways to give (cards below form):** in-kind medical supplies (list of most-needed items + drop-off) · corporate/foundation sponsorship ("sponsor a brigade day") · university partnership · fundraise for us (birthday/event).
- **Trust:** where money goes (pie: e.g. 80% programs [INVENTED]), legal registration [INVENTED], annual report download (phase 2), US tax-deductibility status [PENDING — likely needs a US fiscal sponsor].
- Demo: buttons can point to a mock checkout; no real payment in demo.

### 7.2 Request help (`/contacto#solicitar-ayuda`) — for community leaders, schools, churches
Short, mobile-first, Spanish default, WhatsApp-friendly:
1. Nombre y rol (líder comunitario, maestro, iglesia, junta de vecinos…)
2. Comunidad / sector + provincia o departamento (RD / Haití)
3. Tipo de apoyo: clínica móvil · charla educativa · salud materna · emergencia · otro
4. Personas aproximadas a beneficiar (rangos)
5. Fecha deseada / urgencia
6. Teléfono / WhatsApp (required) · email (optional)
7. Mensaje libre
- Confirmation: "Recibimos tu solicitud. Nuestro equipo te contactará por WhatsApp en un máximo de 7 días." [INVENTED SLA]
- Floating WhatsApp button site-wide.

### 7.3 Brigade/partnership lead form (multi-step, from Offbeat)
1. Tipo: universidad · grupo de salud · voluntario individual · empresa · otro
2. Fechas tentativas (mes/año), duración (rangos), tamaño del grupo (rangos)
3. Nombre, institución, email, teléfono, país
4. Intereses (chips): atención primaria, salud materna, educación, investigación, huertos/seguridad alimentaria, idioma/cultura · ¿cómo nos conociste? · mensaje

---

## 8. Visual direction

### 8.1 Palette
Logo colors [PENDING]. Until confirmed, proposed system [INVENTED]:
| Token | Hex | Use |
|---|---|---|
| `--primary` (deep health green) | `#0F5C4D` | Headers, nav, primary text accents |
| `--accent` (warm sunrise / coral) | `#E8743B` | Donate button, key CTAs only |
| `--sky` (Caribbean blue) | `#2A8FBD` | Links, map, icons |
| `--sand` | `#F6F1E9` | Section backgrounds |
| `--ink` | `#1B1F1E` | Body text |
Rule: replace primary/accent with logo colors once extracted; keep the accent exclusive to Donate.

### 8.2 Typography
- Headlines: editorial serif with italic accent words (e.g. *Fraunces* or *Playfair Display*) — Offbeat-style italic on key words: "Salud que llega *a donde hace falta*."
- Body/UI: humanist sans (*Inter* or *DM Sans*), 17–18px body, generous line-height 1.6.

### 8.3 Photography
Real IG photos only, warm natural grading, eye-level, people active. Duotone (primary green) for section backgrounds behind text. No stock photos of "sad children".

### 8.4 Layout & animation ideas (align with NEXIX stack: React + Vite + Framer Motion)
- Counters animate on scroll into view.
- Hero: slow Ken-Burns on photo or muted short video loop of clinic day.
- Text reveal masks on serif headlines.
- Hispaniola map with pins drawing in + hover cards per community.
- Brigade steps as horizontal scroll-snap timeline on mobile.
- Sticky Donate button that turns solid after hero.
- Respect `prefers-reduced-motion`.

---

## 9. Things to avoid
- **Poverty / victim imagery**: crying or sick children, flies, close-ups of wounds, unconsented minors. Show agency and dignity.
- **White-savior framing**: volunteers as heroes, selfies with kids. The community and local health agents are the protagonists (Shine The Light's main weakness).
- **Generic NGO clichés**: "Together we can change the world", "Make a difference today", hands-holding-globe icons, stock heart icons.
- **Unverified numbers**: launch only with confirmed stats; remove every [INVENTED] before going live.
- **Cluttered nav**: max 5 items + Donate (Shine The Light has 8 with 4 dropdowns).
- **Fragmented galleries**: one filterable gallery, not one page per trip.
- **Missing practical info** for volunteers (cost, dates, requirements).
- **Off-site detours**: keep donation and forms on-site.
- **Haiti stereotypes**: present Haiti with respect and specificity; avoid crisis-only narrative. Bilingual where relevant (consider Creole greetings).
- **Monolingual site**: ES/EN toggle from day one.

---

### Sources
- [Shine The Light Initiative — Home](https://www.shinethelight.ca/) · [About The Trips](https://www.shinethelight.ca/about-the-trips)
- [Offbeat Travel — Home](https://offbeattravel.com/) · [Dominican Republic](https://offbeattravel.com/destinations/dominican-republic) · [Responsible Travel](https://offbeattravel.com/approach/responsible-travel) · [Safety](https://offbeattravel.com/approach/safety-and-security) · [Our Story](https://offbeattravel.com/about/our-story) · [Education Abroad](https://offbeattravel.com/services/education-abroad) · [Blog](https://offbeattravel.com/blog)
- [KICH — WordPress About](https://kerolleinitiative.wordpress.com/about/) · [KICH — Blogspot](http://kerolleinitiativeforcommunityhealth.blogspot.com/)
- [USF Honors — DR Beyond the Classroom](https://www.usf.edu/honors/programs/study-abroad-dominican-republic.aspx) · [USF — DR trip recap 2023](https://www.usf.edu/honors/news/2024/dominican-republic-trip-recap-2023.aspx)
- [Hypertension study in bateyes, 2025 (SAGE)](https://journals.sagepub.com/doi/10.1177/11795468251350224) · [PubMed](https://pubmed.ncbi.nlm.nih.gov/40567282/)
- [KICH Instagram](https://www.instagram.com/kerolleinitiative/) (not readable automatically)
