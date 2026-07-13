import type { Locale } from "@/lib/locales";

/**
 * Mapa de rutas español (raíz) ↔ inglés (/en). El español usa las URLs
 * "bonitas" en castellano; el inglés, el slug inglés bajo /en. Solo incluye
 * las páginas con versión en ambos idiomas (las 10 landings SEO quedan fuera).
 */
export const ROUTE_MAP: Record<string, string> = {
  "/": "/en",
  "/producto": "/en/product",
  "/libro-de-socios": "/en/partners-book",
  "/planes-de-incentivos": "/en/incentive-plans",
  "/juntas-consejos": "/en/shareholder-meetings",
  "/simulador": "/en/operation-drafts",
  "/mercado-secundario": "/en/secondary-market",
  "/empresas": "/en/solutions/companies",
  "/abogados": "/en/solutions/lawyers",
  "/startups": "/en/solutions/startups",
  "/inversores": "/en/solutions/investors",
  "/portal-del-inversor": "/en/solutions/investors-dashboard",
  "/testimonios": "/en/testimonials",
  "/precios": "/en/pricing",
  "/recursos": "/en/resources",
  "/sobre-nosotros": "/en/about",
  "/sttok-vs-excel": "/en/sttok-vs-excel",
  "/aviso-legal": "/en/disclaimer",
  "/privacidad": "/en/privacy",
  "/politica-seguridad": "/en/security",
};

const EN_TO_ES = Object.fromEntries(
  Object.entries(ROUTE_MAP).map(([es, en]) => [en, es]),
);

/**
 * Devuelve la ruta española dada (`hrefEs`) prefijada al idioma activo.
 * En inglés usa el slug inglés del mapa; si no está mapeada, se sirve tal cual.
 */
export function localizedHref(hrefEs: string, locale: Locale): string {
  if (locale !== "en") return hrefEs;
  return ROUTE_MAP[hrefEs] ?? hrefEs;
}

/** URL espejo en el otro idioma, para el selector de idioma. */
export function mirrorHref(pathname: string, target: Locale): string {
  if (target === "en") return ROUTE_MAP[pathname] ?? "/en";
  return EN_TO_ES[pathname] ?? "/";
}
