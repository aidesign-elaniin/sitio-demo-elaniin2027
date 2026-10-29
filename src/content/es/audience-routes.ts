import type { AudienceRoutesCopy } from "../schema";

/*
  Ítems y rutas entregados por el equipo (2026-10-28). El título, el texto introductorio y TODOS los casos de éxito son de MUESTRA:
  descripciones genéricas sin nombres de clientes y con cifras inventadas, para revisar el diseño hasta que lleguen los casos reales.
*/
export const audienceRoutes: AudienceRoutesCopy = {
  title: "Cada organización avanza a su manera.",
  lead: "Elige tu sector y mira cómo podemos ayudarte, con los proyectos que lo respaldan.",
  toggle: {
    label: "Sector",
    private: "Empresa privada",
    public: "Sector público",
  },
  casesLabel: "Casos de éxito",
  casesClose: "Cerrar",
  sectors: {
    private: [
      {
        id: "staff",
        lead: "Ampliar tu equipo de tecnología.",
        rest: "Ingenieros senior que se integran a tus sprints y se quedan en tu proyecto.",
        link: "Staff augmentation",
        cases: [
          {
            title: "Equipo senior para una plataforma de retail",
            result: "Ciclo de entrega de 6 a 2 semanas",
          },
          {
            title: "Ingenieros dentro de un equipo fintech",
            result: "Hoja de ruta entregada un trimestre antes",
          },
        ],
      },
      {
        id: "modernization",
        lead: "Modernizar un sistema crítico.",
        rest: "Migramos, reconstruimos o ampliamos las plataformas de las que depende tu operación, sin detenerla.",
        link: "Modernización de software",
        cases: [
          {
            title: "Sistema central migrado sin caídas",
            result: "Cero horas de caída",
          },
          {
            title: "Monolito heredado dividido en servicios",
            result: "Despliegues de mensuales a diarios",
          },
        ],
      },
      {
        id: "software",
        lead: "Crear el software sobre el que corre tu negocio.",
        rest: "Productos a la medida, diseñados, construidos y lanzados por un solo equipo, de la idea a producción.",
        link: "Software a la medida",
        cases: [
          {
            title: "Plataforma de pedidos para una empresa de logística",
            result: "En producción en 14 semanas",
          },
          {
            title: "App de clientes para un banco regional",
            result: "300 mil usuarios en el primer trimestre",
          },
        ],
      },
    ],
    public: [
      {
        id: "critical",
        lead: "Crear software crítico.",
        rest: "Sistemas de los que dependen las instituciones, documentados, seguros y listos para ser auditados.",
        link: "Software crítico",
        cases: [
          {
            title: "Sistema de expedientes para una entidad pública",
            result: "99.9% de los expedientes digitalizados",
          },
          {
            title: "Plataforma de seguimiento de casos para un ministerio",
            result: "Auditado sin hallazgos",
          },
        ],
      },
      {
        id: "impact",
        lead: "Llegar a las personas que atiendes.",
        rest: "Servicios digitales que acercan una institución pública a su ciudadanía, simples y seguros.",
        link: "Impacto en la población",
        cases: [
          {
            title: "Portal de servicios ciudadanos",
            result: "1.2 M de ciudadanos atendidos",
          },
          {
            title: "App de citas para salud pública",
            result: "Tiempo de espera 45% menor",
          },
        ],
      },
      {
        id: "availability",
        lead: "Estar disponible cuando importa.",
        rest: "Plataformas que siguen funcionando en picos de demanda, con monitoreo y un plan de recuperación.",
        link: "Alta disponibilidad",
        cases: [
          {
            title: "Portal de resultados para una autoridad electoral",
            result: "100% de disponibilidad el día de la elección",
          },
          {
            title: "Pasarela de pagos para un servicio público",
            result: "Pico de carga 10 veces mayor atendido",
          },
        ],
      },
    ],
  },
  visuals: {
    staff: { team: "Tu equipo" },
    modernization: { legacy: "Heredado", modern: "Moderno" },
    public: {
      documented: "Documentado",
      secure: "Seguro",
      traceable: "Trazable",
    },
    software: { product: "Tu producto" },
    critical: { label: "Crítico" },
    impact: { label: "Servicio" },
    availability: { primary: "Activo", backup: "Respaldo" },
  },
};
