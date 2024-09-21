"use client";

import React, { useState } from "react";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";

import { config, header, items as prices } from "@/config/pricing-section";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import PlanetStarsSection from "../planet-stars-header";
import SectionHeader from "../section-header";

type Interval = "monthly" | "yearly";

export const toHumanPrice = (price: number, decimals: number = 2) => {
  return Number(price / 100).toFixed(decimals);
};

interface PriceProps {
  id: string;
  name: string;
  description: string;
  features: string[];
  monthlyPrice: number;
  yearlyPrice: number;
  isMostPopular: boolean;
}

interface PricingSwitchProps {
  onChangeInterval: (interval: Interval) => void;
}

interface PricingCardProps {
  id: string | null;
  price: PriceProps;
  index: number;
  interval: Interval;
  isLoading: boolean;
  hasSelected: boolean;
  onSubscribe: (priceId: string) => void;
}

type PricingCardButtonProps = Pick<
  PricingCardProps,
  "id" | "price" | "isLoading" | "onSubscribe"
>;

const PricingCardButton: React.FC<PricingCardButtonProps> = ({
  id,
  price,
  isLoading,
  onSubscribe,
}) => (
  <Button
    className={cn(
      "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
      "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
    )}
    disabled={isLoading}
    onClick={() => void onSubscribe(price.id)}
  >
    <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96 dark:bg-black" />
    {(!isLoading || (isLoading && id !== price.id)) && <p>Suscribirse</p>}

    {isLoading && id === price.id && <p>Suscribiendo</p>}
    {isLoading && id === price.id && (
      <Loader className="mr-2 h-4 w-4 animate-spin" />
    )}
  </Button>
);

const PricingCardFeatures: React.FC<{ price: PriceProps }> = ({ price }) =>
  price?.features?.length > 0 && (
    <ul className="flex flex-col gap-2 font-normal">
      {price.features.map((feature: any, index: any) => (
        <li
          key={index}
          className="flex items-center gap-3 text-xs font-medium text-black dark:text-white"
        >
          <CheckIcon className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white" />
          <span className="flex">{feature}</span>
        </li>
      ))}
    </ul>
  );

const PricingCard: React.FC<PricingCardProps> = ({
  id,
  price,
  index,
  interval,
  isLoading,
  hasSelected,
  onSubscribe,
}) => {
  const isFirstTimeOpen = price.isMostPopular && !hasSelected;
  const isAlreadySelected = hasSelected && id === price.id;

  const isHighlighted = isFirstTimeOpen || isAlreadySelected;

  return (
    <div
      key={price.id}
      className={cn(
        "relative flex max-w-[400px] flex-col gap-8 rounded-2xl border p-4 text-black dark:text-white overflow-hidden",
        {
          "border-2 border-[var(--color-one)] dark:border-[var(--color-one)]":
            isHighlighted,
        }
      )}
    >
      <div className="flex items-center">
        <div className="ml-4">
          <h2 className="text-base font-semibold leading-7">{price.name}</h2>
          <p className="h-12 text-sm leading-5 text-black/70 dark:text-white">
            {price.description}
          </p>
        </div>
      </div>

      <motion.div
        key={`${price.id}-${interval}`}
        initial="initial"
        animate="animate"
        variants={{
          initial: {
            opacity: 0,
            y: 12,
          },
          animate: {
            opacity: 1,
            y: 0,
          },
        }}
        transition={{
          duration: 0.4,
          delay: 0.1 + index * 0.05,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="flex flex-row gap-1"
      >
        <span className="text-4xl font-bold text-black dark:text-white">
          {interval === "yearly"
            ? toHumanPrice(price.yearlyPrice, 0)
            : toHumanPrice(price.monthlyPrice, 0)}
          €<span className="text-xs"> / {interval}</span>
        </span>
      </motion.div>

      <PricingCardButton
        id={id}
        price={price}
        isLoading={isLoading}
        onSubscribe={onSubscribe}
      />

      <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-500/30 to-neutral-200/0" />

      <PricingCardFeatures price={price} />
    </div>
  );
};

const PricingSwitch: React.FC<PricingSwitchProps> = ({ onChangeInterval }) => (
  <div className="flex w-full items-center justify-center space-x-2">
    <Switch
      id="interval"
      onCheckedChange={(checked) => {
        onChangeInterval(checked ? "yearly" : "monthly");
      }}
    />
    <span>Anual</span>

    {config.switchLabel && (
      <span className="inline-block whitespace-nowrap rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold uppercase leading-5 tracking-wide text-white dark:bg-white dark:text-black">
        {config.switchLabel} ✨
      </span>
    )}
  </div>
);

const PricingHeader = () => (
  <PlanetStarsSection>
    <SectionHeader
      slogan={header.slogan}
      title={header.title}
      description={header.description}
    />
  </PlanetStarsSection>
);

export default function PricingSection() {
  const [interval, setInterval] = useState<Interval>("monthly");
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [hasSelected, setHasSelected] = useState(false);

  const onSubscribeClick = async (priceId: string) => {
    setIsLoading(true);
    setId(priceId);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
    setIsLoading(false);
    setHasSelected(true);
  };

  return (
    <>
      <section id="pricing" className="bg-white dark:bg-black">
        <PricingHeader />

        <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 md:px-8 pb-12 md:pb-24 lg:pb-32 pt-4 md:pt-8 lg:pt-12">
          <PricingSwitch onChangeInterval={setInterval} />

          <div className="mx-auto grid w-full justify-center sm:grid-cols-2 lg:grid-cols-4 flex-col gap-4">
            {prices.map((price, index) => (
              <PricingCard
                id={id}
                key={price.id}
                price={price}
                index={index}
                interval={interval}
                isLoading={isLoading}
                hasSelected={hasSelected}
                onSubscribe={onSubscribeClick}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
