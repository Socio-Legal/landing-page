import React from "react";
import { Metadata } from "next";

interface TestimonialsLayoutProps {
  children: React.ReactNode;
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

  return clientData;
}

export default async function TestimonialsLayout({
  children,
}: TestimonialsLayoutProps) {
  return (
    <>
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
    </>
  );
}
