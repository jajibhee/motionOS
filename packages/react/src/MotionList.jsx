/**
 * MotionList - FLIP-animated list. Reorder with smooth animations.
 * Wrap with MotionProvider. Uses animateFromRects with stored prev rects.
 */

import { useRef, useLayoutEffect, useCallback } from "react";
import { useMotionEngine } from "./MotionContext.jsx";

/**
 * @param {object} props
 * @param {unknown[]} props.items
 * @param {(item: unknown) => string} props.getKey
 * @param {(item: unknown) => import('react').ReactNode} props.children
 * @param {number} [props.duration=250]
 */
export function MotionList({ items, getKey, children, duration = 250 }) {
  const engine = useMotionEngine();
  const prevRectsRef = useRef(null);
  const itemRefsRef = useRef(new Map());

  const registerRef = useCallback(
    (key) => (el) => {
      if (el) {
        engine.register(key, el);
        itemRefsRef.current.set(key, el);
      } else {
        engine.unregister(key);
        itemRefsRef.current.delete(key);
      }
    },
    [engine]
  );

  useLayoutEffect(() => {
    const keys = new Set(items.map(getKey));
    const rects = new Map();

    for (const [key, el] of itemRefsRef.current) {
      if (!keys.has(key)) continue;
      const r = el.getBoundingClientRect();
      rects.set(key, { x: r.x, y: r.y, width: r.width, height: r.height });
    }

    const prev = prevRectsRef.current;
    prevRectsRef.current = rects;

    if (prev && prev.size > 0 && rects.size > 0) {
      engine.animateFromRects(prev, { duration });
    }
  }, [items, getKey, duration, engine]);

  return (
    <>
      {items.map((item) => {
        const key = getKey(item);
        return (
          <div
            key={key}
            ref={registerRef(key)}
            style={{ willChange: "transform" }}
          >
            {children(item)}
          </div>
        );
      })}
    </>
  );
}
