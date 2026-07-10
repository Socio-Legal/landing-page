# Plan: nueva versión de Sttok.com — estética B2B seria y minimalista

**Fecha:** 9 de julio de 2026
**Objetivo:** mismo contenido, look serio, elegante, formal, simple y minimalista. Que quede clarísimo que Sttok es para empresas serias.
**Repo:** `sttok-web` (Next.js 14, App Router, Tailwind, i18n es/en)

---

## 1. Estado actual (diagnóstico)

### Lo que ya está hecho (rama `fix/update-hero-description`, sin mergear a main)

Dos commits de mayo 2026 ya rediseñaron la **home** completa:

- `a7b5292` — rediseño visual: paleta crema cálido / dark slate, tipografía Instrument Serif (títulos) + Inter (UI), mega menú estilo Stripe, hero sobrio con señales de confianza ISO/RGPD/SSL, footer de 5 columnas, sitemap/robots/llms.txt, analytics GTM.
- `ca671c3` — copy orientado a comprador B2B: nuevo H1, sección de KPIs (250 empresas, 20.000M€ en equity, 250.000 socios), sección Seguridad (6 cards), Integraciones, ancla de precios (desde 550€/sociedad/año), IA como asistente societario, perfiles "Hoy / Con Sttok / Caso real".
- `mockup/index.html` — mockup v3 de la cabecera (referencia de diseño aprobada).

### Lo que queda con la estética antigua (el grueso del trabajo)

**~29 páginas** fuera de la home siguen con el look startup/espacial que contradice el posicionamiento serio:

| Grupo | Páginas | Estética actual |
|---|---|---|
| Producto | 6 (product, partners-book, incentive-plans, shareholder-meetings, secondary-market, operation-drafts) | Hero con blurs de colores + BorderBeam animado |
| Soluciones | 5 (companies, startups, lawyers, investors, investors-dashboard) | Ídem |
| Precios | 1 | `planet-stars-header`: fondo espacial con planeta y estrellas animadas |
| Testimonios | 1 índice + páginas por cliente | Estilo antiguo |
| Recursos | 1 | Animaciones decorativas |
| Legales | 3 (privacy, disclaimer, security) | Hero con blurs |
| SEO (empty-pages) | 10 páginas de captación | Por revisar/unificar |

Componentes antiguos a purgar: `planet-stars-header`, `components/animated/*` (beams), `components/styles/blur-styles.ts`, blurs `blur-01..15.svg`, restos de magicui (BorderBeam) y gradientes de texto.

### Activos de credibilidad disponibles (infrautilizados fuera de la home)

- **Logos de clientes de peso:** PwC, AXA, Andbank, MyInvestor, Bureau Veritas, Broseta, Factorial, PLD Space, TaxDown, Cabiedes & Partners, Criptan, Letslaw, derecho.com…
- **Certificaciones:** ISO 27001, GDPR compliant, SSL.
- Capturas de producto light/dark ya generadas.

---

## 2. Principios de diseño (sistema ya validado en la home)

1. **Paleta:** crema cálido `#F4F3EF` / dark slate. Sin gradientes decorativos, sin blurs, sin animaciones de fondo.
2. **Tipografía:** Instrument Serif para H1/H2 (elegancia editorial), Inter para todo lo demás.
3. **Prueba social primero:** logos en grayscale con hover, certificaciones visibles, casos reales con nombre (AXA, Factorial, PLD Space).
4. **Movimiento mínimo:** solo transiciones funcionales (hover, acordeones). Nada de beams, shimmers ni estrellas.
5. **Mismo contenido:** no se reescribe copy salvo donde el componente nuevo lo exija estructuralmente. Reglas de estilo ya fijadas: tuteo, sin em-dash, anglicismos con traducción entre paréntesis, sin claims sin respaldo.
6. **Bilingüe siempre:** cada cambio toca ES y EN a la vez.

---

## 3. Plan de ataque por fases

### Fase 0 — Consolidar la base (previo)
- Merge de `fix/update-hero-description` a `main` (la home rediseñada aún no está desplegada como base).
- Crear rama `feature/redesign-inner-pages`.
- Captura de pantalla "antes" de las ~29 páginas (es/en, light/dark) como referencia de QA.

### Fase 1 — Componentes compartidos del nuevo sistema (la palanca)
Crear una vez, usar en todas las páginas:
- `InnerHero`: hero interior sobrio (badge + H1 serif + descripción + CTA + imagen de producto), sustituye a los heros con blur y a `planet-stars-header`.
- `SectionHeader` unificado (ya existe parcialmente, alinear con la home).
- `LogoStrip` reutilizable (logos grayscale) para insertar prueba social en páginas interiores.
- `TrustBadges` (ISO 27001 / RGPD / SSL) reutilizable.

### Fase 2 — Migración por grupos (orden por impacto comercial)
1. **Precios** — la página más sensible para "empresa seria"; eliminar el fondo espacial es prioridad nº 1.
2. **Producto** (6 páginas) — comparten `product/hero-section`; migrar el hero compartido resuelve el 80%.
3. **Soluciones** (5 páginas).
4. **Testimonios** (índice + fichas de cliente) — aquí los logos y casos reales son el argumento; darles tratamiento premium sobrio.
5. **Recursos + Legales** (4 páginas) — las legales refuerzan seriedad: tipografía limpia, sin decoración.
6. **Empty-pages SEO** (10 páginas) — unificar con el layout nuevo.

Cada grupo = 1 commit revisable, con verificación visual en dev server.

### Fase 3 — Purga y limpieza
- Eliminar `planet-stars-header`, `animated-beam*`, `blur-styles`, SVGs blur-01..15 y CSS muerto de `globals.css` (hay ~250 líneas de utilidades legacy).
- Eliminar dependencias que queden huérfanas.

### Fase 4 — QA integral
- Recorrido completo es/en × light/dark × móvil/desktop.
- `pnpm lint && pnpm build` sin errores.
- Comprobar navegación (mega menú → todas las páginas), formularios de demo, enlaces del footer.
- Lighthouse en home, precios y una de producto (el borrado de animaciones debería mejorar rendimiento).
- Comparativa antes/después con las capturas de Fase 0.

### Fase 5 — Revisión y despliegue
- PR a `main` con capturas antes/después por grupo.
- Preview de Vercel para revisión final de Martí.
- Merge y verificación en producción.

---

## 4. Decisiones abiertas (no bloqueantes, propongo default)

1. **¿Mergear primero la home rediseñada a main?** Propongo que sí (Fase 0); lleva desde mayo sin desplegar.
2. **Dark mode:** propongo mantenerlo (ya existe y el dark slate es elegante), pero verificarlo página a página.
3. **Empty-pages SEO:** propongo solo unificar estética, sin tocar contenido/keywords.
4. **Mockup v3 de cabecera** (`mockup/index.html`): confirmar que es la referencia vigente para el header definitivo.

---

## 4b. Decisiones aprobadas (10 de julio de 2026)

- **Dirección visual aprobada** sobre la propuesta `mockup/propuesta-rediseno-interiores.html`.
- **Navy #1B2141** (hue de marca oscurecido) para superficies oscuras y acentos de énfasis; texto sigue en tinta cálida.
- **Logos en dos niveles**: (1) AXA, Andbank, Factorial, Multiverse Computing, PLD Space, Osborne; (2) Caballero 1830, TaxDown, MyInvestor, Barkibu, Derecho.com. Pendiente: archivo oficial de Osborne en `public/logo-osborne.png`.
- **ISO 27001 siempre con el sello de Bureau Veritas** (`public/logo-bureau-veritas.png`).
- **Criterio anti-plantilla-IA**: sin fondos de puntitos, radios 2–4px, cabeceras de sección a la izquierda con filete doble (estilo balance), checks en gris tinta, sin chips-píldora ni iconos en cajitas, cursivas de Instrument Serif en frases clave. Este criterio se aplica también retroactivamente a la home rediseñada en mayo (usa dot-grid, radios 6px+ y chips-píldora).

## 4c. Requisitos SEO y GEO (añadidos 10 de julio de 2026)

Cada página migrada debe salir mejor posicionable de lo que entró, tanto para buscadores (SEO) como para motores generativos tipo ChatGPT/Perplexity/Claude (GEO):

**SEO técnico:**
- Metadata completa por página (title, description, keywords ya existen en los JSON de locales; usarlos vía `generateMetadata` de Next.js en lugar de client components donde sea posible).
- Jerarquía semántica estricta: un solo H1 por página, secciones con H2/H3 reales.
- JSON-LD: `Organization` global; `Product` + `Offer` en Precios; `FAQPage` donde haya preguntas; `BreadcrumbList` en páginas interiores.
- `hreflang` es/en, canonicals, alt descriptivos en logos e imágenes de producto.
- Rendimiento: la purga de animaciones/blurs debe reflejarse en LCP/CLS (medir con Lighthouse antes/después).

**GEO (Generative Engine Optimization):**
- Mantener y ampliar `public/llms.txt` con datos citables: qué es Sttok, cifras (250 empresas, 20.000M€, 250.000 socios), certificaciones, precios desde, clientes de referencia.
- Copy con afirmaciones factuales y autocontenidas (los LLM citan frases completas, no párrafos de marketing).
- Los testimonios y casos con nombre, cargo y empresa son oro para GEO: mantenerlos en HTML plano, no en carruseles JS.

**Documento descargable (comercial + GEO):**
- Crear un dossier comercial de Sttok en PDF (es y en): qué es, módulos, cifras, seguridad/certificaciones, logos de clientes, planes y precios, contacto.
- Publicarlo en `/public/docs/` y enlazarlo desde Precios y el bloque CTA ("Descargar dossier (PDF)").
- Doble función: material que ventas puede adjuntar, y documento indexable por crawlers de buscadores y de IA.
- Mantenerlo versionado en el repo para que ventas siempre enlace la última versión.

## 5. Orden de ejecución propuesto

| Paso | Entregable | Tamaño |
|---|---|---|
| 0 | Merge home + rama nueva + capturas "antes" | S |
| 1 | Componentes compartidos (InnerHero, LogoStrip, TrustBadges) | M |
| 2.1 | Precios sin planeta | S |
| 2.2 | 6 páginas de Producto | M |
| 2.3 | 5 páginas de Soluciones | M |
| 2.4 | Testimonios | S |
| 2.5 | Recursos + Legales | S |
| 2.6 | 10 empty-pages SEO | S |
| 3 | Purga de componentes y CSS legacy | S |
| 4 | QA integral + Lighthouse | M |
| 5 | PR con capturas + deploy | S |
