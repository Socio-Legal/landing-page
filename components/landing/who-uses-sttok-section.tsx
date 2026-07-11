"use client";

import { FC } from "react";
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
  icon: string;
  image?: string;
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
          {items.map((item) => {
            const Icon = ProfileIcons[item.icon] || Building2;
            return (
              <article
                key={item.id}
                className="rounded-lg border border-border bg-card p-6 md:p-8 flex flex-col"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand/10">
                    <Icon className="h-5 w-5 text-brand" />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-foreground leading-tight">
                    {item.title}
                  </h3>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                      Hoy
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.pain}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-brand">
                    <ArrowRight className="h-3 w-3" />
                    <span className="font-medium">Con Sttok</span>
                  </div>

                  <div>
                    <p className="text-sm leading-relaxed text-foreground">
                      {item.with}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Caso real
                  </p>
                  <p className="text-sm leading-snug text-foreground italic">
                    {item.case}
                  </p>
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
