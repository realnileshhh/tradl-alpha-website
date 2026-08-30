/**
 * Site-wide constants that appear in customer-facing output.
 *
 * Everything here is bound by the lexicon rules in doc 01 §7 and the SEBI
 * Research Analyst perimeter in §8, exactly as page copy is: a meta description
 * and a share-card title are read by people, and the RA perimeter does not care
 * that a string lives in a <head>.
 *
 * The strings below are taken VERBATIM from the copy library in
 * docs/00-brief/05-claude-design-handover.md §5, which is linter-clean by
 * construction. They are not paraphrased and not composed into new sentences,
 * because a locked string edited slightly is no longer a locked string.
 *
 * Deliberately NOT sourced from reference/canvas/Website Copy.dc.html. That deck
 * is later thinking but it is unresolved against the brief on ten points and it
 * violates the em-dash ban throughout. See the open rulings noted in
 * docs/DECISIONS.md.
 */

/** Doc 01 §4: "Tradl AI" in full on first mention, "Tradl" thereafter. */
export const SITE_NAME = "Tradl AI";

/** Doc 01 §2, the category we say publicly at alpha. */
export const SITE_CATEGORY = "Agentic trading intelligence";

/**
 * Doc 05 §5.1, the hero dek, verbatim. 125 characters, inside the ~160 a search
 * result will render.
 *
 * A longer, more SEO-shaped description mentioning NSE coverage and India would
 * read better in results, but it would be a new customer-facing string and needs
 * approval rather than invention.
 */
export const SITE_DESCRIPTION =
  "Ask in plain language. Tradl writes the analysis as code, runs it on live market data, and shows you every number it computed.";

/** Doc 01 §10, the permanent doctrine line. Badge-grade, once per page maximum. */
export const DOCTRINE_LINE = "We compute, we don't predict.";

/**
 * The same line as a label rather than a sentence, which is why the full stop
 * is gone: doc 01 §7 sets labels in uppercase, and an uppercase label with
 * terminal punctuation reads as a truncated sentence. The words are untouched.
 */
export const DOCTRINE_LABEL = "We compute, we don't predict";

/** Doc 05 §5.1. The alpha campaign line. */
export const LAUNCH_LINE = "Agentic trading starts here.";

/** Indian English, Indian market. Drives og:locale and the manifest language. */
export const SITE_LOCALE = "en_IN";
export const SITE_LANG = "en-IN";

/* -----------------------------------------------------------------------------
   Navigation.

   Doc 03 §3 H0 freezes the persistent nav as: wordmark · Product (dropdown over
   the Edge overview and the four tool pages) · Stocks · Decode · Manifesto ·
   [Log in] · [Start free].

   Two deliberate departures, both narrow:

   The first item ships as the flat label the home prototype uses ("The Edge",
   linking to /edge) rather than as a dropdown, because the dropdown's contents
   are not designed yet and a menu that opens onto nothing is worse than a link.
   The dropdown is a later change to this array plus a panel, not a rebuild.

   These labels are not from the copy library in doc 05 §5, which does not carry
   nav strings. They are the prototype's, and they live here rather than inline
   in the component so `npm run check:copy` reads them: every string in this file
   is linted, and a nav label is as customer-facing as a meta description.
   -------------------------------------------------------------------------- */

export const NAV_ITEMS = [
  { label: "The Edge", href: "/edge" },
  { label: "Stocks", href: "/stocks" },
  { label: "Decode", href: "/decode" },
  { label: "Manifesto", href: "/manifesto" },
] as const;

/**
 * The primary CTA, persistent in nav, hero and footer.
 *
 * Doc 05 §5.1 locks the label as "Start free", and this is deliberately not
 * that: "Sign up" was specified for the alpha site on 30 Aug 2026. Worth
 * knowing what the change costs, because it is a real one. "Start free" names
 * an outcome and prices it in two words, which is what doc 05 §7's "buttons
 * name outcomes" rule asks for; "Sign up" names the mechanism. The reassurance
 * that used to live in the label now lives in HERO_NOTE and in the nav notice,
 * so the price is still on screen next to the button rather than lost.
 */
export const SIGN_UP_LABEL = "Sign up";
export const SIGN_UP_HREF = "/start";

/**
 * The same action, under the label doc 05 §5.1 locks, and the hero uses this
 * one. Two labels for one destination is a deliberate split rather than a
 * leftover: the nav CTA is a persistent affordance a visitor meets on every
 * page and reads as a mechanism, while the hero CTA is the page's argument and
 * gets the outcome-shaped words. If they ever have to agree, this is the one to
 * keep, because it is the locked string.
 */
export const START_FREE_LABEL = "Start free";

/** Doc 03 §3 H0. The ghost CTA beside it. */
export const LOG_IN_LABEL = "Log in";
export const LOG_IN_HREF = "/login";

/**
 * The alpha access notice, shown once per page load against the primary CTA.
 *
 * It carries two different facts rather than one fact twice. The earlier line,
 * "PRIVATE ACCESS · ALPHA OPEN", said the same thing on both sides of the dot:
 * access is private, the alpha is open. This one says what the thing is and
 * what it costs, and the second half is the half a visitor is actually deciding
 * on. Both halves are checkable, which is the test doc 01 §7 sets for a claim.
 *
 * "PRIVATE ACCESS" is the frozen status name from doc 05 §5.2, uppercase as a
 * label rather than title-cased. "Alpha" here is the release stage, which doc
 * 01 §7 permits; it is never the returns sense, which is banned.
 * `npm run check:copy` flags the word for a human on exactly that distinction,
 * so the warning is expected and correct.
 */
export const ALPHA_NOTICE = "PRIVATE ACCESS · FREE WHILE IN ALPHA";


/* -----------------------------------------------------------------------------
   The announcement bar.

   Sits above the nav, scrolls away, and is the one place on the page that talks
   about the company rather than to the trader.

   NO EMOJI. The reference this was drawn from carries a party popper next to
   the label; doc 01 §7 bans emoji anywhere in design or copy, and
   `npm run check:copy` fails the build on one. The NEW pill and the accent
   green carry the same "this is fresh" signal without it.

   The dollar figure is the one open question. Doc 01 §7 says rupees always, no
   USD on the trader-facing site. A funding round is conventionally quoted in
   USD and this line is verbatim as supplied, so it ships as given and the rule
   conflict is flagged rather than resolved by inventing a conversion.
   -------------------------------------------------------------------------- */

export const ANNOUNCEMENT_LABEL = "NEW";
export const ANNOUNCEMENT_TEXT =
  "Tradl AI raises $4.3M seed from Nexus Venture Partners and Stellaris Venture Partners";
export const ANNOUNCEMENT_HREF = "/press/seed-round";

/* -----------------------------------------------------------------------------
   Hero, doc 03 §3 H1.
   -------------------------------------------------------------------------- */

/**
 * The headline, in two spans so the last word can carry the accent.
 *
 * Joined with a space the two halves are LAUNCH_LINE character for character,
 * which is doc 05 §5.1's locked H1. The split is a type treatment, not an edit:
 * the rendered text node is the locked string.
 */
export const HERO_TITLE_LEAD = "Agentic trading starts";
export const HERO_TITLE_BEAT = "here.";

/**
 * The dek, trimmed to 16 words.
 *
 * Doc 05 §5.1's dek runs 24 words: "Ask in plain language. Tradl writes the
 * analysis as code, runs it on live market data, and shows you every number it
 * computed." This is that sentence with the middle clause deleted, not a new
 * one written beside it, so every surviving word is still the approved word and
 * the claim is strictly weaker rather than different. The dropped clause, "runs
 * it on live market data", is the one the hero can afford to lose because the
 * ticker strip above it is already making that point.
 *
 * NEEDS SIGN-OFF as a variant of a locked string.
 */
export const HERO_DEK =
  "Ask in plain language. Tradl writes the analysis as code and shows every number it computed.";

/** Under the email row. Two short declaratives, both checkable. */
export const HERO_NOTE = "Free while in alpha. No card required.";

export const EMAIL_LABEL = "Email address";
export const EMAIL_PLACEHOLDER = "Your email";

/** Doc 03 §3 H1's second CTA. The prototype's label, and it names what happens. */
export const SEE_IT_COMPUTE_LABEL = "See it compute";
export const SEE_IT_COMPUTE_HREF = "/edge";

/* -----------------------------------------------------------------------------
   The hero demo frame.

   A placeholder. Doc 05 §6 lists the Playground presets and re-recorded demos
   as things that do not exist yet, so the frame ships empty and labelled rather
   than filled with something invented.
   -------------------------------------------------------------------------- */

export const DEMO_LABEL = "THE PLAYGROUND";
export const DEMO_PLACEHOLDER = "Demo recording lands here.";


/* -----------------------------------------------------------------------------
   H4 · The toolkit, doc 03 §3.
   -------------------------------------------------------------------------- */

/** Doc 05 §5.2, verbatim. The ◈ is rendered beside it rather than stored in it. */
export const TOOLKIT_EYEBROW = "THE TOOLKIT";

/**
 * The section headline.
 *
 * It used to be "Discover · Analyse · Act", which doc 05 §7 freezes as the
 * lifecycle wording. That triple now labels the control directly underneath, so
 * the headline was saying the same three words twice on one screen, and a
 * headline that repeats the control below it is a headline doing no work.
 *
 * This line says the thing the control cannot: what the shared memory buys you.
 * It is the section's claim, the dek explains the mechanism, and the control
 * lists the parts.
 *
 * NEW COPY, not from the library in doc 05 §5, and it needs sign-off. It is
 * lexicon-clean: no banned word, no superlative, one idea, and the claim is
 * checkable against the product rather than an adjective.
 */
export const TOOLKIT_TITLE_LEAD = "No tool starts from";
export const TOOLKIT_TITLE_BEAT = "zero.";

/**
 * COUNT MISMATCH, and it is deliberate rather than an oversight.
 *
 * This line ships as supplied on 30 Aug 2026. Doc 05 §3, which the brief calls
 * the single source of truth for this section, lists THIRTEEN tools; the home
 * prototype says twelve; this says eleven. A visitor can count them on /edge,
 * so the number is checkable and one of the three is wrong on the page that
 * makes the claim.
 *
 * It is one word to change, and it is isolated here for exactly that reason.
 *
 * The space before the middot is non-breaking. A separator that wraps to the
 * start of a line reads as a bullet point rather than as punctuation, and this
 * line breaks in exactly that place at the measure it is set on.
 */
export const TOOLKIT_DEK =
  "Eleven instruments, one memory. Ask once\u00a0· every tool already knows the context.";


/* -----------------------------------------------------------------------------
   The tool map.

   Doc 05 §3 is the single source of truth, and this is a SUBSET of it: eleven
   tools, not the thirteen the map carries. Strategy Copilot and Smart Charts are
   absent because the alpha list supplied on 30 Aug 2026 leaves them out, which
   is also what makes TOOLKIT_DEK's "eleven" true. If either comes back, it comes
   back here and the dek's number changes with it.

   TWO AXES, and keeping them apart is the point. `stage` is where a tool sits in
   the lifecycle, Discover then Analyse then Act, which doc 05 §7 freezes as the
   wording and doc 03 §3 uses as the section's spine. `status` is how far the
   build has got: LIVE, PREVIEW, PRIVATE ACCESS. The section browses by stage,
   because that is the argument, and each tool still carries its status as a pill
   in the frame, because that is the fact.

   The array order is the order the scroll walks, and it runs group by group:
   the five in LIVE, then the one in PREVIEW, then the five in PRIVATE ACCESS.
   Interleaving them would make the control jump backwards and forwards between
   tabs as a visitor scrolls in one direction, which reads as a bug. It also
   starts on AI Screener and ends on Position Co-pilot, as specified.

   One naming correction, and it is the brief's rather than mine. The list came
   in with "Charts"; doc 05 §7 freezes the name as "Tradl AI Charts" and retires
   "AI Charts" and "native charts" precisely because three projects were calling
   it three things.

   Taglines are the home prototype's, unchanged: no em-dashes, no banned words, a
   fact or an image in each. The prototype's longer descriptions are NOT used;
   every one of them carries an em-dash.
   -------------------------------------------------------------------------- */

/**
 * The three groups the toolkit is browsed by, as specified on 30 Aug 2026.
 *
 * READ THIS BEFORE CHANGING IT. The groups are doc 05 §3's build states, LIVE,
 * PREVIEW and PRIVATE ACCESS, wearing the lifecycle words as labels. They are
 * not the lifecycle: the "Act" group holds Pattern Sniper, whose own stage is
 * Discover, and every row prints its real stage underneath its name, so a
 * visitor can see a row captioned DISCOVER sitting under a tab called Act.
 *
 * That is what was asked for and it is what ships. The two ways to make the
 * words agree with the contents, when someone wants to: label the tabs LIVE,
 * PREVIEW and PRIVATE ACCESS and keep these groups, or group by `stage` and let
 * the tabs keep these labels. Either is one edit here.
 */
export const TOOL_GROUPS = [
  { value: "live", label: "Discover" },
  { value: "preview", label: "Analyse" },
  { value: "private", label: "Act" },
] as const;

/** Doc 05 §3's build states. The grouping key, and the pill on every card. */
export type ToolStatus = (typeof TOOL_GROUPS)[number]["value"];

/** Doc 05 §7's lifecycle, printed under each tool's name. */
export const TOOL_STAGES = [
  { value: "discover", label: "Discover" },
  { value: "analyse", label: "Analyse" },
  { value: "act", label: "Act" },
] as const;

export type ToolStage = (typeof TOOL_STAGES)[number]["value"];

export const STAGE_LABEL: Record<ToolStage, string> = {
  discover: "Discover",
  analyse: "Analyse",
  act: "Act",
};

export type Tool = {
  name: string;
  tagline: string;
  stage: ToolStage;
  status: ToolStatus;
  /** Key into the generated icon set. See TOOL_ICONS in the toolkit component. */
  icon: string;
};

export const TOOLS: Tool[] = [
  {
    name: "AI Screener",
    tagline: "3,000 stocks funnel down to your sentence.",
    stage: "discover",
    status: "live",
    icon: "search",
  },
  {
    name: "Morning Decode",
    tagline: "Six reads at dawn, graded at dusk.",
    stage: "discover",
    status: "live",
    icon: "morning-decode",
  },
  {
    name: "Events Calendar",
    tagline: "The calendar that knows what usually moves.",
    stage: "discover",
    status: "live",
    icon: "calendar",
  },
  {
    name: "AI Backtesting",
    tagline: "Your setup, replayed honestly across history.",
    stage: "analyse",
    status: "live",
    icon: "history",
  },
  {
    name: "Smart Stock Pages",
    tagline: "One stock, seven watchers in orbit.",
    stage: "analyse",
    status: "live",
    icon: "dashboard",
  },
  {
    name: "Tradl AI Charts",
    tagline: "Candles that carry their own annotations.",
    stage: "analyse",
    status: "preview",
    icon: "candle-chart",
  },
  {
    name: "Pattern Sniper",
    tagline: "Crosshairs on every chart.",
    stage: "discover",
    status: "private",
    icon: "pattern-sniper",
  },
  {
    name: "Insights Engine",
    tagline: "The anomaly stands out because everything is measured.",
    stage: "discover",
    status: "private",
    icon: "insights-feed",
  },
  {
    name: "F&O Discovery",
    tagline: "Call and put flow, crossing where it matters.",
    stage: "discover",
    status: "private",
    icon: "explore",
  },
  {
    name: "Smart Chain",
    tagline: "The strike ladder, climbing with open interest.",
    stage: "analyse",
    status: "private",
    icon: "table-view",
  },
  {
    name: "Position Co-pilot",
    tagline: "Your position, recomputed every session.",
    stage: "act",
    status: "private",
    icon: "live-signals",
  },
];

/** The frame on the right, until the real interface captures exist. */
export const TOOL_PREVIEW_PLACEHOLDER = "Interface preview lands here.";


/* -----------------------------------------------------------------------------
   H6 · The sneak peek.

   Four product surfaces, shown as windows, one at a time. The home prototype
   calls this the Sneak Peek and carries all four with live-looking data in
   them; this ships the frames and says plainly that the captures are not made
   yet, because doc 05 §6 lists the interface recordings as assets that do not
   exist and a fabricated leaderboard is a claim about the product.

   NEW COPY, needs sign-off. None of it is in the library at doc 05 §5. Every
   line below is the prototype's own, repunctuated where it used an em-dash
   (doc 01 §7) and trimmed to one idea a sentence. Nothing is invented about
   what a surface does.

   Compliance, doc 01 §8: no surface here names a recommendation, a price
   target or a direction. The rotation line deliberately says "reading" rather
   than the prototype's "trade", which is the one word in this block that would
   have crossed the RA perimeter.
   -------------------------------------------------------------------------- */

export const PEEK_EYEBROW = "SNEAK PEEK";

/**
 * The headline, with the accent word carrying the brand gradient like every
 * other section title on the page. The full stop is the page's rule rather than
 * the prototype's: the hero lands on "here.", the toolkit on "zero.", the
 * founders on "exist.", and a title without one in the middle of those reads as
 * a dropped character rather than as a choice.
 */
export const PEEK_TITLE_LEAD = "Inside the";
export const PEEK_TITLE_BEAT = "terminal.";

/**
 * The prototype's dek runs on into "Illustrative frames, live data wires in at
 * launch". That half is dropped: the frames on this page are visibly empty and
 * each one says so inside itself, so the sentence would be apologising for
 * something the design already admits.
 */
export const PEEK_DEK = "Four surfaces from the build, exactly as they land.";

export type PeekSurface = {
  /** The rail label under the carriage. Uppercase, doc 01 §7. */
  name: string;
  /** The window's own title bar: the surface, then what it claims. */
  chrome: string;
  /** One sentence, under the well. */
  caption: string;
};

export const PEEK_SURFACES: PeekSurface[] = [
  {
    name: "EXPLORE HOME",
    chrome: "EXPLORE · YOUR LOGGED-IN HOME",
    caption:
      "What passed your screens overnight, the Morning Decode, and the day's sector heat, on one page.",
  },
  {
    name: "SCREENS LIBRARY",
    chrome: "SCREENS · THEY RUN THEMSELVES",
    caption:
      "Take ours and make it yours. Edit a threshold in place and the count moves as you type.",
  },
  {
    name: "AI BACKTESTING",
    chrome: "AI BACKTESTING · HONEST BY ARCHITECTURE",
    caption:
      "Replay an idea across history. The drawdowns are drawn at full weight, never smoothed.",
  },
  {
    name: "SECTOR ROTATION",
    chrome: "SECTOR ROTATION · SEE IT, DON'T GUESS IT",
    caption:
      "Leading, improving, weakening, lagging. Where a sector is heading is the reading, not where it sits.",
  },
];

/* The carriage's controls. Read out rather than shown, except the surface name
   in the middle, which is both. */
export const PEEK_GROUP_LABEL = "Product surfaces";
export const PEEK_PREV_LABEL = "Previous surface";
export const PEEK_NEXT_LABEL = "Next surface";
export const PEEK_SHOW_LABEL = "Show";



/* -----------------------------------------------------------------------------
   H8 · Why we're building this, doc 03 §3.

   The quotes are the home prototype's, with one punctuation edit each: the
   prototype writes both with em-dashes, which doc 01 §7 bans outright, so the
   first takes a comma and the second a colon. No word is changed, because a
   quote with a word changed is not a quote.

   Full names, as supplied on 30 Aug 2026 with the portraits. Worth one look
   before launch: the commit history on this repository says Nilesh Chaturvedi,
   so if the site should carry the legal name rather than the working one, this
   is the line to change.
   -------------------------------------------------------------------------- */

export const FOUNDERS_EYEBROW = "WHY WE'RE BUILDING THIS";

/**
 * NEW COPY, needs sign-off. Not in the library at doc 05 §5.
 *
 * The section is two quotes about a gap in the market, so the headline says the
 * plainest true thing about why the company exists and gets out of their way.
 */
export const FOUNDERS_TITLE_LEAD = "We wanted this to";
export const FOUNDERS_TITLE_BEAT = "exist.";

export type Founder = {
  name: string;
  role: string;
  quote: string;
  portrait: string;
};

export const FOUNDERS: Founder[] = [
  {
    name: "Nilesh Raj",
    role: "Co-founder",
    quote:
      "Retail India got faster apps, cheaper trades, and the same old guesswork. The intelligence stayed with the institutions. We're building the decade where a trader with one lakh runs the same calibre of analysis as a desk with a hundred crore, and can read every line of it. That future isn't coming. It's compiling.",
    portrait: "/founders/nilesh.webp",
  },
  {
    name: "Shubham Bansal",
    role: "Co-founder",
    quote:
      "The AI never touches the math. It reads your intent; a deterministic quant engine does the computing: completed bars only, real contract metadata, rules that never flatter you. Same question, same data, same answer, to the last paisa. That's what makes AI in trading not just futuristic, but something a retail trader can actually build a system on.",
    portrait: "/founders/shubham.webp",
  },
];

/* -----------------------------------------------------------------------------
   FAQ, doc 03 §5 T6's pattern on the homepage.

   The prototype's five pairs. Two answers carried em-dashes and are repunctuated
   into two sentences rather than one, which doc 01 §7 asks for anyway: one idea
   per sentence.
   -------------------------------------------------------------------------- */

export const FAQ_TITLE = "Before you ask";

/**
 * The heading column beside the questions. NEW COPY, needs sign-off.
 *
 * The five here are the ones that decide whether a visitor trusts the product
 * at all: what it is, whether the numbers are real, what Private Access means,
 * what it costs, and whether it disturbs their broker. The line says that
 * plainly and points at where the longer argument lives.
 */
export const FAQ_EYEBROW = "QUESTIONS";
export const FAQ_LEAD =
  "The five that come up first. The longer argument is in the manifesto.";
export const FAQ_LINK_LABEL = "Read the manifesto";
export const FAQ_LINK_HREF = "/manifesto";

export const FAQS: Array<{ question: string; answer: string }> = [
  {
    question: "Is this investment advice?",
    answer:
      "No. Tradl publishes computed and historical analytics. What you do with them is your call, and your broker's to execute.",
  },
  {
    question: "Is the AI guessing the numbers?",
    answer:
      "Never. Code computes every figure; the AI only understands your question and explains the result.",
  },
  {
    question: "What does Private Access mean?",
    answer:
      "Tools still in the workshop. Alpha users get them first, in full colour. Nothing on this site is greyed out.",
  },
  {
    question: "What does alpha cost?",
    answer:
      "Nothing. Pricing is announced before alpha ends, and alpha users keep alpha pricing for life.",
  },
  {
    question: "Do I need to move my broker account?",
    answer: "No. Tradl analyses; your broker executes.",
  },
];

/* -----------------------------------------------------------------------------
   H9 · The close, doc 03 §3.
   -------------------------------------------------------------------------- */

export const CLOSE_TITLE_LEAD = "Join the first generation of";
export const CLOSE_TITLE_BEAT = "AI-native";
export const CLOSE_TITLE_TAIL = "traders.";

/**
 * The page's one warm beat, doc 01 §7: lowercase, and the only line on the site
 * that is not instrument-grade.
 *
 * The rule asks for serif italic. There is no serif on this site: every type
 * variable in Figma is Inter and docs/DECISIONS.md 002 settles it, so this is
 * set in italic Inter and the serif half of the rule is a reported gap rather
 * than a font added for one line against the LCP budget.
 */
export const CLOSE_BEAT_LEAD = "the market, finally";
export const CLOSE_BEAT_ACCENT = "intelligent.";

/**
 * Three facts under the CTA, from the prototype, minus its seat counter.
 *
 * Three chips rather than one dim sentence, because that is what they are:
 * separate, checkable claims. Run together in a grey line they read as a
 * caption nobody stops for.
 *
 * The prototype's button reads "Claim your seat · {n} left". Doc 03 §1.4 bans
 * fake scarcity outright, and a real number does not exist yet, so the CTA is
 * the locked "Start free" and the line below it carries facts that are already
 * true and checkable.
 */
export const CLOSE_PROOF_ITEMS = [
  "Graded in public daily",
  "3,000+ stocks watched",
  "Alpha open",
];

/* -----------------------------------------------------------------------------
   Footer, doc 03 §3 and doc 05 §5.8.

   The compliance block is the part that matters. Doc 01 §8 puts the RA
   registration number in the footer sitewide and the data attribution beside
   it; doc 05 §5.8 gives the wording and flags the risk line as open with JARS.
   The registration number is a BRACED PLACEHOLDER on purpose: it is not known
   here, and a plausible-looking invented one is the single worst string that
   could ship on this site.
   -------------------------------------------------------------------------- */

export const FOOTER_TAGLINE = "Trading intelligence for Indian markets.";

export const FOOTER_COLUMNS: Array<{ heading: string; links: Array<{ label: string; href: string }> }> = [
  {
    heading: "PRODUCT",
    links: [
      { label: "The Edge", href: "/edge" },
      { label: "AI Screener", href: "/edge/screener" },
      { label: "AI Backtesting", href: "/edge/backtesting" },
      { label: "Smart Stock Pages", href: "/stocks" },
    ],
  },
  {
    heading: "MARKETS",
    links: [
      { label: "Stocks A to Z", href: "/stocks" },
      { label: "Sectors", href: "/sectors" },
      { label: "Events", href: "/events" },
      { label: "Morning Decode", href: "/decode" },
    ],
  },
  {
    heading: "COMPANY",
    links: [
      { label: "Manifesto", href: "/manifesto" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/** Doc 05 §5.8, verbatim. */
export const COMPLIANCE_LINES = [
  "Tradl AI publishes computed and historical analytics. Nothing on this platform is investment advice or a recommendation.",
  "SEBI Research Analyst Reg. No. {number}",
  "Market data: CMOTS, NSE, BSE.",
];

/**
 * The statutory risk line. Doc 05 §5.8 lists the exact wording as open with
 * JARS, so this is the standard SEBI sentence and it is the one string in the
 * footer that legal has to confirm before launch rather than after.
 */
export const RISK_LINE =
  "Investments in the securities market are subject to market risks. Read all the related documents carefully before investing.";

export const FOOTER_LEGAL = `© ${new Date().getFullYear()} Tradl AI`;


/* -----------------------------------------------------------------------------
   The lifecycle showcase, doc 03 §3 H5's "lifecycle band".

   Three panels, one per stage, in the order the work actually happens. Each has
   a resting line and one more that appears when a visitor points at it: the
   resting line says what the stage is for, the second says how Tradl does it.

   NEW COPY, needs sign-off. None of it is in the library at doc 05 §5. It is
   written against the tool map in §3 rather than invented: Discover is the five
   screening and surfacing tools, Analyse is backtesting, stock pages, charts and
   the chain, Act is the position work. Every number in it is one the brief
   already publishes.

   Compliance, doc 01 §8: not one line here names a recommendation, a target or
   a direction. "Test it before it costs you" is about the visitor's own idea,
   which is the same thing the prototype's backtesting tagline says.
   -------------------------------------------------------------------------- */

export type ShowcaseStage = {
  index: string;
  title: string;
  headline: string;
  dek: string;
  /** Appears on hover, under the dek. */
  more: string;
  /** Alt text for the placeholder, and the label inside it. */
  placeholder: string;
};

export const SHOWCASE_STAGES: ShowcaseStage[] = [
  {
    index: "01",
    title: "Discover",
    headline: "Start with the whole market.",
    dek: "Ask in plain language. Every match across 3,000 NSE stocks, never a sample.",
    more: "Screens, the Morning Decode and the events calendar all read the same universe.",
    placeholder: "Screener run",
  },
  {
    index: "02",
    title: "Analyse",
    headline: "Test it before it costs you.",
    dek: "Replay any idea across history, with the drawdowns at full weight.",
    more: "Every figure is computed in code, and the code stays on screen.",
    placeholder: "Backtest result",
  },
  {
    index: "03",
    title: "Act",
    headline: "Carry the read into the position.",
    dek: "Your open positions, recomputed against your actual entry, every session.",
    more: "You decide what to do. The engine keeps the arithmetic honest.",
    placeholder: "Position ledger",
  },
];

/** Inside each showcase panel until the recordings exist. */
export const SHOWCASE_PLACEHOLDER_NOTE = "Recording lands here.";
