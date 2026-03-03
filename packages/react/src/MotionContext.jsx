/**
 * Shared engine context for MotionOS React components.
 */

import { createContext, useContext, useRef, useLayoutEffect } from "react";
import { createEngine } from "@motionos/core";

const MotionContext = createContext(null);

/**
 * @param {{ children: import('react').ReactNode }}
 */
export function MotionProvider({ children }) {
  const engineRef = useRef(null);
  if (!engineRef.current) {
    engineRef.current = createEngine();
  }
  const engine = engineRef.current;

  useLayoutEffect(() => {
    return () => engine.dispose();
  }, [engine]);

  return (
    <MotionContext.Provider value={engine}>{children}</MotionContext.Provider>
  );
}

export function useMotionEngine() {
  const engine = useContext(MotionContext);
  if (!engine) {
    throw new Error("useMotionEngine must be used within MotionProvider");
  }
  return engine;
}
