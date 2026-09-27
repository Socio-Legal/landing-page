import { LOCALE_PREFIX, LOCALES, type Locale } from "@/lib/locales";
import { ROUTE_MAP } from "@/lib/localized-href";

/**
 * Resolucion de rutas de los idiomas que viven bajo un prefijo de URL.
 *
 * El idioma por defecto (castellano) vive en la raiz y lo sirven las carpetas
 * de app/ de siempre. Todo lo que lleva prefijo —hoy /en, mañana /co y /mx—
 * lo sirve un unico arbol app/[locale]/**, que resuelve slug y metadata desde
 * ROUTE_MAP y PAGE_REGISTRY en vez de tener una carpeta por pagina y idioma.
 */

/** Idiomas con prefijo: todos menos el de la raiz. */
export const PREFIXED_LOCALES: Locale[] = LOCALES.filter(
  (l) => LOCALE_PREFIX[l] !== "",
);

/** Segmento [locale] de un idioma: prefijo "/en" -> segmento "en". */
export const localeSegment = (locale: Locale): string =>
  LOCALE_PREFIX[locale].replace(/^\//, "");

/** Idioma de un segmento de URL, o null si ese segmento no es un idioma. */
export function localeFromSegment(segmento: string): Locale | null {
  return (
    PREFIXED_LOCALES.find((l) => localeSegment(l) === segmento) ?? null
  );
}

/** Ruta con prefijo -> ruta castellana equivalente. */
const A_CASTELLANO: Record<string, string> = Object.fromEntries(
  Object.entries(ROUTE_MAP).map(([es, conPrefijo]) => [conPrefijo, es]),
);

export const esPathFor = (rutaCompleta: string): string | undefined =>
  A_CASTELLANO[rutaCompleta];

/**
 * Parametros de todas las subrutas con prefijo, para generateStaticParams.
 * La portada de cada idioma la sirve app/[locale]/page.tsx, asi que aqui no
 * entra.
 */
export function localeSlugParams(): { locale: string; slug: string[] }[] {
  const salida: { locale: string; slug: string[] }[] = [];
  for (const locale of PREFIXED_LOCALES) {
    const prefijo = LOCALE_PREFIX[locale];
    for (const destino of Object.values(ROUTE_MAP)) {
      if (!destino.startsWith(`${prefijo}/`)) continue;
      const resto = destino.slice(prefijo.length + 1);
      if (!resto) continue;
      salida.push({ locale: localeSegment(locale), slug: resto.split("/") });
    }
  }
  return salida;
}
