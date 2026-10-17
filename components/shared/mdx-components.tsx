import fs from "node:fs";
import path from "node:path";

import Image from "next/image";
import CatalogoFuncionalidades from "@/components/shared/catalogo-funcionalidades";
import Link from "next/link";
import VideoTema from "@/components/shared/video-tema";
import type { MDXComponents } from "mdx/types";

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
}: {
  nombre: string;
  alt: string;
  pie?: string;
  video?: string;
}) => {
  const src = (variante: string, tema: string) =>
    `/funcionalidades/${nombre}${variante}-${tema}.png`;
  const { width, height } = pngSize(src("", "light"));
  // Recorte opcional para móvil: <nombre>-detalle-*.png. La pantalla entera
  // no se lee a 375 px, así que en móvil se enseña solo la parte que importa.
  const detalle = fs.existsSync(
    path.join(process.cwd(), "public", src("-detalle", "light")),
  )
    ? pngSize(src("-detalle", "light"))
    : null;

  const img = (
    variante: string,
    tema: "light" | "dark",
    dims: { width: number; height: number },
    visible: string,
  ) => (
    <Image
      src={src(variante, tema)}
      alt={alt}
      width={dims.width}
      height={dims.height}
      sizes={variante ? "100vw" : "(max-width: 1100px) 100vw, 64rem"}
      className={`h-auto w-full ${visible}`}
    />
  );

  return (
    <figure className="my-14">
      <div className="overflow-hidden rounded-2xl bg-muted px-4 pt-4 sm:px-10 sm:pt-10 lg:px-14 lg:pt-14">
        <div className="overflow-hidden rounded-t-lg ring-1 ring-black/5 dark:ring-white/10">
          {video ? (
            <>
              {detalle ? (
                <>
                  {img("-detalle", "light", detalle, "block sm:hidden dark:hidden")}
                  {img("-detalle", "dark", detalle, "hidden dark:block dark:sm:hidden")}
                </>
              ) : null}
              <div className={detalle ? "hidden sm:block" : undefined}>
                <VideoTema base={`/animaciones/${video}`} alt={alt} className="h-auto w-full" />
              </div>
            </>
          ) : detalle ? (
            <>
              {img("-detalle", "light", detalle, "block sm:hidden dark:hidden")}
              {img("-detalle", "dark", detalle, "hidden dark:block dark:sm:hidden")}
              {img("", "light", { width, height }, "hidden sm:block sm:dark:hidden")}
              {img("", "dark", { width, height }, "hidden sm:dark:block")}
            </>
          ) : (
            <>
              {img("", "light", { width, height }, "block dark:hidden")}
              {img("", "dark", { width, height }, "hidden dark:block")}
            </>
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
