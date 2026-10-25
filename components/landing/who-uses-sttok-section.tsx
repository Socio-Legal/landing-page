"use client";

import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Handshake,
  Scale,
  ServerCog,
  Vote,
} from "lucide-react";

interface ProfileItem {
  id: number;
  title: string;
  pain: string;
  with: string;
  case: string;
  caseLink?: { text: string; href: string };
  icon: string;
}

const ProfileIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Scale,
  Handshake,
  Vote,
  BriefcaseBusiness,
  ServerCog,
};

const WhoUsesSttokSection: FC = () => {
  const { t } = useTranslation("home-uses-section");

  const itemsData = t("items", { returnObjects: true }) as ProfileItem[];
  const items: ProfileItem[] = Array.isArray(itemsData) ? itemsData : [];

  return (
    <section
      id="who-uses-sttok"
      className="border-t border-border bg-backgroundbrand"
    >
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

        {/* En filas, como una tabla: Hoy · Con Sttok · Caso real. No se parece a
            ninguna otra sección de la home. */}
        <div className="mx-auto max-w-6xl overflow-hidden rounded-lg border border-border bg-card">
          <div className="hidden grid-cols-[1.15fr_1fr_1fr_1fr] gap-8 border-b border-border bg-muted/50 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground md:grid">
            <span />
            <span>{t("labels.today")}</span>
            <span className="text-brand">{t("labels.withSttok")}</span>
            <span>{t("labels.realCase")}</span>
          </div>
          {items.map((item) => {
            const Icon = ProfileIcons[item.icon] || Building2;
            return (
              <article
                key={item.id}
                className="grid grid-cols-1 gap-4 border-b border-border px-6 py-6 last:border-b-0 md:grid-cols-[1.15fr_1fr_1fr_1fr] md:gap-8 md:px-8 md:py-7"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand/10">
                    <Icon className="h-4 w-4 text-brand" />
                  </div>
                  <h3 className="font-serif text-lg font-normal leading-snug text-foreground">
                    {item.title}
                  </h3>
                </div>

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground md:hidden">
                    {t("labels.today")}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.pain}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand md:hidden">
                    {t("labels.withSttok")}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">
                    {item.with}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground md:hidden">
                    {t("labels.realCase")}
                  </p>
                  <p className="text-sm italic leading-snug text-foreground">
                    {item.case}
                  </p>
                  {item.caseLink && (
                    <Link
                      href={item.caseLink.href}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand underline-offset-4 hover:underline"
                    >
                      {item.caseLink.text}
                      <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhoUsesSttokSection;
