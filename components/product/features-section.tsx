import React, { FC } from "react";

import {
  ArrowDown,
  ArrowUp,
  BadgeEuro,
  BookOpenText,
  Building2,
  Calculator,
  FileSignature,
  FileText,
  HandCoins,
  ListOrdered,
  SearchCheck,
  ShieldCheck,
  Users,
  Vote,
} from "lucide-react";

import SectionHeading from "@/components/shared/section-heading";

const iconClass = "h-[18px] w-[18px]";

const FeatureIcons = {
  Icon01: <BookOpenText className={iconClass} />,
  Icon02: <HandCoins className={iconClass} />,
  Icon03: <Calculator className={iconClass} />,
  Icon04: <Vote className={iconClass} />,
  Icon05: <BadgeEuro className={iconClass} />,
  Icon06: <FileText className={iconClass} />,
  Icon07: <Building2 className={iconClass} />,
  Icon08: <Users className={iconClass} />,
  Icon09: <FileSignature className={iconClass} />,
  SecondarySell: <ArrowUp className={iconClass} />,
  SecondaryBuy: <ArrowDown className={iconClass} />,
  SecondaryBid: <SearchCheck className={iconClass} />,
  SecondaryBook: <ListOrdered className={iconClass} />,
  SecondaryTracking: <ShieldCheck className={iconClass} />,
  SecondaryIntegration: <Building2 className={iconClass} />,
};

type Feature = {
  icon: string;
  title: string;
  description: string;
};

export type FeaturesSectionProps = {
  title: string;
  description: string;
  items: Feature[];
};

/**
 * Rejilla de funcionalidades estilo libro registral: filas separadas por
 * filetes finos, icono discreto en línea con el título, sin cajas ni fondos.
 */
const FeaturesSection: FC<FeaturesSectionProps> = ({
  title,
  description,
  items,
}) => {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <section id="features-section" className="border-t border-border">
      <div className="container mx-auto px-4 py-14 md:py-20">
        <SectionHeading eyebrow={title} title={description} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {safeItems.map((feature, index) => (
            <div
              key={index}
              className="border-t border-border py-6 pr-0 lg:pr-8"
            >
              <div className="mb-2 flex items-center gap-2.5 text-foreground">
                {FeatureIcons[feature.icon as keyof typeof FeatureIcons]}
                <h3 className="text-base font-semibold">{feature.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
