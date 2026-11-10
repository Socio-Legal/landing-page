"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";

import AxaContorno from "@/public/logo-axa-border.png";
import { clientLogos, getClientName } from "@/config/client-logos";
import { trackMeetingClick } from "@/lib/analytics";

/** Clientes del pie de la caja: refuerzan la confianza sin competir con el botón. */
const LOGOS = ["Axa", "Factorial", "MyInvestor", "Osborne"] as const;

// Sobre el azul los logos van en blanco. El de AXA es un cuadrado relleno y
// quedaría como un bloque: se usa el de contorno, con el fondo transparente.
const SRC = { ...clientLogos, Axa: AxaContorno };

/**
 * Caja final de reservar demo. Un solo botón: la caja existe para que pidan
 * la demo, sin salida a otras páginas.
 */
const CallToActionSection: FC = () => {
  const { t } = useTranslation("home-cta-section");

  return (
    <section id="cta" className="border-t border-border">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="rounded-lg bg-navy px-8 pb-10 pt-14 text-center md:px-16">
          <p className="text-xs font-medium uppercase tracking-widest text-navy-muted mb-4">
            {t("header.slogan")}
          </p>
          <h2 className="font-serif text-3xl font-normal text-navy-foreground text-balance sm:text-4xl mb-4">
            {t("header.title")}
          </h2>
          <p className="text-base text-navy-muted text-balance max-w-2xl mx-auto mb-8">
            {t("header.description")}
          </p>
          <Link
            href={t("header.buttonLink")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackMeetingClick("cta-final")}
            className="inline-flex items-center gap-2 rounded-md bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-background/90 transition-colors"
          >
            {t("header.buttonText")}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-xs text-navy-muted">{t("header.reassurance")}</p>

          <div className="mx-auto mt-10 max-w-2xl border-t border-navy-muted/20 pt-6">
            <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-navy-muted/80">
              {t("header.trustLabel")}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {LOGOS.map((l) => (
                <Image
                  key={l}
                  src={SRC[l]}
                  alt={getClientName(l)}
                  className={`${l === "Axa" ? "h-9" : "h-5"} w-auto max-w-24 object-contain opacity-60 brightness-0 invert`}
                />
              ))}
              <span className="text-xs text-navy-muted/80">{t("header.trustFigure")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
