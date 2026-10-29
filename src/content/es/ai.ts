import type { AiService, ServiceLineCopy } from "../schema";

/*
  Contenido de ejemplo. Estructura de docs/sitemap-elaniin.md 3.11 y 3.12. Las franjas de prueba usan los nombres del
  sitemap, sin cifras inventadas.
*/
export const ai: ServiceLineCopy<AiService> = {
  hub: {
    hero: {
      headline: "Automatiza un proceso real, no un piloto.",
      lead: "Agentes de IA que resuelven trabajo manual de punta a punta, en producción y con revisión humana donde importa.",
      cta: "Cuéntanos qué proceso automatizar",
    },
    intro: {
      title: "Soluciones de IA no es Applied AI.",
      lead: {
        strong: "Aquí la IA es el producto que te entregamos.",
        rest: "Applied AI es cómo trabajamos en todos los servicios; Soluciones de IA es lo que construimos para tu operación.",
      },
    },
    cards: {
      aiAgents: { title: "Agentes de IA y automatización", text: "Para pedidos, trámites y documentos que hoy dependen de trabajo manual." },
    },
    proof: ["Donkeys", "GOES", "Publimóvil", "Ambassador"],
  },
  services: {
    aiAgents: {
      hero: {
        headline: "Procesos manuales que no escalan sin crecer el equipo.",
        lead: "Construimos agentes que toman pedidos, trámites y documentos, y los resuelven de punta a punta.",
        cta: "Cuéntanos tu proceso",
      },
      problem: {
        title: "Cuando el trabajo crece más rápido que el equipo.",
        lead: {
          strong: "Cada pedido nuevo es otra tarea manual.",
          rest: "Y contratar más personas no resuelve el cuello de botella.",
        },
        points: [
          { title: "Pedidos", text: "Se capturan a mano desde correos, chats y llamadas." },
          { title: "Trámites", text: "Pasan por varias manos antes de resolverse." },
          { title: "Documentos", text: "Los datos se copian de PDFs a sistemas, uno por uno." },
        ],
      },
      includes: {
        title: "Qué incluye.",
        lead: { strong: "Agentes conectados a tus sistemas.", rest: "Con reglas claras de cuándo decide la IA y cuándo una persona." },
        items: [
          { title: "Agentes", text: "Resuelven tareas completas, no solo responden preguntas." },
          { title: "n8n", text: "Flujos que conectan el agente con tus sistemas." },
          { title: "LLM", text: "El modelo adecuado para cada tarea, evaluado con tus datos." },
          { title: "Extracción de documentos", text: "Datos de PDFs e imágenes, listos para tus sistemas." },
        ],
      },
      highlight: {
        title: "Por qué no es un piloto.",
        lead: {
          strong: "Empezamos con un proceso real y una métrica.",
          rest: "Si no llega a producción y no se puede medir, no lo damos por terminado.",
        },
      },
      proof: ["Donkeys", "GOES", "Publimóvil", "Ambassador"],
    },
  },
};
