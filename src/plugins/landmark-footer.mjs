import { readFileSync } from 'node:fs';

/**
 * Starlight renders <footer> inside <main> and does not expose the page shell
 * as an override. Serve a modified Page.astro with the footer after </main>.
 * @returns {import('vite').Plugin}
 */
export function landmarkFooter() {
  return {
    name: 'contextlup-landmark-footer',
    enforce: /** @type {'pre'} */ ('pre'),
    load(id) {
      if (id.includes('?')) return null;
      if (id.endsWith('/node_modules/@astrojs/starlight/components/ThemeProvider.astro')) {
        const theme = readFileSync(id, 'utf8');
        return theme.replace(
          "(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')",
          "(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')",
        );
      }
      if (!id.endsWith('/node_modules/@astrojs/starlight/components/Page.astro')) return null;
      const raw = readFileSync(id, 'utf8');
      if (raw.includes('contextlup-footer-outside-main')) return raw;
      const stripped = raw.replace(/^[ \t]*<Footer \/>\r?\n/gm, '');
      if (stripped === raw) return null;
      return stripped
        .replace(
          '</main>',
          '</main>\n\t\t\t\t{/* contextlup-footer-outside-main */}\n\t\t\t\t<ContentPanel>\n\t\t\t\t\t<Footer />\n\t\t\t\t</ContentPanel>',
        )
        .replace(
          "const htmlDataAttributes: DOMStringMap = { 'data-theme': 'dark' };",
          "const htmlDataAttributes: DOMStringMap = { 'data-theme': 'light' };",
        );
    },
  };
}
