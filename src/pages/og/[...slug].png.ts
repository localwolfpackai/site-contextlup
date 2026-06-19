import type { APIRoute, GetStaticPaths } from 'astro';
import { getNodes } from '../../lib/protocol';
import { renderOgCard, type OgCard } from '../../lib/og';

/**
 * Build-time OG image generation. One branded card per page:
 *   /og/default.png                     → the home / fallback card
 *   /og/directives/coding-style.png     → that node's card
 *
 * Cards are filled from the same content collection the docs and agent API
 * read, so the social preview, the prose, and the JSON never drift.
 */

// Eyebrow label per pillar, shown above the title on the card.
const PILLAR_LABEL: Record<string, string> = {
  directives: 'Directives',
  'mental-models': 'Mental Models',
  inventory: 'Inventory',
  references: 'References',
};

type OgRouteProps = { card: OgCard };

export const getStaticPaths: GetStaticPaths = async () => {
  const nodes = await getNodes();

  const nodeRoutes = nodes.map((node) => ({
    // "/directives/coding-style/" → slug "directives/coding-style"
    params: { slug: node.path.replace(/^\/+|\/+$/g, '') },
    props: {
      card: {
        title: node.title,
        eyebrow: node.id === 'identity' ? 'The Lupo Protocol' : PILLAR_LABEL[node.pillar],
        subtitle: node.summary,
      },
    } satisfies OgRouteProps,
  }));

  const defaultRoute = {
    params: { slug: 'default' },
    props: {
      card: {
        title: 'How I think — as an API.',
        eyebrow: 'The Lupo Protocol',
        subtitle: 'A machine-readable knowledge surface.',
      },
    } satisfies OgRouteProps,
  };

  return [defaultRoute, ...nodeRoutes];
};

export const GET: APIRoute<OgRouteProps> = async ({ props }) => {
  const png = await renderOgCard(props.card);
  // Uint8Array satisfies BodyInit; sharp returns a Node Buffer (a subclass).
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
