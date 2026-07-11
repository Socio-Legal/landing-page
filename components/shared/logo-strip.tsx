"use client";

import { FC } from "react";
import Image from "next/image";

import { clientLogos, getClientLogo } from "@/config/client-logos";

type LogoName = keyof typeof clientLogos;

type LogoStripProps = {
  label?: string;
  primary: LogoName[];
  secondary?: LogoName[];
};

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

    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
      {primary.map((name) => (
        <div
          key={name}
          className="relative h-8 w-32 opacity-60 grayscale transition-opacity duration-200 hover:opacity-90"
        >
          <Image
            src={getClientLogo(name)}
            alt={`${name}, cliente de Sttok`}
            title={name}
            fill
            style={{ objectFit: "contain" }}
            className="dark:invert"
          />
        </div>
      ))}
    </div>

    {secondary && secondary.length > 0 && (
      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
        {secondary.map((name) => (
          <div
            key={name}
            className="relative h-5 w-24 opacity-40 grayscale transition-opacity duration-200 hover:opacity-70"
          >
            <Image
              src={getClientLogo(name)}
              alt={`${name}, cliente de Sttok`}
              title={name}
              fill
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
