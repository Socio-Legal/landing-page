import JsonLd from "@/components/shared/json-ld";
import { breadcrumbJsonLd } from "@/lib/breadcrumbs";
import { localeFromPathname } from "@/lib/locales";

/**
 * BreadcrumbList de una página. Antes lo emitía el layout raíz con la ruta
 * que el middleware dejaba en x-pathname; leer la petición obligaba a
 * renderizar cada página en cada visita. Ahora cada ruta declara la suya
 * (la pública: /libro-de-socios, no /partners-book). En la home y en rutas
 * sin jerarquía conocida no emite nada.
 */
export default function Migas({ ruta }: { ruta: string }) {
  const data = breadcrumbJsonLd(ruta, localeFromPathname(ruta));
  return data ? <JsonLd data={data} /> : null;
}
