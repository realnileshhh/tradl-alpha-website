"use client";

import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { lockScroll, scrollTo, unlockScroll } from "@/lib/scroll";
import { useEffect, useState } from "react";

/**
 * Proof of the reveal layer, the scroll control surface and the lock.
 *
 * Everything here is the vocabulary a real page is allowed to use. If a page
 * needs something this file cannot express, that is a design decision to take
 * in docs/MOTION.md, not a one-off tween in a component.
 */
export function Reveals() {
  return (
    <div className="mt-32 space-y-32">
      <section>
        <p className="text-fg-3 text-xs uppercase tracking-wide">Statement register</p>
        <SplitWords
          as="h2"
          text="One reveal, split by word, masked."
          className="mt-4 text-statement font-bold"
        />
      </section>

      <section>
        <p className="text-fg-3 text-xs uppercase tracking-wide">Instrument register</p>
        <Reveal as="p" className="mt-4 max-w-prose text-fg-2">
          A single box on a single trigger. It rises 12 per cent of its own height
          and settles. The trigger destroys itself once it has fired, so scrolling
          back up leaves the page still.
        </Reveal>
      </section>

      <section>
        <p className="text-fg-3 text-xs uppercase tracking-wide">
          Staggered group, one trigger for six cards
        </p>
        <Reveal
          stagger
          className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="rounded-card border border-line bg-surface p-6"
            >
              <span className="num text-2xl text-fg">{n}</span>
            </div>
          ))}
        </Reveal>
      </section>

      <ScrollControls />
    </div>
  );
}

/** Proves scrollTo, the reference-counted lock and the nested-scroll handover. */
function ScrollControls() {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (!locked) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLocked(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [locked]);

  return (
    <section id="scroll-controls" className="space-y-4">
      <p className="text-fg-3 text-xs uppercase tracking-wide">Scroll control</p>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="touch-target rounded-md border border-line-strong px-4 py-2 text-fg-2"
          onClick={() => scrollTo(0)}
        >
          scrollTo top
        </button>
        <button
          type="button"
          className="touch-target rounded-md border border-line-strong px-4 py-2 text-fg-2"
          onClick={() => setLocked(true)}
        >
          lockScroll
        </button>
      </div>

      <div
        className="h-40 overflow-y-auto rounded-card border border-line bg-surface p-4 text-fg-2"
        data-lenis-prevent
      >
        <p className="mb-2 text-fg-3 text-xs uppercase tracking-wide">
          Nested scroller
        </p>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="num">
            {String(i + 1).padStart(2, "0")}
          </p>
        ))}
      </div>

      {locked ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-elevated p-6">
          <div className="rounded-card border border-line bg-surface p-8 text-center">
            <p className="text-fg">
              The page behind is stopped, not hidden. Esc releases it.
            </p>
            <button
              type="button"
              className="touch-target mt-6 rounded-md border border-line-strong px-4 py-2 text-fg-2"
              onClick={() => setLocked(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
