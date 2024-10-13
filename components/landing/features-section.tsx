import React, { FC } from "react";

import "@/components/styles/features-section.css";

import SectionHeader from "../section-header";
import {
  BadgeEuro,
  BookOpenText,
  Building2,
  Calculator,
  FileSignature,
  FileText,
  HandCoins,
  Users,
  Vote,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const FeatureIcons = {
  Icon01: <BookOpenText className="w-6 h-6 text-primary" />,
  Icon02: <HandCoins className="w-6 h-6 text-primary" />,
  Icon03: <Calculator className="w-6 h-6 text-primary" />,
  Icon04: <Vote className="w-6 h-6 text-primary" />,
  Icon05: <BadgeEuro className="w-6 h-6 text-primary" />,
  Icon06: <FileText className="w-6 h-6 text-primary" />,
  Icon07: <Building2 className="w-6 h-6 text-primary" />,
  Icon08: <Users className="w-6 h-6 text-primary" />,
  Icon09: <FileSignature className="w-6 h-6 text-primary" />,
};

type FeatureSectionProps = {
  features: FeatureItem[];
};

export type FeatureItem = {
  icon: string;
  title: string;
  description: string;
  link?: string;
};

interface FeatureProps {
  index: number;
  feature: FeatureItem;
}

const Feature: FC<FeatureProps> = ({ index, feature }) => (
  <>
    <div key={index} className="w-full sm:w-1/2 lg:w-1/3 text-left">
      <div className="group relative overflow-hidden px-6 py-8 text-center sm:py-10 lg:px-8 xl:px-13 xl:py-15">
        <span
          className={`features-bg absolute left-0 top-0 -z-1 h-full w-full opacity-0 group-hover:opacity-100 ${
            index >= 3 ? "rotate-180" : "undefined"
          }`}
        ></span>

        <div className="flex items-center mb-4 gap-x-2">
          <div className="item-box w-12 h-12 bg-primary/10 rounded-full sm:mr-2 mr-2 shrink-0 flex items-center justify-center">
            {FeatureIcons[feature.icon as keyof typeof FeatureIcons]}
          </div>
          <h3 className="text-lg font-semibold text-primary text-left">
            <span>{feature.title}</span>
          </h3>
        </div>

        <p className="font-medium text-black/50 dark:text-white/70 text-left">
          {feature.description}
        </p>
      </div>
    </div>

    {index % 3 === 2 && (
      <div className="features-row-border-light dark:features-row-border-dark block h-[1px] w-full"></div>
    )}
  </>
);

const FeatureWithLink: FC<FeatureProps> = ({ index, feature }) => (
  <>
    <div key={index} className="w-full sm:w-1/2 lg:w-1/3 text-left">
      <Link href={feature.link || ""}>
        <div
          className="group relative overflow-hidden cursor-pointer px-6 py-8 text-center sm:py-10 lg:px-8 xl:px-13 xl:py-15
      hover:shadow-lg hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out"
        >
          <span
            className={`features-bg absolute left-0 top-0 -z-1 h-full w-full opacity-0 group-hover:opacity-100 ${
              index >= 3 ? "rotate-180" : "undefined"
            }`}
          ></span>

          <div className="flex items-center mb-4 gap-x-2">
            <div className="item-box w-12 h-12 bg-primary/10 rounded-full sm:mr-2 mr-2 shrink-0 flex items-center justify-center">
              {FeatureIcons[feature.icon as keyof typeof FeatureIcons]}
            </div>
            <h3 className="text-lg font-semibold text-primary text-left">
              <span>{feature.title}</span>
            </h3>
          </div>

          <p className="font-medium text-black/50 dark:text-white/70 text-left">
            {feature.description}
          </p>
        </div>
      </Link>
    </div>

    {index % 3 === 2 && (
      <div className="features-row-border-light dark:features-row-border-dark block h-[1px] w-full"></div>
    )}
  </>
);

const FeaturesHeader: FC = () => {
  const { t } = useTranslation("home-features-section");

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

const FeaturesSection: FC<FeatureSectionProps> = ({
  features: featuresData,
}) => {
  const features = Array.isArray(featuresData) ? featuresData : null;

  return (
    <section
      id="features-section"
      className="scroll-mt-17 overflow-hidden pt-17.5 lg:pt-22.5 xl:pt-27.5 bg-white dark:bg-black"
    >
      <div className="mx-auto max-w-[1222px] px-4 sm:px-8 xl:px-0 py-12 md:py-24 lg:py-32">
        <FeaturesHeader />

        <div className="relative">
          <div className="features-row-border-light dark:features-row-border-dark absolute left-1/2 top-1/2 block h-[1px] w-1/2 -translate-y-1/2 rotate-90 lg:left-1/4 lg:block lg:-translate-x-1/3"></div>
          <div className="features-row-border-light dark:features-row-border-dark absolute right-1/2 top-1/2 block h-[1px] w-1/2 -translate-y-1/2 rotate-90 lg:right-[8.3%] lg:block"></div>

          <div className="flex flex-wrap justify-center">
            {features?.map((feature, index) =>
              feature.link ? (
                <FeatureWithLink key={index} index={index} feature={feature} />
              ) : (
                <Feature key={index} index={index} feature={feature} />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
