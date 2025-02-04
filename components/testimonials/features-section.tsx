import React, { FC } from "react";

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

import SectionHeader from "../section-header";
import { blurStyle01 } from "../styles/blur-styles";
import "@/components/styles/features-section.css";
import Image from "next/image";
import { clientLogos, getClientLogo } from "@/config/client-logos";
import Link from "next/link";

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

type Feature = {
  icon?: string;
  logo: string;
  title?: string;
  description: string;
  alt?: string;
};

type FeatureItemProps = {
  index: number;
  feature: Feature;
};

type FeaturesHeaderProps = {
  title: string;
  description: string;
};

export type FeaturesSectionProps = {
  title: string;
  description: string;
  items: Feature[];
};

const Feature: FC<FeatureItemProps> = ({ index, feature }) => {
  const featureLinkKey = `testimonial-${feature.logo}`;
  const featureLinkHref = `/testimonios/${feature.logo}`;

  return (
    <>
      <div key={index} className="w-full sm:w-1/2 lg:w-1/3 text-left">
        <Link
          key={featureLinkKey}
          href={featureLinkHref}
          title={feature.alt || ""}
        >
          <div
            className="group relative overflow-hidden cursor-pointer px-6 py-8 text-center sm:py-10 lg:px-8 xl:px-13 xl:py-15
      hover:shadow-lg hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out
      "
          >
            <span
              className={`features-bg absolute left-0 top-0 -z-1 h-full w-full opacity-0 group-hover:opacity-100 ${
                index >= 3 ? "rotate-180" : "undefined"
              }`}
            ></span>

            <div className="flex items-center mb-4 gap-x-2">
              {!feature.logo && (
                <div className="item-box w-12 h-12 bg-primary/10 rounded-full sm:mr-2 mr-2 shrink-0 flex items-center justify-center">
                  {FeatureIcons[feature.icon as keyof typeof FeatureIcons]}
                </div>
              )}

              {feature?.logo && (
                <div
                  key={index}
                  className={`h-10 w-40 mx-0 brightness-0 dark:brightness-0 dark:invert`}
                >
                  <Image
                    src={getClientLogo(
                      feature.logo as keyof typeof clientLogos
                    )}
                    alt={feature.logo}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )}
              {feature.title && (
                <h3 className="text-lg font-semibold text-primary text-left">
                  <span>{feature.title}</span>
                </h3>
              )}
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
};

const FeaturesHeader: FC<FeaturesHeaderProps> = ({ title, description }) => (
  <SectionHeader title={title} description={description} />
);

const FeaturesSection: FC<FeaturesSectionProps> = ({
  title,
  description,
  items,
}) => {
  return (
    <section
      id="features-section"
      className="scroll-mt-17 overflow-hidden pt-17.5 lg:pt-22.5 xl:pt-27.5 bg-backgroundbrand"
      style={blurStyle01}
    >
      <div className="mx-auto max-w-[1222px] px-4 sm:px-8 xl:px-0 py-12 md:py-24 lg:py-32">
        <FeaturesHeader title={title} description={description} />

        <div className="relative">
          <div className="features-row-border-light dark:features-row-border-dark absolute left-1/2 top-1/2 block h-[1px] w-1/2 -translate-y-1/2 rotate-90 lg:left-1/4 lg:block lg:-translate-x-1/3"></div>
          <div className="features-row-border-light dark:features-row-border-dark absolute right-1/2 top-1/2 block h-[1px] w-1/2 -translate-y-1/2 rotate-90 lg:right-[8.3%] lg:block"></div>

          <div className="flex flex-wrap justify-center">
            {items?.map((feature, index) => (
              <Feature key={index} index={index} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
