import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { ogPathForPage, DEFAULT_OG_PATH } from './lib/og';

/**
 * Per-page social meta. Starlight's recommended hook for programmatic <head>
 * control: for every page, point Open Graph / Twitter at that page's generated
 * OG card (built by /og/[...slug].png) using absolute URLs scrapers require.
 *
 * Tags are added only if not already present, so the global config's defaults
 * (og:type, twitter:site, etc.) are respected and never duplicated.
 */
export const onRequest = defineRouteMiddleware((context) => {
  const { starlightRoute } = context.locals;
  const head = starlightRoute.head;

  const origin = context.site?.href.replace(/\/$/, '') ?? '';
  const pagePath = context.url.pathname;

  // Resolve this page's card; fall back to the default for any path that
  // doesn't have its own generated image.
  const ogPath = starlightRoute.entry.data.node ? ogPathForPage(pagePath) : DEFAULT_OG_PATH;
  const imageUrl = `${origin}${ogPath}`;

  const title = starlightRoute.entry.data.title;
  const description = starlightRoute.entry.data.description ?? '';
  const canonical = `${origin}${pagePath}`;

  const has = (property: string, attr: 'property' | 'name'): boolean =>
    head.some((t) => t.tag === 'meta' && t.attrs?.[attr] === property);

  const add = (attr: 'property' | 'name', key: string, value: string): void => {
    if (!value || has(key, attr)) return;
    head.push({ tag: 'meta', attrs: { [attr]: key, content: value } });
  };

  add('property', 'og:title', title);
  add('property', 'og:description', description);
  add('property', 'og:url', canonical);
  add('property', 'og:image', imageUrl);
  add('property', 'og:image:width', '1200');
  add('property', 'og:image:height', '630');
  add('name', 'twitter:title', title);
  add('name', 'twitter:description', description);
  add('name', 'twitter:image', imageUrl);
});
