import { BarChart3, Brain, FileText, LineChart } from "lucide-react";

import { header, items as products } from "@/config/landing/products-section";
import Features from "@/components/features-horizontal";

import SectionHeader from "../section-header";

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
  Brain: <Brain className="h-6 w-6 text-primary" />,
  FileText: <FileText className="h-6 w-6 text-primary" />,
  BarChart3: <BarChart3 className="h-6 w-6 text-primary" />,
  LineChart: <LineChart className="h-6 w-6 text-primary" />,
};

const ProductsHeader = () => (
  <SectionHeader
    slogan={header.slogan}
    title={header.title}
    description={header.description}
  />
);

const ProductsSection = () => {
  const parsedProducts = (items: ProductProps[]) => {
    return items.map((item) => ({
      ...item,
      icon: ProductIcons[item.icon as keyof typeof ProductIcons],
    }));
  };

  return (
    <section
      id="products"
      className="bg-gradient-to-b from-background bg-white dark:bg-black"
    >
      <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        <ProductsHeader />
        <Features
          collapseDelay={5000}
          linePosition="bottom"
          data={parsedProducts(products)}
        />
      </div>
    </section>
  );
};

export default ProductsSection;
