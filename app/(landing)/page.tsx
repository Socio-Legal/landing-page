"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import HeroSection from "@/components/landing/hero-section";
import ClientsSection from "@/components/landing/clients-section";
import NumbersSection from "@/components/landing/numbers-section";
import ProductsSection from "@/components/landing/products-section";
import FlowsSection from "@/components/landing/flows-section";
import WhoUsesSttokSection from "@/components/landing/who-uses-sttok-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import IntegrationsSection from "@/components/landing/integrations-section";
import CallToActionSection from "@/components/landing/cta-section";

export default function Page() {
  useTranslation([
    "common",
    "home-clients-section",
    "home-numbers-section",
    "home-flows-section",
    "home-cta-section",
    "home-hero-section",
    "home-products-section",
    "home-integrations-section",
    "home-testimonials-section",
    "home-uses-section",
  ]);

  return (
    <>
      <HeroSection />
      <ClientsSection />
      <NumbersSection />
      <ProductsSection />
      <FlowsSection />
      <WhoUsesSttokSection />
      <TestimonialsSection />
      <IntegrationsSection />
      <CallToActionSection />
    </>
  );
}
