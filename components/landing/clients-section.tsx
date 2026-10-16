"use client";

import { FC } from "react";
import { useTranslation } from "react-i18next";

import LogoStrip from "@/components/shared/logo-strip";
import { clientLogos } from "@/config/client-logos";

type LogoName = keyof typeof clientLogos;

/**
 * Tira de clientes de la home. Usa LogoStrip, como el resto del sitio: los
 * nueve primeros en grande y el resto debajo, en rejilla para que ninguna fila
 * quede con logos sueltos. El orden es el de home-clients-section.json.
 */
const ClientsSection: FC = () => {
  const { t } = useTranslation("home-clients-section");

  const companiesData =
    (t("companies", { returnObjects: true }) as string[]) || [];
  const companies = (Array.isArray(companiesData) ? companiesData : []).filter(
    (name): name is LogoName => name in clientLogos,
  );

  return (
    <section id="companies" className="border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <LogoStrip
          label={t("header.description")}
          primary={companies.slice(0, 9)}
          secondary={companies.slice(9)}
        />
      </div>
    </section>
  );
};

export default ClientsSection;
