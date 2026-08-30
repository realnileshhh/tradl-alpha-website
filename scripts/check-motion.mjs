/**
 * Fail the build when the CSS half of the motion vocabulary drifts from the TS half.
 *
 * `src/design-system/extensions/motion.ts` is the source. `motion.css` holds a
 * hand-kept copy of the two values CSS needs, because CSS cannot import a TS
 * module and generating one file from the other for two values would cost more
 * than it saves.
 *
 * Hand-kept copies drift silently: someone tunes the ease in motion.ts, the nav
 * bar keeps the old curve, and nobody sees it because both curves look fine in
 * isolation. This is the cheap version of `ds:verify` for a pair too small to
 * generate.
 *
 * Run: node scripts/check-motion.mjs
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(ROOT, "src/design-system/extensions");

const ts = readFileSync(join(DIR, "motion.ts"), "utf8");
const css = readFileSync(join(DIR, "motion.css"), "utf8");

const fail = (why) => {
  console.log(`ERROR  src/design-system/extensions/motion.css  ${why}`);
  console.log("       motion.ts is the source. Update the CSS copy to match it.");
  process.exit(1);
};

/** Read a `NAME = [a, b, c, d]` tuple out of motion.ts as a cubic-bezier string. */
const bezier = (name) => {
  const m = ts.match(new RegExp(`\\b${name}\\s*=\\s*\\[([^\\]]+)\\]`));
  if (!m) fail(`could not read ${name} from motion.ts`);
  return `cubic-bezier(${m[1]
    .split(",")
    .map((n) => n.trim())
    .join(", ")})`;
};

/** Read a `key: 0.3` entry out of the DURATION object as a millisecond string. */
const ms = (key) => {
  const m = ts.match(new RegExp(`\\b${key}:\\s*([\\d.]+)`));
  if (!m) fail(`could not read DURATION.${key} from motion.ts`);
  return `${Math.round(Number(m[1]) * 1000)}ms`;
};

/* Every value CSS keeps a copy of. Add a row when motion.css gains a variable,
   or the new one drifts unchecked, which is the exact failure this file exists
   to prevent. */
const MIRRORED = [
  ["--motion-ease", bezier("EASE_POINTS")],
  ["--motion-chrome", ms("chrome")],
];

for (const [name, expected] of MIRRORED) {
  const actual = css.match(new RegExp(`${name}:\\s*([^;]+);`))?.[1].trim();
  if (actual === undefined) fail(`${name} is missing from motion.css`);
  if (actual !== expected) fail(`${name} is "${actual}", motion.ts says "${expected}"`);
}

/* The reverse direction: a variable in the CSS that no longer has a source. */
const declared = [...css.matchAll(/^\s*(--motion-[\w-]+):/gm)].map((m) => m[1]);
const unknown = declared.filter((d) => !MIRRORED.some(([name]) => name === d));
if (unknown.length) {
  fail(`motion.css declares ${unknown.join(", ")}, which motion.ts does not define`);
}

console.log(`motion.css matches motion.ts. ${MIRRORED.length} value(s) checked.`);
