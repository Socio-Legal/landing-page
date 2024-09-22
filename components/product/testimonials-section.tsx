import BlurFade from "@/components/magicui/blur-fade";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { MdOutlineFormatQuote } from "react-icons/md";
import ProductSectionHeader from "../product-section-header";
import { testimonials } from "@/config/product/partner-book-page";
import { FC } from "react";
import { Testimonial } from "@/types/Testimonial";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "YouTube",
  "Instagram",
  "Uber",
  "Spotify",
];

type TestimonialsHeaderProps = {
  title: string;
  description: string;
};

type TestimonialsSectionProps = {
  title: string;
  description: string;
  items: Testimonial[];
};

type TestimonialItemProps = {
  testimonial: Testimonial;
  index: number;
};

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

const TestimonialItem: FC<TestimonialItemProps> = ({ testimonial, index }) => {
  const { name, role, img, description, stars } = testimonial;

  return (
    <CarouselItem key={index}>
      <div className="p-1">
        <div className=" text-center">
          <MdOutlineFormatQuote className="text-4xl text-themeDarkGray my-4 mx-auto" />
          <BlurFade delay={0.25} inView>
            <h4 className="text-1xl font-semibold">{description}</h4>
          </BlurFade>
          <BlurFade delay={0.25 * 2} inView>
            <div className="mt-8">
              <Image
                width={40}
                height={40}
                key={index}
                src={img}
                alt={"Testimonial logo"}
                className="mx-auto rounded-full mb-4"
              />
            </div>
          </BlurFade>
          <div className="">
            <BlurFade delay={0.25 * 3} inView>
              <h4 className="text-1xl font-semibold my-2">{name}</h4>
            </BlurFade>
          </div>
          <BlurFade delay={0.25 * 4} inView>
            <div className=" mb-3">
              <span className="text-sm text-themeDarkGray">{role}</span>
            </div>
          </BlurFade>
        </div>
      </div>
    </CarouselItem>
  );
};

const TestimonialsCarousel: FC<TestimonialsCarouselProps> = ({
  testimonials,
}) => (
  <Carousel>
    <div className="max-w-2xl mx-auto">
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <TestimonialItem
            key={index}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </CarouselContent>
    </div>
    <div className="md:block hidden">
      <CarouselPrevious />
      <CarouselNext />
    </div>
  </Carousel>
);

const TestimonialsSectionHeader: FC<TestimonialsHeaderProps> = ({
  title,
  description,
}) => <ProductSectionHeader title={title} description={description} />;

const TestimonialsSection: FC<TestimonialsSectionProps> = ({
  title,
  description,
  items,
}) => {
  return (
    <section id="product-testimonials" className="bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        <TestimonialsSectionHeader title={title} description={description} />
        <TestimonialsCarousel testimonials={items} />
      </div>
    </section>
  );
};

export default TestimonialsSection;
