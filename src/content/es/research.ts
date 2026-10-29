import type { ResearchCopy } from "../schema";

/* Contenido de ejemplo (todo estudio, muestra y cifra es inventado). */
export const research: ResearchCopy = {
  title: "Investigaciones propias.",
  lead: {
    strong: "Estudiamos cómo se construye y se opera el software.",
    rest: "Publicamos lo que encontramos, con la muestra y el método a la vista.",
  },
  viewAll: "Ver todas las investigaciones",
  filterLabel: "Filtrar por tipo",
  all: "Todo",
  kinds: { report: "Informe", study: "Estudio" },
  topicFilterLabel: "Filtrar por tema",
  topics: { ai: "IA", cloud: "Cloud", product: "Producto" },
  units: { percent: "%", outOfTen: "de 10" },
  spoken: { percent: "{n} por ciento", outOfTen: "{n} de cada 10" },
  items: {
    "ai-pilots": { finding: "de los pilotos de IA no llega a producción.", source: "Encuesta a 412 equipos de producto" },
    "cloud-spend": { finding: "del gasto en nube se queda sin usar.", source: "Análisis de 86 cuentas cloud" },
    "weekly-delivery": {
      finding: "de los equipos que entregan cada semana corrige sus errores en menos de un día.",
      source: "Seguimiento de 120 equipos durante un año",
    },
    "long-signups": {
      finding: "usuarios abandonan un alta de más de cuatro pasos.",
      source: "Pruebas con 1,800 personas en 9 productos",
    },
  },
};
