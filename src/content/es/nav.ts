import type { NavCopy } from "../schema";

/* Contenido de ejemplo. Estructura según el nav primario de docs/sitemap-elaniin.md. */
export const nav: NavCopy = {
  homeAria: "Elaniin, inicio",
  mobileNavLabel: "Principal móvil",
  cta: "Contáctanos",
  menu: { open: "Abrir menú", close: "Cerrar menú" },
  plain: { appliedAi: "Applied AI" },
  solutions: {
    trigger: "Soluciones",
    items: {
      software: {
        title: "Desarrollo de software",
        description: "Software de misión crítica, construido y sostenido en producción.",
        links: ["Software a medida", "Modernización de aplicaciones", "Apps móviles", "Soporte y evolución"],
      },
      ai: {
        title: "Soluciones de IA",
        description: "Automatiza procesos reales, no pilotos que nunca llegan a producción.",
        links: ["Agentes de IA y automatización"],
      },
      cloud: {
        title: "Cloud",
        description: "Migración e integración cuando el problema es la infraestructura.",
        links: ["Migración a la nube", "Gestión e integración de APIs"],
      },
    },
    help: {
      question: "Applied AI no es un servicio aparte: es cómo entregamos los tres frentes.",
      action: "Conocer Applied AI",
    },
    all: "Todas las soluciones",
  },
  engagement: {
    trigger: "Modelos de contratación",
    heading: "Elige cómo trabajamos juntos",
    items: {
      staffAugmentation: { title: "Aumento de equipo", description: "Perfiles que se suman a tu equipo y a tu roadmap" },
      dedicatedTeams: { title: "Equipos dedicados", description: "Un equipo completo enfocado en tu producto" },
      projectDelivery: { title: "Entrega de proyectos", description: "Un resultado cerrado, con discovery como fase 0" },
    },
    help: {
      question: "¿No sabes qué modelo te conviene?",
      action: "Comparar modelos",
    },
    scale: { yours: "Tu equipo", ours: "Elaniin" },
  },
  resources: {
    trigger: "Recursos",
    explore: {
      heading: "Explora Elaniin",
      items: {
        useCases: { title: "Casos de uso", description: "Casos de clientes por industria" },
        research: { title: "Investigaciones", description: "Lo que estudiamos y publicamos" },
      },
    },
    latest: {
      heading: "Últimos artículos",
      items: {
        insights: { title: "Insights", description: "Ideas sobre producto e ingeniería" },
        playbook: { title: "Playbook de entregas", description: "Cómo entregamos cada semana" },
        aiReport: { title: "Informe de IA", description: "Qué funciona y qué no en operaciones" },
      },
    },
    featured: {
      heading: "Casos destacados",
      subtitle: "Resultados que se miden",
      cards: [
        { tag: "Logística", title: "Seguimiento de entregas", metric: "-42% tiempo de atención" },
        { tag: "Fintech", title: "Pagos para pymes", metric: "3x conversión" },
        { tag: "IA aplicada", title: "Asistente de soporte", metric: "+35% tickets por agente" },
      ],
    },
  },
};
