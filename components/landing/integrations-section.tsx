"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { FileSignature, KeyRound, Server, ShieldCheck } from "lucide-react";

interface IntegrationItem {
  title: string;
  subtitle: string;
  description: string;
}

interface TrustItem {
  logo: string;
  text: string;
  alt: string;
}

// En el orden de las tarjetas: SSO, OTP, instancias dedicadas y firma
const IntegrationIcons = [KeyRound, ShieldCheck, Server, FileSignature];

/**
 * Integraciones y, debajo, la seguridad en una sola franja: lo que antes era
 * una sección de tarjetas propia. El detalle vive en la política de seguridad.
 */
const IntegrationsSection: FC = () => {
  const { t } = useTranslation("home-integrations-section");

  const itemsData = t("items", { returnObjects: true }) as IntegrationItem[];
  const items: IntegrationItem[] = Array.isArray(itemsData) ? itemsData : [];

  const trustData = t("trust.items", { returnObjects: true }) as TrustItem[];
  const trust: TrustItem[] = Array.isArray(trustData) ? trustData : [];

  return (
    <section id="integrations" className="border-t border-border bg-backgroundbrand">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-brand mb-3">
            {t("header.slogan")}
          </p>
          <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground text-balance sm:text-4xl mb-3">
            {t("header.title")}
          </h2>
          <p className="text-base text-muted-foreground text-balance">
            {t("header.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {items.map((item, i) => {
            const Icon = IntegrationIcons[i] || FileSignature;
            return (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-6 flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand/10">
                  <Icon className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-brand mb-2">{item.subtitle}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {trust.length > 0 && (
          <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-5 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("trust.label")}
            </p>
            <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
              {trust.map((it) => (
                <li key={it.logo} className="flex items-center gap-2.5 text-sm text-foreground">
                  <span className="relative h-7 w-7 shrink-0 grayscale">
                    <Image src={it.logo} alt={it.alt} fill style={{ objectFit: "contain" }} />
                  </span>
                  {it.text}
                </li>
              ))}
            </ul>
            <Link
              href={t("trust.link.href")}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand underline-offset-4 hover:underline"
            >
              {t("trust.link.text")}
              <ArrowRightIcon aria-hidden className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default IntegrationsSection;
