"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { BorderBeam } from "@/components/magicui/border-beam";
import Blur01 from "@/public/blur-01.svg";
import Blur02 from "@/public/blur-02.svg";

import { getImage } from "@/lib/getImage";

export default function HeroSection() {
  const { t } = useTranslation();

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const hasButton = !!(
    t("home.hero.button.text") && t("home.hero.button.link")
  );

  const lightImage =
    getImage(t, "home.hero.image.light") !== "/home.hero.image.light"
      ? getImage(t, "home.hero.image.light")
      : null;
  const darkImage =
    getImage(t, "home.hero.image.dark") !== "/home.hero.image.dark"
      ? getImage(t, "home.hero.image.dark")
      : null;

  return (
    <section id="hero">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <div className="text-left space-y-2 mx-auto lg:text-left lg:mx-0">
              <h1 className="bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-4xl text-left font-medium leading-none tracking-tighter text-transparent text-balance sm:text-5xl md:text-6xl lg:text-7xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
                {t("home.hero.title")}
              </h1>
            </div>

            <p className="mb-2 text-lg tracking-tight text-gray-400 md:text-xl text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
              {t("home.hero.description")}
            </p>

            {hasButton && (
              <>
                <br />
                <div className="flex justify-center lg:justify-start mt-12">
                  <Link
                    href={t("home.hero.button.link")}
                    target="_blank"
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary shadow hover:bg-primary/90 h-9 px-4 py-2 translate-y-[-1rem] animate-fade-in gap-1 rounded-lg text-white dark:text-black opacity-0 ease-in-out [--animation-delay:600ms]"
                  >
                    <span>{t("home.hero.button.text")}</span>
                    <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                  </Link>
                </div>
              </>
            )}
          </div>

          <div
            ref={ref}
            className="relative animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50"
          >
            <div
              className={`rounded-xl border  bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[filter:blur(180px)] before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] ${
                inView ? "before:animate-image-glow" : ""
              }`}
            >
              <BorderBeam
                size={200}
                duration={12}
                delay={11}
                colorFrom="var(--color-one)"
                colorTo="var(--color-two)"
              />

              {lightImage && (
                <Image
                  alt="Hero image"
                  className="aspect-video object-cover rounded-lg hidden relative w-full h-full rounded-[inherit] border object-contain dark:block"
                  height="420"
                  src={lightImage}
                  width="550"
                />
              )}

              {darkImage && (
                <Image
                  alt="Hero image"
                  className="aspect-video object-cover rounded-lg block relative w-full h-full  rounded-[inherit] border object-contain dark:hidden"
                  height="420"
                  src={darkImage}
                  width="550"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
