import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type { Locale } from "@/lib/locales";
import { ROUTE_MAP } from "@/lib/localized-href";

/**
 * Capa de contenido de las secciones castellanas (`/soluciones`,
 * `/comparativas`, `/guias`).
 *
 * La URL la manda SIEMPRE la ruta del archivo, no el frontmatter:
 *   content/soluciones/index.mdx            -> /soluciones
 *   content/soluciones/empresa-familiar.mdx -> /soluciones/empresa-familiar
 *
 * El `slug` y el `canonical` del frontmatter se validan contra esa URL y el
 * build falla si no coinciden, para que no puedan desviarse en silencio.
 *
 * No pasan por i18next. Las que tienen version inglesa la tienen en
 * content/en/<seccion>/<slug-ingles>.mdx (ver EN_SECTIONS), con su pareja en
 * ROUTE_MAP; el resto solo existe en castellano y no emite hreflang.
 */

export const CONTENT_DIR = path.join(process.cwd(), "content");

/** Secciones publicadas. La etiqueta se usa en las migas. */
export const SECTIONS = {
  soluciones: { label: "Soluciones", hasIndex: true },
  comparativas: { label: "Comparativas", hasIndex: true },
  guias: { label: "Guías", hasIndex: true },
  funcionalidades: { label: "Funcionalidades", hasIndex: true },
  // Las paginas de pais cuelgan de la portada /jurisdicciones pero viven en
  // la raiz (/colombia, no /jurisdicciones/colombia): son paginas de entrada
  // y la URL corta es la que se busca y se recuerda. Cada una tiene su
  // carpeta minima en app/ (app/colombia/page.tsx).
  jurisdicciones: { label: "Jurisdicciones", hasIndex: true, hijasEnRaiz: true },
} as const;

export type Section = keyof typeof SECTIONS;

export const SECTION_NAMES = Object.keys(SECTIONS) as Section[];

export type DocFrontmatter = {
  title: string;
  description: string;
  slug?: string;
  section?: string;
  canonical?: string;
};

export type Doc = {
  section: Section;
  locale: Locale;
  /** Ruta castellana del documento; en los ingleses, la de su gemelo. */
  esUrl: string;
  /** Nombre del archivo sin extension. "index" para la portada de seccion. */
  name: string;
  /** Ruta publica, derivada del archivo. */
  url: string;
  /** Archivo relativo a la raiz del repositorio: content/<seccion>/<nombre>.mdx */
  file: string;
  frontmatter: DocFrontmatter;
  /** Cuerpo MDX, ya sin frontmatter. */
  body: string;
};

const BASE_URL = "https://www.sttok.com";

/** URL publica de un archivo de contenido. */
function urlFor(section: Section, name: string): string {
  if (name === "index") return `/${section}`;
  const enRaiz = (SECTIONS[section] as { hijasEnRaiz?: boolean }).hijasEnRaiz;
  return enRaiz ? `/${name}` : `/${section}/${name}`;
}

function readSection(section: Section): Doc[] {
  const dir = path.join(CONTENT_DIR, section);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .sort()
    .map((file) => {
      const name = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const frontmatter = data as DocFrontmatter;
      const url = urlFor(section, name);

      const where = `content/${section}/${file}`;
      if (!frontmatter.title || !frontmatter.description) {
        throw new Error(`${where}: faltan "title" o "description" en el frontmatter`);
      }
      if (frontmatter.slug && frontmatter.slug !== url) {
        throw new Error(
          `${where}: el slug del frontmatter ("${frontmatter.slug}") no coincide con la ruta del archivo ("${url}")`,
        );
      }
      if (frontmatter.canonical && frontmatter.canonical !== `${BASE_URL}${url}`) {
        throw new Error(
          `${where}: el canonical del frontmatter ("${frontmatter.canonical}") no coincide con "${BASE_URL}${url}"`,
        );
      }

      return { section, locale: "es" as const, esUrl: url, name, url, file: where, frontmatter, body: content };
    });
}

/**
 * Secciones con version inglesa y su ruta publica en ingles:
 *   content/en/soluciones/index.mdx           -> /en/solutions
 *   content/en/soluciones/family-business.mdx -> /en/solutions/family-business
 *
 * Cada documento ingles tiene que ser el destino de una entrada de ROUTE_MAP:
 * es lo que le da gemelo castellano, hreflang reciproco y sitio en el sitemap.
 * El build falla si no lo es.
 */
export const EN_SECTIONS: Partial<Record<Section, { base: string; label: string }>> = {
  soluciones: { base: "/en/solutions", label: "Solutions" },
};

const EN_TO_ES: Record<string, string> = Object.fromEntries(
  Object.entries(ROUTE_MAP).map(([es, en]) => [en, es]),
);

function readEnSection(section: Section): Doc[] {
  const cfg = EN_SECTIONS[section];
  const dir = path.join(CONTENT_DIR, "en", section);
  if (!cfg || !fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .sort()
    .map((file) => {
      const name = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const frontmatter = data as DocFrontmatter;
      const url = name === "index" ? cfg.base : `${cfg.base}/${name}`;

      const where = `content/en/${section}/${file}`;
      if (!frontmatter.title || !frontmatter.description) {
        throw new Error(`${where}: faltan "title" o "description" en el frontmatter`);
      }
      if (frontmatter.slug && frontmatter.slug !== url) {
        throw new Error(`${where}: el slug del frontmatter ("${frontmatter.slug}") no coincide con "${url}"`);
      }
      if (frontmatter.canonical && frontmatter.canonical !== `${BASE_URL}${url}`) {
        throw new Error(`${where}: el canonical del frontmatter no coincide con "${BASE_URL}${url}"`);
      }
      const esUrl = EN_TO_ES[url];
      if (!esUrl) {
        throw new Error(`${where}: "${url}" no es el destino de ninguna entrada de ROUTE_MAP`);
      }

      return { section, locale: "en" as const, esUrl, name, url, file: where, frontmatter, body: content };
    });
}

let enCache: Doc[] | null = null;

/** Documentos ingleses de content/en/. */
export function getEnDocs(): Doc[] {
  if (!enCache) enCache = SECTION_NAMES.flatMap(readEnSection);
  return enCache;
}

/** Documento ingles por su ruta publica (/en/solutions/...). */
export function getEnDoc(url: string): Doc | undefined {
  return getEnDocs().find((d) => d.url === url);
}

/** Documentos ingleses de una seccion, sin su portada. */
export function getEnSectionDocs(section: Section): Doc[] {
  return getEnDocs().filter((d) => d.section === section && d.name !== "index");
}

/**
 * Cache a nivel de modulo. El contenido son archivos del repositorio: no
 * cambia entre peticiones, asi que basta con leerlo una vez por instancia.
 * Importa porque el layout raiz llama a headers() y todas las rutas se
 * renderizan en cada peticion.
 */
let cache: Doc[] | null = null;

export function getAllDocs(): Doc[] {
  if (!cache) cache = SECTION_NAMES.flatMap(readSection);
  return cache;
}

/** Documentos de una seccion, sin su portada. */
export function getSectionDocs(section: Section): Doc[] {
  return getAllDocs().filter((d) => d.section === section && d.name !== "index");
}

export function getDoc(section: Section, name: string): Doc | undefined {
  return getAllDocs().find((d) => d.section === section && d.name === name);
}

/** Slugs de una seccion, para generateStaticParams. */
export function getSectionSlugs(section: Section): string[] {
  return getSectionDocs(section).map((d) => d.name);
}
