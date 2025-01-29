export const getTestimonialNamespaces = (client: string): string[] => {
  const validClients = [
    "factorial",
    "banktrack",
    "caballero",
    "derechocom",
    "pldspace",
    "taxdown",
    "yaba",
    "myinvestor",
  ];

  const specificNamespace = validClients.includes(client.toLowerCase())
    ? `testimonials-${client.toLowerCase()}-page`
    : null;

  return ["common", ...(specificNamespace ? [specificNamespace] : [])];
};
