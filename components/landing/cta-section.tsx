"use client";

import { FC } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";

import { trackDemoClick, trackMeetingClick } from "@/lib/analytics";

const CallToActionSection: FC = () => {
  const { t } = useTranslation("home-cta-section");

  return (
    <section id="cta" className="border-t border-border">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="rounded-2xl bg-foreground px-8 py-14 md:px-16 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-background/50 mb-4">
            {t("header.slogan")}
          </p>
          <h2 className="font-serif text-3xl font-normal text-background text-balance sm:text-4xl mb-4">
            {t("header.title")}
          </h2>
          <p className="text-base text-background/70 text-balance max-w-2xl mx-auto mb-8">
            {t("header.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={t("header.buttonLink")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMeetingClick("cta-final")}
              className="inline-flex items-center gap-2 rounded-md bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-background/90 transition-colors"
            >
              {t("header.buttonText")}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href={t("header.secondaryButtonLink")}
              onClick={() => trackDemoClick("cta-final-secondary")}
              className="inline-flex items-center gap-2 rounded-md border border-background/20 bg-transparent px-5 py-2.5 text-sm font-medium text-background hover:bg-background/10 transition-colors"
            >
              {t("header.secondaryButtonText")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
