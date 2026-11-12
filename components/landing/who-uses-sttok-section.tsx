"use client";

import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

import { localizedHref } from "@/lib/localized-href";
import { useLocale } from "@/lib/use-locale";

interface Profile {
  title: string;
  text: string;
  href: string;
}

/**
 * Los perfiles de comprador de /soluciones, cada uno en una frase en primera
 * persona para que el visitante se reconozca y entre en su página.
 * Los href son las rutas castellanas; localizedHref da la inglesa.
 */
const WhoUsesSttokSection: FC = () => {
  const { t } = useTranslation("home-uses-section");
  const locale = useLocale();

  const data = t("items", { returnObjects: true });
  const items: Profile[] = Array.isArray(data) ? (data as Profile[]) : [];

  return (
    <section id="who-uses-sttok" className="border-t border-border">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-brand">
            {t("header.slogan")}
          </p>
          <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground text-balance sm:text-4xl">
            {t("header.title")}
          </h2>
        </div>

        <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={localizedHref(item.href, locale)}
                className="group flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="mb-2 font-serif text-lg leading-snug text-foreground">
                  {item.title}
                </span>
                <span className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </span>
                <ArrowRight
                  aria-hidden
                  className="mt-4 h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <Link
            href={localizedHref("/soluciones", locale)}
            className="inline-flex items-center gap-1 text-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            {t("link")}
            <ArrowRight aria-hidden className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhoUsesSttokSection;
