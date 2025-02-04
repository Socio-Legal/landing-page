import React from "react";
import { Metadata } from "next";

interface TestimonialsLayoutProps {
  children: React.ReactNode;
  params: { client: string };
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
  params: { client: string };
}): Promise<Metadata> {
  const clientData = await getClientData(params.client);

  if (!clientData) {
    return {
      title: "Client Not Found",
      description: "This client testimonial could not be found",
    };
  }

  return clientData;
}

export default async function TestimonialsLayout({
  children,
  params,
}: TestimonialsLayoutProps) {
  await generateMetadata({ params });

  return (
    <>
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
    </>
  );
}
