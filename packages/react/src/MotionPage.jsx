/**
 * MotionPage - Wrapper for page/route-level animations.
 * Use inside AnimatePresence with key={route} for route transitions.
 */

import { Motion } from "./Motion.jsx";

/**
 * @param {object} props
 * @param {string} [props.animation='pageFade'] - pageFade | pageSlide | pageScale
 * @param {boolean} [props.spring=false]
 * @param {import('react').ReactNode} props.children
 */
export function MotionPage({ animation = "pageFade", spring = false, children }) {
  return (
    <Motion animation={animation} as="div" spring={spring}>
      {children}
    </Motion>
  );
}
