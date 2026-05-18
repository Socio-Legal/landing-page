import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.sttok.com";

const STATIC_ROUTES = [
  "",
  "/producto",
  "/libro-de-socios",
  "/planes-de-incentivos",
  "/juntas-consejos",
  "/simulador",
  "/mercado-secundario",
  "/soluciones",
  "/empresas",
  "/abogados",
  "/startups",
  "/inversores",
  "/portal-del-inversor",
  "/testimonios",
  "/precios",
  "/recursos",
  "/aviso-legal",
  "/privacidad",
  "/politica-seguridad",
];

const LOCALES = ["es", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    entries.push({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((locale) => [locale, `${BASE_URL}/${locale}${route}`])
        ),
      },
    });
  }

  return entries;
}
