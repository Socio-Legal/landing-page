"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FC, useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import Blur01 from "@/public/blur-01.svg";
import Blur02 from "@/public/blur-02.svg";

type HeroSectionProps = {
  title: string;
  description: string;
  button?: {
    text: string;
    link: string;
  };
  image?: {
    light: string;
    dark: string;
  };
};

const HeroSection: FC<HeroSectionProps> = ({
  title,
  description,
  button,
  image,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const hasButton = !!(button?.text && button?.link);

  return (
    <section id="product-hero">
      <div className="container mx-auto px-7 py-12 md:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="-u-z-10 hero-circle-gradient absolute -top-[128%] left-1/2 -z-1 h-[1282px] w-full max-w-[1282px] -translate-x-1/2 rounded-full sm:-top-[107%] xl:-top-[73%]"></div>
            <div className="-u-z-10 hero-circle-gradient absolute -top-[112%] left-1/2 -z-1 h-[1046px] w-full max-w-[1046px] -translate-x-1/2 rounded-full sm:-top-[93%] xl:-top-[62%]"></div>
            <div className="-u-z-10 absolute left-1/2 top-0 aspect-[1204/394] w-full max-w-[1204px] -translate-x-1/2">
              <Image
                alt="blur"
                className="max-w-none"
                height="394"
                layout="responsive"
                src={Blur02.src}
                width="1204"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  color: "transparent",
                }}
              />
            </div>
            <div
              className="-u-z-10 absolute left-1/2 top-0 h-full w-full -translate-x-1/2 bg-cover bg-top bg-no-repeat"
              style={{
                backgroundImage: `url(${Blur01.src})`,
              }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 items-center">
          <div className="space-y-2">
            <div className="text-center space-y-2 mx-auto lg:text-center lg:mx-0">
              <h1 className="text-center bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-4xl text-left font-medium leading-none tracking-tighter text-transparent text-balance sm:text-5xl md:text-6xl lg:text-7xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
                {title}
              </h1>
            </div>

            <p className="mb-2 text-lg tracking-tight text-gray-400 md:text-xl text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
              {description}
            </p>

            {hasButton && (
              <>
                <br />
                <div className="flex justify-center lg:justify-start mt-12">
                  <Link
                    href={button.link}
                    target="_blank"
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary shadow hover:bg-primary/90 h-9 px-4 py-2 translate-y-[-1rem] animate-fade-in gap-1 rounded-lg text-white dark:text-black opacity-0 ease-in-out [--animation-delay:600ms]"
                  >
                    <span>{button.text}</span>
                    <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
