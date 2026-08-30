/**
 * Enforce the surface construction rules that fail silently.
 *
 * Every check here corresponds to a bug that does not throw, does not show up
 * in a build, and often only appears in one browser:
 *
 *   a backdrop blur with no compositing layer  Safari drops the blur entirely
 *                                              and Chrome smears it on scroll
 *   an overlay that eats clicks                the card underneath stops working
 *   a transition on a layout property          runs layout every frame
 *   an unprefixed mask                         no mask at all in WebKit
 *   a raw hex in a component                   the colour stops coming from Figma
 *
 * The last one is the load-bearing one. Colour and typography come from the
 * Figma mirror; a hex typed into a component is how a design system starts
 * having two sources of truth.
 *
 * Run: node scripts/check-surfaces.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const SCAN = ["src/components", "src/app", "src/styles", "src/design-system"];
const EXCLUDE = [
  /* Generated from Figma vectors. They legitimately carry the brand green and
     the source's own hexes, and they are never hand-edited. */
  "src/components/ui/icons",
  "src/components/ui/brand",
  /* Generated token output, and the two files whose job is to hold values. */
  "src/design-system/tokens",
  "src/design-system/_figma-export",
  "src/design-system/extensions/surface.css",
  "src/design-system/extensions/motion.css",
  "src/design-system/extensions/display-scale.css",
  "src/design-system/marketing/ground.css",
  /* Not shipped to a visitor. */
  "src/app/dev",
];

const problems = [];
const note = (file, line, why, detail) =>
  problems.push(`${file}:${line}  ${why}\n       ${detail.trim().slice(0, 120)}`);

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    const rel = relative(ROOT, full);
    if (EXCLUDE.some((x) => rel === x || rel.startsWith(x + "/"))) continue;
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx|ts|css)$/.test(entry)) out.push(full);
  }
  return out;
}

const lineOf = (src, index) => src.slice(0, index).split("\n").length;

/** Properties whose animation forces layout or a full-element repaint. */
const BANNED_TRANSITION = /\b(left|right|top|bottom|width|height|margin|padding|filter)\b/;

/* Colours that are not colours: fully transparent, and pure black/white used as
   mask stops, where the value is a mask channel rather than a paint. */
const COLOUR_EXEMPT = /^(#0{3,4}|#0{6}|#0{8}|#f{3}|#f{6}|#f{3,4})$/i;

/**
 * The page ground, read from its single source.
 *
 * It has to be repeated in two places that cannot read CSS: the viewport
 * `themeColor` and the web app manifest. Rather than let three copies drift
 * behind a comment asking humans to keep them in step, the value is allowed in
 * source and the copies are asserted to match, the same way motion.css is
 * checked against motion.ts.
 */
const GROUND = (() => {
  const css = readFileSync(join(ROOT, "src/design-system/marketing/ground.css"), "utf8");
  const m = css.match(/--page-ground:\s*([^;]+);/);
  if (!m) {
    console.log("ERROR  could not read --page-ground from marketing/ground.css");
    process.exit(1);
  }
  return m[1].trim().toLowerCase();
})();

/** Where the ground legitimately appears as a literal, and under what key. */
const GROUND_COPIES = [
  ["src/app/layout.tsx", /themeColor:\s*"([^"]+)"/, "viewport.themeColor"],
  ["src/app/manifest.ts", /background_color:\s*"([^"]+)"/, "manifest.background_color"],
  ["src/app/manifest.ts", /theme_color:\s*"([^"]+)"/, "manifest.theme_color"],
];

for (const [file, re, label] of GROUND_COPIES) {
  const src = readFileSync(join(ROOT, file), "utf8");
  const found = src.match(re)?.[1]?.trim().toLowerCase();
  if (found === undefined) {
    note(file, 1, `${label} is missing`, "expected a copy of --page-ground here");
  } else if (found !== GROUND) {
    note(
      file,
      lineOf(src, src.search(re)),
      `${label} is "${found}", but --page-ground is "${GROUND}"`,
      "marketing/ground.css is the source"
    );
  }
}

/** Strip comments so prose about a token is not mistaken for a value. */
const stripComments = (src) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m) => m.replace(/[^\n]/g, " "));

for (const file of walk(ROOT).length ? SCAN.flatMap((d) => walk(join(ROOT, d))) : []) {
  const rel = relative(ROOT, file);
  const src = readFileSync(file, "utf8");
  const isCss = file.endsWith(".css");

  /* -------------------------------------------------------------------------
     1. Raw colour in a component.
     ---------------------------------------------------------------------- */
  if (!isCss) {
    const code = stripComments(src);
    for (const m of code.matchAll(/#[0-9a-fA-F]{3,8}\b|\brgba?\(\s*\d/g)) {
      const value = m[0].toLowerCase();
      if (COLOUR_EXEMPT.test(value)) continue;
      /* The page ground is allowed as a literal in the two places that cannot
         read CSS. Its copies are asserted to match above. */
      if (value === GROUND) continue;
      note(
        rel,
        lineOf(code, m.index),
        "raw colour in a component. Colour comes from the Figma mirror: use a --ds-* token",
        src.split("\n")[lineOf(code, m.index) - 1]
      );
    }
  }

  /* -------------------------------------------------------------------------
     2. Backdrop blur without its own compositing layer.
     ---------------------------------------------------------------------- */
  if (isCss) {
    for (const m of src.matchAll(/\{[^{}]*\}/g)) {
      const block = m[0];
      if (!/backdrop-filter/.test(block)) continue;
      if (/transform\s*:/.test(block)) continue;
      note(
        rel,
        lineOf(src, m.index),
        "backdrop-filter with no transform. Safari drops the blur without its own layer",
        block
      );
    }
  } else {
    for (const m of src.matchAll(/className=\{?(?:cn\()?([\s\S]{0,900}?)\}?\s*(?:\}|\/>|>)/g)) {
      const chunk = m[1];
      if (!/backdrop-blur/.test(chunk)) continue;
      const classes = chunk.match(/[\w-]+(?:\[[^\]]*\])?/g) ?? [];
      const composited =
        classes.includes("glass") || /transform:translate\(0,\s*0\)|translate\(0,\s*0\)/.test(chunk);
      if (!composited) {
        note(
          rel,
          lineOf(src, m.index),
          "backdrop-blur with no compositing transform. Add the `glass` class or translate(0,0)",
          chunk
        );
      }
    }
  }

  /* -------------------------------------------------------------------------
     3. Overlay pseudo-element that can swallow a click.

     .touch-target is the deliberate exception: its ::after IS the hit area, so
     it must stay interactive.
     ---------------------------------------------------------------------- */
  if (isCss) {
    for (const m of src.matchAll(/([^{}]*::(?:after|before))\s*\{([^{}]*)\}/g)) {
      const [selector, block] = [m[1], m[2]];
      if (/touch-target/.test(selector)) continue;
      if (!/content\s*:/.test(block)) continue;
      if (/pointer-events\s*:\s*none/.test(block)) continue;
      note(
        rel,
        lineOf(src, m.index),
        "overlay pseudo-element without pointer-events: none",
        selector
      );
    }
  }

  /* -------------------------------------------------------------------------
     4. Transition or animation on a layout property.
     ---------------------------------------------------------------------- */
  for (const m of src.matchAll(/transition(?:-property)?\s*:\s*([^;]+);/g)) {
    if (BANNED_TRANSITION.test(m[1])) {
      note(
        rel,
        lineOf(src, m.index),
        "transition on a layout or filter property. Animate transform and opacity instead",
        m[1]
      );
    }
  }
  if (!isCss) {
    for (const m of src.matchAll(/transition-\[([^\]]+)\]/g)) {
      if (BANNED_TRANSITION.test(m[1])) {
        note(
          rel,
          lineOf(src, m.index),
          "transition on a layout or filter property. Animate transform and opacity instead",
          m[1]
        );
      }
    }
  }

  /* -------------------------------------------------------------------------
     5. Unprefixed masks and the two mask-composite keywords.
     ---------------------------------------------------------------------- */
  if (isCss) {
    for (const m of src.matchAll(/\{[^{}]*\}/g)) {
      const block = m[0];
      const has = (re) => re.test(block);
      if (has(/(?<!-webkit-)\bmask-image\s*:/) && !has(/-webkit-mask-image\s*:/)) {
        note(rel, lineOf(src, m.index), "mask-image without the -webkit- prefix", block);
      }
      if (has(/(?<!-webkit-)\bmask-composite\s*:/) && !has(/-webkit-mask-composite\s*:/)) {
        note(
          rel,
          lineOf(src, m.index),
          "mask-composite without -webkit-mask-composite. The keywords differ: exclude and xor",
          block
        );
      }
    }
  }
}

if (problems.length) {
  console.log(`${problems.length} surface problem(s):\n`);
  for (const p of problems) console.log("ERROR  " + p);
  console.log("\nSee docs/SURFACES.md. These fail silently, which is why they are checked.");
  process.exit(1);
}
console.log("surfaces clean.");
