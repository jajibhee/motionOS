/**
 * MotionOS Engine - orchestrator for FLIP animations.
 * Register elements, snapshot before/after, compute FLIP, animate.
 */

import { Registry } from "./registry.js";
import { computeFlip, applyTransform } from "./flip.js";
import { Scheduler } from "./scheduler.js";

/**
 * @param {string} key
 * @param {HTMLElement} element
 */
function register(registry, scheduler, key, element) {
  const existing = registry.get(key);
  if (existing) scheduler.cancel(existing);
  registry.register(key, element);
}

/**
 * @param {string} key
 */
function unregister(registry, scheduler, key) {
  const el = registry.get(key);
  if (el) scheduler.cancel(el);
  registry.unregister(key);
}

/**
 * @param {Map<string, { x: number, y: number, width: number, height: number }>} [beforeRects]
 * @param {{ duration?: number }} [options]
 */
function snapshotAfter(registry, scheduler, beforeRects, options = {}) {
  if (!beforeRects) return;

  const duration = options.duration ?? 250;

  for (const [key, el] of registry.entries()) {
    const before = beforeRects.get(key);
    if (!before) continue;

    const r = el.getBoundingClientRect();
    const after = { x: r.x, y: r.y, width: r.width, height: r.height };

    const dx = Math.abs(before.x - after.x);
    const dy = Math.abs(before.y - after.y);
    const dw = Math.abs(before.width - after.width);
    const dh = Math.abs(before.height - after.height);
    const threshold = 0.5;
    if (dx < threshold && dy < threshold && dw < threshold && dh < threshold) {
      continue;
    }

    const flip = computeFlip(before, after);
    applyTransform(el, flip);
    scheduler.animate(el, before, after, duration);
  }
}

/**
 * @returns {{
 *   register: (key: string, element: HTMLElement) => void;
 *   unregister: (key: string) => void;
 *   snapshotBefore: () => void;
 *   snapshotAfter: (options?: { duration?: number }) => void;
 *   animateFromRects: (beforeRects: Map<string, { x: number, y: number, width: number, height: number }>, options?: { duration?: number }) => void;
 *   animateOpacity: (element: HTMLElement, from: number, to: number, duration?: number, onComplete?: (el: HTMLElement) => void) => void;
 *   dispose: () => void;
 * }}
 */
export function createEngine() {
  const registry = new Registry();
  const scheduler = new Scheduler();
  let beforeRects = null;

  return {
    register: (key, element) => register(registry, scheduler, key, element),

    unregister: (key) => unregister(registry, scheduler, key),

    snapshotBefore() {
      beforeRects = new Map();
      for (const [key, el] of registry.entries()) {
        const r = el.getBoundingClientRect();
        beforeRects.set(key, { x: r.x, y: r.y, width: r.width, height: r.height });
      }
    },

    snapshotAfter(options = {}) {
      snapshotAfter(registry, scheduler, beforeRects, options);
      beforeRects = null;
    },

    /**
     * Animate from provided before rects (e.g. from previous render).
     * @param {Map<string, { x: number, y: number, width: number, height: number }>} prevRects
     * @param {{ duration?: number }} [options]
     */
    animateFromRects(prevRects, options = {}) {
      snapshotAfter(registry, scheduler, prevRects, options);
    },

    /**
     * Animate opacity (for enter/exit).
     * @param {HTMLElement} element
     * @param {number} from
     * @param {number} to
     * @param {number} [duration=200]
     * @param {(el: HTMLElement) => void} [onComplete]
     */
    animateOpacity(element, from, to, duration = 200, onComplete) {
      scheduler.animateOpacity(element, from, to, duration, onComplete);
    },

    /**
     * Animate from/to values (opacity, x, y, scale, rotate).
     */
    animateFromTo(element, from, to, duration = 300, onComplete) {
      scheduler.animateFromTo(element, from, to, duration, onComplete);
    },

    /**
     * Animate from/to with spring physics.
     * @param {HTMLElement} element
     * @param {object} from
     * @param {object} to
     * @param {{ stiffness?: number; damping?: number } | string} [springConfig]
     * @param {(el: HTMLElement) => void} [onComplete]
     */
    animateSpring(element, from, to, springConfig, onComplete) {
      scheduler.animateSpring(element, from, to, springConfig, onComplete);
    },

    dispose() {
      registry.clear();
    },
  };
}
