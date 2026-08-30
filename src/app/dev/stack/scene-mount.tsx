"use client";

import dynamic from "next/dynamic";

/**
 * The lazy boundary for 3D. It has to live in a client component:
 * `next/dynamic` with `ssr: false` is rejected inside a Server Component,
 * because opting out of SSR is a client-side decision the server has no
 * way to honour.
 *
 * three + drei + postprocessing is roughly 600KB gzipped. This boundary is
 * what keeps that off every route that does not render a scene, so copy
 * this pattern rather than importing a scene directly.
 */
const DemoScene = dynamic(() => import("./scene").then((m) => m.DemoScene), {
  ssr: false,
  // Doc 04 §5: the placeholder is a painted static, never a spinner.
  loading: () => <div className="h-full w-full bg-surface" />,
});

export function SceneMount() {
  return <DemoScene />;
}
