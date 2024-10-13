"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import HeroSection from "@/components/landing/hero-section";
import ClientsSection from "@/components/landing/clients-section";
import FeaturesSection, {
  FeatureItem,
} from "@/components/landing/features-section";
import WhoUsesSttokSection from "@/components/landing/who-uses-sttok-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import ProductsSection from "@/components/landing/products-section";
import CallToActionSection from "@/components/landing/cta-section";

import { SphereMask } from "@/components/magicui/sphere-mask";
import Particles from "@/components/magicui/particles";

export default function Page() {
  const { t } = useTranslation();

  const features = t("home.features.items", {
    returnObjects: true,
  }) as FeatureItem[];

  console.log("🚀 cclog  ~ Page ~ features:", features);

  return (
    <>
      <HeroSection />
      <ClientsSection />

      <SphereMask />
      <ProductsSection />

      <FeaturesSection features={features} />
      <WhoUsesSttokSection />
      <TestimonialsSection />
      <CallToActionSection />

      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color={"#ffffff"}
      />
    </>
  );
}
