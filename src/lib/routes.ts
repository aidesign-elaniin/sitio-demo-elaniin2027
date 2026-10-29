import { langs, type Lang } from "./i18n";
import { siteUrl } from "./site";

/*
  The only place that knows slugs. One entry per page, with its path in each language.
  Pages are added here when they exist (for example solutions: { en: "/solutions", es: "/es/soluciones" }).
*/
export const routes = {
  home: { en: "/", es: "/es" },
  solutions: { en: "/solutions", es: "/es/soluciones" },
  softwareDevelopment: { en: "/solutions/software-development", es: "/es/soluciones/desarrollo-de-software" },
  customSoftware: {
    en: "/solutions/software-development/custom-software-development",
    es: "/es/soluciones/desarrollo-de-software/desarrollo-a-medida",
  },
  appModernization: {
    en: "/solutions/software-development/application-modernization",
    es: "/es/soluciones/desarrollo-de-software/modernizacion-de-aplicaciones",
  },
  mobileApps: {
    en: "/solutions/software-development/mobile-app-development",
    es: "/es/soluciones/desarrollo-de-software/apps-moviles",
  },
  softwareSupport: {
    en: "/solutions/software-development/software-support-evolution",
    es: "/es/soluciones/desarrollo-de-software/soporte-y-evolucion",
  },
  cloud: { en: "/solutions/cloud", es: "/es/soluciones/cloud" },
  cloudMigration: { en: "/solutions/cloud/cloud-migration", es: "/es/soluciones/cloud/migracion-a-la-nube" },
  apiManagement: {
    en: "/solutions/cloud/api-management-integration",
    es: "/es/soluciones/cloud/gestion-e-integracion-de-apis",
  },
  aiSolutions: { en: "/solutions/ai-solutions", es: "/es/soluciones/soluciones-de-ia" },
  aiAgents: {
    en: "/solutions/ai-solutions/ai-agents-process-automation",
    es: "/es/soluciones/soluciones-de-ia/agentes-de-ia-y-automatizacion",
  },
  engagementModels: { en: "/engagement-models", es: "/es/modelos-de-contratacion" },
  staffAugmentation: {
    en: "/engagement-models/staff-augmentation",
    es: "/es/modelos-de-contratacion/aumento-de-equipo",
  },
  dedicatedTeams: {
    en: "/engagement-models/dedicated-development-teams",
    es: "/es/modelos-de-contratacion/equipos-dedicados",
  },
  projectDelivery: {
    en: "/engagement-models/project-delivery",
    es: "/es/modelos-de-contratacion/entrega-de-proyectos",
  },
  appliedAi: { en: "/applied-ai", es: "/es/ia-aplicada" },
  contact: { en: "/contact-us", es: "/es/contacto" },
  legal: { en: "/legal", es: "/es/legal" },
  privacy: { en: "/privacy", es: "/es/privacidad" },
  status: { en: "/status", es: "/es/estado" },
  reportIssue: { en: "/report-an-issue", es: "/es/reportar-un-problema" },
  scaleTeam: { en: "/scale-your-engineering-team", es: "/es/escala-tu-equipo-de-ingenieria" },
  modernizeSystem: { en: "/modernize-a-critical-system", es: "/es/moderniza-un-sistema-critico" },
  deliverGrowth: { en: "/deliver-technology-behind-growth", es: "/es/entrega-la-tecnologia-detras-del-crecimiento" },
  industries: { en: "/industries", es: "/es/industrias" },
  publicSector: { en: "/industries/public-sector", es: "/es/industrias/sector-publico" },
  financialServices: { en: "/industries/financial-services", es: "/es/industrias/servicios-financieros" },
  restaurants: { en: "/industries/restaurants", es: "/es/industrias/restaurantes" },
  retail: { en: "/industries/retail", es: "/es/industrias/retail" },
  resources: { en: "/resources", es: "/es/recursos" },
  useCases: { en: "/resources/use-cases", es: "/es/recursos/casos-de-uso" },
  research: { en: "/resources/research", es: "/es/recursos/investigaciones" },
  caseDeliveryTracking: {
    en: "/resources/use-cases/delivery-tracking",
    es: "/es/recursos/casos-de-uso/seguimiento-de-entregas",
  },
  caseSmePayments: { en: "/resources/use-cases/sme-payments", es: "/es/recursos/casos-de-uso/pagos-para-pymes" },
  caseSupportAssistant: {
    en: "/resources/use-cases/support-assistant",
    es: "/es/recursos/casos-de-uso/asistente-de-soporte",
  },
  caseCloudMigration: { en: "/resources/use-cases/cloud-migration", es: "/es/recursos/casos-de-uso/migracion-a-la-nube" },
  studyAiPilots: { en: "/resources/research/ai-pilots", es: "/es/recursos/investigaciones/pilotos-de-ia" },
  studyCloudSpend: { en: "/resources/research/cloud-spend", es: "/es/recursos/investigaciones/gasto-en-nube" },
  studyWeeklyDelivery: {
    en: "/resources/research/weekly-delivery",
    es: "/es/recursos/investigaciones/entregas-semanales",
  },
  studyLongSignups: { en: "/resources/research/long-signups", es: "/es/recursos/investigaciones/altas-largas" },
  articleInsights: { en: "/resources/articles/insights", es: "/es/recursos/articulos/insights" },
  articlePlaybook: { en: "/resources/articles/delivery-playbook", es: "/es/recursos/articulos/playbook-de-entregas" },
  articleAiReport: { en: "/resources/articles/ai-report", es: "/es/recursos/articulos/informe-de-ia" },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

/** Path of a page in a language, with an optional anchor id (see src/lib/anchors.ts). */
export function href(key: RouteKey, lang: Lang, hash?: string): string {
  const path: string = routes[key][lang];
  return hash ? `${path}#${hash}` : path;
}

/** Paths of the same page in both languages, plus x-default (English), for hreflang and the sitemap. */
export function alternates(key: RouteKey): { en: string; es: string; "x-default": string } {
  return { en: routes[key].en, es: routes[key].es, "x-default": routes[key].en };
}

export const absoluteUrl = (path: string): string => `${siteUrl()}${path}`;

/** Appends the current #hash to a path: anchors are the same in both languages, so the visitor keeps their place. */
export const withHash = (path: string, hash: string): string => (hash ? `${path}${hash}` : path);

export type SwitchLink = { lang: Lang; label: "EN" | "ES"; name: string; href: string; current: boolean };

/** The language switch of a page: the SAME page in each language, with the current one marked. Names come from the dictionary. */
export function switchLinks(route: RouteKey, current: Lang, names: Record<Lang, string>): SwitchLink[] {
  return langs.map((lang) => ({
    lang,
    label: lang === "en" ? "EN" : "ES",
    name: names[lang],
    href: href(route, lang),
    current: lang === current,
  }));
}
