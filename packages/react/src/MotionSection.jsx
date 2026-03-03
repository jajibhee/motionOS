/**
 * MotionSection - Animate when section enters viewport.
 * Uses Intersection Observer + preset animation.
 */

import { useRef, useLayoutEffect } from "react";
import { useMotionEngine } from "./MotionContext.jsx";
import { useInView } from "./useInView.js";
import { presets } from "./presets.js";

const defaultTo = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 };

function applyValues(el, v) {
  if (!el) return;
  if (v.opacity !== undefined) el.style.opacity = String(v.opacity);
  const x = v.x ?? 0;
  const y = v.y ?? 0;
  const s = v.scale ?? 1;
  const r = v.rotate ?? 0;
  el.style.transformOrigin = "center center";
  el.style.transform = `translate(${x}px, ${y}px) scale(${s}) rotate(${r}deg)`;
}

/**
 * @param {object} props
 * @param {string} [props.animation='fadeInUp']
 * @param {boolean} [props.spring=false]
 * @param {string|object} [props.springConfig='bouncy']
 * @param {number} [props.threshold=0.1]
 * @param {import('react').ReactNode} props.children
 * @param {import('react').ElementType} [props.as='section']
 */
export function MotionSection({
  animation = "fadeInUp",
  children,
  as: Component = "section",
  spring = false,
  springConfig = "bouncy",
  threshold = 0.1,
}) {
  const engine = useMotionEngine();
  const [ref, inView] = useInView({ threshold });
  const hasAnimated = useRef(false);

  const preset = presets[animation] ?? presets.fadeInUp;
  const from = preset.from ?? { opacity: 0, y: 24 };
  const to = preset.to ?? defaultTo;
  const duration = preset.duration ?? 300;

  useLayoutEffect(() => {
    if (!inView || !ref.current) return;
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const el = ref.current;
    applyValues(el, from);
    if (spring) {
      engine.animateSpring(el, from, to, springConfig);
    } else {
      engine.animateFromTo(el, from, to, duration);
    }
  }, [inView, animation, duration, spring, springConfig, engine]);

  return (
    <Component ref={ref} style={{ willChange: "transform, opacity" }}>
      {children}
    </Component>
  );
}
