import { NextRequest, NextResponse } from "next/server";

/**
 * Enrutado de idioma "solo por URL": el español vive en la raíz y el inglés
 * bajo /en/*. No hay redirecciones ni autodetección — la raíz es siempre
 * español. El middleware solo expone el locale y el pathname en cabeceras
 * para que el layout raíz (Server Component) pueda emitir el <html lang>
 * correcto y construir los enlaces alternativos hreflang.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  const headers = new Headers(request.headers);
  headers.set("x-locale", isEnglish ? "en" : "es");
  headers.set("x-pathname", pathname);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Todo excepto assets estáticos, imágenes, y rutas internas de Next.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|pdf|txt|xml|woff|woff2|ttf)$).*)",
  ],
};
