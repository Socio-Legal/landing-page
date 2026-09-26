import { FC } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

/**
 * Enlaces a paginas relacionadas, emitidos desde el layout (Server Component)
 * de cada pagina. Existe porque las 10 landings SEO de app/(empty-pages) no
 * recibian NI UN enlace interno: solo eran alcanzables por el sitemap.
 *
 * El mapa va por ruta publica castellana. Las landings solo existen en
 * castellano, asi que este bloque no se pinta en las rutas /en.
 */
const RELACIONADAS: Record<string, { href: string; label: string }[]> = {
  "/libro-de-socios": [
    { href: "/software-de-libro-de-socios", label: "Software de libro de socios" },
    { href: "/software-de-captable", label: "Software de captable" },
    {
      href: "/software-de-gestion-de-captable",
      label: "Software de gestión de captable",
    },
  ],
  "/juntas-consejos": [
    {
      href: "/software-de-juntas-de-accionistas",
      label: "Software de juntas de accionistas",
    },
    {
      href: "/junta-de-accionistas-digital",
      label: "Junta de accionistas digital",
    },
    {
      href: "/consejos-de-administracion",
      label: "Consejos de administración",
    },
  ],
  "/simulador": [
    {
      href: "/simulador-de-ampliacion-de-capital",
      label: "Simulador de ampliación de capital",
    },
  ],
  "/mercado-secundario": [
    { href: "/secundario", label: "Mercado secundario de participaciones" },
  ],
  "/empresas": [
    { href: "/grupos-societarios", label: "Grupos societarios" },
    { href: "/documentacion-societaria", label: "Documentación societaria" },
  ],
};

/** Rutas que este mapa enlaza, para poder comprobarlo desde un script. */
export const RUTAS_RELACIONADAS = Object.values(RELACIONADAS)
  .flat()
  .map((l) => l.href);

const RelatedPages: FC<{ path: string; title?: string }> = ({
  path,
  title = "Relacionado",
}) => {
  const enlaces = RELACIONADAS[path];
  if (!enlaces || enlaces.length === 0) return null;

  return (
    <section id="related" className="border-t border-border">
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              {enlace.label}
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPages;
