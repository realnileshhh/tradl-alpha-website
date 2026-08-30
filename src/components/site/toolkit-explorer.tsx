"use client";

import { useRef, useState, type ComponentType, type SVGProps } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { StatusPill } from "@/components/ui/badge";
import {
  IconArrowPointRight,
  IconCalendar,
  IconCandleChart,
  IconDashboard,
  IconExplore,
  IconHistory,
  IconInsightsFeed,
  IconLiveSignals,
  IconMorningDecode,
  IconPatternSniper,
  IconSearch,
  IconTableView,
} from "@/components/ui/icons";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Frame, FrameInner } from "@/components/ui/surface";
import { scrollTo } from "@/lib/scroll";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import {
  TOOLS,
  TOOL_GROUPS,
  TOOL_PREVIEW_PLACEHOLDER,
  type ToolStatus,
} from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The toolkit body: the lifecycle as a scroll.
 *
 * WHAT IT DOES. The section pins and one gesture walks the whole toolkit, from
 * AI Screener at the top of Discover to Position Co-pilot at the end of Act.
 * The stage control follows the tool rather than the other way round, the list
 * on the left swaps as the stage changes, and each tool's card rises from below
 * the frame and stacks on the ones already seen.
 *
 * WHY STAGE IS THE AXIS AND STATUS IS NOT. Doc 03 §1.4 bans pressure tactics
 * and doc 04 §4.2 says Private Access ships in full colour, never greyed out.
 * Browsing by build status makes a list of things a visitor cannot have;
 * browsing by lifecycle makes an argument about how the product is used, and
 * the status still shows on every card as a fact rather than a gate.
 *
 * ONE TRIGGER, AND IT IS NOT SCRUBBED. Doc 04 §5 allows four scrubbed triggers
 * a page and the hero already owns one. This one reads `progress` in `onUpdate`
 * and sets an integer, so React re-renders eleven times across the whole
 * section rather than sixty times a second, and the movement between states is
 * a CSS transition on transform and opacity. A scrubbed timeline here would
 * animate the same eleven steps at sixty times the cost.
 *
 * IT IS STILL CLICKABLE. Every control moves the page rather than only the
 * state: picking a stage or a tool scrolls to that tool's place in the pinned
 * range, so the scrollbar never disagrees with what is on screen. Under
 * prefers-reduced-motion no trigger is created at all and the same clicks set
 * the state directly, which leaves a plain, fully operable filter.
 */

const TOOL_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  search: IconSearch,
  "morning-decode": IconMorningDecode,
  calendar: IconCalendar,
  history: IconHistory,
  dashboard: IconDashboard,
  "candle-chart": IconCandleChart,
  "pattern-sniper": IconPatternSniper,
  "insights-feed": IconInsightsFeed,
  explore: IconExplore,
  "table-view": IconTableView,
  "live-signals": IconLiveSignals,
};

/** Viewport heights of scrolling per tool. Eleven tools, so the section runs
    about five screens: enough that each card is read, short enough that a
    visitor who wants the next section is not held hostage. */
const SCROLL_PER_TOOL = 45;

const countLabel = (n: number) => `${n} ${n === 1 ? "tool" : "tools"}`;

const toolsIn = (group: ToolStatus) => TOOLS.filter((tool) => tool.status === group);

const firstIndexOf = (group: ToolStatus) => TOOLS.findIndex((tool) => tool.status === group);

/**
 * The chevron on the selected row takes the tool's own build state, and with
 * the stage caption gone it is now the only thing on the list that carries it:
 * the tabs are labelled with the lifecycle words, so the group a tool sits in
 * says nothing about whether it has shipped. The card on the right still spells
 * it out in words.
 */
const STATUS_INK: Record<ToolStatus, string> = {
  live: "text-accent-2",
  preview: "[color:var(--ds-highlight-5)]",
  private: "[color:var(--ds-highlight-1)]",
};

/**
 * Where a card sits, given how far behind the current one it is.
 *
 * Ahead of the deck: parked below the frame, invisible. Current: square on.
 * Behind: lifted a little and shrunk a little, three cards deep and then gone,
 * because a stack that keeps every card ends up as a smear at the top edge.
 */
function cardStyle(offset: number) {
  if (offset > 0) {
    return { transform: "translateY(112%) scale(0.99)", opacity: 0, zIndex: 10 };
  }

  if (offset === 0) {
    return { transform: "translateY(0) scale(1)", opacity: 1, zIndex: 30 };
  }

  const depth = Math.min(-offset, 3);
  return {
    transform: `translateY(${-depth * 22}px) scale(${1 - depth * 0.055})`,
    opacity: Math.max(0, 0.7 - (depth - 1) * 0.24),
    zIndex: 30 - depth,
  };
}

export function ToolkitExplorer() {
  const scope = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  /* TOOLS is a non-empty literal, but the index signature does not know that
     and a fallback is cheaper than an assertion that could go stale. */
  const current = TOOLS[index] ?? TOOLS[0]!;
  const group = current.status;
  const groupTools = toolsIn(group);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const root = scope.current;
      if (!root) return;

      /* THE PIN IS DESKTOP ONLY, and the media query is load-bearing rather
         than tidy. Below `lg` the two columns stack, so the block is taller
         than the viewport and pinning it crops itself; the layout has always
         said as much and the trigger did not, which left a phone scrolling a
         five-screen pinned sequence it could not see the bottom of, and a
         pin-spacer wide enough to push the whole document 38px sideways.
         `gsap.matchMedia` creates the trigger over 1024px and reverts it, with
         the spacer, the moment the viewport drops under it. */
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        /* This block pins itself. It used to pin the whole section, which was
           right when the section held nothing else; the section now opens with
           a lifecycle band above this, and pinning all of it would drag that
           band through the sequence. */
        trigger.current = ScrollTrigger.create({
          trigger: root,
          /* Centre to centre, so the sequence starts once the whole block is
             settled in the middle of the screen rather than the moment its top
             edge arrives. */
          start: "center center",
          end: `+=${TOOLS.length * SCROLL_PER_TOOL}%`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(TOOLS.length - 1, Math.floor(self.progress * TOOLS.length));
            setIndex((currentIndex) => (currentIndex === next ? currentIndex : next));
          },
        });

        ScrollTrigger.refresh();

        return () => {
          /* Reverted with the query. `goTo` already handles the null: below
             `lg` a click sets the state and moves nothing, which is the right
             behaviour for a list that is not pinned to anything. */
          trigger.current = null;
        };
      });

      return () => mm.revert();
    },
    { scope, dependencies: [prefersReducedMotion] },
  );

  /** Move the page to a tool's place in the pinned range, so the scroll
      position and the visible card never disagree. */
  const goTo = (nextIndex: number) => {
    setIndex(nextIndex);
    const instance = trigger.current;
    if (!instance) return;
    const span = instance.end - instance.start;
    scrollTo(instance.start + ((nextIndex + 0.5) / TOOLS.length) * span);
  };

  return (
    <div ref={scope} className="px-[var(--content-gutter)]">
      <div className="mx-auto w-full max-w-content">
        {/* Centred by a wrapper, not by mx-auto on the control: the ported root
            is inline-flex, and an inline-level box ignores auto margins. */}
        <div className="flex justify-center">
          <SegmentedControl
            label="Jump to a group of the toolkit"
            size="lg"
            value={group}
            onValueChange={(next) => goTo(firstIndexOf(next as ToolStatus))}
            className="w-full max-w-[520px]"
            options={TOOL_GROUPS.map((option) => ({
              value: option.value,
              label: option.label,
              hint: countLabel(toolsIn(option.value).length),
            }))}
          />
        </div>

        <div className="mt-[40px] grid items-start gap-[var(--ds-space-7)] lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-[64px]">
          {/* Keyed on the stage so the rows replay their entrance when the list
              is replaced. The entrance is the shared chrome stagger, not a
              scroll reveal: this answers a scroll position, not a viewport. */}
          <ul key={group} className="flex flex-col gap-[var(--ds-space-1)]">
            {groupTools.map((tool, position) => {
              const Icon = TOOL_ICONS[tool.icon];
              const isActive = current.name === tool.name;

              return (
                <li
                  key={tool.name}
                  className="stagger-item"
                  style={{ "--delay": `${position * 45}ms` } as React.CSSProperties}
                >
                  <button
                    type="button"
                    aria-current={isActive || undefined}
                    onClick={() => goTo(TOOLS.findIndex((t) => t.name === tool.name))}
                    className={cn(
                      "press group flex w-full items-center gap-[var(--ds-space-5)] rounded-md text-left",
                      "border p-[var(--ds-space-3)]",
                      isActive
                        ? "border-line bg-surface shadow-spec"
                        : "border-transparent hover:border-line",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-12 shrink-0 place-items-center rounded-md border shadow-spec",
                        "transition-colors duration-[var(--motion-chrome)] ease-house",
                        isActive
                          ? "text-accent-2 [background-color:color-mix(in_srgb,var(--ds-accent-secondary)_10%,transparent)] [border-color:color-mix(in_srgb,var(--ds-accent-secondary)_45%,transparent)]"
                          : "border-line bg-surface text-fg-3 group-hover:border-line-2 group-hover:text-fg-2",
                      )}
                    >
                      <span className="grid size-6 place-items-center">
                        {Icon ? <Icon width="100%" height="100%" /> : null}
                      </span>
                    </span>

                    <span
                      className={cn(
                        "min-w-0 flex-1 text-lg font-medium transition-colors duration-[var(--motion-chrome)] ease-house",
                        isActive ? "text-fg" : "text-fg-2 group-hover:text-fg",
                      )}
                    >
                      {tool.name}
                    </span>

                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-[14px] shrink-0 place-items-center transition-opacity duration-[var(--motion-chrome)] ease-house",
                        STATUS_INK[tool.status],
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40",
                      )}
                    >
                      <IconArrowPointRight />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* The deck. Every card is mounted; the stack order and the transforms
              are the only thing scrolling changes. Placeholders until the real
              interface captures exist, so each card still states its tool, its
              build status and its one line rather than sitting empty. */}
          <Frame size="bezel" className="w-full">
            <FrameInner size="bezel" className="relative aspect-[16/10] overflow-hidden">
              {TOOLS.map((tool, position) => (
                <div key={tool.name} className="tool-card" style={cardStyle(position - index)}>
                  {/* An opaque card, not a transparent slide. The fill is
                      bg/surface resolved against the ground rather than layered
                      over it, so the card in front hides the ones behind and the
                      stack reads as a deck. Left translucent, every card's text
                      showed through every other card's, which is what the first
                      pass looked like. */}
                  <div className="flex h-full flex-col items-center justify-center gap-[var(--ds-space-4)] rounded-md border border-line px-[var(--ds-space-6)] text-center shadow-card [background-color:color-mix(in_srgb,var(--ds-color-white)_4%,var(--page-ground))]">
                    <StatusPill status={tool.status} />
                    <p className="text-lg font-medium text-fg">{tool.name}</p>
                    <p className="max-w-[46ch] text-base text-fg-2">{tool.tagline}</p>
                    <p className="text-sm text-fg-disabled">{TOOL_PREVIEW_PLACEHOLDER}</p>
                  </div>
                </div>
              ))}
            </FrameInner>
          </Frame>
        </div>
      </div>
    </div>
  );
}
