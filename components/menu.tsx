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
  Stars: <Icons.stars className="h-5 w-5 text-brand" />,
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
                <NavigationMenuTrigger className="text-sm font-medium text-foreground/80 hover:text-foreground bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
                  {t(item.trigger)}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {item.content?.main ? (
                    /* Producto: 2-panel layout */
                    <div className="flex w-[580px]">
                      {/* Left panel — featured */}
                      <div className="w-[220px] shrink-0 border-r border-border">
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.content.main.href}
                            className="flex flex-col h-full p-6 no-underline outline-none group"
                          >
                            <div className="h-8 w-8 rounded-md bg-brand/10 flex items-center justify-center mb-4">
                              {MenuIcons[item.content.main.icon as keyof typeof MenuIcons]}
                            </div>
                            <div className="text-sm font-semibold text-foreground mb-1 group-hover:text-brand transition-colors">
                              {t(item.content.main.title)}
                            </div>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                              {t(item.content.main.description)}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      {/* Right panel — items */}
                      <div className="flex-1 p-3">
                        {item.content.items.map((subItem: any, subIndex: number) => (
                          <MegaMenuItem
                            key={subIndex}
                            href={subItem.href}
                            title={t(subItem.title)}
                          >
                            {t(subItem.description)}
                          </MegaMenuItem>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Soluciones: single-column list */
                    <div className="w-[340px] p-3">
                      {item.content.items.map((subItem: any, subIndex: number) => (
                        <MegaMenuItem
                          key={subIndex}
                          href={subItem.href}
                          title={t(subItem.title)}
                        >
                          {t(subItem.description)}
                        </MegaMenuItem>
                      ))}
                    </div>
                  )}
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={item.href || ""} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-sm font-medium text-foreground/80 hover:text-foreground bg-transparent hover:bg-transparent"
                  )}
                >
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

const MegaMenuItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        ref={ref as any}
        href={href || ""}
        className={cn(
          "group flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-accent",
          className
        )}
        {...props}
      >
        <div className="mt-0.5 h-5 w-5 shrink-0 rounded bg-brand/10 flex items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-brand" />
        </div>
        <div>
          <div className="text-sm font-medium text-foreground leading-none mb-1 group-hover:text-brand transition-colors">
            {title}
          </div>
          {children && (
            <p className="text-xs leading-snug text-muted-foreground line-clamp-2">
              {children}
            </p>
          )}
        </div>
      </Link>
    </NavigationMenuLink>
  );
});

MegaMenuItem.displayName = "MegaMenuItem";
