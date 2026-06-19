/**
 * Generate the favicon / app-icon kit from the /L monogram.
 *
 * The monogram is a single path on a transparent field. For raster icons we
 * render it on a high-contrast ink tile (so it reads in a browser tab and as a
 * home-screen icon), at the sizes browsers and PWAs actually ask for.
 *
 * Run via `npm run build` (prebuild hook). Outputs to /public.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

// The canonical monogram path + its viewBox (from public/logo.svg).
const MONOGRAM_PATH = 'M240 0H330V350H500V440H247.06V175L102.52 440H0L240 0Z';
const VIEWBOX = '-40 -40 580 520';

// Brand ink (light-mode foreground) and paper.
const INK = '#18181b';
const PAPER = '#fafafa';

/** An SVG of the monogram in a given color, sized to a square box. */
function monogramSvg(size, fill) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${VIEWBOX}"><path d="${MONOGRAM_PATH}" fill="${fill}"/></svg>`;
}

/**
 * A rounded-tile icon: ink mark on a paper tile (for light tabs / home screens).
 * `pad` is the inner margin as a fraction so the mark breathes inside the tile.
 */
function tileSvg(size, { bg, fg, radius, pad }) {
  const inner = Math.round(size * (1 - pad * 2));
  const offset = Math.round(size * pad);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="${bg}"/>
  <svg x="${offset}" y="${offset}" width="${inner}" height="${inner}" viewBox="${VIEWBOX}"><path d="${MONOGRAM_PATH}" fill="${fg}"/></svg>
</svg>`;
}

async function png(svg, size, out) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(PUBLIC, out));
  console.log(`  ✓ ${out} (${size}×${size})`);
}

async function main() {
  console.log('Generating icon kit from /L monogram…');

  // Transparent monogram PNGs (used as inline / small favicons on either theme).
  await png(monogramSvg(32, INK), 32, 'favicon-32.png');
  await png(monogramSvg(16, INK), 16, 'favicon-16.png');

  // Apple touch icon — ink tile, generous corner radius, padded mark.
  await png(tileSvg(180, { bg: PAPER, fg: INK, radius: 40, pad: 0.2 }), 180, 'apple-touch-icon.png');

  // PWA / maskable icons on the paper tile.
  await png(tileSvg(192, { bg: PAPER, fg: INK, radius: 0, pad: 0.18 }), 192, 'icon-192.png');
  await png(tileSvg(512, { bg: PAPER, fg: INK, radius: 0, pad: 0.18 }), 512, 'icon-512.png');

  console.log('Icon kit complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
