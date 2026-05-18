"use client";

import { FC } from "react";
import { useTranslation } from "react-i18next";

interface NumberItem {
  value: string;
  label: string;
}

const NumbersSection: FC = () => {
  const { t } = useTranslation("home-numbers-section");

  const itemsData = t("items", { returnObjects: true }) as NumberItem[];
  const items: NumberItem[] = Array.isArray(itemsData) ? itemsData : [];

  return (
    <section id="numbers" className="border-t border-border bg-backgroundbrand">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-6 text-center"
            >
              <p className="font-serif text-3xl md:text-4xl font-normal text-foreground mb-2">
                {item.value}
              </p>
              <p className="text-sm text-muted-foreground leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          {t("footnote")}
        </p>
      </div>
    </section>
  );
};

export default NumbersSection;
