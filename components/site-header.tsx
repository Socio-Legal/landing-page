"use client";

import Drawer from "@/components/drawer";
import { Icons } from "@/components/icons";
import Menu from "@/components/menu";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site-config";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [addBorder, setAddBorder] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setAddBorder(true);
      } else {
        setAddBorder(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={"relative sticky top-0 z-50 py-2 backdrop-blur"}>
      <div className="flex justify-between items-center container">
        <Link
          href="/"
          title="brand-logo"
          className="relative mr-6 flex items-center space-x-2"
        >
          <Icons.logo className="w-auto h-[30px]" />
          <span className="font-bold text-xl hidden">{siteConfig.name}</span>
        </Link>

        <div className="hidden lg:block">
          <div className="flex items-center ">
            <nav className="mr-10">
              <Menu />
            </nav>

            <div className="gap-2 flex">
              {siteConfig.cta?.map((cta, index) => (
                <Link
                  key={index}
                  href={cta.link}
                  className={cn(
                    buttonVariants({
                      variant: cta.variant as keyof typeof buttonVariants,
                    }),
                    cta.className || ""
                  )}
                >
                  {cta?.hasIcon && <Icons.logoMin className="h-6 w-6" />}
                  {cta.text}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2 cursor-pointer block lg:hidden">
          <Drawer />
        </div>
      </div>
      <hr
        className={cn(
          "absolute w-full bottom-0 transition-opacity duration-300 ease-in-out",
          addBorder ? "opacity-100" : "opacity-0"
        )}
      />
    </header>
  );
}
