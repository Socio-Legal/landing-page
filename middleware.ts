import { NextRequest, NextResponse } from "next/server";

import { localeFromPathname } from "@/lib/locales";
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
 * Enrutado de idioma "solo por URL": el español vive en la raíz y el inglés
 * bajo /en/*. No hay redirecciones ni autodetección — la raíz es siempre
 * español. El middleware expone el locale y el pathname en cabeceras
 * para que el layout raíz (Server Component) pueda emitir el <html lang>
 * correcto y construir los enlaces alternativos hreflang.
 *
 * La regla de "a qué idioma pertenece esta ruta" vive en lib/locales, que la
 * deriva de LOCALE_PREFIX. Aquí no se compara contra "/en" a mano.
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

  const headers = new Headers(request.headers);
  headers.set("x-locale", localeFromPathname(pathname));
  headers.set("x-pathname", pathname);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Todo excepto assets estáticos, imágenes, y rutas internas de Next.
  //
  // El punto de la extensión va doblemente escapado: en una cadena JS "\."
  // es solo ".", y con ese comodín el matcher excluía cualquier ruta
  // terminada en ico, txt, xml, ttf... (/mexico acaba en "ico"), que se
  // quedaba sin x-locale ni x-pathname y, por tanto, sin migas.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|pdf|txt|xml|woff|woff2|ttf)$).*)",
  ],
};
