import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Branded OG card generator.
 *
 * Pure SVG → PNG via sharp (resvg). resvg renders the embedded Geist woff2,
 * variable axis and all, so we get real brand typography with zero extra deps
 * and full pixel control. One card template, filled per page from content.
 */

const WIDTH = 1200;
const HEIGHT = 630;

// Brand tokens — mirror the light-mode design system.
const PAPER = '#fafafa';
const INK = '#18181b';
const MUTED = '#52525b';
const HAIRLINE = '#e4e4e7';
const ACCENT = '#2c5fef'; // the calm technical blue

const MONOGRAM_PATH = 'M240 0H330V350H500V440H247.06V175L102.52 440H0L240 0Z';
const MONOGRAM_VIEWBOX = '-40 -40 580 520';

// Embed Geist (normal + a mono for the eyebrow) as base64 once at module load.
// Resolve from the project root (cwd at build/dev time) — the module itself
// gets bundled into dist/ during build, so a module-relative path would break.
const fontPath = (p: string): string => join(process.cwd(), 'node_modules', p);
const GEIST = readFileSync(
  fontPath('@fontsource-variable/geist/files/geist-latin-wght-normal.woff2'),
).toString('base64');
const GEIST_MONO = readFileSync(
  fontPath('@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2'),
).toString('base64');

const FONT_FACE = `
  @font-face { font-family: 'Geist'; src: url(data:font/woff2;base64,${GEIST}) format('woff2'); font-weight: 100 900; }
  @font-face { font-family: 'Geist Mono'; src: url(data:font/woff2;base64,${GEIST_MONO}) format('woff2'); font-weight: 100 900; }
`;

export type OgCard = {
  /** Large headline — the page title. */
  title: string;
  /** Small eyebrow above the title (e.g. the pillar, or "The Lupo Protocol"). */
  eyebrow?: string;
  /** Optional supporting line under the title. */
  subtitle?: string;
};

/** Where the default (home / fallback) card lives. */
export const DEFAULT_OG_PATH = '/og/default.png';

/**
 * Map a page pathname to its OG image pathname. Shared by the generating
 * endpoint and the meta-tag middleware so they never disagree on the URL.
 * "/directives/coding-style/" → "/og/directives/coding-style.png"
 * "/" or unknown → the default card.
 */
export function ogPathForPage(pathname: string): string {
  const slug = pathname.replace(/^\/+|\/+$/g, '');
  return slug ? `/og/${slug}.png` : DEFAULT_OG_PATH;
}

/** XML-escape text going into the SVG. */
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * Wrap a string to a max character count per line (approximate — Geist is
 * proportional, but at this size the estimate holds well enough for 1–3 lines).
 */
function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines - 1) break;
    } else {
      line = candidate;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  // If we truncated, mark the last line with an ellipsis.
  const used = lines.join(' ').length;
  if (used < text.length && lines.length) lines[lines.length - 1] += '…';
  return lines;
}

/** Build the OG card SVG. */
function cardSvg({ title, eyebrow, subtitle }: OgCard): string {
  const titleLines = wrap(title, 22, 3);
  const titleSize = titleLines.length >= 3 ? 76 : titleLines.length === 2 ? 88 : 96;
  const titleLineHeight = titleSize * 1.06;

  // Top-down flow: header (logo) → eyebrow → title → subtitle. Fixed anchors so
  // the eyebrow never collides with the wordmark regardless of title length.
  const eyebrowY = 232;
  const titleBaselineY = eyebrowY + (eyebrow ? 76 : 18) + titleSize * 0.82;

  const titleTspans = titleLines
    .map(
      (l, i) =>
        `<text x="80" y="${titleBaselineY + i * titleLineHeight}" font-family="Geist" font-weight="600" font-size="${titleSize}" letter-spacing="-2.5" fill="${INK}">${esc(l)}</text>`,
    )
    .join('\n    ');

  const titleBottomY = titleBaselineY + (titleLines.length - 1) * titleLineHeight;
  const subtitleY = titleBottomY + 58;
  // Only show the subtitle when there's vertical room above the footer hairline.
  const showSubtitle = Boolean(subtitle) && subtitleY < 500;

  // A faint dot grid — the "knowledge graph / 8pt grid" texture, kept subtle.
  const dotGrid = `
    <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="${INK}" fill-opacity="0.05"/>
    </pattern>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <style>${FONT_FACE}</style>
    ${dotGrid}
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="${PAPER}"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#dots)"/>

  <!-- top accent hairline -->
  <rect x="0" y="0" width="${WIDTH}" height="8" fill="${ACCENT}"/>

  <!-- monogram, top-left -->
  <svg x="80" y="72" width="64" height="64" viewBox="${MONOGRAM_VIEWBOX}"><path d="${MONOGRAM_PATH}" fill="${INK}"/></svg>
  <text x="164" y="118" font-family="Geist" font-weight="600" font-size="34" letter-spacing="-0.5" fill="${INK}">ContextLup</text>

  ${eyebrow ? `<text x="80" y="${eyebrowY}" font-family="Geist Mono" font-weight="500" font-size="22" letter-spacing="3" fill="${ACCENT}">${esc(eyebrow.toUpperCase())}</text>` : ''}

  <!-- title -->
  ${titleTspans}

  ${showSubtitle ? `<text x="80" y="${subtitleY}" font-family="Geist" font-weight="400" font-size="32" letter-spacing="-0.5" fill="${MUTED}">${esc(subtitle ?? '')}</text>` : ''}

  <!-- footer -->
  <rect x="80" y="540" width="${WIDTH - 160}" height="1" fill="${HAIRLINE}"/>
  <text x="80" y="584" font-family="Geist Mono" font-weight="400" font-size="24" letter-spacing="0.5" fill="${MUTED}">contextlup.com</text>
  <text x="${WIDTH - 80}" y="584" text-anchor="end" font-family="Geist" font-weight="500" font-size="24" letter-spacing="-0.3" fill="${INK}">How I think — as an API.</text>
</svg>`;
}

/** Render an OG card to a PNG buffer. */
export async function renderOgCard(card: OgCard): Promise<Buffer> {
  const svg = cardSvg(card);
  return sharp(Buffer.from(svg)).png().toBuffer();
}
