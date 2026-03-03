/**
 * Motion - Wrap any element with preset animations.
 */

import { useRef, useLayoutEffect } from "react";
import { useMotionEngine } from "./MotionContext.jsx";
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
 * @param {string} [props.animation='fadeIn'] - Preset name from presets
 * @param {boolean} [props.spring] - Use spring physics instead of duration
 * @param {string|object} [props.springConfig] - 'bouncy' | 'smooth' | 'snappy' | { stiffness, damping }
 * @param {import('react').ReactNode} props.children
 * @param {import('react').ElementType} [props.as='div']
 */
export function Motion({ animation = "fadeIn", children, as: Component = "div", spring = false, springConfig = "bouncy" }) {
  const engine = useMotionEngine();
  const ref = useRef(null);
  const preset = presets[animation] ?? presets.fadeIn;
  const from = preset.from ?? { opacity: 0 };
  const to = preset.to ?? defaultTo;
  const duration = preset.duration ?? 300;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    applyValues(el, from);
    if (spring) {
      engine.animateSpring(el, from, to, springConfig);
    } else {
      engine.animateFromTo(el, from, to, duration);
    }
  }, [animation, duration, spring, springConfig, engine]);

  return (
    <Component ref={ref} style={{ willChange: "transform, opacity" }}>
      {children}
    </Component>
  );
}
