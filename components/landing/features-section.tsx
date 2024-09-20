import Image from "next/legacy/image";
import { FC } from "react";

import { header, items as features } from "@/config/features-section";
import Icon01 from "@/public/icon-01.svg";
import Icon02 from "@/public/icon-02.svg";
import Icon03 from "@/public/icon-03.svg";
import Icon04 from "@/public/icon-04.svg";
import Icon05 from "@/public/icon-05.svg";
import Icon06 from "@/public/icon-06.svg";
import Icon07 from "@/public/icon-07.svg";
import Icon08 from "@/public/icon-08.svg";

import "@/components/styles/features-section.css";

import SectionHeader from "../section-header";

const FeatureIcons = {
  Icon01: Icon01,
  Icon02: Icon02,
  Icon03: Icon03,
  Icon04: Icon04,
  Icon05: Icon05,
  Icon06: Icon06,
  Icon07: Icon07,
  Icon08: Icon08,
};

interface FeatureProps {
  index: number;
  feature: {
    icon: string;
    title: string;
    description: string;
  };
}

const Feature: FC<FeatureProps> = ({ index, feature }) => (
  <>
    <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
      <div className="group relative overflow-hidden px-4 py-8 text-center sm:py-10 lg:px-8 xl:px-13 xl:py-15">
        <span
          className={`features-bg absolute left-0 top-0 -z-1 h-full w-full opacity-0 group-hover:opacity-100 ${
            index >= 3 ? "rotate-180" : "undefined"
          }`}
        ></span>
        <span className="icon-border relative mx-auto mb-8 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full">
          <Image
            src={FeatureIcons[feature.icon as keyof typeof FeatureIcons]}
            alt="icon"
            width={32}
            height={32}
          />
        </span>
        <h3 className="mb-4 text-lg font-semibold text-white">
          {feature.title}
        </h3>
        <p className="font-medium text-white/70">{feature.description}</p>
      </div>
    </div>
    {index % 3 === 2 && (
      <div className="features-row-border h-[1px] w-full"></div>
    )}
  </>
);

const FeaturesHeader: FC = () => (
  <SectionHeader
    slogan={header.slogan}
    title={header.title}
    description={header.description}
    buttonText={header.buttonText}
    buttonLink={header.buttonLink}
  />
);

const FeaturesSection: FC = () => {
  return (
    <section
      id="features-section"
      className="scroll-mt-17 overflow-hidden pt-17.5 lg:pt-22.5 xl:pt-27.5 bg-black"
    >
      <div className="mx-auto max-w-[1222px] px-4 sm:px-8 xl:px-0 py-12 md:py-24 lg:py-32">
        <FeaturesHeader />

        <div className="relative">
          <div className="features-row-border absolute left-1/2 top-1/2 hidden h-[1px] w-1/2 -translate-y-1/2 rotate-90 lg:left-1/4 lg:block lg:-translate-x-1/3"></div>
          <div className="features-row-border absolute right-1/2 top-1/2 hidden h-[1px] w-1/2 -translate-y-1/2 rotate-90 lg:right-[8.3%] lg:block"></div>

          <div className="flex flex-wrap justify-center">
            {features.map((feature, index) => (
              <Feature key={index} index={index} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
