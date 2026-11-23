import { NextRequest, NextResponse } from "next/server";

import PAGINAS from "@/lib/animaciones-paginas.json";

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
 * cada uno su layout raíz. El middleware ya no pasa x-locale ni x-pathname:
 * leer la petición en el layout obligaba a renderizar cada página en cada
 * visita. Solo quedan las redirecciones de URLs antiguas.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const animacion = destinoAnimacion(pathname);
  if (animacion) {
    return NextResponse.redirect(new URL(animacion, request.url), 301);
  }

  // "/$": cadena del script en línea de React que Googlebot tomó por una URL
  // (ya no se emite: htmlLimitedBots en next.config.mjs). 301 a la portada.
  if (pathname === "/$" || pathname.toLowerCase() === "/%24") {
    return NextResponse.redirect(new URL("/", request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  // Solo las rutas que redirige: el resto de páginas son estáticas y no
  // tienen por qué pasar por aquí.
  matcher: ["/animaciones/:path*", "/:dolar(\\$|%24)"],
};
