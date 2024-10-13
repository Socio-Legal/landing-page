"use client";

import { FC } from "react";
import Image from "next/image";

import { clientLogos, getClientLogo } from "@/config/client-logos";

import SectionHeader from "../section-header";
import { useTranslation } from "react-i18next";

const ClientsHeader: FC = () => {
  const { t } = useTranslation("home-clients-section");

  return (
    <SectionHeader
      slogan={t("header.slogan")}
      title={t("header.title")}
      description={t("header.description")}
      buttonText={t("header.buttonText")}
      buttonLink={t("header.buttonLink")}
    />
  );
};

const getColStarts = (index: number, companies: string[]) => {
  if (companies.length === 16) {
    if (index === companies.length - 4) return "lg:col-start-2 xl:col-start-2";
    if (index === companies.length - 1) return "lg:col-start-5 xl:col-start-5";
  }
  return "";
};

const ClientsSection: FC = () => {
  const { t } = useTranslation("home-clients-section");

  const companies =
    (t("companies", { returnObjects: true }) as string[]) || null;

  return (
    <section id="companies">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-24 lg:py-32">
        <ClientsHeader />

        <div className="relative mt-6">
          <div className="grid grid-cols-2 place-items-center gap-2 md:grid-cols-4 xl:grid-cols-6 xl:gap-4">
            {companies?.map((logo, index) => (
              <div
                key={index}
                className={`relative h-10 w-40 px-2 brightness-0 dark:brightness-0 dark:invert mb-8
                  ${getColStarts(index, companies)}
                `}
              >
                <Image
                  src={getClientLogo(logo as keyof typeof clientLogos)}
                  alt={logo}
                  fill={true}
                  objectFit="contain"
                  className="max-h-[40px] max-w-[160px] mx-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
