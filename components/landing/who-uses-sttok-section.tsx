import { Building2, Scale, Handshake } from "lucide-react";

import { header, items as uses } from "@/config/uses-section";

import SectionHeader from "../section-header";
import Features from "../features-vertical";

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

const WhoUsesHeader = () => (
  <SectionHeader
    slogan={header.slogan}
    title={header.title}
    description={header.description}
  />
);

const WhoUsesSttokSection = () => {
  const parsedUses = (items: UseProps[]) => {
    return items.map((item) => ({
      ...item,
      icon: WhoUsesIcons[item.icon as keyof typeof WhoUsesIcons],
    }));
  };

  return (
    <section id="who-uses-sttok" className="bg-backgroundbrand">
      <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        <WhoUsesHeader />
        <Features data={parsedUses(uses)} />
      </div>
    </section>
  );
};

export default WhoUsesSttokSection;
