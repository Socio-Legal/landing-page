import { getImageProps } from "next/image";

import { cn } from "@/lib/utils";

export type ArchivoImagen = { src: string; width: number; height: number };

/**
 * Una imagen con versión clara y oscura y, opcionalmente, un recorte para
 * móvil, en un solo <picture>: el navegador descarga UNA variante, la que
 * corresponde a su ancho y a su modo de color. Antes eran hasta cuatro <img>
 * ocultas con CSS; todas «lazy» y la visible competía con las demás.
 *
 * El modo de color sigue a `prefers-color-scheme`, que es el tema por defecto
 * del sitio (next-themes con "system"). Si el visitante fuerza el otro tema
 * con el interruptor del pie, <TemaImagenes> (components/tema-imagenes.tsx)
 * reorienta los <source> marcados con data-tema.
 *
 * `prioridad`: la imagen es el LCP de la página (la primera captura o el hero):
 * sin lazy y con fetchpriority="high". El resto, diferidas.
 */
export default function ImagenTema({
  alt,
  light,
  dark,
  movilLight,
  movilDark,
  sizes,
  sizesMovil = "100vw",
  corteMovil = 639,
  prioridad = false,
  soloMovil = false,
  className,
  imgClassName,
}: {
  /**
   * La imagen solo se ve por debajo de `corteMovil` (encima, otra cosa: el
   * vídeo). Por encima se sirve un píxel transparente, para que una <img>
   * oculta con CSS no descargue la captura en escritorio.
   */
  soloMovil?: boolean;
  alt: string;
  light: ArchivoImagen;
  dark: ArchivoImagen;
  /** Recorte o encuadre propio por debajo de `corteMovil` px. */
  movilLight?: ArchivoImagen;
  movilDark?: ArchivoImagen;
  sizes: string;
  sizesMovil?: string;
  /** Ancho máximo (px) en que se usa la versión de móvil. */
  corteMovil?: number;
  prioridad?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const props = (a: ArchivoImagen, s: string) =>
    getImageProps({
      src: a.src,
      width: a.width,
      height: a.height,
      alt,
      sizes: s,
      ...(prioridad ? { priority: true } : { loading: "lazy" as const }),
    }).props;

  const movil = `(max-width: ${corteMovil}px)`;
  const oscuro = "(prefers-color-scheme: dark)";
  const base = props(light, sizes);
  const fuentes: { media: string; tema: "light" | "dark"; mediaBase: string; p: ReturnType<typeof props> }[] = [];
  if (movilLight && movilDark) {
    fuentes.push({ media: `${movil} and ${oscuro}`, tema: "dark", mediaBase: movil, p: props(movilDark, sizesMovil) });
    fuentes.push({ media: movil, tema: "light", mediaBase: movil, p: props(movilLight, sizesMovil) });
  }
  fuentes.push({ media: oscuro, tema: "dark", mediaBase: "all", p: props(dark, sizes) });

  return (
    <picture data-tema="" className={cn("block", className)}>
      {soloMovil && (
        <source
          media={`(min-width: ${corteMovil + 1}px)`}
          srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        />
      )}
      {fuentes.map((f) => (
        <source
          key={f.media}
          media={f.media}
          data-tema={f.tema}
          data-media={f.media}
          data-media-base={f.mediaBase}
          srcSet={f.p.srcSet}
          sizes={f.p.sizes}
          width={f.p.width}
          height={f.p.height}
        />
      ))}
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt viene en base */}
      <img
        {...base}
        className={cn("h-auto w-full", imgClassName)}
        // React 19 acepta fetchPriority; getImageProps ya lo pone con priority.
      />
    </picture>
  );
}
