"use client";

import { FC } from "react";

import SectionHeader from "../section-header";
import { blurStyle01 } from "../styles/blur-styles";
import { useTranslation } from "react-i18next";

const CallToActionHeader = () => {
  const { t } = useTranslation("home-cta-section");

  return (
    <SectionHeader
      slogan={t("header.slogan")}
      title={t("header.title")}
      description={t("header.description")}
      buttonText={t("header.buttonText")}
      buttonLink={t("header.buttonLink")}
      secondaryButtonText={t("header.secondaryButtonText")}
      secondaryButtonLink={t("header.secondaryButtonLink")}
    />
  );
};

const CallToActionSection: FC = () => {
  return (
    <section id="cta" className="bg-backgroundbrand" style={blurStyle01}>
      <div className="container mx-auto px-4 pb-12 md:pb-24 lg:pb-32 pt-20 md:pt-32 lg:pt-40">
        <CallToActionHeader />
      </div>
    </section>
  );
};

export default CallToActionSection;
