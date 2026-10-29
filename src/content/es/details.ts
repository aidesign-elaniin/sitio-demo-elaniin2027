import type { DetailsCopy } from "../schema";

/*
  Contenido de ejemplo (casos, estudios y cifras inventados). Los resultados repiten las cifras de las tarjetas de caso y
  de la lista de investigaciones; no se agrega ninguna cifra nueva.
*/
export const details: DetailsCopy = {
  cases: {
    labels: {
      results: "Resultados",
      challenge: "El reto.",
      solution: "Lo que hicimos.",
      service: "El servicio detrás del caso.",
    },
    items: {
      "delivery-tracking": {
        challenge:
          "El equipo de atención consultaba tres sistemas para responder una sola pregunta: dónde está mi pedido. Cada respuesta tomaba minutos y los errores se repetían.",
        solution: [
          { title: "Un solo panel", text: "Los tres sistemas quedaron conectados en una vista para todo el equipo." },
          { title: "Estado en tiempo real", text: "Cada envío muestra su recorrido y su hora estimada." },
          { title: "Entregas cada semana", text: "El panel salió por partes, medido desde la primera versión." },
        ],
        results: [
          { value: "-42%", label: "tiempo de atención" },
          { value: "10", label: "semanas hasta el resultado" },
        ],
      },
      "sme-payments": {
        challenge:
          "Las pymes abandonaban el alta antes de terminar, y la conciliación de pagos se hacía a mano al final de cada día.",
        solution: [
          { title: "Alta en minutos", text: "Un onboarding corto, con validaciones en cada paso." },
          { title: "Conciliación automática", text: "Los pagos se cruzan solos con las ventas." },
          { title: "App móvil", text: "Todo el flujo, disponible desde el teléfono." },
        ],
        results: [{ value: "3x", label: "conversión del alta" }],
      },
      "support-assistant": {
        challenge:
          "El volumen de tickets crecía más rápido que el equipo de soporte, y las respuestas repetidas consumían la mayor parte del día.",
        solution: [
          { title: "Respuestas sugeridas", text: "El asistente propone una respuesta a partir de la base de conocimiento." },
          { title: "Revisión humana", text: "Cada respuesta pasa por una persona antes de enviarse." },
          { title: "Medición continua", text: "La calidad de las sugerencias se evalúa cada semana." },
        ],
        results: [{ value: "+35%", label: "tickets resueltos por agente" }],
      },
      "cloud-migration": {
        challenge:
          "La infraestructura costaba cada vez más y el contrato de hospedaje estaba por vencer. Apagar el servicio para migrar no era una opción.",
        solution: [
          { title: "Migración por etapas", text: "Las cargas se movieron una por una, con pruebas en cada paso." },
          { title: "Arquitectura nueva", text: "Escala sola y deja los costos a la vista." },
          { title: "Sin interrupciones", text: "El servicio siguió disponible durante todo el cambio." },
        ],
        results: [
          { value: "-31%", label: "costo de infraestructura" },
          { value: "99.98%", label: "disponibilidad durante el cambio" },
        ],
      },
    },
  },
  research: {
    labels: { method: "Cómo lo medimos.", findings: "Lo que encontramos.", meaning: "Qué significa para tu equipo." },
    items: {
      "ai-pilots": {
        method: "Encuesta a equipos de producto sobre los pilotos de IA que iniciaron en el último año y cuántos llegaron a producción.",
        findings: [
          { title: "Sin métrica de éxito", text: "La mayoría de los pilotos empezó sin una métrica acordada." },
          { title: "Datos reales tarde", text: "Los datos de producción llegaron después de la demo." },
          { title: "Sin responsable", text: "Pocos pilotos tenían un dueño en la operación." },
        ],
        meaning: "Un piloto llega a producción cuando empieza con un proceso real, una métrica y un responsable.",
      },
      "cloud-spend": {
        method: "Análisis de cuentas cloud: capacidad contratada frente a capacidad usada durante un trimestre.",
        findings: [
          { title: "Recursos olvidados", text: "Entornos de prueba que nadie apagó." },
          { title: "Sobredimensión", text: "Servidores pensados para el pico, pagados todo el mes." },
          { title: "Sin alertas", text: "Pocas cuentas tenían límites de gasto." },
        ],
        meaning: "Revisar la capacidad y poner alertas de gasto es el primer ahorro, antes de cualquier migración.",
      },
      "weekly-delivery": {
        method: "Seguimiento de equipos durante un año: frecuencia de entrega y tiempo para corregir errores en producción.",
        findings: [
          { title: "Cambios pequeños", text: "Entregar seguido obliga a cambios fáciles de revisar." },
          { title: "Pruebas automáticas", text: "Los equipos semanales prueban antes de cada entrega." },
          { title: "Menos miedo a desplegar", text: "Desplegar deja de ser un evento." },
        ],
        meaning: "Entregar cada semana no es más riesgoso: es la forma de corregir más rápido.",
      },
      "long-signups": {
        method: "Pruebas con personas en varios productos, midiendo cuántas terminan un alta según su número de pasos.",
        findings: [
          { title: "Cada paso cuesta", text: "El abandono sube con cada paso extra." },
          { title: "Datos innecesarios", text: "Muchos campos se pueden pedir después." },
          { title: "Validar a tiempo", text: "Los errores al final generan más abandono." },
        ],
        meaning: "Un alta corta y que valida en cada paso convierte mejor que un formulario completo.",
      },
    },
  },
  articles: {
    tag: "Artículo",
    items: {
      insights: {
        lead: "Ideas sobre producto e ingeniería, a partir de lo que vemos en los proyectos que entregamos.",
        sections: [
          {
            title: "Empezar por el problema",
            paragraphs: [
              "Los proyectos que mejor salen empiezan con una frase clara del problema y una métrica para saber si se resolvió.",
              "La tecnología se elige después, cuando ya se entiende qué hay que mover.",
            ],
          },
          {
            title: "Entregar para aprender",
            paragraphs: [
              "Cada entrega es una oportunidad de medir. Entregar poco y seguido permite corregir antes de que el costo crezca.",
            ],
          },
        ],
      },
      playbook: {
        lead: "Cómo entregamos cada semana: el ritmo, las reglas y lo que revisamos antes de cada despliegue.",
        sections: [
          {
            title: "El ritmo",
            paragraphs: [
              "La semana empieza con prioridades acordadas y termina con algo funcionando en un entorno real.",
            ],
          },
          {
            title: "Las reglas",
            paragraphs: [
              "Cambios pequeños, revisados por otra persona y con pruebas automáticas antes de cada despliegue.",
              "Si algo falla, se revierte primero y se analiza después.",
            ],
          },
        ],
      },
      aiReport: {
        lead: "Qué funciona y qué no cuando la IA entra a la operación, según los proyectos que hemos acompañado.",
        sections: [
          {
            title: "Lo que funciona",
            paragraphs: [
              "Casos de uso acotados, con datos reales y una persona que revisa donde el error cuesta.",
            ],
          },
          {
            title: "Lo que no",
            paragraphs: [
              "Pilotos sin métrica, demos con datos de ejemplo y automatizaciones sin un responsable en la operación.",
            ],
          },
        ],
      },
    },
  },
};
