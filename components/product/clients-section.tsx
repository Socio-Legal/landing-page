import { FC } from "react";
import Image from "next/legacy/image";

import Marquee from "@/components/magicui/marquee";
import { clientLogos, getClientLogo } from "@/config/client-logos";

import ProductSectionHeader from "../product-section-header";

type ClientsSectionProps = {
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
            {clients.map((logo, index) => (
              <div
                key={index}
                className={`h-10 w-40 mx-4 brightness-0 dark:brightness-0 dark:invert mb-8`}
              >
                <Image
                  src={getClientLogo(logo as keyof typeof clientLogos)}
                  alt={logo}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
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
