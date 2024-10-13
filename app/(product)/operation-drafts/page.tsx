import React from "react";
import { useTranslation } from "react-i18next";

import CallToActionSection from "@/components/landing/cta-section";
import TestimonialsSection, {
  TestimonialsSectionProps,
} from "@/components/product/testimonials-section";
import FeaturesSection, {
  FeaturesSectionProps,
} from "@/components/product/features-section";
import ClientsSection, {
  ClientsSectionProps,
} from "@/components/product/clients-section";
import HeroSection, {
  HeroSectionProps,
} from "@/components/product/hero-section";
import TopFeatures, {
  TopFeaturesProps,
} from "@/components/product/top-features";

const Page = () => {
  const { t } = useTranslation("product-operation-drafts-page");

  const hero = t("hero", { returnObjects: true }) as HeroSectionProps;
  const clients = t("clients", { returnObjects: true }) as ClientsSectionProps;
  const features = t("features", {
    returnObjects: true,
  }) as FeaturesSectionProps;
  const topFeatures = t("topFeatures", {
    returnObjects: true,
  }) as TopFeaturesProps;
  const testimonials = t("testimonials", {
    returnObjects: true,
  }) as TestimonialsSectionProps;

  return (
    <>
      <HeroSection {...hero} />
      <TopFeatures {...topFeatures} />
      <ClientsSection {...clients} hideTopSpace />
      <FeaturesSection {...features} />
      <TestimonialsSection {...testimonials} />
      <CallToActionSection />
    </>
  );
};

export default Page;
