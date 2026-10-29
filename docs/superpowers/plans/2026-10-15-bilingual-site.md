# Bilingual site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve every page in English at an unprefixed URL and in Spanish under `/es`, with typed dictionaries, translated slugs and complete SEO metadata, without changing how the site looks.

**Architecture:** All routes move under `src/app/[lang]/`. `src/proxy.ts` rewrites unprefixed paths to `/en/...` and redirects `/en/...` to the unprefixed URL, using one pure function. A route table (`src/lib/routes.ts`) is the only place that knows slugs. Copy lives in typed dictionaries (`src/content/{en,es}/`), read in Server Components and handed to client leaves as props. Section data files keep only neutral data (ids, icons, route targets).

**Tech Stack:** Next.js 16.3.8 (App Router, `proxy.ts`, `next/root-params`), React 19, TypeScript, Tailwind v4, Vitest (new dev dependency, for pure logic and server-rendered markup), `Intl`.

**Spec:** `docs/superpowers/specs/2026-10-15-bilingual-site-design.md` (rules in `DESIGN.md` section 13). Read both before starting. Spec 4.3 is refined here: the **shape of each section's copy is declared once in `src/content/schema.ts`** and both `en` and `es` are typed against it (same effect, a missing or extra key fails `tsc`).

## Global Constraints

- Languages `en` (default, `x-default`, no URL prefix) and `es` (under `/es`). No region codes.
- `/en` and `/en/*` redirect with **308** to the unprefixed URL. No redirect by `Accept-Language`, no cookie for the language, no i18n library.
- Anchor ids in English in both languages: `home`, `solutions`, `cases`, `research`, `contact`.
- No visible string in a component: copy, `aria-label`, `alt`, placeholders, validation messages and the text inside the decorative scenes all come from dictionaries.
- Numbers, money and dates through `Intl` with the page language. Sentences are one string with placeholders (`{n}`), never concatenated.
- Layout and visuals must not change: only text and routing change. Every UI task ends with a check at 375, 768, 1024 and 1280 px, in both languages (Spanish is 20 to 30% longer).
- `DESIGN.md` is the source of truth for tokens; no hard-coded hex, radius, shadow or font. Server Components by default; `"use client"` only on leaves that already have it.
- The review-site `noindex` (`robots` metadata from `ALLOW_INDEXING` and the `X-Robots-Tag` header) must keep working on both languages.
- English dummy copy is a faithful translation of the current dummy Spanish (still dummy and invented); real copy comes with the real content.
- **No commits and no pushes** (standing rule: everything stays local until the user asks). Each task ends with a `git status --short` checkpoint instead.
- Next 16 is not the Next you know: `middleware` is `proxy`; consult `node_modules/next/dist/docs/01-app/` for any API not named here.
- Commands run from the repo root `/Users/rogerpaniagua/Desktop/website-elaniin-2027`; use absolute paths in tool calls.

## Review Focus

- Visiting `/en`, `/en/x` or `/en?a=1` must redirect to `/`, `/x`, `/?a=1` (no loop, query kept); `/english` and `/espanol` must not be mistaken for locales. Pinned in Task 2.
- An unknown language or a wrong-language slug (`/fr`, `/es/zzz`, `/zzz`) must return a real 404 and never render a page with `lang="fr"`. Pinned in Task 3.
- A missing or extra Spanish key must fail `tsc`, not show an empty label at runtime. Pinned in Task 4.
- English anchors must not collide with existing ids (`mobile-menu` panels use `solutions` and `resources`); duplicate `id` attributes break anchors and a11y. Pinned in Task 5.
- Nav with five items + switch + primary button at 1024 px with the longer Spanish labels must not wrap or overflow. Pinned in Task 7.

---

## File Structure

Create:
- `vitest.config.ts` – alias `@`, JSX automatic, node environment.
- `src/lib/i18n.ts` – `Lang`, `langs`, `defaultLang`, `hasLang`, `otherLang`.
- `src/lib/routes.ts` – route table, `href`, `alternates`, `absoluteUrl`.
- `src/lib/site.ts` – `siteUrl` (env `SITE_URL`, default the review URL).
- `src/lib/anchors.ts` – English anchor ids.
- `src/lib/format.ts` – `formatMonth`, `formatCurrency`, `formatNumber` (all `Intl`).
- `src/lib/proxy-rules.ts` – pure `resolveLocale(pathname)`.
- `src/proxy.ts` – applies `resolveLocale`.
- `src/content/schema.ts` – the copy type of every section (`Schema`, `SectionKey`).
- `src/content/index.ts` – `getLang()`, `getCopy(section)`.
- `src/content/en/*.ts`, `src/content/es/*.ts` – one file per section, plus `index.ts` in each.
- `src/components/ui/language-switch.tsx` – presentational switch.
- `src/app/[lang]/` – `layout.tsx`, `page.tsx` (moved), `not-found.tsx` if Task 3 needs it.
- `src/app/sitemap.ts`.
- Tests next to their subject: `*.test.ts(x)`, plus `src/content/copy-guard.test.ts`.

Modify: `package.json`, every file listed under Tasks 6 to 12, `DESIGN.md` (Task 13).

---

### Task 1: Test tooling, languages and route table

**Files:**
- Create: `vitest.config.ts`, `src/lib/i18n.ts`, `src/lib/routes.ts`, `src/lib/site.ts`
- Test: `src/lib/i18n.test.ts`, `src/lib/routes.test.ts`
- Modify: `package.json` (devDependency `vitest`, script `"test": "vitest run"`)

**Interfaces:**
- Produces:
  - `type Lang = "en" | "es"`; `const langs: readonly ["en","es"]`; `const defaultLang: Lang`; `hasLang(v: string): v is Lang`; `otherLang(l: Lang): Lang`.
  - `type RouteKey = keyof typeof routes`; `routes = { home: { en: "/", es: "/es" } }`.
  - `href(key: RouteKey, lang: Lang, hash?: string): string`.
  - `alternates(key: RouteKey): { en: string; es: string; "x-default": string }` (paths, not absolute).
  - `absoluteUrl(path: string): string` using `siteUrl`.

- [ ] **Step 1: Install and configure the runner.** `npm i -D vitest@^3`. Create `vitest.config.ts` with `resolve.alias: { "@": <abs src> }`, `esbuild: { jsx: "automatic" }`, `test.environment: "node"`, `test.include: ["src/**/*.test.{ts,tsx}"]`. Add the `test` script.
- [ ] **Step 2: Write failing tests.** `i18n.test.ts`: `hasLang("en")` and `hasLang("es")` true; `hasLang("fr")`, `hasLang("EN")`, `hasLang("")` false; `otherLang("en") === "es"`; `defaultLang === "en"`. `routes.test.ts`: `href("home","en") === "/"`; `href("home","es") === "/es"`; `href("home","en","cases") === "/#cases"`; `href("home","es","cases") === "/es#cases"`; `alternates("home")` equals `{ en: "/", es: "/es", "x-default": "/" }`; `absoluteUrl("/es")` starts with `https://` and ends with `/es`.
- [ ] **Step 3: Run `npx vitest run`.** Expected: FAIL, modules not found.
- [ ] **Step 4: Implement** the files with the signatures above. `routes` is declared `as const satisfies Record<string, Record<Lang, string>>`. `href` appends `#hash` to the language's path. `site.ts`: `export const siteUrl = process.env.SITE_URL ?? "https://elaniin-2027-website.vercel.app"` (no trailing slash).
- [ ] **Step 5: Run `npx vitest run` and `npx tsc --noEmit`.** Expected: PASS, no errors.
- [ ] **Step 6: Checkpoint:** `git status --short` lists only the files above and `package-lock.json`.

---

### Task 2: Locale resolution in the proxy

**Files:**
- Create: `src/lib/proxy-rules.ts`, `src/proxy.ts`
- Test: `src/lib/proxy-rules.test.ts`

**Interfaces:**
- Consumes: `langs`, `defaultLang` from `src/lib/i18n.ts`.
- Produces: `type LocaleAction = { action: "next" } | { action: "redirect"; pathname: string } | { action: "rewrite"; pathname: string }`; `resolveLocale(pathname: string): LocaleAction`.

- [ ] **Step 1: Write failing tests** (`resolveLocale`): `"/"` → rewrite `"/en"`; `"/solutions"` → rewrite `"/en/solutions"`; `"/es"` → next; `"/es/soluciones"` → next; `"/en"` → redirect `"/"`; `"/en/solutions"` → redirect `"/solutions"`; `"/english"` → rewrite `"/en/english"`; `"/espanol"` → rewrite `"/en/espanol"`; `"/es-x"` → rewrite `"/en/es-x"`.
- [ ] **Step 2: Run `npx vitest run src/lib/proxy-rules.test.ts`.** Expected: FAIL.
- [ ] **Step 3: Implement `resolveLocale`** by matching the first path segment exactly (`/en`, `/es`), never by prefix string.
- [ ] **Step 4: Implement `src/proxy.ts`:** `export function proxy(request: NextRequest)` clones `request.nextUrl`, applies `resolveLocale`, returns `NextResponse.redirect(url, 308)` / `NextResponse.rewrite(url)` / `NextResponse.next()`, so the query string is kept. `export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] }` (skips `_next`, any path with a dot such as `icon.svg`, `sitemap.xml` and assets).
- [ ] **Step 5: Run `npx vitest run`.** Expected: PASS. (End-to-end `/en` behavior is checked in Task 3 once `[lang]` exists.)
- [ ] **Step 6: Checkpoint:** `git status --short`.

---

### Task 3: `[lang]` segment, layout, metadata and sitemap

**Files:**
- Move: `src/app/layout.tsx` and `src/app/page.tsx` into `src/app/[lang]/` (keep `globals.css` and `icon.svg` in `src/app/`; fix the `./globals.css` import)
- Create: `src/content/schema.ts`, `src/content/index.ts`, `src/content/en/index.ts`, `src/content/en/meta.ts`, `src/content/es/index.ts`, `src/content/es/meta.ts`, `src/app/sitemap.ts`
- Test: `src/content/meta.test.ts`

**Interfaces:**
- Consumes: Task 1 (`Lang`, `hasLang`, `alternates`, `absoluteUrl`, `siteUrl`), Task 2 (proxy).
- Produces:
  - `interface Schema { meta: MetaCopy }` and `type SectionKey = keyof Schema`, where `MetaCopy = { siteName: string; titleTemplate: string; home: { title: string; description: string }; ogLocale: string }` (`ogLocale` is `"en_US"` / `"es_ES"`, to confirm with the team; not blocking).
  - `getLang(): Promise<Lang>` (reads `lang` from `next/root-params`, calls `notFound()` if `!hasLang`).
  - `getCopy<K extends SectionKey>(section: K): Promise<Schema[K]>`.
  - `buildMetadata(lang: Lang, route: RouteKey, page: { title: string; description: string }): Metadata` exported from `src/content/index.ts` (or `src/lib/metadata.ts`), producing `title`, `description`, `metadataBase`, `alternates.canonical`, `alternates.languages` (`en`, `es`, `x-default`), `openGraph.locale`/`alternateLocale`, and `robots` (`{ index:false, follow:false }` unless `ALLOW_INDEXING === "true"`).

- [ ] **Step 1: Write failing test** `meta.test.ts` for `buildMetadata`: for `("es","home", page)` the canonical is `"/es"`, `languages` has `en: "/"`, `es: "/es"`, `x-default: "/"`; for `("en","home", page)` the canonical is `"/"`; `robots` is `{ index: false, follow: false }` when `ALLOW_INDEXING` is unset and `undefined` when it is `"true"`; the English and Spanish `title` differ.
- [ ] **Step 2: Run it.** Expected: FAIL.
- [ ] **Step 3: Implement** `schema.ts`, the two `meta.ts` dictionaries (English first; Spanish keeps today's description text in Spanish), the two `index.ts` aggregators, `getLang`, `getCopy` (dynamic `import("./en")` / `import("./es")`), and `buildMetadata`.
- [ ] **Step 4: Move the app.** `src/app/[lang]/layout.tsx`: `export async function generateStaticParams()` returns `langs.map((lang) => ({ lang }))`; the layout awaits `getLang()` and renders `<html lang={lang}>` with the same fonts, body and `Providers` as today; `export async function generateMetadata()` uses `buildMetadata(lang, "home", copy.home)`. `src/app/[lang]/page.tsx`: unchanged content for now (still renders the Spanish dummy in both languages, as the spec's step 1 intends). Remove the old `metadata` export and the `lang="es"`.
- [ ] **Step 5: Implement `src/app/sitemap.ts`:** `MetadataRoute.Sitemap` with one entry per route and language (`url: absoluteUrl(path)`), each with `alternates.languages` (`en`, `es`).
- [ ] **Step 6: Verify.** `npx tsc --noEmit && npm run lint && npm run build`: the build output lists `/en` and `/es`. Then `npx next start -p 3100 &` and check with `curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n"`:
  - `/` → `200`; `/es` → `200`; `/en` → `308` to `/`; `/en?a=1` → `308` to `/?a=1`; `/fr` → `404`; `/es/zzz` → `404`; `/zzz` → `404`.
  - `curl -s /` contains `<html lang="en"`; `/es` contains `<html lang="es"`; each has `hreflang="en"`, `hreflang="es"`, `hreflang="x-default"`, a canonical pointing at itself, `name="robots" content="noindex, nofollow"`, and the response header `x-robots-tag: noindex, nofollow`; `/sitemap.xml` lists both URLs. Stop the server.
- [ ] **Step 7:** If `/zzz` renders a broken page (no layout), add `src/app/[lang]/not-found.tsx` that returns a minimal localized 404 (copy added to `meta`), then repeat the 404 checks.
- [ ] **Step 8: Checkpoint:** `git status --short`.

---

### Task 4: Dictionary shape guard and copy-guard test

**Files:**
- Create: `src/content/copy-guard.test.ts`
- Modify: `src/content/schema.ts` (adds `CommonCopy`, section `common`), `src/content/en/common.ts`, `src/content/es/common.ts`, both `index.ts`

**Interfaces:**
- Produces: `Schema.common: { skipToContent: string; mainNav: string; language: { label: string; en: string; es: string } }`; a `PENDING: string[]` array in `copy-guard.test.ts` that Tasks 6 to 12 shrink.

- [ ] **Step 1: Write the guard test.** Walk `src/app` and `src/components` for `*.ts` and `*.tsx` (excluding tests and `src/content`), strip `//` and `/* */` comments, and look for `/[áéíóúñÁÉÍÓÚÑ¿¡]/` or the words `Casos|Soluciones|Hablemos|Nosotros|Recursos|Contacto|Informe|Estudio|Saltar`. Assertions: (a) every file **not** in `PENDING` has no match; (b) every file in `PENDING` still has a match (so the list cannot go stale). `PENDING` starts with the 23 files that hold Spanish today (`src/app/[lang]/layout.tsx` is already clean after Task 3 and is not listed).
- [ ] **Step 2: Run it.** Expected: PASS with the initial list (if (b) fails for a file, remove it).
- [ ] **Step 3: Add `common`** to the schema and both languages (English: "Skip to content", "Main", "Language", "English", "Español"; Spanish: "Saltar al contenido", "Principal", "Idioma", "English", "Español").
- [ ] **Step 4: Prove the shape guard.** Temporarily delete one key from `src/content/es/common.ts`, run `npx tsc --noEmit`, expected: an error naming the missing key; restore it and re-run, expected: no errors.
- [ ] **Step 5: Run `npx vitest run && npx tsc --noEmit`.** Expected: PASS.
- [ ] **Step 6: Checkpoint:** `git status --short`.

---

### Task 5: English anchors and format helpers

**Files:**
- Create: `src/lib/anchors.ts`, `src/lib/format.ts`
- Test: `src/lib/anchors.test.ts`, `src/lib/format.test.ts`
- Modify: section ids `src/components/sections/hero/hero.tsx` (`inicio`), `cases/cases.tsx` (`casos`), `research/research.tsx` (`investigaciones`), `solutions/solutions.tsx` (`soluciones`), `cta/cta.tsx` (`contacto`), `solutions/solution-dialog.tsx` (`href="#contacto"`), `nav/mobile-menu.tsx` (panel ids `solutions` and `resources`, to `mobile-solutions` and `mobile-resources`, plus any `aria-controls` that point at them)

**Interfaces:**
- Produces: `anchors = { home: "home", solutions: "solutions", cases: "cases", research: "research", contact: "contact" } as const`; `type AnchorKey = keyof typeof anchors`.
  `formatMonth(lang: Lang, isoYearMonth: string): string` (input `"2026-09"`); `formatCurrency(lang: Lang, value: number, currency: "USD"): string`; `formatNumber(lang: Lang, value: number, options?: Intl.NumberFormatOptions): string`.

- [ ] **Step 1: Write failing tests.** `anchors.test.ts`: values are unique; `anchors.contact === "contact"`; a scan of `src/` (excluding tests) finds none of `#inicio`, `#soluciones`, `#casos`, `#investigaciones`, `#contacto`, `id="soluciones"`. `format.test.ts`: `formatMonth("en","2026-09") === "Sep 2026"`; `formatMonth("es","2026-09") === "sept 2026"`; `formatNumber("en", 1234.5)` contains `"."` and not `","` after the thousands part (assert `=== "1,234.5"`), while `formatNumber("es", 1234.5)` contains `","` as the decimal separator (assert only `includes(",5")`, since Spanish grouping of 4-digit numbers varies by ICU data); `formatCurrency("en", 128.5, "USD") === "$128.50"` (use `currencyDisplay: "narrowSymbol"`).
- [ ] **Step 2: Run them.** Expected: FAIL.
- [ ] **Step 3: Implement** `anchors.ts` and `format.ts` (`Intl.DateTimeFormat` with `timeZone: "UTC"`). Replace every literal id and every `#…` target listed under Files with `anchors.<key>`. Section ids use `id={anchors.cases}` etc.; the hero keeps `scroll-mt-16`.
- [ ] **Step 4: Verify.** `npx vitest run && npx tsc --noEmit && npm run lint`. Start the dev server (`preview_start` name `dev`) and run in the page: `[...document.querySelectorAll('[id]')].map(e=>e.id).filter((id,i,a)=>a.indexOf(id)!==i)`. Expected: `[]` (no duplicate ids, with the mobile menu open and closed). Click the nav "Casos" link: the page lands on the cases section.
- [ ] **Step 5: Checkpoint:** `git status --short`.

---

### Task 6: Language switch component

**Files:**
- Create: `src/components/ui/language-switch.tsx`
- Test: `src/components/ui/language-switch.test.tsx`
- Modify: `src/lib/routes.ts` (adds `switchLinks`)

**Interfaces:**
- Consumes: `Schema["common"]["language"]`, `Lang`, `href`.
- Produces: `type SwitchLink = { lang: Lang; label: "EN" | "ES"; name: string; href: string; current: boolean }`; `switchLinks(route: RouteKey, current: Lang, names: { en: string; es: string }): SwitchLink[]` (hash-less, same route in both languages); `<LanguageSwitch links={SwitchLink[]} label={string} variant?: "auto" | "dark" className?: string />`. `"auto"` follows the nav bar through `group-data-[theme=dark]:` classes; `"dark"` always uses the on-dark text tokens (footer).

- [ ] **Step 1: Write failing tests** (`renderToStaticMarkup`): two `<a>`; the current one has `aria-current="true"` and the other has none; each link has `hreflang` and `lang` equal to its language; visible text is `EN` and `ES`; the `nav` wrapper carries `aria-label` equal to `label`; each `<a>` has a `title`/`aria-label` equal to the link's `name` (e.g. "Español"). `switchLinks("home","en",…)` returns `/` for `en` and `/es` for `es`; `switchLinks("home","es",…)` marks `es` current.
- [ ] **Step 2: Run them.** Expected: FAIL.
- [ ] **Step 3: Implement** the component as a plain server-safe function component (no hooks, no `"use client"`). Style: DM Sans `text-body-sm`, current option `text-text-primary`, the other `text-text-secondary`, hover to primary, `focus-ring` (and `focus-ring-on-dark` for `"dark"`), a hairline `|` separator that is `aria-hidden`; no blue, no flags. Use only tokens from `globals.css`.
- [ ] **Step 4: Run `npx vitest run && npx tsc --noEmit && npm run lint`.** Expected: PASS.
- [ ] **Step 5: Checkpoint:** `git status --short`.

---

### Task 7: Nav, menus and mobile menu

**Files:**
- Modify: `src/components/sections/nav/nav-data.ts` (neutral data), `nav.tsx` (becomes the client component renamed `nav-client.tsx`), `solutions-menu.tsx`, `resources-menu.tsx`, `mobile-menu.tsx`
- Create: `src/components/sections/nav/nav.tsx` (new async Server Component `Nav`), `src/content/en/nav.ts`, `src/content/es/nav.ts`
- Modify: `src/content/schema.ts`, both `index.ts`, `src/app/[lang]/page.tsx` (`<Nav route="home" />`), `src/content/copy-guard.test.ts` (remove the nav files from `PENDING`)

**Interfaces:**
- Consumes: Task 3 (`getLang`, `getCopy`), Task 5 (`anchors`), Task 6 (`LanguageSwitch`, `switchLinks`).
- Produces:
  - Neutral target type `Target = { route: RouteKey; anchor?: AnchorKey } | null` (`null` = pending page, renders `href="#"`), and a helper `resolveTarget(t: Target, lang: Lang): string` in `nav-data.ts`.
  - `NavCopy` in the schema: `{ ariaLabel: string; homeLabel: string; solutions: { trigger: string; items: Record<"software"|"ai"|"cloud", { title: string; description: string; links: string[] }>; featuredHeading: string; featured: { tag: string; title: string; metric: string }[] }; resources: { trigger: string; explore: { heading: string; items: { title: string; description: string }[] }; latest: …; docs: { heading: string; items: string[]; viewAll: string } }; plain: string[]; cta: string; openMenu: string; closeMenu: string; mobile: { … } }` (final field set follows the strings actually present in the five files; every string there moves).
  - `Nav({ route }: { route: RouteKey })` (server) renders `NavClient` with props `copy: NavCopy`, `lang: Lang`, `switchLinks: SwitchLink[]`, and the language switch inside the bar before the primary button and at the bottom of the mobile sheet.

- [ ] **Step 1: Write the failing test** (`nav-data.test.ts`): `resolveTarget({route:"home",anchor:"cases"},"en") === "/#cases"`; same with `"es"` → `"/es#cases"`; `resolveTarget(null,"es") === "#"`; and the guard test fails because the nav files were removed from `PENDING` while still holding Spanish.
- [ ] **Step 2: Run `npx vitest run`.** Expected: FAIL.
- [ ] **Step 3: Split data from text.** `nav-data.ts` keeps ids, icons and `Target`s (logo target `{route:"home",anchor:"home"}`); all titles, descriptions, labels, headings and `aria-label`s move to `src/content/{en,es}/nav.ts`, typed as `NavCopy`. The menus and mobile menu receive `copy`, `lang` and `switchLinks` as props; no component imports the dictionaries directly.
- [ ] **Step 4: Wire the switch.** Desktop: `<LanguageSwitch variant="auto" … />` right of the nav list and before the primary button, hidden below `lg` (the mobile sheet has its own). Mobile menu: `<LanguageSwitch variant="auto" … />` at the bottom of the sheet.
- [ ] **Step 5: Run `npx vitest run && npx tsc --noEmit && npm run lint`.** Expected: PASS.
- [ ] **Step 6: Visual check.** At 375, 768, 1024, 1280 px in `/` and `/es`: nav in light, blue and black themes, mobile sheet, both menus. At **1024 px in Spanish** the bar shows logo, five items, switch and "Hablemos" on one line with no overflow (`document.querySelector('header').scrollWidth === clientWidth` and no text wrap in the items); if it does not fit, reduce the gap between the items (existing tokens only) before touching the switch.
- [ ] **Step 7: Checkpoint:** `git status --short`.

---

### Task 8: Footer and newsletter form

**Files:**
- Modify: `src/components/sections/footer/footer.tsx` (async Server Component), `newsletter-form.tsx` (client; receives `copy` and `lang`), `social-icons` only if it holds labels
- Create: `src/content/en/footer.ts`, `src/content/es/footer.ts`
- Modify: `src/content/schema.ts`, both `index.ts`, `page.tsx` (`<Footer route="home" />`), `copy-guard.test.ts` (`PENDING`)

**Interfaces:**
- Consumes: Tasks 3, 5, 6.
- Produces: `FooterCopy = { tagline: { lead: string; rest: string }; newsletter: { first: string; last: string; email: string; submit: string; legal: string; terms: string; success: string; errors: { required: string; email: string } }; socialsLabel: string; columns: { heading: string; links: string[] }[]; legal: string[]; copyright: string; placeholder: string }`; `Footer({ route }: { route: RouteKey })`.

- [ ] **Step 1: Write the failing assertion** by removing the footer files from `PENDING` and running the guard. Expected: FAIL.
- [ ] **Step 2: Move strings** (including validation messages and the `aria-label`s) into `footer.ts` in both languages. The legal row gets `<LanguageSwitch variant="dark" … />`. The copyright stays lowercase in both languages (`© 2027 elaniin`). The newsletter form posts the current `lang` in a hidden field named `lang`.
- [ ] **Step 3: Run `npx vitest run && npx tsc --noEmit && npm run lint`.** Expected: PASS.
- [ ] **Step 4: Visual check** at 375, 768, 1024, 1280 px in both languages (footer column links wrap without clipping; switch visible in the legal row).
- [ ] **Step 5: Checkpoint:** `git status --short`.

---

### Task 9: Hero and clients

**Files:**
- Modify: `src/components/sections/hero/hero.tsx`, `src/components/sections/clients/clients.tsx` (async Server Components), `clients/placeholder-logos.tsx` (accessible names)
- Create: `src/content/{en,es}/hero.ts`, `src/content/{en,es}/clients.ts`
- Modify: `schema.ts`, both `index.ts`, `copy-guard.test.ts` (`PENDING`)

**Interfaces:**
- Produces: `HeroCopy = { title: string; lead: string; primary: string; secondary: string }`, `ClientsCopy = { label: string; logos: Record<string, string> }` (accessible names keyed by logo id). Target links use `href(route, lang, anchor)`.

- [ ] **Step 1: Remove the files from `PENDING`; run the guard.** Expected: FAIL.
- [ ] **Step 2: Move every string** to the dictionaries; buttons use `href("home", lang, "contact")` and `href("home", lang, "cases")`.
- [ ] **Step 3: Run `npx vitest run && npx tsc --noEmit && npm run lint`.** Expected: PASS.
- [ ] **Step 4: Visual check** at 375, 768, 1024, 1280 px in both languages (hero headline line count may grow in Spanish; no clipping).
- [ ] **Step 5: Checkpoint:** `git status --short`.

---

### Task 10: Research

**Files:**
- Modify: `research/research-data.ts` (neutral), `research.tsx`, `research-explorer.tsx` (client; receives `copy` and `lang`), `research-row.tsx`
- Create: `src/content/{en,es}/research.ts`
- Modify: `schema.ts`, both `index.ts`, `copy-guard.test.ts` (`PENDING`)

**Interfaces:**
- Consumes: Task 5 (`formatMonth`, `formatNumber`).
- Produces: `ResearchKind = "report" | "study"` (ids, no longer the Spanish words); `ResearchItem.date` becomes ISO `"YYYY-MM"`; `ResearchItem.unit: "percent" | "outOfTen"`; `ResearchCopy = { title: string; lead: string; filterLabel: string; all: string; kinds: Record<ResearchKind, string>; units: { percent: string; outOfTen: string }; items: Record<string, { finding: string; source: string }>; cta: string }`.

- [ ] **Step 1: Write the failing test** `research-data.test.ts`: every item has a `date` matching `/^\d{4}-\d{2}$/`, a `kind` in `["report","study"]`, and a copy entry in both languages for its id (import both dictionaries).
- [ ] **Step 2: Run it.** Expected: FAIL.
- [ ] **Step 3: Implement.** Filter tabs, kind tags and dates render from `copy.kinds[kind]` and `formatMonth(lang, date)`; the mono-uppercase styling of the tags and the date stays as DESIGN.md defines.
- [ ] **Step 4: Run `npx vitest run && npx tsc --noEmit && npm run lint`.** Expected: PASS (remove the research files from `PENDING` first).
- [ ] **Step 5: Visual check** at the four widths, both languages (filter row does not wrap badly; the black band keeps the nav in the black theme).
- [ ] **Step 6: Checkpoint:** `git status --short`.

---

### Task 11: Solutions (cards, dialog, visuals)

**Files:**
- Modify: `solutions/solutions-data.ts` (neutral), `solutions.tsx`, `solutions-grid.tsx`, `solution-card.tsx`, `solution-dialog.tsx`, `cloud-visual.tsx`, `delivery-visual.tsx`, `assistant-visual.tsx`
- Create: `src/content/{en,es}/solutions.ts`
- Modify: `schema.ts`, both `index.ts`, `copy-guard.test.ts` (`PENDING`)

**Interfaces:**
- Produces: `SolutionsCopy = { title: string; lead: { strong: string; rest: string }; items: Record<"software"|"ai"|"cloud", { name: string; lead: string; rest: string; title: string; intro: string; bullets: { title: string; text: string }[]; metrics: { label: string }[]; cta: string; expand: string; close: string; visual: Record<string, string> }> }`. Metric values stay in the neutral data (numbers) and are formatted with `formatNumber`; each visual receives `copy: SolutionsCopy["items"][id]["visual"]` as a prop.

- [ ] **Step 1: Remove the files from `PENDING`; run the guard.** Expected: FAIL.
- [ ] **Step 2: Move strings**, including the dialog's `aria-label`s, the CTA (`href("home", lang, "contact")`) and the strings inside the three visuals.
- [ ] **Step 3: Run `npx vitest run && npx tsc --noEmit && npm run lint`.** Expected: PASS.
- [ ] **Step 4: Visual check** at the four widths in both languages, with the dialog open for each solution (visual column keeps its hairline layout; the focus ring behavior is unchanged).
- [ ] **Step 5: Checkpoint:** `git status --short`.

---

### Task 12: Cases and scenes, then CTA

**Files:**
- Modify: `cases/cases-data.ts` (neutral), `cases.tsx`, `case-card` pieces if any, `cloud-scene.tsx`, `shipment-scene.tsx`, `signup-scene.tsx`, `support-scene.tsx`, `src/components/sections/cta/cta.tsx`
- Create: `src/content/{en,es}/cases.ts`, `src/content/{en,es}/cta.ts`
- Modify: `schema.ts`, both `index.ts`, `copy-guard.test.ts` (`PENDING` ends empty)

**Interfaces:**
- Consumes: Task 5 (`formatCurrency`, `formatNumber`).
- Produces: `CasesCopy = { title: string; lead: string; all: string; read: string; items: Record<string, { sector: string; title: string; excerpt: string; scene: Record<string, string> }> }`; each scene is `Scene: ComponentType<{ accent: string; copy: Record<string,string>; lang: Lang }>` (or a per-scene typed `copy`), and every `NumberFlow` receives `locales={lang}`; money uses `formatCurrency`/the `format` option. `CtaCopy = { title: string; body: string; primary: string; secondary: string }`.

- [ ] **Step 1: Remove the case and CTA files from `PENDING`; run the guard.** Expected: FAIL.
- [ ] **Step 2: Move strings** (including the sample client name and tax id typed in `signup-scene`, notifications, status labels and chip text) into `cases.ts`; keep invented figures as numbers in neutral data. `cases.tsx` composes data + copy and passes the scene's slice down.
- [ ] **Step 3: Run `npx vitest run && npx tsc --noEmit && npm run lint`.** Expected: PASS and `PENDING` is an empty array.
- [ ] **Step 4: Visual check** at the four widths, both languages: the four case cards (wide + narrow, narrow + wide), each scene running (text fits in the phone frame and chips), the CTA band. Confirm `1.234,5`-style separators in Spanish scenes and no `NaN`.
- [ ] **Step 5: Checkpoint:** `git status --short`.

---

### Task 13: Close-out, SEO verification and DESIGN.md

**Files:**
- Modify: `DESIGN.md` (components `nav` adds `language-switch`, `mobile-menu`, `footer` legal row; section 13.6 "What is NOT done yet" rewritten; change log; version; assumption 16 note), `README.md` only if it documents routes
- Delete: leftover `PENDING` array code in `copy-guard.test.ts` if empty (keep the test)

- [ ] **Step 1: Full verification.** `npx vitest run && npx tsc --noEmit && npm run lint && npm run build`: all pass, build output lists `/en` and `/es`.
- [ ] **Step 2: Run the Task 3 curl matrix again** against `npx next start -p 3100` (status codes, `/en` redirect with query, 404s) and add: `/es` HTML contains the Spanish `<title>` from `meta`; `/` contains the English one; both canonical and `hreflang` blocks present; `x-robots-tag` header present; `/sitemap.xml` has both URLs with `xhtml:link` alternates.
- [ ] **Step 3: Keyboard and a11y pass** in the browser pane: tab order through nav → switch → button; the switch announces the current language; `html lang` is correct after navigating `/` → `/es` with the switch; no horizontal scroll at 375 px in either language.
- [ ] **Step 4: Update `DESIGN.md`** (components, 13.6, change log row with the new version, YAML validated with `ruby -ryaml -rdate` as before) and fix any statement the build disproved.
- [ ] **Step 5: Checkpoint:** `git status --short`, then report to the user what changed and that nothing was committed or pushed.
