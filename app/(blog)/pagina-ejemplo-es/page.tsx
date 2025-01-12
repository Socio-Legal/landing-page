import React from "react";

import HeroSection, {
  HeroSectionProps,
} from "@/components/product/hero-section";
import ClientsSection, {
  ClientsSectionProps,
} from "@/components/product/clients-section";
import CallToActionSection from "@/components/landing/cta-section";
import FeatureScrollSection, {
  FeatureScrollItem,
  FeatureScrollSectionProps,
} from "@/components/landing/feature-scroll-section";
import { MetadataProps } from "@/types/Metadata";

import LightImage from "./imagen-con-tema-claro.png";
import DarkImage from "./imagen-con-tema-oscuro.png";

export const metadata: MetadataProps = {
  /* 🟢 EDITABLE */
  title: "Página de ejemplo",
  keywords: "ejemplo, página, producto, partner, libro",
  description: "Página de ejemplo para el contenido del blog",
  /* 🔴 END OF EDITABLE */
};

const hero: HeroSectionProps = {
  /* 🟢 EDITABLE */
  title: "Título del artículo",
  description:
    "Descripción del artículo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, ultricies nunc. Nullam nec.",
  button: {
    text: "Prueba ahora",
    link: "https://app.sttok.com/#/demo",
  },
  /* 🔴 END OF EDITABLE */
};

const clients: ClientsSectionProps = {
  /* 🟢 EDITABLE */
  title: "CLIENTES QUE UTILIZAN EL LIBRO DE SOCIOS",
  clients: ["Factorial", "MyInvestor", "Mailtrack", "Taxdown", "PldSpace"],
  /* 🔴 END OF EDITABLE */
};

const features: FeatureScrollItem[] = [
  /* 🟢 EDITABLE */
  {
    title: "Título de la sección 1",
    description:
      "Descripción de la sección. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, ultricies nunc. Nullam nec. Descripción de la sección. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, ultricies nunc. ",
    button: {
      text: "Prueba ahora",
      link: "https://app.sttok.com/#/demo",
    },
    image: DarkImage as unknown as string,
    direction: "rtl",
  },
  {
    title: "Título de la sección 2",
    description:
      "Descripción de la sección. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, ultricies nunc. Nullam nec. Descripción de la sección. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, ultricies nunc. ",
    button: {
      text: "Prueba ahora",
      link: "https://app.sttok.com/#/demo",
    },
    image: DarkImage as unknown as string,
    direction: "ltr",
  },
  {
    title: "Título de la sección 3",
    description:
      "Descripción de la sección. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, ultricies nunc. Nullam nec. Descripción de la sección. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, ultricies nunc. ",
    button: {
      text: "Prueba ahora",
      link: "https://app.sttok.com/#/demo",
    },
    image: DarkImage as unknown as string,
    direction: "rtl",
  },
  {
    title: "Título de la sección 4",
    description:
      "Descripción de la sección. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, ultricies nunc. Nullam nec. Descripción de la sección. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, ultricies nunc. ",
    button: {
      text: "Prueba ahora",
      link: "https://app.sttok.com/#/demo",
    },
    image: DarkImage as unknown as string,
    direction: "ltr",
  },
  /* 🔴 END OF EDITABLE */
];

const Page = () => {
  const heroWithImage = {
    ...hero,
    image: {
      light: LightImage as unknown as string,
      dark: DarkImage as unknown as string,
    },
  };

  return (
    <>
      <HeroSection {...heroWithImage} />
      <ClientsSection {...clients} />
      <FeatureScrollSection features={features} />
      <CallToActionSection />
    </>
  );
};

export default Page;
