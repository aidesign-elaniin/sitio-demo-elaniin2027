# Bilingual site (English primary, Spanish secondary): design spec

Status: **draft for review** · Date: 2026-10-15 · Source of truth for the rules: `DESIGN.md` section 13 (v1.43.1)

## 1. Goal

The Elaniin 2027 website exists in two languages. **English is the primary language** (no URL prefix) and **Spanish is selectable** (`/es`). Search engines must be able to tell the two apart (distinct URLs, translated titles and descriptions, `hreflang`). Everything built from now on is written with this in mind, so the real build starts with the structure already in place.

Success looks like:
- Every page exists at one English URL and one Spanish URL, and each declares the other as its alternate.
- No visible string lives inside a component; a missing translation fails `tsc`.
- Switching language keeps the visitor on the equivalent page.
- No layout breaks with the longer Spanish copy at 375, 768, 1024 and 1280 px.

## 2. Decisions already taken (from the team)

| Topic | Decision |
|---|---|
| Primary language | English (`en`, also `x-default`) |
| Secondary language | Spanish (`es`) |
| URLs | English without prefix (`/`, `/solutions`); Spanish under `/es` (`/es`, `/es/soluciones`). Confirmed 2026-10-15 |
| Switch | `EN \| ES` links in the nav (right, before the primary button), the mobile menu (bottom) and the footer legal row. Confirmed 2026-10-15 |

Working definitions (change them now if they do not fit): translated slugs; anchor ids in English in both languages; no automatic redirect by `Accept-Language`; no cookie for the choice; no i18n library.

## 3. Where the code stands today

- One page (`src/app/page.tsx`) with eight sections; no subpages exist yet, every internal `href` is `"#"`.
- Spanish dummy copy in 23 of 54 files in `src/`: the section components, the data files (`nav-data.ts`, `solutions-data.ts`, `cases-data.ts`, `research-data.ts`), the five animated scenes (`*-scene.tsx`, `*-visual.tsx`), the newsletter form and `layout.tsx` (`lang="es"`, one description).
- 20 client components. `NumberFlow` formats numbers in three scenes without a locale.
- Anchor ids are Spanish: `#inicio`, `#soluciones`, `#casos`, `#investigaciones`, `#contacto`.
- `next.config.ts` sends `X-Robots-Tag: noindex` (review site); `layout.tsx` sets `robots` from `ALLOW_INDEXING`.

## 4. Design

### 4.1 Routing
- Move `src/app/*` routes under `src/app/[lang]/` (keep `icon.svg`, `globals.css` and any `sitemap.ts` / `robots` files at the `app` root). `[lang]/layout.tsx` is the root layout: `<html lang={lang}>`, fonts, providers, `generateStaticParams` returning `[{lang:"en"},{lang:"es"}]` so both languages are statically rendered.
- `src/proxy.ts` (Next 16 name for middleware), driven by the route table:
  1. `/en` and `/en/*` redirect (308) to the unprefixed path; `/EN`, `/ES` redirect to lowercase.
  2. A table slug without prefix is rewritten to `/en/<slug>`; a Spanish table slug is rewritten to its internal folder under `/es` (the folder is named after the English slug).
  3. Anything else (unknown path, wrong-language slug) is rewritten to `/<lang>/404`; the catch-all `app/[lang]/[...slug]/page.tsx` calls `notFound()` and `not-found.tsx` beside it draws the localized 404 (status 404; see DESIGN.md components.not-found for the known limit: the body is drawn in the browser).
  4. The matcher skips only Next internals and real static files.

### 4.2 Route table (`src/lib/routes.ts`)
One typed object, the only place that knows slugs:

```ts
export const routes = {
  home:      { en: "/",           es: "/es" },
  // pages are added here when they exist, for example:
  // solutions: { en: "/solutions", es: "/es/soluciones" },
} as const;
export type RouteKey = keyof typeof routes;
export const href = (key: RouteKey, lang: Lang, hash?: string) => …;
export const alternates = (key: RouteKey) => ({ en: …, es: …, "x-default": … });
```

Every link in the site goes through `href(key, lang, hash?)`; no hard-coded paths. The language switch and the `alternates` metadata read the same table.

### 4.3 Dictionaries (`src/content/`)
- One file per section and language: `src/content/en/<section>.ts` and `src/content/es/<section>.ts` (sections: `nav`, `hero`, `clients`, `cases`, `research`, `solutions`, `cta`, `footer`, `meta`, `common`).
- The shape of each section's copy is declared once in `src/content/schema.ts` (`Schema`, `SectionKey`); the English and Spanish files are both typed against it, so a missing or extra key fails `tsc`.
- `getDictionary()` reads `lang` with `next/root-params` (per the local Next 16 guide) and returns both the section copy and the `lang`. Server Components call it and pass strings to client leaves **as props**. Deeply nested client trees (the animated scenes) receive a typed `copy` prop from their case entry rather than a context.
- `en` is written first; `es` is a translation reviewed by a person.

### 4.4 Data files: neutral data and text apart
For `cases-data`, `solutions-data`, `nav-data`, `research-data`:
- The **neutral file** keeps ids, route keys, icons, layout spans, accents, numbers and component references (`Scene`, `Visual`).
- The **dictionary** keeps titles, excerpts, labels and units, keyed by the same `id`.
- A small `compose` helper at the section boundary joins them, so components keep receiving the same props they do today.

### 4.5 Metadata and SEO
- `generateMetadata` in each page: translated `title` and `description` (from `meta` dictionary), self-referencing `alternates.canonical`, `alternates.languages` (`en`, `es`, `x-default` → English), Open Graph `locale` and `alternateLocale`, `robots` kept from `ALLOW_INDEXING`.
- `src/app/sitemap.ts`: one entry per page and language, each with `alternates.languages`.
- `<html lang>` per page; any text inside a page written in the other language carries its own `lang`.
- The `X-Robots-Tag` header and the review-site `noindex` stay unchanged.

### 4.6 Language switch
- New presentational component `LanguageSwitch` (no state, no hooks, so it works inside the client `Nav` and in the server `Footer`). The page (a Server Component) computes the two hrefs from the route table for the **current page** and passes them down as props; the component renders two links, `hreflang` + `lang` on each, `aria-current="true"` on the current one, text `EN` / `ES`, DM Sans `body-sm`, current in `text.primary`, the other in `text.secondary` (on-dark tokens over dark bands). Its accessible name comes from the dictionary.
- Placement: nav (right, before the primary button; it needs the nav's `data-theme` tokens), mobile menu (bottom of the sheet), footer legal row.

### 4.7 Formatting
- Numbers, money, dates and plurals go through `Intl` with the page locale. `NumberFlow` receives `locales`. The research list formats dates with `Intl.DateTimeFormat`. Dummy values (`$128.50`) become locale-aware.
- Sentences are single strings with placeholders; no concatenation.

### 4.8 Anchors
Ids become English in both languages: `#home`, `#solutions`, `#cases`, `#research`, `#contact` (`src/lib/anchors.ts`). The mobile menu accordions already produce the DOM ids `mobile-solutions` and `mobile-resources`, so they do not collide with the section ids (checked during implementation).

### 4.9 Design system updates that ship with this work
`DESIGN.md`: components `nav` (adds `language-switch`), `mobile-menu`, `footer` (legal row adds the switch); change log; assumptions.

## 5. Build order

1. **Foundation:** `[lang]` segment, `proxy.ts`, `routes.ts`, `getDictionary`, `Lang` type, `meta` dictionary, `layout` with `lang`, `sitemap.ts`. Home renders in English and Spanish with the existing Spanish copy temporarily in both (proves routing and SEO before any translation).
2. **Nav + footer + language switch** (including the mobile menu).
3. **Sections one at a time**, in page order (hero, clients, cases, research, solutions, cta): move strings to dictionaries, split data, write EN copy, then ES. After each: check 375, 768, 1024, 1280, then wait for approval (project workflow).
4. **Scenes and mocks** (cases, solutions visuals): strings via `copy` props, `Intl` formatting.
5. **SEO pass:** `hreflang`, canonical and sitemap output checked on both languages; `lang` attribute audit.
6. **Close:** `DESIGN.md` changes, change log, remove any leftover hard-coded string.

## 6. Verification

- `tsc --noEmit`, `eslint`, `next build` pass; build output lists `/` and `/es` (and each page in both languages).
- A script (or test) fails the build when a Spanish key is missing or when a component under `src/components` contains a hard-coded user-facing string (grep for accented characters and for known Spanish words outside `src/content`).
- Page source of `/` and `/es` shows: correct `<html lang>`, distinct `<title>` and description, canonical to itself, `hreflang` en / es / x-default, and the same pair on every page.
- `/en`, `/en/solutions` return 308 to the unprefixed URL; wrong-language slugs return 404; `sitemap.xml` has both URLs per page with alternates.
- Layouts at 375 / 768 / 1024 / 1280 with Spanish (longest) and English copy, no horizontal scroll, no clipped text.
- Keyboard: the switch is reachable, announces the current language and the target page, and keeps focus order in nav and footer.

## 7. Out of scope
- Real English copy (written with the real content, section by section).
- A third language, regional variants, right-to-left support.
- Automatic language detection and redirect.
- Translating the brand name, product names or client names.
- Isotipo and tagline work (separate, pending the team).

## 8. Risks and open points
- **Copy length:** Spanish runs 20 to 30% longer; the hairline bento cells and the nav (five items plus switch plus button at 1024 px) are the tightest. Checked per section in step 3, nav first.
- **Client scenes:** the five animated scenes carry many strings; passing a `copy` object per scene is the largest mechanical change.
- **`og:locale` region** (`en_US`, `es_…`) to confirm with the team; not blocking.
- **No pages other than home yet:** the route table starts with one entry and grows with each page; the sitemap and alternates work from that table.
