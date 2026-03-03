/**
 * Element registry: key -> HTMLElement mapping.
 * Metadata stored in WeakMap to avoid holding strong refs to DOM nodes.
 */

export class Registry {
  elements = new Map();
  meta = new WeakMap();

  /**
   * @param {string} key
   * @param {HTMLElement} element
   */
  register(key, element) {
    this.unregister(key);
    this.elements.set(key, element);
    this.meta.set(element, { key, lastRect: null });
  }

  /**
   * @param {string} key
   */
  unregister(key) {
    const element = this.elements.get(key);
    if (element) {
      this.elements.delete(key);
      this.meta.delete(element);
    }
  }

  /**
   * @param {string} key
   * @returns {HTMLElement | undefined}
   */
  get(key) {
    return this.elements.get(key);
  }

  /**
   * @param {HTMLElement} element
   * @returns {{ key: string, lastRect: { x: number, y: number, width: number, height: number } | null } | undefined}
   */
  getMeta(element) {
    return this.meta.get(element);
  }

  /**
   * @param {HTMLElement} element
   * @param {{ x: number, y: number, width: number, height: number }} rect
   */
  setLastRect(element, rect) {
    const m = this.meta.get(element);
    if (m) m.lastRect = rect;
  }

  /** @returns {string[]} */
  keys() {
    return Array.from(this.elements.keys());
  }

  /** @returns {[string, HTMLElement][]} */
  entries() {
    return Array.from(this.elements.entries());
  }

  /** @returns {number} */
  size() {
    return this.elements.size;
  }

  clear() {
    this.elements.clear();
  }
}
