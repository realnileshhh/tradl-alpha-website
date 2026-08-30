/**
 * The one thing CSS cannot answer about the device: is this an iPad.
 *
 * The small-screen notice is a CSS decision and should stay one. Two media
 * conditions cover almost everything: a narrow viewport catches phones and
 * tablets held in portrait, and `(hover: none) and (pointer: coarse)` catches
 * every touch-primary device at any width, which is a tablet in landscape.
 *
 * ONE CASE ESCAPES BOTH, and it is not rare. An iPad with a Magic Keyboard or
 * any Bluetooth trackpad reports `pointer: fine` and `hover: hover`, exactly as
 * a laptop does, because at that moment it is being driven exactly as a laptop
 * is. It is also 1180 or 1366 points wide, so the width condition misses it too.
 * Since iPadOS 13, Safari there additionally reports itself as a Mac, so the
 * user agent string cannot be asked either.
 *
 * What it cannot hide is the touchscreen. A Mac has no touch points at all, so
 * "claims to be a Mac and reports more than one touch point" is the standard and
 * still-reliable iPadOS test, and it is the only thing this script does beyond
 * a plain tablet user-agent match.
 *
 * IT ONLY EVER ADDS. There is no branch here that can reach a desktop: a Mac
 * reports `maxTouchPoints` 0, and a Windows laptop with a touchscreen fails both
 * the Mac test and the tablet user-agent test. Nothing about the wide layout
 * changes, on any machine, whether this runs or not.
 *
 * Blocking and inline, like the scroll-restoration script beside it, because a
 * deferred script runs after the first paint and the first paint is the frame
 * this is deciding. It stamps `<html>`, which already carries
 * `suppressHydrationWarning` for the same reason.
 */

/** Set on <html> for a touch device CSS cannot recognise. globals.css reads it. */
export const NARROW_ATTR = "data-narrow";

/**
 * Android phones carry "Mobile" in the user agent and Android tablets do not,
 * which is Google's own documented way to tell them apart. The rest of the list
 * is the long tail that still identifies itself honestly.
 */
const TABLET_UA = /iPad|Tablet|PlayBook|Silk|Android(?!.*Mobile)/i;

export const DEVICE_SCRIPT = `
try{
  var d=document.documentElement;
  var n=navigator;
  var touch=(n.maxTouchPoints||0)>1;
  var ipad=touch&&/Mac/i.test(n.platform||"");
  if(ipad||(touch&&${TABLET_UA.toString()}.test(n.userAgent||""))){
    d.setAttribute("${NARROW_ATTR}","");
  }
}catch(e){}
`.trim();
