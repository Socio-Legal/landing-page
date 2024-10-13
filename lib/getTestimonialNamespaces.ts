export const getTestimonialNamespaces = (client: string): string[] => {
  const validClients = [
    "factorial",
    "banktrack",
    "caballero",
    "derechocom",
    "pldspace",
    "taxdown",
    "yaba",
  ];

  const specificNamespace = validClients.includes(client.toLowerCase())
    ? `testimonials-${client.toLowerCase()}-page`
    : null;

  return ["common", ...(specificNamespace ? [specificNamespace] : [])];
};
