/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import Image from "next/legacy/image";

import Marquee from "@/components/magicui/marquee";
import { clientLogos, getClientLogo } from "@/config/client-logos";

import ProductSectionHeader from "../product-section-header";

export type ClientsSectionProps = {
  title: string;
  clients: string[];
  hideTopSpace?: boolean;
};

const ClientsSection: FC<ClientsSectionProps> = ({
  title,
  clients,
  hideTopSpace = false,
}) => {
  const verticalPadding = hideTopSpace
    ? "pb-12 md:pb-24 lg:pb-32"
    : "py-12 md:py-24 lg:py-32";

  return (
    <section id="product-clients" className="bg-white dark:bg-black">
      <div className={`container mx-auto px-4 md:px-8 ${verticalPadding}`}>
        <ProductSectionHeader description={title} />

        <div className="relative mt-6">
          <Marquee className="max-w-full [--duration:40s]">
            {clients?.map((logo, index) => (
              <img
                key={`logo-${index}`}
                src={getClientLogo(logo as keyof typeof clientLogos)}
                className="h-10 w-50 mx-4 mb-8 dark:brightness-0 dark:invert"
                alt={`logo-${logo}`}
              />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
