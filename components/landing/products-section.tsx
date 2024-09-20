import { BarChart3, Brain, FileText, LineChart } from "lucide-react";

import { header, items as products } from "@/config/products-section";
import Features from "@/components/features-horizontal";

import SectionHeader from "../section-header";

interface ProductProps {
  id: number;
  title: string;
  content: string;
  image: string;
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
    <section id="products" className="bg-dark">
      <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32 pb-0 md:pb-0 lg:pb-0">
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
