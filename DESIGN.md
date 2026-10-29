---
name: Elaniin 2027
description: Design system for the Elaniin 2027 re-brand website. White and grey carry the page, Excellence Blue (dark navy) carries the weight, Elevate Blue (bright blue) appears only in fine details. Hairline-grid layouts.
version: 1.70.1
date: 2026-10-15
language: en (primary), es (secondary). See section 13, Internationalization

# ─────────────────────────────────────────────────────────────
# COLOR  (every value below is the ONLY allowed source of color)
# ─────────────────────────────────────────────────────────────
colors:
  brand:
    elevate-blue: "#1054FF"      # DETAIL accent only (links, focus, active indicators, symbol). Never a large fill
    inspire-grey: "#F0F0F3"      # alternate surface
    excellence-blue: "#01172E"   # the strong color: primary button, dark bands, case stages, CTA, footer, code surfaces. Darker since 2026-10-06 (was #011E3D)
    elaniin-black: "#141414"     # wordmark, primary text, secondary-button border
    dynamic-blue: "#4D75FD"      # NON-TEXT accents only (graphics, tints, chart series)
    white: "#FFFFFF"

  blue-ramp:                      # sampled from the brand palette ramp; used for tints and the stepped motif
    100: "#D7E2F8"
    200: "#B9CEFB"
    300: "#6A9AFF"
    400: "#4D75FD"               # = dynamic-blue
    500: "#1054FF"               # = elevate-blue
    600: "#0848CC"               # hover
    700: "#023CA0"               # active / pressed
    800: "#022B63"
    900: "#01172E"               # = excellence-blue
    tint-50: "#E7EEFF"           # info background (derived)

  text:
    primary: "#141414"           # on white / inspire-grey
    secondary: "#4A4D57"
    muted: "#656873"
    link: "#1054FF"
    link-hover: "#0848CC"
    on-dark-primary: "#FFFFFF"   # on excellence-blue and elaniin-black
    on-dark-secondary: "#A9B8CC"
    on-dark-muted: "#8EA0B8"
    on-dark-accent: "#7B9BFF"    # the ONLY blue allowed as text on dark
    disabled: "#8C8F9B"

  surface:
    page: "#FFFFFF"
    subtle: "#F0F0F3"            # alternate sections, card-on-white inner wells
    card: "#FFFFFF"
    dark: "#01172E"
    dark-alt: "#141414"
    dark-card: "rgba(255,255,255,0.04)"
    code: "#01172E"              # = excellence-blue; its own name for code blocks
    # no Elevate Blue section surface exists on purpose

  border:
    default: "#E4E4EA"           # hairlines on white and inspire-grey
    strong: "#D3D4DC"
    input: "#8C8F9B"             # 3.22:1 on white, required for input boundaries
    ink: "#141414"               # secondary button outline
    on-dark: "rgba(255,255,255,0.12)"
    on-dark-strong: "rgba(255,255,255,0.24)"
    focus: "#1054FF"
    focus-on-dark: "#7B9BFF"

  elevate-blue-usage:             # the complete list of where #1054FF may appear. Anything else is a violation
    allowed:
      - "primary button fill (one per action group; the dark variant is the alternative)"
      - "text links in running text and tertiary buttons"
      - "focus ring and keyboard-focus outlines"
      - "active/selected indicators (tab underline 2px, current nav item, selected row marker)"
      - "on-state of controls (checkbox, radio, switch, slider fill)"
      - "small icons and 6-8px accent dots"
      - "the isotipo / symbol (pending approval) in the favicon and, once approved, in the logo"
      - "the brand tag variant and info status"
      - "first series in a chart, progress bars up to 4px high"
      - "a single highlighted word in a headline (optional, at most one per page)"
      - "the stepped blue motif (motifs.blue-steps)"
    forbidden:
      - "section or card backgrounds"
      - "headlines or paragraphs as a whole"
      - "any single element larger than ~120px x 120px, except buttons, the symbol and the blue-steps motif"
    budget: "Elevate Blue should cover well under 5% of the visible area at any scroll position"

  status:                         # status only, never decoration
    success: { text: "#136C42", bg: "#E3F4EA", border: "#B6E0C8", dot: "#1F9D61" }
    warning: { text: "#8A5300", bg: "#FFF3D9", border: "#F2D58F", dot: "#B87700" }
    error:   { text: "#A3201F", bg: "#FDE7E7", border: "#F1B5B5", dot: "#D6322F" }
    info:    { text: "#0848CC", bg: "#E7EEFF", border: "#B9CEFB", dot: "#1054FF" }
    neutral: { text: "#4A4D57", bg: "#F0F0F3", border: "#E4E4EA", dot: "#8C8F9B" }

# ─────────────────────────────────────────────────────────────
# TYPOGRAPHY
# ─────────────────────────────────────────────────────────────
typography:
  families:
    display: "'Instrument Sans', 'Helvetica Neue', Arial, sans-serif"   # headings, display, buttons
    text: "'DM Sans', 'Helvetica Neue', Arial, sans-serif"              # paragraphs, UI text, forms
    mono: "'Geist Mono', ui-monospace, 'SF Mono', Menlo, monospace"     # tags, eyebrows and code; small descriptive details only on request (see typography rules, v1.30.0)
  weights: { regular: 400, medium: 500, semibold: 600 }
  features:
    display: "normal"
    mono: "'zero' 1"
  scale:                          # desktop >=1024 / mobile <768. size/line-height/letter-spacing
    display-xl: { family: display, weight: 500, size: 72px, mobile: 40px, line-height: 1.00, tracking: -0.035em }
    display-lg: { family: display, weight: 500, size: 56px, mobile: 36px, line-height: 1.04, tracking: -0.03em }
    h1:         { family: display, weight: 500, size: 48px, mobile: 32px, line-height: 1.08, tracking: -0.03em }
    h2:         { family: display, weight: 500, size: 36px, mobile: 28px, line-height: 1.12, tracking: -0.025em }
    h3:         { family: display, weight: 500, size: 28px, mobile: 22px, line-height: 1.20, tracking: -0.02em }
    h4:         { family: display, weight: 500, size: 22px, mobile: 20px, line-height: 1.25, tracking: -0.015em }
    lead:       { family: text, weight: 400, size: 20px, mobile: 18px, line-height: 1.50, tracking: -0.005em }
    body-lg:    { family: text, weight: 400, size: 18px, mobile: 17px, line-height: 1.55, tracking: 0 }
    body:       { family: text, weight: 400, size: 16px, mobile: 16px, line-height: 1.50, tracking: 0 }
    body-sm:    { family: text, weight: 400, size: 14px, mobile: 14px, line-height: 1.50, tracking: 0 }
    caption:    { family: text, weight: 400, size: 13px, mobile: 13px, line-height: 1.40, tracking: 0 }
    button:     { family: display, weight: 500, size: 14px, mobile: 14px, line-height: 1.00, tracking: 0 }
    button-lg:  { family: display, weight: 500, size: 16px, mobile: 16px, line-height: 1.00, tracking: 0 }
    label:      { family: mono, weight: 400, size: 13px, mobile: 13px, line-height: 1.00, tracking: 0.05em, case: upper }   # tags, badges, eyebrows; also the short labels of an approved opt-in. 14px for the filter tabs
    detail:     { family: mono, weight: 400, size: 13px, mobile: 13px, line-height: 1.40, tracking: 0, case: normal }     # OPT-IN ONLY: small descriptive lines when the team asks for them. Not used anywhere today
    code:       { family: mono, weight: 400, size: 13px, mobile: 13px, line-height: 1.63, tracking: 0 }
  measure: { body: 68ch, lead: 56ch, heading: 20ch }
  files:                          # all three families are open (SIL OFL); self-host as woff2, font-display: swap
    instrument-sans: [400, 500, 600]
    dm-sans: [400, 500, 600]

# ─────────────────────────────────────────────────────────────
# SPACING & LAYOUT
# ─────────────────────────────────────────────────────────────
spacing:
  unit: 4px
  scale: { 1: 4px, 2: 8px, 3: 12px, 4: 16px, 5: 20px, 6: 24px, 8: 32px, 10: 40px, 12: 48px, 16: 64px, 20: 80px, 24: 96px, 32: 128px, 40: 160px }
  section-y:                      # vertical padding of a page section
    default: { desktop: 96px, tablet: 72px, mobile: 56px }
    statement: { desktop: 128px, tablet: 96px, mobile: 72px }
    compact: { desktop: 64px, tablet: 48px, mobile: 40px }
  stack:                          # gaps inside a block (compressed on purpose)
    heading-to-body: 16px
    body-to-actions: 32px
    card-padding: { desktop: 32px, mobile: 24px }
    card-padding-compact: 20px
layout:
  breakpoints: { mobile: 0, tablet: 768px, desktop: 1024px, wide: 1280px }
  container-max: 1280px
  gutter: { desktop: 48px, tablet: 32px, mobile: 20px }
  grid: { columns: 12, gap: 24px, columns-mobile: 4, gap-mobile: 16px }
  nav-height: 64px
  hairline-grid:                  # bento layouts: cells separated by 1px lines, not gaps
    line: "1px solid {colors.border.default}"
    outer-radius: 12px

# ─────────────────────────────────────────────────────────────
# SHAPE: radius, border, shadow
# ─────────────────────────────────────────────────────────────
radius:
  button: 6px
  input: 6px
  tag: 6px
  card: 12px
  media: 12px
  bento-outer: 12px
  code-block: 12px
  menu: 8px
  modal: 16px
  tooltip: 6px
  device: 32px                    # phone frames inside the case scenes ONLY
  app-icon: 18.5%                 # favicon (PROVISIONAL, the isotipo is not approved): 20.62 / 111.18 of the logo file
  module: 2px                     # decorative square modules (isotipo-derived). Never larger
  full: 9999px                    # ONLY: status dots, avatars, toggle switches
border:
  width: { hairline: 1px, input: 1px, focus: 2px, emphasis: 2px }
shadow:
  none: "none"
  card-rest: "0 0 1px rgba(1,30,61,0.03), 0 1px 2px rgba(1,30,61,0.06)"
  menu: "0 8px 24px -8px rgba(1,30,61,0.18), 0 0 0 1px rgba(1,30,61,0.06)"
  product: "0 30px 45px -30px rgba(1,30,61,0.25), 0 18px 36px -18px rgba(0,0,0,0.10)"   # product mockups ONLY
  focus: "0 0 0 2px #FFFFFF, 0 0 0 4px #1054FF"
  focus-on-dark: "0 0 0 2px #01172E, 0 0 0 4px #7B9BFF"

# ─────────────────────────────────────────────────────────────
# COMPONENTS  (each references tokens above; exceptions are named)
# ─────────────────────────────────────────────────────────────
components:
  button:
    height: { sm: 32px, md: 40px, lg: 48px }
    padding-x: { sm: 14px, md: 20px, lg: 24px }
    radius: "{radius.button}"
    border-width: 1px
    type: { sm: button, md: button, lg: button-lg }
    gap-icon: 8px
    width: fit-content            # never stretches, except full-width on mobile hero/CTA stacks (<768px)
    primary:   { bg: "{colors.brand.elevate-blue}", text: "#FFFFFF", border: "transparent", hover-bg: "{colors.blue-ramp.600}", active-bg: "{colors.blue-ramp.700}" }
    dark:      { bg: "{colors.brand.excellence-blue}", text: "#FFFFFF", border: "transparent", hover-bg: "{colors.blue-ramp.800}", active-bg: "#010F20" }   # equal-weight alternative to primary, same shape; never both in the same action group
    secondary: { bg: "#FFFFFF", text: "{colors.brand.excellence-blue}", border: "{colors.border.strong}", hover-bg: "{colors.surface.subtle}", active-bg: "{colors.border.default}" }   # white button with hairline border, as the soft counterpart of primary
    tertiary:  { bg: "transparent", text: "{colors.text.link}", border: "transparent", hover-text: "{colors.text.link-hover}", underline-on-hover: true }
    on-dark:
      primary:   { bg: "#FFFFFF", text: "{colors.brand.excellence-blue}", hover-bg: "{colors.brand.inspire-grey}" }
      secondary: { bg: "transparent", text: "#FFFFFF", border: "{colors.border.on-dark-strong}", hover-bg: "rgba(255,255,255,0.08)" }
    disabled:  { bg: "{colors.border.default}", text: "{colors.text.disabled}", border: "transparent", cursor: not-allowed }
    focus: "{shadow.focus}"       # focus-on-dark on dark bands
    exceptions: "none. Hero CTAs use the same radius and sizes; use size lg."
  link:
    color: "{colors.text.link}"
    hover: "{colors.text.link-hover}"
    decoration: { default: underline, thickness: 1px, offset: 3px }   # body links underlined; nav and footer links are not
    transition: "color {motion.duration.fast} {motion.easing.standard}"
  input:
    height: 44px
    padding-x: 12px
    radius: "{radius.input}"
    border: "1px solid {colors.border.input}"
    bg: "#FFFFFF"
    text: "{colors.text.primary}"
    placeholder: "{colors.text.muted}"
    hover-border: "{colors.brand.elaniin-black}"
    focus: { border: "{colors.brand.elevate-blue}", ring: "{shadow.focus}" }
    error: { border: "{colors.status.error.dot}", message-text: "{colors.status.error.text}" }
    label: { type: body-sm, weight: 500, gap-to-field: 8px }
    on-dark: { bg: "rgba(255,255,255,0.04)", border: "{colors.border.on-dark-strong}", text: "#FFFFFF", focus-ring: "{shadow.focus-on-dark}" }
  tag:                            # Geist Mono, UPPERCASE (label token), fit-content
    height: 24px
    padding-x: 8px
    radius: "{radius.tag}"
    type: label                   # mono, uppercase
    default: { bg: "{colors.surface.subtle}", text: "{colors.text.secondary}", border: "{colors.border.default}" }
    brand:   { bg: "{colors.blue-ramp.tint-50}", text: "{colors.blue-ramp.600}", border: "{colors.blue-ramp.200}" }
    on-dark: { bg: "rgba(255,255,255,0.06)", text: "{colors.text.on-dark-secondary}", border: "{colors.border.on-dark}" }
  status-badge:
    height: 24px
    padding-x: 8px
    radius: "{radius.tag}"
    type: label                   # mono, uppercase (v1.29.0)
    dot: { size: 6px, radius: "{radius.full}" }
    variants: "{colors.status.*}"
  card:
    bg: "{colors.surface.card}"
    border: "1px solid {colors.border.default}"
    radius: "{radius.card}"
    padding: "{spacing.stack.card-padding}"
    shadow: "{shadow.none}"       # flat. Hover: border-color -> {colors.border.strong}, no lift
    on-grey: { bg: "#FFFFFF" }
    on-dark: { bg: "{colors.surface.dark-card}", border: "1px solid {colors.border.on-dark}" }
    featured: { border: "2px solid {colors.brand.excellence-blue}" }   # one featured card per group at most
  bento:
    structure: "grid whose cells are separated by 1px {colors.border.default} lines; outer corners {radius.bento-outer}; overflow hidden"
    cell-padding: "{spacing.stack.card-padding}"
    rule: "cells differ in span and content; never three identical cells in a row"
  product-frame:                  # screenshots / UI mockups
    radius: "{radius.media}"
    border: "1px solid {colors.border.default}"
    shadow: "{shadow.product}"    # the only place a large soft shadow is allowed
  code-block:
    bg: "{colors.brand.excellence-blue}"
    text: "{colors.text.on-dark-primary}"
    radius: "{radius.code-block}"
    padding: 20px
    type: code
    comment-color: "{colors.text.on-dark-muted}"
    accent-color: "{colors.text.on-dark-accent}"
  nav:
    height: "{layout.nav-height}"
    bg: "GLASS (v1.31.0, after the Laravel Cloud nav): the surface color at 80% opacity under a backdrop blur of 8px, so the page shows through softly. The bar ADOPTS THE COLOR of the section under it (three themes, v1.32.0): LIGHT = white at 80% with {colors.border.default}; BLUE = {colors.surface.dark} (Excellence Blue) at 80% with {colors.border.on-dark}; BLACK = {colors.surface.dark-alt} (Elaniin Black) at 80% with {colors.border.on-dark}. The bar changes color in 150ms (colors only)"
    adaptive-theme: "the bar takes the theme of the section that sits under it. Only whole SECTIONS declare data-nav-theme='blue' or 'black', when their own background is dark: the research band is black; the closing CTA and the footer are blue; every other section is light. The color of the SECTION predominates, never the color of the resources inside it: the Cases section is white, so the bar stays in its normal state while it crosses the dark case stages (rule confirmed by the team in v1.35.0; the stages must not declare a theme). A small scroll listener (rAF-throttled, also on resize) looks for the section crossing the middle of the bar and sets data-theme (light or dark) and data-tone (blue or black) on the header. Both dark themes turn the logo into the white lockup, the links and chevrons into {colors.text.on-dark} and {colors.text.on-dark-secondary}, the hover tint into white at 10%, and the mobile toggle into a dark outline; only the bar color differs. While a menu panel or the mobile sheet is open the bar stays light, because the panels are white and attach flush under it"
    logo: "the logotipo (never the symbol, see Logo and symbol) is a link to the hero of the current language (/#home in English, /es#home in Spanish); the hero section has id home and a scroll margin equal to the nav height, so the page lands exactly at the top"
    language-switch: "two text links EN | ES (components section 13.2), right of the links and before the primary button, visible from 1024px; on mobile it sits at the bottom of the sheet. DM Sans body-sm weight 500, 32px tall, 8px side padding, a 1px | separator; the current language in {colors.text.primary}, the other in {colors.text.secondary} (hover to primary); over the dark themes the on-dark text tokens. Each link goes to the SAME page in the other language, has hreflang, lang and the language name as accessible name; the current one carries aria-current. No flags, no blue"
    sticky: true
    link: { type: body-sm, weight: 500, color: "{colors.text.primary}", hover-color: "{colors.text.link}" }
    cta: "a single button.primary md or button.dark md, right-aligned (pick one for the whole site). No search field, no sign-in link"
    mobile: "hamburger at <1024px; menu panel radius {radius.menu}; the language switch sits above the primary button at the bottom of the sheet"
  mega-menu:                      # desktop dropdown panels under the nav (>= 1024px)
    panel: { bg: "#FFFFFF", border: "1px solid {colors.border.default}", radius: "{radius.menu}", shadow: "{shadow.menu}", width: "container (aligned to nav gutters)", attaches: "flush under the nav bar, no gap" }
    columns: "separated by 1px {colors.border.default} lines; column padding 32px"
    heading: "type body-sm, weight 500, color {colors.text.muted}, normal case (a plain group label, not an eyebrow)"
    types:
      standard: "4 columns: icon + title + description rows, a second rows column, an icon link list with 'Ver todo', and a visual column (>= 1280px only)"
      solutions: "3 CARDS inset 8px in the panel (gap 8px, radius {radius.card}), one per solution line, each with its own surface, pattern and accent (see mega-menu.solution-cards); icon box, title (h3 size), description, 4 sublinks on a hairline; footer strip on {colors.surface.subtle}"
    solution-cards: "each solution has CHARACTER through one surface, one pattern and one accent, all from our blue ramp and our own motifs (after the way Laravel gives each product a color and a pattern, without borrowing its colors). SOFTWARE: surface {colors.blue-ramp.tint-50} (light blue), the module grid (3px squares on a 16px pitch in blue-300 at 55%, strongest at the top right, fading out), a soft blue-200 glow at the bottom left, accent Elevate Blue. AI: surface {colors.surface.dark} (Excellence Blue), A SQUARE GRID (v1.37.0): horizontal AND vertical hairlines in white at 9% on a 20px pitch, anchored to the top right so the cells at the right edge are whole, masked by a radial gradient from the top right (gone at 85%). No filled cells and no color accents in the pattern: the five lit cells of v1.36.0 were removed, and so were the text lines of v1.33.0 and the diagonal hairlines of v1.31.0 (all rejected). A blue-700 glow at the top right and a blue-800 one at the bottom left give the card its blue; white text, accent {colors.text.on-dark-accent}. It differs from the cloud card (horizontal layer lines only) by having the vertical lines, and from the software card (a field of dots) by being a line grid. CLOUD: surface {colors.surface.subtle} (Inspire Grey), horizontal layer lines in {colors.border.strong} on a 12px pitch (stacked layers), strongest at the top, a white glow at the top right, accent Dynamic Blue for the icon. Text colors follow the surface (dark text on the two light cards, on-dark tokens on the dark one). Patterns are CSS only (gradients and masks), decorative, aria-hidden, no motion. Contrast of text on each surface is the same as on its base color"
    row: { icon: "icon-box 40px", title: "body-lg, weight 500", description: "body-sm, {colors.text.secondary}", hover-bg: "{colors.surface.subtle}", radius: "{radius.menu}" }
    sublink: { type: body-sm, hover: "bg subtle + arrow in {colors.text.link} slides in", radius: "{radius.tag}" }
    visual-column: "the 'Casos destacados' column of the Resources menu (>= 1280px only), restyled in v1.38.0 in the language of the solution cards: an INSET CARD (8px inside the column, radius {radius.card}) on {colors.blue-ramp.tint-50} with the module grid (3px squares on a 16px pitch in blue-300 at 55%, strongest at the top right) and a blue-200 glow at the bottom left. Hierarchy: a heading link in h4 size (display, weight 500, {colors.text.primary}) with an arrow on its right that slides 4px on hover, and a body-sm line under it ('Resultados que se miden', {colors.text.secondary}); then three stacked white cards (hairline {colors.blue-ramp.200}, shadow card-rest) offset 16px to the right and 80px down so every title can be read (the first card starts 112px from the top of the inset card), clipped on the right edge, each with its kind tag and title, and the top card also shows its metric. Replaces the grey column with a 16px dot grid and a small muted link"
    trigger: { height: 40px, padding-x: 12px, type: body-sm, weight: 500, radius: "{radius.button}", open-or-hover-bg: "{colors.surface.subtle}", chevron: "16px, rotates 180deg when open" }
    behavior:
      open: "hover with 80ms intent delay, or click/tap, or ArrowDown (moves focus into the panel)"
      switch: "instant between triggers; panel height animates to content ({motion.duration.slow}, emphasized); content cross-slides 24px in the direction of travel"
      close: "140ms grace after the pointer leaves the nav and panel; Escape (returns focus to the trigger); click or tap outside; focus leaving the header"
      keyboard: "Tab from an open trigger enters the panel"
    mobile: "below 1024px a full-height sheet under the bar with accordions; scroll locked; closes on Escape, link click or growing to desktop"
  hero:                           # centered; the only centered section besides the closing CTA
    padding-y: "{spacing.section-y.statement}"
    heading: { type: display-xl, weight: 500, max-width: 18ch, wrap: balance, entrance: "word by word, rise 16px + fade, 60ms stagger, CSS only" }
    subhead: { type: lead, color: "{colors.text.secondary}", max-width: 56ch }
    actions: "a single button.primary lg (full width below 768px). The cases are one scroll away and live in the nav, so the hero carries no secondary button"
    background: { field: "module field (motifs.module-field): 2px squares on a 16px pitch in {colors.border.strong} at 45%, fading to transparent toward the bottom (pure CSS, radius 0)", pointer-highlight: "squares within 6 cells of the pointer light up cell by cell, stepping up the ramp blue-300 (2px) -> blue-400 (3px) -> blue-500 (3px), then fade out (about 260ms) once the pointer leaves; canvas layer, off for touch and prefers-reduced-motion", forbidden: "glows, washes and smooth gradients (the hero stays square-based; a drifting blue wash was tried in v1.16-1.17 and rejected: it did not fit the hero)" }
  logo-strip:                     # client logos as a hairline grid
    structure: "1 label cell + 4 logo cells on desktop (5 columns); label full width + 2x2 logos below 768px"
    lines: "1px {colors.border.default}: full-bleed top/bottom, cell dividers via gap-px, container-edge verticals"
    cell: { height: 112px, bg: "#FFFFFF", logo-color: "{colors.text.secondary}", hover: "bg {colors.surface.subtle} + logo {colors.text.primary}, 150ms" }
    label: { type: body-sm, weight: 500, color: "{colors.text.primary}" }
    logos: "single-color SVG using currentColor; placeholders (invented brands) until real client logos are approved"
  solutions-grid:                 # section 04: header + three solution cards (TEST v1.40.0, local; revert = git checkout)
    header: { title: "type h1, max-width 20ch, balance", intro: "type lead; first sentence weight 500 in {colors.text.primary}, continuation in {colors.text.secondary}", padding: "section-y top, 48px bottom" }
    grid: { columns: "3 from 1024px, 1 below", gap: "16px", frame: "none: no hairlines, the cards stand on the white section; section-y at the bottom", card-style: "the SAME looks as the nav solution cards (mega-menu.solution-cards): light blue + module grid for software, Excellence Blue + square grid for AI, Inspire Grey + layer lines for cloud. One shared module (ui/solution-surface) feeds both, so they cannot drift apart" }
    reveal: "content fades and rises 16px once when it enters the viewport, 80ms stagger between cards"
    note: "the AI card is the same Excellence Blue as the closing CTA that follows the section; seen in the test, to be judged"
  solution-card:                  # one card of the grid
    surface: "radius {radius.card}, the look of its solution (surface color, pattern and glow, masked toward the top right so the text keeps its contrast), overflow hidden"
    layout: "icon-box (the same icon the nav uses; dark tone on the AI card) + solution name, and the open button, on top; bold-lead paragraph; the mock sits directly on the surface (no grey panel), pushed to the bottom (mt-auto) so the mocks align across cards"
    text: "name and bold lead in {colors.text.primary} on the light cards and {colors.text.on-dark} on the AI card; the continuation in {colors.text.secondary} or {colors.text.on-dark-secondary}"
    open-button: { size: 40px, radius: "{radius.button}", light-cards: "1px {colors.border.default}, white", ai-card: "1px {colors.border.on-dark}, white at 10%, white icon", icon: "maximize 16px" }
    paragraph: { type: lead, family: display, lead-weight: 500 }
    padding: "{spacing.stack.card-padding}"
  visual-panel:                   # stage for animated mocks. variant "panel" (default): the grey stage of the expanded detail; variant "bare" (v1.40.0): no background, border or radius, used by the cards of the grid, so the mock rests on the card surface
    height: 320px
    bg: "{colors.surface.subtle}"
    border: "1px {colors.border.default}"
    radius: "{radius.media}"
    padding: { desktop: 24px, mobile: 16px }
    a11y: "decorative: aria-hidden, no focusable content; the card paragraph carries the meaning"
    mocks: "white cards, 1px hairline, {radius.menu}, shadow card-rest, text body-sm, figures in the text family with tabular numbers. Status uses status-badge; check marks use {colors.status.success.dot}; progress and spinners may use {colors.brand.elevate-blue}"
  solution-dialog:                # expanded detail opened from the solution card's expand button
    surface: { bg: "#FFFFFF", border: "1px solid {colors.border.default}", radius: "{radius.modal}", shadow: "{shadow.menu}", max-width: 1080px, max-height: "min(92dvh, 780px), scrolls inside" }
    backdrop: "{colors.brand.excellence-blue} at 55% opacity, click closes"
    layout: "2 columns from 1024px (details | visual column), stacked below; details on white: icon-box and name, h2, body-lg intro, check list, 2 metrics in a hairline grid, primary + secondary button. The IDENTITY of the solution lives in the visual column (v1.41.0, local test): that whole column takes the look of its solution (the surface, pattern and glow of mega-menu.solution-cards, from the shared ui/solution-surface module) and the mock rests directly on it (visual-panel variant bare); the light looks keep a hairline between the columns, the dark AI look does not need one. The close button stays white and legible on every look"
    entrance: "zoom from the clicked button (transform-origin at the trigger), scale 0.9 to 1 with fade, 300ms emphasized; list items rise 8px with 60ms stagger"
    a11y: "role dialog, aria-modal, labelled by its title; focus moves to the close button; Tab is trapped; Escape and backdrop close; focus returns to the trigger; page scroll locked (scrollbar-gutter stable); rendered in a portal"
  cases-grid:                     # section 04 of the page: proof first. Header + hairline grid of case-study cards
    position: "right after the client strip and BEFORE the solutions"
    header: { title: "type display-lg (56px desktop), max-width 16ch, balance", intro: "lead; first sentence weight 500 in {colors.text.primary}", action: "tertiary button (text link with arrow) 'Ver todos los casos', aligned to the end, same as the research header", padding: "section-y statement top, 64px bottom", eyebrow: "none" }
    grid: { columns: "12 from 1024px, 1 below", lines: "1px {colors.border.default} via gap-px, same as solutions-grid", rows: "FOUR cases in two rows that mirror each other: case 1 wide (7 cols) + case 2 narrow (5 cols); case 3 narrow (5 cols) + case 4 wide (7 cols)" }
    data: "content lives in cases-data.ts; each entry sets layout (wide, narrow), client logo, sector, title, excerpt, href and its animated visual. Adding a case is adding an entry"
  case-card:
    layout: "media stage on top, then body with the client logo chip + sector tag (text family, normal case), title, result sentence and 'Leer el caso' link"
    sizes: "every card is the same size class: stage 384px, title h3, result body-lg (the smaller third-width cards no longer exist)"
    logo-chip: { height: 40px, padding-x: 12px, bg: "{colors.surface.subtle}", border: "1px {colors.border.default}", radius: "{radius.tag}", logo: "about 18px; in the client accent on product-scene cards, {colors.text.primary} otherwise" }
    link: "{colors.text.link} with a 16px arrow that moves 4px on hover; stretches over the whole card (after:absolute) so the card is one click target"
    hover: "link color to link-hover; no lift"
  case-media:                     # dark stage for the animated resource of a case
    bg: "{colors.surface.dark}"
    height: 384px
    layers: "animated blue gradient (motifs.glow, variant media), then the scene (bleed: fills the stage) or the mock card (centered). No texture"
    mock: "white card, 1px hairline, {radius.menu}, shadow card-rest. Standard size 320x240 FIXED for every case (chart area flexible); compact companion card 272px wide. Label row 16px high; headline number in h2 size, counted up; charts use the blue ramp, neutral for the baseline. Typography is the text family, no Geist Mono: labels and figures in DM Sans, the headline number in Instrument Sans, both with tabular figures so counting does not jitter"
    scenes: "all four cases are PRODUCT SCENES, not dashboards: a believable app interface (app bar, list, detail, stepper, form, conversation, console) that changes like someone using it. The scene fills the whole stage (absolute) and is cropped on purpose by the stage edges, as a bigger app would be; the key action of each scene stays inside the visible area. Results are small floating chips or a small delta pill, never hero numbers. Pieces live in scene-kit.tsx (PhoneFrame radius.device, Avatar, IconTile, AccentPill, SuccessPill); figures that change use NumberFlow"
    client-accent: "each placeholder client has an accent taken from its logo (altamar #0B7A75, kintsu #7C3AED, nodo #BE185D, vertice #C2410C, orbita #15803D). The accent colors ONLY the interface inside the scene and the logo in the card chip; the frame (Excellence Blue stage, blue glow) stays Elaniin. Derived tokens set per scene by accentStyle(): --accent, --accent-ink (accent mixed 78% with black, for text on the soft tint, AA), --accent-soft (12% on white), --accent-line (30% on white). Accent is a detail color: icons, selected rows, progress, primary scene button; never body text and never outside case scenes"
    scene-timelines: "state is derived from one clock (useClock, loop length per scene, 50ms tick, runs only while in view). Logistics 10s: list slides in, shipment selected, stepper fills, vehicle travels the route while the ETA counts down, delivered, toast. Fintech 11s: business name and registration typed, button pressed, account chosen, account ready, balance counts to 128.50, payment notification. AI support 11s: customer message, assistant drafts a reply (typed), marked reviewed, agent presses Send, reply sent, ticket resolved. Cloud 10s: spend 12,400 with meter full, button pressed, spend drops to 8,556 (-31%), servers go from 8 to 5 instances, availability stays green. Mobile 10s: rating sheet slides up, five stars fill, two tags picked, Send, thanks screen, store rating goes from 3.9 to 4.8. Under prefers-reduced-motion the clock rests on the final state"
    compositions: "case 1 (wide): a dispatch app window wider than the stage (bleeds right and bottom). Case 2 (narrow): a phone cropped by the bottom edge. Case 3 (narrow): a support conversation window, centered, with a result chip over its top-right corner. Case 4 (wide): the cost console in a 600px window that switches to TWO columns (spend card and button on the left, three resource rows on the right: servers, database, disks) through a container query at 480px of window width, and stays one column on a phone. A chip never covers interface text. The app-rating case (phone plus store card) was removed in v1.25.0: it repeated the phone of case 2"
    a11y: "decorative (aria-hidden); the result is also written in the card's sentence"
    motion: "each mock replays every 7s while on screen (useCycle); lines draw (pathLength), bars grow from the baseline in sequence, the number counts up, rows slide in; static final state under prefers-reduced-motion"
  research-grid:                  # own research, after the cases and before the solutions: a clean list on a black band
    position: "after cases-grid, before solutions-grid"
    bg: "{colors.surface.dark-alt} (Elaniin Black) band; hairlines in {colors.border.on-dark}. Text uses the on-dark tokens. Links use {colors.text.on-dark-accent} (Elevate Blue is only 3.1:1 on black). No gradients, no art: the section stays quiet next to the cases and the CTA, which carry the color and the motion"
    header: { title: "type h1 (48px desktop), white, max-width 20ch, balance, no eyebrow", intro: "lead; first sentence weight 500 in {colors.text.on-dark}, the rest {colors.text.on-dark-secondary}", action: "text link with arrow 'Ver todas las investigaciones' in {colors.text.on-dark-accent}, aligned to the end", padding: "section-y top and bottom" }
    toolbar: "filter tabs (Todo, Informe, Estudio) in Geist Mono, UPPERCASE (label), 14px, tracking-wider; active white with a 1px underline (offset 6px), inactive {colors.text.on-dark-muted}; aria-pressed. Filtering is client state, no navigation. There is no cover view and no view switch"
    data: "content lives in research-data.ts; each entry sets kind, date (month and year), value, unit, the finding sentence (the name of the study as it is read), the source line and the href. Dummy: every figure and study is invented"
  research-row:                   # one finding in the list
    reading-order: "figure, then name, then kind and date: 62% / de los pilotos de IA no llega a producción / Informe sept 2026"
    layout: "desktop: four columns (11rem | 1fr | 12rem | 20px; the kind and date column is fixed so the tags align from row to row): the figure, the name with the source under it, the kind and date, an arrow. Below 768px everything stacks in the same order and the arrow is hidden. Hairline under every row; the whole row is one link; hover tints it white at 4%"
    figure: { type: h1, family: display, weight: 500, color: "{colors.text.on-dark}", unit: "'%' in {colors.text.on-dark-secondary}; 'de 10' smaller (h3) with 8px before it", figures: tabular, motion: "counts up once when it enters the screen (CountUp)" }
    name: "lead, {colors.text.on-dark}; it is the h3 of the row and carries the link (after:absolute), with a visually hidden spoken form of the figure before it"
    source: "body-sm, {colors.text.on-dark-muted}, under the name: study type and sample (DM Sans)"
    meta: "the kind as a small outlined tag in Geist Mono UPPERCASE (24px high, 1px {colors.border.on-dark-strong}, {radius.tag}, caption, tracking-wider, {colors.text.on-dark-secondary}) followed by the date in Geist Mono UPPERCASE (label) {colors.text.on-dark-muted}, 12px apart. The tag replaces the middle dot used before as a separator"
    a11y: "the figure is aria-hidden and a visually hidden sentence gives the full figure"
  cta:                            # closing call to action, left aligned, on the darker blue
    bg: "{colors.surface.dark}"     # Excellence Blue (#01172E): the same blue as the footer, separated from it by a hairline
    background: "blue glow (motifs.glow, variant 'cta', adapted to the dark surface) on the right, under the hero module grid (2px squares, 45% opacity, drawn in {colors.border.on-dark-strong}), which keeps reacting to the pointer; the glow is masked away from the text (bottom right strongest) so text contrast is never affected"
    content: "REDUCED COPY (v1.24.0): h2 title (36px desktop, white, max 22ch, balance), ONE line below it (body-lg, {colors.text.on-dark-secondary}), then button.primary lg + button.on-dark-secondary lg; stacked and full width below 768px. No second sentence, no caption"
    border-top: "1px solid {colors.border.on-dark}"
    padding-y: "{spacing.section-y.statement}"
  not-found:                      # 404 page (v1.45.0): localized, inside the site shell
    layout: "nav, then a white section with a hairline bottom border and the hero's module field behind it, then a hairline grid of three useful links, then the footer. Left aligned (not centered)"
    content: "a tag (variant default, text 404), the title (h1, display-lg, balanced, max 16ch), one lead sentence in {colors.text.secondary}, and two buttons: primary lg to the home and tertiary to the contact section of the home"
    links: "a 3-cell hairline grid (solutions, cases, research) under the content, with border-x on its container like the logo strip; each cell is one link: name in display h4, one line in body-sm text.secondary, an arrow that slides 4px on hover; cells are white and take {colors.surface.subtle} on hover; stacked below 768px"
    copy: "src/content/{en,es}/not-found.ts (title, lead, buttons, link names and descriptions, the tag text, the document title)"
    http: "status 404 and noindex (Next adds it). The route table (src/lib/routes.ts) is the list of every page: the proxy rewrites any URL that is not in it, a slug of the other language, or an unknown path to /<lang>/404. That URL belongs to the catch-all app/[lang]/[...slug]/page.tsx, which calls notFound(); app/[lang]/[...slug]/not-found.tsx draws this page, in the language of the URL (English for unprefixed URLs, Spanish under /es). KNOWN LIMIT: with a root layout under a dynamic segment ([lang]) Next 16 sends the 404 document without a body and the browser draws the page when the JavaScript loads (status, title and language are right in the HTML; without JavaScript the body is empty). The experimental global-not-found would fix it but has no language and was not adopted. A proxy rewrite that sets status 404 was tried and rejected: Vercel answers it with its own generic 404"
    nav-and-footer: "the same Nav and Footer as the home; their language switch points to the home in the other language"

  footer:
    bg: "{colors.surface.dark}"       # Excellence Blue, same as the case stages. Elaniin Black was tried and rejected (v1.15.0)
    text: "{colors.text.on-dark-secondary}"
    heading: "{colors.text.on-dark-primary}"
    border-top: "1px solid {colors.border.on-dark}"
    layout: "left: tagline (lead, white + secondary), newsletter form, social icons; right: four link columns from docs/sitemap-elaniin.md (Soluciones, Modelos de contratación, Industrias, Recursos; 2 columns below 768px and at 1024px, 4 from 768px and from 1280px, sized to their content from 1280px so every heading stays on one line); below: legal row on a hairline in DM Sans body-sm (copyright in lowercase: (c) 2027 elaniin) followed by the legal links, the language switch (variant dark) and the sample-content note; above the tagline sits the small WHITE logotipo (white-logotipo-elaniin.svg, 28px tall), the only logo in the footer. The giant faint wordmark was removed (CEO feedback, v1.43.0)"
    logo: "white-logotipo-elaniin.svg, height 28px (about 104px wide), alt text Elaniin, not a link in the footer"
    link: { type: body-sm, color: "{colors.text.on-dark-secondary}", hover: "{colors.text.on-dark-primary}" }
    social: { size: 40px, radius: "{radius.button}", border: "1px {colors.border.on-dark}", icon: "18px single-color brand glyph", hover-bg: "white at 8%" }
  newsletter-form:                # on dark surfaces
    fields: "first name, last name, email: 44px high, bg {colors.surface.dark-card}, border {colors.border.on-dark-strong}, text white, placeholder {colors.text.on-dark-muted}, radius {radius.input}"
    focus: "ring {shadow.focus-on-dark} and border {colors.text.on-dark-accent}"
    submit: "button.on-dark-primary lg, full width; disabled while sending"
    states: "inline error under the email field (role alert), success replaces the form (role status)"
    legal: "caption, {colors.text.on-dark-muted}, terms link underlined"
  dark-band:                      # full-bleed Excellence Blue section: the strongest surface in the system
    bg: "{colors.surface.dark}"
    text: "{colors.text.on-dark-primary}"
    secondary-text: "{colors.text.on-dark-secondary}"
    buttons: "button.on-dark"
    max-per-page: 2               # plus the footer
  tab:
    indicator: { height: 2px, color: "{colors.brand.elevate-blue}" }   # a typical Elevate detail
    text: { default: "{colors.text.secondary}", active: "{colors.text.primary}" }
  control-on-state: "{colors.brand.elevate-blue}"   # checkbox, radio, switch, slider fill
  metric:
    value: { family: display, weight: 500, size: "36px", numbers: tabular, color: "{colors.text.primary}" }
    label: { type: body-sm, color: "{colors.text.secondary}" }
  menu:
    bg: "#FFFFFF"
    radius: "{radius.menu}"
    shadow: "{shadow.menu}"
    item: { height: 36px, padding-x: 12px, hover-bg: "{colors.surface.subtle}" }
  tooltip:
    bg: "{colors.brand.elaniin-black}"
    text: "#FFFFFF"
    radius: "{radius.tooltip}"
    padding: "6px 10px"
    type: caption

# ─────────────────────────────────────────────────────────────
# MOTION
# ─────────────────────────────────────────────────────────────
motion:
  duration: { instant: 100ms, fast: 150ms, base: 200ms, slow: 300ms, reveal: 500ms }
  easing:
    standard: "cubic-bezier(0.4, 0, 0.2, 1)"      # color, border, background, opacity, small transforms
    emphasized: "cubic-bezier(0.25, 1, 0.5, 1)"   # reveal-on-scroll, panels, menus
  reveal: { distance: 16px, duration: 500ms, stagger: 60ms, trigger: "once, 15% in viewport" }
  hover: "color/background/border only, 150ms. No lift, no scale, no glow."
  reduced-motion: "under prefers-reduced-motion: reduce, disable transforms and parallax; keep opacity fades <=150ms"

# ─────────────────────────────────────────────────────────────
# GRAPHIC MOTIFS
# ─────────────────────────────────────────────────────────────
motifs:
  blue-steps:                     # the only gradient. Hard-stop, stepped, never smooth
    stops: ["#D7E2F8", "#B9CEFB", "#6A9AFF", "#1054FF", "#0848CC", "#023CA0", "#022B63", "#01172E"]
    css: "linear-gradient(90deg, #D7E2F8 0 12.5%, #B9CEFB 12.5% 25%, #6A9AFF 25% 37.5%, #1054FF 37.5% 50%, #0848CC 50% 62.5%, #023CA0 62.5% 75%, #022B63 75% 87.5%, #01172E 87.5% 100%)"
    rules: "decorative only, aligned to the module grid, max 240px tall, one per page, never behind text"
  module: "decorative squares use {radius.module} and sit on the 8px grid (the hero module field uses a 16px pitch). The square-module language belongs to the system; it does NOT depend on the isotipo, which is still pending approval"
  module-field: "grid of small squares used as decorative background; lights up by discrete cells, never by smooth gradients. One configuration for the hero and the closing CTA: 2px squares on a 16px pitch in {colors.border.strong} at 45% opacity (texture, never competing with text or the glow); pointer trail of squares within 6 cells that step up the ramp blue-300 (2px) -> blue-400 (3px) -> blue-500 (3px) and fade out in about 260ms; off for touch and prefers-reduced-motion"
  glow: "EXCEPTION, two uses only: the closing CTA (variant 'cta') and the media stage of the case-study cards (variant 'media'). Technique taken from the reference (Laravel Cloud): two layers of diagonal stripes (115deg) that scroll sideways forever. Blue layer: Elevate Blue stripes with half-strength bands, 640px period. Light layer: stripes in the surface color that wipe parts of the blue. Each layer is 3 tiles, each exactly one repeat wide (period / sin(angle) = 706.16px), so translating by one repeat loops with no seam. The group sits under one blur(12px) pass. Linear timing, only transform animates, static under prefers-reduced-motion. Variant 'media': surface Excellence Blue, fills its box, group at 70% opacity, loops of 16s (blue) and 6s (surface), no edge mask. Variant 'cta' (adapted to the dark surface in v1.24.0): surface {colors.surface.dark}, group at 60% opacity, loops of 12s and 3.5s, centered in a box of at most 1280px and masked: strongest at the bottom right, fading toward the top (30 to 70%) and the left (60 to 100%) so the text keeps its contrast. Rejected for the CTA after being tried in v1.16-1.23: a drifting hero wash, a square glow, an icon glow, and a Nightwatch-style perspective grid (all documented in the change log)"
---

# Elaniin 2027 Design System

## 1. Overview and tone

**The brief.** The brand reaches the company: same balloon, same blue, built with firmer strokes, more geometric forms and "a color that weighs instead of shouting". Nothing is replaced, everything matures. Whoever knows Elaniin recognises it at once; whoever does not takes it more seriously.

**What the website must feel like**
- **Serious, not cold.** Precision and restraint, with warmth in the copy and the photography.
- **Technical command.** Real product, real data, numbers that count. Precision shows in the figures and in the restraint, not in a decorative monospace face.
- **Confident.** Large, tightly set headlines; blue appears on purpose, not to fill space.
- **Built.** Hairline grids, square modules, flat surfaces. The page looks constructed.

**Visual structure.** White and Inspire Grey carry the page, organised as hairline bento grids. **Excellence Blue** (dark navy) carries the weight: full-bleed bands for product and code, and the footer. **Elevate Blue** (bright blue) appears only in fine details: buttons, links, focus, active indicators, small icons, the symbol. It is never a section background. The balance is the same as Laravel's: neutral surfaces, a dark anchor, a few sharp points of blue.

**Voice (from the brand document).** Short declarative sentences. English is the primary language of the site and Spanish the secondary one (section 13); the register below applies to both. Direct and human, never promotional. Examples of the register: "Nada se reemplaza. Todo madura." / "El nombre deja de pedir atención y empieza a asumirla." Headlines state a fact or a position; they do not exclaim.

## 2. Color

### Palette
| Token | Hex | Role |
|---|---|---|
| Elevate Blue | `#1054FF` | Detail accent: primary button, links, focus, active indicators, symbol |
| Excellence Blue | `#01172E` | The strong color: dark bands, case stages, closing CTA, footer, code surfaces, dark button variant (darker since v1.29.0; it reads more high-tech than the first `#011E3D`) |
| Elaniin Black | `#141414` | Wordmark, primary text, outlines |
| Inspire Grey | `#F0F0F3` | Alternate sections, text on blue |
| Dynamic Blue | `#4D75FD` | Non-text accents, chart series, tints |
| White | `#FFFFFF` | Page and cards |

The palette is deliberately short. Do not introduce other blues; use the **blue ramp** (tokens `colors.blue-ramp`) for tints and states.

### Usage rules
1. **Elevate Blue is a detail color.** It marks the primary action, links, focus, active states and the symbol. It is never a section or card background and covers well under 5% of the visible area (full list in `colors.elevate-blue-usage`).
2. **Never blue text on Excellence Blue** (2.98:1). Use `text.on-dark-accent` `#7B9BFF`.
3. **Dynamic Blue is never text** (4.21:1 on Excellence Blue). Graphics only.
4. **Text on Elevate Blue** (button labels) is white. Navy-on-blue pairings, as appear in the source document's eyebrows, are 2.98:1 and are not used.
5. **Status colors** (`colors.status`) are only for state and feedback. Never for decoration or categories.
6. **Gradients:** the stepped `blue-steps` motif is the only gradient, with one exception: the soft blue glow (`motifs.glow`) of the closing CTA and of the case-study media. No other smooth gradient backgrounds.

### Section rhythm
Alternate surfaces to create pace: `white` -> `subtle` -> `white` -> `dark band` -> `white` -> `subtle` -> `footer (dark)`. Dark bands: two per page at most, plus the footer. Do not stack two bands of the same surface.

### Data visualization
Series order: Elevate Blue `#1054FF`, Excellence Blue `#01172E`, Dynamic Blue `#4D75FD`, `#8C8F9B` grey, Elaniin Black `#141414`. Gridlines `border.default`. Labels in the text family with tabular figures. Do not use status colors for categories.

## 3. Typography

| Role | Family | Use |
|---|---|---|
| Display | **Instrument Sans** | Headlines, section titles, buttons, nav |
| Text | **DM Sans** | Paragraphs, forms, table content, captions |
| Mono | **Geist Mono** | **Tags and badges, eyebrows (when they carry information) and code.** Small descriptive details only when the team asks for it (opt-in; today only the research list filters and dates). Short labels in UPPERCASE with wide tracking. See the rule below |

All three are open source (SIL OFL). Self-host as woff2 with `font-display: swap`.

**Rules**
- Headlines: Instrument Sans 500, line-height 1.0-1.2, negative tracking (see scale). Left-aligned by default; centered only in the hero and the closing CTA.
- **Geist Mono: three default uses and one use that is OPT-IN (team decision, v1.30.0).**
  1. **Tags and badges** (`Tag`, `StatusBadge`, the kind tags of the research list): `label` token, 13px, UPPERCASE, tracking-wider.
  2. **Eyebrows**, only when one carries information the heading does not: same `label` style. None exist today.
  3. **Code**: blocks, commands, identifiers.
  4. **OPT-IN, only when the team asks for it, case by case: small descriptive text and details** (dates, sources, legal lines, group labels, metric captions) at 13px or smaller. It is NEVER applied by default: when it was applied everywhere (v1.29.0) it broke several layouts (the mono is wider than DM Sans) and read badly in the footer, so every small text stays in DM Sans unless someone requests it. Approved opt-ins so far: the research list (filter tabs, the date next to the kind tag). Styles for an opt-in: short labels use `label` (UPPERCASE), descriptive lines use `detail` (normal case, so a line such as the copyright stays lowercase); in code the utilities `mono-label` and `mono-detail`.
  Not mono, ever: headlines, paragraphs, navigation labels and the descriptions under menu links, buttons, form fields, the figures themselves, and the interface drawn inside the case scenes and solution mocks (they imitate client products; only the Tag and StatusBadge primitives can appear there in mono).
- **Eyebrows are not used.** A small line above a heading repeats what the heading already says and is decoration. The home has none. Use one only when it carries information the heading does not (a category, a date), and then in the text family, normal case.
- **No decorative numbering.** Do not prefix names, cards, steps or sections with `01`, `02`, `03` or `01 /`, and do not use counters as ornament. A number appears only when it is content (a metric, a price, a date, an actual sequence the user must follow and that was asked for). Group names are identified by their name and by the same icon the nav uses for them.
- Body: DM Sans 400 at 16px; lead paragraphs at 20px. Keep `measure` limits.
- Never use Geist Mono for paragraphs, headings, buttons or navigation; never use DM Sans for headlines.
- Mobile uses the `mobile` sizes in the scale; family and weight never change.

## 4. Layout and spacing

- **Grid:** 12 columns, 24px gap, container max `1280px`, gutters 48 / 32 / 20px (desktop / tablet / mobile).
- **Breakpoints:** `768px` (tablet), `1024px` (desktop), `1280px` (wide). Below 1024px multi-column grids reduce columns; below 768px everything is single column and CTA stacks may go full width.
- **Rhythm is uneven on purpose:** large jumps between sections (96-128px), compression inside blocks (12-16px between heading and body).
- **Hairline bento:** cells share 1px lines with `border.default`; the outer shape has 12px radius. Cells vary in span; never three identical cells in a row.
- **Composition is asymmetric.** Headline left, supporting paragraph offset in a second column (as in the brand document). Not everything centered.
- **Full-bleed sections, boxed content:** section backgrounds span the viewport; content stays inside the container.

## 5. Shape

| Element | Radius | Border |
|---|---|---|
| Button | 6px | 1px |
| Input, tag, status badge, tooltip | 6px | 1px |
| Menu | 8px | 1px |
| Card, product frame, media, code block, bento outer | 12px | 1px hairline |
| Modal | 16px | 1px |
| Favicon / app icon | 18.5% | none |
| Decorative modules | 2px max | none |
| Status dot, avatar, switch | 9999px | none |

Rule: **buttons and cards are not pills and not sharp.** If you change `radius.button`, check `radius.input` and `radius.tag` (they should match) and `radius.card` (it should stay larger).

**Shadows:** the system is flat. `card-rest` is optional on floating UI; `product` is allowed only on product mockups; `menu` on dropdowns. No large diffuse shadows elsewhere.

## 6. Components

All specifics are in the front matter; this is how they fit together.

- **Buttons.** Primary = Elevate Blue fill, white text. Dark = Excellence Blue fill, white text (an equal-weight alternative; pick one for the nav and keep it consistent, never both in the same action group). Secondary = white fill with a 1px hairline border and navy text. Tertiary = text link with arrow. One primary per view region. On Excellence Blue bands use `on-dark` variants (white fill, navy text). Heights 32/40/48; fit-content width.
- **Links.** Elevate Blue, hover `#0848CC`. In running text they are underlined (1px, 3px offset). Navigation and footer links are not underlined.
- **Inputs.** 44px high, 1px `border.input` (`#8C8F9B`, 3.22:1), 6px radius. Focus: Elevate Blue border plus the 2px ring. Error: red border and message text; never color alone, include an icon or text.
- **Tags and status badges.** Text family (`label`), normal case, 24px high, fit-content. Status badges include a 6px dot.
- **Cards.** White, 1px hairline, 12px radius, flat. A featured card gets a 2px Excellence Blue border; one per group at most.
- **Product frames.** Screenshots and dashboards in a 12px frame with the `product` shadow. Show real product, not abstract illustration.
- **Code blocks.** Excellence Blue surface, Geist Mono 13px, accent `#7B9BFF`, comments `#8EA0B8`.
- **Nav.** 64px, white, 1px bottom hairline, sticky. A single primary CTA ("Hablemos") right-aligned; no search and no sign-in. Two dropdown types (`components.mega-menu`): the standard 4-column menu and the 3-column solutions menu (Desarrollo de software, Inteligencia artificial, Cloud). One shared panel resizes and cross-slides between them.
- **Button implementation rule.** Hide buttons with a prefixed variant (`max-lg:hidden`), never a bare `hidden`; the base sets no width or border color, each variant owns its border.
- **Footer.** Excellence Blue, secondary text `#A9B8CC`.
- **Dark band.** Full-bleed Excellence Blue for product, code and key statements, large display type in white, max two per page plus the footer.
- **Photography.** Real people, real places, natural light, as in the brand mockups (billboard, tote bag, desk). No generic stock for abstract ideas, no illustrations of people. Corner radius 12px.
- **Icons.** Stroke-based, `currentColor`, 1.5px stroke, 24px grid, rounded joins. Never filled or multi-color.

### Logo and symbol

**Approval status (CEO feedback, 2026-10-15)**
| Piece | Status | Note |
|---|---|---|
| Palette | **Approved** | Section 2 |
| Lettering / logotipo (adjusted geometric wordmark) | **Approved** | The only logo used across the website |
| Isotipo (symbol) | **PENDING, nothing approved** | The pixel idea is liked but reads as too abstract. Proposal #02 (solid balloon) is discarded. Proposal #01 (modular balloon) is NOT approved either. Two new options are to be explored |
| Tagline of the logo, "Intelligent Software Company" | **PENDING** | It must be reduced to two words, to avoid such a long line. Nothing is proposed yet; this entry only records that it is open |

**Rule for the website:** until the isotipo and the tagline are approved, the website uses the **logotipo only** (no symbol, no tagline) wherever a logo appears: nav, footer and any future use. The `isologo` lockups (symbol + name) are kept on disk for reference and are NOT used.

Files in `public/assets/`:
| File | Status | Use |
|---|---|---|
| `public/assets/logotipo-elaniin.svg` | **In use** | Wordmark only, `#141414`. Nav on white / Inspire Grey |
| `public/assets/white-logotipo-elaniin.svg` | **In use** | The same wordmark in `#FFFFFF` (identical paths). Nav over Excellence Blue / Elaniin Black sections and footer |
| `public/assets/main-isologo-elaniin.svg` | Not in use (isotipo pending) | Lockup of Proposal #01, symbol `#1054FF`, name `#141414` |
| `public/assets/white-isologo-elaniin.svg` | Not in use (isotipo pending) | All-white version of the same lockup |
| `public/assets/favicon.svg` (= `src/app/icon.svg`) | **Provisional** | Contains the Proposal #01 symbol, since a legible wordmark does not fit a 16px icon. Replace it when the isotipo is approved |

Rules:
- The name is **Elaniin Black** on light surfaces and **white** on dark ones. Never recolor the name blue.
- Clear space: at least the height of the letter "i" dot (about 16% of the logotipo height) on all sides. (assumption)
- Minimum size: logotipo 96px wide on screen. The nav and the footer both use 28px tall (about 104px wide).
- Never stretch, outline, add effects, or change proportions. No giant or watermark use of the logotipo (CEO feedback, v1.43.0).


## 7. Motion

- Hover and focus changes: color, background and border only, `150ms`, standard easing. No lift, no scale, no glow.
- Reveal on scroll: fade plus 16px rise, `500ms`, emphasized easing, 60ms stagger, once.
- Panels and menus: `200-300ms`, emphasized easing.
- Motion shows structure (a grid assembling, a module placing) and never decorates.
- Honor `prefers-reduced-motion`: no transforms or parallax; opacity fades only, 150ms max.

## 8. Accessibility

Target: WCAG 2.1 AA. Ratios below were checked with the contrast tool.

| Pair | Ratio | Verdict |
|---|---|---|
| `#141414` on white | 18.42 | AAA |
| `#141414` on `#F0F0F3` | 16.20 | AAA |
| `#4A4D57` (secondary) on white / grey | 8.43 / 7.41 | AAA |
| `#656873` (muted) on white / grey | 5.55 / 4.88 | AA |
| `#1054FF` link on white / grey | 5.62 / 4.94 | AA |
| `#0848CC` link hover on white | 7.48 | AAA |
| white on `#1054FF` (primary button) | 5.62 | AA |
| white on `#0848CC` (hover) | 7.48 | AAA |
| white on `#022B63` (dark button hover) | 13.74 | AAA |
| white on `#010F20` (dark button active) | 18.37 | AAA |
| `#01172E` on white / `#F0F0F3` (secondary button text) | 18.05 / 15.87 | AAA |
| `#1054FF` focus ring and indicators vs white / grey | 5.62 / 4.94 | Meets 3:1 for UI |
| `#0848CC` brand tag text on `#E7EEFF` | 6.43 | AA |
| white on `#01172E` | 18.05 | AAA |
| `#A9B8CC` on `#01172E` / `#141414` | 8.95 / 9.14 | AAA |
| `#8EA0B8` on `#01172E` | 6.77 | AA |
| `#7B9BFF` on `#01172E` / `#141414` | 6.86 / 7.00 | AA |
| `#4D75FD` on `#01172E` | 4.54 | Barely passes AA on this dark blue, but it fails on white and the rule stays: Dynamic Blue is for graphics only |
| `#1054FF` on `#01172E` | 3.21 | **Never as text** (meets 3:1 for UI) |
| `#01172E` on `#1054FF` | 3.21 | **Never as text** |
| status text on status bg (success / warning / error / info / neutral) | 5.66 / 5.75 / 6.38 / 6.43 / 7.41 | AA |
| input border `#8C8F9B` on white | 3.22 | Meets 3:1 for UI components |
| status dot success / error / warning on white | 3.47 / 4.82 / 3.70 | Meets 3:1 for graphics |

Other requirements
- **Focus:** always visible, 2px ring in `shadow.focus` (`focus-on-dark` variant on dark bands). Never remove outlines. ONE exception (v1.42.0): when the page itself returns the focus after closing a dialog (the expand button of a solution card), the ring is not painted, because after Escape it stayed on as a stray blue line; focus still goes back to the button, and the ring appears with the next key press (Tab, arrows) or when focus leaves. Tab navigation always shows the ring. The mark is `data-focus-returned` on the button.
- **Targets:** interactive elements at least 40px high (inputs 44px); at least 8px between targets.
- **Not color alone:** status always includes text or an icon; links in body copy are underlined.
- **Semantics:** one `h1` per page, ordered headings, landmarks, alt text on informative images, labels on all form fields.
- Re-run the contrast check after any color change.

## 9. Do and Don't

**Do**
- Let typography do the work: large headings, negative tracking, short copy.
- Use hairlines (1px) for structure; keep surfaces flat.
- Keep Elevate Blue to fine details (buttons, links, focus, active states, symbol); let white, grey and Excellence Blue carry the page.
- Keep one typographic criterion: no mono outside code; tags, labels and figures in the text families.
- Show the real product, real code, real people.
- Vary the composition: asymmetry, different cell spans, uneven section spacing.
- Reference tokens by name; one token change should update the whole site.

**Don't**
- Recolor the wordmark blue, add effects to the logo, or use the old rounded logotype.
- Put blue or Dynamic Blue text on Excellence Blue; put navy text on Elevate Blue.
- Use Elevate Blue as a section, card or hero background, or for headlines and paragraphs.
- Use both the primary and dark button in the same action group.
- Use smooth gradients or glows anywhere except the blue glow of the closing CTA and the case-study media, and never circuit lines, particles, neon, or a dark background with a blue-violet gradient.
- Use large diffuse shadows outside product mockups.
- Use pill buttons, or radii outside the table in section 5.
- Use three identical cards in a row, or center everything.
- Use emoji, filled or multi-color icons, or abstract illustrations of people.
- Use status colors for decoration or categories.
- Hard-code colors, sizes, radii or fonts that exist as tokens.
- Use any font outside Instrument Sans and DM Sans (plus Geist Mono for tags, eyebrows and code, and for small details only when the team asks).
- Add an eyebrow above a heading out of habit.
- Number things for decoration (`01 · Software`, `Step 02`, section counters).

## 10. Assumptions to confirm

| # | Assumption | Why | Effect if wrong |
|---|---|---|---|
| 1 | ~~Symbol is the modular balloon (Proposal #01)~~ **Open: no isotipo is approved** (CEO feedback, 2026-10-15). The website uses the logotipo only; the favicon is provisional | The team is working on 2 new options that keep the pixel idea but are less abstract | Replace the favicon and, if wanted, add the symbol to the logo section |
| 2 | ~~Excellence Blue is `#011E3D`~~ **Changed to `#01172E` by the team on 2026-10-06**: the darker blue reads more high-tech. It replaces `#011E3D` everywhere (surface.dark, ramp 900, focus ring gap, blue-steps end); the former code surface `#01172E` is now simply Excellence Blue | The first value came from the PDF; the team prefers the darker one after seeing both on the site | n/a |
| 3 | ~~Dynamic Blue is `#4D75FD` (sampled)~~ **Confirmed** in the corrected palette image | Same | n/a |
| 4 | Headings are weight **500** | Firmer strokes; the PDF cover is set in regular (400) | One token: `typography.scale.*.weight` |
| 5 | Primary button is **Elevate Blue** with white text; **Excellence Blue** is its equal-weight `dark` variant | Direction: buttons are blue details, as Laravel mixes black and blue buttons | Pick one of the two for the nav and the site |
| 13 | Display, h1 to h4, lead and body-lg sizes are **fluid** (`clamp`): the mobile value up to 768px, interpolating linearly to the desktop value at 1280px; tablet has no sizes of its own | Found while building the home test: the scale defines only desktop and mobile | Define explicit tablet sizes in `typography.scale` if fixed steps are preferred |
| 14 | **Geist Mono** is used for tags, badges, eyebrows (if ever needed) and code; small descriptive details only when the team asks for it; headlines and body stay in the sans families | Team decision, 2026-10-05 (code only) then 2026-10-06 (tags added; the mono for small details was tried everywhere and rolled back the same day because it broke layouts, so it is opt-in). The brand PDF lists Geist Mono for eyebrows, tags and details | n/a |
| 12 | **No Elevate Blue full-bleed sections**, even though the PDF uses full-blue slides | Direction: white/grey and dark navy lead; bright blue only in details, like Laravel | The PDF's full-blue look would need a `statement-band` component back |
| 6 | ~~Site is Spanish first~~ **Changed 2026-10-15: English is the primary language, Spanish the secondary one** (CEO feedback). All the dummy copy in the code is still Spanish until the real build | Defined in section 13 | n/a |
| 7 | **No user-switchable dark mode**; dark appears only as bands | The brief is light-first | Needs a full dark token set |
| 8 | Neutral borders, text greys, status colors and the `#7B9BFF` on-dark accent are **derived**, not from the PDF | Brand document defines 5 colors only | Re-check contrast after any change |
| 9 | Container 1280px, breakpoints 768/1024/1280 | Not in the PDF | Adjust `layout.*` |
| 10 | Min logotipo size (96px wide) and clear space (about 16% of its height) | Brand document gives none | Adjust logo section |
| 11 | ~~All-white lockup not supplied~~ **Resolved:** `white-isologo-elaniin.svg` and `logotipo-elaniin.svg` were added; `white-logotipo-elaniin.svg` was derived from the logotipo (v1.43.0) | n/a | n/a |
| 15 | The **tagline** of the logo ("Intelligent Software Company") is not final: it has to be reduced to two words | CEO feedback, 2026-10-15; no proposal exists yet | Add it to the logo section once approved |
| 17 | ~~Which Spanish convention for numbers~~ **Decided 2026-10-15: El Salvador / Latin America (`es-SV`)**: decimal point, comma for thousands, `$` before the amount, 12-hour clock with "p. m." | Spain's `es` would give "99,98 %" and "12.400 $" | One map in `src/lib/format.ts` |
| 16 | ~~URL structure and switch placement~~ **Confirmed 2026-10-15:** English without prefix, Spanish under `/es`, switch `EN \| ES` in the nav (before the primary button), mobile menu and footer legal row. Translated slugs, English anchor ids and no automatic redirect are the working definition | Defined in section 13 | Restructure the routes (13.5) |

## 11. Building with this file

1. **Put this file at the repo root** as `DESIGN.md` and mention it in `CLAUDE.md` / `AGENTS.md`:
   > Read `DESIGN.md` before writing any UI. Use only its tokens. Never hard-code colors, sizes, radii, fonts or shadows. If something is missing, propose a token and ask.
2. **Tokens as variables.** Map the front matter once into CSS custom properties (or Tailwind theme) in a single file, for example `--color-elevate-blue`, `--radius-button`, `--space-6`. Components consume only the variables.
3. **Build one section at a time**, review it in the browser at 375 / 768 / 1024 / 1280, then continue.
4. **Use the references as inspiration for layout and pattern only** (hairline bento, large tight headlines, product-in-frame). Translate them into these tokens; do not copy their colors, fonts or spacing.
5. **Re-check contrast** after any color change, especially text on Excellence Blue and Elevate Blue.
6. **When the system evolves, edit this file first**, add a line to the change log, then update the code (see Refine below).

Suggested first prompt to the developer LLM:
> Read `DESIGN.md`. Create `styles/tokens.css` with every token as a CSS variable, load the two fonts (Instrument Sans, DM Sans) self-hosted, and build the nav, hero and one bento section using only those variables. Show me the result at 375 and 1280 before continuing.

## 12. Implementation notes (Next.js project)

- **Stack:** Next.js (App Router, TypeScript), Tailwind CSS v4, `motion` (`motion/react`) for component animation, plain CSS for micro-interactions. GSAP only if a section needs scroll choreography `motion` cannot do cleanly.
- **Tokens live in `src/app/globals.css`** under `@theme`, mirroring this file. Tailwind's default palette, radii, shadows, type sizes, easings and breakpoints are reset, so only the tokens here compile (for example `bg-elevate-blue`, `text-text-secondary`, `rounded-card`, `text-h1`, `font-display`).
- **Fonts** are loaded with `next/font/google` in `src/app/layout.tsx` (self-hosted by Next) and exposed as `--font-instrument-sans`, `--font-dm-sans` (Geist Mono is loaded as `--font-geist-mono` since v1.28.0 for tags, eyebrows and code blocks; `--font-mono` falls back to the system monospace until a code block exists).
- **Type sizes are fluid** between the mobile and desktop values of the scale (see assumption 13).
- **Counting numbers (`CountUp`) count ONCE:** the first time they are 60% on screen, never again when the visitor leaves and returns (v1.41.0). They used to restart from 0 on every re-entry, which read as the number jumping backwards; `replayKey` is the only way to replay. Mocks that loop on visibility (cloud grid) run while ANY part is on screen (`useInView` amount "some") and their decorative loops (the region rings) do not depend on visibility, so nothing freezes or restarts while scrolling.
- **Sticky nav and scroll lock:** `body` uses `overflow-x: clip`, never `hidden`. With `hidden`, locking the page scroll (`overflow: hidden` on `html` while the mobile menu is open) turned `body` into a scroll container and the sticky bar scrolled away when the menu was opened from a scrolled page (fixed in v1.31.0).
- **Animation:** use `motion` for reveal, tabs, menus and animated mocks; always respect `prefers-reduced-motion`. A global `MotionConfig reducedMotion="user"` lives in `src/components/providers.tsx` (transforms off, opacity kept). Durations and easings come from `motion.*` tokens (`src/lib/motion.ts`); where JS needs a literal color, use `src/lib/tokens.ts`, a mirror of the theme.
- **Rules for animated mocks (cards):**
  1. Gate every loop with `useInView`: it runs only while the mock is on screen and stops when it leaves.
  2. Under `prefers-reduced-motion` the mock renders its final, meaningful state with no movement.
  3. Initial render must be deterministic (no `Math.random` in render), so server and client match.
  4. Loops hold the finished state about 2.5s before restarting; steps advance about every 900ms.
  5. Color changes happen in discrete steps up the blue ramp, never as smooth gradients (the blue glow is the exception and moves only through transform).
  6. Scroll reveal animates content only, never a cell background that sits on a hairline grid.
  7. The mock is decorative (`aria-hidden`), the meaning lives in the card text.
- **Plain CSS** is used for the hero entrance (`rise` utility) so it does not wait for hydration.

## 13. Internationalization (English primary, Spanish secondary)

**Decision (CEO feedback, 2026-10-15).** The website exists in two languages: **English is the primary language** and **Spanish is selectable** through a language switch. Titles and URLs must be handled for SEO so the two languages are told apart by search engines. Today the code only holds dummy Spanish copy; this section fixes the rules so that everything built from now on is bilingual from its first line, and the real build starts with everything in order. URL structure and switch placement were **confirmed by the team on 2026-10-15** (assumption 16); the details of each rule below that are not marked as confirmed are the working definition.

### 13.1 Languages and URLs
- Locales: `en` (default, `x-default`) and `es`. `<html lang>` and the URLs use no region. Formatting with `Intl` does: **English follows `en-US` and Spanish follows El Salvador (`es-SV`)**, decided by the team on 2026-10-15 (`intlLocale` in `src/lib/format.ts`; NumberFlow uses the same map). That gives "1,234.5", "99.98%", "$128.50", "$12,400" and "2:30 p. m." in Spanish, the same separators as English.
- **Confirmed:** English has **no prefix** (`/`, `/solutions`) and Spanish lives under `/es` (`/es`, `/es/soluciones`). The primary language keeps the shortest URL and `/` is the English home with no redirect. (Discarded: `/en` and `/es` with `/` redirecting.)
- **Slugs are translated** (`/solutions` and `/es/soluciones`), defined once in a route table (`src/lib/routes.ts`: one entry per page with its slug in each language). No page is reachable under a slug of the other language: the folder under `src/app/[lang]/` is named after the ENGLISH slug (`app/[lang]/solutions/page.tsx`) and `resolveLocale` rewrites `/es/soluciones` to it and answers 404 to `/es/solutions` (tested with a sample table). Only exact slugs are translated; a nested path is added to the table as its own page.
- `/en/...` must redirect (308) to the unprefixed URL, so there is only one URL per page.
- Anchor ids stay in English in both languages (`#home`, `#solutions`, `#cases`, `#research`, `#contact`, defined in `src/lib/anchors.ts`): they are technical, not content.
- No automatic redirect from `Accept-Language`. The visitor lands on what the URL says and changes language with the switch. (An automatic redirect hides one language from crawlers and surprises people who share links.)

### 13.2 Language switch
- **Confirmed placement:** a compact two-option control **EN | ES** in the nav, on the right, before the primary button. On mobile it sits at the bottom of the menu sheet. The footer legal row repeats it.
- It is a pair of **links**, not a button: each goes to the **same page in the other language** (route table), carries `hreflang` and `lang`, and the current one has `aria-current="true"`. The choice is not stored in a cookie.
- Style: DM Sans `body-sm`, current option in `text.primary`, the other in `text.secondary`; no blue and no flag icons (flags are countries, not languages). Over dark bands it uses the on-dark text tokens like the rest of the bar.

### 13.3 SEO
- `<html lang>` is `en` or `es` per page; text in the other language inside a page carries its own `lang`.
- Every page has its **own translated `<title>` and meta description**, unique per language, written by hand (never machine-generated at build). Home titles are brand-first ("Elaniin | ..."); a sub-page title is written as its own full string in each language (`title.absolute`) so no template can append the brand twice.
- Each page declares a **self-referencing canonical** and `alternates.languages` (`en`, `es`, `x-default` pointing to English) through `generateMetadata`. The sitemap lists both URLs per page with the same alternates.
- Open Graph: `og:locale` and `og:locale:alternate` per language; titles and descriptions come from the same dictionary as the page. `og:locale` is `en_US` and `es_LA` (Spanish for Latin America, the closest Open Graph locale to the Salvadoran convention).
- The review site stays `noindex` (see `ALLOW_INDEXING`); `hreflang` is still emitted so it can be tested.
- Brand and product names are never translated; image `alt` text is translated.

### 13.4 Rules for every section built from now on
1. **No visible string lives in a component.** Every string (including `aria-label`, `alt`, placeholders, validation messages, button labels and the text inside decorative mocks) comes from a dictionary.
2. **Dictionaries are typed TypeScript objects, one file per section and language** (`src/content/en/<section>.ts`, `src/content/es/<section>.ts`). The shape of every section is declared once in `src/content/schema.ts` and both languages are typed against it, so a missing or extra key fails `tsc`. English is written first; Spanish is a translation reviewed by a person.
3. **Data files split neutral data from text.** Ids, hrefs (as route-table keys), icons, layout spans, accents and numbers stay in the neutral data; titles, excerpts, labels and units move to the dictionary, keyed by the same id.
4. **Layouts are tested with the Spanish copy**, which runs about 20 to 30% longer than English: no fixed widths on text, buttons grow or wrap, cards never rely on a line count.
5. **Numbers, dates and money go through `Intl`** with the page locale (`128.50` / `128,50`, month names, ordinal forms). NumberFlow receives the locale. No hard-coded month names or separators.
6. **Sentences are never built by concatenating strings**; each sentence is one string with placeholders (`{id}`, `{n}`, `{place}`, `{amount}`...) filled with `fill()` from `src/lib/template.ts`, or split at the placeholder when a live element (a link, a NumberFlow) goes inside. Plurals use `Intl.PluralRules`. Numbers that are part of a written sentence ("42%") belong to the translated sentence; values computed or animated on the page go through `Intl`.
7. **Links between pages go through one helper** (`href(routeKey, lang, anchor?)` in `src/lib/routes.ts`; neutral data stores a `Target = { route, anchor } | null`, where `null` is a page that does not exist yet and renders `#`); no hard-coded paths in components. Section ids come from `src/lib/anchors.ts`.
8. **Server first.** The dictionary is read in Server Components and passed to client leaves as props, so a client bundle only carries the strings it renders.
9. **Forms** send the language with the submission (newsletter, contact), and success and error messages come from the dictionary.
10. The mono uppercase tags keep their accents (Á, É, Ñ) in Spanish; Geist Mono has them.

### 13.5 Technical shape (Next.js 16, from the local guide `node_modules/next/dist/docs/01-app/02-guides/internationalization.md`) , IMPLEMENTED in v1.44.0
- Routes live under `src/app/[lang]/` (`layout.tsx` sets `<html lang>`; `generateStaticParams` returns `en` and `es`, so both languages are statically rendered). `icon.svg`, `globals.css` and `sitemap.ts` stay at the `app` root.
- `src/proxy.ts` (Next 16 name for middleware) uses the pure function `resolveLocale` in `src/lib/proxy-rules.ts`, driven by the route table: an English slug of the table is **rewritten** to `/en/...`, a Spanish slug to its internal folder under `/es/...` (the folder is named after the English slug), `/en/...` is **redirected (308)** to the unprefixed URL, an uppercase `/ES` or `/EN` is redirected to lowercase (the query string is kept), and EVERYTHING else is rewritten to `/<lang>/404`, the catch-all that calls `notFound()` (status 404, see components.not-found for its known limit). **Every new page must be added to the route table first**, or it answers 404. Segments are matched whole (`/english` is not `/en`). The matcher runs on every page URL and skips only Next internals (`_next/`, `__nextjs`) and real static files by extension.
- `getLang()` and `getCopy(section)` (`src/content/index.ts`) read `lang` through `next/root-params`; an unknown language is a 404. Server Components read the copy and pass strings to client leaves as props. Server wrappers (`Nav`, `Footer`, `Hero`, `Clients`, `Research`, `Solutions`, `Cases`, `Cta`) are async; the client parts are `NavClient`, `NewsletterForm`, `ResearchExplorer`, `SolutionsGrid`, the scenes and the visuals.
- Metadata comes from `buildMetadata(lang, route, page)` in `src/lib/metadata.ts` (translated title and description, self canonical, hreflang en / es / x-default, Open Graph locale, robots from `ALLOW_INDEXING`); `src/app/sitemap.ts` lists every route in both languages with alternates. Public origin: `SITE_URL` (default the review URL).
- Tests (Vitest, `npm test`): routes, proxy rules (including translated slugs), metadata, sitemap, dictionaries (every id has copy in both languages, placeholders present), formatting, the switch, and two guards: `copy-guard.test.ts` (Spanish text in `src/app` or `src/components`) and `jsx-literals.test.ts` (parses the JSX and flags ANY literal text node or literal `aria-label`, `alt`, `placeholder`, `title`, in any language; proper names and invented brands are on its allow list).
- No i18n library is needed for two languages; revisit only if a third language or ICU message formatting arrives.

### 13.6 What is NOT done yet
- The English copy is a translation of the sample content (still invented). The real copy is written together with the real content, section by section, English first.
- No page exists besides the home: the route table has one entry (`home`) and grows with each page (slug in both languages, then the copy in both dictionaries).
- The 404 is designed and localized (components.not-found); only its copy is sample copy.

## 14. Change log

| Date | Token | Old | New | Reason |
|---|---|---|---|---|
| 2026-10-05 | initial version | n/a | v1.0.0 | First system for the 2027 re-brand website |
| 2026-10-05 | `surface.blue`, `statement-band`, `button.on-blue`, `text.on-blue-*`, `border.on-blue`, `shadow.focus-on-blue` | up to 2 full-bleed Elevate Blue bands | removed | Direction: white/grey and dark navy lead; Elevate Blue only in details (v1.1.0) |
| 2026-10-05 | `colors.elevate-blue-usage` | n/a | allowed / forbidden list and <5% area budget | Make "details only" enforceable (v1.1.0) |
| 2026-10-05 | `components.button.dark`, `button.secondary` | n/a / black outline | added Excellence Blue variant / white fill with hairline border | Laravel-style mix of dark and blue buttons (v1.1.0) |
| 2026-10-05 | `components.card.featured.border` | Elevate Blue 2px | Excellence Blue 2px | Cards are not an Elevate detail (v1.1.0) |
| 2026-10-29 | `components.breadcrumbs` (new); `components.detail-header` (back link optional) | no breadcrumbs; detail pages had a "back to list" link | breadcrumbs on every page from level 2 (a page with an ancestor besides home): a white strip with a bottom hairline right under the sticky bar (it scrolls; only the bar is sticky), body-sm, ancestors as links in text-secondary (hover primary), 16px chevrons in text-muted, the current page in text-primary weight 500 with aria-current, wrapping on small screens. The trail is computed from the route table (pages whose English path is a whole-segment prefix), labels are the meta titles without the brand suffix, detail pages pass their own title. Detail pages drop their back link; legal pages (level 1) keep it | Site map navigation rule (v1.59.0) |
| 2026-10-29 | `components.industry-columns` (new); `components.stat-grid` (dark band); `components.process-steps` (new) | industries hub used the service cards; the figures were a white hairline grid; contact's next steps used the feature grid | from Pinterest references (design-system/elaniin-2027/brief.md), structure only: industries as four tall columns side by side from xl (30rem high, shared hairlines, a 48px icon circle and a 40px arrow circle on top, the h2-size title and text at the bottom); the hovered or focused column grows to 1.8x and turns Excellence Blue with on-dark text, the arrow turns 45 degrees; 2x2 grid at md, stack on mobile; reduced motion drops the transition. Figures become an Excellence Blue band: display-xl number with its body-sm label beside it, cells split by on-dark hairlines. Process steps are rows on Inspire Grey: display-xl number in text-muted in the same row as the h3 and text (aria-hidden; the <ol> carries the order), hairlines between rows; the step titles drop their "1." prefix | Inner pages had little visual rhythm (v1.60.0) |
| 2026-10-29 | `components.service-cards` (index rows); `components.highlight` (editorial split); `components.prose` (editorial rows); case results (trend); `components.figure-dots` (new) | hub pages listed white cards in a 2-column grid; the highlight and the detail prose were a stacked header and paragraphs; case results were plain figures; study pages showed the figure only in the title | second pass on the Pinterest board (design-system/elaniin-2027/brief.md), structure only: hubs list their pages as rows on hairlines (h2-size title, text, a 48px arrow circle that fills Excellence Blue and turns 45 degrees on hover, no hover surface); the highlight is an editorial split (display-lg title under a strong hairline on the left, h3-size lead and link on the right); detail prose puts each h2 on the left and its paragraphs on the right from lg, each row under a hairline; case results carry a 44px trend circle with an Elevate Blue arrow (down for "-", up for "+" or "x"); study pages draw their figure as dots (100 for a percentage, 10 for x out of 10) filled in Excellence Blue on the hairline grey, in a white card with the figure in display-xl | More inner sections from the same references (v1.61.0) |
| 2026-10-29 | `components.build-flow` (new); `components.problem-list` (new); `components.models` (columns by count); `motion.flow-pulse` (new keyframe + utility) | service pages showed the problem and what's included as two hairline grids; two suggested models left an empty third column | custom software page pass (design-system/elaniin-2027/brief.md): the problem block of every service page is an editorial split, header sticky on the left from lg and the pain points as hairline rows with a CircleSlash icon box on the right. A service whose parts are a chain (registry `flow`, today custom software: architecture, backend, frontend, QA) shows what's included as a connected flow: 56px white node circles with an Elevate Blue icon on one border-strong hairline that runs through the node centers from lg (down the left edge below lg); an 8px Elevate Blue dot travels it every 4s (`flow-pulse`, transform only, hidden under reduced motion), the page's living loop. Suggested models go two across when there are two | Custom software page from the references (v1.62.0) |
| 2026-10-29 | `components.migration-stages`, `components.phone-showcase`, `components.support-panel` (new, interactive); `components.section-head` (tone dark) | app modernization, mobile apps and support pages had only the shared template sections | one interactive showcase per page, sample content only (design-system/elaniin-2027/brief.md). Modernization: a stage picker (segmented control, 44px targets, aria-pressed) plus play/pause moves six module tiles from a dark current-system panel to an Inspire Grey new-system panel through a bridge pill (shared layout animation, ease-emphasized); a success pill keeps "operations online" and a polite live line counts the modules; it replaces the page's highlight, which said the same. Mobile apps: selectable feature rows (Elevate Blue marker that fills while it autoplays) drive a PhoneFrame whose screens slide sideways (home with a NumberFlow balance, pay, alerts). Support: an Excellence Blue band with a priority picker, a display-xl Geist Mono countdown and a 40-segment bar of the agreed time used, a ticket feed whose state pills move (received, in progress, resolved in the success colors), three mono counters and 30 days of availability bars. All three run only while on screen, stop when the visitor picks something, and rest in a meaningful state under reduced motion | Service pages needed interactive, page-specific proof (v1.63.0) |
| 2026-10-29 | `components.comparison` (engagement models, now a decision tool) | a static table (criteria as rows, one column per model) with cards below 768px | pattern from ui-ux-pro-max (comparison table with the recommended column highlighted, CTA under it), colors and type kept Elaniin. A white finder card: three questions as native radio pills (44px, border-input at rest, Excellence Blue when checked with a check icon, focus shadow on the pill) and, on the right, a match bar per model (8px, border-default track, border-strong fill, Excellence Blue for the best; transform scaleX, 500ms emphasized) with a polite live region, a success pill for the best and a link to its page; a "who leads day to day" scale places the three models (the marked one an Elevate Blue 20px dot); a reset link. The detail table marks a column in Excellence Blue: the visitor's pick from the column header (aria-pressed toggle) or else the finder's best; rows tint Inspire Grey on hover. Below 768px a three-way model switcher shows one card, following the same mark. Nothing moves by itself; transitions are off under reduced motion. Scoring lives in finder-data.ts with tests | Engagement comparison needed to help choose, not only list (v1.64.0) |
| 2026-10-29 | `components.nav.engagement-menu`, `components.nav.resources-menu` (redesigned) | engagement: three icon rows and a help strip; resources: icon rows in two columns and an inset light-blue card with a radial gradient and three stacked cards | references from the board (design-system/elaniin-2027/brief.md). Engagement: three hairline cells, each drawing its team as 24 module dots (border-strong for your people, Excellence Blue for Elaniin, a dashed outline for the closed project); on hover or focus the Elaniin dots turn Elevate Blue one after another (25ms stagger) and a 36px arrow circle fills and turns; a legend sits by the heading; the help strip adds the "who leads day to day" scale of the comparison, whose dot for the hovered model grows Elevate Blue. Resources: explore tiles with decorative previews (a product window with a result chip; the first study's figure as 50 dots that fill on hover), articles as a numbered mono index with a turning arrow, and the featured cases on an Excellence Blue panel with the module field (the radial gradient is removed, rule: no gradients): a deck that deals the next case to the front every 2.8s while the menu is open and fans into a hand on hover or focus; every case card is now a real link to its case. Hover groups are named (group/item) so the open panel does not light every cell. Reduced motion: no stagger, no dealing | Nav menus needed more character (v1.65.0) |
| 2026-10-29 | `components.nav.engagement-menu`, `components.nav.resources-menu` (solution looks) | the two menus used white hairline cells and a plain dark panel, unlike the solution cards of the solutions menu | every mega menu now wears the three approved solution looks (`mega-menu.solution-cards`, ui/solution-surface): inset cards with p-2 gaps. Engagement: staff augmentation on the software look (light blue + module grid + glow), dedicated teams on the AI look (Excellence Blue + square grid + glow; its dots go white and light up text-on-dark-accent), project delivery on the cloud look (Inspire Grey + layer lines); the title row sits on the look's rule. Resources: explore on the software look (tiles white/70 on blue-200, blue-300 on hover), articles on the cloud look (rows on border-strong, white/80 on hover), featured cases on the AI look, which brings back its approved glow | One surface language across the nav (v1.66.0) |
| 2026-10-29 | `components.nav.engagement-menu`, `components.nav.resources-menu` (no textures) | both menus carried the solution textures (module grid, square grid + glow, layer lines) | the textures are removed from these two menus; the cards keep only the solution background colors (blue-tint-50, Excellence Blue, Inspire Grey). The solutions menu and section keep their textures | Team asked for flat backgrounds (v1.67.0) |
| 2026-10-29 | `ui.solution-surface` (MenuSurface); `components.nav.engagement-menu`, `components.nav.resources-menu` | both menus had flat backgrounds only | in these two menus the light blue cards (staff augmentation, explore) get back the software texture (module grid + glow), the Excellence Blue cards (dedicated teams, featured cases) get the AI glow as a gradient without the square grid, and the grey cards stay flat Inspire Grey. Shared through MenuSurface. The solutions menu keeps its three full looks | Team review of the menu surfaces (v1.68.0) |
| 2026-10-29 | `components.applied-ai.ai-hero`, `ai-field`, `loop-demo`, `capacity-grid` (new); `components.applied-ai.pillars` (pictures); `motion.caret-blink` (new keyframe + utility) | Applied AI used the shared centered hero, a plain pillar grid and no demonstration of the method | Applied AI becomes the site's most expressive page, inside the system (design-system/elaniin-2027/brief.md). Hero: an Excellence Blue band with a living halftone of module squares (canvas, 16px pitch, size from two slow waves, white at low alpha, a 140px pointer lens that grows squares and lights them text-on-dark-accent; fades away from the text, from the left on wide screens and from the top below 768px; on screen and visible tab only; one still frame and no lens under reduced motion); the headline enters word by word, "Applied AI" sits on one Elevate Blue block like a selected token and a block caret blinks after it (`caret-blink`, steps, solid under reduced motion); white on-dark button. Pillars: each cell gets a picture instead of an icon box (capacity: a 10x10 module grid where the Elevate Blue square is the team and the other 99 fill in Excellence Blue on view; human-in-the-loop: AI, person, delivery circles; deliverables: three stacked sheets that spread on hover). Loop demo: task pills, then three lanes on one hairline grid (AI lane on Excellence Blue writes the draft word by word in Geist Mono, the newest word on an Elevate Blue token and a caret; review lane with Approve (Elevate Blue, disabled until the draft is ready) and Ask for a change (writes a revision whose new words are tinted); shipped lane on Inspire Grey with success chips and a counter). Sample content, labelled as such | Applied AI as the creative showcase (v1.69.0) |
| 2026-10-29 | `components.nav.engagement-menu` (dot size) | team dots filled the card width (about 22px each) | team dots are 10px with an 8px gap, in a grid of its natural width (p-3), matching the 8 to 16px dots of the nav legend and scale | Dots were out of proportion with the nav (v1.69.1) |
| 2026-10-29 | `components.applied-ai.capacity-grid`, `loop-picture`, `sheets-picture` (living loops) | the pillar pictures were mostly static (a one-time fill, a still row of circles, a still stack) | each pillar picture is a looping, playable scene driven by useClock (on screen only, resting state under reduced motion). Capacity: a wave from the Elevate Blue seed fills the 10x10 grid (front ring in blue-400, filled squares Excellence Blue), a Geist Mono NumberFlow counts 1x to 100x, then it drains and repeats; the pointer is a 1.6-cell lens that paints squares Elevate Blue. Human-in-the-loop: Elevate Blue draft modules travel AI to person, a ring fills during review, then they ship to the delivery node (which grows Excellence Blue and counts) or, every third one, arc back over a dashed path "with changes"; the person node is a button that approves the draft under review. Deliverables: three sheets (documentation, tests, prototype) take turns at the front, their lines drawing in; hover spreads them into a row | Pillars needed motion and play (v1.70.0) |
| 2026-10-29 | `components.nav.resources-menu` (featured cases) | the featured cases were an overlapping fanned deck where two of the three cards could not be read | the three cases are a staircase of compact white cards (tag, title, the result figure in Geist Mono on the right), offset 12px each, all readable; the loop brings one forward at a time (lifted, shadow-product, full opacity; the others at 75%), and hovering or focusing a card brings it forward and pauses the loop | Every featured case must be readable (v1.70.1) |
| 2026-10-29 | pages: Legal, Privacy, Status, Report an issue (new: `/legal`, `/privacy`, `/status`, `/report-an-issue`; ES `/es/legal`, `/es/privacidad`, `/es/estado`, `/es/reportar-un-problema`); `components.legal-page` (new) | footer legal row and newsletter terms went to "#" | one template: the detail header with a "pending approval" tag, a dashed Inspire Grey note that the text is a sample pending legal approval, prose sections, and one primary action where it applies (Status to Report an issue, Report an issue to Contact). No closing CTA band. The status page invents no system states. The footer legal row and the newsletter terms link now point to these pages | Every footer link resolves (v1.58.0) |
| 2026-10-29 | pages: 4 case, 4 study and 3 article detail pages (new, under `/resources/use-cases`, `/resources/research`, `/resources/articles`); `components.detail-header`, `components.prose` (new); home solution dialog buttons | "Read the case", every research row, the latest articles of the Resources menu and the solution dialog buttons went to "#" | one left-aligned detail header for all (back link with arrow, tags, display-lg h1, lead). Case: the case scene on its stage joined to the results (display-lg value + label, hairline grid, one column when there is one result), the challenge (prose), what we did (hairline grid on Inspire Grey), the service behind it (highlight + link), CTA. Study: the figure reads into the finding as the h1, the sample as the lead, method (prose), findings (grid), what it means (highlight), CTA. Article: prose at 68ch, CTA. Metadata comes from each item's own copy. The solution dialog buttons now open the line hubs and the contact page | Content linked from Resources (v1.57.0) |
| 2026-10-28 | pages: 3 landings by problem (new, top level, out of the nav) | no pages | built from existing pieces only: the problem as the hero headline, the services it combines (white cards, hub card copy of each line), the case strip (site map names), suggested models, CTA. Service mix and models are a proposal to validate | Site map 3.27 to 3.29 (v1.56.0) |
| 2026-10-28 | pages: Industries hub + 4 industry pages (new, under `/industries`); `components.stat-grid` (new); industry cases with empty state | no pages; footer Industries links "#" | hub: hero, intro + one card per industry, stats (hairline grid, display-lg number that counts up once, label under it; values counted from the site's own data: industries, services, engagement models), certifications (the proof strip), CTA. Industry page: hero, data (hairline grid on Inspire Grey), use cases (the case cards of that industry in the two-column hairline grid; with none, a dashed Inspire Grey card with the empty message and the link to all cases), featured project (highlight), CTA. Internal figures from the site map are not published | Site map 3.22 to 3.26 (v1.55.0) |
| 2026-10-28 | pages: Contact us (new, `/contact-us`, `/es/contacto`); `components.contact-form` (new, light inputs per `components.input`) | no page; nav button, home hero and closing CTA went to "#" or the home CTA | one statement section over the hero module field: title (display-lg) + lead + direct contact (hairline definition list, sample values flagged) on the left, the form in a white card on the right; then "what happens next" (three numbered points in the hairline grid on Inspire Grey). No closing CTA: the page is the CTA. Form: name, work email, company (optional), interest (select), message (optional); errors under the field in error text with an error border, focus to the first invalid field, sending state on the primary button, success panel with role status. Sample only: nothing is sent. The nav button, the home hero, the closing CTA primary button, the footer and the 404 now point to it | Site map 3.21 (v1.54.0) |
| 2026-10-28 | pages: Resources hub, Use cases, Research (new, under `/resources`); `components.research-explorer` (topic filter); case data (industry) | no pages; home "see all" links "#"; research filtered by kind only | hub: hero, intro + two cards, CTA. Use cases: hero, filter tabs by industry (the research tabs on light: mono label, underline on the active one) over the home case cards in an even two-column hairline grid; only industries with cases get a tab (retail has none yet). Research: hero, the home research list on its Elaniin Black band, filtered by topic (AI, Cloud, Product). The home "see all" links, the nav Resources rows, the featured cases card, the footer and the 404 suggestions now point to these pages | Site map 3.18 to 3.20 (v1.53.0) |
| 2026-10-28 | pages: Engagement models hub + 3 model pages (new, under `/engagement-models`); `components.comparison` (new); service template proof strip optional | no pages; every model link "#" | hub: hero, intro + one card per model (the nav rows), comparison, CTA. Comparison on Inspire Grey: from 768px a white table with hairlines (criteria as row headers, one column per model, model names link to their page), below 768px one white card per model with the same rows as a definition list, so nothing scrolls sideways. Model pages use the shared service template (`ServicePageView`); the proof strip is left out when the site map names no client. Nav, footer and the suggested models of every service page now link to them | Site map 3.13 to 3.16 (v1.52.0) |
| 2026-10-28 | pages: Cloud hub + 2 service pages, AI solutions hub + 1 service page (new, under `/solutions/cloud` and `/solutions/ai-solutions`) | no pages | built with the `line-hub` and `service-page` templates of v1.50.0, no new components or tokens; only routes, registry entries, copy and metadata. Every solution card and sublink of the nav now points to a real page | Site map 3.8 to 3.12 (v1.51.0) |
| 2026-10-28 | pages: Software development hub + 4 service pages (new, under `/solutions/software-development`); page templates `line-hub` and `service-page` | no service line pages | two templates served by `[line]` and `[line]/[service]` routes and a registry (`sections/service/registry.ts`); no new tokens. Hub: hero, intro + one white card per service (hover subtle), proof strip, CTA. Service: hero, problem (hairline grid, white), what's included (hairline grid on Inspire Grey), optional highlight (header + link), proof strip (the client strip with names as text until logos are approved), suggested models (engagement rows as white cards on Inspire Grey), CTA. Sections the site map does not list for a page are left out | Site map 3.3 to 3.7 (v1.50.0) |
| 2026-10-28 | pages: Solutions hub (new, `/solutions`, `/es/soluciones`); `mega-menu.types.solutions` footer strip; `components.footer` column headings | no hub page; menu strip with one action; plain column headings | hub built from existing pieces only, no new tokens: the shared hero, the home solutions header, the three solution menu cards (shared `SolutionLinksCard`, title as h3) as entry blocks, and the Applied AI mention on Inspire Grey (header + tertiary link, its three pillars as rows in a white card). Menu strip: "Todas las soluciones" before "Conocer Applied AI". A footer column heading becomes a link when its hub page exists (Soluciones today) | Site map 3.2 (v1.49.0) |
| 2026-10-28 | pages: Applied AI (new, `/applied-ai`, `/es/ia-aplicada`); `components.hero` | one page (home); hero bound to the home copy | second page built from existing pieces only, no new tokens: the home hero (shared `HeroView`, its button goes to the closing CTA), three pillars in a hairline grid (logo-strip lines, icon box, h3, hover subtle), the three service lines with the solution looks (shared `ui/solution-surface`) and a link each, evidence as white cards on Inspire Grey with a tag, then the closing CTA and footer. The nav Applied AI link and the footer point to it | Site map 3.17; Applied AI is the brand differentiator (v1.48.0) |
| 2026-10-28 | `components.footer.layout` (link columns) | three columns: Soluciones, Compañía, Recursos (with Nosotros, Carreras, Guías, Sistema de diseño); every link "#" | four columns from the site map: Soluciones (3 lines + Applied AI), Modelos de contratación (3), Industrias (4), Recursos (Casos de uso, Investigaciones, Contacto); links resolved through the route table | Site map approved; Industries is out of the nav and is reached from the footer (v1.47.0) |
| 2026-10-28 | `components.nav` items; `mega-menu.types` (solutions sublinks, new engagement menu, resources columns) | Soluciones, Recursos, Casos, Nosotros + "Hablemos"; solution cards with 4 sublinks each; Resources with 4 columns (Explore, Latest, Guides, Featured) | primary nav of `docs/sitemap-elaniin.md`: Soluciones (cards with 4, 1 and 2 sublinks; footer strip links Applied AI), Modelos de contratación (new menu: 3 rich rows in 3 columns + footer strip), Applied AI (plain link with a 6px Elevate Blue dot, detail only), Recursos (Explore with Casos de uso and Investigaciones, Latest, Featured from 1280px; Guides removed) + "Contáctanos" | Site map approved; the home page keeps its sections (v1.46.0) |
| 2026-10-15 | `components.not-found` (new); section 13.1 (Intl locales), 13.3 (og:locale), 13.5 (proxy matcher, catch-all), 13.6; assumption 17 | default Next 404 (English, unbranded); Spanish figures by `es` (Spain); small gaps listed in 13.6 | designed 404 in both languages; `es-SV` for Spanish numbers, dates and times; every deferred small gap closed (language switch keeps the hash, SITE_URL validated, uppercase /ES redirects, keys by id, 12-hour times by Intl, tuple types for fixed-length copy, sitemap x-default) | Team decisions after the final review (v1.45.0) |
| 2026-10-15 | section 13.1 (slug routing), 13.3 (title wording), 13.5 (guards), 13.6, assumption 17 | route table described but not wired into the proxy; one guard (Spanish text only); title template wording inaccurate | `resolveLocale` reads the route table (folder = English slug, wrong-language slug is 404); `jsx-literals.test.ts` flags any literal JSX text in any language; open decision on the Spanish number convention recorded | Final review findings (v1.44.1) |
| 2026-10-15 | section 13.4 (rules 2, 6, 7), 13.5 and 13.6; `components.nav` (logo target, language-switch, mobile), `components.footer` (legal row); section ids | one language in the code, Spanish anchor ids (`#inicio`, `#casos`...), no routing by language | `[lang]` routes with English unprefixed and Spanish under `/es`, dictionaries per section, language switch in the nav, mobile menu and footer, English anchor ids (`#home`, `#solutions`, `#cases`, `#research`, `#contact`), `buildMetadata` and sitemap with hreflang | Bilingual site implemented over the sample content (v1.44.0) |
| 2026-10-15 | section 13 (13.1, 13.2), assumption 16 | URL structure and switch placement marked as proposal | confirmed: English without prefix, Spanish under `/es`; switch in the nav, mobile menu and footer | Team confirmation (v1.43.1) |
| 2026-10-15 | section 13 Internationalization (new); `language`; assumptions 6 and 16; voice | Spanish first, one language, no rules for a second one | English primary and Spanish secondary: URLs, switch, SEO, content and build rules defined; code not yet restructured | CEO feedback: bilingual site with SEO care for titles and URLs (v1.43.0) |
| 2026-10-15 | logo section, assumptions 1, 10, 11 and 15, `colors.elevate-blue-usage`, `radius.module` and `motifs.module` wording | isotipo = modular balloon (Proposal #01) treated as approved; logotipo used only as a watermark | **No isotipo approved** (pixel idea liked but too abstract, Proposal #02 discarded, 2 new options pending); tagline "Intelligent Software Company" pending reduction to two words; logotipo approved and used everywhere; favicon marked provisional | CEO feedback (v1.43.0) |
| 2026-10-15 | `components.nav.logo`, `components.footer` (layout, logo, wordmark), `assets` (`white-logotipo-elaniin.svg` added) | nav: isologo lockup; footer: giant 5% wordmark, no small logo | nav: logotipo (black on light, white on dark); footer: small white logotipo above the tagline, giant wordmark removed | CEO feedback: "no me convence el nombre grande en el footer", and the logotipo is the only approved mark (v1.43.0) |
| 2026-10-15 | palette and lettering | n/a | recorded as approved | CEO feedback (v1.43.0) |
| 2026-10-06 | `motifs.wash` | wash at 26% fill and 90% squares, 52-64s drifts (too intense and too slow to read as movement) | fill 12%, squares 55%; squares layer runs 3.5x faster with larger travel; added a sweep of light that crosses the module grid every 11s | Review: too intense and no visible movement (v1.17.0) |
| 2026-10-06 | accessibility (focus), `solution-dialog` | after closing the dialog with Escape the expand button kept the blue keyboard ring until a click elsewhere | focus still returns to the button, but the ring is not painted for a focus the page returns by itself; it comes back with the next key press or blur | The blue line looked like a bug and was not understood (v1.42.0) |
| 2026-10-06 | `components.solution-dialog` (visual column), `CountUp`, cloud mock | dialog: white column with a grey visual panel; CountUp restarted from 0 each time it re-entered the viewport; the cloud grid froze while half visible and its rings restarted on every visibility change | TEST (local): the dialog visual column takes the look of its solution with the mock on it; CountUp counts once; the cloud grid runs while any part is visible and the rings loop independently | The identity belongs where the visual is; the cloud animation felt like it stalled suddenly (v1.41.0) |
| 2026-10-06 | `components.solutions-grid`, `solution-card`, `visual-panel` (variant bare) | hairline grid of three white cells, each with a grey visual panel | TEST (local): three rounded cards with the nav solution looks (shared module), the mock directly on the surface, no hairline frame; open button and text follow the surface | The solutions section should carry the identity the nav gives each solution (v1.40.0) |
| 2026-10-06 | `components.nav.logo` | logo linked to "/" | logo links to #inicio (the hero) | Clicking the logo must take the visitor to the hero (v1.39.0) |
| 2026-10-06 | `mega-menu.visual-column` (Casos destacados) | grey column with a dot grid, a small muted link and three stacked cards | inset card on light blue with the module grid and a glow (as the software card), an h4 heading link with a description, and the stacked cards on top | Give the featured cases column hierarchy, in the style of the solutions menu (v1.38.0) |
| 2026-10-06 | `mega-menu.solution-cards` (AI texture) | a 28px square grid with five lit cells in blue | a 20px square grid with no lit cells or color accents | Remove the colored cells and make the squares smaller (v1.37.0) |
| 2026-10-06 | `mega-menu.solution-cards` (AI texture) | rows of generated-text bars with a square caret | a 28px square grid (horizontal and vertical hairlines) with five lit cells in the blue ramp | The text lines did not convince either; a grid that makes squares, as in the cloud card but with vertical lines (v1.36.0) |
| 2026-10-06 | `components.nav.adaptive-theme`, `case-media` | the case stages declared data-nav-theme blue, so the bar turned blue while crossing them | the stages declare nothing: the section color predominates, so over the white Cases section the bar stays normal | Team decision: the color of the section rules, not the color of the resources inside it (v1.35.0) |
| 2026-10-06 | `components.nav.adaptive-theme`, `case-media` | the bar stayed light over the dark case stages (the Cases section is light) | the case stages declare data-nav-theme blue, so the bar adopts Excellence Blue while it crosses them | The rule is the color under the bar, also for dark blocks inside light sections (v1.34.0) |
| 2026-10-06 | `mega-menu.solution-cards` (AI texture) | 45-degree white hairlines on the AI card | rows of generated-text bars with a square caret (the module) | The diagonal lines did not convince; propose a texture that speaks of an assistant writing (v1.33.0) |
| 2026-10-06 | `components.nav.bg`, `adaptive-theme` | two themes: light and dark (always Excellence Blue) | three themes that follow the section color: light, blue (Excellence) and black (Elaniin Black); sections declare data-nav-theme blue or black | Over the black research band the bar stayed blue; it must adopt the section color (v1.32.0) |
| 2026-10-06 | implementation notes (body `overflow-x`) | `overflow-x: hidden` on body | `overflow-x: clip` | The sticky nav left the screen when the mobile menu was opened while scrolled; found while testing the adaptive nav (v1.31.0) |
| 2026-10-06 | `components.nav` (glass bg, adaptive-theme), `mega-menu.types.solutions`, `mega-menu.solution-cards` (new) | nav: opaque white bar; solutions menu: three hairline columns on white with no color | nav: surface at 80% with backdrop blur 8px that switches light/dark by the section behind it (data-nav-theme blue or black on the research band, the CTA and the footer); solutions menu: three inset cards, each with its own surface, pattern and accent (light blue + module grid, Excellence Blue + diagonal lines, Inspire Grey + layer lines) | After the Laravel Cloud nav (read from the live page) and its per-product color and pattern; give each solution more presence (v1.31.0) |
| 2026-10-06 | `typography` (small details become OPT-IN), `mega-menu.heading`, `logo-strip.label`, `metric.label`, `newsletter-form.legal`, `footer` legal row, `research-row.source`; assumption 14 | Geist Mono applied by default to small descriptive text and details (v1.29.0) | those texts are back in DM Sans; Geist Mono stays for tags and badges, eyebrows (if needed), code, and the research list filters and date (explicitly requested); small details in mono only if the team asks | The mono applied everywhere broke several layouts and read badly in the footer (v1.30.0) |
| 2026-10-06 | `colors.brand.excellence-blue`, `colors.surface.dark` and `surface.code`, `blue-ramp.900`, `blue-ramp active-dark`, `shadow.focus-on-dark`, `motifs.blue-steps`, contrast table, assumption 2 | Excellence Blue `#011E3D`; code surface `#01172E`; dark button active `#01152B` | Excellence Blue `#01172E` everywhere (case stages, CTA, footer, ramp 900, focus gap); the code surface is now the same color; dark button active `#010F20`; contrast recomputed | Team decision: the darker blue reads more high-tech (v1.29.0) |
| 2026-10-06 | `typography` (label and detail tokens, mono rules), `components.tag`, `status-badge`, `mega-menu.heading`, `logo-strip.label`, `footer` legal row, `newsletter-form.legal`, `metric.label`, research dates and sources; assumption 14 | Geist Mono only for code, plus the research filters and kind tags | Geist Mono for tags and badges, eyebrows (if needed), small descriptive details and code; labels in uppercase, descriptive lines in normal case; case scenes and solution mocks stay sans | Team decision on the use of the mono (v1.29.0) |
| 2026-10-06 | `typography` (mono exception), `components.research-grid.toolbar`, `research-row.meta`; Geist Mono loaded | filters in DM Sans lead size, kind tags in DM Sans | filters and kind tags in Geist Mono uppercase, smaller (14px and 13px, tracking-wider); active filter gets a 1px underline; documented as the single exception to the code-only rule | Review: smaller mono uppercase labels as a detail for the research list (v1.28.0) |
| 2026-10-06 | `components.research-grid`, `research-row`; `research-card`, `research-cover` and the view switch removed | covers view plus list view; list order: kind and date, name, figure | list only; reading order figure, name, kind and date; the kind is an outlined tag instead of a dot separator; no gradients or art | The cover view competed with the gradients and motion of the cases and the CTA; the list is cleaner (v1.27.0) |
| 2026-10-06 | `components.research-grid`, `research-card` (new), `research-row` (new), `research-cover` (new); `proportion-modules` and its Elevate Blue entry removed | grey band, four hairline columns with a counted figure and a row of 10 proportion modules | Elaniin Black band; filter tabs and a cover or list view switch; each finding gets a generated cover in the blue ramp with the figure on it; the proportion modules are gone | Refs from other research hubs: covers plus list view; the section felt thin (v1.26.0) |
| 2026-10-06 | `components.cases-grid`, `case-card`, `case-media`, `case-media.compositions` | five cases: wide + narrow, then three cards of a third | four cases mirrored: wide + narrow, narrow + wide; all stages 384px; the mobile-rating case removed; the cloud console gains a two-column layout for the wide slot | Five cases felt saturated; keep four with the alternating order (v1.25.0) |
| 2026-10-06 | `components.cta`, `motifs.glow` (two uses again, variant cta adapted to dark), `motifs.perspective-grid` removed | dark centered window card over a perspective grid with lighting cells (Nightwatch layout) | back to the left-aligned CTA with the blue stripe glow on the right, now on surface-code (#01172E) and with the module grid in on-dark colors; copy reduced to an h2 title, one line and two buttons | The Nightwatch layout did not fit the brand style; keep the darker blue and the shorter copy (v1.24.0) |
| 2026-10-06 | `components.cta.card-body` | h1 title, lead sentence, buttons and a caption line | h2 title, one body-lg line, buttons; caption removed; tighter padding | Less text and a quieter title in the closing CTA (v1.23.0) |
| 2026-10-06 | `motifs.perspective-grid` (was `motifs.perspective-tunnel`), `components.cta` | Nightwatch effect copied: five frames growing from one vanishing point, fan lines converging to it | perspective room with fan lines from the inner rectangle to the edges (no single vanishing point), static perspective frames, and about 310 cells of which a quarter light up one by one in discrete steps of the blue ramp; band is taller on desktop | Make the effect ours: a grid whose cells light up, lines that are not bunched together (v1.22.0) |
| 2026-10-06 | `components.cta` (layout), `motifs.perspective-tunnel` (new), `motifs.glow` (media only), `motifs.icon-glow` removed | light CTA with a text block on the left and the icon glow on the right | dark Excellence Blue band with a centered window card (36px bar with three dashes) over a perspective tunnel: soft gradients, growing concentric frames and fan lines; read from the live Laravel Nightwatch CTA; footer gets a top hairline | The glow experiments in the CTA were rejected; adopt the Nightwatch layout (v1.21.0) |
| 2026-10-06 | `motifs.icon-glow` (was `motifs.square-glow`), `components.cta.background` | scattered square glow on the right side of the CTA | the squares now form the brand symbol (11 modules on a 5 x 6 grid) with a traveling wave of light, fluid cell size, no edge masks | Idea from review: let the effect draw the icon (v1.20.0) |
| 2026-10-06 | `motifs.square-glow`, `components.cta.background` | square glow spread across the whole CTA width, passing under the text (13 columns, bottom-right mask) | glow confined to the right 42% of the container (7 columns), left side empty, hidden below 1024px | Review: it should not pass under the text; focus on the right side (v1.19.0) |
| 2026-10-06 | `motifs.square-glow`, `components.cta.background`; `motifs.wash` removed, `components.hero.background` | hero wash (drifting blue wash through the module grid) and the stripe glow in the CTA | hero back to the grey module grid only (wash rejected); CTA test with a glow made of soft squares in the blue ramp with a traveling wave of light | The wash did not fit the hero; try the CTA glow with squares instead of ovals (v1.18.0) |
| 2026-10-06 | `motifs.wash`, `components.hero.background`, `colors.elevate-blue-usage` | hero: grey module grid only; glow only in the CTA and case stages (Laravel stripe technique) | hero test: drifting blue wash seen through the module grid, plus a faint continuous fill; proposed to replace the stripe glow everywhere if approved | Make the glow our own: palette from our ramp, texture from our modules, instead of a copy of the reference technique (v1.16.0) |
| 2026-10-06 | `components.footer`; `shadow.focus-on-black` removed | Elaniin Black surface (test) with a black-gap focus ring | back to Excellence Blue; the single giant wordmark and the lowercase copyright stay; the focus-on-black token is removed | Elaniin Black test not approved (v1.15.0) |
| 2026-10-06 | `components.footer`; `shadow.focus-on-black` | Excellence Blue surface, small white lockup above the tagline plus the giant wordmark, copyright in capitals | Elaniin Black surface (test), only the giant wordmark as logo, copyright in lowercase; new focus ring with a black gap for this surface | Double logo was redundant; try the neutral black for the footer (v1.14.0) |
| 2026-10-06 | `components.cases-grid.header.action` | button.secondary lg "Ver todos los casos" | tertiary text link with arrow, same as the research header | The hero no longer links to the cases; both section headers use the same quiet link (v1.13.0) |
| 2026-10-06 | `components.hero.actions`; mega-menu Resources content | hero with primary + secondary ("Ver casos"); Resources menu without the research section | hero keeps only the primary button; "Investigaciones" (microscope icon) added to the Explore column after "Casos"; menu rows for Casos and Investigaciones point to their page sections | Less competing actions in the hero; the new research section gets a place in the nav (v1.12.0) |
| 2026-10-06 | `components.research-grid`, `research-item`, `proportion-modules`; `colors.elevate-blue-usage` | n/a | added the own-research section after the cases: grey band, 4 hairline columns with a counted key figure, proportion modules, finding sentence, source and link; proportion modules added to the Elevate Blue allowed list | New vision: show own research with its key data (v1.11.0) |
| 2026-10-06 | `components.solution-card`, `solution-dialog` header; section 3 rule; section 9 | tag `01 · Software`, `02 · IA`, `03 · Cloud` | icon-box with the nav icon plus the plain name (Software, IA, Cloud), same in the dialog; new rule: no decorative numbering | Numbered labels read as generic AI-template decoration; unify with the nav icons (v1.10.0) |
| 2026-10-05 | `components.case-media` (scenes, compositions, scene-timelines) | three smaller cases kept the centered mock card (support results, cost bars, rating) | the three smaller cases are product scenes too (AI support conversation, cloud cost console, mobile rating flow with store rating card); CaseMedia always bleeds; mock card, count-up cycle hook and old visuals removed from the cases | Approved scenes applied to the rest of the cases (v1.9.0) |
| 2026-10-05 | `components.case-media` (scenes, client-accent, scene-timelines), `case-card.logo-chip`; `radius.device` | dashboard-like mock cards on the two large cases | product scenes (dispatch app, sign-up flow on a phone) that bleed off the stage; per-client accent from the logo applied only inside the scene; new radius for phone frames; NumberFlow for live figures | Cases felt like generic dashboards; treat them as product UX/UI (v1.8.0) |
| 2026-10-05 | `typography` (mono, eyebrow, tag, mono-data), `components.tag`, `status-badge`, `mega-menu.heading`, solutions and cases headers, `metric` | Geist Mono for eyebrows, tags, data and labels; eyebrow above each section heading | one criterion: Geist Mono only for code; tags, badges, labels and figures in DM Sans or Instrument Sans; eyebrows removed from every section and replaced by plain labels in the menus; Geist Mono no longer loaded; tokens `eyebrow`, `tag`, `mono-data` replaced by `label` | Team decision: extend the no-mono test to the whole site and avoid eyebrows as decoration (v1.7.0) |
| 2026-10-05 | `components.cases-grid`, `case-card`, `case-media`; page order | 3 equal cards, after the solutions | 5 cases in a 12-column grid (7 + 5 on top with taller stages and composed visuals, then 4 + 4 + 4); header at display-lg; cases moved above the solutions; two new cases (cloud migration, mobile app rating) and a fifth placeholder logo | Give the cases more weight; the proof comes first (v1.7.0) |
| 2026-10-05 | `components.case-media` (mock typography), `case-card` (sector tag) | Geist Mono for labels, numbers and tag | text family only: DM Sans labels and figures, Instrument Sans headline number, DM Sans sector tag; mono toggle removed | Typography test approved: no mono in the case cards (v1.6.2) |
| 2026-10-05 | `components.case-media`, `case-card` | module texture on the stage; mock height depended on its content (logistics card was shorter) | no texture; every mock is 320x240 with a flexible chart area; per-case mono flag, first case set to the text family as a typography test | Review of the cases section (v1.6.1) |
| 2026-10-05 | `components.cases-grid`, `case-card`, `case-media`; `motifs.glow` variant media | n/a | added the case-study section: dark Excellence Blue stage, animated blue gradient, three animated charts, client logo chip and "Leer el caso" link; glow now has a dark variant and a second sanctioned use | Section 05 Cases (v1.6.0) |
| 2026-10-05 | `motifs.module-field`, `components.hero.background` | hero 3px squares at 80%, CTA 2px at 45% (two variants) | one configuration everywhere: 2px at 45%, trail 2/3/3px | The subtle texture was approved for the CTA and applied to the hero; variants removed (v1.5.6) |
| 2026-10-05 | `motifs.module-field` variants, `components.cta.background` | CTA used the hero grid (3px, 80%) | CTA uses a subtle variant (2px, 45%, smaller pointer trail); hero unchanged | The CTA texture competed with the glow (v1.5.5) |
| 2026-10-05 | `public/assets/favicon.svg`, `src/app/icon.svg` | symbol at about 45% of the square | updated file from the team, symbol larger (about 60%) | Better legibility at tab size (v1.5.4) |
| 2026-10-05 | `motifs.glow`, `components.cta.background` | three blobs drifting with translate/scale/opacity | scrolling diagonal stripes in two layers at different speeds (the reference's technique), 30% opacity, one 12px blur, edge masks | Analysis of the Laravel Cloud pricing glow; smoother and seamless (v1.5.3) |
| 2026-10-05 | `colors.brand.*` | n/a | no value changed | Team supplied the corrected palette (Elevate `#1054FF`, Inspire `#F0F0F3`, Excellence `#011E3D`, Black `#141414`, Dynamic `#4D75FD`); all five already matched. Assumptions 2 and 3 closed (v1.5.2) |
| 2026-10-05 | `motifs.glow` (replaces `motifs.module-glow`), `components.cta.background` | halftone glow made of squares | soft blue glow (layered radial gradients, slow drift), allowed in the CTA only; rules on gradients and glows updated | The square glow was judged low quality; explicit request for a blue glow (v1.5.1) |
| 2026-10-05 | `components.solution-dialog`, `cta`, `footer`, `newsletter-form`; solution card action | link arrow; no CTA/footer spec | expand button opening an accessible dialog; CTA with square glow; dark footer with newsletter, socials and watermark | Sections 05 CTA and 06 Footer, and the expandable cards (v1.5.0) |
| 2026-10-05 | `components.solutions-grid`, `solution-card`, `visual-panel`; implementation rules for animated mocks | n/a | added; global motion provider, tokens mirror for JS | Section 04 Solutions (v1.4.0) |
| 2026-10-05 | `components.hero.background`, `motifs.module-field` | 16px dot grid, smooth radial highlight | 3px square module field, stepped cell-by-cell highlight with fade trail | Align the hero effect with the square modules of the logo (v1.3.1) |
| 2026-10-05 | `components.hero`, `components.logo-strip`, type clamps | n/a / clamps reached desktop size only at ~2000px | added both; clamps now hit the desktop value at 1280px and the mobile value at 768px | Sections 02 and 03 (v1.3.0). The Laravel hero's soft blue glow and black primary button are intentionally not used |
| 2026-10-05 | `components.nav.cta` | primary + sign-in link + search field | primary only | Nav review: remove search and sign-in (v1.2.1) |
| 2026-10-05 | `components.mega-menu` | n/a | added (standard and solutions types, behavior, mobile sheet) | Section 01 Nav (v1.2.0) |
| 2026-10-05 | assets paths, implementation notes | `assets/` | `public/assets/`; added section 12 (Next.js, Tailwind v4 `@theme`, motion) | Moved from the static test to the real Next.js project (v1.1.1) |
