"use client";

import { BullScene } from "@/components/site/engineering/bull-scene";

/**
 * The scene, at capture size, with the palette written as literals.
 *
 * Literals are banned in a component that ships and `npm run check:surfaces`
 * enforces that; `src/app/dev` is excluded from the scan because nothing under
 * it reaches a visitor. Reading the tokens out of the document instead would put
 * a state write between the page loading and the scene existing, which is
 * exactly the race a capture script must not have. The four values are
 * `--ds-color-grey-750`, `--ds-accent-secondary`, `--ds-accent-primary` and
 * `--ds-color-grey-300`; if any of them changes in Figma, change them here and
 * re-capture.
 *
 * `data-bull-ready` on the root element is the signal the script waits for. It
 * lands on the first frame the model is actually in the scene, which is later
 * than load and later than paint.
 */
export function BullStillHarness() {
  return (
    <div id="bull-shot" className="size-[1400px]">
      <BullScene
        palette={{
          base: "#393939",
          accent: "#3fcf8e",
          deep: "#18744b",
          fill: "#bababa",
        }}
        onReady={() => {
          document.documentElement.dataset.bullReady = "";
        }}
      />
    </div>
  );
}
