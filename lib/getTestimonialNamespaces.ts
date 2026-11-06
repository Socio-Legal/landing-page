export const getTestimonialNamespaces = (client: string): string[] => {
  const validClients = [
    "factorial",
    "caballero",
    "pldspace",
    "taxdown",
    "myinvestor",
    "axa",
    "osborne",
    "fanalca",
    "multiverse",
    "sade",
  ];

  const specificNamespace = validClients.includes(client.toLowerCase())
    ? `testimonials-${client.toLowerCase()}-page`
    : null;

  return ["common", ...(specificNamespace ? [specificNamespace] : [])];
};
