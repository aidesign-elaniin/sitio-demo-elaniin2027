import type { NavCopy } from "../schema";
import { cases } from "./cases";
import { engagement } from "./engagement";

/* Los casos reales de la tarjeta destacada salen del diccionario de casos, para que el texto no se separe. */
const featured = (id: "delivery-tracking" | "sme-payments") => ({
  title: cases.items[id].title,
  action: cases.read,
  metric: cases.items[id].sector,
});

/* Contenido de ejemplo. */
export const nav: NavCopy = {
  homeAria: "Elaniin, inicio",
  mobileNavLabel: "Principal móvil",
  cta: "Inicia un proyecto",
  blog: "Blog",
  menu: { open: "Abrir menú", close: "Cerrar menú" },
  plain: { appliedAi: "Applied AI" },
  solutions: {
    all: "Todas las soluciones",
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
      question: "¿No sabes por dónde empezar? Cuéntanos el problema y armamos el camino.",
      action: "Hablar con el equipo",
    },
  },
  engagement: {
    trigger: "Modelos de trabajo",
    items: {
      staff: {
        title: "Staff augmentation",
        description: "Ingenieros senior que se integran a tu equipo y trabajan con tu proceso.",
      },
      dedicated: {
        title: "Equipos dedicados",
        description: "Un equipo completo para tu producto, gestionado por Elaniin o por ti.",
      },
      project: {
        title: "Proyectos llave en mano",
        description: "Alcance, fecha y precio definidos, entregados de principio a fin.",
      },
    },
    visuals: engagement.visuals,
    help: {
      question: "¿No sabes qué modelo te conviene? Cuéntanos tu situación y te recomendamos uno.",
      action: "Hablar con el equipo",
    },
  },
  resources: {
    trigger: "Recursos",
    items: {
      cases: { title: "Casos", description: "Resultados que se miden" },
      research: { title: "Nuestras investigaciones", description: "Lo que estudiamos y publicamos" },
      hub: { title: "Todos los recursos", description: "Casos, investigación y artículos" },
    },
    featured: {
      heading: "Casos destacados",
      subtitle: "Resultados que se miden",
      cards: [
        { ...featured("delivery-tracking"), scene: cases.scenes.shipment },
        { ...featured("sme-payments"), scene: cases.scenes.signup },
      ],
    },
  },
};
