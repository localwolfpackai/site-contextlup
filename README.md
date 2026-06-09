# ContextLup

A machine-readable knowledge surface. The **Lupo Protocol** — served to humans as documentation, and to agents as an API.

Most portfolios show the result: *here is what I built*. This one shows the engine — the rules, the logic, and the taste that produce the work. Point an agent at it and it doesn't read a résumé; it loads a methodology.

## The idea: one source, two surfaces

Every page is a single Markdown file. Pages that carry a structured `node` block in their frontmatter become **Context Nodes** — and that same block is what the JSON API serializes. Author a rule once; the human prose and the machine API are both projections of it. They can't drift, because there's only one copy.

```
Markdown frontmatter  ──┬──►  Human docs (Starlight UI: sidebar, search, prose)
   (the node block)     └──►  Agent API (/api/*.json, /llms.txt)
```

## The four pillars

| Pillar | What it holds |
| --- | --- |
| **Directives** | Hard, non-negotiable constraints — design rules, coding style, behavioral rules. |
| **Mental Models** | How problems get approached — heuristics an agent can mimic. |
| **Inventory** | The approved parts — the stack and resources in play. |
| **References** | Curated taste — each reference paired with *why* it earns its place. |

## The agent API

Generated at build time from the content collection:

| Endpoint | Returns |
| --- | --- |
| `/api/manifest.json` | The index — identity, pillars, and links to every endpoint. Start here. |
| `/api/identity.json` | Core directive and design DNA. |
| `/api/directives.json` | Every hard constraint, flattened into one applicable rule list. |
| `/api/nodes.json` | The full graph of Context Nodes. |
| `/llms.txt` | A plain-text map of the whole surface, following the llms.txt convention. |

Each rule carries a `why`. That field is the high-signal part — it's what lets an agent generalize to a case the rule didn't anticipate.

## Stack

- **[Astro](https://astro.build)** + **[Starlight](https://starlight.astro.build)** — content-first, ships near-zero JS, semantic HTML an agent can parse.
- **TypeScript**, strict. **Zod** schemas validate every Context Node at build time.
- **Geist / Inter** (self-hosted via Fontsource). Calm, technical, high-contrast. Light-first.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output to ./dist
npm run check      # astro check — type + content validation
```

## Add a Context Node

Create a Markdown file under `src/content/docs/<pillar>/` and give it a `node` block:

```markdown
---
title: My Rule
description: One line for humans.
node:
  pillar: directives          # directives | mental-models | inventory | references
  summary: One line for agents.
  rules:
    - rule: The thing to do.
      why: Why it matters — the part that generalizes.
  facts:
    some_key: some value
  tags: [example]
---

The human-facing prose goes here.
```

On the next build it appears in the sidebar, the search index, and every relevant JSON endpoint automatically. The schema lives in [`src/content.config.ts`](src/content.config.ts); the serialization logic in [`src/lib/protocol.ts`](src/lib/protocol.ts).

## Project layout

```
src/
├── content/docs/        Context Nodes (Markdown — the single source of truth)
│   ├── identity.md
│   ├── agent-protocol.md
│   ├── directives/
│   ├── mental-models/
│   └── inventory/
├── lib/protocol.ts      Reads the collection, shapes the machine surface
├── pages/
│   ├── api/*.json.ts     JSON endpoints
│   └── llms.txt.ts       Plain-text map
├── styles/contextlup.css Design system (overrides Starlight tokens)
└── content.config.ts     Zod schema for the node block
```
