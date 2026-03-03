/**
 * FLIP transform calculation.
 * First -> Last -> Invert -> Play
 * Computes translate + scale to animate from before rect to after rect.
 */

/**
 * @param {{ x: number, y: number, width: number, height: number }} from
 * @param {{ x: number, y: number, width: number, height: number }} to
 * @returns {{ translateX: number, translateY: number, scaleX: number, scaleY: number }}
 */
export function computeFlip(from, to) {
  const translateX = from.x - to.x;
  const translateY = from.y - to.y;
  const scaleX = from.width > 0 ? to.width / from.width : 1;
  const scaleY = from.height > 0 ? to.height / from.height : 1;

  return { translateX, translateY, scaleX, scaleY };
}

/**
 * @param {HTMLElement} element
 * @param {{ translateX: number, translateY: number, scaleX: number, scaleY: number }} t
 * @param {number} [opacity]
 */
export function applyTransform(element, t, opacity) {
  const { translateX, translateY, scaleX, scaleY } = t;
  element.style.transformOrigin = "0 0";
  element.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
  if (opacity !== undefined) {
    element.style.opacity = String(opacity);
  }
}

/**
 * @param {HTMLElement} element
 */
export function clearTransform(element) {
  element.style.transform = "";
  element.style.transformOrigin = "";
  element.style.opacity = "";
}
