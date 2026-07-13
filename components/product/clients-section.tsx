"use client";

import { FC } from "react";

import LogoStrip from "@/components/shared/logo-strip";
import { clientLogos } from "@/config/client-logos";

export type ClientsSectionProps = {
  title: string;
  clients: string[];
  hideTopSpace?: boolean;
};

const ClientsSection: FC<ClientsSectionProps> = ({
  title,
  clients,
  hideTopSpace = false,
}) => {
  const verticalPadding = hideTopSpace ? "pb-12 md:pb-16" : "py-12 md:py-16";

  const safeClients = (Array.isArray(clients) ? clients : []).filter(
    (name): name is keyof typeof clientLogos => name in clientLogos,
  );

  return (
    <section id="product-clients" className="border-t border-border">
      <div className={`container mx-auto px-4 ${verticalPadding}`}>
        <LogoStrip label={title} primary={safeClients} />
      </div>
    </section>
  );
};

export default ClientsSection;
