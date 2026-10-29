import type { SolutionsCopy } from "../schema";

/*
  Texto entregado por el equipo (2026-10-27), acortado al presupuesto de caracteres de las tarjetas (DESIGN.md
  components.solutions-grid): un titular de unos 25 caracteres y un resto de unos 100. Las frases completas viven en el
  diálogo (intro) y la llamada a la acción solo en el diálogo.
*/
export const solutions: SolutionsCopy = {
  title: "Software construido con IA desde la primera línea.",
  lead: {
    strong: "Usamos IA en cada proyecto.",
    rest: "Tus liberaciones llegan con menos errores y tu software queda listo para crecer.",
  },
  card: { details: "Ver detalle de {title}" },
  dialog: { close: "Cerrar detalle", talk: "Hablar con el equipo" },
  items: {
    ai: {
      name: "AI delivery",
      lead: "IA en todo el proceso.",
      rest: "Usamos IA para programar, revisar, probar y monitorear; cada decisión tiene el nombre de una persona.",
      title: "AI delivery",
      intro:
        "Nuestros ingenieros usan IA para leer código heredado, programar, revisar, probar cada liberación y monitorear producción. Cada decisión sigue teniendo el nombre de una persona detrás.",
      bullets: [
        { title: "Leer código heredado", text: "Entendemos qué hace un sistema antes de tocarlo." },
        { title: "Programar y revisar", text: "La IA propone, un ingeniero decide y firma." },
        { title: "Probar y monitorear", text: "Cada liberación se prueba y se vigila en producción." },
      ],
      metrics: [{ label: "revisión de código más rápida" }, { label: "decisiones firmadas por una persona" }],
      cta: "Conoce AI delivery",
    },
    software: {
      name: "Software",
      lead: "Creamos y modernizamos.",
      rest: "Productos nuevos y los sistemas de los que ya depende tu operación, al día.",
      title: "Desarrollo y modernización de software",
      intro: "Creamos productos nuevos y modernizamos los sistemas de los que ya depende tu operación.",
      bullets: [
        { title: "Web y móvil", text: "Aplicaciones que la gente usa de verdad, no prototipos." },
        { title: "Plataformas a medida", text: "Sistemas internos que reemplazan hojas de cálculo y procesos manuales." },
        { title: "Modernización de sistemas", text: "Actualizamos lo que ya usas sin detener la operación." },
      ],
      metrics: [{ label: "del commit a producción" }, { label: "cobertura de pruebas" }],
      cta: "Conoce desarrollo de software",
    },
    cloud: {
      name: "Cloud",
      lead: "Para tu demanda real.",
      rest: "Diseñamos, migramos y operamos tu infraestructura, con costos visibles.",
      title: "Cloud",
      intro:
        "Diseñamos, migramos y operamos tu infraestructura en el proveedor cloud que mejor se adapta a tu negocio, dimensionada para tu demanda real y con costos visibles.",
      bullets: [
        { title: "Migración a la nube", text: "Sin pausas largas ni sorpresas en la factura." },
        { title: "Arquitectura y DevOps", text: "Despliegues repetibles y entornos por cada cambio." },
        { title: "Datos, seguridad y costos", text: "Alertas y límites de gasto desde el primer día." },
      ],
      metrics: [{ label: "disponibilidad" }, { label: "costo de infraestructura" }],
      cta: "Conoce cloud",
    },
  },
  units: { minutes: "min" },
  visuals: {
    delivery: { steps: ["Pruebas", "Revisión", "Staging", "Producción"] },
    product: { platform: "Plataforma", web: "App web", mobile: "Móvil" },
    cloud: { availability: "Disponibilidad" },
  },
};
