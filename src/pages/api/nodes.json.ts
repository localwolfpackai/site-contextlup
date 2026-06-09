import type { APIRoute } from 'astro';
import { getNodes, jsonResponse, PROTOCOL_VERSION } from '../../lib/protocol';

/**
 * GET /api/nodes.json — the full graph.
 * Every Context Node across every pillar, with absolute paths. This is the
 * complete machine surface for an agent that wants everything at once.
 */
export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? '';
  const nodes = (await getNodes()).map((n) => ({ ...n, path: `${base}${n.path}` }));

  return jsonResponse({
    version: PROTOCOL_VERSION,
    node_count: nodes.length,
    nodes,
  });
};
