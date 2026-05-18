"use client";

import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FileSignature, KeyRound, Users2, Server } from "lucide-react";

interface IntegrationItem {
  title: string;
  subtitle: string;
  description: string;
}

const IntegrationIcons = [FileSignature, KeyRound, Users2, Server];

const IntegrationsSection: FC = () => {
  const { t } = useTranslation("home-integrations-section");

  const itemsData = t("items", { returnObjects: true }) as IntegrationItem[];
  const items: IntegrationItem[] = Array.isArray(itemsData) ? itemsData : [];

  return (
    <section id="integrations" className="border-t border-border bg-backgroundbrand">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-brand mb-3">
            {t("header.slogan")}
          </p>
          <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground text-balance sm:text-4xl mb-3">
            {t("header.title")}
          </h2>
          <p className="text-base text-muted-foreground text-balance">
            {t("header.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {items.map((item, i) => {
            const Icon = IntegrationIcons[i] || FileSignature;
            return (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand/10">
                  <Icon className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-brand mb-2">{item.subtitle}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
