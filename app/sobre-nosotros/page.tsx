"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import NumbersSection from "@/components/landing/numbers-section";
import LogoStrip from "@/components/shared/logo-strip";
import SectionHeading from "@/components/shared/section-heading";
import CallToActionSection from "@/components/landing/cta-section";

type Value = { title: string; description: string };

const Page = () => {
  const { t } = useTranslation([
    "about-page",
    "home-numbers-section",
    "home-cta-section",
  ]);

  const bodyData = t("about-page:body", { returnObjects: true }) as string[];
  const body = Array.isArray(bodyData) ? bodyData : [];
  const valuesData = t("about-page:values", {
    returnObjects: true,
  }) as Value[];
  const values = Array.isArray(valuesData) ? valuesData : [];

  return (
    <>
      <section id="about-hero">
        <div className="container mx-auto px-4 pb-10 pt-16 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("about-page:header.slogan")}
            </p>
            <h1 className="mx-auto mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-balance text-foreground sm:text-5xl">
              {t("about-page:header.title")}
            </h1>
            <p className="mx-auto mt-6 text-base leading-relaxed text-muted-foreground">
              {t("about-page:header.description")}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl space-y-5 border-t border-border pt-8">
            {body.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="about-values" className="border-t border-border">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <SectionHeading title={t("about-page:valuesLabel")} />
          <div className="grid grid-cols-1 md:grid-cols-3">
            {values.map((value, i) => (
              <div
                key={i}
                className="py-4 pr-0 md:pr-8 md:[&+&]:border-l md:[&+&]:border-border md:[&+&]:pl-8"
              >
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NumbersSection />

      <section id="about-clients" className="border-t border-border">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <LogoStrip
            label={t("about-page:clientsLabel")}
            primary={[
              "Axa",
              "Andbank",
              "Factorial",
              "Multiverse",
              "PldSpace",
              "Osborne",
            ]}
            secondary={[
              "Caballero",
              "Taxdown",
              "MyInvestor",
              "Barkibu",
              "DerechoCom",
            ]}
          />
        </div>
      </section>

      <CallToActionSection />
    </>
  );
};

export default Page;
