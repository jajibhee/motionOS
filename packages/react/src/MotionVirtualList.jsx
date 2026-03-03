/**
 * MotionVirtualList - Virtualized list with FLIP animations.
 * Composes with @tanstack/react-virtual. Only visible items are in DOM.
 */

import { useRef, useLayoutEffect, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMotionEngine } from "./MotionContext.jsx";

/**
 * @param {object} props
 * @param {unknown[]} props.items
 * @param {(item: unknown) => string} props.getKey
 * @param {(item: unknown) => import('react').ReactNode} props.children
 * @param {number} [props.duration=250]
 * @param {number} [props.estimateSize=50]
 */
export function MotionVirtualList({
  items,
  getKey,
  children,
  duration = 250,
  estimateSize = 50,
}) {
  const engine = useMotionEngine();
  const parentRef = useRef(null);
  const prevRectsRef = useRef(null);
  const itemRefsRef = useRef(new Map());

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

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
    const keys = new Set(virtualItems.map((vi) => getKey(items[vi.index])));
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
  }, [items, virtualItems, getKey, duration, engine]);

  return (
    <div
      ref={parentRef}
      style={{
        height: "400px",
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualRow) => {
          const item = items[virtualRow.index];
          const key = getKey(item);
          return (
            <div
              key={key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div ref={registerRef(key)} style={{ willChange: "transform" }}>
                {children(item)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
