/**
 * Capture the engineering section's painted static.
 *
 * The section paints `public/models/bull-still.webp` before WebGL arrives, and
 * doc 04 §5 asks that the first frame be the finished state rather than
 * something that resembles it. So the still is a screenshot of the real scene:
 * this script drives `/dev/bull-still`, which mounts the same component with the
 * same lights and the same material, and waits for the signal the scene raises
 * on the first frame the model is in it.
 *
 * Not part of `ds:build`. That pipeline mirrors Figma and must stay
 * deterministic and offline; this one needs a dev server and a browser. Run it
 * by hand, and only when the scene's look actually changes:
 *
 *   npm run dev                            (in another terminal)
 *   node scripts/capture-bull-still.mjs
 *
 * Requires playwright, which is not a dependency of this project. `npx
 * playwright` is enough; the browser binary is downloaded once.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const URL = process.env.CAPTURE_URL ?? "http://localhost:4100/dev/bull-still";
const OUT = join(ROOT, "public/models/bull-still.webp");

/**
 * Capture size, and it is not arbitrary.
 *
 * The stage renders at most 700 CSS pixels wide, and `SceneCanvas` caps device
 * pixel ratio at 2, so the largest buffer the live scene ever draws is 1400.
 * Capturing at that size means the still is compared against a render of the
 * same resolution rather than being downscaled into it, which is a real
 * difference: fine specular streaks averaged down read as a brighter, flatter
 * animal than the one WebGL draws.
 */
const SIZE = 1400;

const scratch = mkdtempSync(join(tmpdir(), "bull-still-"));
const raw = join(scratch, "bull.png");

/** Share of fully transparent pixels, 0 to 1. */
async function transparentShare(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let clear = 0;
  for (let i = 3; i < data.length; i += info.channels) if (data[i] === 0) clear += 1;
  return clear / (info.width * info.height);
}

/** Mean absolute per-channel difference between two same-sized PNGs, 0 to 255. */
async function meanDifference(a, b) {
  const [x, y] = await Promise.all(
    [a, b].map((file) => sharp(file).raw().toBuffer({ resolveWithObject: true })),
  );
  if (x.data.length !== y.data.length) return Infinity;
  let total = 0;
  for (let i = 0; i < x.data.length; i += 1) total += Math.abs(x.data[i] - y.data[i]);
  return total / x.data.length;
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: SIZE, height: SIZE },
  deviceScaleFactor: 1,
  /* SceneCanvas refuses to mount WebGL under reduced motion, and a headless
     browser's default is not guaranteed. State it. */
  reducedMotion: "no-preference",
});

/**
 * Shoot the canvas, not its box, and do not trim or re-fit afterwards. The still
 * is painted at the same size and in the same place as the canvas that fades in
 * over it, so any reframing here would show up as the bull jumping at the moment
 * WebGL takes over.
 */
async function shoot(path) {
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: `
      /* The dev overlay is a portal at the bottom of the body and it is opaque,
         so it lands in the capture. */
      nextjs-portal { display: none !important; }

      /* THE GROUND HAS TO GO, and this is the line the first version was
         missing. \`omitBackground\` removes the browser's own default white
         backdrop and nothing else, so an explicit background-color on <body>,
         which globals.css sets to --page-ground, is painted and captured like
         any other pixel. The result was a still with no alpha channel at all:
         an opaque near-black square that punched a hole through the section's
         bloom for as long as it was on screen. */
      html, body { background: transparent !important; }
    `,
  });
  await page.waitForSelector("html[data-bull-ready]", { timeout: 60_000 });
  /* One more frame after the signal, so the compositor has the drawn buffer. */
  await page.waitForTimeout(500);
  await page.locator("#bull-shot canvas").screenshot({ path, omitBackground: true });
}

/**
 * TWICE, AND THEY MUST AGREE.
 *
 * This drives a dev server, and a dev server will happily serve a page compiled
 * from the module graph as it was before the edit that prompted the re-capture.
 * That failure is silent and it lasts: the still goes stale, the live scene
 * moves on, and the only symptom is a bull that changes pose or brightness the
 * instant WebGL loads. Shooting twice across a reload catches it, because the
 * second pass is always against the settled build.
 */
const second = join(scratch, "bull-2.png");
await shoot(raw);
await shoot(second);
await browser.close();

function fail(message) {
  console.error(message);
  rmSync(scratch, { recursive: true, force: true });
  process.exit(1);
}

const drift = await meanDifference(raw, second);
if (drift > 0.4) {
  fail(
    `capture unstable: two passes differ by ${drift.toFixed(2)}/255. The dev server was probably still compiling. Run it again.`,
  );
}

/**
 * The still composites onto the section's own bloom, so it has to be cut out.
 * A capture that comes back fully opaque is a capture of the page ground, and
 * that failure is invisible in a preview: flattened against the ground for a
 * look it is indistinguishable from the transparent one it should have been.
 * Most of a 1400px square is empty around the animal, so the real figure is
 * upwards of half; a tenth is a floor that only a genuinely broken capture
 * trips.
 */
const clear = await transparentShare(second);
if (clear < 0.1) {
  fail(
    `capture is ${(100 - clear * 100).toFixed(1)}% opaque. The page ground was captured with it: check that the stylesheet in shoot() still clears html and body.`,
  );
}

await sharp(second)
  .webp({ quality: 82, alphaQuality: 90, effort: 6 })
  .toFile(OUT);

rmSync(scratch, { recursive: true, force: true });

const size = execFileSync("wc", ["-c", OUT]).toString().trim().split(/\s+/)[0];
console.log(
  `bull-still.webp written, ${(Number(size) / 1024).toFixed(1)}KB, ${(clear * 100).toFixed(1)}% transparent`,
);
