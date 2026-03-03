/**
 * MotionText - Animate text with preset animations.
 * Wraps text in a span and applies enter animation.
 */

import { Motion } from "./Motion.jsx";

/**
 * @param {object} props
 * @param {string} [props.animation='fade']
 * @param {import('react').ReactNode} props.children
 */
export function MotionText({ animation = "fade", children }) {
  return (
    <Motion as="span" animation={animation}>
      {children}
    </Motion>
  );
}
