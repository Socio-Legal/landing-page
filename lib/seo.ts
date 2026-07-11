import { Metadata } from "next";

const BASE_URL = "https://www.sttok.com";
const OG_IMAGE = "/og-image.png";

type SeoInput = {
  title: string;
  description: string;
  keywords?: string | string[];
  /** Ruta canónica en castellano, p. ej. "/precios" */
  path: string;
};

/**
 * Metadata completa para SEO: canonical (siempre la URL en castellano, que
 * es la que sirve el HTML), Open Graph y Twitter cards. Las rutas en inglés
 * (/pricing, /partners-book...) son rewrites de la misma página: el
 * canonical evita que Google las trate como contenido duplicado.
 */
export function buildMetadata({
  title,
  description,
  keywords,
  path,
}: SeoInput): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      siteName: "Sttok",
      locale: "es_ES",
      url,
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
