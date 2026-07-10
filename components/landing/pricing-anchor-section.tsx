"use client";

import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons";

import { trackMeetingClick, trackDemoClick } from "@/lib/analytics";

const PricingAnchorSection: FC = () => {
  const { t } = useTranslation("home-pricing-anchor");

  const highlightsData = t("highlights", { returnObjects: true }) as string[];
  const highlights: string[] = Array.isArray(highlightsData) ? highlightsData : [];

  return (
    <section id="pricing-anchor" className="border-t border-border">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-brand mb-3">
              {t("header.slogan")}
            </p>
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground text-balance sm:text-4xl mb-4">
              {t("header.title")}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-6">
              {t("header.description")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={t("cta.primaryLink")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMeetingClick("pricing-anchor")}
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
              >
                {t("cta.primary")}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href={t("cta.secondaryLink")}
                onClick={() => trackDemoClick("pricing-anchor-secondary")}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                {t("cta.secondary")}
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <ul className="divide-y divide-border">
              {highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm leading-relaxed text-foreground">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingAnchorSection;
