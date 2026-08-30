/**
 * The two halves of scroll restoration, kept in one file so they cannot drift.
 *
 * WHY THIS IS NOT JUST `history.scrollRestoration`. Two sections on this page
 * pin, and a pin adds a spacer worth several viewports. Those spacers do not
 * exist until GSAP has run, which is after hydration, so the browser's own
 * restore lands against a document thousands of pixels shorter than the one the
 * offset was recorded in and clamps into the wrong section. The offset is
 * therefore parked here and put back by the provider once the pins are up.
 *
 * WHICH LEAVES A WINDOW, and it is the one this file's script closes. Between
 * first paint and hydration the page is laid out but not yet restored, so the
 * visitor watches the top of the page for as long as hydration takes and then
 * gets thrown to where they were. Hiding the body for that window trades a
 * flash of the wrong content for a beat of the page ground, which is what a
 * reload looks like anyway.
 *
 * The script is inline and blocking on purpose: anything deferred runs after
 * the first paint, which is the exact frame being hidden. It is also wrapped in
 * a try and carries its own timer, so a private-mode sessionStorage throw or a
 * hydration that never finishes cannot leave a visitor looking at nothing.
 *
 * This file has no "use client" directive: the server layout reads the script
 * string out of it and the client provider reads the same key.
 */

/** Where the offset is parked, per path. */
export const SCROLL_KEY = "tradl:scroll";

/** Set on <html> while a restore is pending. globals.css hides the body on it. */
export const RESTORING_ATTR = "data-restoring";

/**
 * How long the body may stay hidden before the script gives up and shows the
 * page anyway. Long enough to cover hydration on a mid-range phone, short
 * enough that a failure is a jump rather than a blank page.
 */
export const RESTORE_GUARD_MS = 1500;

/**
 * The blocking script, as source. Rendered as the first thing in the body, so
 * it runs before anything below it is painted.
 *
 * It only arms the flag. The actual scroll happens in LenisProvider, which is
 * the first moment the document is the height it will be.
 */
export const RESTORE_SCRIPT = `(function(){try{
var n=performance.getEntriesByType("navigation")[0];
if(!n||(n.type!=="reload"&&n.type!=="back_forward"))return;
var y=+(sessionStorage.getItem("${SCROLL_KEY}:"+location.pathname)||0);
if(!(y>0))return;
var d=document.documentElement;
d.setAttribute("${RESTORING_ATTR}","");
setTimeout(function(){d.removeAttribute("${RESTORING_ATTR}")},${RESTORE_GUARD_MS});
}catch(e){}})();`;
