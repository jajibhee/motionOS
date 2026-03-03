/**
 * Animation presets - aligned with Animate.css naming where possible.
 * Format: { from: { opacity?, x?, y?, scale?, rotate? }, to?, duration?, exit? }
 * Default to: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }
 */

const defaultTo = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 };
const defaultExit = { from: defaultTo, to: { opacity: 0, x: 0, y: 0, scale: 1, rotate: 0 }, duration: 200 };

function preset(enter, exit = defaultExit) {
  return { ...enter, exit };
}

/** @type {Record<string, { from: object; to?: object; duration?: number; exit?: object }>} */
export const presets = {
  // ---- Fade ----
  fadeIn: preset({ from: { opacity: 0 }, duration: 200 }),
  fadeOut: preset({ from: defaultTo, to: { opacity: 0 }, duration: 200 }),
  fadeInUp: preset({ from: { opacity: 0, y: 24 }, duration: 300 }),
  fadeInDown: preset({ from: { opacity: 0, y: -24 }, duration: 300 }),
  fadeInLeft: preset({ from: { opacity: 0, x: 24 }, duration: 300 }),
  fadeInRight: preset({ from: { opacity: 0, x: -24 }, duration: 300 }),
  fadeInUpBig: preset({ from: { opacity: 0, y: 200 }, duration: 400 }),
  fadeInDownBig: preset({ from: { opacity: 0, y: -200 }, duration: 400 }),
  fadeInLeftBig: preset({ from: { opacity: 0, x: 200 }, duration: 400 }),
  fadeInRightBig: preset({ from: { opacity: 0, x: -200 }, duration: 400 }),
  fadeOutUp: preset({ from: defaultTo, to: { opacity: 0, y: -24 }, duration: 250 }),
  fadeOutDown: preset({ from: defaultTo, to: { opacity: 0, y: 24 }, duration: 250 }),
  fadeOutLeft: preset({ from: defaultTo, to: { opacity: 0, x: -24 }, duration: 250 }),
  fadeOutRight: preset({ from: defaultTo, to: { opacity: 0, x: 24 }, duration: 250 }),
  fadeOutUpBig: preset({ from: defaultTo, to: { opacity: 0, y: -200 }, duration: 300 }),
  fadeOutDownBig: preset({ from: defaultTo, to: { opacity: 0, y: 200 }, duration: 300 }),
  fadeOutLeftBig: preset({ from: defaultTo, to: { opacity: 0, x: -200 }, duration: 300 }),
  fadeOutRightBig: preset({ from: defaultTo, to: { opacity: 0, x: 200 }, duration: 300 }),
  fadeInTopLeft: preset({ from: { opacity: 0, x: -40, y: -40 }, duration: 350 }),
  fadeInTopRight: preset({ from: { opacity: 0, x: 40, y: -40 }, duration: 350 }),
  fadeInBottomLeft: preset({ from: { opacity: 0, x: -40, y: 40 }, duration: 350 }),
  fadeInBottomRight: preset({ from: { opacity: 0, x: 40, y: 40 }, duration: 350 }),
  fadeOutTopLeft: preset({ from: defaultTo, to: { opacity: 0, x: -40, y: -40 }, duration: 300 }),
  fadeOutTopRight: preset({ from: defaultTo, to: { opacity: 0, x: 40, y: -40 }, duration: 300 }),
  fadeOutBottomLeft: preset({ from: defaultTo, to: { opacity: 0, x: -40, y: 40 }, duration: 300 }),
  fadeOutBottomRight: preset({ from: defaultTo, to: { opacity: 0, x: 40, y: 40 }, duration: 300 }),

  // ---- Back (overshoot-style) ----
  backInDown: preset({ from: { opacity: 0, y: -120, scale: 0.9 }, duration: 500 }),
  backInUp: preset({ from: { opacity: 0, y: 120, scale: 0.9 }, duration: 500 }),
  backInLeft: preset({ from: { opacity: 0, x: 120, scale: 0.9 }, duration: 500 }),
  backInRight: preset({ from: { opacity: 0, x: -120, scale: 0.9 }, duration: 500 }),
  backOutDown: preset({ from: defaultTo, to: { opacity: 0, y: 120, scale: 0.9 }, duration: 400 }),
  backOutUp: preset({ from: defaultTo, to: { opacity: 0, y: -120, scale: 0.9 }, duration: 400 }),
  backOutLeft: preset({ from: defaultTo, to: { opacity: 0, x: -120, scale: 0.9 }, duration: 400 }),
  backOutRight: preset({ from: defaultTo, to: { opacity: 0, x: 120, scale: 0.9 }, duration: 400 }),

  // ---- Slide ----
  slideInUp: preset({ from: { y: 40 }, duration: 350 }),
  slideInDown: preset({ from: { y: -40 }, duration: 350 }),
  slideInLeft: preset({ from: { x: 40 }, duration: 350 }),
  slideInRight: preset({ from: { x: -40 }, duration: 350 }),
  slideOutUp: preset({ from: defaultTo, to: { y: -40, opacity: 0 }, duration: 250 }),
  slideOutDown: preset({ from: defaultTo, to: { y: 40, opacity: 0 }, duration: 250 }),
  slideOutLeft: preset({ from: defaultTo, to: { x: -40, opacity: 0 }, duration: 250 }),
  slideOutRight: preset({ from: defaultTo, to: { x: 40, opacity: 0 }, duration: 250 }),

  // ---- Bounce ----
  bounceIn: preset({ from: { opacity: 0, scale: 0.3 }, duration: 600 }),
  bounceInUp: preset({ from: { opacity: 0, y: 60 }, duration: 600 }),
  bounceInDown: preset({ from: { opacity: 0, y: -60 }, duration: 600 }),
  bounceInLeft: preset({ from: { opacity: 0, x: 60 }, duration: 600 }),
  bounceInRight: preset({ from: { opacity: 0, x: -60 }, duration: 600 }),
  bounceOut: preset({ from: defaultTo, to: { opacity: 0, scale: 0.3 }, duration: 400 }),
  bounceOutUp: preset({ from: defaultTo, to: { opacity: 0, y: -60 }, duration: 400 }),
  bounceOutDown: preset({ from: defaultTo, to: { opacity: 0, y: 60 }, duration: 400 }),
  bounceOutLeft: preset({ from: defaultTo, to: { opacity: 0, x: -60 }, duration: 400 }),
  bounceOutRight: preset({ from: defaultTo, to: { opacity: 0, x: 60 }, duration: 400 }),

  // ---- Scale / Zoom ----
  scaleIn: preset({ from: { opacity: 0, scale: 0.9 }, duration: 250 }),
  scaleOut: preset({ from: defaultTo, to: { opacity: 0, scale: 0.9 }, duration: 200 }),
  zoomIn: preset({ from: { opacity: 0, scale: 0.5 }, duration: 300 }),
  zoomInUp: preset({ from: { opacity: 0, scale: 0.5, y: 40 }, duration: 350 }),
  zoomInDown: preset({ from: { opacity: 0, scale: 0.5, y: -40 }, duration: 350 }),
  zoomInLeft: preset({ from: { opacity: 0, scale: 0.5, x: 40 }, duration: 350 }),
  zoomInRight: preset({ from: { opacity: 0, scale: 0.5, x: -40 }, duration: 350 }),
  zoomOut: preset({ from: defaultTo, to: { opacity: 0, scale: 0.5 }, duration: 250 }),
  zoomOutUp: preset({ from: defaultTo, to: { opacity: 0, scale: 0.5, y: -40 }, duration: 300 }),
  zoomOutDown: preset({ from: defaultTo, to: { opacity: 0, scale: 0.5, y: 40 }, duration: 300 }),
  zoomOutLeft: preset({ from: defaultTo, to: { opacity: 0, scale: 0.5, x: -40 }, duration: 300 }),
  zoomOutRight: preset({ from: defaultTo, to: { opacity: 0, scale: 0.5, x: 40 }, duration: 300 }),

  // ---- Rotate ----
  rotateIn: preset({ from: { opacity: 0, rotate: -180 }, duration: 400 }),
  rotateInDownLeft: preset({ from: { opacity: 0, rotate: -45, x: 20, y: 20 }, duration: 450 }),
  rotateInDownRight: preset({ from: { opacity: 0, rotate: 45, x: -20, y: 20 }, duration: 450 }),
  rotateInUpLeft: preset({ from: { opacity: 0, rotate: 45, x: 20, y: -20 }, duration: 450 }),
  rotateInUpRight: preset({ from: { opacity: 0, rotate: -45, x: -20, y: -20 }, duration: 450 }),
  rotateOut: preset({ from: defaultTo, to: { opacity: 0, rotate: 180 }, duration: 300 }),
  rotateOutDownLeft: preset({ from: defaultTo, to: { opacity: 0, rotate: 45, x: -20, y: 20 }, duration: 350 }),
  rotateOutDownRight: preset({ from: defaultTo, to: { opacity: 0, rotate: -45, x: 20, y: 20 }, duration: 350 }),
  rotateOutUpLeft: preset({ from: defaultTo, to: { opacity: 0, rotate: -45, x: -20, y: -20 }, duration: 350 }),
  rotateOutUpRight: preset({ from: defaultTo, to: { opacity: 0, rotate: 45, x: 20, y: -20 }, duration: 350 }),

  // ---- Flip (2D approximation; no 3D) ----
  flipInX: preset({ from: { opacity: 0, rotate: -90 }, duration: 450 }),
  flipInY: preset({ from: { opacity: 0, rotate: -90 }, duration: 450 }),
  flipOutX: preset({ from: defaultTo, to: { opacity: 0, rotate: 90 }, duration: 350 }),
  flipOutY: preset({ from: defaultTo, to: { opacity: 0, rotate: 90 }, duration: 350 }),

  // ---- Light speed (translate + opacity; no skew) ----
  lightSpeedInRight: preset({ from: { opacity: 0, x: 120 }, duration: 400 }),
  lightSpeedInLeft: preset({ from: { opacity: 0, x: -120 }, duration: 400 }),
  lightSpeedOutRight: preset({ from: defaultTo, to: { opacity: 0, x: 120 }, duration: 350 }),
  lightSpeedOutLeft: preset({ from: defaultTo, to: { opacity: 0, x: -120 }, duration: 350 }),

  // ---- Specials ----
  rollIn: preset({ from: { opacity: 0, x: -120, rotate: -180 }, duration: 500 }),
  rollOut: preset({ from: defaultTo, to: { opacity: 0, x: 120, rotate: 180 }, duration: 450 }),
  jackInTheBox: preset({ from: { opacity: 0, scale: 0, rotate: -180 }, duration: 600 }),
  hinge: preset({ from: defaultTo, to: { opacity: 0, rotate: 80 }, duration: 600 }),

  // ---- Attention seekers ----
  bounce: preset({ from: { y: 0 }, to: { y: -20 }, duration: 500 }),
  flash: preset({ from: { opacity: 0 }, duration: 300 }),
  pulse: preset({ from: { scale: 1 }, to: { scale: 1.05 }, duration: 600 }),
  rubberBand: preset({ from: { scale: 0.95 }, to: { scale: 1 }, duration: 500 }),
  shakeX: preset({ from: { x: -8 }, to: { x: 0 }, duration: 400 }),
  shakeY: preset({ from: { y: -8 }, to: { y: 0 }, duration: 400 }),
  headShake: preset({ from: { rotate: -6 }, to: { rotate: 0 }, duration: 500 }),
  swing: preset({ from: { rotate: 15 }, to: { rotate: 0 }, duration: 500 }),
  tada: preset({ from: { scale: 0.9, rotate: -3 }, to: { scale: 1, rotate: 0 }, duration: 500 }),
  wobble: preset({ from: { rotate: -5 }, to: { rotate: 0 }, duration: 500 }),
  jello: preset({ from: { rotate: -5 }, to: { rotate: 0 }, duration: 500 }),
  heartBeat: preset({ from: { scale: 1 }, to: { scale: 1.15 }, duration: 600 }),

  // ---- Page transitions ----
  pageFade: preset({ from: { opacity: 0 }, duration: 300 }),
  pageSlide: preset({ from: { opacity: 0, x: 24 }, duration: 350 }),
  pageScale: preset({ from: { opacity: 0, scale: 0.98 }, duration: 300 }),
};

// Legacy / short names
presets.fade = presets.fadeIn;
presets.fadeUp = presets.fadeInUp;
presets.fadeDown = presets.fadeInDown;
presets.slideLeft = presets.slideInLeft;
presets.slideRight = presets.slideInRight;
presets.scale = presets.scaleIn;
presets.shake = presets.shakeX;
