"use client";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

import * as Factorial from "@/config/testimonials/clients/Factorial";
import * as PldSpace from "@/config/testimonials/clients/PldSpace";
import * as Taxdown from "@/config/testimonials/clients/Taxdown";
import * as Caballero from "@/config/testimonials/clients/Caballero";
import * as MyInvestor from "@/config/testimonials/clients/MyInvestor";

import CallToActionSection from "@/components/landing/cta-section";
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
  image: {
    light: string;
    dark: string;
  };
  sections: {
    title: string;
    texts: string[];
  }[];
};

const testimonialPages = {
  Factorial: Factorial,
  PldSpace: PldSpace,
  Taxdown: Taxdown,
  Caballero: Caballero,
  MyInvestor: MyInvestor,
};

const getOther2Testimonials = (client: string): string[] => {
  const keys = Object.keys(testimonialPages);
  const index = keys.indexOf(client);

  if (index === -1) {
    return [];
  }

  const otherKeys = keys.filter((key) => key !== client);
  const other2Keys = otherKeys.slice(0, 2);

  return other2Keys;
};

/**
 * Ficha de un caso de cliente, en castellano (/testimonios/<cliente>) o en
 * inglés (/en/testimonials/<cliente>). El texto sale de
 * testimonials-<cliente>-page.json del idioma activo.
 */
export const TestimonialCase: FC<TestimonialCaseProps> = ({ client }) => {
  const locale = useLocale();

  // Sin esto, cualquier slug inventado devolvia 200 con la plantilla vacia:
  // /testimonios/LoQueSea era una pagina indexable mas. Solo existen los
  // clientes de testimonialPages.
  if (!(client in testimonialPages)) notFound();

  const namespaces = getTestimonialNamespaces(client);

  const { t } = useTranslation(namespaces);

  const namespace = namespaces.length > 1 ? namespaces[1] : "common";

  const summary = t(`${namespace}:summary`, {
    returnObjects: true,
  }) as TestimonialSummaryProps;

  const content = t(`${namespace}:content`, {
    returnObjects: true,
  }) as TestimonialContentProps;

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen container mx-auto px-4">
        {/* Left sidebar */}
        <div className="w-full md:w-2/5 border-border p-6 md:border-r overflow-y-auto">
          <div className="sticky top-6">
            <Link className="inline-flex items-center mb-8" href={localizedHref("/testimonios", locale)}>
              <ArrowLeft className="h-6 w-6 mr-2" />
              <span className="font-semibold">
                {t("common:testimonials.goBackToTestimonials")}
              </span>
            </Link>
            <h1 className="font-serif text-3xl font-normal tracking-tight text-balance sm:text-4xl mb-4">
              {summary.title}
            </h1>
            {summary.description && (
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {summary.description}
              </p>
            )}
            {summary.quote && (
              <figure className="mb-6 border-l border-border pl-5">
                <blockquote className="font-serif text-lg italic leading-relaxed text-foreground mb-3">
                  “{summary.quote.text}”
                </blockquote>
                <figcaption className="text-sm">
                  <span className="font-semibold">{summary.quote.author}</span>
                  {summary.quote.position && (
                    <>
                      <br />
                      <span className="text-muted-foreground">
                        {summary.quote.position}
                      </span>
                    </>
                  )}
                </figcaption>
              </figure>
            )}
            <div className="space-y-4">
              <Link
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
                href={summary.button?.link || ""}
                target="_blank"
              >
                {summary.button?.text}
              </Link>
              {/* <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Button> */}
            </div>

            <div className="mt-8">
              <ul className="space-y-2">
                {summary.features?.map((feature, index) => (
                  <li
                    key={index}
                    // add border bottom to all but the last item
                    className={`flex justify-between items-center space-x-4 ${
                      index < summary.features.length - 1
                        ? "border-b border-gray-200 dark:border-gray-600 pb-2"
                        : ""
                    }`}
                  >
                    <span>{feature.key}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-right">
                      {feature.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <section className="mb-12">
              <Image
                src={content.image?.dark}
                alt={t("common:testimonials.imageAlt", { client: summary.client })}
                width={800}
                height={400}
                className="rounded-lg shadow-lg hidden dark:block"
              />
              <Image
                src={content.image?.light}
                alt={t("common:testimonials.imageAlt", { client: summary.client })}
                width={800}
                height={400}
                className="rounded-lg shadow-lg block dark:hidden"
              />
            </section>

            <section className="mb-12">
              {content?.title && (
                <h1 className="font-serif text-3xl font-normal mb-8">
                  {content.title}
                </h1>
              )}

              {content?.sections?.map((section, index) => (
                <div className="mb-12" key={`section-content-${index}`}>
                  <h2 className="font-serif text-2xl font-normal mb-4">
                    {section?.title || ""}
                  </h2>

                  {section?.texts?.map((text, indexTexts) => (
                    <p
                      className="text-gray-600 dark:text-gray-300 mb-4"
                      key={`section-texts-${index}-${indexTexts}`}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              ))}
            </section>

            <section className="mt-40 mb-6">
              <h2 className="font-serif text-2xl font-normal mb-6">
                {t("common:testimonials.related")}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {getOther2Testimonials(client).map((otro) => {
                  const ns = getTestimonialNamespaces(otro)[1];
                  const resumen = t(`${ns}:summary`, {
                    returnObjects: true,
                  }) as TestimonialSummaryProps;
                  return (
                  <Card key={otro}>
                    <CardHeader>
                      <CardTitle>{resumen.client}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{resumen.title}</p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href={localizedHref(`/testimonios/${otro}`, locale)}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full"
                      >
                        {t("common:testimonials.viewCase")}
                      </Link>
                    </CardFooter>
                  </Card>
                  );
                })}
              </div>
            </section>
          </div>
        </main>
      </div>

      <CallToActionSection />
    </>
  );
};

export default TestimonialCase;
