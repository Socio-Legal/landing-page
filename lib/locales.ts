// Constantes de idioma puras, sin dependencias de react-i18next. Viven
// aparte de lib/i18n.ts para que los Server Components (layout, seo) puedan
// importarlas sin arrastrar react-i18next (createContext) al grafo de RSC.
export type Locale = "es" | "en";
export const LOCALES: Locale[] = ["es", "en"];
export const DEFAULT_LOCALE: Locale = "es";
