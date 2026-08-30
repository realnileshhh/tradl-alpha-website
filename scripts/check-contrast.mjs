/**
 * WCAG contrast report for the pairings this site actually uses.
 *
 * Doc 04 §7 requires body text and chip text to pass AA on their real surfaces,
 * and the site runs two grounds at once: a light statement register and dark
 * instrument modules using the Figma tokens unmodified. That combination is easy
 * to get wrong by eye, so the ratios are computed rather than asserted.
 *
 * Alpha colours are composited over their stated ground before measuring, which
 * matters here: most of the system's surfaces are white at 5 to 10 per cent.
 *
 * Run: node scripts/check-contrast.mjs
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const readVars = (path) => {
  const out = {};
  for (const m of readFileSync(join(ROOT, path), "utf8").matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm)) {
    out[m[1]] = m[2].trim();
  }
  return out;
};

const vars = {
  ...readVars("src/design-system/tokens/tokens.css"),
  ...readVars("src/design-system/marketing/ground.css"),
};

/** #rgb, #rrggbb, #rrggbbaa, rgba() -> {r,g,b,a} with channels 0-255 and alpha 0-1. */
function parse(colour) {
  const c = colour.trim();
  const rgba = c.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,/\s]+([\d.]+))?\s*\)/);
  if (rgba) {
    return { r: +rgba[1], g: +rgba[2], b: +rgba[3], a: rgba[4] === undefined ? 1 : +rgba[4] };
  }
  let hex = c.replace("#", "");
  if (hex.length === 3) hex = [...hex].map((x) => x + x).join("");
  if (hex.length === 6) hex += "ff";
  if (hex.length !== 8) throw new Error(`cannot parse colour: ${colour}`);
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
    a: parseInt(hex.slice(6, 8), 16) / 255,
  };
}

/** Composite a possibly-translucent colour over an opaque backdrop. */
const over = (fg, bg) => ({
  r: fg.r * fg.a + bg.r * (1 - fg.a),
  g: fg.g * fg.a + bg.g * (1 - fg.a),
  b: fg.b * fg.a + bg.b * (1 - fg.a),
  a: 1,
});

const luminance = ({ r, g, b }) => {
  const lin = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

const ratio = (fg, bg) => {
  const a = luminance(fg);
  const b = luminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
};

const resolve = (token) => {
  // A raw colour, for values that exist only inside a gradient or a component.
  if (token.startsWith("#") || token.startsWith("rgb")) return token;
  const v = vars[token];
  if (!v) throw new Error(`unknown token: ${token}`);
  const alias = v.match(/^var\((--[\w-]+)\)$/);
  return alias ? resolve(alias[1]) : v;
};

/**
 * ground is the opaque page behind everything; surface may be translucent and is
 * composited over ground; the foreground is then measured against that result.
 */
const CASES = [
  // Text, straight on the page ground.
  ["text", "--ds-text-primary", "--page-ground", null, "body", "primary text"],
  ["text", "--ds-text-secondary", "--page-ground", null, "body", "body copy"],
  ["text", "--ds-text-tertiary", "--page-ground", null, "body", "metadata and captions"],
  ["text", "--ds-text-muted", "--page-ground", null, "body", "muted text"],
  ["text", "--ds-text-disabled", "--page-ground", null, "exempt", "disabled, WCAG 1.4.3 exempts inactive controls"],

  // Text on the system's surfaces. These are white overlays, so they are
  // composited over the ground before measuring.
  ["surfaces", "--ds-text-primary", "--page-ground", "--ds-bg-surface", "body", "text on a raised surface"],
  ["surfaces", "--ds-text-secondary", "--page-ground", "--ds-bg-surface", "body", "secondary on a raised surface"],
  ["surfaces", "--ds-text-secondary", "--page-ground", "--ds-color-grey-750", "body", "secondary on a solid grey row"],
  [
    "surfaces",
    "--ds-placeholder",
    "--page-ground",
    "--ds-bg-surface",
    "body",
    "input placeholder",
    "KNOWN GAP in the design system. Placeholder text is not exempt under 1.4.3. Raised with design 30 Aug 2026",
  ],

  // Accents and state colour.
  ["accents", "--ds-accent-secondary", "--page-ground", null, "body", "bright green, the on-ground accent"],
  [
    "accents",
    "--ds-accent-primary",
    "--page-ground",
    null,
    "body",
    "deep green as text",
    "a fill colour, not a text colour. On this ground the text accent is accent-secondary",
  ],
  ["accents", "--ds-accent-negative", "--page-ground", null, "body", "negative red"],
  ["accents", "--ds-color-red-400", "--page-ground", null, "body", "the brighter red primitive, for comparison"],
  ["accents", "--ds-color-white", "--ds-accent-primary", null, "body", "white on the deep green fill"],
  // The primary button is a gradient, so the darkest stop is the worst case.
  ["accents", "--ds-color-white", "#0b7350", null, "body", "white on the button gradient's darkest stop"],

  // Status chips. The pill tints are the base colour at 12 per cent, so the
  // label sits on very little separation from the ground.
  ["chips", "--ds-highlight-1", "--page-ground", "--ds-highlight-1-12", "body", "PRIVATE ACCESS pill"],
  ["chips", "--ds-accent-secondary", "--page-ground", "#3fcf8e1f", "body", "LIVE pill, 12% derived tint"],
  ["chips", "--ds-highlight-5", "--page-ground", "#ca940d1f", "body", "PREVIEW pill, 12% derived tint"],

  // Borders. WCAG 1.4.11 asks 3:1 only of boundaries that identify a control or
  // carry meaning. A separator hairline is decorative and is reported unjudged.
  ["borders", "--ds-border-subtle", "--page-ground", null, "decorative", "separator hairline"],
  ["borders", "--ds-border-default", "--page-ground", null, "decorative", "separator hairline, heavier"],
  [
    "borders",
    "--ds-border-default",
    "--page-ground",
    null,
    "ui",
    "IF it is a control's only boundary",
    "use border-strong when the boundary is the only affordance",
  ],
  [
    "borders",
    "--ds-border-medium",
    "--page-ground",
    null,
    "ui",
    "control boundary candidate",
    "use border-strong when the boundary is the only affordance",
  ],
  ["borders", "--ds-border-strong", "--page-ground", null, "ui", "control boundary candidate"],
];

// AA: 4.5 for body text, 3.0 for large text and for non-text UI that identifies a
// control (1.4.11). Disabled controls are exempt under 1.4.3; purely decorative
// separators are outside 1.4.11 entirely. Both are reported without a verdict so
// the number stays visible without inventing a requirement that does not exist.
const THRESHOLD = { body: 4.5, large: 3.0, ui: 3.0, exempt: 0, decorative: 0 };
const UNJUDGED = new Set(["exempt", "decorative"]);

let unexpected = 0;
let known = 0;
const rows = [];

for (const [register, fgToken, groundToken, surfaceToken, level, note, expected] of CASES) {
  const ground = parse(resolve(groundToken));
  const base = surfaceToken ? over(parse(resolve(surfaceToken)), ground) : ground;
  const fg = over(parse(resolve(fgToken)), base);
  const r = ratio(fg, base);
  const need = THRESHOLD[level];
  const pass = r >= need;
  const judged = !UNJUDGED.has(level);

  if (!pass && judged) {
    if (expected) known++;
    else unexpected++;
  }

  rows.push({
    register,
    pair: `${fgToken} on ${surfaceToken ? `${surfaceToken} / ` : ""}${groundToken}`,
    ratio: r.toFixed(2),
    need: need.toFixed(1),
    level,
    pass,
    judged,
    note,
    expected,
  });
}

const w = Math.max(...rows.map((r) => r.pair.length));
let current = "";
for (const r of rows) {
  if (r.register !== current) {
    current = r.register;
    console.log(`\n${current.toUpperCase()}`);
  }
  /* Three verdicts, not two. A pairing we have reasoned about and chosen not to
     use is not the same as one that just broke, and collapsing them means the
     real regression hides inside a wall of familiar red. */
  const mark = !r.judged ? "n/a " : r.pass ? "pass" : r.expected ? "note" : "FAIL";
  console.log(
    `  ${mark}  ${r.ratio.padStart(6)}:1  (needs ${r.need} ${r.level})  ${r.pair.padEnd(w)}  ${r.note}`
  );
  if (!r.pass && r.judged && r.expected) console.log(`        ${" ".repeat(0)}${r.expected}`);
}

console.log(
  `\n${rows.length} pairings checked. ${unexpected} unexpected failure(s), ` +
    `${known} known and documented.`
);
if (unexpected) {
  console.log(
    "An undocumented failure is a bug. Fix the pairing or document why it is acceptable;\n" +
      "do not lower the threshold. See docs/DECISIONS.md 004 and docs/DESIGN-SYSTEM.md."
  );
  process.exitCode = 1;
}
