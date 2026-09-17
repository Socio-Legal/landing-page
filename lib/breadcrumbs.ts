import type { Locale } from "@/lib/locales";
import { ROUTE_MAP, localizedHref } from "@/lib/localized-href";

const BASE_URL = "https://www.sttok.com";

type Label = string | Record<Locale, string>;

const text = (label: Label, locale: Locale): string =>
  typeof label === "string" ? label : label[locale];

/** Secciones intermedias del arbol. Solo se listan las que TIENEN pagina. */
const SECTIONS = {
  product: { path: "/producto", label: { es: "Producto", en: "Product" } },
  testimonials: {
    path: "/testimonios",
    label: { es: "Testimonios", en: "Testimonials" },
  },
} satisfies Record<string, { path: string; label: Label }>;

type SectionKey = keyof typeof SECTIONS;

/**
 * Migas por ruta PUBLICA castellana. El ingles se deriva con ROUTE_MAP, asi
 * que aqui solo se declara la ruta espanola.
 *
 * Nota: las paginas de soluciones (/empresas, /abogados...) cuelgan
 * directamente de la home y no de una seccion "Soluciones", porque
 * /soluciones no tiene pagina y devuelve 404. Una miga intermedia que apunte
 * a un 404 es peor que no tenerla. Cuando exista la pagina indice, basta con
 * añadir aqui la seccion y marcar esas cinco rutas con section: "solutions".
 */
const PAGES: Record<string, { label: Label; section?: SectionKey }> = {
  // Producto
  "/producto": { label: { es: "Producto", en: "Product" } },
  "/libro-de-socios": {
    label: { es: "Libro de Socios", en: "Shareholder Register" },
    section: "product",
  },
  "/planes-de-incentivos": {
    label: { es: "Planes de Incentivos", en: "Incentive Plans" },
    section: "product",
  },
  "/juntas-consejos": {
    label: { es: "Juntas y Consejos", en: "Shareholder Meetings" },
    section: "product",
  },
  "/simulador": {
    label: { es: "Simulador de Operaciones", en: "Operations Simulator" },
    section: "product",
  },
  "/mercado-secundario": {
    label: { es: "Mercado Secundario", en: "Secondary Market" },
    section: "product",
  },

  // Soluciones
  "/empresas": { label: { es: "Empresas", en: "Companies" } },
  "/abogados": { label: { es: "Abogados", en: "Lawyers" } },
  "/startups": { label: { es: "Startups", en: "Startups" } },
  "/inversores": { label: { es: "Inversores", en: "Investors" } },
  "/portal-del-inversor": {
    label: { es: "Portal del Inversor", en: "Investor Portal" },
  },

  // Resto de secciones principales
  "/testimonios": { label: { es: "Testimonios", en: "Testimonials" } },
  "/precios": { label: { es: "Precios", en: "Pricing" } },
  "/recursos": { label: { es: "Recursos", en: "Resources" } },
  "/sobre-nosotros": { label: { es: "Sobre nosotros", en: "About" } },
  "/sttok-vs-excel": { label: "Sttok vs Excel" },

  // Legales
  "/aviso-legal": { label: { es: "Aviso legal", en: "Legal notice" } },
  "/privacidad": { label: { es: "Privacidad", en: "Privacy" } },
  "/politica-seguridad": {
    label: { es: "Política de seguridad", en: "Security policy" },
  },

  // Landings SEO (solo existen en castellano)
  "/software-de-libro-de-socios": { label: "Software de libro de socios" },
  "/software-de-juntas-de-accionistas": {
    label: "Software de juntas de accionistas",
  },
  "/software-de-gestion-de-captable": {
    label: "Software de gestión de captable",
  },
  "/software-de-captable": { label: "Software de captable" },
  "/simulador-de-ampliacion-de-capital": {
    label: "Simulador de ampliación de capital",
  },
  "/secundario": { label: "Mercado secundario" },
  "/junta-de-accionistas-digital": { label: "Junta de accionistas digital" },
  "/grupos-societarios": { label: "Grupos societarios" },
  "/documentacion-societaria": { label: "Documentación societaria" },
  "/consejos-de-administracion": { label: "Consejos de administración" },
};

/** Nombre visible de cada caso de exito (config/testimonials/clients/*.ts). */
const CLIENTS: Record<string, string> = {
  Banktrack: "Banktrack",
  Caballero: "Grupo Caballero",
  DerechoCom: "DerechoCom",
  Factorial: "Factorial",
  MyInvestor: "MyInvestor",
  PldSpace: "PLD Space",
  Taxdown: "Taxdown",
};

/** Ruta inglesa -> ruta castellana, para normalizar antes de buscar en PAGES. */
const EN_TO_ES: Record<string, string> = Object.fromEntries(
  Object.entries(ROUTE_MAP).map(([es, en]) => [en, es]),
);

/** Quita la barra final salvo en la raiz. */
const normalize = (pathname: string): string =>
  pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

/**
 * Devuelve la ruta castellana equivalente y el idioma de un pathname publico.
 * El ingles vive bajo /en; el castellano, en la raiz.
 */
function toEsPath(pathname: string): string {
  if (pathname === "/en") return "/";
  if (!pathname.startsWith("/en/")) return pathname;
  // Caso mapeado (/en/product -> /producto)
  if (EN_TO_ES[pathname]) return EN_TO_ES[pathname];
  return pathname;
}

type Crumb = { name: string; path: string };

/** Migas de una ruta, de la home a la pagina actual. Vacio en la home. */
export function breadcrumbTrail(pathname: string, locale: Locale): Crumb[] {
  const esPath = toEsPath(normalize(pathname));
  if (esPath === "/") return [];

  const home = { name: locale === "en" ? "Home" : "Inicio", path: "/" };

  // Ficha de caso de exito: /testimonios/<Cliente>
  const client = esPath.match(/^\/testimonios\/([^/]+)$/)?.[1];
  if (client) {
    const name = CLIENTS[client];
    if (!name) return [];
    return [
      home,
      { name: text(SECTIONS.testimonials.label, locale), path: SECTIONS.testimonials.path },
      { name, path: esPath },
    ];
  }

  const page = PAGES[esPath];
  if (!page) return [];

  const section = page.section ? SECTIONS[page.section] : undefined;

  return [
    home,
    ...(section
      ? [{ name: text(section.label, locale), path: section.path }]
      : []),
    { name: text(page.label, locale), path: esPath },
  ];
}

/**
 * BreadcrumbList de la pagina actual, o null si es la home o una ruta sin
 * jerarquia conocida (404, rutas internas). Las URL se emiten ya localizadas:
 * en ingles se usa el slug de ROUTE_MAP.
 */
export function breadcrumbJsonLd(pathname: string, locale: Locale) {
  const trail = breadcrumbTrail(pathname, locale);
  if (trail.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${BASE_URL}${localizedHref(crumb.path, locale)}`.replace(
        /\/$/,
        "",
      ),
    })),
  };
}
