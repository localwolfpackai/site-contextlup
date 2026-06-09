---
title: Coding Style
description: How code should be written for me — typed, modular, server-first, and clean before it ships.
sidebar:
  order: 2
node:
  pillar: directives
  id: coding-style
  summary: Code standards — strict TypeScript, kebab-case files, one component per file, server-first React, validation at the boundary, and a non-negotiable cleanup pass.
  facts:
    language: TypeScript
    framework: Next.js (App Router) / Astro
    styling: Tailwind v4
    package_manager: npm
    component_library: shadcn/ui
    validation: Zod
    file_case: kebab-case
    soft_line_limit: "200"
    hard_split_at: "300"
  rules:
    - rule: TypeScript everywhere. No `any` — use `unknown` and narrow it. Annotate return types on exported functions.
      why: Types are the cheapest documentation and the earliest bug-catch. `any` discards both; `unknown` keeps the guardrail while admitting you don't know yet.
    - rule: Name files in kebab-case. Components export PascalCase from kebab-case files (button.tsx exports Button). Tests mirror the source (button.test.tsx).
      why: Lowercase filenames never break across case-sensitive systems, and a predictable mapping means the file is findable without searching.
    - rule: One component per file. Soft limit 200 lines; at 300, split without asking.
      why: A file that does one thing is reviewable at a glance. If a component needs a comment to explain what it does, it wants to be two components.
    - rule: Server Component is the default in Next.js. Add `use client` only for state, effects, browser APIs, or event listeners — and push it as far down the tree as possible.
      why: Shipping less JavaScript is faster and simpler. Most interactivity lives at the leaves; marking a whole subtree client-side is usually a mistake.
    - rule: Validate all external input at the boundary with Zod — API responses, form input, env vars.
      why: A typed boundary means the inside of the app can trust its data. Validation at the edge turns a class of runtime surprises into a single, locatable failure.
    - rule: Replace magic numbers with named constants and nested ternaries with early returns. Search utils/ before writing a new helper.
      why: Naming a value explains it. Early returns flatten logic you'd otherwise have to unwind in your head. Duplicate helpers are how a codebase forgets itself.
    - rule: Never use innerHTML / dangerouslySetInnerHTML with unsanitized content, never interpolate variables into shell commands, never build SQL from external input.
      why: These are the three classic injection paths. They're not edge cases — they're the default way these bugs get written when you're moving fast.
    - rule: Clean up before calling it done — remove console.log and debug crumbs, delete dead code, split oversized files. Cleanup is not optional, even on bug fixes.
      why: Skipped cleanup accretes silently until the codebase feels heavy. The pass is cheap if it's habitual and expensive if it's deferred.
    - rule: Never use --no-verify, --force, or other safety-bypass flags unless explicitly asked.
      why: Those flags exist to skip the checks that catch mistakes. Reaching for one to make an error go away usually buries the error instead.
  tags: [typescript, react, nextjs, conventions, security, cleanup]
---

I'm the creative director, not the one writing every line — so the code has to be legible to me and maintainable without me. That shapes all of this: clarity over cleverness, structure over sprawl, and a clean state before anything ships.

## TypeScript, strictly

No `any`. If a type is genuinely unknown, it's `unknown` and gets narrowed. Exported functions carry their return types. I'd rather the compiler catch a mistake than discover it in the browser, and types are the cheapest documentation a future reader gets.

## Naming & structure

Files are kebab-case, always — lowercase never breaks. A `button.tsx` exports `Button`; its test is `button.test.tsx`. One component per file, no exceptions. The soft limit is 200 lines; at 300 it gets split without a conversation. The tell: if a component needs a comment to explain what it is, it's actually two components wearing one name.

## Server-first React

In Next.js the Server Component is the default. `"use client"` only appears when there's real interactivity — state, effects, a browser API, an event listener — and it gets pushed as far down the tree as it'll go. The goal is to ship less JavaScript and keep data-fetching on the server where it belongs.

## Validation at the boundary

Every piece of external input — API responses, form data, environment variables — gets validated with Zod at the edge. Once data is past the boundary, the rest of the app can trust it. That trade (one strict checkpoint for confidence everywhere inside) is almost always worth it.

## Security floor

Three things I never do, because they're how these bugs actually get written under time pressure: inject unsanitized content via `innerHTML` or `dangerouslySetInnerHTML`, interpolate variables straight into shell commands, or build SQL from external input. These aren't exotic — they're the defaults to avoid.

## Cleanup is part of the work

Before anything is "done": debug logs gone, dead code deleted, oversized files split, linter passing. This holds for bug fixes too. Cleanup skipped is debt taken on quietly, and it compounds. And the safety-bypass flags — `--no-verify`, `--force` — stay in the drawer unless I've asked for them by name.
