/**
 * Lint customer-facing strings against the lexicon rules in doc 01 §7.
 *
 * The rules are unusually strict for a marketing site and several of them are
 * invisible in review: an em-dash pasted from a doc, an exclamation mark in a
 * button label, the word "accurate" used as a bare adjective. They are also
 * compliance-adjacent, because the SEBI Research Analyst perimeter in §8 turns
 * some of them from style into risk.
 *
 * Two severities, because some bans are absolute and some depend on context:
 *
 *   ERROR  unambiguous. Exits non-zero.
 *   WARN   the word is banned in one sense and fine in another ("alpha" as a
 *          returns promise is out, "alpha" as a release stage is in). Reported
 *          for a human to judge, never auto-failed, because a linter that cries
 *          wolf gets switched off.
 *
 * Scope is the declared copy sources plus rendered JSX text. Dev routes are
 * excluded: nothing under src/app/dev reaches a visitor.
 *
 * Run: node scripts/check-copy.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const SCAN_DIRS = ["src/app", "src/components"];
const EXCLUDE = ["src/app/dev", "src/components/ui/icons", "src/components/ui/brand"];
const EXTENSIONS = [".tsx", ".ts", ".txt"];

/**
 * Files where EVERY string literal is customer copy, not just the JSX text.
 * site.ts is the copy module; peek-data.ts is the staged data behind the sneak
 * peek surfaces, and a symbol, a screen name and a column head are read by a
 * visitor exactly as a meta description is.
 */
const COPY_MODULES = ["src/lib/site.ts", "src/lib/peek-data.ts"];

/** Doc 01 §7, hard bans. No judgement required. */
const ERRORS = [
  { re: /—/, why: "em-dash is banned in customer-facing copy" },
  { re: /(?<![-!<>=])--(?!>)/, why: "double hyphen is banned in customer-facing copy" },
  { re: /!/, why: "exclamation marks are banned" },
  {
    re: /\p{Extended_Pictographic}/u,
    why: "emoji are banned anywhere in design or copy",
  },
  { re: /\bRs\.?\s?\d/i, why: "use the rupee symbol, never Rs" },
  { re: /\bguaranteed\b/i, why: "banned word" },
  { re: /\breliable\b/i, why: "banned word" },
  { re: /\bsure[- ]shot\b/i, why: "banned word" },
  { re: /\bmultibagger\b/i, why: "banned word" },
  { re: /\bbeat the market\b/i, why: "banned phrase" },
  { re: /\bget rich\b/i, why: "banned phrase" },
];

/** Banned in one sense, legitimate in another. A person decides. */
const WARNINGS = [
  { re: /\baccurate\b/i, why: "banned as a bare adjective; fine only with a number attached" },
  { re: /\btargets?\b/i, why: "banned in a price context (RA perimeter). Fine as 'target audience'" },
  { re: /\balpha\b/i, why: "fine as a release stage, banned as a returns promise" },
  { re: /\b(buy|sell)\b/i, why: "banned as a recommendation (RA perimeter)" },
  { re: /\brecommendations?\b/i, why: "banned unless the sentence renounces them" },
  { re: /\btips?\b/i, why: "banned unless the sentence renounces them" },
  {
    re: /\b(fastest|best|biggest|largest|smartest|most \w+)\b/i,
    why: "no superlative without a number attached",
  },
];

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
    else if (EXTENSIONS.some((e) => entry.endsWith(e))) out.push(full);
  }
  return out;
}

/**
 * Pull the strings a visitor could actually read: JSX text nodes, and quoted
 * literals in the declared copy module. Comments are stripped first, or every
 * explanatory note in this repo would trip the word bans.
 */
function extractCopy(source, file) {
  if (file.endsWith(".txt")) return [{ line: 1, text: source.trim() }];

  const withoutComments = source
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m) => m.replace(/[^\n]/g, " "));

  const found = [];
  const lineOf = (index) => withoutComments.slice(0, index).split("\n").length;

  // JSX text between tags, e.g. >Go to playground<
  for (const m of withoutComments.matchAll(/>([^<>{}\n][^<>{}]*)</g)) {
    const text = m[1].trim();
    if (text && /[a-z]{3}/i.test(text)) found.push({ line: lineOf(m.index), text });
  }

  // String literals only in the declared copy modules, where every string is copy.
  if (COPY_MODULES.some((m) => file.endsWith(m))) {
    for (const m of withoutComments.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
      const text = m[1].trim();
      if (text && /[a-z]{3}/i.test(text)) found.push({ line: lineOf(m.index), text });
    }
  }

  return found;
}

const files = [
  ...SCAN_DIRS.flatMap((d) => walk(join(ROOT, d))),
  ...COPY_MODULES.map((m) => join(ROOT, m)),
];

let errors = 0;
let warnings = 0;

for (const file of files) {
  const rel = relative(ROOT, file);
  const source = readFileSync(file, "utf8");

  for (const { line, text } of extractCopy(source, rel)) {
    for (const rule of ERRORS) {
      if (rule.re.test(text)) {
        console.log(`ERROR  ${rel}:${line}  ${rule.why}\n       ${text.slice(0, 100)}`);
        errors++;
      }
    }
    for (const rule of WARNINGS) {
      if (rule.re.test(text)) {
        console.log(`warn   ${rel}:${line}  ${rule.why}\n       ${text.slice(0, 100)}`);
        warnings++;
      }
    }
  }
}

console.log(
  `\n${files.length} files scanned. ${errors} error(s), ${warnings} warning(s) for review.`
);
if (errors) {
  console.log("Errors are hard bans from doc 01 §7. Fix the copy, not the linter.");
  process.exit(1);
}
