import i18next, { i18n as I18nType } from "i18next";
import { initReactI18next } from "react-i18next";

import loadTranslations from "./loadTranslations";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "./locales";

export { LOCALES, DEFAULT_LOCALE };
export type { Locale };

/**
 * Dos instancias de i18next, una por idioma, con el idioma FIJADO e inmutable.
 * No usamos un singleton mutable con detector de idioma: en SSR, mutar el
 * idioma global haría que peticiones concurrentes (/precios y /en/pricing) se
 * pisaran. Cada árbol de la app usa su instancia; el idioma nunca cambia, así
 * que no hay carrera posible. El cambio de idioma es navegación por URL.
 *
 * IMPORTANTE: este módulo importa react-i18next (createContext), así que solo
 * debe usarse desde Client Components. Los Server Components que necesiten el
 * tipo o las constantes de locale deben importar de "@/lib/locales".
 */
const instances: Partial<Record<Locale, I18nType>> = {};

function createForLocale(locale: Locale): I18nType {
  const instance = i18next.createInstance();
  instance.use(initReactI18next).init({
    resources: { [locale]: loadTranslations(locale) },
    lng: locale,
    fallbackLng: locale, // sin fallback cruzado: cada instancia es de un idioma
    supportedLngs: [locale],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  } as any);
  return instance;
}

export function getI18n(locale: Locale): I18nType {
  const key: Locale = LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  if (!instances[key]) {
    instances[key] = createForLocale(key);
  }
  return instances[key] as I18nType;
}
