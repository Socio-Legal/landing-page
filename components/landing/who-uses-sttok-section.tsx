"use client";

import { Building2, Scale, Handshake } from "lucide-react";

import SectionHeader from "../section-header";
import Features from "../features-vertical";
import { blurStyle01 } from "../styles/blur-styles";
import { useTranslation } from "react-i18next";

interface UseProps {
  id: number;
  title: string;
  content: string;
  image: string;
  icon: string;
}

const WhoUsesIcons = {
  Scale: <Scale className="w-6 h-6 text-primary" />,
  Building2: <Building2 className="w-6 h-6 text-primary" />,
  Handshake: <Handshake className="w-6 h-6 text-primary" />,
};

const WhoUsesHeader = () => {
  const { t } = useTranslation("home-uses-section");

  return (
    <SectionHeader
      slogan={t("header.slogan")}
      title={t("header.title")}
      description={t("header.description")}
    />
  );
};

const WhoUsesSttokSection = () => {
  const { t } = useTranslation("home-uses-section");

  const usesData = t("items", { returnObjects: true }) as UseProps[] | null;
  const uses = Array.isArray(usesData) ? usesData : null;

  const parsedUses = (items: UseProps[] | null) => {
    return (
      items?.map((item) => ({
        ...item,
        icon: WhoUsesIcons[item.icon as keyof typeof WhoUsesIcons],
      })) || []
    );
  };

  return (
    <section
      id="who-uses-sttok"
      className="bg-backgroundbrand"
      style={blurStyle01}
    >
      <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        <WhoUsesHeader />
        <Features data={parsedUses(uses)} />
      </div>
    </section>
  );
};

export default WhoUsesSttokSection;
