/**
 * Minimal spring solver (stiffness + damping).
 * Zero deps. Used for spring-driven animations.
 */

/**
 * @param {number} from
 * @param {number} to
 * @param {number} stiffness - e.g. 170
 * @param {number} damping - e.g. 26
 * @param {number} dt - delta time in ms
 * @returns {{ value: number; velocity: number; done: boolean }}
 */
export function stepSpring(from, to, velocity, stiffness, damping, dt) {
  const dtSec = dt / 1000;
  const displacement = from - to;
  const springForce = -stiffness * displacement;
  const dampingForce = -damping * velocity;
  const acceleration = (springForce + dampingForce) / 1;
  const newVelocity = velocity + acceleration * dtSec;
  const newValue = from + newVelocity * dtSec;

  const threshold = 0.001;
  const velThreshold = 0.001;
  const done =
    Math.abs(newValue - to) < threshold && Math.abs(newVelocity) < velThreshold;

  return {
    value: newValue,
    velocity: newVelocity,
    done,
  };
}

/** Preset springs */
export const springPresets = {
  /** Bouncy */
  bouncy: { stiffness: 170, damping: 26 },
  /** Smooth */
  smooth: { stiffness: 100, damping: 30 },
  /** Snappy */
  snappy: { stiffness: 200, damping: 25 },
  /** Gentle */
  gentle: { stiffness: 80, damping: 20 },
};
