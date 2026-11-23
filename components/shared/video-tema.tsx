"use client";

import ImagenTema from "@/components/shared/imagen-tema";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { Animacion } from "@/lib/animaciones";

/**
 * Una pantalla de la app en movimiento, en versión clara y oscura.
 *
 * `fuentes` trae las URLs COMPLETAS de cada archivo (`animacion()` de
 * lib/animaciones.ts): vídeo webm y mp4, su versión de 720 px para móvil y los
 * pósteres, de cada tema. El componente no compone rutas: una ruta sin
 * extensión en el HTML la rastrea Googlebot y da 404.
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
  fuentes,
  alt,
  className,
  activo = true,
  prioridad = false,
  rellenar = false,
  sizes = "(max-width: 768px) 100vw, 64rem",
}: {
  fuentes: Animacion;
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
  const height = fuentes.alto;
  const altoMovil = fuentes.altoMovil;
  const caja = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [tema, setTema] = useState<"light" | "dark" | null>(null);
  const [cargar, setCargar] = useState(false);
  const [aLaVista, setALaVista] = useState(false);
  // En pantallas estrechas, la versión de 720 px (`fuentes.<tema>.movil`): pesa un tercio.
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
    // Se sigue el ancho, no solo el de entrada: con encuadre propio para móvil,
    // el vídeo estrecho sobre la caja de escritorio saldría recortado.
    const estrecha = window.matchMedia("(max-width: 767px)");
    const leerAncho = () => setMovil(estrecha.matches);
    leerAncho();
    estrecha.addEventListener("change", leerAncho);
    const soltar = () => estrecha.removeEventListener("change", leerAncho);
    if (quieto || ahorro || !caja.current) return soltar;
    const io = new IntersectionObserver(([e]) => setALaVista(e.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(caja.current);
    return () => {
      io.disconnect();
      soltar();
    };
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
  }, [cargar, activo, tema, movil]);

  // Al volver a su pestaña, empieza desde el principio.
  useEffect(() => {
    if (activo && video.current) video.current.currentTime = 0;
  }, [activo]);

  // Cambiar de tema cambia de vídeo: hasta que arranque el nuevo, se ve la imagen.
  useEffect(() => setEnMarcha(false), [tema, movil]);

  // El póster: un solo <picture> (claro/oscuro y, con encuadre propio, el de
  // móvil por debajo de md). El navegador descarga una sola variante.
  const poster = (t: "light" | "dark", m = false) => ({
    src: (m && fuentes[t].movil.poster) || fuentes[t].poster,
    width,
    height: m && altoMovil ? altoMovil : height,
  });
  const conMovil = !!(altoMovil && !rellenar && fuentes.light.movil.poster);

  return (
    <div ref={caja} className={rellenar ? "absolute inset-0" : "relative"}>
      <ImagenTema
        alt={alt}
        light={poster("light")}
        dark={poster("dark")}
        {...(conMovil ? { movilLight: poster("light", true), movilDark: poster("dark", true), corteMovil: 767 } : {})}
        sizes={sizes}
        prioridad={prioridad}
        className={rellenar ? "absolute inset-0" : undefined}
        imgClassName={cn(rellenar ? "absolute inset-0 h-full w-full object-cover object-top" : "h-auto w-full", className)}
      />
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
          <source src={(movil ? fuentes[tema].movil : fuentes[tema]).webm} type="video/webm" />
          <source src={(movil ? fuentes[tema].movil : fuentes[tema]).mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
