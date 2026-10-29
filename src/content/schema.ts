/*
  The shape of every section's copy, declared once. Fixed-length lists are tuples, so a missing item fails `tsc` too. src/content/en and src/content/es are both typed
  against it, so a missing or extra key fails `tsc`. English is written first, Spanish is a reviewed translation.
*/
import type { RouteKey } from "@/lib/routes";

export type PageMeta = { title: string; description: string };

/** Detail and legal pages build their metadata from their own content. */
export type LegalPage = "legal" | "privacy" | "status" | "reportIssue";
export type DetailRoute = Extract<RouteKey, `case${string}` | `study${string}` | `article${string}`> | LegalPage;

/** Every other page: it has its own entry in `meta`. */
export type PageRoute = Exclude<RouteKey, DetailRoute>;

/** One title and description per page of the route table: a page without metadata fails `tsc`. */
export type MetaCopy = Record<PageRoute, PageMeta>;

type Lead = { strong: string; rest: string };
type SectionHead = { title: string; lead: Lead };
type Point = { title: string; text: string };

/*
  Service line pages (docs/sitemap-elaniin.md 3.3 to 3.12). A line has a hub (intro, one card per service, proof strip)
  and one page per service. Every service section is optional except the hero, so each page keeps only what the site
  map lists for it. Proof strips are client names from the site map: never translated, never invented.
*/
export type ServiceLineCopy<S extends string> = {
  hub: { hero: HeroCopy; intro: SectionHead; cards: Record<S, Point>; proof: string[] };
  services: Record<S, ServicePageCopy>;
};

export type ServicePageCopy = {
  hero: HeroCopy;
  problem?: SectionHead & { points: Point[] };
  includes: SectionHead & { items: Point[] };
  highlight?: SectionHead & { link?: string };
  /** Client names from the site map; absent when the site map names none. */
  proof?: string[];
  /** Interactive showcases, one per service at most (sample content, nothing real). */
  stages?: StagesCopy;
  phone?: PhoneCopy;
  panel?: PanelCopy;
};

/* App modernization: modules moving from the current system to the new one, stage by stage. */
export type StagesCopy = SectionHead & {
  /** Stage names, from today to the target (4). */
  steps: [string, string, string, string];
  stepsLabel: string;
  current: string;
  next: string;
  bridge: string;
  /** Module names (6), in the order they move. */
  modules: [string, string, string, string, string, string];
  online: string;
  /** "{n} de {total} módulos en el sistema nuevo" */
  migrated: string;
  retired: string;
  play: string;
  pause: string;
};

/* Mobile apps: a phone whose screen follows the selected feature. */
export type PhoneCopy = SectionHead & {
  featuresLabel: string;
  features: [Point, Point, Point];
  home: { greeting: string; balanceLabel: string; actions: [string, string, string]; recent: string; items: [string, string, string] };
  pay: { title: string; to: string; contacts: [string, string, string]; amountLabel: string; confirm: string };
  alerts: { title: string; items: [Point, Point, Point]; now: string };
  note: string;
};

/* Software support: a sample support panel with the response clock of the selected priority. */
export type PanelCopy = SectionHead & {
  prioritiesLabel: string;
  /** Priority name and its sample response time in minutes. */
  priorities: [{ name: string; minutes: number }, { name: string; minutes: number }, { name: string; minutes: number }];
  clockLabel: string;
  elapsed: string;
  metrics: [string, string, string];
  uptimeLabel: string;
  feedLabel: string;
  tickets: [string, string, string, string];
  states: [string, string, string];
  note: string;
};

/* Labels shared by every service line page. */
export type ServicesCommonCopy = {
  proofLabel: string;
  cardLink: string;
  models: SectionHead;
};

export type SoftwareService = "customSoftware" | "appModernization" | "mobileApps" | "softwareSupport";
export type CloudService = "cloudMigration" | "apiManagement";
export type AiService = "aiAgents";

/*
  Engagement models (docs/sitemap-elaniin.md 3.13 to 3.16). The hub cards reuse the nav engagement rows; the model
  pages use the service page template. The comparison has one value per criterion for each model.
*/
/*
  Detail pages of the content linked from Resources: one per case, study and article (not in the site map; every card
  and row already linked to them). Sample content: case results repeat the invented figures of the case cards, studies
  repeat the invented figures of the research list.
*/
export type ArticleId = "insights" | "playbook" | "aiReport";
type ResearchKey = "ai-pilots" | "cloud-spend" | "weekly-delivery" | "long-signups";

export type DetailsCopy = {
  cases: {
    labels: { results: string; challenge: string; solution: string; service: string };
    items: Record<CaseId, { challenge: string; solution: Point[]; results: { value: string; label: string }[] }>;
  };
  research: {
    labels: { method: string; findings: string; meaning: string };
    items: Record<ResearchKey, { method: string; findings: Point[]; meaning: string }>;
  };
  articles: {
    tag: string;
    items: Record<ArticleId, { lead: string; sections: { title: string; paragraphs: string[] }[] }>;
  };
};

/*
  Legal pages linked from the footer legal row and the newsletter terms. Sample text, flagged on the page as pending
  legal approval. The status page invents no system states: it says where the real one will come from.
*/
export type LegalCopy = {
  back: string;
  tag: string;
  notice: string;
  pages: Record<
    LegalPage,
    { title: string; lead: string; sections: { title: string; paragraphs: string[] }[]; action?: string }
  >;
};

/* Industries of docs/sitemap-elaniin.md 3.22, used by the Use Cases filter. */
export type Industry = "publicSector" | "financialServices" | "restaurants" | "retail";

/*
  Industries hub and pages (docs/sitemap-elaniin.md 3.22 to 3.26). Stat values are counted from the site's own data
  (industries, services, engagement models), so the copy only holds their labels. Internal figures from the site map
  stay out until they are validated.
*/
export type IndustriesCopy = {
  hub: {
    hero: HeroCopy;
    intro: SectionHead;
    cards: Record<Industry, Point>;
    stats: SectionHead & { labels: Record<"industries" | "services" | "models", string> };
    certifications: { label: string; items: string[] };
  };
  pages: Record<
    Industry,
    {
      hero: HeroCopy;
      data: SectionHead & { points: Point[] };
      cases: SectionHead & { empty: string; all: string };
      featured: SectionHead;
    }
  >;
};

/*
  Landings by problem (docs/sitemap-elaniin.md 3.27 to 3.29): out of the nav, campaign destinations. The service cards
  reuse the hub card copy of each service line; the case strip uses the names in the site map.
*/
export type Landing = "scaleTeam" | "modernizeSystem" | "deliverGrowth";

export type LandingsCopy = {
  servicesTitle: string;
  servicesLead: Lead;
  caseLabel: string;
  pages: Record<Landing, { hero: HeroCopy; proof: string[] }>;
};

/* Resources hub, Use Cases and Research (docs/sitemap-elaniin.md 3.18 to 3.20). */
export type ResourcesCopy = {
  hub: { hero: HeroCopy; intro: SectionHead; cards: Record<"useCases" | "research", Point> };
  useCases: { hero: HeroCopy; filterLabel: string; all: string; industries: Record<Industry, string> };
  research: { hero: HeroCopy };
};

/*
  Contact Us (docs/sitemap-elaniin.md 3.21). The form is a sample: it validates and simulates sending, nothing leaves the
  browser. Direct contact values are placeholders until the real ones are approved.
*/
export type ContactCopy = {
  title: string;
  lead: string;
  form: {
    label: string;
    name: string;
    email: string;
    company: string;
    interest: string;
    /** First option is the empty choice. */
    interests: string[];
    message: string;
    optional: string;
    submit: string;
    sending: string;
    required: string;
    invalidEmail: string;
    success: { title: string; text: string };
    privacy: string;
  };
  direct: { title: string; items: { label: string; value: string }[]; note: string };
  next: SectionHead & { steps: Point[] };
};

export type EngagementModel = "staffAugmentation" | "dedicatedTeams" | "projectDelivery";

/* Model finder of the comparison: three questions, three options each (option i points to model i), then the table. */
export type FinderCopy = {
  title: string;
  questions: [FinderQuestion, FinderQuestion, FinderQuestion];
  hint: string;
  /** "{n}% de coincidencia" */
  match: string;
  best: string;
  view: string;
  reset: string;
  spectrum: { label: string; start: string; end: string };
  tableTitle: string;
  pick: string;
  picked: string;
};
type FinderQuestion = { label: string; options: [string, string, string] };

export type EngagementCopy = {
  hub: {
    hero: HeroCopy;
    intro: SectionHead;
    comparison: SectionHead & { criteria: string[]; rows: Record<EngagementModel, string[]>; finder: FinderCopy };
  };
  models: Record<EngagementModel, ServicePageCopy>;
};

/*
  Solutions hub (docs/sitemap-elaniin.md 3.2). The intro reuses the home solutions title and lead, and the three entry
  blocks reuse the nav solution cards (titles, descriptions and sublinks), so only the hero and the Applied AI mention are new.
*/
export type SolutionsPageCopy = {
  hero: HeroCopy;
  appliedAi: SectionHead & { link: string };
};

/* Applied AI page (docs/sitemap-elaniin.md 3.17). Service keys match the solution ids of the nav. */
export type AppliedAiCopy = {
  hero: HeroCopy;
  pillars: SectionHead & { items: Record<"capacity" | "humanLoop" | "deliverables", { title: string; text: string }> };
  services: SectionHead & { items: Record<"software" | "ai" | "cloud", { name: string; text: string; link: string }> };
  evidence: SectionHead & {
    all: string;
    items: Record<"deltaForce" | "atlasBuilder", { tag: string; title: string; text: string }>;
  };
};

/* Strings shared by several sections. */
export type CommonCopy = {
  skipToContent: string;
  mainNav: string;
  language: { label: string; en: string; es: string };
  /** Accessible name of the breadcrumb nav and the label of its first item. */
  breadcrumb: { label: string; home: string };
};

/* Nav. Keys of the records match the ids in src/components/sections/nav/nav-data.ts. */
type TitleDesc = { title: string; description: string };

type FeaturedCard = { tag: string; title: string; metric: string };

export type NavCopy = {
  homeAria: string;
  mobileNavLabel: string;
  cta: string;
  menu: { open: string; close: string };
  plain: Record<"appliedAi", string>;
  solutions: {
    trigger: string;
    /** One label per sublink target in nav-data (software 4, ai 1, cloud 2). */
    items: Record<"software" | "ai" | "cloud", TitleDesc & { links: string[] }>;
    help: { question: string; action: string };
    /** Link to the Solutions hub page. */
    all: string;
  };
  engagement: {
    trigger: string;
    heading: string;
    items: Record<"staffAugmentation" | "dedicatedTeams" | "projectDelivery", TitleDesc>;
    help: { question: string; action: string };
  };
  resources: {
    trigger: string;
    explore: { heading: string; items: Record<"useCases" | "research", TitleDesc> };
    latest: { heading: string; items: Record<"insights" | "playbook" | "aiReport", TitleDesc> };
    featured: { heading: string; subtitle: string; cards: [FeaturedCard, FeaturedCard, FeaturedCard] };
  };
};

/** One label per target in src/components/sections/footer/footer-data.ts. */
type FooterColumn = { heading: string; links: string[] };

export type FooterCopy = {
  navLabel: string;
  socialsLabel: string;
  tagline: { lead: string; rest: string };
  newsletter: {
    first: string;
    last: string;
    email: string;
    submit: string;
    sending: string;
    /** One sentence with a {terms} placeholder where the link goes. */
    legal: string;
    terms: string;
    success: string;
    invalidEmail: string;
  };
  columns: [FooterColumn, FooterColumn, FooterColumn, FooterColumn];
  /** Legal, Privacy, Status, Report an issue (footer-data legalRoutes). */
  legal: [string, string, string, string];
  copyright: string;
  placeholder: string;
};

export type HeroCopy = { headline: string; lead: string; cta: string };

export type ClientsCopy = { label: string };

/* Research. Keys of the records match the ids in src/components/sections/research/research-data.ts. */
export type ResearchCopy = {
  title: string;
  lead: { strong: string; rest: string };
  viewAll: string;
  filterLabel: string;
  all: string;
  kinds: Record<"report" | "study", string>;
  /** Topic filter of the Research page (the home filters by kind). */
  topicFilterLabel: string;
  topics: Record<"ai" | "cloud" | "product", string>;
  units: { percent: string; outOfTen: string };
  /** Spoken form of the figure for screen readers, with an {n} placeholder. */
  spoken: { percent: string; outOfTen: string };
  items: Record<"ai-pilots" | "cloud-spend" | "weekly-delivery" | "long-signups", { finding: string; source: string }>;
};

/* Solutions. Keys of the records match the ids in src/components/sections/solutions/solutions-data.ts. */
type DeliveryStep = { label: string; meta: string };
export type DeliveryVisualCopy = { steps: [DeliveryStep, DeliveryStep, DeliveryStep, DeliveryStep]; status: { running: string; done: string } };
export type AssistantVisualCopy = { question: string; answer: string; confirm: string; orders: string };
export type CloudVisualCopy = { availability: string; regions: string };

type Bullet = { title: string; text: string };

export type SolutionText = {
  name: string;
  lead: string;
  rest: string;
  title: string;
  intro: string;
  bullets: [Bullet, Bullet, Bullet];
  metrics: [{ label: string }, { label: string }];
  cta: string;
};

export type SolutionsCopy = {
  title: string;
  lead: { strong: string; rest: string };
  /** Accessible name of the expand button on each card, with a {title} placeholder. */
  card: { details: string };
  dialog: { close: string; talk: string };
  items: Record<"software" | "ai" | "cloud", SolutionText>;
  units: { minutes: string };
  visuals: { software: DeliveryVisualCopy; ai: AssistantVisualCopy; cloud: CloudVisualCopy };
};

/* Cases. Keys of the records match the ids in src/components/sections/cases/cases-data.ts. Placeholders: {id} {n} {place} {time} {amount}. */
export type ShipmentSceneCopy = {
  app: string;
  activeShipments: string;
  search: string;
  today: string;
  places: [string, string, string];
  /** "Shipment {id}" */
  shipment: string;
  /** "3 packages · {place}" */
  summary: string;
  ready: string;
  now: string;
  steps: [string, string, string, string];
  status: { preparing: string; enRoute: string; delivered: string };
  driverRole: string;
  /** "Arrives in {n} min" */
  eta: string;
  /** "Delivered at {time}" */
  deliveredAt: string;
  /** "Order {id} delivered" */
  toast: string;
  chip: string;
};

type Account = { name: string; detail: string };

export type SignupSceneCopy = {
  sampleBusiness: string;
  /** "Step {n} of 3" */
  step: string;
  businessData: string;
  tradeName: string;
  registration: string;
  accountTitle: string;
  accounts: [Account, Account];
  ready: string;
  completed: string;
  balance: string;
  next: string;
  received: string;
  /** "+{amount} · Table 4" */
  receivedDetail: string;
  chip: string;
};

export type SupportSceneCopy = {
  customerName: string;
  order: string;
  open: string;
  resolved: string;
  customer: string;
  reply: string;
  suggested: string;
  reviewed: string;
  edit: string;
  send: string;
  sentMeta: string;
  chip: string;
};

export type CloudSceneCopy = {
  environment: string;
  uptime: string;
  spend: string;
  drop: string;
  /** "Estimated before: {amount}" */
  estimated: string;
  applied: string;
  apply: string;
  servers: { name: string; unit: string };
  database: { name: string; unit: string };
  disks: { name: string; unit: string };
  chip: string;
};

export type CaseId = "delivery-tracking" | "sme-payments" | "support-assistant" | "cloud-migration";

export type CasesCopy = {
  title: string;
  lead: { strong: string; rest: string };
  all: string;
  read: string;
  items: Record<CaseId, { sector: string; title: string; excerpt: string }>;
  scenes: { shipment: ShipmentSceneCopy; signup: SignupSceneCopy; support: SupportSceneCopy; cloud: CloudSceneCopy };
};

export type CtaCopy = { title: string; body: string; primary: string; secondary: string };

/* 404 page. Keys of `links` match the targets in src/components/sections/not-found/not-found.tsx. */
export type NotFoundCopy = {
  tag: string;
  documentTitle: string;
  title: string;
  lead: string;
  home: string;
  talk: string;
  linksLabel: string;
  links: Record<"solutions" | "cases" | "research", { title: string; description: string }>;
};

export interface Schema {
  meta: MetaCopy;
  common: CommonCopy;
  nav: NavCopy;
  footer: FooterCopy;
  hero: HeroCopy;
  clients: ClientsCopy;
  research: ResearchCopy;
  solutions: SolutionsCopy;
  cases: CasesCopy;
  cta: CtaCopy;
  notFound: NotFoundCopy;
  appliedAi: AppliedAiCopy;
  solutionsPage: SolutionsPageCopy;
  services: ServicesCommonCopy;
  software: ServiceLineCopy<SoftwareService>;
  cloud: ServiceLineCopy<CloudService>;
  ai: ServiceLineCopy<AiService>;
  engagement: EngagementCopy;
  resources: ResourcesCopy;
  contact: ContactCopy;
  industries: IndustriesCopy;
  landings: LandingsCopy;
  details: DetailsCopy;
  legal: LegalCopy;
}

export type SectionKey = keyof Schema;
