import { MetadataRoute } from "next";

import { ROUTE_MAP } from "@/lib/localized-href";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.sttok.com";

/* Español en la raíz. Las páginas con versión inglesa (ROUTE_MAP) declaran
   alternates hreflang recíprocos es/en + x-default; el resto (casos de éxito
   y landings SEO) solo existen en español. */

const MAIN_ROUTES = [
  "",
  "/producto",
  "/libro-de-socios",
  "/planes-de-incentivos",
  "/juntas-consejos",
  "/simulador",
  "/mercado-secundario",
  "/empresas",
  "/abogados",
  "/startups",
  "/inversores",
  "/portal-del-inversor",
  "/testimonios",
  "/precios",
  "/recursos",
  "/sobre-nosotros",
  "/sttok-vs-excel",
];

const CASE_STUDIES = [
  "Factorial",
  "PldSpace",
  "DerechoCom",
  "Taxdown",
  "Banktrack",
  "Caballero",
  "MyInvestor",
].map((client) => `/testimonios/${client}`);

const SEO_ROUTES = [
  "/software-de-libro-de-socios",
  "/software-de-juntas-de-accionistas",
  "/software-de-gestion-de-captable",
  "/software-de-captable",
  "/simulador-de-ampliacion-de-capital",
  "/secundario",
  "/junta-de-accionistas-digital",
  "/grupos-societarios",
  "/documentacion-societaria",
  "/consejos-de-administracion",
];

const LEGAL_ROUTES = ["/aviso-legal", "/privacidad", "/politica-seguridad"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (
    route: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  ) => {
    const esUrl = `${BASE_URL}${route}`;
    const enPath = ROUTE_MAP[route === "" ? "/" : route];
    return {
      url: esUrl,
      lastModified: new Date(),
      changeFrequency,
      priority,
      ...(enPath
        ? {
            alternates: {
              languages: {
                "es-ES": esUrl,
                en: `${BASE_URL}${enPath}`,
                "x-default": esUrl,
              },
            },
          }
        : {}),
    };
  };

  return [
    ...MAIN_ROUTES.map((r) =>
      entry(r, r === "" ? 1 : 0.8, r === "" ? "weekly" : "monthly"),
    ),
    ...CASE_STUDIES.map((r) => entry(r, 0.6, "monthly")),
    ...SEO_ROUTES.map((r) => entry(r, 0.5, "monthly")),
    ...LEGAL_ROUTES.map((r) => entry(r, 0.2, "yearly")),
  ];
}
