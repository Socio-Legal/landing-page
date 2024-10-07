/* eslint-disable @next/next/no-img-element */
import React from "react";

import "@/components/ui/stars.css";
import "@/components/styles/planet-stars-header.css";

import Blur13 from "@/public/blur-13.svg";
import Blur14 from "@/public/blur-14.svg";
import Blur15 from "@/public/blur-15.svg";

interface PlanetStarsProps {
  children: React.ReactNode;
}

const PlanetStarsSection: React.FC<PlanetStarsProps> = ({ children }) => {
  return (
    <section
      id="pricing"
      className="relative z-20 scroll-mt-17 overflow-hidden pt-24 lg:pt-28 xl:pt-32 bg-white dark:bg-black bg-gradient-to-t from-[white] dark:from-[black] to-light dark:to-dark to-100% bg-[length:100%_500px] bg-bottom bg-no-repeat"
    >
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="relative top-18">
          <div className="pointer-events-none absolute inset-0 -z-10 -my-56 overflow-hidden">
            <div className="absolute left-1/2 top-0 mx-auto aspect-square w-full max-w-[925px] -translate-x-1/2">
              <img
                alt="blur"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="max-w-none"
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
                src={Blur13.src}
              />
            </div>
            <div className="absolute left-1/2 top-0 mx-auto aspect-square w-full max-w-[778px] -translate-x-1/2">
              <img
                alt="blur"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="max-w-none"
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
                src={Blur14.src}
              />
            </div>
            <div className="absolute left-1/2 top-0 mx-auto aspect-square w-full max-w-[584px] -translate-x-1/2">
              <img
                alt="blur"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="max-w-none"
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
                src={Blur15.src}
              />
            </div>
          </div>
          <div className="pricing-circle absolute left-1/2 top-0 h-[830px] w-full max-w-[830px] -translate-x-1/2 rounded-full bg-white dark:bg-black"></div>

          <div className="absolute -top-30 left-1/2 -z-1 h-60 w-full max-w-[482px] -translate-x-1/2 overflow-hidden">
            <div className="stars"></div>
            <div className="stars2"></div>
          </div>
        </div>

        <div className="relative -z-1 flex justify-center gap-7">
          <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
          <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
          <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
          <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
          <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
          <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
          <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
          <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
        </div>

        <div>
          <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanetStarsSection;
