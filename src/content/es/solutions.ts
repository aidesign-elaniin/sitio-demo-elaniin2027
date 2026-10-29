import type { SolutionsCopy } from "../schema";

/* Contenido de ejemplo. */
export const solutions: SolutionsCopy = {
  title: "Tres frentes, un solo equipo.",
  lead: {
    strong: "Producto, inteligencia y nube se resuelven juntos.",
    rest: "Así el software no se rompe entre áreas ni entre proveedores.",
  },
  card: { details: "Ver detalle de {title}" },
  dialog: { close: "Cerrar detalle", talk: "Hablar con el equipo" },
  items: {
    software: {
      name: "Software",
      lead: "Desarrollo de software.",
      rest: "Productos web, móviles y plataformas a medida, entregados cada semana en un entorno real.",
      title: "Desarrollo de software",
      intro:
        "Equipos de producto, diseño e ingeniería que entregan cada semana en un entorno real, con medición desde el primer día.",
      bullets: [
        { title: "Web y móvil", text: "Aplicaciones que la gente usa de verdad, no prototipos." },
        { title: "Plataformas a medida", text: "Sistemas internos que reemplazan hojas de cálculo y procesos manuales." },
        { title: "Integraciones y APIs", text: "Conectamos lo que ya tienes sin reescribirlo." },
      ],
      metrics: [{ label: "del commit a producción" }, { label: "cobertura de pruebas" }],
      cta: "Ver desarrollo de software",
    },
    ai: {
      name: "IA",
      lead: "IA aplicada.",
      rest: "Asistentes y automatizaciones con casos de uso acotados y revisión humana en cada paso.",
      title: "IA aplicada",
      intro: "Casos de uso acotados, con datos reales y revisión humana donde importa.",
      bullets: [
        { title: "Asistentes y agentes", text: "Respuestas sugeridas a partir de tu base de conocimiento." },
        { title: "Automatización de procesos", text: "Tareas repetitivas resueltas de punta a punta." },
        { title: "Evaluación y gobierno", text: "Medimos la calidad y dejamos reglas claras de uso." },
      ],
      metrics: [{ label: "tickets resueltos por agente" }, { label: "respuestas con revisión humana" }],
      cta: "Ver IA aplicada",
    },
    cloud: {
      name: "Cloud",
      lead: "Cloud sin fricción.",
      rest: "Infraestructura que escala sola, cerca de tus usuarios y con los costos bajo control.",
      title: "Cloud",
      intro: "Infraestructura que escala sola, cerca de tus usuarios y con los costos bajo control.",
      bullets: [
        { title: "Migración a la nube", text: "Sin pausas largas ni sorpresas en la factura." },
        { title: "Arquitectura y DevOps", text: "Despliegues repetibles y entornos por cada cambio." },
        { title: "Datos, seguridad y costos", text: "Alertas y límites de gasto desde el primer día." },
      ],
      metrics: [{ label: "disponibilidad" }, { label: "costo de infraestructura" }],
      cta: "Ver cloud",
    },
  },
  units: { minutes: "min" },
  visuals: {
    software: {
      steps: [
        { label: "Pruebas", meta: "82% cobertura" },
        { label: "Revisión", meta: "2 aprobaciones" },
        { label: "Staging", meta: "3 min" },
        { label: "Producción", meta: "14 min" },
      ],
      status: { running: "En curso", done: "Listo" },
    },
    ai: {
      question: "¿Cuántos pedidos siguen pendientes de pago esta semana?",
      answer: "Hay 18 pedidos pendientes y 11 llevan más de 48 horas. ¿Envío un recordatorio automático?",
      confirm: "Sí, enviar",
      orders: "Ver pedidos",
    },
    cloud: { availability: "Disponibilidad", regions: "3 regiones" },
  },
};
