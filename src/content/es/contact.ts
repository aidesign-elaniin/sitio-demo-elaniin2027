import type { ContactCopy } from "../schema";

/* Contenido de ejemplo. Estructura de docs/sitemap-elaniin.md 3.21. Los datos de contacto directo son de ejemplo. */
export const contact: ContactCopy = {
  title: "Hablemos de lo que quieres construir.",
  lead: "Cuéntanos el problema en pocas líneas. Te respondemos para agendar una llamada de 30 minutos, sin compromiso.",
  form: {
    label: "Formulario de contacto",
    name: "Nombre",
    email: "Correo de trabajo",
    company: "Empresa",
    interest: "Qué necesitas",
    interests: [
      "Elige una opción",
      "Desarrollo de software",
      "Cloud",
      "Soluciones de IA",
      "Aumentar mi equipo",
      "Todavía no lo sé",
    ],
    message: "Cuéntanos el problema",
    optional: "opcional",
    submit: "Enviar",
    sending: "Enviando…",
    required: "Completa este campo.",
    invalidEmail: "Escribe un correo válido.",
    success: {
      title: "Recibimos tu mensaje.",
      text: "Te escribiremos pronto para agendar la llamada.",
    },
    privacy: "Usamos estos datos solo para responderte.",
  },
  direct: {
    title: "Contacto directo",
    items: [
      { label: "Correo", value: "contacto@example.com" },
      { label: "Teléfono", value: "+000 0000 0000" },
    ],
    note: "Datos de ejemplo hasta tener los oficiales.",
  },
  next: {
    title: "Qué pasa después.",
    lead: { strong: "Tres pasos, sin sorpresas.", rest: "Antes de proponer nada, entendemos el problema." },
    steps: [
      { title: "Te respondemos", text: "Una persona del equipo lee tu mensaje y te escribe para agendar." },
      { title: "Llamada de 30 minutos", text: "Entendemos el problema, el contexto y lo que ya intentaste." },
      { title: "Propuesta", text: "Te enviamos un camino concreto: servicio, modelo de contratación y siguientes pasos." },
    ],
  },
};
