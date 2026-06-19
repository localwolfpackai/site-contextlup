// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// The canonical origin. Used for absolute URLs in the agent API + OG tags.
// Resolution order:
//   1. SITE_URL — explicit override (set this to the real domain in prod).
//   2. VERCEL_PROJECT_PRODUCTION_URL — the stable Vercel staging alias.
//   3. contextlup.com — the eventual canonical, used for local builds.
// Until the real domain is live, Vercel's staging URL keeps the agent API's
// absolute links pointing at a host that actually resolves.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const SITE = process.env.SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : 'https://contextlup.com');

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [
    starlight({
      title: 'ContextLup',
      description:
        'A machine-readable knowledge surface. The Lupo Protocol — served to humans as docs, and to agents as an API.',
      logo: {
        // Theme-aware: an <img>-rendered SVG can't inherit currentColor, so
        // ship explicit light/dark marks tuned to the palette (ink / near-white).
        light: './public/logo-light.svg',
        dark: './public/logo-dark.svg',
        alt: 'ContextLup — the /L monogram',
      },
      customCss: ['./src/styles/contextlup.css'],
      // Per-page Open Graph / Twitter image tags, pointed at generated cards.
      routeMiddleware: './src/routeData.ts',
      // Light is home; the toggle stays available.
      defaultLocale: 'root',
      social: [
        { icon: 'x.com', label: 'X', href: 'https://x.com/humanlup' },
        { icon: 'github', label: 'GitHub', href: 'https://github.com/localwolfpackai' },
      ],
      // Site-wide tags. Per-page OG image/title/description are added by the
      // route middleware (src/routeData.ts); these are the constants.
      head: [
        // Favicon + app-icon kit (generated from the /L monogram into /public).
        { tag: 'link', attrs: { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' } },
        { tag: 'link', attrs: { rel: 'icon', href: '/favicon-32.png', sizes: '32x32', type: 'image/png' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' } },
        { tag: 'link', attrs: { rel: 'manifest', href: '/site.webmanifest' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#fafafa' } },
        // Agent-facing: declare the protocol version + the machine manifest.
        { tag: 'meta', attrs: { name: 'lupo-protocol-version', content: '1.0.0' } },
        {
          tag: 'link',
          attrs: { rel: 'alternate', type: 'application/json', href: '/api/manifest.json', title: 'Agent Manifest' },
        },
        // Open Graph / Twitter defaults shared by every page.
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'ContextLup' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:site', content: '@humanlup' } },
      ],
      // The four pillars, in priority order. Hard context first.
      sidebar: [
        {
          label: 'Overview',
          items: [
            { label: 'Identity & Core Directive', slug: 'identity' },
            { label: 'Agent Protocol', slug: 'agent-protocol' },
          ],
        },
        {
          label: 'Directives',
          items: [{ autogenerate: { directory: 'directives' } }],
        },
        {
          label: 'Mental Models',
          items: [{ autogenerate: { directory: 'mental-models' } }],
        },
        {
          label: 'Inventory',
          items: [{ autogenerate: { directory: 'inventory' } }],
        },
      ],
      // Quiet, accurate footer.
      credits: false,
      lastUpdated: true,
    }),
  ],
});
