import React, { FC } from "react";
import BlurFade from "../magicui/blur-fade";
import { Card, CardContent } from "../ui/card";
import { Brain, Calculator, FileCheck, Shield, Users, Zap } from "lucide-react";
import ProductSectionHeader from "../product-section-header";
import { AnimatedBeamMultiToMulti } from "../animated/animated-beam-multi-to-multi";
import { getAnimatedBeam } from "../animated/animated-beams";

type Feature = {
  title: string;
  description: string;
  icon?: string;
  animation?: string;
  image: string;
};

type TopFeatureProps = {
  feature: Feature;
  index: number;
};

export type TopFeaturesProps = {
  title: string;
  description: string;
  items: Feature[];
};

const TopFeatureIcons = {
  Shield: <Shield className="w-6 h-6 text-primary" />,
  Brain: <Brain className="w-6 h-6 text-primary" />,
  Zap: <Zap className="w-6 h-6 text-primary" />,
  Calculator: <Calculator className="w-6 h-6 text-primary" />,
  Users: <Users className="w-6 h-6 text-primary" />,
  FileCheck: <FileCheck className="w-6 h-6 text-primary" />,
};

const TopFeature: FC<TopFeatureProps> = ({ feature, index }) => {
  return (
    <BlurFade key={index} delay={0.2 + index * 0.2} inView>
      <Card className="bg-background border-none shadow-none">
        <CardContent className="p-6 space-y-4">
          {feature.icon && (
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              {TopFeatureIcons[feature.icon as keyof typeof TopFeatureIcons]}
            </div>
          )}

          {feature.animation &&
            getAnimatedBeam(feature.animation as keyof typeof getAnimatedBeam)}

          <h3 className="text-xl font-semibold">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </CardContent>
      </Card>
    </BlurFade>
  );
};

const TopFeatures: FC<TopFeaturesProps> = ({ title, description, items }) => {
  return (
    <section id="product-top-features" className="bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        <ProductSectionHeader title={title} description={description} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {items?.map((feature, index) => (
            <TopFeature key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopFeatures;
