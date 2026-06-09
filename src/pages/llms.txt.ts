import type { APIRoute } from 'astro';
import { getNodes, PILLARS, PILLAR_INTENT, PROTOCOL_VERSION, IDENTITY_NAME } from '../lib/protocol';

/**
 * GET /llms.txt — the plain-text map of the brain.
 * Follows the llms.txt convention: a Markdown index an agent can read in one
 * request to understand the whole surface before deciding what to fetch.
 */
export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? '';
  const nodes = await getNodes();

  const lines: string[] = [
    `# ContextLup — The ${IDENTITY_NAME} Protocol v${PROTOCOL_VERSION}`,
    '',
    '> A machine-readable knowledge surface. Not a portfolio of what was built — a map of how its author thinks, what they value, and the system they build with. Load the manifest, then apply the directives to your output.',
    '',
    '## Start here',
    '',
    `- [Manifest (JSON)](${base}/api/manifest.json): the index — identity, pillars, and links to every endpoint`,
    `- [Identity (JSON)](${base}/api/identity.json): core directive and design DNA`,
    `- [Directives (JSON)](${base}/api/directives.json): every hard constraint, flattened`,
    `- [Nodes (JSON)](${base}/api/nodes.json): the full graph of Context Nodes`,
    '',
  ];

  for (const pillar of PILLARS) {
    const pillarNodes = nodes.filter((n) => n.pillar === pillar);
    if (pillarNodes.length === 0) continue;
    const heading = pillar.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
    lines.push(`## ${heading}`, '', `${PILLAR_INTENT[pillar]}`, '');
    for (const n of pillarNodes) {
      lines.push(`- [${n.title}](${base}${n.path}): ${n.summary}`);
    }
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
