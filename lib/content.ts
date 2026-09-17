import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

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
 * Estas paginas son solo castellanas: no entran en ROUTE_MAP, no emiten
 * hreflang y no pasan por i18next.
 */

export const CONTENT_DIR = path.join(process.cwd(), "content");

/** Secciones publicadas. La etiqueta se usa en las migas. */
export const SECTIONS = {
  soluciones: { label: "Soluciones", hasIndex: true },
  comparativas: { label: "Comparativas", hasIndex: false },
  guias: { label: "Guías", hasIndex: false },
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
  /** Nombre del archivo sin extension. "index" para la portada de seccion. */
  name: string;
  /** Ruta publica, derivada del archivo. */
  url: string;
  frontmatter: DocFrontmatter;
  /** Cuerpo MDX, ya sin frontmatter. */
  body: string;
};

const BASE_URL = "https://www.sttok.com";

/** URL publica de un archivo de contenido. */
function urlFor(section: Section, name: string): string {
  return name === "index" ? `/${section}` : `/${section}/${name}`;
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

      return { section, name, url, frontmatter, body: content };
    });
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
