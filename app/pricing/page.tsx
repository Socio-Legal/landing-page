"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { CheckIcon } from "@radix-ui/react-icons";

import PricingPlans from "@/components/pricing/pricing-plans";
import LogoStrip from "@/components/shared/logo-strip";
import CallToActionSection from "@/components/landing/cta-section";

const Page = () => {
  const { t } = useTranslation([
    "pricing-page",
    "home-pricing-section",
    "home-pricing-anchor",
    "home-cta-section",
  ]);

  const highlightsData = t("home-pricing-anchor:highlights", {
    returnObjects: true,
  }) as string[];
  const highlights: string[] = Array.isArray(highlightsData)
    ? highlightsData
    : [];

  return (
    <>
      <section id="pricing-hero">
        <div className="container mx-auto px-4 pb-14 pt-16 text-center md:pb-20 md:pt-24">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("pricing-page:hero.slogan")}
          </p>
          <h1 className="mx-auto mt-4 max-w-[18ch] font-serif text-4xl font-normal leading-tight tracking-tight text-balance text-foreground sm:text-5xl">
            {t("pricing-page:hero.titleLead")}{" "}
            <em>{t("pricing-page:hero.titleEmphasis")}</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("pricing-page:hero.description")}
          </p>

          <div className="mt-12 md:mt-16">
            <PricingPlans />
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 overflow-hidden rounded-lg border border-border bg-card text-left sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((highlight, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 border-t border-border p-4 text-sm text-muted-foreground first:border-t-0 sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(n+3)]:border-t lg:border-t-0 lg:border-l lg:first:border-l-0"
              >
                <CheckIcon className="h-4 w-4 shrink-0" />
                {highlight}
              </div>
            ))}
          </div>

          <p className="mx-auto mt-5 max-w-5xl text-left text-xs text-muted-foreground">
            {t("pricing-page:plans.extras")}
          </p>
        </div>
      </section>

      <section id="pricing-clients" className="border-t border-border">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <LogoStrip
            label={t("pricing-page:clientsLabel")}
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
