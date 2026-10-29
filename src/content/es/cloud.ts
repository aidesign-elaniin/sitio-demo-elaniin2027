import type { CloudService, ServiceLineCopy } from "../schema";

/*
  Contenido de ejemplo. Estructura de docs/sitemap-elaniin.md 3.8 a 3.10. Las franjas de prueba usan los nombres del
  sitemap, sin cifras inventadas.
*/
export const cloud: ServiceLineCopy<CloudService> = {
  hub: {
    hero: {
      headline: "Cuando el problema es la infraestructura.",
      lead: "Costos que crecen, sistemas que no escalan o un contrato por vencer. Migramos e integramos sobre Google Cloud.",
      cta: "Cuéntanos tu infraestructura",
    },
    intro: {
      title: "Con credencial de Google Cloud.",
      lead: {
        strong: "Dos caminos para la misma meta: una infraestructura que no frene al negocio.",
        rest: "Mover lo que tienes a la nube, o conectar lo que ya existe con control.",
      },
    },
    cards: {
      cloudMigration: { title: "Migración a la nube", text: "Para costos altos, contratos por vencer o sistemas que no escalan." },
      apiManagement: { title: "Gestión e integración de APIs", text: "Para sistemas que no se hablan o APIs sin control." },
    },
    proof: ["uSource", "IBEX", "Procesar"],
  },
  services: {
    cloudMigration: {
      hero: {
        headline: "Tu infraestructura cuesta más de lo que rinde.",
        lead: "Migramos a Google Cloud con una arquitectura pensada para crecer y costos que se pueden prever.",
        cta: "Cuéntanos qué quieres migrar",
      },
      problem: {
        title: "Cuando la infraestructura frena.",
        lead: {
          strong: "La factura sube y el sistema no responde mejor.",
          rest: "Y la fecha de renovación del contrato obliga a decidir ya.",
        },
        points: [
          { title: "Costos altos", text: "Se paga por capacidad que casi nunca se usa." },
          { title: "Contrato por vencer", text: "Renovar sin cambiar nada es repetir el problema." },
          { title: "No escala", text: "Los picos de demanda terminan en caídas o lentitud." },
        ],
      },
      includes: {
        title: "Qué incluye.",
        lead: { strong: "De la evaluación a la operación en la nube.", rest: "Con un plan por etapas y sin pausas largas." },
        items: [
          { title: "Evaluación", text: "Inventario de lo que corre hoy y cuánto cuesta." },
          { title: "Migración a GCP", text: "Movemos cargas por etapas, con pruebas en cada paso." },
          { title: "Arquitectura", text: "Un diseño que escala solo y mantiene los costos a la vista." },
        ],
      },
      highlight: {
        title: "Incentivo Google Cloud.",
        lead: {
          strong: "Tu migración podría calificar para un incentivo.",
          rest: "Revisamos contigo si aplica antes de empezar.",
        },
      },
      proof: ["uSource", "IBEX", "Abaco", "Diimo", "Mercandú", "GOES"],
    },
    apiManagement: {
      hero: {
        headline: "Sistemas que no se hablan. APIs que nadie controla.",
        lead: "Integramos y gobernamos tus APIs con Apigee y Application Integration, también en entornos regulados.",
        cta: "Cuéntanos qué necesitas conectar",
      },
      problem: {
        title: "Cuando la integración se vuelve un riesgo.",
        lead: {
          strong: "Cada sistema nuevo suma otra conexión hecha a mano.",
          rest: "Y en un entorno regulado, no saber quién consume qué es un problema serio.",
        },
        points: [
          { title: "Sistemas aislados", text: "Los datos se copian a mano entre áreas." },
          { title: "APIs sin control", text: "No hay inventario, versiones ni reglas de acceso." },
          { title: "Cumplimiento", text: "Auditar quién consume cada API toma semanas." },
        ],
      },
      includes: {
        title: "Qué incluye.",
        lead: { strong: "Integración y gobierno en una sola capa.", rest: "Con visibilidad de cada consumo." },
        items: [
          { title: "Apigee", text: "Publicación, seguridad y analítica de tus APIs." },
          { title: "Application Integration", text: "Flujos entre sistemas sin código hecho a mano." },
          { title: "Gobierno", text: "Versiones, accesos y políticas documentadas." },
        ],
      },
      proof: ["Procesar", "Invercap", "Credicomer"],
    },
  },
};
