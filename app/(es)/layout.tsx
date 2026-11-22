import Documento from "@/components/shared/documento";

/**
 * Layout raíz del castellano, que vive en la raíz sin prefijo. Todas sus
 * rutas están bajo el grupo (es), que no añade segmento a la URL. Los idiomas
 * con prefijo tienen su propio layout raíz en app/[locale]/layout.tsx.
 *
 * No lee la petición (ni headers() ni cookies()): el idioma lo da la carpeta.
 * Así todas las páginas se generan estáticas en el build y las sirve la CDN.
 */
export default function RootLayoutEs({ children }: { children: React.ReactNode }) {
  return <Documento locale="es">{children}</Documento>;
}
