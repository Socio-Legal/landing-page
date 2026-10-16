"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Una pantalla de la app en movimiento, en versión clara y oscura.
 *
 * `base` es la ruta sin tema ni extensión: /animaciones/simulador sirve
 * simulador-light.webm|mp4 y simulador-dark.webm|mp4, cada uno con su póster
 * (<base>-<tema>-poster.webp). El tema lo decide el CSS (dark:), igual que en
 * las capturas, así que nunca se descarga ni se pinta la versión equivocada.
 *
 * Solo se reproduce mientras está a la vista y, si se pasa `activo`, mientras
 * lo está su pestaña (la sección de productos de la home apila cuatro). Con
 * «reducir movimiento» del sistema no arranca: se queda el póster.
 */
export default function VideoTema({
  base,
  alt,
  className,
  activo = true,
  width = 1920,
  height = 1200,
}: {
  base: string;
  alt: string;
  className?: string;
  activo?: boolean;
  width?: number;
  height?: number;
}) {
  const claro = useRef<HTMLVideoElement>(null);
  const oscuro = useRef<HTMLVideoElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)");
    const videos = [claro.current, oscuro.current].filter(
      (v): v is HTMLVideoElement => !!v,
    );

    const ajustar = () => {
      for (const v of videos) {
        // Solo el del tema activo tiene caja; el otro está en display: none.
        const toca =
          activo && visible.current && !quieto.matches && v.offsetParent !== null;
        if (toca && v.paused) v.play().catch(() => {});
        if (!toca && !v.paused) v.pause();
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        ajustar();
      },
      { threshold: 0.25 },
    );
    if (claro.current?.parentElement) io.observe(claro.current.parentElement);

    // Cambiar de tema cambia cuál de los dos se ve.
    const tema = new MutationObserver(ajustar);
    tema.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    quieto.addEventListener("change", ajustar);
    ajustar();

    return () => {
      io.disconnect();
      tema.disconnect();
      quieto.removeEventListener("change", ajustar);
    };
  }, [activo]);

  // Al volver a su pestaña, la animación empieza desde el principio.
  useEffect(() => {
    if (!activo) return;
    for (const v of [claro.current, oscuro.current]) if (v) v.currentTime = 0;
  }, [activo]);

  const video = (tema: "light" | "dark", ref: typeof claro, visibleEn: string) => (
    <video
      ref={ref}
      className={cn(visibleEn, className)}
      poster={`${base}-${tema}-poster.webp`}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
    >
      <source src={`${base}-${tema}.webm`} type="video/webm" />
      <source src={`${base}-${tema}.mp4`} type="video/mp4" />
    </video>
  );

  return (
    <>
      {video("light", claro, "block dark:hidden")}
      {video("dark", oscuro, "hidden dark:block")}
    </>
  );
}
