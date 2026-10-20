"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { BarChart3, Brain, FileText, LineChart } from "lucide-react";

import Features from "@/components/features-horizontal";

import SectionHeader from "../section-header";
import { useTranslation } from "react-i18next";

interface ProductProps {
  id: number;
  title: string;
  content: string;
  image: {
    light: string;
    dark: string;
  };
  icon: string;
}

const ProductIcons = {
  Brain: <Brain className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
  BarChart3: <BarChart3 className="h-5 w-5" />,
  LineChart: <LineChart className="h-5 w-5" />,
};

const ProductsHeader = () => {
  const { t } = useTranslation("home-products-section");

  return (
    <SectionHeader
      slogan={t("header.slogan")}
      title={t("header.title")}
      description={t("header.description")}
    />
  );
};

const ProductsSection = () => {
  const { t } = useTranslation("home-products-section");

  const allText = t("header.buttonText", { defaultValue: "" });
  const allLink = t("header.buttonLink", { defaultValue: "" });

  const productsData = t("items", { returnObjects: true }) as ProductProps[];
  const products: ProductProps[] | undefined = Array.isArray(productsData)
    ? productsData
    : undefined;

  const parsedProducts = (items: ProductProps[] | undefined) => {
    return items?.map((item) => ({
      ...item,
      icon: ProductIcons[item.icon as keyof typeof ProductIcons],
    }));
  };

  return (
    <section id="products" className="border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        <ProductsHeader />
        <Features
          collapseDelay={5000}
          linePosition="bottom"
          data={parsedProducts(products)}
        />
        {/* Enlace al catálogo completo: va en el HTML, no solo en las pestañas */}
        {allText && allLink.startsWith("/") && (
          <p className="mt-10 text-center text-sm">
            <Link
              href={allLink}
              className="group/link inline-flex items-center gap-1.5 rounded-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {allText}
              <ArrowRightIcon
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
              />
            </Link>
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
