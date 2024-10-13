"use client";

import Link from "next/link";

import { IoMenuSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site-config";
import { cn } from "@/lib/utils";
import ThemeToggler from "./ui/theme-toggler";
import LanguageSwitcher from "./language-switcher";

export default function drawerDemo() {
  const { t } = useTranslation("common");

  return (
    <Drawer>
      <DrawerTrigger>
        <IoMenuSharp className="text-2xl" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-6">
          <div className="flex justify-between">
            <Link
              href="/"
              title="brand-logo"
              className="relative mr-6 flex items-center space-x-2"
            >
              <Icons.logo className="w-auto h-[30px]" />
              {/* <span className="font-bold text-xl">{siteConfig.name}</span> */}
            </Link>

            <div className="flex gap-4">
              <ThemeToggler />
              <LanguageSwitcher />
            </div>
          </div>
          <nav>
            <ul className="mt-7 text-left">
              {siteConfig.header.map((item, index) => (
                <li key={index} className="my-3">
                  {item.trigger ? (
                    <Link href={item.href || ""} className="font-semibold">
                      {t(item.trigger)}
                    </Link>
                  ) : (
                    <Link href={item.href || ""} className="font-semibold">
                      {t(item.label || "")}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </DrawerHeader>
        <DrawerFooter>
          <Link
            href={routes.APP_LOGIN}
            className={buttonVariants({ variant: "outline" })}
          >
            {t("cta.login")}
          </Link>
          <Link
            href={routes.APP_CALENDLY}
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full sm:w-auto text-background flex gap-2"
            )}
          >
            {/* <Icons.logo className="h-6 w-6" /> */}
            {t("cta.demo")}
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
