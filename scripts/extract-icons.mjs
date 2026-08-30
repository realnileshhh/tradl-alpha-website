/**
 * Split the exported Figma "Icons" page into individual React components.
 *
 * Why this exists: the icons sit loose on the canvas rather than inside frames,
 * `download_assets` caps at 20 SVGs per node, and canvases are not addressable
 * for variables. Exporting the whole page as one SVG and splitting it locally is
 * the only way to get all of them in one read.
 *
 * Two inputs, both raw Figma exports under _figma-export/:
 *
 *   icons-page.svg        the whole canvas rendered as one SVG
 *   icons-metadata.xml    the get_metadata response for the same canvas
 *
 * Everything else is derived. The icon list, each viewBox and the page-to-export
 * coordinate offset all come from the metadata, so adding an icon in Figma means
 * re-fetching the two inputs and re-running this. No code edit, no hand-typed
 * table to fall out of date. That matters more than it sounds: a stale table
 * would not error, it would silently drop the new icon and, if the canvas bounds
 * moved, shift every existing viewBox by the same wrong amount.
 *
 * Run: node scripts/extract-icons.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const EXPORT_DIR = join(ROOT, "src/design-system/_figma-export");
const SRC = join(EXPORT_DIR, "icons-page.svg");
const META = join(EXPORT_DIR, "icons-metadata.xml");
const OUT = join(ROOT, "src/components/ui/icons");

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');

const attr = (line, name) => {
  const m = line.match(new RegExp(`${name}="([^"]*)"`));
  return m ? m[1] : null;
};
const num = (line, name) => {
  const v = attr(line, name);
  return v === null ? null : Number(v);
};

/**
 * Parse the metadata into the icons to extract and the canvas bounds.
 *
 * Coordinates on a <symbol> nested inside a <frame> are relative to that frame,
 * so they are resolved against the frame origin. <instance> elements are copies
 * of a symbol at the same position and are skipped: keeping them would emit the
 * same glyph twice under a `_2` suffix.
 */
function parseMetadata(xml) {
  const icons = [];
  const bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  const frameStack = [];

  for (const raw of xml.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("<!--") || line.startsWith("<canvas") || !line.startsWith("<")) continue;

    if (line.startsWith("</frame")) {
      frameStack.pop();
      continue;
    }

    const isFrame = line.startsWith("<frame");
    const isSymbol = line.startsWith("<symbol");
    const isInstance = line.startsWith("<instance");
    if (!isFrame && !isSymbol && !isInstance) continue;

    const x = num(line, "x");
    const y = num(line, "y");
    const w = num(line, "width");
    const h = num(line, "height");
    if (x === null || y === null || w === null || h === null) continue;

    const parent = frameStack[frameStack.length - 1];
    const absX = parent ? parent.x + x : x;
    const absY = parent ? parent.y + y : y;

    // The export viewBox is the bounding box of the canvas's top-level content.
    if (!parent) {
      bounds.minX = Math.min(bounds.minX, absX);
      bounds.minY = Math.min(bounds.minY, absY);
      bounds.maxX = Math.max(bounds.maxX, absX + w);
      bounds.maxY = Math.max(bounds.maxY, absY + h);
    }

    if (isFrame) {
      // Self-closing frames have no children to resolve against.
      if (!line.endsWith("/>")) frameStack.push({ x: absX, y: absY });
      continue;
    }

    if (isSymbol) icons.push({ name: decode(attr(line, "name")), x: absX, y: absY, w, h });
  }

  return { icons, bounds };
}

/**
 * Figma names are inconsistent: `icon-close`, `Icon-info`, `Icon - IT`, and
 * variants that arrive as `Property 1=Add`. Normalise to one shape so every file
 * is `icon-*.tsx` and every export is `Icon*`, regardless of canvas naming.
 */
const slug = (name) => {
  const base = name
    .replace(/^(Property 1=|select state=)/, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .replace(/^icon-?/, "");
  return `icon-${base}`;
};

const pascal = (s) =>
  s.split("-").filter(Boolean).map((p) => p[0].toUpperCase() + p.slice(1)).join("");

/**
 * Figma exports these icons as strokes in icon/secondary (#BABABA) plus a couple
 * of near-whites. Those are the monochrome ink and become currentColor so an
 * icon takes the colour of its context. #8A38F5 and #3FCF8E are deliberate
 * semantic colour in the source and are left alone.
 */
const INK = new Set(["#BABABA", "#bababa", "#F5F5F5", "#f5f5f5", "white", "#FFFFFF", "#ffffff"]);

/**
 * Kebab-case SVG attributes to camelCase for JSX. A fixed lookup table is the
 * wrong shape here: it silently passes through whatever it has not heard of
 * (stroke-miterlimit, paint-order, vector-effect), and React then warns at
 * runtime on a generated file nobody re-reads. Convert everything, and keep the
 * two namespaces that must stay hyphenated.
 */
const toJsxAttrs = (s) =>
  s.replace(/\s([a-z]+(?:-[a-z]+)+)=/g, (match, a) => {
    if (a.startsWith("data-") || a.startsWith("aria-")) return match;
    return " " + a.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + "=";
  });

/** Pull `<g id="NAME"> … </g>` out by tracking <g> depth. The export is pretty-printed. */
function extractGroup(lines, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/&/g, "&amp;");
  const open = new RegExp(`^\\s*<g id="${escaped}"[^>]*>\\s*$`);
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (open.test(lines[i])) { start = i; break; }
  }
  if (start === -1) return null;

  let depth = 0;
  for (let i = start; i < lines.length; i++) {
    const opens = (lines[i].match(/<g[\s>]/g) || []).length;
    const closes = (lines[i].match(/<\/g>/g) || []).length;
    depth += opens - closes;
    if (depth === 0) return lines.slice(start + 1, i).join("\n");
  }
  return null;
}

function toJsx(markup, ns) {
  let out = markup;

  // Namespace every id and its url(#…) references, so two icons mounted at once
  // cannot collide on clip0_2_83 and friends.
  const ids = new Set();
  for (const m of out.matchAll(/\sid="([^"]+)"/g)) ids.add(m[1]);
  for (const id of ids) {
    const safe = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out.replace(new RegExp(`id="${safe}"`, "g"), `id="${ns}-${id}"`);
    out = out.replace(new RegExp(`url\\(#${safe}\\)`, "g"), `url(#${ns}-${id})`);
  }

  for (const colour of INK) {
    out = out.replaceAll(`stroke="${colour}"`, 'stroke="currentColor"');
    out = out.replaceAll(`fill="${colour}"`, 'fill="currentColor"');
  }

  return toJsxAttrs(out).trim().split("\n").map((l) => `      ${l.trim()}`).join("\n");
}

/* -------------------------------------------------------------------------- */

const svg = readFileSync(SRC, "utf8");
const { icons, bounds } = parseMetadata(readFileSync(META, "utf8"));

if (!icons.length) throw new Error(`no <symbol> elements found in ${META}`);

const offsetX = -bounds.minX;
const offsetY = -bounds.minY;
const expected = { w: bounds.maxX - bounds.minX, h: bounds.maxY - bounds.minY };

/* Cross-check the two inputs against each other. If the metadata and the page
   SVG were exported at different times, the bounds will disagree and every
   viewBox would be silently offset. Fail loudly instead. */
const vb = svg.match(/viewBox="([-\d.]+) ([-\d.]+) ([\d.]+) ([\d.]+)"/);
if (!vb) throw new Error(`${SRC} has no viewBox`);
const actual = { w: Number(vb[3]), h: Number(vb[4]) };
if (Math.abs(actual.w - expected.w) > 1 || Math.abs(actual.h - expected.h) > 1) {
  throw new Error(
    `icons-page.svg and icons-metadata.xml disagree about the canvas.\n` +
      `  metadata bounds: ${expected.w} x ${expected.h}\n` +
      `  svg viewBox:     ${actual.w} x ${actual.h}\n` +
      `Re-export both together: get_metadata on node 2:83 and download_assets on the same node.`
  );
}

const lines = svg.split("\n");
const defsStart = lines.findIndex((l) => l.includes("<defs>"));
const defsEnd = lines.findIndex((l) => l.includes("</defs>"));
const defsBlock = defsStart === -1 ? "" : lines.slice(defsStart + 1, defsEnd).join("\n");

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const written = [];
const missing = [];
const seen = new Map();

for (const { name, x, y, w, h } of icons) {
  const body = extractGroup(lines, name);
  if (!body) { missing.push(name); continue; }

  const s = slug(name);
  if (seen.has(s)) {
    throw new Error(
      `two icons normalise to the same file name "${s}": "${seen.get(s)}" and "${name}". ` +
        `Rename one on the Figma canvas.`
    );
  }
  seen.set(s, name);

  const component = `Icon${pascal(s.slice("icon-".length))}`;
  const vx = x + offsetX;
  const vy = y + offsetY;

  const referenced = [...body.matchAll(/url\(#([^)]+)\)/g)].map((m) => m[1]);
  let defs = "";
  if (referenced.length && defsBlock) {
    const needed = defsBlock
      .split(/(?=<clipPath|<linearGradient|<radialGradient)/)
      .filter((chunk) => referenced.some((id) => chunk.includes(`id="${id}"`)))
      .join("\n");
    if (needed.trim()) defs = toJsx(needed, s) + "\n";
  }

  writeFileSync(
    join(OUT, `${s}.tsx`),
    `/* Generated from Figma. Do not edit by hand — see docs/DESIGN-SYSTEM.md.
   Source: Tradl Design System, Icons page, "${name}". */
import type { SVGProps } from "react";

export function ${component}(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="${vx} ${vy} ${w} ${h}"
      width="${w}"
      height="${h}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
${defs}${toJsx(body, s)}
    </svg>
  );
}
`
  );
  written.push({ slug: s, component });
}

written.sort((a, b) => a.slug.localeCompare(b.slug));
writeFileSync(
  join(OUT, "index.ts"),
  `/* Generated from Figma. Do not edit by hand — see docs/DESIGN-SYSTEM.md. */\n` +
    written.map(({ slug, component }) => `export { ${component} } from "./${slug}";`).join("\n") +
    "\n"
);

console.log(
  `wrote ${written.length} icons to src/components/ui/icons/ ` +
    `(canvas ${expected.w}x${expected.h}, offset ${offsetX}/${offsetY}, derived from metadata)`
);
if (missing.length) {
  console.log(`\nWARNING, ${missing.length} icon(s) in the metadata have no matching group in the SVG:`);
  for (const m of missing) console.log(`  ${m}`);
  console.log("The two exports are probably out of step. Re-export both.");
  process.exitCode = 1;
}
