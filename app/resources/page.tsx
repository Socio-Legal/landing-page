import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import Glossary from "@/components/resources/glossary";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Glosario societario — captable, phantom shares, vesting y más",
  description:
    "Los términos de la gestión societaria explicados en una frase: captable, libro de socios, phantom shares, stock options, vesting, juntas, quórum, dilución y más.",
  keywords:
    "glosario societario, qué es un captable, qué son phantom shares, vesting, libro de socios, dilución, pacto de socios",
  path: "/recursos",
});

const Page = () => {
  return (
    <>
      <Glossary />
      <CallToActionSection />
    </>
  );
};

export default Page;
