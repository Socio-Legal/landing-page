"use client";

import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import SectionHeading from "@/components/shared/section-heading";
import { clientLogos, getClientLogo } from "@/config/client-logos";

type Feature = {
  icon?: string;
  logo: string;
  title?: string;
  description: string;
  alt?: string;
  /** false si el cliente no tiene página de caso: la tarjeta va sin enlace. */
  case?: boolean;
};

export type FeaturesSectionProps = {
  title: string;
  description: string;
  items: Feature[];
};

const CARD =
  "flex flex-col gap-4 rounded-lg border border-border bg-card p-6";

/**
 * Índice de clientes: el logo es el titular de cada tarjeta, con la
 * descripción real de la empresa. Los que tienen caso propio enlazan a él.
 */
const FeaturesSection: FC<FeaturesSectionProps> = ({
  title,
  description,
  items,
}) => {
  const { t } = useTranslation("testimonials-page");
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <section id="features-section" className="border-t border-border">
      <div className="container mx-auto px-4 py-14 md:py-20">
        <SectionHeading eyebrow={title} title={description} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {safeItems
            .filter((feature) => feature.logo in clientLogos)
            .map((feature, index) => {
              const cuerpo = (
                <>
                  <div className="relative h-7 w-32 opacity-70 grayscale">
                    <Image
                      src={getClientLogo(feature.logo as keyof typeof clientLogos)}
                      alt={feature.alt || feature.logo}
                      fill
                      style={{ objectFit: "contain", objectPosition: "left" }}
                      className="dark:invert"
                    />
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </>
              );

              if (feature.case === false) {
                return (
                  <div key={index} className={CARD}>
                    {cuerpo}
                  </div>
                );
              }

              return (
                <Link
                  key={index}
                  href={`/testimonios/${feature.logo}`}
                  title={feature.alt || feature.logo}
                  className={`group ${CARD} transition-colors hover:border-foreground/30`}
                >
                  {cuerpo}
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                    {t("readCase")}
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
