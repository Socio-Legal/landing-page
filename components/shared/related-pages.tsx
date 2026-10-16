import { FC } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

/**
 * Enlaces a paginas relacionadas, emitidos desde el layout (Server Component)
 * de cada pagina de producto. Llevan a las guias y soluciones de content/ que
 * tratan el mismo tema, que solo existen en castellano: este bloque no se
 * pinta en las rutas /en.
 */
const RELACIONADAS: Record<string, { href: string; label: string }[]> = {
  "/libro-de-socios": [
    {
      href: "/guias/reconstruir-libro-de-socios",
      label: "Reconstruir el libro de socios",
    },
    {
      href: "/guias/libro-registro-socios-legalizacion",
      label: "Legalizar el libro registro de socios",
    },
    {
      href: "/guias/cotitularidad-usufructo-nuda-propiedad",
      label: "Cotitularidad, usufructo y nuda propiedad",
    },
  ],
  "/juntas-consejos": [
    {
      href: "/guias/junta-general-telematica",
      label: "Junta general telemática",
    },
    {
      href: "/soluciones/secretaria-del-consejo",
      label: "Secretaría del consejo de administración",
    },
    {
      href: "/guias/plantillas-societarias",
      label: "Convocatorias, actas y certificados",
    },
  ],
  "/simulador": [
    {
      href: "/guias/fiscalidad-phantom-shares-stock-options",
      label: "Fiscalidad de phantom shares y stock options",
    },
  ],
  "/mercado-secundario": [
    {
      href: "/guias/derecho-de-adquisicion-preferente",
      label: "Derecho de adquisición preferente",
    },
  ],
  "/empresas": [
    {
      href: "/soluciones/grupos-de-sociedades",
      label: "Grupos de sociedades",
    },
    {
      href: "/guias/titular-real-grupos-sociedades",
      label: "Titular real en grupos de sociedades",
    },
  ],
  "/sttok-vs-excel": [
    { href: "/comparativas/sttok-vs-carta", label: "Sttok frente a Carta" },
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
