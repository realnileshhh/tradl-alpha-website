import type { ComponentType, SVGProps } from "react";
import {
  IconArrowNavigate,
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

/**
 * The glyph for each tool, keyed by the `icon` field on TOOLS in lib/site.
 *
 * SHARED, and that is the whole reason it is a file. The toolkit has two
 * presentations of the same list, the bento grid and the pinned explorer behind
 * SHOW_TOOLKIT_EXPLORER, and a second copy of this map would go stale the first
 * time a tool was added to one of them: the tool would render with no icon in
 * the other, and nothing would fail to say so.
 *
 * A key with no entry renders nothing rather than throwing. That is deliberate:
 * a missing glyph is a gap in the icon set, and a section that refuses to render
 * because of one is worse than a card with a blank square in it.
 */
export const TOOL_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
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
  "arrow-navigate": IconArrowNavigate,
};
