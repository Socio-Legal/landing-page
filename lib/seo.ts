import { Metadata } from "next";

import type { Locale } from "@/lib/locales";
import { ROUTE_MAP } from "@/lib/localized-href";

const BASE_URL = "https://www.sttok.com";
const OG_IMAGE = "/og-image.png";

type SeoInput = {
  title: string;
  description: string;
  keywords?: string | string[];
  /** Ruta canónica en castellano, p. ej. "/precios" */
  path: string;
  /**
   * Ruta completa de la versión inglesa, p. ej. "/en/pricing". Normalmente NO
   * hace falta pasarla: se deriva de ROUTE_MAP a partir de `path`. Solo se
   * declara aquí para forzar una excepción.
   */
  pathEn?: string;
  /** Idioma de ESTA página. Determina canonical y og:locale. Por defecto es. */
  locale?: Locale;
};

/**
 * Metadata completa para SEO: canonical del propio idioma, Open Graph, Twitter
 * cards y —cuando la página existe en ambos idiomas— enlaces hreflang
 * recíprocos (es ↔ en) con x-default apuntando al español.
 *
 * El gemelo inglés se DERIVA de ROUTE_MAP, que ya es la lista de páginas
 * bilingües del sitio. Antes había que declararlo página a página con
 * `pathEn`, y 18 de las 20 rutas castellanas se lo dejaban: emitían cero
 * hreflang mientras sus gemelas inglesas sí apuntaban al castellano. Google
 * exige reciprocidad, así que ese marcado unidireccional se ignoraba entero.
 *
 * Las páginas que no están en ROUTE_MAP —las 10 landings SEO, las fichas de
 * caso y las secciones de content/— siguen sin emitir hreflang, que es lo
 * correcto: solo existen en castellano.
 */
export function buildMetadata({
  title,
  description,
  keywords,
  path,
  pathEn,
  locale = "es",
}: SeoInput): Metadata {
  const esUrl = `${BASE_URL}${path}`;
  // `path` es siempre la ruta castellana, también en las páginas inglesas, así
  // que ROUTE_MAP resuelve el gemelo en los dos sentidos.
  const enPath = pathEn ?? ROUTE_MAP[path];
  const enUrl = enPath ? `${BASE_URL}${enPath}` : undefined;
  const canonical = locale === "en" && enUrl ? enUrl : esUrl;

  const languages =
    enUrl !== undefined
      ? {
          "es-ES": esUrl,
          en: enUrl,
          "x-default": esUrl,
        }
      : undefined;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords,
    alternates: {
      canonical,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      type: "website",
      siteName: "Sttok",
      locale: locale === "en" ? "en_US" : "es_ES",
      url: canonical,
      title,
      description,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Sttok, software de gestión de sociedades",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
