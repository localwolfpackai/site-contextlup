import type { APIRoute } from 'astro';
import {
  getNodes,
  jsonResponse,
  PILLARS,
  PILLAR_INTENT,
  PROTOCOL_VERSION,
  IDENTITY_NAME,
} from '../../lib/protocol';

/**
 * GET /api/manifest.json — the entry point for any agent.
 * Returns identity, the four pillars (with their nodes), and links to every
 * other endpoint. An agent should load this first and follow what it needs.
 */
export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? '';
  const nodes = await getNodes();

  const pillars = PILLARS.map((pillar) => ({
    pillar,
    intent: PILLAR_INTENT[pillar],
    nodes: nodes
      .filter((n) => n.pillar === pillar)
      .map((n) => ({ id: n.id, title: n.title, summary: n.summary, path: `${base}${n.path}` })),
  }));

  return jsonResponse({
    name: 'Lupo Protocol',
    identity: IDENTITY_NAME,
    version: PROTOCOL_VERSION,
    description:
      'A machine-readable knowledge surface. Load this first, then follow the endpoints below to instantiate the methodology.',
    instruction:
      'Load /api/identity.json for the core directive, /api/directives.json for hard constraints, then apply them to all output. Each rule carries a `why` — use it to generalize, not just pattern-match.',
    endpoints: {
      identity: `${base}/api/identity.json`,
      directives: `${base}/api/directives.json`,
      nodes: `${base}/api/nodes.json`,
      llms_txt: `${base}/llms.txt`,
    },
    pillars,
    node_count: nodes.length,
  });
};
