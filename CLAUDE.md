# CLAUDE.md

Notas de arquitectura y convenciones de este repositorio. Solo contenido
técnico: **el repositorio es público**.

## Stack

Next.js 15.5.20 (App Router) + React 19, TypeScript, Tailwind. Desplegado en
Vercel. Gestor de paquetes **pnpm 9** (`pnpm-lock.yaml` es `lockfileVersion: 9.0`;
una versión anterior de pnpm aborta con `ERR_PNPM_LOCKFILE_BREAKING_CHANGE`).

```
pnpm install --frozen-lockfile
pnpm build      # valida enlaces de content/ y luego next build
pnpm start
```

## Idiomas y URLs

El castellano es el idioma por defecto y **vive en la raíz, sin prefijo**. Los
demás idiomas viven bajo un prefijo de URL (`/en`).

- `lib/locales.ts` declara `LOCALE_PREFIX` y `localeFromPathname()`. **Es el
  único sitio donde se decide a qué idioma pertenece una ruta.** No compares
  contra `"/en"` a mano en ningún otro archivo.
- `middleware.ts` resuelve el idioma y lo expone en las cabeceras `x-locale` y
  `x-pathname`. El layout raíz las lee para emitir `<html lang>` y las migas.
- `app/[locale]/**` sirve **todos** los idiomas con prefijo desde un solo árbol:
  `layout.tsx`, `page.tsx` (portada del idioma) y `[...slug]/page.tsx`. No se
  crea una carpeta por página y por idioma.
- `lib/page-registry.ts` asocia cada ruta castellana con su componente y la
  metadata de cada idioma. Añadir un idioma a una página es añadir una clave.
- `lib/localized-href.ts` (`ROUTE_MAP`) es el mapa de rutas bilingües. Estar en
  él es lo que hace que una página emita hreflang: `lib/seo.ts` lo deriva de
  ahí, no se declara página a página.

## Rutas castellanas y carpetas internas

Las carpetas de `app/` tienen nombre en inglés (`partners-book`, `pricing`) pero
la URL pública es el slug castellano (`/libro-de-socios`, `/precios`).

`next.config.mjs` define **un solo mapa**, `ES_TO_FOLDER`, del que salen dos
cosas que no pueden desincronizarse:

- el **rewrite** que sirve la página (`/libro-de-socios` → `/partners-book`)
- el **301** que evita el duplicado (`/partners-book` → `/libro-de-socios`)

Sin ese 301 la carpeta interna sería también una URL pública con el mismo
contenido. Al añadir una página, añade su par al mapa y no toques nada más.

Las redirecciones usan `statusCode: 301` explícito. `permanent: true` emite
**308**, no 301.

## Contenido en MDX

Las secciones `/soluciones`, `/comparativas` y `/guias` son carpetas castellanas
reales, sin rewrite detrás, fuera de `ROUTE_MAP` y fuera de i18next.

- El contenido vive en `content/<sección>/*.mdx`. **La URL la manda la ruta del
  archivo**, no el frontmatter: `content/soluciones/index.mdx` → `/soluciones`,
  `content/soluciones/x.mdx` → `/soluciones/x`.
- `lib/content.ts` valida que el `slug` y el `canonical` del frontmatter
  coincidan con la ruta del archivo, y **falla el build** si no.
- `dynamicParams = false`: un slug inexistente devuelve 404, no una plantilla
  vacía con 200.
- Las tablas necesitan `remark-gfm`; ya está conectado en
  `components/shared/doc-page.tsx`.
- El sitemap, las migas y los enlaces entre páginas de la misma sección se
  generan solos. Una página nueva es **un solo archivo**.

## i18n

Instancias de i18next **fijas por idioma**, creadas en `lib/i18n.ts` con
`lng` inmutable. No hay detector de idioma ni singleton mutable: en SSR, mutar
el idioma global haría que peticiones concurrentes se pisaran.

Las traducciones se importan **estáticamente** en `lib/loadTranslations.ts`, así
que el texto está en el HTML del servidor desde el primer render. No se cargan
por HTTP en tiempo de ejecución.

`lib/locales.ts` no importa nada: lo usan el middleware (edge), Server
Components y Client Components, y tiene que funcionar en los tres. Los Server
Components que solo necesiten el tipo o las constantes deben importar de ahí y
no de `lib/i18n.ts`, que arrastra `react-i18next`.

## SEO y datos estructurados

- `lib/seo.ts` (`buildMetadata`) genera title, description, canonical, Open
  Graph, Twitter y hreflang. El canonical apunta **siempre al slug público**,
  nunca a la carpeta interna.
- `lib/structured-data.ts` y `components/shared/json-ld.tsx` para JSON-LD.
- `lib/breadcrumbs.ts` emite `BreadcrumbList` desde el layout raíz para todo el
  sitio; las páginas de `content/` se resuelven solas.

## Cómo se verifica

**Sobre el HTML realmente servido, con peticiones HTTP sin ejecutar
JavaScript.** El análisis estático del código no basta: los desplegables de
Radix, por ejemplo, no viajan en el HTML, así que un enlace que solo vive ahí no
existe para un rastreador.

```
pnpm build && pnpm start          # y curl contra localhost
pnpm check:orphans                # páginas sin enlaces entrantes
pnpm check:orphans https://…      # también contra producción
node scripts/snapshot-en.mjs      # foto de las rutas /en, para refactors
```

`scripts/check-content-links.mjs` va dentro de `pnpm build` y detiene la
compilación si un documento de `content/` enlaza a una ruta que no existe.

Para un refactor que no debe cambiar nada, toma una foto **antes** con
`snapshot-en.mjs` y compárala después. Un PR no se da por verificado hasta
comprobarlo en producción tras el despliegue.

## Detalles que sorprenden

- **Todo el sitio es SSR dinámico**: el layout raíz llama a `headers()`, así que
  no hay prerenderizado ni caché de CDN en ninguna ruta.
- `app/[locale]/layout.tsx` aplica un `marginTop: -56px` a todas las rutas con
  prefijo, no solo a la portada. Es incoherente con el castellano y está
  anotado en el propio archivo.
- `app/solutions/` no tiene `page.tsx`: es solo un prefijo de ruta de las cinco
  páginas de soluciones. La sección castellana vive en `app/soluciones/`.
- Los archivos de `config/*.ts` conservan objetos de contenido que ya **no se
  usan**; de ellos solo sigue vivo el export `metadata`.
