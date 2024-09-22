import Marquee from "@/components/magicui/marquee";
import ProductSectionHeader from "../product-section-header";
import { FC } from "react";

type ClientsSectionProps = {
  title: string;
  clients: string[];
};

const ClientsSection: FC<ClientsSectionProps> = ({ title, clients }) => {
  return (
    <section id="product-clients" className="bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-8 pb-12 md:pb-24 lg:pb-32">
        <ProductSectionHeader description={title} />

        <div className="relative mt-6">
          <Marquee className="max-w-full [--duration:40s]">
            {clients.map((logo: string, idx: number) => (
              <img
                key={idx}
                src={`https://cdn.magicui.design/press/${logo}.svg`}
                className="h-10 w-40 px-2 dark:brightness-0 dark:invert"
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
