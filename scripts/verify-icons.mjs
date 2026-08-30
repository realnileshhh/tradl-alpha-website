/**
 * Verify every generated icon's viewBox actually frames its geometry.
 *
 * The viewBoxes are derived from Figma page coordinates plus a constant offset,
 * so a transcription slip would silently produce an icon that renders blank or
 * cropped. This checks the arithmetic instead of trusting it: pull the absolute
 * move-to points out of each path (Figma exports absolute commands) and assert
 * they land inside the declared box.
 *
 * Run: node scripts/verify-icons.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(ROOT, "src/components/ui/icons");

// Stroke geometry can sit slightly proud of the nominal box; allow a hairline.
const TOLERANCE = 1.5;

let checked = 0;
const problems = [];

for (const file of readdirSync(DIR).filter((f) => f.endsWith(".tsx"))) {
  const src = readFileSync(join(DIR, file), "utf8");

  const vb = src.match(/viewBox="([-\d.]+) ([-\d.]+) ([\d.]+) ([\d.]+)"/);
  if (!vb) { problems.push(`${file}: no viewBox`); continue; }
  const [x, y, w, h] = vb.slice(1).map(Number);

  const points = [];

  // Absolute move-to and line-to commands inside path data.
  for (const d of src.matchAll(/\sd="([^"]+)"/g)) {
    for (const m of d[1].matchAll(/[ML]\s*([-\d.]+)[,\s]+([-\d.]+)/g)) {
      points.push([Number(m[1]), Number(m[2])]);
    }
  }
  // Circles and rects carry their position directly.
  for (const c of src.matchAll(/<circle[^>]*cx="([-\d.]+)"[^>]*cy="([-\d.]+)"/g)) {
    points.push([Number(c[1]), Number(c[2])]);
  }
  for (const r of src.matchAll(/<rect[^>]*\sx="([-\d.]+)"[^>]*\sy="([-\d.]+)"/g)) {
    points.push([Number(r[1]), Number(r[2])]);
  }

  if (points.length === 0) { problems.push(`${file}: no geometry found`); continue; }

  const outside = points.filter(
    ([px, py]) =>
      px < x - TOLERANCE || px > x + w + TOLERANCE || py < y - TOLERANCE || py > y + h + TOLERANCE
  );

  if (outside.length) {
    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    problems.push(
      `${file}: ${outside.length}/${points.length} points outside viewBox [${x} ${y} ${w} ${h}]. ` +
        `actual bounds x ${Math.min(...xs).toFixed(1)}..${Math.max(...xs).toFixed(1)}, ` +
        `y ${Math.min(...ys).toFixed(1)}..${Math.max(...ys).toFixed(1)}`
    );
  }
  checked++;
}

console.log(`checked ${checked} icons`);
if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems) console.log("  " + p);
  process.exit(1);
}
console.log("all icons frame their geometry correctly");
