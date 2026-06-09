import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

/**
 * ContextLup content model — one source of truth, two surfaces.
 *
 * Every page is a Starlight doc (humans get the sidebar, search, and prose).
 * Pages that also carry a `node` block in their frontmatter become machine-
 * readable Context Nodes: the JSON API at /api/* serializes that block, so a
 * rule is authored once and never drifts between the docs and the agent API.
 */

const pillar = z.enum(['directives', 'mental-models', 'inventory', 'references']);

/** A single atomic rule an agent can apply. The `why` is the high-signal part. */
const rule = z.object({
  // The directive itself — imperative, machine-applicable.
  rule: z.string(),
  // Why it exists. This is what lets an agent generalize instead of pattern-match.
  why: z.string().optional(),
  // Optional provenance — a URL or reference this rule was distilled from.
  source: z.string().optional(),
});

/** A curated external reference with the reason it earns a place in the graph. */
const reference = z.object({
  title: z.string(),
  url: z.url(),
  // The "Lupo Note" — not what the link is, but why it's referenced.
  note: z.string(),
  tags: z.array(z.string()).default([]),
});

/** The machine-readable block. Presence of this is what makes a doc a Context Node. */
const node = z.object({
  pillar,
  // Stable id used in the manifest/graph (defaults to the slug if omitted).
  id: z.string().optional(),
  // One-line, agent-facing summary of what this node governs.
  summary: z.string(),
  // Atomic, applicable rules.
  rules: z.array(rule).default([]),
  // Curated references (used mainly by the inventory/references pillars).
  references: z.array(reference).default([]),
  // Free-form key/value facts (e.g. preferred_stack, spacing_unit).
  facts: z.record(z.string(), z.union([z.string(), z.array(z.string())])).default({}),
  tags: z.array(z.string()).default([]),
});

export type ContextNode = z.infer<typeof node>;
export type ContextRule = z.infer<typeof rule>;
export type ContextReference = z.infer<typeof reference>;

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        node: node.optional(),
      }),
    }),
  }),
};
