"use client";

import Providers from "@/components/providers";
import TEXTOS from "@/lib/textos-es";

/**
 * Proveedores del castellano. Importa solo los textos de su idioma: lo usa el
 * layout raíz app/(es)/layout.tsx, y Next incluye en cada ruta
 * únicamente los textos que necesita.
 */
export default function ProvidersES({ children }: { children: React.ReactNode }) {
  return (
    <Providers locale="es" textos={TEXTOS}>
      {children}
    </Providers>
  );
}
