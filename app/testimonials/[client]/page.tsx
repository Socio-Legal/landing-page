"use client";
import React, { FC } from "react";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
import * as Yaba from "@/config/testimonials/clients/Yaba";
import * as DerechoCom from "@/config/testimonials/clients/DerechoCom";
import * as Taxdown from "@/config/testimonials/clients/Taxdown";
import * as Banktrack from "@/config/testimonials/clients/Banktrack";

import CallToActionSection from "@/components/landing/cta-section";
import { blurStyle01 } from "@/components/styles/blur-styles";

type PageProps = {
  params: {
    client: string;
  };
};

type TestimonialSummaryProps = {
  client: string;
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

type TestimonialProps = {
  summary: TestimonialSummaryProps;
  content: TestimonialContentProps;
};

const testimonialPages = {
  Factorial: Factorial,
  PldSpace: PldSpace,
  Yaba: Yaba,
  DerechoCom: DerechoCom,
  Taxdown: Taxdown,
  Banktrack: Banktrack,
};

const getOther2Testimonials = (client: string): TestimonialProps[] => {
  const keys = Object.keys(testimonialPages);
  const index = keys.indexOf(client);

  if (index === -1) {
    return [];
  }

  const otherKeys = keys.filter((key) => key !== client);
  const other2Keys = otherKeys.slice(0, 2);

  const testimonials = other2Keys.map((key) => {
    return testimonialPages[
      key as keyof typeof testimonialPages
    ] as TestimonialProps;
  });

  return testimonials;
};

const Page: FC<PageProps> = ({ params }) => {
  const client: string = params.client;

  const { summary, content } =
    testimonialPages[client as keyof typeof testimonialPages];

  return (
    <>
      <div className="flex min-h-screen container mx-auto px-4">
        {/* Left sidebar */}
        <div
          className="w-full md:w-2/5 bg-backgroundbrand p-6 overflow-y-auto"
          style={blurStyle01}
        >
          <div className="sticky top-6">
            <Link className="inline-flex items-center mb-8" href="#">
              <ArrowLeft className="h-6 w-6 mr-2" />
              <span className="font-semibold">Volver a Testimonios</span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {summary.title}
            </h1>
            {summary.description && (
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {summary.description}
              </p>
            )}
            {summary.quote && (
              <>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {summary.quote.text}
                </p>
                <p className="mb-6">
                  {summary.quote.author}
                  <br />
                  {summary.quote.position}
                </p>
              </>
            )}
            <div className="space-y-4">
              <Link
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
                href={summary.button.link}
                target="_blank"
              >
                {summary.button.text}
              </Link>
              {/* <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Button> */}
            </div>

            <div className="mt-8">
              <ul className="space-y-2">
                {summary.features.map((feature, index) => (
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
                src={content.image.dark}
                alt="Evervault Starter Kit Preview"
                width={800}
                height={400}
                className="rounded-lg shadow-lg hidden dark:block"
              />
              <Image
                src={content.image.light}
                alt="Evervault Starter Kit Preview"
                width={800}
                height={400}
                className="rounded-lg shadow-lg block dark:hidden"
              />
            </section>

            <section className="mb-12">
              {content?.title && (
                <h1 className="text-3xl font-bold mb-8">{content.title}</h1>
              )}

              {content?.sections?.map((section, index) => (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">
                    {section?.title || ""}
                  </h2>

                  {section?.texts?.map((text, index) => (
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {text}
                    </p>
                  ))}
                </div>
              ))}
            </section>

            <section className="justify-self-bottom">
              <h2 className="text-2xl font-bold mb-6">
                Testimonios relacionados
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {getOther2Testimonials(client).map((client, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{client.summary.client}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{client.summary.title}</p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href={`/testimonios/${client.summary.client}`}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full"
                      >
                        Ver Testimonio
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      <CallToActionSection />
    </>
  );
};

export default Page;
