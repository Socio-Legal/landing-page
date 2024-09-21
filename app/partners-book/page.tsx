import HeroSection from "@/components/product/hero-section";
import { hero } from "@/config/product/hero-section";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <HeroSection hero={hero} />
    </>
  );
};

export default Page;
