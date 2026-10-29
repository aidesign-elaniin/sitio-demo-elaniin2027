import type { EngagementCopy } from "../schema";

/*
  Contenido de ejemplo. Estructura de docs/sitemap-elaniin.md 3.13 a 3.16. La evidencia usa los nombres del sitemap
  (solo Staff Augmentation los tiene), sin cifras inventadas.
*/
export const engagement: EngagementCopy = {
  hub: {
    hero: {
      headline: "Ya decidiste trabajar con nosotros. Elige cómo.",
      lead: "Personas que se suman a tu equipo, un equipo completo o un resultado cerrado. Tres formas de contratar, el mismo estándar de entrega.",
      cta: "Hablar con el equipo",
    },
    intro: {
      title: "Tres modelos, una frase cada uno.",
      lead: {
        strong: "Sumas personas, sumas un equipo o compras un resultado.",
        rest: "El modelo depende de quién dirige el trabajo y qué quieres recibir al final.",
      },
    },
    comparison: {
      title: "Compara los modelos.",
      lead: { strong: "Lo que cambia entre uno y otro.", rest: "Si dudas entre dos, la llamada inicial sirve para decidir." },
      criteria: ["Qué recibes", "Quién dirige el día a día", "Ideal para", "Cómo se mide"],
      finder: {
        title: "Encuentra tu modelo.",
        questions: [
          { label: "¿Qué te falta hoy?", options: ["Gente para mi roadmap", "Un equipo para mi producto", "Alguien que entregue el resultado"] },
          { label: "¿Quién dirige el día a día?", options: ["Mi equipo", "Compartido", "Elaniin"] },
          { label: "¿Cómo es el horizonte?", options: ["Sprints con un plan claro", "Un producto que sigue creciendo", "Un objetivo con fecha"] },
        ],
        hint: "Responde las tres preguntas y el modelo que mejor encaja se marca en la comparación.",
        match: "{n}% de coincidencia",
        best: "Tu mejor punto de partida",
        view: "Ver el modelo",
        reset: "Empezar de nuevo",
        spectrum: { label: "Quién dirige el día a día", start: "Tu equipo", end: "Elaniin" },
        tableTitle: "El detalle, lado a lado.",
        pick: "Marcar",
        picked: "Marcado",
      },
      rows: {
        staffAugmentation: [
          "Perfiles que se integran a tu equipo",
          "Tu equipo",
          "Roadmap claro y falta de gente",
          "Capacidad entregada por sprint",
        ],
        dedicatedTeams: [
          "Un equipo completo dedicado a tu producto",
          "Elaniin, con tu dirección de producto",
          "Productos que necesitan un equipo estable",
          "Objetivos de producto acordados",
        ],
        projectDelivery: [
          "Un resultado cerrado, con alcance y fases",
          "Elaniin",
          "Proyectos con un objetivo definido",
          "Entregables de cada fase",
        ],
      },
    },
  },
  models: {
    staffAugmentation: {
      hero: {
        headline: "Tienes el roadmap. Te falta la gente.",
        lead: "Sumamos perfiles a tu equipo, en tu horario y con tus procesos, para cumplir lo que ya está planeado.",
        cta: "Cuéntanos qué perfiles necesitas",
      },
      problem: {
        title: "Cuando el plan avanza más rápido que el equipo.",
        lead: {
          strong: "El roadmap está claro; la capacidad no alcanza.",
          rest: "Y contratar a tiempo completo toma meses que el plan no tiene.",
        },
        points: [
          { title: "Contratar tarda", text: "Los procesos de selección no siguen el ritmo del roadmap." },
          { title: "Perfiles escasos", text: "Algunos roles son difíciles de encontrar en tu mercado." },
          { title: "Picos de trabajo", text: "Necesitas más capacidad por un periodo, no para siempre." },
        ],
      },
      includes: {
        title: "Cómo funciona.",
        lead: { strong: "Perfiles que se integran desde la primera semana.", rest: "Con reglas claras de horario y comunicación." },
        items: [
          { title: "Perfiles", text: "Ingeniería, diseño, QA y producto, según lo que pida tu roadmap." },
          { title: "Arranque", text: "Entrevistas con tu equipo y una incorporación acompañada." },
          { title: "Overlap horario", text: "Horas compartidas con tu equipo para trabajar en tiempo real." },
        ],
      },
      highlight: {
        title: "Recursos nombrados.",
        lead: {
          strong: "Sabes quién trabaja contigo, por nombre.",
          rest: "Las mismas personas durante el proyecto, sin rotaciones que te obliguen a empezar de nuevo.",
        },
      },
      proof: ["Jostens", "PuntoXpress"],
    },
    dedicatedTeams: {
      hero: {
        headline: "Un equipo completo, no una persona suelta.",
        lead: "Un equipo dedicado a tu producto, con las funciones que necesita para avanzar solo.",
        cta: "Cuéntanos tu producto",
      },
      problem: {
        title: "Cuando sumar personas no alcanza.",
        lead: {
          strong: "El producto necesita un equipo que se coordine solo.",
          rest: "Sumar perfiles sueltos traslada la coordinación a tu equipo.",
        },
        points: [
          { title: "Sin equipo de producto", text: "No hay quién lleve el producto de punta a punta." },
          { title: "Coordinación cara", text: "Dirigir perfiles sueltos consume a tu equipo." },
          { title: "Continuidad", text: "El producto necesita un equipo estable, no proyectos sueltos." },
        ],
      },
      includes: {
        title: "Cómo funciona.",
        lead: { strong: "Un squad dedicado con un responsable.", rest: "Tú defines el rumbo del producto; el equipo lo ejecuta." },
        items: [
          { title: "Squad dedicado", text: "Ingeniería, diseño y QA trabajando solo en tu producto." },
          { title: "Un responsable", text: "Una persona que coordina al equipo y responde por la entrega." },
          { title: "Ritmo de entrega", text: "Entregas frecuentes revisadas contigo." },
        ],
      },
    },
    projectDelivery: {
      hero: {
        headline: "Quieres un resultado, no un equipo.",
        lead: "Definimos el alcance, lo entregamos por fases y respondemos por el resultado.",
        cta: "Cuéntanos el resultado que buscas",
      },
      problem: {
        title: "Cuando lo que importa es el resultado.",
        lead: {
          strong: "No quieres administrar un equipo, quieres algo funcionando.",
          rest: "Con un alcance claro desde el inicio.",
        },
        points: [
          { title: "Objetivo definido", text: "Sabes qué necesitas, no cómo construirlo." },
          { title: "Sin capacidad de gestión", text: "No tienes quién dirija un equipo técnico." },
          { title: "Presupuesto cerrado", text: "Necesitas saber qué recibes en cada fase." },
        ],
      },
      includes: {
        title: "Cómo funciona.",
        lead: { strong: "Discovery como fase 0.", rest: "Antes de construir, acordamos qué se entrega y cómo se mide." },
        items: [
          { title: "Discovery", text: "Entendemos el problema y definimos el alcance contigo." },
          { title: "Fases", text: "El trabajo se divide en etapas con fecha y objetivo." },
          { title: "Entregables", text: "Cada fase cierra con algo que puedes usar y revisar." },
        ],
      },
    },
  },
};
