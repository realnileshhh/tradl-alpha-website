/**
 * Turn the exported wordmark into a React component whose ink follows currentColor.
 *
 * The site runs dark, but the wordmark still has to work on more than one
 * value: white on the page ground, and dark again if it is ever placed on a
 * light fill or a light-ground export. A flat <img> can only be right on one of
 * them, and shipping two files means they drift. Making the ink currentColor
 * means the mark simply takes the colour of its context.
 *
 * Only the wordmark gets this treatment. The app mark and the full lockup are
 * two-tone by construction (dark tile, white letterform), so recolouring their
 * ink would erase the tile. Those stay static files under public/brand/.
 *
 * Run: node scripts/build-brand.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "public/brand/tradl-wordmark.svg");
const OUT = join(ROOT, "src/components/ui/brand");

/** The wordmark's letterform ink. The green stays literal: it is the brand mark. */
const INK = ['fill="#010101"', 'fill="black"', 'fill="#010101" ', 'fill="#0A0A0A"'];

/**
 * Kebab-case SVG attributes to camelCase for JSX. A fixed lookup table is the
 * wrong shape here: it silently passes through whatever it has not heard of
 * (stroke-miterlimit, paint-order, vector-effect), and React then warns at
 * runtime on a file nobody re-reads. Convert everything, and keep the two
 * namespaces that must stay hyphenated.
 */
const toJsxAttrs = (s) =>
  s.replace(/\s([a-z]+(?:-[a-z]+)+)=/g, (match, attr) => {
    if (attr.startsWith("data-") || attr.startsWith("aria-")) return match;
    return " " + attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + "=";
  });

let svg = readFileSync(SRC, "utf8");

const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
const width = svg.match(/width="([\d.]+)"/)?.[1];
const height = svg.match(/height="([\d.]+)"/)?.[1];
if (!viewBox) throw new Error("wordmark SVG has no viewBox");

// Body: everything between the opening <svg ...> and the closing </svg>.
let body = svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");

const greens = [...body.matchAll(/fill="(#[0-9A-Fa-f]{6})"/g)]
  .map((m) => m[1])
  .filter((c) => !INK.includes(`fill="${c}"`));

for (const ink of INK) body = body.replaceAll(ink, 'fill="currentColor"');
body = toJsxAttrs(body);

body = body
  .trim()
  .split("\n")
  .map((l) => `      ${l.trim()}`)
  .join("\n");

const remainingInk = /fill="(black|#010101)"/i.test(body);
if (remainingInk) throw new Error("wordmark still contains hard-coded ink after conversion");

mkdirSync(OUT, { recursive: true });

writeFileSync(
  join(OUT, "wordmark.tsx"),
  `/* Generated from Figma. Do not edit by hand — run \`node scripts/build-brand.mjs\`.
   Source: Tradl Design System, Logos page, node 361:2588.

   The letterform ink is currentColor, so the mark takes the colour of its
   context: text-fg on the page ground, or any other colour it is given. The
   green is literal on purpose — it is the brand, not a theme colour.

   Unique green(s) in the source: ${[...new Set(greens)].join(", ") || "none"}.
   Note that this differs from --ds-color-green-400 (#3fcf8e); the logo files
   carry their own green and that discrepancy is open with design.
   See docs/DESIGN-SYSTEM.md. */
import type { SVGProps } from "react";

export function Wordmark({ title = "Tradl AI", ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="${viewBox}"
      width="${width ?? ""}"
      height="${height ?? ""}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      {...props}
    >
      <title>{title}</title>
${body}
    </svg>
  );
}
`
);

console.log(`wrote src/components/ui/brand/wordmark.tsx (viewBox ${viewBox})`);
console.log(`brand green(s) preserved: ${[...new Set(greens)].join(", ") || "none"}`);
