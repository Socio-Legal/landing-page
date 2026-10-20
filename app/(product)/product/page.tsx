"use client";
import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";

import HeroSection, {
  HeroSectionProps,
} from "@/components/product/hero-section";
import SectionHeading from "@/components/shared/section-heading";
import LogoStrip from "@/components/shared/logo-strip";
import FaqSection, { FaqItem } from "@/components/shared/faq-section";
import CallToActionSection from "@/components/landing/cta-section";

/** `href`: página propia de la funcionalidad en /funcionalidades, si la tiene. */
type ModuleItem = { title: string; description: string; href?: string };
type ModuleGroup = {
  title: string;
  summary?: string;
  href?: string;
  items: ModuleItem[];
};
/** `href`: guía que desarrolla la situación (solo castellano; en inglés, sin enlace). */
type SituationRow = { situation: string; action: string; href?: string };
type Figure = { value: string; label: string };

const asArray = <T,>(value: unknown): T[] =>
  Array.isArray(value) ? (value as T[]) : [];

/** Espaciado vertical común a todas las secciones de la página. */
const SECTION = "container mx-auto px-4 py-20 md:py-28";

/** Enlace de texto con flecha que se desplaza al pasar el ratón. */
const linkClass =
  "group/link inline-flex items-center gap-1.5 rounded-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background";
const Arrow = () => (
  <ArrowRightIcon
    aria-hidden
    className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
  />
);

const Page = () => {
  const { t } = useTranslation("product-hero-section");

  const hero = t("hero", { returnObjects: true }) as HeroSectionProps;
  const groups = asArray<ModuleGroup>(
    t("modules.groups", { returnObjects: true }),
  );
  const rows = asArray<SituationRow>(
    t("situations.rows", { returnObjects: true }),
  );
  const paragraphs = asArray<string>(
    t("onboarding.paragraphs", { returnObjects: true }),
  );
  const figures = asArray<Figure>(t("figures.items", { returnObjects: true }));
  const faq = asArray<FaqItem>(t("faq.items", { returnObjects: true }));
  // Enlaces opcionales: llevan a páginas que solo existen en castellano.
  const allLink = t("modules.allLink", { defaultValue: "" });
  const onboardingLink = t("onboarding.link", { returnObjects: true }) as
    | { text: string; href: string }
    | string;
  const onboardingHref =
    typeof onboardingLink === "object" ? onboardingLink : undefined;

  return (
    <>
      <HeroSection {...hero} />

      {/* Módulos: una fila por parte de la vida societaria. Retícula de 12
          columnas: el nombre del módulo ocupa 4 y sus funciones, 8. */}
      <section id="modules" className="scroll-mt-14 border-t border-border">
        <div className={SECTION}>
          <SectionHeading
            variant="plain"
            eyebrow={t("modules.eyebrow")}
            title={t("modules.title")}
            lede={t("modules.lede")}
          />

          <div className="border-t border-border">
            {groups.map((group) => (
              <div
                key={group.title}
                className="grid grid-cols-1 gap-y-6 border-b border-border py-10 last:border-b-0 last:pb-0 md:grid-cols-12 md:gap-x-12 md:py-12"
              >
                <div className="md:col-span-4">
                  <h3 className="font-serif text-2xl font-normal leading-7 text-foreground">
                    {group.href ? (
                      <Link href={group.href} className={linkClass}>
                        {group.title}
                        <Arrow />
                      </Link>
                    ) : (
                      group.title
                    )}
                  </h3>
                  {group.summary && (
                    <p className="mt-3 max-w-[30ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {group.summary}
                    </p>
                  )}
                </div>

                <dl className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 md:col-span-8">
                  {group.items.map((item) => (
                    <div key={item.title}>
                      <dt className="text-[0.9375rem] font-semibold leading-7 text-foreground">
                        {item.href ? (
                          <Link href={item.href} className={linkClass}>
                            {item.title}
                            <Arrow />
                          </Link>
                        ) : (
                          item.title
                        )}
                      </dt>
                      <dd className="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
                        {item.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          {allLink && (
            <p className="mt-10 text-sm">
              <Link href="/funcionalidades" className={linkClass}>
                {allLink}
                <Arrow />
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* Clientes por relevancia, los más potentes primero: 9 arriba y 8
          abajo, para que ninguna fila quede con un logo suelto */}
      <section id="clients" className="border-t border-border">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <LogoStrip
            label={t("clientsLabel")}
            primary={[
              "Factorial",
              "Axa",
              "Andbank",
              "Osborne",
              "Taxdown",
              "PldSpace",
              "Caballero",
              "Fanalca",
              "Multiverse",
            ]}
            secondary={[
              "MyInvestor",
              "DerechoCom",
              "Shakers",
              "Cabiedes",
              "LegalPigeon",
              "Banktrack",
              "Barkibu",
              "Sade",
            ]}
          />
        </div>
      </section>

      {/* Situaciones: tabla en escritorio, lista apilada en móvil */}
      <section id="situations" className="border-t border-border">
        <div className={SECTION}>
          <SectionHeading
            variant="plain"
            eyebrow={t("situations.eyebrow")}
            title={t("situations.title")}
          />

          <ul className="divide-y divide-border border-y border-border md:hidden">
            {rows.map((row) => (
              <li key={row.situation} className="py-6">
                <p className="text-[0.9375rem] font-semibold text-foreground">
                  {row.situation}
                </p>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {row.action}
                </p>
                {row.href && (
                  <Link href={row.href} className={`${linkClass} mt-3 text-sm`}>
                    {t("situations.guideLabel")}
                    <Arrow />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* table-fixed y anchos calculados: la segunda columna arranca en la
              columna 5 de la retícula, igual que las funciones de cada módulo */}
          <table className="hidden w-full table-fixed border-collapse text-left md:table">
            <colgroup>
              {/* 4 de 12 columnas = 33,3 % menos un hueco; el pl-4 de la segunda
                  columna recupera ese rem y la alinea con la columna 5 */}
              <col style={{ width: "33.333%" }} />
              <col />
              <col style={{ width: "9rem" }} />
            </colgroup>
            <thead>
              <tr className="border-y border-border">
                <th className="py-4 pr-12 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {t("situations.columns.situation")}
                </th>
                <th className="py-4 pl-4 pr-12 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {t("situations.columns.action")}
                </th>
                <th className="py-4 text-right text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="sr-only">
                    {t("situations.columns.guide")}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.situation}
                  className="border-b border-border align-baseline"
                >
                  <td className="py-6 pr-12 text-[0.9375rem] font-semibold text-foreground">
                    {row.situation}
                  </td>
                  <td className="py-6 pl-4 pr-12 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {row.action}
                  </td>
                  <td className="whitespace-nowrap py-6 text-right text-sm">
                    {row.href && (
                      <Link href={row.href} className={linkClass}>
                        {t("situations.guideLabel")}
                        <Arrow />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Puesta en marcha: misma retícula que los módulos */}
      <section id="onboarding" className="border-t border-border">
        <div className={`${SECTION} grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-12`}>
          <div className="md:col-span-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {t("onboarding.eyebrow")}
            </p>
            <h2 className="font-serif text-3xl font-normal leading-[1.15] text-balance text-foreground sm:text-[2.5rem]">
              {t("onboarding.title")}
            </h2>
          </div>
          <div className="space-y-4 md:col-span-8 md:pt-8">
            {paragraphs.map((p) => (
              <p
                key={p}
                className="max-w-[62ch] text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]"
              >
                {p}
              </p>
            ))}
            {onboardingHref?.href && (
              <p className="pt-2 text-sm">
                <Link href={onboardingHref.href} className={linkClass}>
                  {onboardingHref.text}
                  <Arrow />
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Cifras, con la relación clientes/sociedades explicada */}
      <section id="figures" className="border-t border-border">
        <div className={SECTION}>
          <SectionHeading
            variant="plain"
            eyebrow={t("figures.eyebrow")}
            title={t("figures.title")}
          />
          {/* Filetes de 1 px con gap-px sobre fondo de borde: sin bordes por celda */}
          <dl className="grid grid-cols-2 gap-px border-y border-border bg-border md:grid-cols-4">
            {figures.map((f) => (
              <div
                key={f.label}
                className="flex flex-col-reverse justify-end gap-3 bg-background py-8 pr-6 md:py-10 [&:nth-child(even)]:pl-6 md:[&:not(:first-child)]:pl-8"
              >
                <dt className="text-sm leading-snug text-muted-foreground">
                  {f.label}
                </dt>
                <dd className="whitespace-nowrap font-serif text-[1.75rem] font-normal tabular-nums leading-none text-foreground sm:text-4xl lg:text-5xl">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
            {t("figures.note")}
          </p>
        </div>
      </section>

      <FaqSection
        headingVariant="plain"
        eyebrow={t("faq.eyebrow")}
        title={t("faq.title")}
        items={faq}
      />

      <CallToActionSection
        secondary={{
          text: t("cta.secondaryText"),
          link: t("cta.secondaryLink"),
        }}
      />
    </>
  );
};

export default Page;
