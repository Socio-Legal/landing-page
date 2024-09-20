import React from "react";

import Link from "next/link";
import Image from "next/legacy/image";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import IconTitle from "@/public/icon-title.svg";
import { Button } from "@/components/ui/button";

const buttonClassName = cn(
  buttonVariants({ size: "lg", variant: "default" }),
  "group mt-4 rounded-[2rem] px-6"
);

const secondaryButtonClassName = cn(
  buttonVariants({ size: "lg", variant: "outline" }),
  "group mt-4 ml-4 rounded-[2rem] px-6"
);

type SectionHeaderProps = {
  slogan?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
};

const SectionHeader = ({
  slogan,
  title,
  description,
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
}: SectionHeaderProps) => {
  return (
    <div className="wow fadeInUp relative z-10 mb-16 text-center">
      {slogan && (
        <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
          <Image src={IconTitle} alt="icon" width={16} height={16} />
          <span className="hero-subtitle-text"> {slogan} </span>
        </span>
      )}

      {title && (
        <h2
          className="mb-4 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-2"
          style={{ fontSize: "48px", lineHeight: "58px" }}
        >
          {title}
        </h2>
      )}

      {description && (
        <p className="mx-auto max-w-[714px] font-medium text-white/70">
          {description}
        </p>
      )}

      {buttonText && buttonLink && (
        <Button variant="default" asChild>
          <Link href={buttonLink} className={buttonClassName}>
            {buttonText}
            <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </Button>
      )}

      {secondaryButtonText && secondaryButtonLink && (
        <Button variant="outline" asChild>
          <Link href={secondaryButtonLink} className={secondaryButtonClassName}>
            {secondaryButtonText}
            <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default SectionHeader;
