import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.sttok.com";

/* Solo URLs canónicas en castellano. Las rutas en inglés son rewrites de
   las mismas páginas y quedan cubiertas por el canonical; no existen rutas
   por idioma (/es, /en), así que no se declaran alternates. */

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
  ) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  });

  return [
    ...MAIN_ROUTES.map((r) =>
      entry(r, r === "" ? 1 : 0.8, r === "" ? "weekly" : "monthly"),
    ),
    ...CASE_STUDIES.map((r) => entry(r, 0.6, "monthly")),
    ...SEO_ROUTES.map((r) => entry(r, 0.5, "monthly")),
    ...LEGAL_ROUTES.map((r) => entry(r, 0.2, "yearly")),
  ];
}
