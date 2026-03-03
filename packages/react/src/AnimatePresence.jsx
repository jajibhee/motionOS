/**
 * AnimatePresence - Animate children when they mount/unmount.
 * Use for page/section transitions.
 * mode: "wait" = exit then enter; "sync" = exit and enter at once
 */

import { useState, useRef, useLayoutEffect } from "react";
import { useMotionEngine } from "./MotionContext.jsx";

/**
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {'wait'|'sync'} [props.mode='wait']
 * @param {number} [props.exitDuration=200]
 */
export function AnimatePresence({ children, mode = "wait", exitDuration = 200 }) {
  const engine = useMotionEngine();
  const [displayed, setDisplayed] = useState(children);
  const [exiting, setExiting] = useState(null);
  const wrapperRef = useRef(null);
  const exitingRef = useRef(null);

  useLayoutEffect(() => {
    if (children === displayed && !exiting) return;

    if (displayed != null && children !== displayed) {
      if (mode === "wait") {
        const el = wrapperRef.current;
        if (el) {
          engine.animateOpacity(el, 1, 0, exitDuration, () => {
            setDisplayed(children);
          });
        } else {
          setDisplayed(children);
        }
      } else {
        setExiting(displayed);
        setDisplayed(children);
      }
    } else if (children === displayed && exiting == null) {
      setDisplayed(children);
    }
  }, [children, displayed, exiting, mode, exitDuration, engine]);

  useLayoutEffect(() => {
    if (exiting != null && exitingRef.current) {
      engine.animateOpacity(exitingRef.current, 1, 0, exitDuration, () => {
        setExiting(null);
      });
    }
  }, [exiting, exitDuration, engine]);

  return (
    <div style={{ position: "relative" }}>
      {displayed != null && (
        <div
          ref={wrapperRef}
          style={{
            willChange: mode === "wait" && displayed !== children ? "opacity" : undefined,
          }}
        >
          {displayed}
        </div>
      )}
      {exiting != null && (
        <div
          ref={exitingRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            pointerEvents: "none",
            willChange: "opacity",
          }}
        >
          {exiting}
        </div>
      )}
    </div>
  );
}
