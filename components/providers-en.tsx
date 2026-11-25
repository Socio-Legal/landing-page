"use client";

import Providers from "@/components/providers";
import TEXTOS from "@/lib/textos-en";

/**
 * Proveedores del inglés. Importa solo los textos de su idioma: lo usa el
 * layout raíz app/[locale]/layout.tsx, y Next incluye en cada ruta
 * únicamente los textos que necesita.
 */
export default function ProvidersEN({ children }: { children: React.ReactNode }) {
  return (
    <Providers locale="en" textos={TEXTOS}>
      {children}
    </Providers>
  );
}
