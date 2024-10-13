/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { FC, ReactNode } from "react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";

import Marquee from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

import SectionHeader from "../section-header";
import { useTranslation } from "react-i18next";

const Highlight = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-cyan-600/20 p-1 py-0.5 font-bold text-cyan-600 dark:bg-cyan-600/20 dark:text-cyan-600",
        className
      )}
    >
      {children}
    </span>
  );
};

type TestimonialStarsProps = {
  stars: number;
};

type TestimonialCardProps = {
  name: string;
  role: string;
  img?: string;
  description: string;
  className?: string;
  stars?: number;
  [key: string]: any;
};

const TestimonialStars: FC<TestimonialStarsProps> = ({ stars }) => (
  <div className="flex flex-row py-1">
    {Array(stars)
      .fill(0)
      .map((_, i) => (
        <StarFilledIcon key={i} className="size-4 text-yellow-500" />
      ))}
  </div>
);

const TestimonialCard: FC<TestimonialCardProps> = ({
  description,
  name,
  img,
  role,
  stars,
  className,
  ...props
}) => (
  <div
    className={cn(
      "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
      // light styles
      " border border-neutral-200 bg-white",
      // dark styles
      "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    {...props}
  >
    <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
      <p>"{description}"</p>
      <TestimonialStars stars={stars || 0} />
    </div>

    <div className="flex w-full select-none items-center justify-start gap-5">
      {img && (
        <Image
          src={img}
          alt={name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full ring-1 ring-border ring-offset-4"
        />
      )}

      <div>
        <p className="font-medium text-neutral-500">{name}</p>
        <p className="text-xs font-normal text-neutral-400">{role}</p>
      </div>
    </div>
  </div>
);

const TestimonialsHeader: FC = () => {
  const { t } = useTranslation("home-testimonials-section");

  return (
    <SectionHeader
      slogan={t("header.slogan")}
      title={t("header.title")}
      description={t("header.description")}
    />
  );
};

const TestimonialsSection: FC = () => {
  const { t } = useTranslation("home-testimonials-section");

  const testimonials = t("items", { returnObjects: true }) as
    | TestimonialCardProps[]
    | [];

  return (
    <section
      id="testimonials"
      className="bg-gradient-to-b bg-white dark:bg-black from-white from-40% dark:from-black"
    >
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-24 lg:py-32">
        <TestimonialsHeader />

        <div className="relative mt-6 max-h-[650px] overflow-hidden">
          <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-3">
            {Array(Math.ceil(testimonials.length / 3))
              .fill(0)
              .map((_, i) => (
                <Marquee
                  vertical
                  key={i}
                  className={cn({
                    "[--duration:60s]": i === 1,
                    "[--duration:30s]": i === 2,
                    "[--duration:70s]": i === 3,
                  })}
                >
                  {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                    <TestimonialCard {...card} key={idx} />
                  ))}
                </Marquee>
              ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-white from-20% dark:from-black"></div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-white from-20% dark:from-black"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
