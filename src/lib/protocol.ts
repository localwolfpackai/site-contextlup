import { getCollection, type CollectionEntry } from 'astro:content';
import type { ContextNode, ContextRule } from '../content.config';

/**
 * The protocol layer — the single bridge between authored Markdown and the
 * machine API. Every /api/* endpoint reads through here, so the shape an agent
 * sees is derived from the same content humans read. Change a rule once.
 */

export const PROTOCOL_VERSION = '1.0.0' as const;
export const IDENTITY_NAME = 'Lupo' as const;

/**
 * The one-line prompt — the site's primary call to action. The whole pitch:
 * point an agent here instead of re-explaining yourself. Built from the live
 * origin so the copyable text always references the right host.
 */
export function agentPrompt(origin: string): string {
  return `I'm working on [project]. Load ${origin}/api/manifest.json for my design DNA, constraints, and operating style, then apply them to everything you produce.`;
}

export type Pillar = ContextNode['pillar'];

export const PILLARS: readonly Pillar[] = [
  'directives',
  'mental-models',
  'inventory',
  'references',
] as const;

/** Human-readable framing for each pillar, surfaced in the manifest. */
export const PILLAR_INTENT: Record<Pillar, string> = {
  directives: 'How tasks must be executed — non-negotiable constraints.',
  'mental-models': 'How problems are approached — heuristics an agent can mimic.',
  inventory: 'The approved parts — tools, stacks, and resources in play.',
  references: 'Why these sources are referenced — a curated taste graph.',
};

type DocEntry = CollectionEntry<'docs'>;

/** A Context Node flattened into its machine-facing form, with routing info. */
export type SerializedNode = ContextNode & {
  /** Stable identifier (frontmatter `node.id`, else the doc slug). */
  id: string;
  /** Human page path, e.g. "/directives/design-rules/". */
  path: string;
  /** Page title from Starlight frontmatter. */
  title: string;
};

/** Strip a doc id down to a clean slug (drops numeric ordering prefixes). */
function toSlug(id: string): string {
  return id
    .split('/')
    .map((part) => part.replace(/^\d+[-_]/, ''))
    .join('/');
}

/** Build the canonical human path for a doc entry. */
function toPath(id: string): string {
  const slug = toSlug(id).replace(/\/index$/, '').replace(/^index$/, '');
  return slug ? `/${slug}/` : '/';
}

/** True when a doc carries a machine-readable node block. */
function hasNode(entry: DocEntry): entry is DocEntry & { data: { node: ContextNode } } {
  return entry.data.node !== undefined;
}

/**
 * Load every Context Node, sorted by pillar order then path for stable output.
 * Stable ordering matters: the JSON API should diff cleanly between builds.
 */
export async function getNodes(): Promise<SerializedNode[]> {
  const docs = await getCollection('docs');

  const nodes = docs.filter(hasNode).map((entry): SerializedNode => {
    const { node } = entry.data;
    return {
      ...node,
      id: node.id ?? toSlug(entry.id),
      path: toPath(entry.id),
      title: entry.data.title,
    };
  });

  return nodes.sort((a, b) => {
    const byPillar = PILLARS.indexOf(a.pillar) - PILLARS.indexOf(b.pillar);
    return byPillar !== 0 ? byPillar : a.path.localeCompare(b.path);
  });
}

/** Nodes for a single pillar. */
export async function getNodesByPillar(target: Pillar): Promise<SerializedNode[]> {
  const nodes = await getNodes();
  return nodes.filter((n) => n.pillar === target);
}

/** Every rule across all nodes, flattened and tagged with its origin node. */
export function flattenRules(
  nodes: SerializedNode[],
): Array<{ pillar: Pillar; node: string; path: string; rule: string; why?: string; source?: string }> {
  return nodes.flatMap((n) =>
    n.rules.map((r: ContextRule) => ({
      pillar: n.pillar,
      node: n.id,
      path: n.path,
      rule: r.rule,
      why: r.why,
      source: r.source,
    })),
  );
}

/** JSON Response with long-lived caching — the API is rebuilt on deploy, not per-request. */
export function jsonResponse(data: unknown): Response {
  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
