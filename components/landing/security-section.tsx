"use client";

import { FC } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Cpu, Globe2, Lock, Activity, FileCheck2 } from "lucide-react";

interface SecurityItem {
  title: string;
  description: string;
  logo?: string | null;
}

const SecurityIcons = [ShieldCheck, FileCheck2, Cpu, Globe2, Lock, Activity];

const SecuritySection: FC = () => {
  const { t } = useTranslation("home-security-section");

  const itemsData = t("items", { returnObjects: true }) as SecurityItem[];
  const items: SecurityItem[] = Array.isArray(itemsData) ? itemsData : [];

  return (
    <section id="security" className="border-t border-border">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {items.map((item, i) => {
            const Icon = SecurityIcons[i] || ShieldCheck;
            return (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  {item.logo ? (
                    <div className="relative h-10 w-10 shrink-0">
                      <Image
                        src={item.logo}
                        alt={item.title}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-foreground/5">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                  )}
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
