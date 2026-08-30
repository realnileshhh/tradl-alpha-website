/**
 * Generate src/design-system/tokens/tokens.css from the recorded Figma harvest.
 *
 * Input precedence:
 *   1. _figma-export/variables.json          full plugin export (preferred, all 154)
 *   2. _figma-export/variables.mcp-harvest.json   what the MCP could resolve (84)
 *
 * Only (2) exists today. When (1) lands, add an adapter in `adaptPluginExport`
 * below and the rest of this script is unchanged.
 *
 * Run: node scripts/build-tokens.mjs
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const EXPORT_DIR = join(ROOT, "src/design-system/_figma-export");
const OUT_DIR = join(ROOT, "src/design-system/tokens");

const PLUGIN_EXPORT = join(EXPORT_DIR, "variables.json");
const MCP_HARVEST = join(EXPORT_DIR, "variables.mcp-harvest.json");

/**
 * Figma variable name -> CSS custom property. `bg/surface` becomes `--ds-bg-surface`.
 *
 * The `ds-` prefix does two jobs.
 *
 * First, it keeps the mirror out of Tailwind's theme namespaces. Figma names
 * radii `radius/card` and primitives `color/green-400`, which would land on
 * `--radius-card` and `--color-green-400` — the exact namespaces Tailwind emits
 * back into `:root`. A `@theme` key that repeats a declared custom property
 * resolves to itself, the value collapses, and the utility silently emits
 * nothing. See the naming rule in CLAUDE.md.
 *
 * Second, it makes provenance readable at the point of use. `var(--ds-bg-surface)`
 * is mirrored from Figma and may never be invented; `var(--ink-primary)` is ours.
 * That distinction is otherwise invisible in a stylesheet.
 */
const cssVar = (name, prefix = "") =>
  "--ds-" +
  (prefix ? prefix + "-" : "") +
  name
    .replace(/[/\s]+/g, "-")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/-+/g, "-")
    .toLowerCase();

function adaptPluginExport() {
  throw new Error(
    "variables.json is present but no adapter is written yet. Add one in scripts/build-tokens.mjs " +
      "rather than hand-editing tokens.css."
  );
}

const usingPluginExport = existsSync(PLUGIN_EXPORT);
const h = usingPluginExport ? adaptPluginExport() : JSON.parse(readFileSync(MCP_HARVEST, "utf8"));

const lines = [];
const emit = (s = "") => lines.push(s);

/**
 * CSS comments do not nest, so a literal star-slash anywhere in comment text closes
 * the comment early and dumps the remainder into the stylesheet as a parse error.
 * Figma token names legitimately contain slashes and stars (`text-sm/bold`,
 * `glass/star`), so every comment goes through here. The replacement is visible on
 * purpose: an invisible fix is one nobody can debug later.
 */
const safeComment = (s) => String(s).replaceAll("*/", "* /");

const section = (title, note) => {
  emit();
  emit(`  /* ${"-".repeat(72)} */`);
  emit(`  /* ${safeComment(title)} */`);
  if (note) for (const l of note.split("\n")) emit(`  /* ${safeComment(l)} */`);
  emit(`  /* ${"-".repeat(72)} */`);
};

let count = 0;
const block = (obj, prefix = "", unit = "") => {
  for (const [name, value] of Object.entries(obj)) {
    if (name.startsWith("$")) continue;
    emit(`  ${cssVar(name, prefix)}: ${value}${unit};`);
    count++;
  }
};

emit(`/* =============================================================================`);
emit(`   Tradl AI design tokens. GENERATED FILE, DO NOT EDIT.`);
emit(``);
emit(`   Source:    ${h.source.library} (${h.source.fileKey})`);
emit(`   Read:      ${h.source.readAt}`);
emit(`   Method:    ${usingPluginExport ? "plugin export" : h.source.method}`);
emit(`   Regenerate: node scripts/build-tokens.mjs`);
emit(``);
emit(`   Editing this file by hand is always a bug: the next sync overwrites it and`);
emit(`   the diff reads as though Figma changed when it did not. Change it in Figma.`);
emit(`   See docs/DESIGN-SYSTEM.md.`);
emit(``);
emit(`   These custom properties are inert declarations. Nothing here applies colour`);
emit(`   to the page. The design system has one mode and it is dark, and the site`);
emit(`   runs on it directly, so these render exactly as drawn. The page ground the`);
emit(`   overlays composite against lives in ../marketing/. See docs/DECISIONS.md 004.`);
emit(`   ============================================================================= */`);
emit();
emit(`:root {`);

section("Colour primitives", "The raw ramp. Prefer the semantic tokens below in components.");
block(h.colorPrimitives);

section("Colour semantics", "Built for a dark ground. text/primary is white.");
block(h.colorSemantic);

section("Highlights");
block(h.highlights);

section("Heatmap", "Cell fills for computed heat grids.");
block(h.heatmap, "heatmap");

section("Dimensions", "Radii, spacing, padding, gaps, stroke weight. Unitless in Figma, px here.");
block(h.dimensions, "", "px");

section(
  "Typography",
  "Family is Inter on every token. The runtime binding lives in globals.css\n" +
    "because next/font owns the loaded family name.\n" +
    "Note: the bold styles resolve to weight 500 (Inter Medium), not 700.\n" +
    "Only Display XXXL is 700."
);
const typeSteps = {
  xs: "text-xs/regular",
  sm: "text-sm/regular",
  md: "text-md/regular",
  lg: "text-lg/regular",
  "display-xxxl": "Display XXXL",
};
for (const [step, token] of Object.entries(typeSteps)) {
  const t = h.typography[token];
  if (!t) continue;
  emit(`  --ds-font-size-${step}: ${t.size}px;`);
  if (t.lineHeightUnresolved) {
    // Emitting a value we have flagged as unreliable is worse than emitting none:
    // a consumer would pick it up and the breakage would look like a design choice.
    emit(`  /* --ds-line-height-${step}: withheld, see "Not emitted" below */`);
    count++;
  } else {
    emit(`  --ds-line-height-${step}: ${t.lineHeight}px;`);
    count += 2;
  }
}
emit();
const weights = new Set(Object.values(h.typography).filter((t) => t && t.weight).map((t) => t.weight));
const weightName = { 400: "regular", 500: "medium", 700: "bold" };
for (const w of [...weights].sort()) {
  emit(`  --ds-font-weight-${weightName[w] ?? w}: ${w};`);
  count++;
}

section(
  "Gradients",
  "get_variable_defs returns an empty string for gradient-valued variables.\n" +
    "These stops came from get_design_context on a node that paints with them."
);
for (const [name, g] of Object.entries(h.gradients ?? {})) {
  if (name.startsWith("$")) continue;
  emit(`  ${cssVar(name)}: ${g.css};`);
  count++;
}

section("Effects", "glass/* combine a drop shadow with a backdrop blur.");
for (const [name, fx] of Object.entries(h.effects)) {
  const base = cssVar(name).replace("--ds-glass-", "");
  if (fx.dropShadow) {
    const d = fx.dropShadow;
    emit(`  --ds-shadow-glass-${base}: ${d.offsetX}px ${d.offsetY}px ${d.radius}px ${d.spread}px ${d.color};`);
    count++;
  }
  if (fx.glassBlur != null) {
    emit(`  --ds-blur-glass-${base}: ${fx.glassBlur}px;`);
    count++;
  }
}

/* ---------------------------------------------------------------------------
   Anything the export contains that this script does not explicitly know about.

   The design system is expected to grow: a new Figma collection arrives as a new
   top-level group in the export, and the failure mode to avoid is the silent one
   where it is simply dropped and nobody notices for a month. So unknown groups
   are emitted generically and reported, which gets their values into the mirror
   immediately and leaves a visible prompt to give them a proper section here if
   they deserve one.
   ------------------------------------------------------------------------- */
const HANDLED = new Set([
  "$schema",
  "$comment",
  "source",
  "colorPrimitives",
  "colorSemantic",
  "highlights",
  "heatmap",
  "dimensions",
  "typography",
  "effects",
  "gradients",
  "unresolved",
  "excluded",
  "knownButUnread",
]);

const unknownGroups = Object.keys(h).filter(
  (k) => !HANDLED.has(k) && h[k] && typeof h[k] === "object" && !Array.isArray(h[k])
);

for (const group of unknownGroups) {
  section(
    `${group} (not yet given a section in build-tokens.mjs)`,
    "Emitted generically so the values are usable. Give it a proper section if\n" +
      "it needs specific formatting, then add it to HANDLED."
  );
  for (const [name, value] of Object.entries(h[group])) {
    if (name.startsWith("$")) continue;
    if (typeof value === "number") {
      emit(`  ${cssVar(name, group)}: ${value}px;`);
      count++;
    } else if (typeof value === "string" && value.trim()) {
      emit(`  ${cssVar(name, group)}: ${value};`);
      count++;
    } else {
      emit(`  /* ${safeComment(name)}: not a scalar or colour, needs a rule in build-tokens.mjs */`);
    }
  }
}

if (h.unresolved?.length) {
  section("Not emitted", "Read from Figma but not expressible as a custom property.");
  for (const u of h.unresolved) {
    emit(`  /* ${safeComment(u.name)}: ${safeComment(u.reason)} */`);
  }
}

emit(`}`);
emit();

const css = lines.join("\n");

// Guard: a stray comment terminator silently turns the tail of a comment into
// broken CSS, and Tailwind will happily build around it. Assert structure instead.
let depth = 0;
let braces = 0;
for (let i = 0; i < css.length - 1; i++) {
  const pair = css.slice(i, i + 2);
  if (pair === "/*" && depth === 0) { depth = 1; i++; continue; }
  if (pair === "*/" && depth === 1) { depth = 0; i++; continue; }
  if (depth === 0) {
    if (css[i] === "{") braces++;
    if (css[i] === "}") braces--;
  }
}
if (depth !== 0) throw new Error("generated CSS has an unterminated comment");
if (braces !== 0) throw new Error(`generated CSS has unbalanced braces (${braces})`);
if (/^\s*[a-z-]+ styles resolve/m.test(css)) throw new Error("comment text leaked into CSS");

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "tokens.css"), css);

console.log(`wrote ${count} custom properties to src/design-system/tokens/tokens.css`);
if (unknownGroups.length) {
  console.log(
    `\nNOTE: ${unknownGroups.length} group(s) in the export have no section in this script ` +
      `and were emitted generically: ${unknownGroups.join(", ")}.\n` +
      `Give them a section and add them to HANDLED if they need specific formatting.`
  );
}
if (h.knownButUnread) {
  const gaps = Object.entries(h.knownButUnread)
    .filter(([k]) => !k.startsWith("$"))
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.length : v}`)
    .join(", ");
  console.log(`gaps still unreachable via MCP -> ${gaps}`);
}
