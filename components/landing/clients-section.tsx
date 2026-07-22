"use client";

import { FC } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { clientLogos, getClientLogo } from "@/config/client-logos";

const ClientsSection: FC = () => {
  const { t } = useTranslation("home-clients-section");

  const companiesData =
    (t("companies", { returnObjects: true }) as string[]) || [];

  const companies = (Array.isArray(companiesData) ? companiesData : []).filter(
    (name) => name in clientLogos,
  );

  return (
    <section id="companies" className="border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground mb-8">
          {t("header.description")}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
          {companies.map((logo) => (
            <div
              key={logo}
              className="relative h-7 w-28 transition-opacity duration-200 opacity-50 hover:opacity-80 grayscale"
            >
              <Image
                src={getClientLogo(logo as keyof typeof clientLogos)}
                alt={logo}
                fill
                sizes="112px"
                title={logo}
                style={{ objectFit: "contain" }}
                className="dark:invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
