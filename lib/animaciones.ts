import VERSION from "@/lib/animaciones-version.json";

/**
 * Las animaciones de public/animaciones se identifican por su nombre
 * («accionistas», «panel»…), nunca por una ruta sin extensión: una cadena
 * «/animaciones/<nombre>» en el HTML, el RSC o los JSON públicos la rastrea
 * Googlebot como URL y da 404 (Search Console, nov-2026). Este módulo
 * convierte el nombre en las URLs COMPLETAS de cada archivo, que es lo único
 * que recibe <VideoTema>.
 */

/**
 * Alto de cada animación a 1280 px de ancho. Lo grabado a 1184 × 860 px CSS
 * sale a 930; lo de 1184 × 740, a 800. Declarado aquí para que la caja tenga
 * su tamaño antes de cargar (sin salto de maquetación).
 */
const ALTO: Record<string, number> = {
  panel: 930, sociedades: 930, participadas: 930, "portal-del-beneficiario": 930,
  compraventa: 930, "convocatoria-de-la-junta": 930,
  "ampliaciones-y-reducciones-de-capital": 930, "asistencia-y-quorum": 930,
  "consejo-de-administracion": 930, "eleccion-de-consejeros": 930, "reparto-de-dividendos": 930,
  "acta-de-la-junta": 930,
  // 920 × 800 px CSS: solo el área de contenido, para que se lea a media columna.
  "simulador-ampliacion": 1113,
};

/**
 * Animaciones con un encuadre propio para móvil: la app grabada a 640 px de
 * ancho, en vertical, con su póster (<nombre>-<tema>-m-poster.webp). Alto a
 * 1280 px de ancho. Las demás reducen en móvil el mismo encuadre de escritorio.
 */
const ALTO_MOVIL: Record<string, number> = {
  "simulador-ampliacion": 1800,
};

export type ArchivosTema = { webm: string; mp4: string; poster: string };
/**
 * La versión de 720 px existe para todas; su póster, solo para las de
 * encuadre propio (ALTO_MOVIL). No se emite una URL de archivo que no exista.
 */
export type ArchivosMovil = { webm: string; mp4: string; poster?: string };
export type Animacion = {
  alto: number;
  /** Alto del encuadre de móvil, si lo tiene. */
  altoMovil?: number;
  light: ArchivosTema & { movil: ArchivosMovil };
  dark: ArchivosTema & { movil: ArchivosMovil };
};

/**
 * Las URLs completas de una animación, con la huella de su contenido
 * (?v=…, scripts/version-animaciones.mjs) para que un archivo regrabado con el
 * mismo nombre no se quede días en la caché.
 *
 * `nombre` es el del archivo sin tema ni extensión («accionistas»); `en`, la
 * versión inglesa de public/animaciones/en.
 */
export function animacion(nombre: string, en = false): Animacion {
  if (nombre.includes("/")) {
    throw new Error(`animacion(): «${nombre}» debe ser un nombre, no una ruta`);
  }
  const clave = (en ? "en/" : "") + nombre;
  const huella = (VERSION as Record<string, string>)[clave];
  const v = huella ? `?v=${huella}` : "";
  const dir = "/animaciones/" + (en ? "en/" : "");
  const archivos = (tema: "light" | "dark", m: "" | "-m"): ArchivosTema => ({
    webm: `${dir}${nombre}-${tema}${m}.webm${v}`,
    mp4: `${dir}${nombre}-${tema}${m}.mp4${v}`,
    poster: `${dir}${nombre}-${tema}${m}-poster.webp${v}`,
  });
  const altoMovil = ALTO_MOVIL[nombre];
  const movil = (tema: "light" | "dark"): ArchivosMovil => {
    const { webm, mp4, poster } = archivos(tema, "-m");
    return altoMovil ? { webm, mp4, poster } : { webm, mp4 };
  };
  return {
    alto: ALTO[nombre] ?? 800,
    ...(altoMovil ? { altoMovil } : {}),
    light: { ...archivos("light", ""), movil: movil("light") },
    dark: { ...archivos("dark", ""), movil: movil("dark") },
  };
}
