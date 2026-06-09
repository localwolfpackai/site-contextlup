import type { APIRoute } from 'astro';
import { getNodes, jsonResponse, PROTOCOL_VERSION, IDENTITY_NAME } from '../../lib/protocol';
import type { ContextRule } from '../../content.config';

/**
 * GET /api/identity.json — the core directive, served as data.
 * This is the "system prompt for the digital self": who, the operating
 * philosophy, the design DNA, and the top-level constraints.
 */
export const GET: APIRoute = async () => {
  const nodes = await getNodes();
  const identity = nodes.find((n) => n.id === 'identity');
  const design = nodes.find((n) => n.id === 'design-rules');
  const coding = nodes.find((n) => n.id === 'coding-style');

  return jsonResponse({
    identity: {
      name: IDENTITY_NAME,
      version: PROTOCOL_VERSION,
      core_philosophy: identity?.facts.core_philosophy ?? 'High-signal, low-noise, system-oriented.',
      primary_goal: identity?.facts.primary_goal ?? 'Optimize for clarity and architectural precision.',
    },
    design_dna: {
      spacing: design?.facts.spacing_system ?? '8pt grid',
      typography: [design?.facts.type_pairing, design?.facts.mono].filter(Boolean),
      aesthetics: design?.facts.aesthetic ?? 'Calm, technical, high-contrast',
      default_mode: identity?.facts.default_mode ?? 'Light mode, mobile-first',
    },
    preferred_stack: coding
      ? [coding.facts.framework, coding.facts.language, coding.facts.styling, coding.facts.component_library].filter(
          Boolean,
        )
      : ['Next.js', 'Astro', 'TypeScript', 'Tailwind', 'shadcn/ui'],
    operational_constraints: (identity?.rules ?? []).map((r: ContextRule) => r.rule),
    instruction:
      'Apply these before producing output. When ambiguous, default to the calm, technical, high-contrast aesthetic. See /api/directives.json for the full constraint set.',
    status: 'Operational',
  });
};
