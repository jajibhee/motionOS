/**
 * Batch layout snapshot. All DOM reads in one phase.
 * Uses getBoundingClientRect - no layout thrashing.
 */

/**
 * @param {HTMLElement[]} elements
 * @returns {Map<HTMLElement, { x: number, y: number, width: number, height: number }>}
 */
export function snapshotElements(elements) {
  const result = new Map();
  for (const el of elements) {
    const r = el.getBoundingClientRect();
    result.set(el, { x: r.x, y: r.y, width: r.width, height: r.height });
  }
  return result;
}
