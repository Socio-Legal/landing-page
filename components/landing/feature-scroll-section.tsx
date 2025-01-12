"use client";

import React, { FC } from "react";
import Image from "next/image";
import { blurStyle01, blurStyle02 } from "../styles/blur-styles";
import Link from "next/link";

interface FeatureScrollProps {
  direction: "ltr" | "rtl";
  imageSrc: string;
  children: React.ReactNode;
  topPosition?: string;
}

export type FeatureScrollItem = {
  direction: "ltr" | "rtl";
  title: string;
  description: string;
  button?: {
    text: string;
    link: string;
  };
  image: string;
};

export type FeatureScrollSectionProps = {
  features: FeatureScrollItem[];
};

const FeatureScrollContainer: React.FC<FeatureScrollProps> = ({
  direction,
  children,
  imageSrc,
  topPosition = "50%",
}) => {
  const isLTR = direction === "ltr";

  return (
    <div className="w-full">
      <div className="lg:hidden flex flex-col gap-y-10">
        <Image
          src={imageSrc}
          alt="Scrolling"
          width={400}
          height={300}
          className={`w-full max-w-[400px] mx-auto mb-4 rounded-sm ${
            isLTR ? "order-1" : "order-2"
          }`}
        />
        <div className={isLTR ? "order-2" : "order-1"}>{children}</div>
      </div>

      <div className="hidden lg:grid lg:grid-cols-2 h-fit w-full justify-center items-start relative">
        <div
          className="sticky flex justify-center items-center"
          style={{ top: topPosition }}
        >
          {children}
        </div>
        <div
          className={`flex items-center justify-center h-fit ${
            isLTR ? "" : "row-start-1"
          }`}
        >
          <Image
            src={imageSrc}
            alt="Scrolling"
            width={400}
            height={300}
            className="w-full max-w-[400px] mx-auto mb-4 rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureScrollSection: FC<FeatureScrollSectionProps> = ({ features }) => {
  return (
    features && (
      <section id="features-scroll-section" className=" bg-white dark:bg-black">
        <div className="flex flex-col gap-20 container p-10 pb-12 md:pb-24 lg:pb-32 pt-20 md:pt-32 lg:pt-40">
          {features.map((feature, index) => (
            <>
              {feature.direction === "rtl" && (
                <FeatureScrollContainer
                  topPosition="10%"
                  direction="rtl"
                  imageSrc={feature.image}
                >
                  <div className="flex flex-col gap-4 max-w-sm mx-auto lg:mx-0 items-center justify-center lg:items-start lg:justify-start text-center lg:text-left">
                    <h1 className="text-4xl font-bold">{feature.title}</h1>
                    <p className="text-lg">{feature.description}</p>

                    {feature?.button && (
                      <div className="flex gap-4 w-full">
                        <Link
                          href={feature.button.link}
                          className="bg-neutral-800 text-white px-4 py-2 rounded-md"
                        >
                          {feature.button.text}
                        </Link>
                      </div>
                    )}
                  </div>
                </FeatureScrollContainer>
              )}

              {feature.direction === "ltr" && (
                <FeatureScrollContainer
                  topPosition="10%"
                  direction="ltr"
                  imageSrc={feature.image}
                >
                  <div className="flex flex-col gap-4 max-w-sm mx-auto lg:mx-0 items-center justify-center lg:items-start lg:justify-start text-center lg:text-left">
                    <h1 className="text-4xl font-bold">{feature.title}</h1>
                    <p className="text-lg">{feature.description}</p>

                    {feature?.button && (
                      <div className="flex gap-4">
                        <Link
                          href={feature.button.link}
                          className="bg-neutral-800 text-white px-4 py-2 rounded-md"
                        >
                          {feature.button.text}
                        </Link>
                      </div>
                    )}
                  </div>
                </FeatureScrollContainer>
              )}

              {index + 1 !== features.length && <hr className="mx-60" />}
            </>
          ))}
        </div>
      </section>
    )
  );
};

export default FeatureScrollSection;
