"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import FaqSection, { FaqItem } from "@/components/shared/faq-section";
import CallToActionSection from "@/components/landing/cta-section";

type Row = { aspect: string; excel: string; sttok: string };

const Page = () => {
  const { t } = useTranslation(["sttok-vs-excel-page", "home-cta-section"]);

  const rowsData = t("sttok-vs-excel-page:rows", {
    returnObjects: true,
  }) as Row[];
  const rows: Row[] = Array.isArray(rowsData) ? rowsData : [];

  return (
    <>
      <section id="vs-hero">
        <div className="container mx-auto px-4 pb-10 pt-16 text-center md:pt-24">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("sttok-vs-excel-page:header.slogan")}
          </p>
          <h1 className="mx-auto mt-4 max-w-[18ch] font-serif text-4xl font-normal leading-tight tracking-tight text-balance text-foreground sm:text-5xl">
            {t("sttok-vs-excel-page:header.title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("sttok-vs-excel-page:header.description")}
          </p>
        </div>
      </section>

      <section id="vs-table">
        <div className="container mx-auto max-w-4xl px-4 pb-14 md:pb-16">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-foreground/50">
                  <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("sttok-vs-excel-page:tableHead.aspect")}
                  </th>
                  <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("sttok-vs-excel-page:tableHead.excel")}
                  </th>
                  <th className="py-3 text-xs font-semibold uppercase tracking-wider text-foreground">
                    {t("sttok-vs-excel-page:tableHead.sttok")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-border align-top">
                    <td className="py-4 pr-4 font-semibold text-foreground">
                      {row.aspect}
                    </td>
                    <td className="py-4 pr-4 leading-relaxed text-muted-foreground">
                      {row.excel}
                    </td>
                    <td className="py-4 leading-relaxed text-foreground">
                      {row.sttok}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow={t("sttok-vs-excel-page:faq.eyebrow")}
        title={t("sttok-vs-excel-page:faq.title")}
        items={
          t("sttok-vs-excel-page:faq.items", {
            returnObjects: true,
          }) as FaqItem[]
        }
      />

      <CallToActionSection />
    </>
  );
};

export default Page;
