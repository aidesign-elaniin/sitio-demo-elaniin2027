@AGENTS.md

# Elaniin 2027 website

Read `DESIGN.md` (repo root) before writing or changing any UI. It is the single source of truth for the brand.

## Rules
- Use only the tokens in `DESIGN.md`. They live in `src/app/globals.css` under `@theme` and are the only colors, radii, shadows, type sizes and breakpoints Tailwind knows about (defaults are reset on purpose). Never hard-code a hex value, px radius, shadow or font.
- If something is missing, propose a token, update `DESIGN.md` first (and its change log), then `globals.css`, then the code.
- Elevate Blue (`#1054ff`) is a **detail** color. Read `colors.elevate-blue-usage` in `DESIGN.md` before using it.
- Fonts: Instrument Sans (display), DM Sans (text), Geist Mono (eyebrows, tags, data). Loaded in `src/app/layout.tsx` through `next/font`.
- Content is dummy and in Spanish. Never invent real client names, figures or facts as if they were real.

## Stack
- Next.js (App Router, TypeScript), Tailwind CSS v4, `motion` (import from `motion/react`) for component animation, plain CSS for micro-interactions. GSAP only if a section needs scroll choreography that `motion` cannot do cleanly.
- Server Components by default. Add `"use client"` only for the leaf that needs interactivity or animation.
- Honor `prefers-reduced-motion` in every animation.

## Workflow
Build one section at a time, in the order the user shares them. After each section: check it at 375, 768, 1024 and 1280px, re-check contrast on any new color pair, then wait for approval before the next.

## Structure
- `src/components/ui/` reusable primitives (Button, Tag, Container...)
- `src/components/sections/` one file per page section
- `src/lib/` helpers and motion presets
- `public/assets/` logos and brand files
