"use client";

import React, { FC } from "react";
import Image from "next/image";

import SectionHeader from "../section-header";
import { useTranslation } from "react-i18next";

type TestimonialCardProps = {
  name: string;
  role: string;
  img?: string;
  description: string;
  stars?: number;
};

const TestimonialCard: FC<TestimonialCardProps> = ({
  description,
  name,
  img,
  role,
}) => (
  <figure className="mb-8 flex break-inside-avoid flex-col gap-4 border-l border-border pl-6">
    <blockquote className="font-serif text-base italic leading-relaxed text-foreground">
      “{description}”
    </blockquote>
    <figcaption className="flex items-center gap-3">
      {img && (
        <Image
          src={img}
          alt={name}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full grayscale"
        />
      )}
      <div className="text-sm">
        <span className="font-semibold text-foreground">{name}</span>
        <span className="text-muted-foreground"> · {role}</span>
      </div>
    </figcaption>
  </figure>
);

const TestimonialsSection: FC = () => {
  const { t } = useTranslation("home-testimonials-section");

  const testimonialsData = t("items", { returnObjects: true }) as
    | TestimonialCardProps[]
    | null;
  const testimonials = Array.isArray(testimonialsData)
    ? testimonialsData
    : [];

  return (
    <section id="testimonials" className="border-t border-border">
      <div className="container mx-auto px-4 py-14 md:py-20">
        <SectionHeader
          slogan={t("header.slogan")}
          title={t("header.title")}
          description={t("header.description")}
        />

        <div className="mx-auto max-w-5xl gap-x-12 md:columns-2 xl:columns-3">
          {testimonials.map((card, idx) => (
            <TestimonialCard {...card} key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
