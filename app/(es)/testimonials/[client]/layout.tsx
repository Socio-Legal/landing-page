import React from "react";
import { Metadata } from "next";

import fs from "node:fs";
import path from "node:path";

import Migas from "@/components/shared/migas";
import { buildMetadata } from "@/lib/seo";

/** Un caso por archivo de config/testimonials/clients. Otro nombre es un 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return fs
    .readdirSync(path.join(process.cwd(), "config", "testimonials", "clients"))
    .filter((f) => f.endsWith(".ts"))
    .map((f) => ({ client: f.replace(/.ts$/, "") }));
}

interface TestimonialsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ client: string }>;
}

async function getClientData(clientId: string) {
  try {
    const client = await import(`@/config/testimonials/clients/${clientId}.ts`);
    return client.metadata;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ client: string }>;
}): Promise<Metadata> {
  const { client } = await params;
  const clientData = await getClientData(client);

  if (!clientData) {
    return {
      title: "Client Not Found",
      description: "This client testimonial could not be found",
    };
  }

  return buildMetadata({
    title: clientData.title,
    description: clientData.description,
    keywords: clientData.keywords,
    path: `/testimonios/${client}`,
  });
}

export default async function TestimonialsLayout({
  children,
  params,
}: TestimonialsLayoutProps) {
  const { client } = await params;
  return (
    <>
      <Migas ruta={`/testimonios/${client}`} />
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
    </>
  );
}
