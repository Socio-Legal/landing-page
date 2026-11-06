"use client";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import * as Factorial from "@/config/testimonials/clients/Factorial";
import * as PldSpace from "@/config/testimonials/clients/PldSpace";
import * as Taxdown from "@/config/testimonials/clients/Taxdown";
import * as Caballero from "@/config/testimonials/clients/Caballero";
import * as MyInvestor from "@/config/testimonials/clients/MyInvestor";
import * as Axa from "@/config/testimonials/clients/Axa";
import * as Osborne from "@/config/testimonials/clients/Osborne";
import * as Fanalca from "@/config/testimonials/clients/Fanalca";
import * as Multiverse from "@/config/testimonials/clients/Multiverse";
import * as Sade from "@/config/testimonials/clients/Sade";

import CallToActionSection from "@/components/landing/cta-section";
import { clientLogos } from "@/config/client-logos";
import { getTestimonialNamespaces } from "@/lib/getTestimonialNamespaces";
import { localizedHref } from "@/lib/localized-href";
import { useLocale } from "@/lib/use-locale";

type TestimonialCaseProps = {
  client: string;
};

type TestimonialSummaryProps = {
  client: string;
  url?: string;
  title: string;
  description?: string;
  quote?: {
    text: string;
    author: string;
    position: string;
  };
  button: {
    text: string;
    link: string;
  };
  features: { key: string; value: string }[];
};

type TestimonialContentProps = {
  title: string;
  image?: {
    light: string;
    dark: string;
  };
  sections: {
    title: string;
    texts: string[];
  }[];
  /** Cómo usan Sttok, con su pantalla si la hay. Opcional. */
  uses?: { title: string; text: string; image?: string }[];
  /** Más fotos de su negocio, bajo «Qué hacen». Opcional. */
  gallery?: { src: string; alt: string }[];
};

const testimonialPages = {
  Factorial: Factorial,
  PldSpace: PldSpace,
  Taxdown: Taxdown,
  Caballero: Caballero,
  MyInvestor: MyInvestor,
  Axa: Axa,
  Osborne: Osborne,
  Fanalca: Fanalca,
  Multiverse: Multiverse,
  Sade: Sade,
};

/** Clave del cliente en clientLogos (TaxDown y PLD Space se escriben distinto). */
const LOGO: Record<string, keyof typeof clientLogos> = {
  Factorial: "Factorial",
  PldSpace: "PldSpace",
  Taxdown: "Taxdown",
  Caballero: "Caballero",
  MyInvestor: "MyInvestor",
  Axa: "Axa",
  Osborne: "Osborne",
  Fanalca: "Fanalca",
  Multiverse: "Multiverse",
  Sade: "Sade",
};

const getOtherTestimonials = (client: string, n = 3): string[] =>
  Object.keys(testimonialPages).filter((key) => key !== client).slice(0, n);

/** «1. Por la facilidad de uso.» → «Por la facilidad de uso.» */
const sinNumero = (s: string) => s.replace(/^\d+\.\s*/, "");

/**
 * Ficha de un caso de cliente, en castellano (/testimonios/<cliente>) o en
 * inglés (/en/testimonials/<cliente>): la foto de su negocio, qué hacen, cómo
 * usan Sttok y su cita. El texto sale de testimonials-<cliente>-page.json.
 */
export const TestimonialCase: FC<TestimonialCaseProps> = ({ client }) => {
  const locale = useLocale();

  // Sin esto, cualquier slug inventado devolvia 200 con la plantilla vacia:
  // /testimonios/LoQueSea era una pagina indexable mas. Solo existen los
  // clientes de testimonialPages.
  if (!(client in testimonialPages)) notFound();

  const namespaces = getTestimonialNamespaces(client);
  const otros = getOtherTestimonials(client);
  const { t } = useTranslation([
    ...namespaces,
    ...otros.map((o) => getTestimonialNamespaces(o)[1]),
  ]);

  const namespace = namespaces.length > 1 ? namespaces[1] : "common";

  const summary = t(`${namespace}:summary`, {
    returnObjects: true,
  }) as TestimonialSummaryProps;

  const content = t(`${namespace}:content`, {
    returnObjects: true,
  }) as TestimonialContentProps;

  const logo = clientLogos[LOGO[client]];
  // La primera sección es «Un poco sobre…»; la segunda, por qué eligieron Sttok.
  const [about, why] = content.sections ?? [];
  const meta = (summary.features ?? []).filter((f) => f.value && f.value !== summary.client);
  const uses = Array.isArray(content.uses) ? content.uses : [];
  const gallery = Array.isArray(content.gallery) ? content.gallery : [];

  return (
    <>
      {/* Migas */}
      <nav aria-label="breadcrumb" className="border-b border-border">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-3 text-sm">
          <p className="text-muted-foreground">
            <Link href={localizedHref("/testimonios", locale)} className="font-medium text-foreground hover:underline">
              {t("common:testimonials.home")}
            </Link>{" "}
            / {summary.client}
          </p>
          <Link href={localizedHref("/testimonios", locale)} className="inline-flex items-center gap-1.5 font-medium text-foreground hover:underline">
            <ArrowLeft className="h-4 w-4" />
            {t("common:testimonials.goBackToTestimonials")}
          </Link>
        </div>
      </nav>

      {/* Cabecera: titular y la foto de su negocio */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            {logo && <Image src={logo} alt={summary.client} className="h-8 w-auto max-w-44 object-contain object-left dark:invert" />}
            <h1 className="mt-6 font-serif text-4xl font-normal leading-tight tracking-tight text-balance md:text-5xl lg:text-6xl">
              {summary.title}
            </h1>
            {meta.length > 0 && (
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {meta
                  .map((f) =>
                    /^(desde|since)$/i.test(f.key)
                      ? `${locale === "en" ? "Customer since" : "Cliente desde"} ${f.value}`
                      : f.value,
                  )
                  .join(" · ")}
              </p>
            )}
          </div>
          {content.image?.light ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={content.image.light}
                alt={t("common:testimonials.imageAlt", { client: summary.client })}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* Qué hacen */}
      {about && (
        <section className="border-t border-border">
          <div className="container mx-auto grid gap-8 px-4 py-14 md:grid-cols-[1fr_2fr] md:py-16">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {t("common:testimonials.whatTheyDo")}
            </p>
            <div>
              {about.texts.map((text, i) => (
                <p key={i} className="font-serif text-2xl leading-snug md:text-3xl [&+&]:mt-4">
                  {text}
                </p>
              ))}
              {summary.button?.link && (
                <a
                  href={summary.button.link}
                  target="_blank"
                  rel="noopener"
                  className="mt-6 inline-block text-sm font-medium underline-offset-4 hover:underline"
                >
                  {t("common:testimonials.visit", { client: summary.client })} →
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Más fotos de su negocio */}
      {gallery.length > 0 && (
        <section className="container mx-auto px-4 pb-14 md:pb-16">
          <div className={gallery.length > 2 ? "grid gap-4 md:grid-cols-3" : "grid gap-4 md:grid-cols-2"}>
            {gallery.map((g) => (
              <div key={g.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={g.src} alt={g.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cómo usan Sttok */}
      {(uses.length > 0 || why) && (
        <section className="border-t border-border bg-muted/40">
          <div className="container mx-auto px-4 py-14 md:py-16">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {uses.length > 0 ? t("common:testimonials.howTheyUse") : t("common:testimonials.whyChose")}
            </p>
            {uses.length > 0 ? (
              <div className="mt-8 grid gap-8 md:grid-cols-3">
                {uses.map((u) => (
                  <figure key={u.title}>
                    {u.image ? (
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
                        <Image src={u.image} alt="" aria-hidden fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" />
                      </div>
                    ) : null}
                    <figcaption className={u.image ? "mt-4" : ""}>
                      <p className="font-semibold">{u.title}</p>
                      <p className="mt-1.5 leading-relaxed text-muted-foreground">{u.text}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <ul className="mt-8 grid gap-x-10 gap-y-4 md:grid-cols-2">
                {why!.texts.map((text, i) => (
                  <li key={i} className="border-l border-border pl-4 text-lg leading-snug">
                    {sinNumero(text)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* La cita */}
      {summary.quote?.text && (
        <section className="bg-[#1D2433] text-white">
          <figure className="container mx-auto max-w-4xl px-4 py-20 text-center md:py-24">
            <blockquote className="font-serif text-3xl italic leading-snug md:text-4xl">
              “{summary.quote.text.replace(/^'|'$/g, "")}”
            </blockquote>
            <figcaption className="mt-6 text-sm text-white/75">
              {[summary.quote.author, summary.quote.position].filter(Boolean).join(" · ")}
            </figcaption>
          </figure>
        </section>
      )}

      {/* Más historias */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        <h2 className="font-serif text-3xl font-normal md:text-4xl">{t("common:testimonials.related")}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {otros.map((otro) => {
            const ns = getTestimonialNamespaces(otro)[1];
            const resumen = t(`${ns}:summary`, { returnObjects: true }) as TestimonialSummaryProps;
            const foto = (t(`${ns}:content`, { returnObjects: true }) as TestimonialContentProps).image?.light;
            const suLogo = clientLogos[LOGO[otro]];
            return (
              <Link
                key={otro}
                href={localizedHref(`/testimonios/${otro}`, locale)}
                className="relative flex h-64 flex-col justify-between overflow-hidden rounded-2xl text-white"
              >
                {foto ? (
                  <>
                    <Image src={foto} alt="" aria-hidden fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                    <div className="absolute inset-0 bg-[rgba(13,18,30,0.45)]" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-[#1D2433]" />
                )}
                <div className="relative p-5">
                  {suLogo && <Image src={suLogo} alt={resumen.client} className="h-6 w-auto max-w-36 object-contain object-left brightness-0 invert" />}
                </div>
                <div className="relative p-5">
                  <p className="font-semibold leading-snug">{resumen.title}</p>
                  <p className="mt-2 text-sm text-white/85">{t("common:testimonials.viewCase")} →</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <CallToActionSection />
    </>
  );
};

export default TestimonialCase;
