"use client";

import { CSSProperties, FC } from "react";
import Image from "next/image";

import { clientLogos, getClientLogo } from "@/config/client-logos";

type LogoName = keyof typeof clientLogos;

type LogoStripProps = {
  label?: string;
  primary: LogoName[];
  secondary?: LogoName[];
};

/**
 * Logos cuadrados. En una caja apaisada con object-fit: contain quedan a la
 * altura de la caja y pesan mucho menos que los logotipos de texto, así que
 * se les da algo más de alto para igualar el peso visual.
 */
const SQUARE: LogoName[] = ["Axa"];

/**
 * Cada fila es una rejilla con tantas columnas como logos en escritorio (dos
 * filas iguales si son más de 9) y la mitad en pantallas estrechas. Así una fila
 * nunca se parte dejando uno o dos logos sueltos, como pasaba con flex-wrap
 * al estrechar la ventana.
 */
const rowStyle = (count: number): CSSProperties => {
  // Más de 9 logos no caben en una fila: se reparten en dos iguales.
  const cols = count <= 9 ? count : Math.ceil(count / 2);
  return {
    "--cols": cols,
    "--cols-narrow": Math.ceil(cols / 2),
  } as CSSProperties;
};

const ROW =
  "mx-auto grid items-center justify-items-center grid-cols-[repeat(var(--cols-narrow),minmax(0,1fr))] lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]";

/**
 * Tira de logos de clientes en dos niveles: los más potentes primero,
 * más grandes; el resto debajo, más discreto. Grayscale siempre.
 */
const LogoStrip: FC<LogoStripProps> = ({ label, primary, secondary }) => (
  <div className="text-center">
    {label && (
      <div className="mb-8 flex items-center justify-center gap-5">
        <span className="h-px w-16 bg-border sm:w-24" aria-hidden />
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <span className="h-px w-16 bg-border sm:w-24" aria-hidden />
      </div>
    )}

    <div
      className={`${ROW} max-w-5xl gap-x-6 gap-y-6 lg:gap-x-8`}
      style={rowStyle(primary.length)}
    >
      {primary.map((name) => (
        <div
          key={name}
          className={
            (SQUARE.includes(name) ? "h-9 " : "h-8 ") +
            "relative w-full max-w-32 opacity-60 grayscale transition-opacity duration-200 hover:opacity-90"
          }
        >
          <Image
            src={getClientLogo(name)}
            alt={`${name}, cliente de Sttok`}
            title={name}
            fill
            sizes="128px"
            style={{ objectFit: "contain" }}
            className="dark:invert"
          />
        </div>
      ))}
    </div>

    {secondary && secondary.length > 0 && (
      <div
        className={`${ROW} mt-8 max-w-5xl gap-x-6 gap-y-5 lg:gap-x-8`}
        style={rowStyle(secondary.length)}
      >
        {secondary.map((name) => (
          <div
            key={name}
            className="relative h-5 w-full max-w-24 opacity-40 grayscale transition-opacity duration-200 hover:opacity-70"
          >
            <Image
              src={getClientLogo(name)}
              alt={`${name}, cliente de Sttok`}
              title={name}
              fill
              sizes="96px"
              style={{ objectFit: "contain" }}
              className="dark:invert"
            />
          </div>
        ))}
      </div>
    )}
  </div>
);

export default LogoStrip;
