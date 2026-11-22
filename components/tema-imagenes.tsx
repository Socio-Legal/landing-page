"use client";

import { useEffect } from "react";

/**
 * Las <ImagenTema> eligen claro u oscuro con `prefers-color-scheme`, que es el
 * tema del sitio por defecto. Si el visitante fuerza el otro con el
 * interruptor (clase `dark` en <html>, de next-themes), aquí se reorientan sus
 * <source data-tema="dark">: con el oscuro forzado dejan de depender del modo
 * del sistema; con el claro forzado se anulan. El navegador vuelve a elegir
 * la fuente al cambiar `media`. Con el tema del sistema no se toca nada.
 */
export function TemaImagenes() {
  useEffect(() => {
    const raiz = document.documentElement;
    const sistema = window.matchMedia("(prefers-color-scheme: dark)");
    const aplicar = () => {
      const oscuro = raiz.classList.contains("dark");
      const forzado = oscuro !== sistema.matches;
      document.querySelectorAll<HTMLSourceElement>('picture[data-tema] source[data-tema="dark"]').forEach((s) => {
        const media = !forzado ? s.dataset.media : oscuro ? s.dataset.mediaBase : "not all";
        if (media && s.media !== media) s.media = media;
      });
    };
    aplicar();
    const mo = new MutationObserver(aplicar);
    mo.observe(raiz, { attributes: true, attributeFilter: ["class"] });
    // Las páginas cargan imágenes nuevas al navegar sin recargar.
    const nuevas = new MutationObserver(aplicar);
    nuevas.observe(document.body, { childList: true, subtree: true });
    sistema.addEventListener("change", aplicar);
    return () => {
      mo.disconnect();
      nuevas.disconnect();
      sistema.removeEventListener("change", aplicar);
    };
  }, []);
  return null;
}
