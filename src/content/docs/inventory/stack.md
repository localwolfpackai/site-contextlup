---
title: Stack
description: The approved parts — the tools and technologies I reach for by default.
sidebar:
  order: 1
node:
  pillar: inventory
  id: stack
  summary: The default toolset an agent is cleared to use — framework, language, styling, components, data, and deploy targets.
  facts:
    framework: [Next.js (App Router), Astro, React, Vite]
    language: TypeScript
    styling: Tailwind v4
    components: shadcn/ui
    primitives: Radix UI
    icons: Lucide (1px)
    toasts: sonner
    drawers: vaul
    theming: next-themes
    data: Postgres (Supabase or Neon)
    deploy: [Vercel, Cloudflare, Netlify]
    package_manager: npm
  rules:
    - rule: Default to Next.js App Router for apps, Astro for content and docs sites. React + Vite for standalone components.
      why: Each fits a shape. Astro ships near-zero JS for content; Next handles the app surface. Matching the tool to the shape avoids fighting the framework.
    - rule: Check whether a shadcn/ui component exists before building a UI primitive from scratch. Drop to Radix for headless needs.
      why: shadcn gives a styled, accessible starting point I already trust. Rebuilding it by hand is slower and usually less accessible.
    - rule: Postgres is the default datastore, usually via Supabase or Neon. Don't reach for a different paradigm without a reason.
      why: A boring, well-understood default removes a decision and a class of surprises. Novelty in the datastore rarely pays for itself.
    - rule: Use npm. Self-host fonts (Geist, Inter via Fontsource) rather than pulling from a font CDN.
      why: One package manager keeps lockfiles sane. Self-hosted fonts are faster, private, and don't add a third-party dependency to render text.
  tags: [stack, tools, framework, data, deploy]
---

These are the parts I've already vetted — the components an agent is cleared to assemble without checking back. The point of fixing a stack isn't dogma; it's that a known set of pieces removes a dozen small decisions per project and lets the energy go into the work that's actually unique.

## Framework & language

TypeScript, always. For the framework, it's horses for courses: **Next.js (App Router)** for application surfaces, **Astro** for content and documentation sites (this site is Astro), and **React + Vite** when I need a standalone component or a quick sandbox. Matching the tool to the shape of the thing beats forcing one framework to do everything.

## UI

**shadcn/ui first** — before building any primitive, the move is to check whether it already exists there. It's styled, accessible, and I trust it. When I need something headless, I drop straight to **Radix**. Icons are **Lucide** at 1px weight. Toasts are **sonner**, drawers are **vaul**, theming is **next-themes**. Tailwind v4 for styling throughout.

## Data

**Postgres** is the default, usually through **Supabase** or **Neon**. I don't reach for a different database paradigm unless there's a real reason — a boring, well-understood datastore is a feature, not a limitation.

## Deploy & tooling

**Vercel**, **Cloudflare** (Workers/Pages), or **Netlify** depending on the project. **npm** as the package manager. Fonts get **self-hosted** via Fontsource rather than loaded from a CDN — it's faster, it's private, and it keeps text rendering from depending on a third party.
