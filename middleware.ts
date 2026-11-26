import { NextRequest, NextResponse } from "next/server";

import PAGINAS from "@/lib/animaciones-paginas.json";
import { destinoBlog, destinoRecursosWww, HOST_BLOG } from "@/lib/blog-redirecciones";

const BASE_URL = "https://www.sttok.com";

/**
 * /animaciones/<nombre> sin extensión no es un archivo: era la ruta base que
 * VideoTema completaba en el cliente y que Googlebot rastreó (404 en Search
 * Console, nov-2026). 301 a la página que mejor contiene esa animación
 * (lib/animaciones-paginas.json, de scripts/animaciones-paginas.mjs); si no
 * se conoce, a /producto o /en/product. Un 410 Google lo seguía contando
 * como 404.
 */
const ANIMACION_SIN_EXTENSION = /^\/animaciones\/(en\/)?([^/.]+)\/?$/;

function destinoAnimacion(pathname: string): string | null {
  const m = ANIMACION_SIN_EXTENSION.exec(pathname);
  if (!m) return null;
  const [, en, nombre] = m;
  const mapa = (en ? PAGINAS.en : PAGINAS.es) as Record<string, string>;
  return mapa[nombre] ?? (en ? "/en/product" : "/producto");
}

/**
 * El idioma se decide solo por la URL (castellano en la raíz, inglés bajo
 * /en) y lo resuelve la estructura de app/: app/(es) y app/[locale] tienen
 * cada uno su layout raíz. El middleware solo redirige URLs antiguas y quita
 * la barra final.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();

  // El antiguo blog de WordPress: blog.sttok.com apunta a esta web y TODAS
  // sus URLs responden con un único 301 a www (lib/blog-redirecciones.ts).
  if (host === HOST_BLOG) {
    return NextResponse.redirect(`${BASE_URL}${destinoBlog(pathname)}`, 301);
  }

  // Artículos que vivieron en www.sttok.com/recursos/<slug>.
  const recursos = destinoRecursosWww(pathname);
  if (recursos) {
    return NextResponse.redirect(new URL(recursos, request.url), 301);
  }

  const animacion = destinoAnimacion(pathname);
  if (animacion) {
    return NextResponse.redirect(new URL(animacion, request.url), 301);
  }

  // "/$": cadena del script en línea de React que Googlebot tomó por una URL
  // (ya no se emite: htmlLimitedBots en next.config.mjs). 301 a la portada.
  if (pathname === "/$" || pathname.toLowerCase() === "/%24") {
    return NextResponse.redirect(new URL("/", request.url), 301);
  }

  // La barra final la quitaba Next con un 308 ANTES de cualquier redirección
  // propia, lo que encadenaba dos saltos en las URLs antiguas del blog, que
  // acaban todas en «/». next.config.mjs la desactiva (skipTrailingSlashRedirect)
  // y se repite aquí, después de las demás redirecciones, con el mismo 308.
  // nextUrl conserva la barra al formatear y su pathname ya llega sin ella:
  // se trabaja con la URL tal cual.
  const url = new URL(request.url);
  if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Todas las páginas, para poder quitar la barra final: Next compara el
  // matcher con la ruta ya sin barra, así que no se puede limitar a las que
  // la llevan. Fuera quedan _next y los archivos con extensión, salvo en
  // blog.sttok.com, donde se redirige todo.
  matcher: [
    "/((?!_next/|.*\\.[a-zA-Z0-9]+$).*)",
    { source: "/:path*", has: [{ type: "host", value: "blog\\.sttok\\.com" }] },
  ],
};
