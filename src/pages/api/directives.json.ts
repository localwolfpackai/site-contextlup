import type { APIRoute } from 'astro';
import { getNodesByPillar, flattenRules, jsonResponse, PROTOCOL_VERSION } from '../../lib/protocol';

/**
 * GET /api/directives.json — every hard constraint, flattened.
 * The directives pillar is the non-negotiable layer. This endpoint collapses
 * it into one applicable rule list so an agent can load constraints in a single
 * fetch without walking the tree.
 */
export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? '';
  const directiveNodes = await getNodesByPillar('directives');
  const rules = flattenRules(directiveNodes).map((r) => ({
    ...r,
    path: `${base}${r.path}`,
  }));

  return jsonResponse({
    pillar: 'directives',
    version: PROTOCOL_VERSION,
    summary: 'Non-negotiable constraints. Every output must respect these.',
    rule_count: rules.length,
    rules,
  });
};
