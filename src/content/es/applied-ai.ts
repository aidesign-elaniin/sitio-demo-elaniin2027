import type { AppliedAiCopy } from "../schema";

/* Contenido de ejemplo. Estructura de docs/sitemap-elaniin.md 3.17. Los casos citan nombres del sitemap, sin cifras inventadas. */
export const appliedAi: AppliedAiCopy = {
  hero: {
    headline: "Applied AI: así entregamos todo lo que construimos.",
    lead: "No es un servicio más. Es la forma de trabajar detrás de desarrollo de software, cloud y soluciones de IA: más capacidad, revisión humana en cada paso y entregables que se pueden medir.",
    cta: "Hablemos de tu proyecto",
  },
  pillars: {
    title: "Tres pilares, un mismo método.",
    lead: {
      strong: "Applied AI cambia cómo se entrega, no qué se entrega.",
      rest: "El equipo trabaja con IA en cada fase y responde por cada resultado.",
    },
    items: {
      capacity: {
        title: "Capacidad 100x",
        text: "Agentes y herramientas que multiplican lo que un equipo puede analizar, construir y probar en una semana.",
      },
      humanLoop: {
        title: "Human-in-the-loop",
        text: "Cada sugerencia de la IA pasa por una persona que la revisa, la aprueba y responde por ella.",
      },
      deliverables: {
        title: "Entregables diferenciados",
        text: "Documentación, pruebas y prototipos que antes no cabían en el plazo, incluidos desde el primer sprint.",
      },
    },
  },
  services: {
    title: "Cómo se ve en cada servicio.",
    lead: {
      strong: "El mismo método en los tres frentes.",
      rest: "Cambia el tipo de trabajo, no la forma de entregarlo.",
    },
    items: {
      software: {
        name: "Desarrollo de software",
        text: "Arquitectura, código y pruebas con apoyo de IA, revisados por el equipo antes de cada entrega.",
        link: "Ver desarrollo de software",
      },
      ai: {
        name: "Soluciones de IA",
        text: "Los agentes que construimos para tus procesos pasan por la misma evaluación y revisión humana que usamos nosotros.",
        link: "Ver soluciones de IA",
      },
      cloud: {
        name: "Cloud",
        text: "Análisis de infraestructura y planes de migración más rápidos, con cada cambio validado por un ingeniero.",
        link: "Ver cloud",
      },
    },
  },
  evidence: {
    title: "Dónde ya lo aplicamos.",
    lead: {
      strong: "Proyectos entregados con Applied AI.",
      rest: "El detalle de cada caso llega con el contenido aprobado.",
    },
    all: "Ver casos de uso",
    items: {
      deltaForce: {
        tag: "Sector público",
        title: "Delta Force · GOES",
        text: "Contenido de ejemplo: aquí va el problema, cómo se aplicó Applied AI y el resultado medido.",
      },
      atlasBuilder: {
        tag: "Producto",
        title: "Atlas Builder",
        text: "Contenido de ejemplo: aquí va el problema, cómo se aplicó Applied AI y el resultado medido.",
      },
    },
  },
  loop: {
    title: "Mira el método en acción.",
    lead: {
      strong: "La IA propone. Una persona decide.",
      rest: "Elige una tarea, deja que la IA escriba el borrador y apruébalo o pide un cambio, como lo hace el equipo en cada entrega.",
    },
    tasksLabel: "Tarea",
    tasks: [
      {
        label: "Pruebas del pago",
        draft: "Probar el pago con tarjeta válida, tarjeta vencida y saldo insuficiente; validar el mensaje de error y que no se cobre dos veces.",
        revised: "Probar el pago con tarjeta válida, vencida, sin saldo y con red caída; validar el mensaje de error, el reintento y que no se cobre dos veces.",
      },
      {
        label: "Documentar la API",
        draft: "Endpoint de pedidos: crea, consulta y cancela. Requiere token. Responde 201 al crear y 404 si el pedido no existe.",
        revised: "Endpoint de pedidos: crea, consulta y cancela. Requiere token con permiso de escritura. Responde 201 al crear, 404 si no existe y 409 si ya se canceló.",
      },
      {
        label: "Plan de migración",
        draft: "Mover primero reportes, luego usuarios y al final pagos, con el sistema viejo encendido hasta validar cada etapa.",
        revised: "Mover primero reportes y usuarios, luego pagos en horario de baja demanda, con el sistema viejo encendido y un plan de vuelta atrás por etapa.",
      },
    ],
    lanes: { ai: "La IA propone", review: "Una persona revisa", done: "Se entrega" },
    states: { drafting: "Escribiendo…", waiting: "Esperando revisión", revising: "Ajustando según tu comentario…", approved: "Aprobado" },
    approve: "Aprobar",
    change: "Pedir un cambio",
    reviewer: "Revisa: Ana, QA",
    delivered: "Entregados: {n}",
    empty: "Lo aprobado llega aquí.",
    note: "Demostración con contenido de ejemplo. Ninguna sugerencia llega a producción sin una persona.",
  },
  capacity: { one: "Un equipo", many: "El mismo equipo con IA" },
  pictures: {
    loop: { ai: "IA", person: "Persona", ship: "Entrega", back: "Vuelve con cambios" },
    sheets: ["Documentación", "Pruebas", "Prototipo"],
  },
};
