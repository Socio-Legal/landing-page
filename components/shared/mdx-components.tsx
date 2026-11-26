import fs from "node:fs";
import path from "node:path";

import ImagenTema from "@/components/shared/imagen-tema";
import CatalogoFuncionalidades from "@/components/shared/catalogo-funcionalidades";
import Link from "next/link";
import VideoTema from "@/components/shared/video-tema";
import { animacion } from "@/lib/animaciones";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { docLabel, getAllDocs } from "@/lib/content";
import type { MDXComponents } from "mdx/types";

import type { Locale } from "@/lib/locales";

/** Ancho y alto de un PNG, leídos de su cabecera (bytes 16 a 23). */
function pngSize(file: string): { width: number; height: number } {
  const buf = fs.readFileSync(path.join(process.cwd(), "public", file));
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

/**
 * Captura de la app en versión clara y oscura:
 * public/funcionalidades/<nombre>-light.png y <nombre>-dark.png.
 *
 * Se presenta sobre un panel neutro, con la pantalla saliendo del borde
 * inferior: sin marco ni sombra dura, la interfaz es lo único que se ve.
 * Ocupa el ancho del artículo, así que comparte eje izquierdo con el texto.
 *
 * Con `video`, la pantalla se enseña en movimiento (public/animaciones/<video>-*)
 * desde sm; en móvil se queda el recorte estático, que es lo que se lee a 375 px.
 */
const Captura = ({
  nombre,
  alt,
  pie,
  video,
  movil = false,
  locale = "es",
  prioridad = false,
}: {
  nombre: string;
  alt: string;
  pie?: string;
  video?: string;
  /** Captura de móvil, en vertical: se enseña estrecha y centrada. */
  movil?: boolean;
  locale?: Locale;
  /** La primera captura de la página (la pone DocPage): es el LCP. */
  prioridad?: boolean;
}) => {
  const src = (variante: string, tema: string) =>
    `/funcionalidades/${nombre}${variante}-${tema}.png`;
  const { width, height } = pngSize(src("", "light"));
  // En inglés, la animación grabada con la app en inglés (/animaciones/en/) y
  // sin el recorte móvil, que es una captura en castellano.
  const en = locale === "en" && !!video;
  // Recorte opcional para móvil: <nombre>-detalle-*.png. La pantalla entera
  // no se lee a 375 px, así que en móvil se enseña solo la parte que importa.
  const detalle =
    !en && fs.existsSync(path.join(process.cwd(), "public", src("-detalle", "light")))
      ? pngSize(src("-detalle", "light"))
      : null;

  // Un solo <picture>: claro u oscuro, y el recorte por debajo de sm (640 px)
  // si existe. Ver ImagenTema.
  const archivo = (variante: string, tema: "light" | "dark", dims: { width: number; height: number }) => ({
    src: src(variante, tema),
    ...dims,
  });
  const imagen = (conDetalle: boolean) => (
    <ImagenTema
      alt={alt}
      light={archivo("", "light", { width, height })}
      dark={archivo("", "dark", { width, height })}
      {...(conDetalle && detalle
        ? { movilLight: archivo("-detalle", "light", detalle), movilDark: archivo("-detalle", "dark", detalle) }
        : {})}
      sizes={movil ? "20rem" : "(max-width: 1100px) 100vw, 64rem"}
      prioridad={prioridad}
    />
  );
  // Solo el recorte de móvil (cuando encima va el vídeo desde sm).
  const soloDetalle = () =>
    detalle ? (
      <ImagenTema
        alt={alt}
        light={archivo("-detalle", "light", detalle)}
        dark={archivo("-detalle", "dark", detalle)}
        sizes="100vw"
        prioridad={prioridad}
        soloMovil
      />
    ) : null;

  return (
    <figure className="my-14">
      <div className="overflow-hidden rounded-2xl bg-muted px-4 pt-4 sm:px-10 sm:pt-10 lg:px-14 lg:pt-14">
        <div
          className={
            movil
              ? "mx-auto max-w-[20rem] overflow-hidden rounded-t-[1.75rem] ring-1 ring-black/5 dark:ring-white/10"
              : "overflow-hidden rounded-t-lg ring-1 ring-black/5 dark:ring-white/10"
          }
        >
          {video ? (
            <>
              {detalle ? <div className="sm:hidden">{soloDetalle()}</div> : null}
              <div className={detalle ? "hidden sm:block" : undefined}>
                <VideoTema
                  fuentes={animacion(video, en)}
                  alt={alt}
                  sizes="(max-width: 1100px) 100vw, 64rem"
                  prioridad={prioridad && !detalle}
                />
              </div>
            </>
          ) : (
            imagen(true)
          )}
        </div>
      </div>
      {pie && (
        <figcaption className="mt-3 text-xs text-muted-foreground">
          {pie}
        </figcaption>
      )}
    </figure>
  );
};

/**
 * Definición destacada: el primer párrafo de una entrada del glosario cuando ya
 * define el término. Envuelve el texto tal cual, sin reescribirlo.
 */
const Definicion = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-6 max-w-[70ch] rounded-lg border-l-4 border-foreground bg-muted/50 px-5 pb-0.5 pt-5 [&_p]:text-foreground">
    {children}
  </div>
);

const TIPO_RELACIONADA: Record<string, string> = {
  guias: "Guía",
  funcionalidades: "Funcionalidad",
  comparativas: "Comparativa",
};

/**
 * Enlace destacado a la página de content/ que trata el mismo tema a fondo
 * (una guía, una ficha o una comparativa). El build falla si la ruta no existe.
 */
const Relacionada = ({ ruta }: { ruta: string }) => {
  const doc = getAllDocs().find((d) => d.url === ruta);
  if (!doc) throw new Error(`<Relacionada>: no existe ${ruta} en content/`);
  return (
    <p className="mb-8 max-w-[70ch] rounded-lg border border-border px-4 py-3 text-sm">
      <span className="mr-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {TIPO_RELACIONADA[doc.section] ?? "Ver también"}
      </span>
      <Link
        href={doc.url}
        className="inline-flex items-center gap-1.5 font-medium text-foreground underline underline-offset-4"
      >
        {docLabel(doc)}
        <ArrowRightIcon className="h-3.5 w-3.5" />
      </Link>
    </p>
  );
};

/**
 * Estilos del contenido MDX. Siguen el mismo lenguaje visual que el resto
 * del sitio: titular serif, cuerpo en muted, medidas de linea cortas y
 * separadores por borde.
 *
 * Se mapea etiqueta por etiqueta en lugar de usar un plugin de tipografia
 * para no meter una dependencia mas y para que el resultado sea identico al
 * del resto del sitio.
 */
export const mdxComponents: MDXComponents = {
  Captura,
  Catalogo: CatalogoFuncionalidades,
  Definicion,
  Relacionada,
  h1: (props) => (
    <h1
      className="mb-6 max-w-[22ch] font-serif text-4xl font-normal leading-tight tracking-tight text-balance text-foreground sm:text-5xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mb-4 mt-14 font-serif text-3xl font-normal tracking-tight text-balance text-foreground sm:text-4xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mb-1.5 mt-8 text-base font-semibold text-foreground"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="mb-5 max-w-[70ch] text-base leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mb-6 max-w-[70ch] list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mb-6 max-w-[70ch] list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  li: (props) => <li {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  hr: () => <hr className="my-10 border-border" />,
  a: ({ href, ...props }) => {
    const target = href ?? "#";
    // Los enlaces internos pasan por next/link; los externos abren fuera.
    if (target.startsWith("/")) {
      return (
        <Link
          href={target}
          className="font-medium text-foreground underline underline-offset-4"
          {...props}
        />
      );
    }
    return (
      <a
        href={target}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-foreground underline underline-offset-4"
        {...props}
      />
    );
  },
  table: (props) => (
    <div className="mb-8 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="border-b border-border" {...props} />,
  th: (props) => (
    <th
      className="px-3 py-2.5 align-top text-xs font-semibold uppercase tracking-wider text-foreground"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border-t border-border px-3 py-2.5 align-top leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
};

/**
 * Componentes MDX de un idioma: Captura sabe si la página es inglesa para
 * enseñar la animación inglesa.
 */
export function mdxComponentsFor(locale: Locale): MDXComponents {
  if (locale === "es") return mdxComponents;
  return {
    ...mdxComponents,
    Captura: (props: Parameters<typeof Captura>[0]) => <Captura {...props} locale={locale} />,
  };
}
