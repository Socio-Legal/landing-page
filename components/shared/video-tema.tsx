"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Alto de cada animación a 1280 px de ancho. Lo grabado a 1184 × 860 px CSS
 * sale a 930; lo de 1184 × 740, a 800. Declarado aquí para que la caja tenga
 * su tamaño antes de cargar (sin salto de maquetación).
 */
const ALTO: Record<string, number> = {
  panel: 930, sociedades: 930, participadas: 930, "portal-del-beneficiario": 930,
  compraventa: 930, "convocatoria-de-la-junta": 930,
  "ampliaciones-y-reducciones-de-capital": 930, "asistencia-y-quorum": 930,
};
const altoDe = (base: string) => ALTO[base.split("/").pop() || ""] ?? 800;

/**
 * Una pantalla de la app en movimiento, en versión clara y oscura.
 *
 * `base` es la ruta sin tema ni extensión: /animaciones/simulador sirve
 * simulador-light.webm|mp4, simulador-dark.webm|mp4, su versión de 720 px para
 * móvil (<base>-<tema>-m.webm|mp4) y sus pósteres (<base>-<tema>-poster.webp).
 *
 * Lo que se pinta de entrada es una IMAGEN con su `alt`, no un vídeo: es lo que
 * indexan los buscadores, lo que leen los lectores de pantalla y lo que se ve
 * con el ahorro de datos o «reducir movimiento». Va por next/image, así que
 * sale en el tamaño de la pantalla (AVIF/WebP) y, salvo con `prioridad`,
 * diferida: la del tema que no se ve no se descarga.
 *
 * El vídeo va encima y es UNO: solo se le pone fuente cuando está a la vista,
 * y la del tema activo. Se reproduce sin sonido y en bucle mientras se ve, y
 * si se pasa `activo`, mientras lo está su pestaña. Hasta que no arranca no se
 * muestra, así que nunca hay un hueco.
 */
export default function VideoTema({
  base,
  alt,
  className,
  activo = true,
  prioridad = false,
  rellenar = false,
  sizes = "(max-width: 768px) 100vw, 64rem",
}: {
  base: string;
  alt: string;
  className?: string;
  activo?: boolean;
  /** La imagen es lo primero que se ve de la página (LCP): se carga sin esperar. */
  prioridad?: boolean;
  /** Ocupa entera una caja con su propio tamaño (el carrusel de la home), anclada arriba. */
  rellenar?: boolean;
  sizes?: string;
}) {
  const width = 1280;
  const height = altoDe(base);
  const caja = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [tema, setTema] = useState<"light" | "dark" | null>(null);
  const [cargar, setCargar] = useState(false);
  const [aLaVista, setALaVista] = useState(false);
  // En pantallas estrechas, la versión de 720 px (<base>-<tema>-m.*): pesa un tercio.
  const [movil, setMovil] = useState(false);
  const [enMarcha, setEnMarcha] = useState(false);

  // Tema activo (lo pone next-themes como clase en <html>) y si se puede animar.
  useEffect(() => {
    const raiz = document.documentElement;
    const leer = () => setTema(raiz.classList.contains("dark") ? "dark" : "light");
    leer();
    const mo = new MutationObserver(leer);
    mo.observe(raiz, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  // Se pide el vídeo la primera vez que la caja asoma, y no antes.
  useEffect(() => {
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const red = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const ahorro = !!red?.saveData || /(^|-)2g$/.test(red?.effectiveType || "");
    setMovil(window.matchMedia("(max-width: 767px)").matches);
    if (quieto || ahorro || !caja.current) return;
    const io = new IntersectionObserver(([e]) => setALaVista(e.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(caja.current);
    return () => io.disconnect();
  }, []);

  // Se pide la primera vez que está a la vista Y es la pestaña activa: en el
  // carrusel de la home las cuatro capas están en pantalla, y sin la segunda
  // condición se descargaban los cuatro vídeos a la vez.
  useEffect(() => {
    if (aLaVista && activo) setCargar(true);
  }, [aLaVista, activo]);

  // Play/pausa según se vea, y según su pestaña si está en un carrusel.
  useEffect(() => {
    const v = video.current;
    if (!v || !cargar || !caja.current) return;
    let visible = false;
    const ajustar = () => {
      if (activo && visible) v.play().catch(() => {});
      else v.pause();
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        ajustar();
      },
      { threshold: 0.25 },
    );
    io.observe(caja.current);
    return () => io.disconnect();
  }, [cargar, activo, tema]);

  // Al volver a su pestaña, empieza desde el principio.
  useEffect(() => {
    if (activo && video.current) video.current.currentTime = 0;
  }, [activo]);

  // Cambiar de tema cambia de vídeo: hasta que arranque el nuevo, se ve la imagen.
  useEffect(() => setEnMarcha(false), [tema]);

  const imagen = (t: "light" | "dark", visibleEn: string) => (
    <Image
      src={`${base}-${t}-poster.webp`}
      alt={alt}
      {...(rellenar ? { fill: true } : { width, height })}
      sizes={sizes}
      priority={prioridad && t === "light"}
      className={cn(visibleEn, rellenar ? "object-cover object-top" : "h-auto w-full", className)}
    />
  );

  return (
    <div ref={caja} className={rellenar ? "absolute inset-0" : "relative"}>
      {imagen("light", "block dark:hidden")}
      {imagen("dark", "hidden dark:block")}
      {cargar && tema && (
        <video
          key={tema + (movil ? "-m" : "")}
          ref={video}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300",
            enMarcha ? "opacity-100" : "opacity-0",
            className,
          )}
          width={width}
          height={height}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setEnMarcha(true)}
        >
          <source src={`${base}-${tema}${movil ? "-m" : ""}.webm`} type="video/webm" />
          <source src={`${base}-${tema}${movil ? "-m" : ""}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
