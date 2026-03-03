/**
 * MotionLayout - Single-element layout animation (expand/collapse, etc).
 * Wraps a single child and animates layout changes via FLIP.
 */

import { useRef, useLayoutEffect, useCallback } from "react";
import { useMotionEngine } from "./MotionContext.jsx";

/**
 * @param {object} props
 * @param {string} props.layoutId - Stable key for this element
 * @param {import('react').ReactNode} props.children
 * @param {number} [props.duration=250]
 */
export function MotionLayout({ layoutId, children, duration = 250 }) {
  const engine = useMotionEngine();
  const prevRectRef = useRef(null);
  const elRef = useRef(null);

  const ref = useCallback(
    (el) => {
      if (elRef.current) {
        engine.unregister(layoutId);
      }
      elRef.current = el;
      if (el) {
        engine.register(layoutId, el);
      }
    },
    [engine, layoutId]
  );

  useLayoutEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const rect = { x: r.x, y: r.y, width: r.width, height: r.height };

    const prev = prevRectRef.current;
    prevRectRef.current = rect;

    if (prev) {
      const dx = Math.abs(prev.x - rect.x);
      const dy = Math.abs(prev.y - rect.y);
      const dw = Math.abs(prev.width - rect.width);
      const dh = Math.abs(prev.height - rect.height);
      if (dx > 0.5 || dy > 0.5 || dw > 0.5 || dh > 0.5) {
        const beforeRects = new Map();
        beforeRects.set(layoutId, prev);
        engine.animateFromRects(beforeRects, { duration });
      }
    }
  }, [children, layoutId, duration, engine]);

  return (
    <div ref={ref} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
