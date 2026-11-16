import { NextRequest, NextResponse } from "next/server";

import { localeFromPathname } from "@/lib/locales";

/**
 * Enrutado de idioma "solo por URL": el español vive en la raíz y el inglés
 * bajo /en/*. No hay redirecciones ni autodetección — la raíz es siempre
 * español. El middleware solo expone el locale y el pathname en cabeceras
 * para que el layout raíz (Server Component) pueda emitir el <html lang>
 * correcto y construir los enlaces alternativos hreflang.
 *
 * La regla de "a qué idioma pertenece esta ruta" vive en lib/locales, que la
 * deriva de LOCALE_PREFIX. Aquí no se compara contra "/en" a mano.
 */
/**
 * /animaciones/<nombre> sin extensión no es un archivo: era la ruta base que
 * VideoTema completaba en el cliente y que Googlebot rastreó (404 en Search
 * Console, nov-2026). 410 para que la retire del índice antes que con un 404.
 */
const ANIMACION_SIN_EXTENSION = /^\/animaciones\/(?:en\/)?[^/.]+\/?$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (ANIMACION_SIN_EXTENSION.test(pathname)) {
    return new NextResponse(null, { status: 410 });
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
