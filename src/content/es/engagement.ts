import type { EngagementCopy } from "../schema";

/* Título y modelos entregados por el equipo (2026-10-27). Los visuales llevan nombres de pila de muestra. */
export const engagement: EngagementCopy = {
  title: "Tres formas de trabajar con nosotros.",
  lead: "Elige cuánto del trabajo quieres que asumamos.",
  items: [
    {
      id: "staff",
      name: "Staff augmentation",
      rest: "Suma ingenieros senior a tu equipo. Trabajan en tus sprints y herramientas, y conoces a cada uno por nombre.",
      fit: "Ideal si tienes un roadmap y necesitas más capacidad ya.",
      link: "Conocer más",
    },
    {
      id: "dedicated",
      name: "Equipos dedicados",
      rest: "Un equipo completo (ingeniería, diseño, QA y líder de entrega) enfocado solo en tu producto.",
      fit: "Ideal para sostener velocidad sin armar un equipo interno.",
      link: "Conocer más",
    },
    {
      id: "project",
      name: "Proyectos llave en mano",
      rest: "Asumimos el resultado del diagnóstico al lanzamiento, con alcance, tiempos e inversión claros antes de iniciar.",
      fit: "Ideal para iniciativas definidas con un objetivo concreto.",
      link: "Conocer más",
    },
  ],
  visuals: { staff: { names: ["Diego", "Lucía", "Camila"] } },
};
