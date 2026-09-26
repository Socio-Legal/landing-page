// Constantes de idioma puras, sin dependencias de react-i18next. Viven
// aparte de lib/i18n.ts para que los Server Components (layout, seo) puedan
// importarlas sin arrastrar react-i18next (createContext) al grafo de RSC.
//
// Este modulo lo usan el middleware (edge), Server Components y Client
// Components, asi que no puede importar nada que no funcione en los tres.
export type Locale = "es" | "en";
export const LOCALES: Locale[] = ["es", "en"];
export const DEFAULT_LOCALE: Locale = "es";

/**
 * Prefijo de URL de cada idioma. El idioma por defecto vive en la raiz y por
 * eso su prefijo es la cadena vacia.
 *
 * Añadir una variante regional (p. ej. "es-CO": "/co") pasa por aqui: es el
 * unico sitio donde se declara la forma de la URL.
 */
export const LOCALE_PREFIX: Record<Locale, string> = {
  es: "",
  en: "/en",
};

/**
 * Idioma al que pertenece una ruta publica.
 *
 * Antes esta regla estaba escrita tres veces —middleware.ts, lib/use-locale.ts
 * y lib/breadcrumbs.ts— como una comparacion binaria contra "/en". Aqui se
 * deriva de LOCALE_PREFIX, asi que no hay que tocar tres sitios ni pueden
 * desincronizarse.
 */
export function localeFromPathname(pathname: string | null | undefined): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  for (const locale of LOCALES) {
    const prefix = LOCALE_PREFIX[locale];
    if (!prefix) continue; // el idioma por defecto no tiene prefijo
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return locale;
  }
  return DEFAULT_LOCALE;
}
