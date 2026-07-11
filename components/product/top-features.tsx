import React, { FC } from "react";
import { Brain, Calculator, FileCheck, Shield, Users, Zap } from "lucide-react";

import SectionHeading from "@/components/shared/section-heading";

type Feature = {
  title: string;
  description: string;
  icon?: string;
  animation?: string;
  image: string;
};

type TopFeatureProps = {
  feature: Feature;
};

export type TopFeaturesProps = {
  title: string;
  description: string;
  items: Feature[];
};

const TopFeatureIcons = {
  Shield: <Shield className="h-[18px] w-[18px]" />,
  Brain: <Brain className="h-[18px] w-[18px]" />,
  Zap: <Zap className="h-[18px] w-[18px]" />,
  Calculator: <Calculator className="h-[18px] w-[18px]" />,
  Users: <Users className="h-[18px] w-[18px]" />,
  FileCheck: <FileCheck className="h-[18px] w-[18px]" />,
};

const TopFeature: FC<TopFeatureProps> = ({ feature }) => (
  <div className="py-2 pr-0 md:pr-7 md:[&+&]:border-l md:[&+&]:border-border md:[&+&]:pl-7">
    {feature.icon && TopFeatureIcons[feature.icon as keyof typeof TopFeatureIcons] && (
      <div className="mb-4 text-foreground">
        {TopFeatureIcons[feature.icon as keyof typeof TopFeatureIcons]}
      </div>
    )}
    <h3 className="mb-2 text-base font-semibold text-foreground">
      {feature.title}
    </h3>
    <p className="text-sm leading-relaxed text-muted-foreground">
      {feature.description}
    </p>
  </div>
);

const TopFeatures: FC<TopFeaturesProps> = ({ title, description, items }) => {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <section id="product-top-features" className="border-t border-border">
      <div className="container mx-auto px-4 py-14 md:py-20">
        <SectionHeading eyebrow={title} title={description} />

        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-y-0">
          {safeItems.map((feature, index) => (
            <TopFeature key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopFeatures;
