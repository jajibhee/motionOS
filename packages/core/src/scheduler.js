/**
 * RAF-based animation scheduler.
 * Single loop for all active animations. Transform + opacity only.
 */

import { clearTransform, computeFlip } from "./flip.js";
import { stepSpring, springPresets } from "./spring.js";

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/**
 * @param {HTMLElement} el
 * @param {{ opacity?: number; x?: number; y?: number; scale?: number; rotate?: number }} v
 */
function applyFromTo(el, v) {
  if (v.opacity !== undefined) el.style.opacity = String(v.opacity);
  const x = v.x ?? 0;
  const y = v.y ?? 0;
  const s = v.scale ?? 1;
  const r = v.rotate ?? 0;
  if (x || y || s !== 1 || r) {
    el.style.transformOrigin = "center center";
    el.style.transform = `translate(${x}px, ${y}px) scale(${s}) rotate(${r}deg)`;
  } else {
    el.style.transform = "";
    el.style.transformOrigin = "";
  }
}

export class Scheduler {
  active = new Map();
  rafId = null;

  /**
   * @param {HTMLElement} element
   * @param {{ x: number, y: number, width: number, height: number }} from
   * @param {{ x: number, y: number, width: number, height: number }} to
   * @param {number} [duration=250]
   */
  animate(element, from, to, duration = 250) {
    this.cancel(element);
    this.active.set(element, {
      element,
      from,
      to,
      duration,
      startTime: performance.now(),
    });
    this.tick();
  }

  /**
   * Animate opacity only (for enter/exit).
   * @param {HTMLElement} element
   * @param {number} fromOpacity
   * @param {number} toOpacity
   * @param {number} [duration=200]
   * @param {(el: HTMLElement) => void} [onComplete]
   */
  animateOpacity(element, fromOpacity, toOpacity, duration = 200, onComplete) {
    this.cancel(element);
    this.active.set(element, {
      element,
      type: "opacity",
      fromOpacity,
      toOpacity,
      duration,
      startTime: performance.now(),
      onComplete,
    });
    this.tick();
  }

  /**
   * Animate from/to values (opacity, x, y, scale, rotate). Uses easeOutCubic.
   */
  animateFromTo(element, from, to, duration = 300, onComplete) {
    this.cancel(element);
    const def = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 };
    this.active.set(element, {
      element,
      type: "fromTo",
      from: { ...def, ...from },
      to: { ...def, ...to },
      duration,
      startTime: performance.now(),
      onComplete,
    });
    this.tick();
  }

  /**
   * Animate from/to with spring physics.
   * @param {HTMLElement} element
   * @param {object} from
   * @param {object} to
   * @param {{ stiffness?: number; damping?: number }} [springConfig]
   * @param {(el: HTMLElement) => void} [onComplete]
   */
  animateSpring(element, from, to, springConfig = {}, onComplete) {
    this.cancel(element);
    const preset = typeof springConfig === "string" ? springPresets[springConfig] : springConfig;
    const { stiffness = 170, damping = 26 } = preset || {};
    const def = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 };
    const f = { ...def, ...from };
    const t = { ...def, ...to };
    const keys = ["opacity", "x", "y", "scale", "rotate"];
    const state = keys.reduce((acc, k) => {
      acc[k] = { value: f[k] ?? (k === "opacity" ? 1 : 0), velocity: 0 };
      return acc;
    }, {});
    this.active.set(element, {
      element,
      type: "spring",
      state,
      to: t,
      stiffness,
      damping,
      lastTime: performance.now(),
      onComplete,
    });
    this.tick();
  }

  /**
   * @param {HTMLElement} element
   */
  cancel(element) {
    const target = this.active.get(element);
    if (target) {
      this.active.delete(element);
      if (target.type === "fromTo" || target.type === "spring") {
        applyFromTo(element, target.to || {});
      } else {
        clearTransform(element);
      }
    }
  }

  tick = () => {
    const now = performance.now();
    let hasActive = false;

    for (const [el, target] of this.active) {
      const elapsed = now - target.startTime;
      const progress = Math.min(elapsed / target.duration, 1);

      if (target.type === "spring") {
        const lastTime = target._lastTime ?? now;
        const dt = Math.min(now - lastTime, 32);
        target._lastTime = now;
        const { state, to: t, stiffness, damping } = target;
        let allDone = true;
        for (const k of ["opacity", "x", "y", "scale", "rotate"]) {
          const result = stepSpring(state[k].value, t[k] ?? (k === "opacity" ? 1 : 0), state[k].velocity, stiffness, damping, dt);
          state[k].value = result.value;
          state[k].velocity = result.velocity;
          if (!result.done) allDone = false;
        }
        applyFromTo(el, { opacity: state.opacity.value, x: state.x.value, y: state.y.value, scale: state.scale.value, rotate: state.rotate.value });
        if (allDone) {
          applyFromTo(el, t);
          target.onComplete?.(el);
          this.active.delete(el);
        } else {
          hasActive = true;
        }
        continue;
      }

      if (progress >= 1) {
        if (target.type === "opacity") {
          el.style.opacity = String(target.toOpacity);
          target.onComplete?.(el);
        } else if (target.type === "fromTo") {
          applyFromTo(el, target.to);
          target.onComplete?.(el);
        } else {
          clearTransform(el);
        }
        this.active.delete(el);
        continue;
      }

      hasActive = true;
      const eased = easeOutCubic(progress);

      if (target.type === "opacity") {
        const opacity = target.fromOpacity + (target.toOpacity - target.fromOpacity) * eased;
        el.style.opacity = String(opacity);
      } else if (target.type === "fromTo") {
        const f = target.from;
        const t = target.to;
        const o = (f.opacity ?? 1) + ((t.opacity ?? 1) - (f.opacity ?? 1)) * eased;
        const x = (f.x ?? 0) + ((t.x ?? 0) - (f.x ?? 0)) * eased;
        const y = (f.y ?? 0) + ((t.y ?? 0) - (f.y ?? 0)) * eased;
        const s = (f.scale ?? 1) + ((t.scale ?? 1) - (f.scale ?? 1)) * eased;
        const r = (f.rotate ?? 0) + ((t.rotate ?? 0) - (f.rotate ?? 0)) * eased;
        el.style.opacity = String(o);
        el.style.transformOrigin = "center center";
        el.style.transform = `translate(${x}px, ${y}px) scale(${s}) rotate(${r}deg)`;
      } else {
        const inv = computeFlip(target.from, target.to);
        const tx = inv.translateX * (1 - eased);
        const ty = inv.translateY * (1 - eased);
        const sx = 1 + (inv.scaleX - 1) * (1 - eased);
        const sy = 1 + (inv.scaleY - 1) * (1 - eased);

        el.style.transformOrigin = "0 0";
        el.style.transform = `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`;
      }
    }

    if (hasActive) {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      this.rafId = null;
    }
  };
}
