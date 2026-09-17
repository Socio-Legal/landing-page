import { getAllDocs, SECTIONS as CONTENT_SECTIONS, type Doc } from "@/lib/content";
import type { Locale } from "@/lib/locales";
import { ROUTE_MAP, localizedHref } from "@/lib/localized-href";

const BASE_URL = "https://www.sttok.com";

/** Etiqueta y ruta de cada seccion de content/, indexadas por su ruta. */
const SECTIONS_BY_PATH: Record<string, { name: string; path: string }> =
  Object.fromEntries(
    Object.entries(CONTENT_SECTIONS).map(([name, cfg]) => [
      `/${name}`,
      { name: cfg.label, path: `/${name}` },
    ]),
  );

/**
 * Etiqueta corta de un documento para la miga: el titulo hasta el primer ":",
 * porque los titulos del frontmatter llevan cola de SEO.
 */
const docLabel = (doc: Doc): string =>
  doc.frontmatter.title.split(":")[0].trim();

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
  // /soluciones existe desde que hay content/soluciones/index.mdx. Es una
  // seccion solo castellana, asi que no se intercala en las rutas /en: en
  // ingles, /en/solutions/companies sigue colgando directamente de la home.
  solutions: { path: "/soluciones", label: "Soluciones", esOnly: true },
} satisfies Record<
  string,
  { path: string; label: Label; esOnly?: boolean }
>;

type SectionKey = keyof typeof SECTIONS;

/**
 * Migas por ruta PUBLICA castellana. El ingles se deriva con ROUTE_MAP, asi
 * que aqui solo se declara la ruta espanola.
 *
 * Las paginas de soluciones cuelgan de la seccion "Soluciones", que existe
 * desde que hay content/soluciones/index.mdx.
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
  "/empresas": {
    label: { es: "Empresas", en: "Companies" },
    section: "solutions",
  },
  "/abogados": {
    label: { es: "Abogados", en: "Lawyers" },
    section: "solutions",
  },
  "/startups": {
    label: { es: "Startups", en: "Startups" },
    section: "solutions",
  },
  "/inversores": {
    label: { es: "Inversores", en: "Investors" },
    section: "solutions",
  },
  "/portal-del-inversor": {
    label: { es: "Portal del Inversor", en: "Investor Portal" },
    section: "solutions",
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

  // Paginas de content/: se resuelven solas a partir de los archivos, asi que
  // una pagina nueva tiene migas sin tocar este modulo.
  const doc = getAllDocs().find((d) => d.url === esPath);
  if (doc) {
    const sectionLabel = SECTIONS_BY_PATH[`/${doc.section}`];
    // La portada de seccion es ya el segundo nivel: Inicio > Soluciones. Usa
    // el nombre de la seccion, no el titular SEO del documento.
    if (doc.name === "index") {
      return [
        home,
        { name: sectionLabel?.name ?? docLabel(doc), path: esPath },
      ];
    }
    return [
      home,
      ...(sectionLabel
        ? [{ name: sectionLabel.name, path: sectionLabel.path }]
        : []),
      { name: docLabel(doc), path: esPath },
    ];
  }

  const page = PAGES[esPath];
  if (!page) return [];

  const section = page.section ? SECTIONS[page.section] : undefined;
  // Una seccion solo castellana no se intercala en las rutas inglesas.
  const skipSection = section && "esOnly" in section && section.esOnly && locale === "en";

  return [
    home,
    ...(section && !skipSection
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
