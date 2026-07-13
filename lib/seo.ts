import { Metadata } from "next";

import type { Locale } from "@/lib/locales";

const BASE_URL = "https://www.sttok.com";
const OG_IMAGE = "/og-image.png";

type SeoInput = {
  title: string;
  description: string;
  keywords?: string | string[];
  /** Ruta canónica en castellano, p. ej. "/precios" */
  path: string;
  /**
   * Ruta completa de la versión inglesa, p. ej. "/en/pricing". Solo para las
   * páginas que tienen versión en inglés; si se omite, no se emite hreflang.
   */
  pathEn?: string;
  /** Idioma de ESTA página. Determina canonical y og:locale. Por defecto es. */
  locale?: Locale;
};

/**
 * Metadata completa para SEO: canonical del propio idioma, Open Graph, Twitter
 * cards y —cuando la página existe en ambos idiomas— enlaces hreflang
 * recíprocos (es ↔ en) con x-default apuntando al español.
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
  const enUrl = pathEn ? `${BASE_URL}${pathEn}` : undefined;
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
