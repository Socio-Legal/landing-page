"use client";

import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { trackDemoClick } from "@/lib/analytics";

type Plan = {
  id: string;
  name: string;
  description: string;
  features: string[];
  monthlyPrice: number;
  yearlyPrice: number;
  isMostPopular: boolean;
};

const PricingPlans: FC = () => {
  const { t } = useTranslation(["home-pricing-section", "pricing-page"]);

  const itemsData = t("home-pricing-section:items", {
    returnObjects: true,
  }) as Plan[];
  const plans: Plan[] = Array.isArray(itemsData) ? itemsData : [];

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 text-left md:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={cn(
            "flex flex-col rounded-lg border border-border bg-card p-7",
            plan.isMostPopular && "border-t-[3px] border-t-navy dark:border-t-navy-muted",
          )}
        >
          {plan.isMostPopular && (
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy dark:text-navy-muted">
              {t("pricing-page:plans.recommended")}
            </p>
          )}
          <h3 className="text-base font-semibold text-foreground">
            {plan.name}
          </h3>
          <p className="mt-1 min-h-10 text-sm text-muted-foreground">
            {plan.description}
          </p>
          <p className="mt-6 font-serif text-4xl font-normal tabular-nums text-foreground">
            {Math.round(plan.yearlyPrice / 100)}&nbsp;€
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {t("pricing-page:plans.perYear")}
          </p>
          <ul className="mt-6 flex-1 space-y-2.5 border-t border-border pt-6">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-sm text-muted-foreground"
              >
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href={t("pricing-page:plans.ctaLink")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDemoClick(`pricing-plan-${plan.id}`)}
            className={cn(
              "mt-7 inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors",
              plan.isMostPopular
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "border border-border bg-background text-foreground hover:bg-accent",
            )}
          >
            {t("pricing-page:plans.cta")}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PricingPlans;
