"use client";

import { FC } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";

import { routes } from "@/config/routes";
import { trackDemoClick, trackMeetingClick } from "@/lib/analytics";

const CallToActionSection: FC = () => {
  const { t } = useTranslation("home-cta-section");

  return (
    <section id="cta" className="border-t border-border">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="rounded-2xl bg-foreground px-8 py-14 md:px-16 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-background/50 mb-4">
            Gestión societaria sin fricciones
          </p>
          <h2 className="font-serif text-3xl font-normal text-background text-balance sm:text-4xl mb-4">
            {t("header.title")}
          </h2>
          <p className="text-base text-background/70 text-balance max-w-xl mx-auto mb-8">
            {t("header.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={routes.APP_DEMO}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDemoClick("cta-section")}
              className="inline-flex items-center gap-2 rounded-md bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-background/90 transition-colors"
            >
              {t("header.buttonText", "Ver funcionalidades")}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href={routes.APP_CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMeetingClick("cta-section")}
              className="inline-flex items-center gap-2 rounded-md border border-background/20 bg-transparent px-5 py-2.5 text-sm font-medium text-background hover:bg-background/10 transition-colors"
            >
              {t("header.secondaryButtonText", "Agendar demo")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
