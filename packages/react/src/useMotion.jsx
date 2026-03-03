/**
 * useMotion - Register an element with the engine for manual FLIP control.
 * Returns a ref to attach to the element.
 */

import { useCallback } from "react";
import { useMotionEngine } from "./MotionContext.jsx";

/**
 * @param {string} key
 * @returns {{ ref: (el: HTMLElement | null) => void }}
 */
export function useMotion(key) {
  const engine = useMotionEngine();
  const ref = useCallback(
    (el) => {
      if (el) {
        engine.register(key, el);
      } else {
        engine.unregister(key);
      }
    },
    [engine, key]
  );
  return { ref };
}
