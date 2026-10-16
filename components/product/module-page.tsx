"use client";

import React, { FC } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";

import HeroSection, {
  HeroSectionProps,
} from "@/components/product/hero-section";
import TestimonialsSection, {
  TestimonialsSectionProps,
} from "@/components/product/testimonials-section";
import SectionHeading from "@/components/shared/section-heading";
import LogoStrip from "@/components/shared/logo-strip";
import FaqSection, { FaqItem } from "@/components/shared/faq-section";
import CallToActionSection from "@/components/landing/cta-section";
import { CATALOGO, Modulo, enIngles } from "@/lib/funcionalidades-catalogo";

type SituationRow = { situation: string; action: string; href?: string };
type Figure = { value: string; label: string };

const asArray = <T,>(value: unknown): T[] =>
  Array.isArray(value) ? (value as T[]) : [];

const SECTION = "container mx-auto px-4 py-20 md:py-28";

const linkClass =
  "group/link inline-flex items-center gap-1.5 rounded-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background";
const Arrow = () => (
  <ArrowRightIcon
    aria-hidden
    className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5"
  />
);

type ModulePageProps = {
  /** Namespace de i18next con los textos de la página. */
  ns: string;
  /** Módulos del catálogo (lib/funcionalidades-catalogo.ts) que cubre la página. */
  modulos: string[];
  /**
   * Páginas de solución: por módulo, las funcionalidades (títulos del
   * catálogo en castellano) que importan a ese perfil, en ese orden. Sin
   * selección se muestran todas.
   */
  seleccion?: Record<string, string[]>;
};

/**
 * Página de módulo de producto (/libro-de-socios, /planes-de-incentivos,
 * /juntas-consejos, /simulador, /mercado-secundario). Misma retícula que
 * /producto. La lista de funcionalidades sale del catálogo, la misma fuente
 * que /funcionalidades, para que las dos páginas no se contradigan.
 */
const ModulePage: FC<ModulePageProps> = ({ ns, modulos, seleccion }) => {
  const { t, i18n } = useTranslation([ns, "product-hero-section"]);
  const en = i18n.language === "en";

  const hero = t(`${ns}:hero`, { returnObjects: true }) as HeroSectionProps;
  const grupos = modulos
    .map((id) => CATALOGO.find((m) => m.id === id))
    .filter((m): m is Modulo => Boolean(m))
    .map((m) => {
      const elegidas = seleccion?.[m.id];
      if (!elegidas) return enIngles(m, en);
      const filtrado = {
        ...m,
        funcionalidades: elegidas
          .map((t) => m.funcionalidades.find((f) => f.titulo === t))
          .filter((f): f is Modulo["funcionalidades"][number] => Boolean(f)),
      };
      return { ...enIngles(filtrado, en), total: m.funcionalidades.length };
    });
  const rows = asArray<SituationRow>(
    t(`${ns}:situations.rows`, { returnObjects: true }),
  );
  const faq = asArray<FaqItem>(t(`${ns}:faq.items`, { returnObjects: true }));
  const testimonials = t(`${ns}:testimonials`, {
    returnObjects: true,
  }) as TestimonialsSectionProps;
  const figures = asArray<Figure>(
    t("product-hero-section:figures.items", { returnObjects: true }),
  );
  const allLink = en ? "" : t(`${ns}:includes.allLink`, { defaultValue: "" });

  return (
    <>
      <HeroSection {...hero} />

      <section id="clients" className="border-t border-border">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <LogoStrip
            label={t("product-hero-section:clientsLabel")}
            primary={[
              "Factorial",
              "Axa",
              "Andbank",
              "Osborne",
              "Taxdown",
              "PldSpace",
              "Caballero",
              "Fanalca",
            ]}
            secondary={[
              "Multiverse",
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

      {/* Qué incluye: las funcionalidades del módulo, del catálogo */}
      <section id="includes" className="border-t border-border">
        <div className={SECTION}>
          <SectionHeading
            variant="plain"
            eyebrow={t(`${ns}:includes.eyebrow`)}
            title={t(`${ns}:includes.title`)}
            lede={t(`${ns}:includes.lede`, { defaultValue: "" }) || undefined}
          />
          <div className="border-t border-border">
            {grupos.map((g) => (
              <div
                key={g.titulo}
                className="grid grid-cols-1 gap-y-6 border-b border-border py-10 last:border-b-0 last:pb-0 md:grid-cols-12 md:gap-x-12 md:py-12"
              >
                <div className="md:col-span-4">
                  <h3 className="font-serif text-2xl font-normal leading-7 text-foreground">
                    {seleccion && g.href ? (
                      <Link href={g.href} className={linkClass}>
                        {g.titulo}
                        <Arrow />
                      </Link>
                    ) : (
                      g.titulo
                    )}
                  </h3>
                  <p className="mt-3 max-w-[30ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {g.resumen}
                  </p>
                </div>
                <dl className="grid grid-cols-1 gap-x-12 gap-y-7 sm:grid-cols-2 md:col-span-8">
                  {g.funcionalidades.map((f) => (
                    <div key={f.titulo}>
                      <dt className="text-[0.9375rem] font-semibold leading-7 text-foreground">
                        {f.href ? (
                          <Link href={f.href} className={linkClass}>
                            {f.titulo}
                            <Arrow />
                          </Link>
                        ) : (
                          f.titulo
                        )}
                      </dt>
                      <dd className="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
                        {f.descripcion}
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

      {/* Situaciones: tabla en escritorio, lista apilada en móvil */}
      {rows.length > 0 && (
        <section id="situations" className="border-t border-border">
          <div className={SECTION}>
            <SectionHeading
              variant="plain"
              eyebrow={t(`${ns}:situations.eyebrow`)}
              title={t(`${ns}:situations.title`)}
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
                      {t(`${ns}:situations.guideLabel`)}
                      <Arrow />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <table className="hidden w-full table-fixed border-collapse text-left md:table">
              <colgroup>
                <col style={{ width: "33.333%" }} />
                <col />
                <col style={{ width: "9rem" }} />
              </colgroup>
              <thead>
                <tr className="border-y border-border">
                  <th className="py-4 pr-12 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {t(`${ns}:situations.columns.situation`)}
                  </th>
                  <th className="py-4 pl-4 pr-12 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {t(`${ns}:situations.columns.action`)}
                  </th>
                  <th className="py-4">
                    <span className="sr-only">
                      {t(`${ns}:situations.columns.guide`)}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.situation} className="border-b border-border align-baseline">
                    <td className="py-6 pr-12 text-[0.9375rem] font-semibold text-foreground">
                      {row.situation}
                    </td>
                    <td className="py-6 pl-4 pr-12 text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {row.action}
                    </td>
                    <td className="whitespace-nowrap py-6 text-right text-sm">
                      {row.href && (
                        <Link href={row.href} className={linkClass}>
                          {t(`${ns}:situations.guideLabel`)}
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
      )}

      {Array.isArray(testimonials?.items) && testimonials.items.length > 0 && (
        <TestimonialsSection {...testimonials} />
      )}

      <section id="figures" className="border-t border-border">
        <div className={SECTION}>
          <SectionHeading
            variant="plain"
            eyebrow={t("product-hero-section:figures.eyebrow")}
            title={t("product-hero-section:figures.title")}
          />
          <dl className="grid grid-cols-2 gap-px border-y border-border bg-border md:grid-cols-4">
            {figures.map((f) => (
              <div
                key={f.label}
                className="flex flex-col-reverse justify-end gap-3 bg-background py-8 pr-6 md:py-10 [&:nth-child(even)]:pl-6 md:[&:not(:first-child)]:pl-8"
              >
                <dt className="text-sm leading-snug text-muted-foreground">{f.label}</dt>
                <dd className="whitespace-nowrap font-serif text-[1.75rem] font-normal tabular-nums leading-none text-foreground sm:text-4xl lg:text-5xl">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
            {t("product-hero-section:figures.note")}
          </p>
        </div>
      </section>

      <FaqSection
        headingVariant="plain"
        eyebrow={t(`${ns}:faq.eyebrow`, { defaultValue: "FAQ" })}
        title={t(`${ns}:faq.title`)}
        items={faq}
      />

      <CallToActionSection
        secondary={{
          text: t("product-hero-section:cta.secondaryText"),
          link: t("product-hero-section:cta.secondaryLink"),
        }}
      />
    </>
  );
};

export default ModulePage;
