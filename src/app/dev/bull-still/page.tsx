import { notFound } from "next/navigation";
import { env } from "@/lib/env";
import { BullStillHarness } from "./harness";

/**
 * The capture harness for `public/models/bull-still.webp`. NOT part of the site.
 *
 * The engineering section paints a static of the bull before WebGL arrives, and
 * doc 04 §5 wants that static to be the finished state rather than a placeholder
 * that resembles it. So the still is a screenshot of this page: the same scene,
 * the same lights, the same material, at the pose the turn starts and ends on.
 * Regenerate it with `node scripts/capture-bull-still.mjs`.
 *
 * Nothing here has a ground, because the capture is transparent: the still
 * composites onto whatever the section puts behind it.
 *
 * 404s in production, like every other route under `src/app/dev`.
 */
export default function BullStillPage() {
  if (env.isProduction) notFound();

  return <BullStillHarness />;
}
