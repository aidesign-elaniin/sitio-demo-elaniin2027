import type { FooterCopy } from "../schema";

/* Marca, columnas, línea de entidad y legal entregados por el equipo (2026-10-27). Los nombres de las insignias se leen de las insignias. */
export const footer: FooterCopy = {
  navLabel: "Pie de página",
  socialsLabel: "Redes sociales",
  tagline: {
    lead: "Make complexity work.",
    rest: "Software inteligente sobre el que opera tu negocio.",
  },
  entity: "Intelligent software company desde 2014",
  aiSummary: {
    label: "Obtén un resumen de Elaniin con IA:",
    prompt: "Resume qué hace Elaniin, sus servicios y cómo trabaja, a partir de {url}",
    opensIn: "(se abre en una pestaña nueva)",
  },
  columns: [
    { heading: "Soluciones", links: ["Desarrollo de software", "Soluciones de IA", "Cloud", "Applied AI"] },
    { heading: "Modelos de contratación", links: ["Aumento de equipo", "Equipos dedicados", "Entrega de proyectos"] },
    { heading: "Industrias", links: ["Sector público", "Servicios financieros", "Restaurantes", "Retail"] },
    { heading: "Recursos", links: ["Casos de uso", "Investigaciones", "Contacto", "Estado", "Reportar un problema"] },
  ],
  credentials: {
    label: "Nuestras certificaciones",
    items: {
      aws: "Socio AWS, Premier Tier Services",
      google: "Socio de Google Cloud",
      webflow: "Socio profesional de Webflow",
      clutchGlobal: "Clutch Global",
      clutchSoftware: "Clutch, mejores desarrolladores de software, El Salvador",
      clutchStaff: "Clutch, mejor empresa de staff augmentation, El Salvador",
      gptw: "Great Place to Work, El Salvador",
      claude: "Socio certificado de servicios de Claude",
    },
  },
  legal: ["Legal", "Privacidad"],
  copyright: "© 2027 Elaniin",
};
