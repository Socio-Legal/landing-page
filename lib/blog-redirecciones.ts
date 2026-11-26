import MAPA from "@/lib/blog-redirecciones.json";

/**
 * Destino de una URL del antiguo blog de WordPress (blog.sttok.com/recursos),
 * apagado en noviembre de 2026. Sus 20 entradas con más tráfico se migraron a
 * /glosario-societario con el mismo slug; el resto va a la página más afín de
 * esta web (lib/blog-redirecciones.json). Lo que no se reconoce —categorías,
 * etiquetas, autores, feeds, paginación, wp-admin, wp-content— va a la portada
 * del glosario.
 *
 * Sin dependencias: lo importa el middleware (edge) y lo leen los scripts.
 */

export const HOST_BLOG = "blog.sttok.com";

const DESTINOS: Record<string, string> = {
  ...Object.fromEntries(MAPA.migradas.map((slug) => [slug, `/glosario-societario/${slug}`])),
  ...MAPA.otras,
};

function porSlug(slug: string | undefined): string | undefined {
  if (!slug) return undefined;
  const real = (MAPA.variantes as Record<string, string>)[slug] ?? slug;
  return DESTINOS[real];
}

function segmentos(pathname: string): string[] {
  let p = pathname;
  try {
    p = decodeURIComponent(pathname);
  } catch {
    // Una secuencia % mal formada se compara tal cual.
  }
  return p.toLowerCase().split("/").filter(Boolean);
}

/** Destino de cualquier ruta de blog.sttok.com. Siempre una ruta de www. */
export function destinoBlog(pathname: string): string {
  const s = segmentos(pathname);
  const ultimo = s[s.length - 1] ?? "";

  if (s.length === 1 && ultimo === "robots.txt") return "/robots.txt";
  if (/sitemap.*\.xml$/.test(ultimo)) return "/sitemap.xml";

  // /recursos/<slug>/ y lo que cuelgue de él (feed/, amp/, comment-page-1/);
  // también un <slug> en la raíz del subdominio.
  const slug = s[0] === "recursos" ? s[1] : s[0];
  return porSlug(slug) ?? MAPA.porDefecto;
}

/**
 * Destino de /recursos/<slug> en www.sttok.com, donde vivieron los artículos
 * antes de pasar al subdominio. /recursos a secas es el glosario breve de esta
 * web y no se redirige: devuelve null.
 */
export function destinoRecursosWww(pathname: string): string | null {
  const s = segmentos(pathname);
  if (s[0] !== "recursos" || s.length < 2) return null;
  return porSlug(s[1]) ?? MAPA.porDefecto;
}
