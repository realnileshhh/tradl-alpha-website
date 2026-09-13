/**
 * Surfaces that are built, working, and deliberately not on the page yet.
 *
 * Everything behind a flag here is finished code with its motion and its
 * interactions intact. It is withheld because the thing it points at is not
 * ready, not because it was wrong, and each one is expected back.
 *
 * WHY A FLAG RATHER THAN A DELETION. A deleted component comes back as a
 * reconstruction, and the parts that get lost are never the markup: they are
 * the measured numbers and the bug fixes written into the comments. The hero's
 * demo scene is the clearest case. Its choreography carries a pin, a scrubbed
 * timeline, a measured travel distance and a hem that took three wrong turns to
 * get right, all documented in components/site/hero-choreography. Rebuilding
 * that from a screenshot would cost a day and would quietly lose the hem.
 *
 * WHY NOT COMMENTED-OUT JSX. Commented markup is invisible to TypeScript, to
 * ESLint and to `npm run verify`, so it rots: a token renamed six weeks from
 * now breaks it and nothing says so. Behind a flag the code still compiles,
 * still type-checks, and still fails the build if something it depends on moves.
 *
 * Each constant is annotated `: boolean` on purpose. Written bare, TypeScript
 * narrows `false` to the literal type, and `{FLAG && <Thing />}` then reads as
 * provably dead to both the compiler and `no-constant-binary-expression`. The
 * annotation keeps the type wide, which is honest: these are switches, and the
 * value is the current position rather than the truth about the switch.
 *
 * Turning one back on is one edit here. No other file changes.
 */

/**
 * The doctrine pill above the hero headline: "We compute, we don't predict",
 * as a hairline eyebrow.
 *
 * OFF because the hero now opens on the headline. The line itself is not
 * retired; DOCTRINE_LINE still carries it for the surfaces that state the
 * principle in full.
 */
export const SHOW_DOCTRINE_PILL: boolean = false;

/**
 * The hero's secondary CTA, "See it compute", pointing at /edge.
 *
 * OFF because the hero's ask is now the single email row and one ask reads
 * louder than two. The button itself is components/site/spark-button, and its
 * travelling edge light, the ten-segment comet and the geometry note that ties
 * `rx` to the control height all stay exactly as built.
 */
export const SHOW_SEE_IT_COMPUTE: boolean = false;

/**
 * The full-measure demo frame under the hero, and with it the scroll
 * choreography that carries it to the centre of the viewport.
 *
 * OFF because the recording it is a frame for does not exist yet (doc 05 §6
 * lists it as an asset still to come), and an empty bezel taking a full viewport
 * of pinned scroll spends the page's most expensive beat on nothing.
 *
 * <HeroChoreography> still wraps the hero and is untouched. It looks for
 * `[data-hero-frame]` and returns early when it is absent, so with this off the
 * scene is a plain document-flow section: no pin, no scrubbed trigger, no hem,
 * nothing half-transformed. Turning it on restores the whole sequence, because
 * the copy it dissolves still carries `data-hero-copy`.
 *
 * ONE THING TO CHECK when it comes back: the hero is now two columns, and the
 * frame sits under both. It was written for a centred single column, so the
 * travel measurement is still right but the composition wants a second look.
 */
export const SHOW_HERO_DEMO_SCENE: boolean = false;

/**
 * The third lifecycle stage, Act, wherever the toolkit shows it: the "03 Act"
 * panel in the lifecycle band, and the Act tab with its two tools in the
 * explorer below it.
 *
 * OFF on the founder's instruction, 13 Sep 2026. No reason was given and none
 * is invented here: the stage comes off the page, the two tools in it and the
 * panel that introduces them go with it, and Discover and Analyse carry the
 * section on their own until it is asked back.
 *
 * Nothing is removed. SHOWCASE_STAGES still carries all three panels and TOOLS
 * still carries all twelve tools with their stages; what this switches is the
 * VISIBLE_* views in lib/site that the two components read. Turning it on
 * restores the panel, the tab, both tools and the scroll length they take.
 *
 * IT ALSO MOVES A NUMBER. TOOLKIT_DEK counts the instruments out loud, and the
 * count is checkable by a visitor on the page itself, so the dek has a second
 * wording for this state. See the note on it in lib/site.
 */
export const SHOW_ACT_STAGE: boolean = false;

/**
 * The lifecycle band in the toolkit section: the row of large numbered panels
 * ("01 Discover", "02 Analyse") between the section opener and the explorer,
 * each with a media well and two lines of copy.
 *
 * OFF on the founder's instruction, 13 Sep 2026, the whole row rather than a
 * panel of it. As with [[SHOW_ACT_STAGE]] no reason was given and none is
 * invented here.
 *
 * <StageShowcase> is untouched and so is everything it depends on: the panels'
 * copy in SHOWCASE_STAGES, the media wells, and the pure-CSS widen-and-dim in
 * the STAGE SHOWCASE block of globals.css, which is the site's one animated
 * layout property and carries its own argument for why that is allowed.
 *
 * The two flags are independent and they compose the way you would expect. This
 * one hides the band whatever SHOW_ACT_STAGE says; SHOW_ACT_STAGE still decides
 * whether a third panel is in the row when the band comes back.
 *
 * ONE THING TO CHECK when it returns: the band sat a --section-gap below the
 * opener and the explorer sat a --section-gap below the band. With the band off
 * there is one gap where there were two, so the section is tighter by design
 * rather than by omission.
 */
export const SHOW_LIFECYCLE_BAND: boolean = false;

/**
 * Which of the two presentations of the tool list the toolkit section renders.
 *
 * This one is a TOGGLE rather than a hide: false is the bento grid
 * (<ToolkitGrid>), true is the pinned tabbed explorer (<ToolkitExplorer>).
 * Exactly one of them is on the page at a time, and both read the same
 * VISIBLE_TOOLS, so a tool added to lib/site appears in whichever is showing.
 *
 * FALSE, on the founder's wireframe of 13 Sep 2026, which asks for the tools as
 * a labelled bento rather than as tabs. The explorer is untouched: the pin, the
 * single unscrubbed trigger, the card stack, the segmented control that scrolls
 * the page rather than only setting state, and the matchMedia that reverts the
 * whole thing under 1024. Every number in it is still the number it was
 * measured with.
 *
 * WHAT CHANGING IT COSTS. The explorer pins for roughly five viewports and owns
 * one ScrollTrigger; the grid owns one per group, unscrubbed and `once`, and
 * adds no scroll length at all. Turning the explorer back on lengthens the page
 * by about 4,000px. That is a page-budget decision (doc 04 §5) rather than a
 * taste one, so it is worth knowing before flipping it.
 */
export const SHOW_TOOLKIT_EXPLORER: boolean = false;

/**
 * H6, the sneak peek: the "Inside the terminal" opener and the carousel of
 * four interface frames under it.
 *
 * OFF on the founder's instruction, 13 Sep 2026, the whole section rather than
 * a part of it. <PeekSection>, <PeekCarousel> and the staged data behind them
 * are untouched; the section simply is not mounted, so nothing it owns runs.
 *
 * It was four frames with "Interface capture lands here." in each, against
 * assets doc 05 §6 still lists as to come, so the page loses a screen of
 * placeholders rather than a screen of product.
 */
export const SHOW_PEEK_SECTION: boolean = false;

/**
 * Which ambient layer the close scene uses: the background video, or the
 * drawn one.
 *
 * A TOGGLE, not a hide. False is <CloseScene>, a CSS glow with a WebGL dust
 * field over it; true is <CloseVideo>, the encoded loop that was there before.
 * One of the two is always behind the close.
 *
 * FALSE on the founder's instruction, 13 Sep 2026: the same picture, drawn
 * rather than filmed. <CloseVideo> and the two encoded loops under public/video
 * are untouched, and the hero still uses <BackgroundVideo> through
 * <HeroVideo>, so nothing about the video path is unwound by this.
 *
 * WHAT IT COSTS EITHER WAY. The video is 1600x900 of loop, fetched on approach,
 * decoded and held; the scene is about 4KB of shader over roughly 600KB of
 * three, which is lazy and shared with nothing else on this page today. On a
 * page that later mounts another 3D scene the scene is free and the video is
 * not, which is the direction this is going.
 */
export const SHOW_CLOSE_VIDEO: boolean = false;
