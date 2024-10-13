"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/config/site-config";
import { cn } from "@/lib/utils";

import { Icons } from "./icons";
import { useTranslation } from "react-i18next";

const MenuIcons = {
  Stars: <Icons.stars className="h-6 w-6" />,
};

export default function NavigationMenuDemo() {
  const { t } = useTranslation("common");

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {siteConfig.header.map((item: any, index: number) => (
          <NavigationMenuItem key={index}>
            {item.trigger ? (
              <>
                <NavigationMenuTrigger>{t(item.trigger)}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    className={`grid gap-3 p-6 ${
                      item.content?.main
                        ? "md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
                        : "w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                    }`}
                  >
                    {item.content?.main && (
                      <li className="row-span-4">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-primary/10 from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href={item.content?.main.href}
                          >
                            {
                              MenuIcons[
                                item.content?.main
                                  .icon as keyof typeof MenuIcons
                              ]
                            }
                            <div className="mb-2 mt-4 text-lg font-medium">
                              {t(item.content?.main.title)}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {t(item.content?.main.description)}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    )}
                    {item.content.items.map(
                      (subItem: any, subIndex: number) => (
                        <ListItem
                          key={subIndex}
                          href={subItem.href}
                          title={t(subItem.title)}
                          className="hover:bg-primary/10"
                        >
                          {t(subItem.description)}
                        </ListItem>
                      )
                    )}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link
                href={item.href || ""}
                target="_arya"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t(item.label)}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
