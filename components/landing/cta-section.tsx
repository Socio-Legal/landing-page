import { FC } from "react";

import { header } from "@/config/cta-section";
import Blur01 from "@/public/blur-01.svg";

import SectionHeader from "../section-header";

const sectionStyle = {
  backgroundImage: `url(${Blur01.src})`,
  backgroundSize: "cover",
  backgroundPosition: "top",
};

const CallToActionHeader = () => (
  <SectionHeader
    slogan={header.slogan}
    title={header.title}
    description={header.description}
    buttonText={header.buttonText}
    buttonLink={header.buttonLink}
    secondaryButtonText={header.secondaryButtonText}
    secondaryButtonLink={header.secondaryButtonLink}
  />
);

const CallToActionSection: FC = () => {
  return (
    <section id="cta" className="bg-backgroundbrand" style={sectionStyle}>
      <div className="container mx-auto px-4 pb-12 md:pb-24 lg:pb-32 pt-20 md:pt-32 lg:pt-40">
        <CallToActionHeader />
      </div>
    </section>
  );
};

export default CallToActionSection;
