import type { ResourcesCopy } from "../schema";

/* Contenido de ejemplo. Estructura de docs/sitemap-elaniin.md 3.18 a 3.20. */
export const resources: ResourcesCopy = {
  articles: {
    insights: { title: "Insights", description: "Ideas sobre producto e ingeniería" },
    playbook: { title: "Playbook de entregas", description: "Cómo entregamos cada semana" },
    aiReport: { title: "Informe de IA", description: "Qué funciona y qué no en operaciones" },
  },
  hub: {
    hero: {
      headline: "Pruebas y criterio, antes de decidir.",
      lead: "Casos de clientes por industria e investigaciones propias, para quien todavía está evaluando.",
      cta: "Hablar con el equipo",
    },
    intro: {
      title: "Dos formas de conocernos.",
      lead: {
        strong: "Lo que hemos entregado y lo que hemos aprendido.",
        rest: "Los casos muestran resultados; las investigaciones, cómo pensamos.",
      },
    },
    cards: {
      useCases: { title: "Casos de uso", text: "Proyectos de clientes, filtrados por industria." },
      research: { title: "Investigaciones", text: "Estudios propios y artículos, con la muestra y el método a la vista." },
    },
  },
  useCases: {
    hero: {
      headline: "Resultados que se miden, por industria.",
      lead: "Cada caso empieza con un problema y una métrica, y termina con ella.",
      cta: "Cuéntanos tu caso",
    },
    filterLabel: "Filtrar por industria",
    all: "Todas",
    industries: {
      publicSector: "Sector público",
      financialServices: "Servicios financieros",
      restaurants: "Restaurantes",
      retail: "Retail",
    },
  },
  research: {
    hero: {
      headline: "Lo que estudiamos y publicamos.",
      lead: "Investigaciones sobre cómo se construye y se opera el software, con la muestra y el método a la vista.",
      cta: "Hablar con el equipo",
    },
  },
};
